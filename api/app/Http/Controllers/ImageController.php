<?php

namespace App\Http\Controllers;

use App\_Sl\_Utills;
use App\_Sl\ImageHandler;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Creator;
use App\Models\Download;
use App\Models\Image;
use App\Models\ImageOrientation;
use App\Models\ImageVariant;
use App\Models\PhotoModel;
use App\Models\Size;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


//use Image;


class ImageController extends Controller
{
    // fetching gallery
    public function index(Request $request) {
        $limit = $request->limit ?? 10;

        $search = $request->search ?? null;
        $creatorFullName = $request->creator_full_name ?? null;
        $photoModelId = $request->photo_model_id;

        $categories = json_decode($request->input('categories') ?? '[]');
        $imageOrientations = json_decode($request->input('image_orientations') ?? '[]');

        $isEditorChoice = $request->isEditorsChoice;
        $isFree = $request->isFree;
        $peopleCount = $request->people_count;


        $query = Image::query()->with('creator.user');
        $query->select('images.*');
        // TODO: why
        if($search) {
            $query->where('name', 'LIKE', "%$search%");
            $query->orWhereHas('tags', function ($q) use ($search) {
                $q->where('tags.name', 'LIKE', "%$search%");
            });
        }

        if($categories)
            $query->whereIn('category_id', $categories);
        if($imageOrientations)
            $query->whereIn('image_orientation_id', $imageOrientations);
        if($photoModelId) {
            $query->whereNotNull('photo_model_id');
            $query->where('photo_model_id', $photoModelId);
        }

        if($creatorFullName) {
            $query->join('creators', 'creator_id', 'creators.id');
            $query->join('users', 'creators.user_id', 'users.id');
            $query->where('users.full_name', "LIKE", "%$creatorFullName%");
        }
        //TODO: test
        if($isEditorChoice) {
            $query->where('isEditorsChoice', $isEditorChoice);
        }
        if($isFree) {
            $query->where('isFree', $isFree);
        }
        if($peopleCount) {
            $query->where('people_count', $peopleCount);
        }

        $query->withCount('views');
        $query->withCount('likes');
        $query->withCount('downloads');

        $images = $query->paginate($limit);

        return response()->json($images);
    }

    // method for getting detail information about image
    public function show(Request $request, $imageId) {
        $query = Image::with(
                'creator.user',
                'tags',
                'photoModel',
                'collection',
                'imageOrientation',
                'category',
        )->where('id', $imageId);

        $query->withCount('likes');
        $query->withCount('views');
        $query->withCount('downloads');

        $image = $query->first();

        return response()->json($image);
    }

    // mode = create or update

    protected function saveOrUpdate($mode, $request, $imageId = null) : array {
        $user = Auth::user();
        $creator = $user->creator;

        $name = $request->name;
        $category = Category::findOrFail($request->category_id);

        $photoModelId = $request->photo_model_id;
        $collectionId = $request->collection_id;
        $isFree = $request->is_free ?? false;
        $people_count = $request->people_count ?? 0;
        $tags = json_decode($request->tags ?? '[]');


        // get image by id and check if image belong to creator
        if($mode === 'update') {
            $image = Image::where([
                'creator_id' => $creator->id,
                'id' => $imageId])
            ->first();

            if(!$image) {
                return [
                    'error_message' => 'this image doesn\'t belong to you',
                    'error_code' => 404,
                    'payload' => null
                ];
            }
        } else {
            $image = new Image();
        }

        if($mode === 'create') {
            $imageFile = $request->file('image');
            $ratio = ImageHandler::getImageRation($imageFile);
            $imageRatioDb = ImageOrientation::firstOrCreate([
                'ratio_side_1' => $ratio[0],
                'ratio_side_2' => $ratio[1],
            ], [
                    'name' => $ratio[2],
                    'ratio_side_1' => $ratio[0],
                    'ratio_side_2' => $ratio[1],
                ]
            );
            $image->imageOrientation()->associate($imageRatioDb);
        }


        $image->name = $name;
        $image->category()->associate($category);
        $image->creator()->associate($creator);
        $image->isFree = $isFree;
        $image->people_count = $people_count;

        // option add photo model info to image
        if($photoModelId) {
            $photoModel = PhotoModel::findOrFail($photoModelId);
            $image->photoModel()->associate($photoModelId);
        }

        // add new image to collection if collection id exist in request
        if($collectionId) {
            $collection = Collection::where([
                'id' => $collectionId,
                'creator_id' => $creator->id
            ])->first();
            if(!$creator) {
                 return [
                     'error_message' => 'such collection not exist',
                     'error_code' => 404,
                     'payload' => null
                 ];
            }
            $image->collection()->associate($collection);
        }

        $image->save();

        // adding tags if they exist in request
        if(count($tags) > 0) {
            foreach ($tags as $tag) {
                $tagDb = Tag::firstOrCreate(
                    ['name' => $tag,],
                    ['name' => $tag]
                );
                $image->tags()->attach($tagDb);
            }
        }

        if($mode === 'create') {
            // save image in storage folder
            $processedImage = new ImageHandler($imageFile, $image, $name);
            $previewPath = $processedImage->savePreview();
            $originalPath = $processedImage->saveOriginal();
            $processedImage->saveResized($originalPath);

            $image->original = $originalPath;
            $image->originalExt = $imageFile->extension();
            $image->preview = $previewPath;
        }

        $image->save();

        return [
            "error_message" => null,
            "error_code" => null,
            'payload' => $image
        ];
    }


    // add image
    public function store(Request $request) {
        $result = $this->saveOrUpdate('create', $request);
        if(!is_null($result["error_message"])) {
            return response()->json(
                ['message' => $result["error_message"]],
                $result["error_code"]
            );
        }
        return response()->json($result["payload"]);
    }

    // update image
    public function update(Request $request, $imageId) {
        $result = $this->saveOrUpdate('update', $request, $imageId);
        if(!is_null($result["error_message"])) {
            return response()->json(
                ['message' => $result["error_message"]],
                $result["error_code"]
            );
        }
        return response()->json($result["payload"]);
    }

    // delete image
    public static function delete(Request $request, $imageId) {
        $creator = Auth::user()->creator;
        $image = Image::where(['creator_id' => $creator->id, 'id' => $imageId])->first();
        if(!$image) {
            return response()->json(
                ['message' => 'this image doesn\'t belong to you'],
            404);
        }
        $image->delete();
        return response()->json("OK");
    }

    // download image
    public function downloadPreview(Request $request, $imageId) {
        $image = Image::findOrFail($imageId);
        $filePath = Storage::disk('public')->path($image->preview);
        return response()->download($filePath)->deleteFileAfterSend();
    }

    // download image
    public function download(Request $request, $imageId, $sizeId) {
        $user = Auth::user();
        $image = Image::findOrFail($imageId);
        $size = Size::findOrFail($sizeId);

        //TODO: check if image is free

        if($image->isFree !== true) {
            // checking access
            if ($user->role->name === 'client') {
                $client = $user->client;
                if ($client->plan->access_level >= $size->min_access_level) {
                    if (Carbon::parse($client->plan_expired_at)->gt(Carbon::now())) {
                        if ($client->left_image_count > 0) {
                            $alreadyHaveDownload = Download::where([
                                    'client_id' => $client->id,
                                    'image_id' => $image->id]
                            )->first();
                            if(!$alreadyHaveDownload) {
                                Download::create([
                                    'client_id' => $client->id,
                                    'image_id' => $image->id,
                                    'size_id' => $size->id
                                ]);
                                $client->left_image_count--;
                                $client->save();
                            }
                        } else {
                            return response()->json([
                                'message' => 'access deny for client left_image_count'
                            ], 403);
                        }
                    } else {
                        return response()->json([
                            'message' => 'access deny for client plan_expired_at'
                        ], 403);
                    }
                } else {
                    return response()->json([
                        'message' => 'access deny for client access_level'
                    ], 403);
                }
            } else if ($user->role->name === 'creator') {
                $creator = $user->creator;
                if ($image->creator_id !== $creator->id) {
                    return response()->json([
                        'message' => 'access deny for creator'
                    ], 403);
                }
            }
        }

        $imageVariant = ImageVariant::where(['image_id' => $image->id, 'size_id' => $size->id])->first();
        $path = Storage::disk('private')->path($imageVariant->path);

        return response()->download($path)->deleteFileAfterSend();
    }
}
