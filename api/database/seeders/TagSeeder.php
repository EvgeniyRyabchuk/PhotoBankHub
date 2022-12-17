<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $images = Image::all();

        foreach ($images as $image) {
            $count = rand(1, 5);
            $tags = Tag::inRandomOrder()->take($count)->get();
            foreach ($tags as $tag) {
                $image->tags()->attach($tag);
            }
            $image->save();
        }
    }
}
