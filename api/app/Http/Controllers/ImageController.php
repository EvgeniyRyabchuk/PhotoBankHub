<?php

namespace App\Http\Controllers;

use App\_Sl\ImageHandler;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Download;
use App\Models\Image;
use App\Models\ImageOrientation;
use App\Models\ImageVariant;
use App\Models\Like;
use App\Models\PhotoModel;
use App\Models\Size;
use App\Models\Tag;
use App\Models\View;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use function Symfony\Component\String\s;


class ImageController extends Controller
{
    // fetching gallery
    public function index(Request $request) {
        // search by photo model
        $limit = $request->limit ?? 15;
        $orderTarget = $request->order ?? 'created_at';
        $orderDirection = $request->orderDirection ?? 'desc';

        $level = $request->level ?? 1;

        $search = $request->search ?? null;
        $searchByName = $request->name ?? null;
        $creatorName = $request->creatorName ?? null;
        $tags = $request->tags ? explode(',', $request->tags) : null;

        $photoModelId = $request->photo_model_id;
        $categories = $request->categoriesIds ? explode(',', $request->categoriesIds) : null;
        $imageOrientationsIds = $request->orientationsIds ? explode(',', $request->orientationsIds) : null;

        $isEditorsChoice = $request->isEditorChoice ?? null;
        $isFree = $request->isFree;
        $peopleCount = $request->people_count;

        $photoModelName = $request->photoModelName;
        $ageRange = $request->photoModelAgeRange ? explode(',', $request->photoModelAgeRange) : null;
        $genders =  $request->genders ? explode(',', $request->genders) : null;
        $ethnicities = $request->ethnicities ? explode(',', $request->ethnicities) : null;

        $createdAtRange = $request->createdAtRange ? explode(',', $request->createdAtRange) : null;
        $sizeIndex = $request->sizeIndex ?? null;

        $originalSize = Size::where('name', 'ORIGINAL')->first();


        $query = Image::query()->with('creator.user', 'photoModel', 'imageVariants.size', 'tags');

        $query->select('images.*');

        if($createdAtRange) {
            $createdAtRange = [
                Carbon::parse($createdAtRange[0]),
                Carbon::parse($createdAtRange[1]),
            ];

            $query->whereBetween('images.created_at', $createdAtRange);
        }

        // search by image name or tags
        if($search) {
            $query->where(function ($q) use($search) {
                $q->where('name', 'LIKE', "%$search%");
                $q->orWhereHas('tags', function ($qq) use ($search) {
                    $qq->where('tags.name', 'LIKE', "%$search%");
                });
            });
        }

        // search only by name
        if($searchByName) {
            $query->where(function ($q) use($searchByName) {
                $q->where('name', 'LIKE', "%$searchByName%");
            });
        }
        // search only by tags
        if($tags) {
            $tagsDb = Tag::whereIn('name', $tags)->get();
            $query->join('image_tag', 'image_tag.image_id', 'images.id');
            $query->whereIn('image_tag.tag_id', $tagsDb->pluck('id'));
        }

        if($level) {
            switch ($level) {
                case 1: break;
                case 2:
                    $query->where('isFree', true);
                    break;
                case 3:
                    $query->where('isFree', false);
            }
        }

        if($sizeIndex) {
            $sizes = config('const_data.sizeTitles');
            $size = $sizes[$sizeIndex];
            $mbFactor = 1000000;
            $query->join('image_variants', 'images.id', 'image_variants.image_id');
            $query->where('image_variants.size_id', $originalSize->id);

            switch ($size) {
                case '<5 MB':
                    $maxSizeInByte = 5 * $mbFactor;
                    $query->where('image_variants.size_in_byte', '<=', $maxSizeInByte);
                    break;
                case '> 5 MP < 15 MB':
                    $minSizeInByte = 5 * $mbFactor;
                    $maxSizeInByte = 15 * $mbFactor;
                    $query->where('image_variants.size_in_byte', '>=', $minSizeInByte);
                    $query->where('image_variants.size_in_byte', '<=', $maxSizeInByte);
                    break;
                case '> 15 MP < 20 MB':
                    $minSizeInByte = 15 * $mbFactor;
                    $maxSizeInByte = 20 * $mbFactor;
                    $query->where('image_variants.size_in_byte', '>=', $minSizeInByte);
                    $query->where('image_variants.size_in_byte', '<=', $maxSizeInByte);
                    break;
                case '20+ MB':
                    $minSizeInByte = 20 * $mbFactor;
                    $query->where('image_variants.size_in_byte', '>=', $minSizeInByte);
                    break;
                default: break;
            }
        }


        if($categories)
            $query->whereIn('category_id', $categories);
        if($imageOrientationsIds)
            $query->whereIn('image_orientation_id', $imageOrientationsIds);
        if($photoModelId) {
            $query->whereNotNull('photo_model_id');
            $query->where('photo_model_id', $photoModelId);
        }

        if($photoModelName || $ageRange || $genders || $ethnicities) {
            $query->leftJoin('photo_models',
                'images.photo_model_id',
                'photo_models.id');
        }

        if($photoModelName) {
            $query->where('photo_models.full_name', "LIKE", "%$photoModelName%");
        }

        if($creatorName) {
            $query->join('creators', 'creator_id', 'creators.id');
            $query->join('users', 'creators.user_id', 'users.id');
            $query->where('users.full_name', "LIKE", "%$creatorName%");
        }

        if($isEditorsChoice) {
            $query->where('isEditorsChoice', $isEditorsChoice);
        }
        if($isFree) {
            $query->where('isFree', $isFree);
        }
        if($peopleCount) {
            $query->where('people_count', $peopleCount);
        }



        if($ageRange && count($ageRange) === 2) {
            $query->whereBetween('photo_models.age', $ageRange);
        }
        if($genders) {
            $query->whereIn('photo_models.gender', $genders);
        }
        if($ethnicities) {
            $query->whereIn('photo_models.ethnicity', $ethnicities);
        }

        $query->withCount('views');
        $query->withCount('likes');
        $query->withCount('downloads');
        // order = views_count, likes_count or downloads_count. orderDirection = asc or desc

        switch ($orderTarget) {
            case 'created_at':
                $query->orderBy('created_at', $orderDirection);
            break;
            case 'views':
                $query->orderBy('views_count', $orderDirection);
            break;
            case 'download':
                $query->orderBy('downloads_count', $orderDirection);
                break;
        }




//        $query->join('image_variants', 'images.id', 'image_variants.image_id');
//        $query->join('sizes', 'image_variants.size_id', 'sizes.id');
//        $query->where('sizes.id', $originalSize->id);

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
                'imageVariants.size'
        )->where('id', $imageId);

        $query->withCount('likes');
        $query->withCount('views');
        $query->withCount('downloads');

        $image = $query->first();

        return response()->json($image);
    }

    // mode = create or update
    protected function storeOrUpdate($mode, $request, $imageId = null) : array {
        $user = Auth::user();
        $creator = $user->creator;

        $name = $request->name;
        $category = Category::findOrFail($request->category_id);

        $photoModelId = $request->photo_model_id;
        $collectionId = $request->collection_id;
        $isFree = $request->is_free ?? false;
        $people_count = $request->people_count ?? 0;
        $tags = json_decode($request->tags ?? '[]');

        $nestedCategory = Category::where('parent_id', $category->id)->first();
        if($nestedCategory) {
            return [
                'error_message' => 'this category have child categories',
                'error_code' => 404,
                'payload' => null
            ];
        }

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
            $originalFile = $processedImage->saveOriginal();
            $processedImage->saveResized($originalFile['location'], $originalFile['filename']);

            $image->original = $originalFile['location'];
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
        $result = $this->storeOrUpdate('create', $request);
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
        $result = $this->storeOrUpdate('update', $request, $imageId);
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
//        return response()->download($filePath)->deleteFileAfterSend();
        return response()->download($filePath);
    }

    // download image
    public function download(Request $request, $imageId, $imageVariantId) {
        $user = Auth::user();
        $image = Image::findOrFail($imageId);
        $imageVariant = ImageVariant::findOrFail($imageVariantId);


        if($image->isFree !== true) {
            // checking access
            if ($user->role->name === 'client') {
                $client = $user->client;
                if ($client->plan->access_level >= $imageVariant->size->min_access_level) {
                    if (Carbon::parse($client->plan_expired_at)->gt(Carbon::now())) {
                        if ($client->left_image_count > 0) {
                            $alreadyHaveDownload = Download::where([
                                    'client_id' => $client->id,
                                    'image_id' => $image->id
                                ])->first();
                            if(!$alreadyHaveDownload) {
                                Download::create([
                                    'client_id' => $client->id,
                                    'image_id' => $image->id,
                                    'image_variant_id' => $imageVariant->size->id
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

        $path = Storage::disk('private')->path($imageVariant->path);

        return response()->download($path);
    }


    public function addLike(Request $request, $imageId) {
        $client = Auth::user()->client;
        $image = Image::findOrFail($imageId);
        $likeExist = Like::where([
           'client_id' => $client->id,
           'image_id' => $image->id
        ])->first();

        if(!$likeExist) {
            $like = new Like();
            $like->client()->associate($client);
            $like->image()->associate($image);
            $like->ip = $request->ip();
            $like->save();
        } else {
            $likeExist->delete();
        }

        $currentLikeCount = Like::where('image_id', $image->id)->count();
        return response()->json(compact('currentLikeCount'));
    }

    public function addView(Request $request, $imageId) {
        $image = Image::findOrFail($imageId);
        $viewExist = View::where([
            'image_id' => $image->id,
            'ip' => $request->ip()
        ])->first();

        if($viewExist){
            return response()->json(['message' => 'view with such ip already exist']);
        }

        $view = new View();
        $view->image()->associate($image);
        $view->ip = $request->ip();
        $view->save();

        $currentViewCount = View::where('image_id', $image->id)->count();
        return response()->json(compact('currentViewCount'));
    }

    public function likeable(Request $request, $imageId) {
        $counter = [];
        $image = Image::findOrFail($imageId);

        // same image (by tags)
        $tagIds = $image->tags->pluck('id');

        $sameImageByTagsQuery = DB::table('image_tag')
            ->join('tags', 'image_tag.tag_id', 'tags.id')
            ->join('images', 'image_tag.image_id', 'images.id')
            ->select('images.*')
            ->whereIn('tags.id', $tagIds)
            ->orderBy('images.created_at', 'desc');

        $sameImageByTags = $sameImageByTagsQuery->take(20)->get();
        $counter[] = ['sameImageByTags' => $sameImageByTagsQuery->count()];

        // same collection
        $sameImageByCollectionQuery =
            Image::with('imageVariants.size')
                ->where('collection_id', $image->collection_id)
            ->orderBy('created_at', 'desc');

        $sameImageByCollection = $sameImageByCollectionQuery->take(20)->get();
        $counter[] = ['sameImageByCollection' => $sameImageByCollectionQuery->count()];

        // same creator

        $sameImageByCreatorQuery =
            Image::with('imageVariants.size')
                ->where('creator_id', $image->creator_id)
                ->orderBy('created_at', 'desc');

        $sameImageByCreator = $sameImageByCreatorQuery->take(20)->get();
        $counter[] = ['sameImageByCreator' => $sameImageByCreatorQuery->count()];


        // same category

        $sameImageByCategoryQuery =
            Image::with('imageVariants.size')
                ->where('category_id', $image->category_id)
                ->orderBy('created_at', 'desc');

        $sameImageByCategory = $sameImageByCategoryQuery->take(20)->get();
        $counter[] = ['sameImageByCategory' => $sameImageByCategoryQuery->count()];

        // same model (if exist)
        $sameImageByModel = [];

        if($image->photoModel) {
            $sameImageByModelQuery =
                Image::with('imageVariants.size')->leftJoin('photo_models', 'images.photo_model_id', 'photo_models.id')
                    ->where('photo_models.id', $image->photo_model_id)
                    ->orderBy('images.created_at', 'desc');

            $sameImageByModel = $sameImageByModelQuery->take(20)->get();
            $counter[] = ['sameImageByModel' => $sameImageByModelQuery->count()];
        }

        $sameImageByTags->map(function ($image) {
            $image->image_variants = ImageVariant::with('size')
                ->where('image_id', $image->id)
                ->get();
            return $image;
        });



        return response()->json(compact(
  'sameImageByTags',
'sameImageByCollection',
            'sameImageByCreator',
            'sameImageByCategory',
            'sameImageByModel',
            'counter'
        ));
    }





    public function getMinMax(Request $request) {
        $createdAt = [ Image::min('created_at'), Image::max('created_at') ];
        $photoModelAgeRange = [ PhotoModel::min('age'), PhotoModel::max('age')];

        return response()->json(compact('createdAt', 'photoModelAgeRange'));
    }

    public function getLevels() {
        $levels = config('const_data.levels');
        return response()->json($levels);
    }

    public function getSizes() {
        $sizes = config('const_data.sizeTitles');
        return response()->json($sizes);
    }

    public function getOrientations() {
        $orientations = ImageOrientation::all();
        return response()->json($orientations);

    }
}
