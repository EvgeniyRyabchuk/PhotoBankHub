<?php

namespace App\Http\Controllers\Bill;

use App\Http\Controllers\Controller;
use App\Models\BillingInfo;
use App\Models\Category;
use App\Models\CreditCard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BillingInfoController extends Controller
{
    public function show(Request $request) {
        $client = Auth::user()->client;
        $info = $client->billingInfo;
        return response()->json($info);
    }

    protected function storeOrUpdate($request, $mode, $client, $billingInfoId = null) : Model {

        $client = Auth::user()->client;

        $full_name = $request->full_name;
        $email = $request->email;
        $country = $request->country;
        $city = $request->city;
        $street = $request->street;
        $companyName = $request->companyName;
        $zipCode = $request->zipCode;
        $phone_number = $request->phone_number;

        if($mode === 'create') {
            $billingInfo = new BillingInfo();
        } else if($mode === 'update') {
            $billingInfo = BillingInfo::findOrFail($billingInfoId);
        }

        $billingInfo->full_name = $full_name;
        $billingInfo->email = $email;
        $billingInfo->country = $country;
        $billingInfo->city = $city;
        $billingInfo->street = $street;
        $billingInfo->companyName = $companyName;
        $billingInfo->zipCode = $zipCode;
        $billingInfo->phone_number = $phone_number;
        $billingInfo->save();

        $client->billingInfo()->associate($billingInfo);
        $client->save();

        return $billingInfo;
    }

    public function store(Request $request) {
        $client = Auth::user()->client;
        if($client->billingInfo) {
            return response()->json([
                'message' => "Billing info already exist. You can update it if you want"
            ]);
        }
        $newBillingInfo = $this->storeOrUpdate($request,"create", $client);
        return response()->json($newBillingInfo);
    }

    public function update(Request $request, $billingInfoId) {
        $client = Auth::user()->client;
        if(!$client->billingInfo) {
            return response()->json([
                'message' => "Billing info dest not exist"
            ]);
        }
        $newBillingInfo = $this->storeOrUpdate($request,"update", $client, $billingInfoId);
        return response()->json($newBillingInfo);
    }

}
