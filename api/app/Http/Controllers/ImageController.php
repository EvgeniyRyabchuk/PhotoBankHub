<?php

namespace App\Http\Controllers;

use App\_Sl\_Utills;
use App\_Sl\ImageHandler;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Image;
use App\Models\ImageOrientation;
use App\Models\PhotoModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


//use Image;


class ImageController extends Controller
{
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

    public function store(Request $request) {
        $name = $request->name;
        $category = Category::findOrFail($request->category_id);
        $photoModelId = $request->photo_model_id;
        $collectionId = $request->collection_id;
        $isFree = $request->is_free ?? false;
        $people_count = $request->people_count ?? 0;

        $imageFile = $request->file('image');

        $processedImage = new ImageHandler($imageFile, $name);

        $ratio = ImageHandler::getImageRation(
            $processedImage->srcWidth,
            $processedImage->srcHeight
        );

        $imageRatioDb = ImageOrientation::firstOrCreate([
                'ratio_side_1' => $ratio[0],
                'ratio_side_2' => $ratio[1],
            ], [
                'name' => $ratio[2],
                'ratio_side_1' => $ratio[0],
                'ratio_side_2' => $ratio[1],
            ]
        );

        $user = Auth::user();
        $creator = $user->creator;

        $image = new Image();
        $image->name = $name;
        $image->imageOrientation()->associate($imageRatioDb);
        $image->category()->associate($category);
        $image->creator()->associate($creator);
        $image->isFree = $isFree;
        $image->people_count = $people_count;
        $image->originalExt = $imageFile->extension();

        if($photoModelId) {
            $photoModel = PhotoModel::findOrFail($photoModelId);
            $image->photoModel()->associate($photoModelId);
        }

        if($collectionId) {
            $collection = Collection::where([
                'id' => $collectionId,
                'creator_id' => $creator->id
            ])->first();
            if(!$creator) {
                return response()->json(['message' =>
                    'such collection not exist'
                ]);
            }
            $image->collection()->associate($collection);
        }
        $image->save();

        $previewPath = $processedImage->savePreview($image->id);

        $originalPath = $processedImage->saveOriginal($image->id, $imageFile->extension());
        $processedImage->saveResized($originalPath, $image->id);

        $image->original = $originalPath;
        $image->preview = $previewPath;
        $image->save();

        // tags

        return response()->json($image);
    }

    public function update(UserUpdateRequest $request, $userId) {

        return response()->json("OK");
    }

    public static function delete(Request $request, $userId) {

        return response()->json("OK");
    }

    public static function InsertWaterMark($privateSrcImgPath, $waterMarkPath) : string {
        $full_image_path = Storage::disk('private')->path($privateSrcImgPath);
        $waterMarkPath = Storage::disk('public')->path($waterMarkPath);

        $timestamp = Carbon::now()->timestamp;
        $distPath = Storage::disk('private')->path('temp'. "/newImageWIthWatermark_$timestamp.png") ;

        $image = Image::make($full_image_path);
        /* insert watermark at bottom-left corner with 5px offset */

        $width = $image->width();
        $height = $image->height();
        $shift = 100;

        for ($y = 0; $y < $height; $y = $y + 500) {
            for ($x = 0; $x < $width; $x = $x + 500) {
                $image->insert($waterMarkPath, 'top-left', $x + $shift, $y);
            }
            $shift = $shift * -1;
        }

        $image->save($distPath);

        return $image->basePath();
    }

    public function download(Request $request) {

        $user = Auth::user();
        if(!$user) {
            return response()->json(['textMessage' => 'no auth'], 401);
        }

        $imageWithWaterMarkPath =
            $this->InsertWaterMark('1.png', 'static/wm_small.png');

        return response()->download(
            $imageWithWaterMarkPath
        )->deleteFileAfterSend();
    }
}
