<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::insert([
            [
                'name' => 'Photos',
                'preview' => fake()->filePath(),
                'isChildExist' => true,
            ],
//            [
//                'name' => 'Vectors',
//                'preview' => fake()->filePath(),
//                'isChildExist' => true,
//            ],
            [
                'name' => 'Illustrations',
                'preview' => fake()->filePath(),
                'isChildExist' => true,
            ],
        ]);

        $photosCategory = Category::where('name', 'Photos')->first();
        $vectorsCategory = Category::where('name', 'Vectors')->first();
        $illustrationsCategory = Category::where('name', 'Illustrations')->first();

        Category::insert([
            [
                'name' => 'Abstraction',
                'preview' => fake()->filePath(),
                'parent_id' => $photosCategory->id
            ],
             [
                 'name' => 'abstraction',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'technology',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id

             ],
             [
                 'name' => 'business',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'cars',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'food',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'family',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'travels',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'nature',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'people',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'animals',
                 'preview' => fake()->filePath(),
                 'parent_id' => $photosCategory->id
             ],
        ]);

        Category::insert([
             [
                 'name' => 'abstraction',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Graphic arts. Web design',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Items',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'technology',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'cars',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'food',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'a family',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'travels',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'nature',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'people',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Editorial',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Art/Architecture',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Industry',
                 'preview' => fake()->filePath(),
                 'parent_id' => $illustrationsCategory->id
             ],
        ]);



    }
}
