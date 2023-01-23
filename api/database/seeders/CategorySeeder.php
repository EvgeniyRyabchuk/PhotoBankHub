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
                 'name' => 'Technology',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Business',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Cars',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Food',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Family',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Travels',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Nature',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'People',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
             [
                 'name' => 'Animals',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $photosCategory->id
             ],
        ]);

        Category::insert([
             [
                 'name' => 'Abstraction',
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
                 'name' => 'Technology',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Cars',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Food',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Family',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Travels',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'Nature',
                 'preview' => '/static/gallery_preview.jpeg',
                 'parent_id' => $illustrationsCategory->id
             ],
             [
                 'name' => 'People',
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
