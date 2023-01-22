<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Collection;
use App\Models\CreditCard;
use App\Models\Favorite;
use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    public function index(Request $request) {
        $creatorIdParam = $request->creatorId;

        $query = Collection::with('creator.user')
            ->withCount('images')
            ->orderBy('created_at', 'desc');

       if($creatorIdParam) {
           $query->where('creator_id', $creatorIdParam);
       }

       $collections = $query->get();

        $collections = $collections->map(function ($collection) {
            $collection->images = $collection->images->take(1);
            $collection->imageIds = $collection->imageIds->pluck('image_id');
            return $collection;
        });

        return response()->json($collections);
    }

    protected function attahcOrDettachImageFromCollection($request, $isAttach, $many = false) {
        $creator = Auth::user()->creator;
        $collectionId = $request->collectionId;

        $collection = Collection::with('creator.user')
            ->withCount('images')
            ->where(['creator_id' => $creator->id, 'id' => $collectionId])
            ->first();

        if(!$collection) {
            return [
                'error_message' => 'access deny: not your collection',
                'error_code' => 403,
                'payload' => null
            ];
        }

        if(!$isAttach && $many) {
            $imageIds = explode(',', $request->imageIds);
            $imagesInCollection = Image::where(['collection_id' => $collectionId])
                ->whereIn('id', $imageIds)
                ->first();
            if(!$imagesInCollection) {
                return [
                    'error_message' => 'such image not exist in this collection',
                    'error_code' => 404,
                    'payload' => null
                ];
            }
            foreach ($imagesInCollection as $image) {
                $collection->images()->delete($image);
            }
            $collection->save();
            $images = Image::where('collection_id', $collection->id)->paginate(15);
            return ['payload' => $images];
        }

        $imageId = $request->imageId;
        $image = Image::findOrFail($imageId);

        if($isAttach) {
            $imageInCollection = Image::where(['id' => $imageId])->first();

            if(!$imageInCollection) {
                return [
                    'error_message' => 'such image not exist',
                    'error_code' => 404,
                    'payload' => null
                ];
            }
            $imageInCollection->collection()->associate($collection);
        }
        else {
            $imageInCollection = Image::where([
                'id' => $imageId,
                'collection_id' => $collectionId
            ])->first();

            if(!$imageInCollection) {
                return [
                    'error_message' => 'such image not exist in this collection',
                    'error_code' => 404,
                    'payload' => null
                ];
            }
            $imageInCollection->collection()->dissociate($collection);
        }

        $imageInCollection->save();
        $collection->images_count = Image::where('collection_id', $collection->id)->count();

        return ['payload' => $collection];
    }

    public function addImageToCollections(Request $request, $collectionId) {
        $result = $this->attahcOrDettachImageFromCollection($request, true);
        $data = $result['payload'];
        if(!$data) {
            return response()->json([
                'message' => $result['error_message']], $result['error_code'
            ]);
        }
        return response()->json($data);
    }

    public function deleteImageFromCollections(Request $request, $collectionId, $imageId) {
        $result = $this->attahcOrDettachImageFromCollection($request, false);
        $data = $result['payload'];
        if(!$data) {
            return response()->json([
                'message' => $result['error_message']], $result['error_code'
            ]);
        }
        return response()->json($data);
    }

    public function deleteImageFromCollectionsMany(Request $request, $collectionId) {
        $result = $this->attahcOrDettachImageFromCollection($request, false, true);
        $data = $result['payload'];
        if(!$data) {
            return response()->json([
                'message' => $result['error_message']], $result['error_code'
            ]);
        }
        return response()->json($data);
    }

    public function getImageByCollection(Request $request, $collectionId) {
        $collection = Collection::where('collections.id', $collectionId)
            ->leftJoin('images', 'collections.id', 'images.collection_id')
            ->orderBy('created_at', 'desc')
            ->withCount('images')
            ->first();

        if(!$collection) {
            return response()->json(['message' => 'such collection not exist'], 404);
        }

        $imageIds = $collection->images->pluck('id');
        $images = Image::with('creator.user', 'tags', 'imageVariants.size')
            ->whereIn('images.id', $imageIds)
            ->select('images.*')
            ->paginate(15);

        return response()->json(compact('images', 'collection'));
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
