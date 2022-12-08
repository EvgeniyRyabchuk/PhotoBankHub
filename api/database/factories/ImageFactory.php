<?php

namespace Database\Factories;

use App\_Sl\_Utills;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\ImageOrientation;
use App\Models\PhotoModel;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public static function generateImage($bgSrcPath, $dbImageData, $previewDivide) {

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

        foreach ($lines as $line)
        {
            $image->text($line, $center_x, $y, function ($font) use ($font_size){
                $font->file(public_path('Roboto/Roboto-Black.ttf'));
                $font->size($font_size);
                $font->color('#fdf6e3');
                $font->align('center');
                $font->valign('top');
            });
            $y += $font_height * 2;
        }

        $getFileName = str_replace('.', '', trim(str_replace(' ', '_', $dbImageData['name'])));

        // generating original image
        $distResName = $getFileName . "_" . Carbon::now()->timestamp . '.png';
        $distResLocation = "/users/$creator->user_id/images/generated";
        Storage::disk('private')->makeDirectory($distResLocation);
        $distPath = Storage::disk('private')->path("$distResLocation/$distResName");
        $image->save($distPath);
        $resultImg = $image;

        // generating preview image based on original
        $image->resize($width / $previewDivide, $height / $previewDivide);
        $image->encode('jpeg', '70');

        $distPreviewName = "preview_" . $getFileName . "_" . Carbon::now()->timestamp . '.jpeg';
        $distPreviewLocation = "/users/$creator->user_id/images/$imgId";
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

    public function definition()
    {
        $name = fake()->sentence(5);

        $randImageOrientation = ImageOrientation::inRandomOrder()->first();

        $isModelExist = (bool)rand(0, 1);
        if($isModelExist)
            $randPhotoModel = PhotoModel::inRandomOrder()->first();

        $randCategory = Category::inRandomOrder()->first();
        $randCreator = Creator::inRandomOrder()->first();

        $randCreatorCollection = $randCreator->collections->random();

        $bgPath = '/static/placeholder_image.png';
        $imgData = [
            'name' => $name,
            'creator' => $randCreator
        ];

        $resultImgData = ImageFactory::generateImage($bgPath, $imgData, 10);

        return [
            'name' => $name,
            'image_orientation_id' => $randImageOrientation->id,
            'photo_model_id' => $isModelExist ? $randPhotoModel->id : null,
            'category_id' => $randCategory->id,
            'creator_id' => $randCreator->id,
            'collection_id' => $randCreatorCollection->id,
            'isEditorsChoice' => false,
            'isFree' => false,

            'preview' => $resultImgData['previewPath'],

            'original' =>  $resultImgData['relativeResultImgPath'],
            'originalExt' =>  $resultImgData['resExt'],

            'people_count' => rand(0, 5)
        ];
    }
}
