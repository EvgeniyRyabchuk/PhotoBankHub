<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\CreditCard;
use App\Models\Favorite;
use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function getFavorites(Request $request) {
        $client = Auth::user()->client;
        $favorites = Favorite::where('client_id', $client->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($favorites);
    }

    public function getImageByFavorite(Request $request, $clientId, $favoriteId) {
        $client = Auth::user()->client;
        $favorite = Favorite::where([
            'client_id' => $client->id,
            'id' => $favoriteId
        ])->first();
        if(!$favorite) {
            return response()->json(['message' => 'such favorite not exist for your'], 404);
        }

        $images = DB::table('favorite_image')
        ->where('favorite_id', $favorite->id)
        ->select('images.*')
        ->join('images', 'favorite_image.image_id', 'images.id')
        ->orderBy('favorite_image.created_at', 'desc')
        ->get();

        return response()->json($images);
    }

    protected function attahcOrDettachImageFromFavorite($request, $isAttach) {
       //TODO: chech if image already exist in favorite
        $client = Auth::user()->client;
        $favoriteId = $request->favoriteId;
        $imageId = $request->imageId;
        $image = Image::findOrFail($imageId);

        $favorite = Favorite::where([
            'client_id' => $client->id,
            'id' => $favoriteId,
        ])->first();
        if(!$favorite) {
            return response()->json(['message' => "access deny: not your favorite"], 403);
        }

        if($isAttach)
            $favorite->images()->attach($image);
        else
            $favorite->images()->detach($image);

        $favorite->save();
        $favorite->load('images');
        return $favorite;
    }

    public function addImageToFavorite(Request $request, $clientId, $favoriteId) {
        $newFavorite = $this->attahcOrDettachImageFromFavorite($request, true);
        return response()->json($newFavorite);
    }

    public function deleteImageFromFavorite(Request $request, $clientId, $favoriteId, $imageId) {
        $newFavorite = $this->attahcOrDettachImageFromFavorite($request, false);
        return response()->json($newFavorite);
    }



    protected function storeOrUpdateFavorite($request, $mode, $client, $favorite = null): Model {
        $title = $request->title;

        if($mode === 'create') {
            $favorite = new Favorite();
        }

        $favorite->title = $title;
        $favorite->client()->associate($client);
        $favorite->save();

        return $favorite;
    }

    public function addFavorite(Request $request, $clientId) {
        $client = Auth::user()->client;
        $newFavorite = $this->storeOrUpdateFavorite($request, "create", $client);
        return response()->json($newFavorite);
    }

    public function updateFavorite(Request $request, $clientId, $favoriteId) {
        $client = Auth::user()->client;
        $favorite = Favorite::where([
            'client_id' => $client->id,
            'id' => $favoriteId,
        ])->first();
        if(!$favorite) {
            return response()->json(['message' => "access deny: not your favorite"], 403);
        }
        $newFavorite = $this->storeOrUpdateFavorite($request, "update", $client, $favorite);
        return response()->json($newFavorite);
    }

    public function deleteFavorite(Request $request, $clientId, $favoriteId) {
        $user = Auth::user();

        $favorite = Favorite::where([
            'client_id' => $user->client->id,
            'id' => $favoriteId
        ])->first();
        if(!$favorite) {
            return response()->json(['message' => "access deny: not your collection"], 403);
        }

        $favorite->delete();
        return response()->json("OK");
    }



}
