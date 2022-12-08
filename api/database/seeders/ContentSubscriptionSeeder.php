<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Creator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContentSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clients = Client::all();

        foreach ($clients as $client) {
            $max = Creator::count();
            $randCount = rand(0, $max);
            $randCreators = Creator::inRandomOrder()->take($randCount)->get();

            foreach ($randCreators as $creator) {
                $client->contentSubscriptions()->attach($creator);
                $client->save();
            }

        }
    }
}
