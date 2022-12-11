<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
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
                'name' => 'client',
            ],
            [
                'name' => 'creator',
            ],
            [
                'name' => 'admin',
            ],
            [
                'name' => 'super_admin',
            ]
        ];

        Role::insert($models);
    }
}
