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
                'preview' => '/static/gallery_preview.jpeg',
                'isChildExist' => true,
            ],
//            [
//                'name' => 'Vectors',
//                'preview' => fake()->filePath(),
//                'isChildExist' => true,
//            ],
            [
                'name' => 'Illustrations',
                'preview' => '/static/gallery_preview.jpeg',
                'isChildExist' => true,
            ],
        ]);

        $photosCategory = Category::where('name', 'Photos')->first();
        $vectorsCategory = Category::where('name', 'Vectors')->first();
        $illustrationsCategory = Category::where('name', 'Illustrations')->first();

        Category::insert([
            [
                'name' => 'Abstraction',
                'preview' => '/static/gallery_preview.jpeg',
                'parent_id' => $photosCategory->id
            ],
             [
                 'name' => 'abstraction',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'technology',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id

             ],
             [
                 'name' => 'business',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'cars',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'food',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'family',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'travels',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'nature',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'people',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'animals',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
        ]);

        Category::insert([
             [
                 'name' => 'abstraction',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Graphic arts. Web design',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Items',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'technology',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'cars',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'food',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'a family',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'travels',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'nature',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'people',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Editorial',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Art/Architecture',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Industry',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
        ]);



    }
}
