<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(Request $request) {
        $full_name = $request->full_name;
        $email = $request->email;
        $password = $request->password;

        $user = User::create([
            'full_name' => $full_name,
            'email' => $email,
            'password' => \Illuminate\Support\Facades\Hash::make($password),
            'avatar' => '/',
            'role_id' => 1
        ]);

        return response()->json("OK");
    }

    public function profile(Request $request) {
        $user = Auth::user();
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
