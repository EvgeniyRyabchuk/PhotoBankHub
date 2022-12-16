<?php

namespace Database\Seeders;

use App\Models\Billing;
use App\Models\BillStatus;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BillingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(
        $billingStatusName = null,
        $plan = null,
        $isRandStatus = false,
        $isRandPlan = false,
        $billingInfo,
        $client,
        $card
    ) {

        $isMonthlyPlan = (bool)rand(0, 1);

        $bill = new Billing();
        if($isRandStatus) {
            $billingStatus = BillStatus::where('name', '!=', 'New')
                ->inRandomOrder()
                ->first();
        } else {
            $billingStatus = BillStatus::where('name', $billingStatusName)
                ->first();
        }

        if($isRandPlan) {
            $plan = Plan::inRandomOrder()->first();
        }


        $bill->billStatus()->associate($billingStatus);
        $bill->plan()->associate($plan);
        $bill->client()->associate($client);
        $bill->billingInfo()->associate($billingInfo);

        if($billingStatus->name !== 'New') {
            $bill->last_card_number =
                mb_substr($card->number, strlen($card->number) - 4, strlen($card->number) - 1);

            $bill->issuer = $card->issuer;
            $bill->valid_period_type = $isMonthlyPlan ? 'monthly' : 'annual';
        }

        $bill->save();

        if($billingStatus->name === "Paid") {
            $client->plan_expired_at = $isMonthlyPlan
                ? Carbon::now()->addMonth():
                Carbon::now()->addYear();

            $client->left_image_count += $plan->image_count;
            $client->valid_period_type = $isMonthlyPlan ? 'monthly' : 'annual';
        }

        $client->save();
    }
}
