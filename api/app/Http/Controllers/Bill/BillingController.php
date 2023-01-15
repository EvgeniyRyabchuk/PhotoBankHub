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
use Illuminate\Support\Facades\Log;


class BillingController extends Controller
{
    public function index(Request $request) {
        $client = Auth::user()->client;
        $query = Billing::with('plan', 'billStatus', 'billingInfo');
        $query->where('client_id', $client->id);
        $query->orderBy('created_at', 'desc');
        $billings = $query->paginate(8);
        return response()->json($billings);
    }



    public function subscribe(Request $request) {
        $client = Auth::user()->client;
        $plan = Plan::findOrFail($request->plan_id);
        $creditCardId = $request->creditCardId;
        $valid_period_type = $request->valid_period_type;
        $current_image_count = $client->left_image_count;
        $billingInfoId = $request->billing_info_id ?? $client->billing_info_id;

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
            "issuer" => $creditCard->issuer,
        ]);

        // TODO: create or update method
        $newBill = Billing::where([
            'client_id' => $client->id,
            'bill_status_id' => $newStatus->id])
            ->first();

        if($newBill) {
            $newBill->plan_id = $plan->id;
            $newBill->billing_info_id = $billingInfo->id;
            $newBill->valid_period_type = $valid_period_type;
            $newBill->save();
        } else {
            $newBill = Billing::create([
                "plan_id" => $plan->id,
                "billing_info_id" => $billingInfo->id,
                "bill_status_id" => $newStatus->id,
                "client_id" => $client->id,
                "valid_period_type" => $valid_period_type,
            ]);
        }

        if(!$creditCardId) {
            $creditCard->save();
        }
        $client->save();
        return response()->json($client);
    }

    public function unsubscribe(Request $request) {
        $client = Auth::user()->client;
        $newStatus = BillStatus::where('name', 'New')
            ->first();

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

        $logDataList = [];

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
                    // change bill with status NEW on Paid
                    $newBillExist->bill_status_id = $paidStatus->id;
                    $newBillExist->billing_info_id = $client->billingInfo->id;
                    $newBillExist->last_card_number = _Utills::last4Number($creditCard->number);
                    $newBillExist->issuer = $creditCard->issuer;
                    $newBillExist->save();

                    // and create new bill with status NEW for future
                    Billing::create([
                        "plan_id" => $client->plan->id,
                        "billing_info_id" => $client->billingInfo->id,
                        "bill_status_id" => $newStatus->id,
                        "client_id" => $client->id,
                        "valid_period_type" => $client->valid_period_type,
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

                    $logDataList[] = [
                       "target_client_id" => $client->id,
                       "left_image_count" => $client->left_image_count,
                        "plan_expired_at" => $client->plan_expired_at,
                        "valid_period_type" => $client->valid_period_type,
                    ];


                    // =============================

                    // fail payment
                    // =============================
//                    $billFail = new Billing();
//                    $billFail->plan_id = $client->plan->id;
//                    $billFail->bill_status_id = $failedGatewayStatus->id;
//                    $billFail->billing_info_id = $client->billingInfo->id;
//                    $billFail->client_id = $client->id;
//                    $billFail->last_card_number = _Utills::last4Number($creditCard->number);
//                    $billFail->valid_period_type = $client->valid_period_type;
//                    $billFail->issuer = $creditCard->issuer;

                    // =============================
                }
            }
        }

        Log::channel('bill-checker-log')->info(' ');
        foreach ($logDataList as $data) {
            Log::channel('bill-checker-log')->info('====== BILL CHECK LOG START ======');

            Log::channel('bill-checker-log')->info('target_client_id = '  . $data['target_client_id']);
            Log::channel('bill-checker-log')->info('left_image_count = '  . $data['left_image_count']);
            Log::channel('bill-checker-log')->info('plan_expired_at = '  . $data['plan_expired_at']);
            Log::channel('bill-checker-log')->info('valid_period_type = '  . $data['valid_period_type']);

            Log::channel('bill-checker-log')->info('====== BILL CHECK LOG END ======');
        }
        Log::channel('bill-checker-log')->info(' ');

    }
}
