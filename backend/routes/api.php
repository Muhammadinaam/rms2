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

Route::get('get-category-with-items', 'CategoriesController@getCategoryWithItems');

Route::get('get-setting-by-idt', 'SettingsController@getSettingByIdt');
Route::get('get-all-settings', 'SettingsController@getAllSettings');

Route::post('orders', 'OrdersController@store');
Route::get('get-order-status', 'OrdersController@getOrderStatus');
Route::resource('categories', 'CategoriesController');

Route::middleware(['auth:api'])->group(function () {
    Route::post('store-image', 'ImagesController@storeImage');
    Route::resource('users', 'UsersController');
    
    Route::resource('items', 'ItemsController');

    Route::resource('tables', 'TablesController');
    Route::get('floors', 'TablesController@getFloors');
    Route::get('free-tables', 'TablesController@freeTables');

    Route::post('save-settings', 'SettingsController@saveSettings');

    Route::get('orders', 'OrdersController@index');
    Route::get('open-orders', 'OrdersController@openOrders');
    Route::get('assignable-statuses', 'OrdersController@assignableStatuses');
    Route::post('change-order-status', 'OrdersController@changeOrderStatus');

    Route::get('logged-in-user', function(){
        return Auth::user();
    });

    Route::get('table', function(){
        $table = \DB::table(request()->table)->get();
        return $table;
    });

});