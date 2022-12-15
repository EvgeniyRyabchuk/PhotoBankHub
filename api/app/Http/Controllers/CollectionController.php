<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Collection;
use App\Models\CreditCard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{
    public function index(Request $request) {
        $collections = Collection::with('creator.user')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($collections);
    }

    protected function storeOrUpdate($request, $mode, $creator, $collection = null) : Model {
        $name = $request->name;
        $description = $request->description;

        if($mode === 'create') {
            $collection = new Collection();
        }

        $collection->name = $name;
        $collection->description = $description;
        $collection->backgroundImg = $description;
        $collection->creator()->associate($creator);
        $collection->save();

//        if($request->hasFile('backgroundImg')) {
//            $ext = $request->file('backgroundImg')->extension();
//            $location = "/collections/$collection->id/";
//            $request->file('backgroundImg')->storeAs($location, "backgroundImg.$ext");
//            $collection->preview = $location."backgroundImg.$ext";
//            $collection->save();
//        }

        return $collection;
    }

    public function store(Request $request) {
        $creator = Auth::user()->creator;
        $collection = $this->storeOrUpdate($request, "create", $creator);
        return response()->json($collection);
    }

    public function update(Request $request, $collectionId) {

        $creator = Auth::user()->creator;
        $collection = Collection::where([
            'creator_id' => $creator->id,
            'id' => $collectionId,
        ])->first();
        if(!$collection) {
            return response()->json(['message' => "access deny: not your collection"], 403);
        }
        $newCollection = $this->storeOrUpdate($request, "update", $creator, $collection);
        return response()->json($newCollection);
    }

    public function delete(Request $request, $collectionId) {
        $user = Auth::user();
        if($user->creator) {
            $collection = Collection::where([
                'creator_id' => $user->creator->id,
                'id' => $collectionId
            ])->first();
            if(!$collection) {
                return response()->json(['message' => "access deny: not your collection"], 403);
            }
        }
        else if($user->admin) {
            $collection = CreditCard::findOrFail($collectionId);
        }

        $collection->delete();

        return response()->json("OK");
    }
}
