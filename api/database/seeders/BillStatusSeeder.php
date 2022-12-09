<?php

namespace Database\Seeders;

use App\Models\BillStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BillStatusSeeder extends Seeder
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
                'name' => 'New',
                'bgColor' => '#DDBB3A',
            ],
            [
                'name' => 'Paid',
                'bgColor' => '#63E77F',
            ],
            [
                'name' => 'Returned',
                'bgColor' => '#2BE3E7',
            ],
            [
                'name' => 'FailedGateway',
                'bgColor' => '#E991C8',
            ],
            [
                'name' => 'InsufficientFunds',
                'bgColor' => '#E02323',
            ],
        ];

        BillStatus::insert($models);
    }
}
