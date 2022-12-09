<?php

namespace Database\Seeders;

use App\Models\License;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LicenseSeeder extends Seeder
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
                'name' => 'Perpetual rights to use images',
                'description' => '',
                'isStandard' => true,
            ],
            [
                'name' => 'Commercial use',
                'description' => '',
                'isStandard' => true,
            ],
            [
                'name' => 'Personal use',
                'description' => '',
                'isStandard' => true,
            ],


            [
                'name' => 'Unlimited number of jobs (U-EL)',
                'description' => '',
                'isStandard' => false,
            ],

            [
                'name' => 'Web use (W-EL)',
                'description' => '',
                'isStandard' => false,
            ],

            [
                'name' => 'Use for printing (P-EL)',
                'description' => '',
                'isStandard' => false,
            ],


            [
                'name' => 'Sale of rights (SR-EL 1)',
                'description' => '',
                'isStandard' => false,
            ],

            [
                'name' => 'Sale of rights (SR-EL 3)',
                'description' => '',
                'isStandard' => false,
            ],

            [
                'name' => 'Sale of rights (SR-EL)',
                'description' => '',
                'isStandard' => false,
            ],


            [
                'name' => 'Free',
                'description' => '',
                'isStandard' => true,
            ],
        ];


        License::insert($models);
    }
}
