<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Client;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\Image;
use App\Models\Model;
use App\Models\OauthClient;
use App\Models\PhotoModel;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Database\Factories\CollectionFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(OAuthClientSeeder::class);

        $this->call([RoleSeeder::class]);

        $clientRole = Role::where('name', 'client')->first();
        $creatorRole = Role::where('name', 'creator')->first();
        $adminRole = Role::where('name', 'admin')->first();

        User::factory(50)->create()->each(function ($u) use($clientRole, $creatorRole) {
            if($u->role->id === $clientRole->id) {
                Client::create([ 'user_id' => $u->id ]);
            } else if($u->role->id === $creatorRole->id) {
                Creator::create([ 'user_id' => $u->id ]);
            }
        });

        $this->call(StaticUserSeeder::class, false, ['roles' =>
            compact('adminRole', 'clientRole',  'creatorRole')]
        );

        $this->call(ContentSubscriptionSeeder::class);


        PhotoModel::factory(50)->create();

        $this->call(ImageOrientationSeeder::class);

        Collection::factory(100)->create();

        $this->call(CategorySeeder::class);

        Image::factory(1)->create();

    }
}
