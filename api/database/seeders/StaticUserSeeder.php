<?php

namespace Database\Seeders;

use App\Models\BillingInfo;
use App\Models\BillStatus;
use App\Models\Client;
use App\Models\Creator;
use App\Models\CreditCard;
use App\Models\Phone;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class StaticUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($roles)
    {
        $maxPlan = Plan::orderBy('access_level', 'desc')->first();
        // creating User with role Client
        $client = new Client();
        $clientUser = new User();
        $clientUser->full_name = 'Nicholas Robinson';
        $clientUser->email = 'nicholasrobinson@gmail.com';
        $clientUser->password = Hash::make('password');
        $clientUser->website = fake()->url();
        $clientUser->avatar = '/static/avatars/default_avatar.png';
        $clientUser->about = fake()->sentence(30);
        $clientUser->role()->associate($roles['clientRole']);


        $phone = Phone::create([
            'phone_number' => '380982885884',
            'countryCode' => "UA",
            'name' => 'Ukraine',
            'dialCode' => "380",
            'format' => '+... (..) ... .. ..',
        ]);

        $clientUser->phone()->associate($phone);
        $clientUser->save();
        $client->plan()->associate($maxPlan);
        $client->user()->associate($clientUser);
        $client->save();

        $billInfo = BillingInfo::factory(1)->create()->first();
        $card = CreditCard::factory(1)->create()->first();

        // Paid for plan
        $this->call(BillingSeeder::class, false, [
            'billingStatusName' => 'Paid',
            'plan' => $maxPlan,
            'billingInfo' => $billInfo,
            'client' => $client,
            'card' => $card
        ]);

        // further bill for payment
        $this->call(BillingSeeder::class, false, [
            'billingStatusName' => 'New',
            'plan' => $maxPlan,
            'billingInfo' => $billInfo,
            'client' => $client,
            'card' => $card
        ]);





        // creating User with role Creator
        $creatorUser = new User();
        $creator = new Creator();

        $creatorUser->full_name = 'Harry Black';
        $creatorUser->email = 'harryblack@gmail.com';
        $creatorUser->password = Hash::make('password');
        $creatorUser->website = fake()->url();
        $creatorUser->avatar = '/static/avatars/default_avatar.png';
        $creatorUser->about = fake()->sentence(30);
        $creatorUser->role()->associate($roles['creatorRole']);

        $phone = Phone::create([
            'phone_number' => '380984568739',
            'countryCode' => "UA",
            'name' => 'Ukraine',
            'dialCode' => "380",
            'format' => '+... (..) ... .. ..',
        ]);

        $creatorUser->phone()->associate($phone);
        $creatorUser->save();

        $creator->user()->associate($creatorUser);
        $creator->save();

        // creating User with role Admin
        $admin = new User();
        $admin->full_name = 'Aaron Page';
        $admin->email = 'aaronpage@gmail.com';
        $admin->password = Hash::make('password');
        $admin->website = fake()->url();
        $admin->avatar = '/static/avatars/default_avatar.png';
        $admin->about = fake()->sentence(30);
        $admin->role()->associate($roles['adminRole']);
        $admin->save();

    }
}
