<?php

namespace Database\Seeders;

use App\Models\ImageOrientation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImageOrientationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            [
                'name' => 'horizontal',
                'ratio_side_1' => 16,
                'ratio_side_2' => 9
            ],
            [
                'name' => 'vertical',
                'ratio_side_1' => 2,
                'ratio_side_2' => 3
            ],
            [
                'name' => 'square',
                'ratio_side_1' => 1,
                'ratio_side_2' => 1
            ],
            [
                'name' => 'wide',
                'ratio_side_1' => 16,
                'ratio_side_2' => 10
            ],
        ];


        ImageOrientation::insert($models);

    }
}
