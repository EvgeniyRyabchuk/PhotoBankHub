<?php

namespace Database\Seeders;

use App\_Sl\ImageHandler;
use App\Models\Category;
use App\Models\Creator;
use App\Models\Image;
use App\Models\ImageOrientation;
use App\Models\PhotoModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class StaticImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public static function generate($relativeImgPath, $category) {
        $name = fake()->sentence(5);
        $randImageOrientation = ImageOrientation::inRandomOrder()->first();
        $isModelExist = (bool)rand(0, 1);
        if($isModelExist)
            $randPhotoModel = PhotoModel::inRandomOrder()->first();
        $randCreator = Creator::inRandomOrder()->first();
        $randCreatorCollection = $randCreator->collections->random();
        $imgData = [
            'name' => $name,
            'creator' => $randCreator
        ];
        $resultImgData = ImageHandler::generateImage($relativeImgPath,
            $imgData, 5, false);
        return [
            'name' => $name,
            'image_orientation_id' => $randImageOrientation->id,
            'photo_model_id' => $isModelExist ? $randPhotoModel->id : null,
            'category_id' => $category->id,
            'creator_id' => $randCreator->id,
            'collection_id' => $randCreatorCollection->id,
            'isEditorsChoice' => rand(0, 1),
            'isFree' => rand(0, 1),

            'preview' => $resultImgData['previewPath'],

            'original' =>  $resultImgData['relativeResultImgPath'],
            'originalExt' =>  $resultImgData['resExt'],

            'people_count' => rand(0, 5),
            'created_at' => fake()->dateTimeBetween('-5 month', '-1 day')
        ];
    }

    public function run($count)
    {
        $relativeBaseFolder = 'static/images';
        $parentName = 'Photos';
        $abstractionName = 'Abstraction';
        $animalsName = 'Animals';
        $businessName = 'Business';
        $carsName = 'Cars';
        $familyName = 'Family';
        $foodName = 'Food';
        $natureName = 'Nature';
        $peopleName = 'People';
        $technologyName = 'Technology';
        $travelsName = 'Travels';

        $categoryAbstraction = Category::where('name', $abstractionName)->first();
        $categoryAnimals = Category::where('name', $animalsName)->first();
        $categoryBusiness = Category::where('name', $businessName)->first();
        $categoryCars = Category::where('name', $carsName)->first();
        $categoryFamily = Category::where('name', $familyName)->first();
        $categoryFood = Category::where('name', $foodName)->first();
        $categoryNature = Category::where('name', $natureName)->first();
        $categoryPeople = Category::where('name', $peopleName)->first();
        $categoryTechnology = Category::where('name', $technologyName)->first();
        $categoryTravels = Category::where('name', $travelsName)->first();

        $categories = [
            $categoryAbstraction,
            $categoryAnimals,
            $categoryBusiness,
            $categoryCars,
            $categoryFamily,
            $categoryFood,
            $categoryNature,
            $categoryPeople,
            $categoryTechnology,
            $categoryTravels
        ];

        foreach ($categories as $category) {
            $categoryFolder = "$relativeBaseFolder/$parentName/$category->name";
            $files = Storage::disk('public')->files($categoryFolder);

            foreach ($files as $file) {
                $imageData = self::generate($file, $category);
                Image::insert($imageData);
            }
        }

    }
}
