<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\Client;
use App\Models\Creator;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{

    public function register(RegistrationRequest $request) {
        $full_name = $request->full_name;
        $email = $request->email;
        $password = $request->password;
        $roleId = $request->roleId;

        $defAvatarPath = '/static/avatars/default_avatar.png';

        $role = Role::findOrFail($roleId);

        $user = User::create([
            'full_name' => $full_name,
            'email' => $email,
            'password' => Hash::make($password),
            'avatar' => $defAvatarPath,
            'role_id' => $roleId,
        ]);

        switch ($role->name) {
            case 'client':
                    Client::create(['user_id' => $user->id,]);
                break;
            case 'creator':
                Creator::create(['user_id' => $user->id,]);
                break;
        }

        return response()->json("OK");
    }

    public function profile(Request $request) {
        $user = Auth::user();
        return response()->json($user);
    }

    public function profileDetail(Request $request) {
        $user = Auth::user();
        $user->load(
    'client',
            'creator',
            'phone',
            'role',

            'client.plan',
            'client.creditCard',
            'client.billingInfo',
            'client.billingInfo',
            'client.billing',
            'client.favorites',
            'client.downloads',

            'creator.collections',
            'creator.images',
        );

        return response()->json($user);
    }


    protected function revokeAccessAndRefreshTokens($tokenId) {
        $tokenRepository = app('Laravel\Passport\TokenRepository');
        $refreshTokenRepository = app('Laravel\Passport\RefreshTokenRepository');

        $tokenRepository->revokeAccessToken($tokenId);
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($tokenId);
    }

    public function logout(Request $request) {
        $user = Auth::user();

        // revoke access and refresh token
        $user->token()->revoke();
        $refreshTokenRepository = app('Laravel\Passport\RefreshTokenRepository');
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($user->token()->id);

        return response()->json("Logged out");
    }
}
