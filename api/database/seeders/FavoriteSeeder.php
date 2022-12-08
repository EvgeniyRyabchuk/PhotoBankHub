<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Image;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $favorites = Favorite::all();

        foreach ($favorites as $favorite) {
            $count = rand(1, Image::count());
            $images = Image::inRandomOrder()->take($count)->get();

            foreach ($images as $image) {
                $image->favorites()->attach($favorite);
                $image->save();
            }

        }
    }
}
