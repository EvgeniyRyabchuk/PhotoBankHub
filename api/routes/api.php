<?php

use App\Http\Controllers\Bill\BillingController;
use App\Http\Controllers\Bill\BillingInfoController;
use App\Http\Controllers\Bill\CreditCardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PhotoModelController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ClientController;
use App\Http\Controllers\User\CreatorController;
use App\Http\Controllers\User\ResetPasswordController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\VerifyEmailController;
use Illuminate\Support\Facades\Route;


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

//Route::redirect('')


Route::controller(ImageController::class)
    ->prefix('images')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/min-max', 'getMinMax');
        Route::get('levels', 'getLevels');
        Route::get('sizes', 'getSizes');
        Route::get('orientations', 'getOrientations');


        Route::get('/{imageId}', 'show');
        Route::get('/{imageId}/likeable', 'likeable');



        Route::middleware('auth:api')
            ->group(function () {

                Route::post('/', 'store')
                    ->middleware('isCreator');

                Route::put('/{imageId}', 'update')
                    ->middleware('isCreator');

                Route::delete('/{imageId}', 'delete')
                    ->middleware('adminOrCreator');

                Route::get('/{imageId}/download','downloadPreview');
                Route::get('/{imageId}/variants/{variantId}/download','download');

                Route::post('/{imageId}/likes','addLike')
                    ->middleware('isClient');

            });

        Route::post('/{imageId}/views','addView');

    });


// Auth routes
Route::controller(AuthController::class)
    ->group(function () {
        Route::post('/register', 'register');
        Route::middleware('auth:api')->group(function () {
            Route::get('/profile','profile');
            Route::get('/profile-detail','profileDetail');
            Route::delete('/logout', 'logout');
        });
        Route::post('google/callback', 'loginWithGoogleApi');

    });

Route::controller(VerifyEmailController::class)
    ->middleware('auth:api')
    ->group(function () {
        Route::post('/email/verification-notification','sendVerifyEmailNotification');
        Route::post('/email/verify', 'verifyEmail');
    });

Route::controller(ResetPasswordController::class)->group(function () {
    Route::post('send-password-reset-email', 'sendEmailForResetPassword');
    Route::post('password-reset/{id}/{token}', 'resetPassword')
        ->name('password.reset');
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


Route::prefix('photo-models')
    ->controller(PhotoModelController::class)
    ->group(function () {
        Route::get('/', 'index');

        Route::get('ethnicities', 'getAllEthnicity');
        Route::get('genders', 'getAllGender');


        Route::middleware('adminOrCreatorAuth:api')
            ->group(function () {
                Route::post('/', 'store');
                Route::put('/{photoModelId}', 'update');
                Route::delete('/{photoModelId}', 'delete');
            });



    });


Route::prefix('credit-cards')
    ->middleware('isClient')
    ->controller(CreditCardController::class)
    ->group(function () {

        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{creditCardId}', 'update');
        Route::delete('/{creditCardId}', 'delete');
    });

Route::controller(CategoryController::class)
    ->prefix('categories')
    ->group(function () {

        Route::get('/', 'index');
        Route::middleware('isAdmin')
            ->group(function () {

                Route::post('/', 'store');
                Route::put('/{categoryId}', 'update');
                Route::delete('/{categoryId}', 'delete');
            });
    });


Route::prefix('creators/{creatorId}')
    ->middleware('isCreator')
    ->controller(CreatorController::class)
    ->group(function () {
        Route::get('/collections', 'getCollections');

    });

Route::prefix('clients/{clientId}')
    ->middleware('isClient')
    ->controller(ClientController::class)
    ->group(function () {

        Route::prefix('favorites')
            ->group(function () {
                Route::get('/', 'getFavorites');
                Route::post('/', 'addFavorite');
                Route::put('/{favoriteId}', 'updateFavorite');
                Route::delete('/{favoriteId}', 'deleteFavorite');

                Route::get('/{favoriteId}/images', 'getImageByFavorite');
                Route::post('/{favoriteId}/images/', 'addImageToFavorite');
                Route::delete('/{favoriteId}/images/{imageId}', 'deleteImageFromFavorite');
            });
    });


Route::controller(CollectionController::class)
    ->prefix('collections')
    ->group(function () {
        Route::get('/', 'index');
        Route::middleware('adminOrCreatorAuth:api')
            ->group(function () {
                Route::post('/', 'store');
                Route::put('/{collectionId}', 'update');
                Route::delete('/{collectionId}', 'delete');
            });
    });


Route::controller(BillingController::class)
    ->prefix('billings')
    ->middleware('isClient')
    ->group(function () {
        Route::get('/', 'index');
        Route::post('/subscribe', 'subscribe');
        Route::delete('/unsubscribe', 'unsubscribe');

    });

Route::controller(PlanController::class)
    ->prefix('plans')
//    ->middleware('auth:api')
    ->group(function () {

        Route::get('/', 'index');
//        ->can('create','plan');
//        ->middleware('can:create,App\Models\Plan');
//        ->can('create', \App\Models\Plan::class);

    });


Route::controller(BillingInfoController::class)
    ->prefix('billing-infos')
    ->middleware('isClient')
    ->group(function () {
        Route::get('/', 'show');
        Route::post('/', 'store');
        Route::put('/{billingInfoId}', 'update');


});
