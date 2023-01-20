<?php

namespace App\Http\Controllers;

use App\Models\PhotoModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhotoModelController extends Controller
{
    public function index(Request $request) {
        $full_name = $request->full_name;
        $ageRange = json_decode($request->ageRange);
        $gender = $request->gender;
        $ethnicity = $request->ethnicity;
        $created_by_creator_id = $request->created_by_creator_id;
        $isPaginate = filter_var($request->paginate ?? true, FILTER_VALIDATE_BOOLEAN);

        $query = PhotoModel::with('images');
        $query->select('photo_models.*');

        if($full_name) {
            $query->where('full_name', 'LIKE', "%$full_name%");
        }
        if($ageRange && count($ageRange) === 2) {
            $query->whereBetween('age', [$ageRange[0], $ageRange[1]]);
        }
        if($gender) {
            $query->where('gender', $gender);
        }
        if($ethnicity) {
            $query->where('ethnicity', $ethnicity);
        }
        if($created_by_creator_id) {
            $query->where('created_by_creator_id', $created_by_creator_id);
        }

        $query->withCount('images');
        $query->orderBy('images_count', 'desc');

        if($isPaginate === true)
            $photoModels = $query->paginate(20);
        else
            $photoModels = $query->get();

        return response()->json($photoModels);
    }

    protected function storeOrUpdate($request, $mode, $photoModelId = null) : Model {
        $user = Auth::user();

        $full_name = $request->full_name;
        $age = $request->age;
        $gender = $request->gender;
        $ethnicity = $request->ethnicity;

        $created_by_creator_id = $user->creator->id;

        if($mode === 'create') {
            $photoModel = new PhotoModel();
        } else if($mode === 'update') {
            $photoModel = PhotoModel::findOrFail($photoModelId);
        }

        $photoModel->full_name = $full_name;
        $photoModel->age = $age;
        $photoModel->gender = $gender;
        $photoModel->ethnicity = $ethnicity;
        $photoModel->creator()->associate($created_by_creator_id);
        $photoModel->save();

        if($request->hasFile('avatar')) {
            $fileName = time() . '.' .  $request->file('avatar')->extension();
            $fileLocation = "photoModels/$photoModel->id/avatars/";
            $request
                ->file('avatar')
                ->storeAs($fileLocation, $fileName);

            $photoModel->avatar = $fileLocation . $fileName;
            $photoModel->save();
        }

        return $photoModel;
    }

    public function store(Request $request) {
        $photoModel = $this->storeOrUpdate($request, "create");
        return response()->json($photoModel);
    }

    public function update(Request $request, $photoModelId) {
        $photoModel = $this->storeOrUpdate($request, "update", $photoModelId);
        return response()->json($photoModel);
    }

    public function delete(Request $request, $photoModelId) {
        $creator = Auth::user()->creator;
        $photoModel = PhotoModel::findOrFail($photoModelId);
        if($photoModel->creator->id !== $creator->id) {
            return response()->json([
                'message' => 'access diny: you does\'t owner the photo model entry'
            ],403);
        }
        $photoModel->delete();
        return response()->json("OK");
    }

    public function getAllEthnicity() {
        // The pluck method retrieves all of the values for a given key
//        $ethnicities =  PhotoModel::query()
//            ->select('ethnicity')
//            ->distinct()
//            ->pluck('ethnicity');
        $ethnicity = config('const_data.ethnicity');

        return response()->json($ethnicity);
    }

    public function getAllGender() {
//        $genders = PhotoModel::query()
//            ->select('gender')
//            ->distinct()
//            ->pluck('gender');
        $genders = config('const_data.genders');

        return response()->json($genders);
    }

}
