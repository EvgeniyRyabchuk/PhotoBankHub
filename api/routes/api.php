<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ResetPasswordController;
use App\Http\Controllers\User\VerifyEmailController;
use App\Http\Controllers\User\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//// public storage route
//Route::get('storage/{path}', [ImageController::class, 'show'])
//    ->where('path', '.*');




Route::controller(ResetPasswordController::class)->group(function () {
    Route::post('send-password-reset-email', 'sendEmailForResetPassword');
    Route::post('password-reset/{id}/{token}', 'resetPassword')
        ->name('password.reset');
});

Route::controller(ImageController::class)
    ->prefix('images')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{imageId}', 'show');

        Route::middleware('auth:api')->group(function () {

            Route::post('/', 'store')
                ->middleware('isCreator');

            Route::put('/{imageId}', 'update')
                ->middleware('isCreator');

            Route::delete('/{imageId}', 'delete')
                ->middleware('adminOrCreator');

            Route::get('/{imageId}/download','downloadPreview');
            Route::get('/{imageId}/sizes/{sizeId}/download','download');
        });

});


// Auth routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile','profile');
        Route::get('/profile-detail','profileDetail');
        Route::delete('/logout', 'logout');
    });
});


Route::controller(VerifyEmailController::class)
    ->middleware('auth:api')
    ->group(function () {
    Route::post('/email/verification-notification','sendVerifyEmailNotification');
    Route::post('/email/verify', 'verifyEmail');
});

Route::prefix('users')
    ->controller(UserController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{userId}', 'show');
        Route::middleware('auth:api')->group(function () {
            Route::put('/{userId}', 'update');
            Route::delete('/{userId}', 'delete');
        });
});


