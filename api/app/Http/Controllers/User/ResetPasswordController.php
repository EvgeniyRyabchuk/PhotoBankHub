<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\PasswordResetNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function sendEmailForResetPassword(Request $request) {

        $token = Str::random(30);

        // if not auth then select email from request

        if(Auth::check()) {
            $user = Auth::user();
        }
        else {
            $email = $request->input('email');
            abort_if(!$email, 404, 'email is empty');
            $user = User::where('email', $email)->first();
            abort_if(!$user, 404, 'user with such email does not exist');
        }

        $verification = DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => $token
        ]);

        Notification::send($user, new PasswordResetNotification($token));

        return ['message'=> 'OK.'];
    }

    public function resetPassword(Request $request, $id, $token)
    {
        $user = User::findOrFail($id);

        $token = DB::table('password_resets')
            ->where(['token' => $token, 'email' => $user->email]);

        abort_if(!$token, 403, 'token not exist');

        $token->delete();

        $newPasswordHash = Hash::make($request->input('password'));

        $user->password = $newPasswordHash;

        $user->save();

        return response()->json(['message' => 'password has been changed success'], 201);

    }
}
