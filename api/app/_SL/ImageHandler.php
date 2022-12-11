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
    public $srcInterventionImg;


    public $srcWidth;
    public $srcHeight;

    public $name = 'default_name';

    private static $previewDivide = 10;

    public function __construct(mixed $data, $name)
    {
        $interventionImg = \Intervention\Image\Facades\Image::make($data);
        $srcInterventionImg = \Intervention\Image\Facades\Image::make($data);

        $this->srcWidth = $srcInterventionImg->width();
        $this->srcHeight = $srcInterventionImg->height();

        $this->interventionImg = $interventionImg;
        $this->srcInterventionImg = $srcInterventionImg;

        switch ($data) {
            case $data instanceof Illuminate\Http\UploadedFile:

                break;
            case is_string($data):

                break;
        }
        $fileName = str_replace(
            '.', '', trim(
            str_replace(' ', '_', $this->name)
        ));
        $this->name = $fileName;
    }

    public function saveOriginal($imageId, $ext) {
        $relativePath = "/images/$imageId/$this->name"."_".time().'_original.'.$ext;

        Storage::disk('private')->put($relativePath, $this->interventionImg);
        return $relativePath;
    }

    public function savePreview($imgId) : string {
        $this->interventionImg->resize(
            $this->srcWidth / self::$previewDivide,
            $this->srcHeight / self::$previewDivide
        );
        $this->interventionImg->encode('jpeg', '70');
        $distPreviewName = "preview_" . $this->name . "_" . time() . '.jpeg';
        $distPreviewLocation = "/images/$imgId";
        Storage::disk('public')->makeDirectory($distPreviewLocation);
        $relativePath = "$distPreviewLocation/$distPreviewName";

        $distPath = Storage::disk('public')->path($relativePath);
        $this->interventionImg->save($distPath);
        return $relativePath;
    }


    public static function getImageRation($width, $height) {
        $divisor = gmp_intval( gmp_gcd( $width, $height ) );
        $str =  $width / $divisor . ':' . $height / $divisor;

        $r1 = $width / $divisor;
        $r2 = $height / $divisor;

        $r1 = _Utills::isDecimal($r1) ? $r1 : number_format($r1, 2);
        $r2 = _Utills::isDecimal($r2) ? $r2 : number_format($r2, 2);
        return [$r1, $r2, $str];
    }

    public function saveResized($originalPath, $imageId) : array {
        $distSizeList = [];
        $sizes = Size::all();

        $originalFullPath = Storage::disk('private')->path($originalPath);

        foreach ($sizes as $size) {

            $imageIntervention = Image::make($originalFullPath);

            if($size->name === 'ORIGINAL') {
                $ext = $this->interventionImg->extension;
                $path = $originalPath;
                $size_in_byte = File::size(storage_path("app/private/$path"));
            } else {
                $ext = 'jpeg';
                $width = intval($this->srcWidth / $size->division_factor);
                $height = intval($this->srcHeight / $size->division_factor);

                $timestamp = Carbon::now()->timestamp;
                $imgName = $imageId.'_'.$timestamp.'_'."$size->name.$ext";
                $location = "/images/$imageId";
                Storage::disk('private')->makeDirectory($location);
                $path =  Storage::disk('private')->path($location . '/' . $imgName);

                $imageIntervention->resize($width, $height);

//                    $imageIntervention->widen($width);
//                    $imageIntervention->heighten($height);
//                    $imageIntervention->encode($ext, 100);
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

            $distSizeList[] = [
                'name' => $size->name,
                'payload' => $resizedImg
            ];
        }

        return $distSizeList;
    }

}
