<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserVerification;
use App\Notifications\EmailVerificationNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class VerifyEmailController extends Controller
{
    public function sendVerifyEmailNotification(Request $request) {

        $verification = UserVerification::create([
            'verification_type' => 'email',
            'token' => rand(100000, 999999),
            'expired_at' => Carbon::now()->addDays(3),
            'user_id' => Auth::user()->id
        ]);

        Notification::send(Auth::user(), new EmailVerificationNotification($verification));

        return ['message'=> 'OK.'];
    }

    public function verifyEmail(Request $request)
    {
        $verification = UserVerification::where('token', $request->input('token'))->first();

        if(is_null($verification))
            abort(403, 'is null');

        $user = Auth::user();

        abort_if(!$user, 403);
        if($user->id != $verification->user->id)
            abort(403, 'no match');


        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            $verification->delete();
        }

        return response()->json(['status' => 'success', 'data' => $verification], 201);
    }
}
