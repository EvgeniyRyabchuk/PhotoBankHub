<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Phone;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return response()->json($users);
    }

    public function show(Request $request, $userId) {
        $user = User::findOrFail($userId);
        return response()->json($user);
    }

    public function store() {

    }

    public function update(UserUpdateRequest $request, $userId) {

        $user = User::findOrFail($userId);
        if($user->full_name !== $request->full_name) {
            if(User::where('email', $request->email)->first()) {
                return response()->json(['message' =>
                    'Such email already exist'], 405);
            }
        }

        $user->full_name = $request->full_name;
        $user->email = $request->email;


        if($request->has('phone')) {
            $phoneDataDecoded = json_decode($request->phone);

            $phone = Phone::create([
                'phone_number' => $phoneDataDecoded->phone->number,
                'countryCode' => $phoneDataDecoded->phone->countryData->name,
                'name' =>$phoneDataDecoded->phone->countryData->dialCode,
                'dialCode' => $phoneDataDecoded->phone->countryData->countryCode,
                'format' => $phoneDataDecoded->phone->countryData->format,
            ]);

            $user->phone()->associate($phone);
        }



        if($request->hasFile('avatar')) {
            $avatarImg = $request->file('avatar');
            $path = Storage::put("users/$user->id/avatar", $avatarImg);
            $user->avatar = $path;
        }
        $user->save();
        return response()->json("OK");
    }

    public function delete(Request $request, $userId) {
        $user = User::findOrFail($userId);
        $user->delete();
        return response()->json("OK");
    }
}
