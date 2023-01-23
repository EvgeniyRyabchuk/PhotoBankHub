<?php

namespace App\_Sl;


use App\Models\Image as ImageDb;
use App\Models\ImageVariant;
use App\Models\Size;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageHandler {

    public $interventionImg;
    public $imageFile;
    public $imageModel;

    public $srcWidth;
    public $srcHeight;
    public $name = 'default_name';

    private static $previewDivide = 5;

    public function __construct($imageFile, $imageModel, $customName = null)
    {
        $interventionImg = Image::make($imageFile);
        $this->imageFile = $imageFile;
        $this->interventionImg = $interventionImg;
        $this->imageModel = $imageModel;

        $this->srcWidth = $interventionImg->width();
        $this->srcHeight = $interventionImg->height();

        if(is_null($customName)) {
            $fileName = str_replace(
                '.', '', trim(
                str_replace(' ', '_', $this->name)
            ));
            $this->name = $fileName;
        } else {
            $this->name = $customName;
        }
    }

    public function saveOriginal() {
        $imageId = $this->imageModel->id;
        $filename = $this->name."_".time()."_original.".$this->imageFile->extension();
        $relativePath = "/images/$imageId";
        Storage::disk('private')->putFileAs($relativePath, $this->imageFile, $filename);
        return ['location' => $relativePath, 'filename' => $filename];
    }

    public function savePreview() : string {
        $imageId = $this->imageModel->id;
        $interventionImg = Image::make($this->imageFile);

        $interventionImg->resize(
            $this->srcWidth / self::$previewDivide,
            $this->srcHeight / self::$previewDivide
        );

        $interventionImg->encode('jpeg', '70');
        $distPreviewName = "preview_" . $this->name . "_" . time() . '.jpeg';
        $distPreviewLocation = "/images/$imageId";
        Storage::disk('public')->makeDirectory($distPreviewLocation);
        $relativePath = "$distPreviewLocation/$distPreviewName";

        $distPath = Storage::disk('public')->path($relativePath);
        $interventionImg->save($distPath);
        self::getImageWithWaterMark("public", $relativePath, false);
        return $relativePath;
    }

    public static function getImageRation($data) {
        $interventionImg = Image::make($data);
        $width = $interventionImg->width();
        $height = $interventionImg->height();

        $divisor = gmp_intval(gmp_gcd($width, $height));
        $str =  $width / $divisor . ':' . $height / $divisor;

        $r1 = $width / $divisor;
        $r2 = $height / $divisor;
        //TODO: solve
        if($r1 > 99 || $r2 > 99) { $r1 = 3; $r2 = 2; }
        $r1 = _Utills::isDecimal($r1) ? $r1 : number_format($r1, 2);
        $r2 = _Utills::isDecimal($r2) ? $r2 : number_format($r2, 2);

        return [$r1, $r2, $str];
    }

    public function saveResized($originalPath, $originalFileName) : void {
        $imageId = $this->imageModel->id;
        $sizes = Size::all();

        foreach ($sizes as $size) {
            $imageIntervention = Image::make($this->imageFile);

            if($size->name === 'ORIGINAL') {
                $ext = $this->imageFile->extension();
                $path = "$originalPath/$originalFileName";
                $size_in_byte = File::size(storage_path("app/private/$path"));
            } else {
                $ext = 'jpeg';
                $width = intval($this->srcWidth / $size->division_factor);
                $height = intval($this->srcHeight / $size->division_factor);

                $imgName = $imageId.'_'.time().'_'."$size->name.$ext";
                $location = "/images/$imageId";
                Storage::disk('private')->makeDirectory($location);
                $path = Storage::disk('private')->path($location . '/' . $imgName);

                $imageIntervention->resize($width, $height);

                $imageIntervention->save($path);
                $size_in_byte = File::size($path);
                $path = $location . '/' . $imgName;
            }

            $resizedImg = ImageVariant::create([
                'image_id' => $imageId,
                'size_id' => $size->id,
                'extension' => $ext,
                'size_in_byte' => $size_in_byte,
                'width' => $width,
                'height' => $height,
                'path' => $path,
            ]);
        }

    }

    public static function getImageWithWaterMark($srcImageFileDriver, $privateSrcImgPath, $isNew = true) : string {
        $full_image_path = Storage::disk($srcImageFileDriver)->path($privateSrcImgPath);
        $waterMarkPath = Storage::disk('public')->path('static/wm_small.png');

        if($isNew) {
            $distPath = Storage::disk('private')
                ->path('temp'. "/newImageWIthWatermark_".time().".png") ;
        } else {
            $distPath = $full_image_path;
        }

        $image = Image::make($full_image_path);
        /* insert watermark at bottom-left corner with 5px offset */

        $width = $image->width();
        $height = $image->height();
        $shift = 100;

        for ($y = 0; $y < $height; $y = $y + 500) {
            for ($x = 0; $x < $width; $x = $x + 500) {
                $image->insert($waterMarkPath, 'top-left', $x + $shift, $y);
            }
            $shift = $shift * -1;
        }

        $image->save($distPath);

        return $image->basePath();
    }



    public static function generateImage($bgSrcPath, $dbImageData, $previewDivide, $withText = true) {
        if(!array_key_exists('id', $dbImageData))
            $imgId = _Utills::getNextId('images');
        else
            $imgId = $dbImageData['id'];

        $creator = $dbImageData['creator'];

        $imagePath = Storage::disk('public')->path($bgSrcPath);
        $image = Image::make($imagePath);

        $width       = $image->width();
        $height      = $image->height();
        $center_x    = $width / 2;
        $center_y    = $height / 2;
        $max_len     = 36;
        $font_size   = 800;
        $font_height = 800;

        $text = $dbImageData['name']."\n Image ID: #$imgId";
        $lines = explode("\n", wordwrap($text, $max_len));
        $y = $center_y - ((count($lines) - 1) * $font_height);
        $y = 200;

        if($withText) {
            foreach ($lines as $line)
            {
                $image->text($line, $center_x, $y, function ($font) use ($font_size){
                    $font->file(public_path('Roboto/Roboto-Black.ttf'));
                    $font->size($font_size);
                    $font->color(fake()->hexColor);
                    $font->align('center');
                    $font->valign('top');
                });
                $y += $font_height * 2;
            }
        }


        $getFileName = str_replace('.', '', trim(str_replace(' ', '_', $dbImageData['name'])));

        // generating original image
        $distResName = $getFileName . "_" . Carbon::now()->timestamp . '.png';
        $distResLocation = "/images/generated";
        Storage::disk('private')->makeDirectory($distResLocation);
        $distPath = Storage::disk('private')->path("$distResLocation/$distResName");
        $image->save($distPath);
        $resultImg = $image;

        // generating preview image based on original
        $image->resize($width / $previewDivide, $height / $previewDivide);
        $image->encode('jpeg', '70');

        $distPreviewName = "preview_" . $getFileName . "_" . Carbon::now()->timestamp . '.jpeg';
        $distPreviewLocation = "/images/$imgId";
        Storage::disk('public')->makeDirectory($distPreviewLocation);
        $distPath = Storage::disk('public')->path("$distPreviewLocation/$distPreviewName");
        $image->save($distPath);


        $relativeResultImgPath = $distResLocation . '/' . $distResName;
        $previewPath = $distPreviewLocation .  '/' . $distPreviewName;

        $resExt = pathinfo($relativeResultImgPath, PATHINFO_EXTENSION);
        $previewExt = pathinfo($previewPath, PATHINFO_EXTENSION);

        return compact(
            'resultImg',
            'relativeResultImgPath',
            'previewPath',
            'resExt',
            'previewExt'
        );
    }

}
