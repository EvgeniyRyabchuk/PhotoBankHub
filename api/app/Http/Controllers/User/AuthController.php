<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\Client;
use App\Models\Creator;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\Finder\Exception\AccessDeniedException;

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
        $user->load('role', 'phone', 'client.plan', 'creator');
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

    public static function revokeAccessAndRefreshTokens($tokenId) {
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

    public function loginWithGoogleApi(Request $request)
    {
//        $redirect_url = "http://localhost:8000/api/google/callback";
        $providerUser = Socialite::driver('google')->stateless()->user();

//        $socialUser = Socialite::driver('google')->stateless()->userFromToken($providerUser->token);
//        return response()->json($socialUser);

        $user = User::where('email', $providerUser->user['email'])->first();

        $roleId = $request->roleId ?? 1;
        $role = Role::findOrFail($roleId);
        if (!$user) {
            $data = [
                'full_name' => $providerUser->getName(),
                'email' => $providerUser->getEmail(),
                'password' => null,
                'avatar' => $providerUser->getAvatar(),
                'role_id' => $roleId,
                'google_id' => $providerUser->id
            ];

            $user = User::create($data);

            switch ($role->name) {
                case 'client':
                    Client::create(['user_id' => $user->id,]);
                    break;
                case 'creator':
                    Creator::create(['user_id' => $user->id,]);
                    break;
                default:
                    throw new AccessDeniedException('such role not allow');
            }

            $user->save();
        }

        $personalAccessToken = $user->createToken('UserToken');
        $accessToken = $personalAccessToken->accessToken;
        $token = $personalAccessToken->token;

        return response()->json([
            'access_token' => $accessToken
        ]);
    }


}









//    public function loginWithGoogle(Request $request) {
//        try {
//            $user = Socialite::driver('google')->user();
//        } catch (\Exception $e) {
////            return redirect('/login');
//            throw new UnauthorizedException();
//        }
//
//        // only allow people with @company.com to login
////        if(explode("@", $user->email)[1] !== 'company.com'){
////            return redirect()->to('/');
////        }
//
//
//        // check if they're an existing user
//        $existingUser = User::where('email', $user->email)->first();
//        if($existingUser){
//            // log them in
//            Auth::login($existingUser, true);
//        } else {
//            // create a new user
//            $newUser                  = new User;
//            $newUser->full_name            = $user->name;
//            $newUser->email           = $user->email;
//            $newUser->roleId          = 1;
//            $newUser->google_id       = $user->id;
//            $newUser->avatar          = $user->avatar;
//            $newUser->avatar_original = $user->avatar_original;
//            $newUser->save();
//            Auth::login($newUser, true);
//        }
//
//        return response()->json(Auth::user());
//    }


//        $token = JWTAuth::fromUser($user);
//        return new JsonResponse([
//            'token' => $token
//        ]);

//            DB::table('personal_access_tokens')
//            ->insert([
//                'id' => $token->id,
//                'user_id' => $token->user_id,
//                'client_id' => $token->client_id,
//                'name' => $token->name,
//                'scopes' => "$token->scope",
//                'revoked' => $token->revoked,
//                'expires_at' => $token->expires_at,
//                'created_at' => Carbon::now(),
//                'updated_at' => Carbon::now(),
//            ]);

//    public function GuzzleHttpGetToken($user) {
//        $http = new \GuzzleHttp\Client();
//        $clientId = '2';
//        $clientSecret = '2zM8Ny0Usfu3LgchNakjVZjwKY8PpTtejZFBwssz';
//        $response = $http->post('http://127.0.0.1:8000/api/oauth/token', [
//            'form_params' => [
//                'grant_type' => 'password',
//                'client_id' => '2',
//                'client_secret' => "$clientSecret",
//                "username" => $user->email,
//                "password" => null,
//                "scope" => ''
//            ],
//        ]);
//return json_decode($response->getBody()->getContents(), true);




