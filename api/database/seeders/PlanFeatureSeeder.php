<?php

namespace Database\Seeders;

use App\Models\PlanFeature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanFeatureSeeder extends Seeder
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
               'name' => 'Unused downloads roll over to the next month',
            ],
            [
                'name' => 'Additional images for $1 each',
            ],
            [
                'name' => 'Circulation up to 500,000 copies',
            ],
            [
                'name' => '24/7 support',
            ],
        ];

        PlanFeature::insert($models);
    }
}
