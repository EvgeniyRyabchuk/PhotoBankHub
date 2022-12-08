<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
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
                'name' => 'XS',
                'min_access_level' => 1,
                'division_factor' => 17
            ],
            [
                'name' => 'S',
                'min_access_level' => 2,
                'division_factor' => 10
            ],
            [
                'name' => 'M',
                'min_access_level' => 2,
                'division_factor' => 4
            ],
            [
                'name' => 'L',
                'min_access_level' => 2,
                'division_factor' => 3
            ],
            [
                'name' => 'XL',
                'min_access_level' => 2,
                'division_factor' => 2
            ],
            [
                'name' => 'MAX',
                'min_access_level' => 2,
                'division_factor' => 1
            ],
            [
                'name' => 'ORIGINAL',
                'min_access_level' => 3,
                'division_factor' => 1
            ],
        ];

        Size::insert($models);
    }
}
