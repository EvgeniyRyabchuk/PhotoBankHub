<?php

namespace App\Http\Controllers\Bill;

use App\Http\Controllers\Controller;
use App\Models\CreditCard;
use App\Models\PhotoModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreditCardController extends Controller
{
    public function index(Request $request) {
        $client = Auth::user()->client;
        $cards = CreditCard::where('client_id', $client->id)->get();
        return response()->json($cards);
    }

    protected function storeOrUpdate($request, $mode, $creditCardId = null) : Model {
        $client = Auth::user()->client;

        $number = $request->number;
        $expire_month = $request->expire_month;
        $expire_year = $request->expire_year;
        $cvc = $request->cvc;
        $issuer = $request->issuer;
        $isMain = $request->isMain ?? false;

        if($mode === 'create') {
            $card = new CreditCard();
        } else if($mode === 'update') {
            $card = CreditCard::findOrFail($creditCardId);
        }

        $card->number = $number;
        $card->expire_month = $expire_month;
        $card->expire_year = $expire_year;
        $card->cvc = $cvc;
        $card->issuer = $issuer;
        $card->isMain = $isMain;
        $card->client()->associate($client);
        $card->save();

        return $card;
    }

    public function store(Request $request) {
        $card = $this->storeOrUpdate($request, "create");
        return response()->json($card);
    }

    public function update(Request $request, $creditCardId) {
        $card = $this->storeOrUpdate($request, "update", $creditCardId);
        return response()->json($card);
    }

    public function delete(Request $request, $creditCardId) {
        $client = Auth::user()->client;
        $card = CreditCard::findOrFail($creditCardId);
        if($client->id !== $card->client_id) {
            return response()->json([
                'message' => 'access diny: you does\'t owner the credit card'
            ],403);
        }
        $card->delete();
        return response()->json("OK");
    }

}
