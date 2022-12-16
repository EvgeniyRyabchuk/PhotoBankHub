<?php

namespace App\Http\Controllers\Bill;

use App\_Sl\_Utills;
use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\BillingInfo;
use App\Models\BillStatus;
use App\Models\Client;
use App\Models\CreditCard;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class BillingController extends Controller
{
    public function index(Request $request) {
        $client = Auth::user()->client;
        $query = Billing::with('plan', 'billStatus', 'billingInfo');
        $query->where('client_id', $client->id);
        $query->orderBy('created_at', 'desc');
        $billings = $query->paginate(10);
        return response()->json($billings);
    }


    public function subscribe(Request $request) {
        $client = Auth::user()->client;
        $plan = Plan::findOrFail($request->plan_id);
        $creditCardId = $request->creditCardId;
        $valid_period_type = $request->valid_period_type;
        $current_image_count = $client->left_image_count;

        if($valid_period_type === 'monthly') {
            $plan_expired_at = Carbon::now()->addMonth();
            $current_image_count += $plan->image_count;
        } else if($valid_period_type === 'annual') {
            $plan_expired_at = Carbon::now()->addYear();
            $current_image_count += $plan->image_count * 12;
        } else {
            return response()->json(['message' => 'no such valid period'], 404);
        }

        if($creditCardId) {
            $creditCard = CreditCard::findOrFail($creditCardId);
        } else {
            $creditCard = new CreditCard();
            $creditCard->number = $request->input('creditCard.number');
            $creditCard->expire_month = $request->input('creditCard.expire_month');
            $creditCard->expire_year = $request->input('creditCard.expire_year');
            $creditCard->cvc = $request->input('creditCard.cvc');
            $creditCard->issuer = $request->input('creditCard.issuer');
            $creditCard->client()->associate($client);
            // is Main
        }

        $billingInfoId = $client->billing_info_id;

        if($billingInfoId) {
            $billingInfo = BillingInfo::findOrFail($billingInfoId);
        } else {
            $billingInfo = BillingInfo::create([
                "full_name" => $client->user->full_name,
                "email" => $client->user->email,
                "phone_number" => $client->user->phone_number ?? null,
            ]);
        }

        // check if card info valid
        // or have enough money

        $client->plan()->associate($plan);
        $client->plan_expired_at = $plan_expired_at;
        $client->left_image_count = $current_image_count;
        $client->valid_period_type = $valid_period_type;

        $paidStatus = BillStatus::where('name', 'Paid')->first();
        $newStatus = BillStatus::where('name', 'New')->first();

        $paidBill = Billing::create([
            "plan_id" => $plan->id,
            "bill_status_id" => $paidStatus->id,
            "billing_info_id" => $billingInfo->id,
            "client_id" => $client->id,
            "last_card_number" => _Utills::last4Number($creditCard->number),
            "valid_period_type" => $valid_period_type,
            "issuer" => $request->issuer,
        ]);
        $newBill = Billing::create([
            "plan_id" => $plan->id,
            "billing_info_id" => $billingInfo->id,
            "bill_status_id" => $newStatus->id,
            "client_id" => $client->id,
            "valid_period_type" => $valid_period_type,
        ]);


        if(!$creditCardId) {
            $creditCard->save();
        }

        $client->save();

        return response()->json($client);

    }

    public function unsubscribe(Request $request) {
        $client = Auth::user()->client;
        $newStatus = BillStatus::where('name', 'New')->first();

        $client->plan()->dissociate();
        $client->valid_period_type = null;

        $client->save();

        Billing::where([
            'bill_status_id' => $newStatus->id,
            'client_id' => $client->id
        ])->delete();


        return response()->json($client);
    }

    // everytime subscription checker

    public static function subscriptionCheck() {

        $allClients = Client::all();
        $paidStatus = BillStatus::where('name', 'Paid')->first();
        $newStatus = BillStatus::where('name', 'New')->first();
        $failedGatewayStatus = BillStatus::where('name', 'FailedGateway')->first();


        foreach ($allClients as $client) {
            // check if client have a subscription plan
            if($client->plan && $client->valid_period_type) {
                // check if plan expire
                if(Carbon::parse($client->plan_expired_at)->lt(Carbon::now())) {

                    // search a new bill for know if client subscription is due
                    $newBillExist = Billing::where([
                        'bill_status_id' => $newStatus->id,
                        'client_id' => $client->id
                    ])->first();

                    if(!$newBillExist) {
                        // send email message about continue subscription
                        dd('new bill not exist');
                    }

                    $creditCard = CreditCard::where([
                        'client_id' => $client->id,
                        'isMain' => true,
                    ])->first();

                    if(!$creditCard) {
                        dd('credit card not exist');
                    }

                    // success payment process
                    // =============================

                    $paidBill = Billing::create([
                        "plan_id" => $client->plan->id,
                        "bill_status_id" => $paidStatus->id,
                        "billing_info_id" => $client->billingInfo->id,
                        "client_id" => $client->id,
                        "last_card_number" => _Utills::last4Number($creditCard->number),
                        "valid_period_type" => $client->valid_period_type,
                        "issuer" => $creditCard->issuer,
                    ]);
                    $current_image_count = $client->left_image_count;
                    if($client->valid_period_type === 'monthly') {
                        $plan_expired_at = Carbon::now()->addMonth();
                        $current_image_count += $client->plan->image_count;
                    } else if($client->valid_period_type === 'annual') {
                        $plan_expired_at = Carbon::now()->addYear();
                        $current_image_count += $client->plan->image_count * 12;
                    }
                    $client->plan_expired_at = $plan_expired_at;
                    $client->left_image_count = $current_image_count;
                    $client->save();

                    // =============================


                    // fail payment
                    // =============================

//                        Billing::create([
//                            "plan_id" => $plan->id,
//                            "bill_status_id" => $failedGatewayStatus->id,
//                            "billing_info_id" => $billingInfo->id,
//                            "client_id" => $client->id,
//                            "last_card_number" => _Utills::last4Number($creditCard->number),
//                            "valid_period_type" => $valid_period_type,
//                            "issuer" => $request->issuer,
//                        ]);

                    // =============================

                }
            }
        }
    }
}
