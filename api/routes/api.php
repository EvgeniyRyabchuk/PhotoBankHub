<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



//// public storage route
//Route::get('storage/{path}', [ImageController::class, 'show'])
//    ->where('path', '.*');


Route::get('image/{imageId}/download', [ImageController::class, 'download'])
//    ->where('path', '.*');
    ->middleware('auth:api');

Route::prefix('oauth')
    ->controller(AuthController::class)
    ->group(function ($oauth) {
        $oauth->post('/register', 'register');
        $oauth->delete('/logout', 'logout')->middleware('auth:api');
    });


Route::middleware('auth:api')->group(function () {

    Route::get('/profile', [AuthController::class, 'profile']);


});
