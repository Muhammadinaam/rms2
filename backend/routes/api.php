<?php

use Illuminate\Http\Request;

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

Route::get('/test', function (Request $request) {
    //return ['test' => 'passed'];

    return \App\User::find(1)->permissions;
});

Route::resource('categories', 'CategoriesController');
Route::resource('items', 'ItemsController');

Route::get('get-category-with-items', 'CategoriesController@getCategoryWithItems');

Route::get('get-setting-by-idt', 'SettingsController@getSettingByIdt');
Route::get('get-all-settings', 'SettingsController@getAllSettings');

Route::post('orders', 'OrdersController@store');
Route::get('get-order-status', 'OrdersController@getOrderStatus');

Route::middleware(['auth:api'])->group(function () {
    Route::post('store-image', 'ImagesController@storeImage');
    Route::resource('users', 'UsersController');

    Route::post('save-settings', 'SettingsController@saveSettings');

    Route::get('orders', 'OrdersController@index');

    Route::get('logged-in-user', function(){
        return Auth::user();
    });

});