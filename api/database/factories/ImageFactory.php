<?php

namespace Database\Factories;

use App\_Sl\_Utills;
use App\_Sl\ImageHandler;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\ImageOrientation;
use App\Models\PhotoModel;
use Carbon\Carbon;
use Faker\Core\File;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Imagick;
use Intervention\Image\Facades\Image;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

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

//        $bgPath = '/static/2.jpg';
        $bgPath = '/static/3.jpg';
        $imgData = [
            'name' => $name,
            'creator' => $randCreator
        ];

        $resultImgData = ImageHandler::generateImage($bgPath, $imgData, 10);

        return [
            'name' => $name,
            'image_orientation_id' => $randImageOrientation->id,
            'photo_model_id' => $isModelExist ? $randPhotoModel->id : null,
            'category_id' => $randCategory->id,
            'creator_id' => $randCreator->id,
            'collection_id' => $randCreatorCollection->id,
            'isEditorsChoice' => rand(0, 1),
            'isFree' => rand(0, 1),

            'preview' => $resultImgData['previewPath'],

            'original' =>  $resultImgData['relativeResultImgPath'],
            'originalExt' =>  $resultImgData['resExt'],

            'people_count' => rand(0, 5),
            'created_at' => $this->faker->dateTimeBetween('-5 month', '-1 day')
        ];
    }
}
