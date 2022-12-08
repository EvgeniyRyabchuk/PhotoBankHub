<?php

namespace Database\Seeders;

use App\Models\OauthClient;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OAuthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $client1 = [
            'id' => 1,
            'user_id' => null,
            'name' => "Laravel Personal Access Client",
            "secret" => "yygu0hUlhcDJttOCsiHhkButCEjEp0rLq6rUrWdP",
            "provider" => null,
            "redirect" => "http://localhost",
            "personal_access_client" => true,
            "password_client" => false,
            "revoked" => false,
            "updated_at" => Carbon::now(),
            'created_at' => Carbon::now()
        ];

        $client2 = [
            'id' => 2,
            'user_id' => null,
            'name' => "Laravel Password Grant Client",
            "secret" => "2zM8Ny0Usfu3LgchNakjVZjwKY8PpTtejZFBwssz",
            "provider" => "users",
            "redirect" => "http://localhost",
            "personal_access_client" => false,
            "password_client" => true,
            "revoked" => false,
            "updated_at" => Carbon::now(),
            'created_at' => Carbon::now()
        ];


        OauthClient::insert([
            $client1,
            $client2
        ]);
    }
}
