<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Billing;
use App\Models\BillingInfo;
use App\Models\BillStatus;
use App\Models\Category;
use App\Models\Client;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\CreditCard;
use App\Models\Download;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\ImageLoadStatus;
use App\Models\ImageVariant;
use App\Models\Like;
use App\Models\Model;
use App\Models\OauthClient;
use App\Models\PhotoModel;
use App\Models\Plan;
use App\Models\PlanFeature;
use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
use App\Models\View;
use Carbon\Carbon;
use Database\Factories\CollectionFactory;
use Database\Factories\CreditCardFactory;
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

        $this->call(ImageSeeder::class, false, ['count' => 1]);

        $this->call(SizeSeeder::class);

        $this->call(ImageVariantSeeder::class);

        Like::factory(100)->create();

        View::factory(300)->create();

        Tag::factory(50)->create();

        Favorite::factory(50)->create();

        $this->call([
            TagSeeder::class,
            FavoriteSeeder::class,
            LicenseSeeder::class,
            PlanFeatureSeeder::class,
            PlanSeeder::class,
            BillStatusSeeder::class
        ]);

        // create credit card and bill info for all clients
        // and also give random plan
        // and create two bills: first - it's bill with rand status,
        // second - it's bill with a "New" status for check monthly or annual auto payment
        foreach (Client::all() as $client) {
            $card = CreditCard::factory(1)->create()->first();
            $info = BillingInfo::factory(1)->create()->first();

            $client->creditCard()->save($card);
            $client->billingInfo()->associate($info);

            $isPlanExist = (bool)rand(0, 1);

            if($isPlanExist) {
                $plan = Plan::inRandomOrder()->first();
                $client->plan()->associate($plan);

                $oldBill = $this->call(BillingSeeder::class, false, [
                    'isRandStatus' => true,
                    'plan' => $plan,
                    'billingInfo' => $info,
                    'client' => $client,
                    'card' => $card
                ]);
                $newBill = $this->call(BillingSeeder::class, false, [
                    'billingStatusName' => 'New',
                    'plan' => $plan,
                    'billingInfo' => $info,
                    'client' => $client,
                    'card' => $card
                ]);
            }
            $client->save();
       }

        $clientCount = Client::where('plan_expired_at', '>=', Carbon::now())
            ->has('plan')->count();
        if($clientCount > 0) {
            Download::factory(10)->create();
        }

      $this->call(ImageLoadStatusSeeder::class);


    }
}
