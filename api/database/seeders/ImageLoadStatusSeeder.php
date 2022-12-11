<?php

namespace Database\Seeders;

use App\Models\ImageLoadStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImageLoadStatusSeeder extends Seeder
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
                'name' => 'Loading',
            ],
            [
                'name' => 'Complete',
            ],
            [
                'name' => 'Fail',
            ],
        ];

        ImageLoadStatus::insert($models);
    }
}
