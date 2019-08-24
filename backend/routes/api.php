<?php

use Illuminate\Http\Request;
use App\User;

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
    return \App\User::find(1);
});

Route::get('get-category-with-items', 'CategoriesController@getCategoryWithItems');

Route::get('get-setting-by-idt', 'SettingsController@getSettingByIdt');
Route::get('get-all-settings', 'SettingsController@getAllSettings');

Route::post('orders', 'OrdersController@store');
Route::get('get-order-status', 'OrdersController@getOrderStatus');
Route::get('categories', 'CategoriesController@index');

Route::get('orders/{id}', 'OrdersController@edit');
Route::get('order_edits/{id}', 'OrdersController@showOrderEdit');
Route::get('get-print-jobs', 'OrdersController@getPrintJobs');
Route::get('delete-print-job/{print_job_id}', 'OrdersController@deletePrintJob');

Route::middleware(['auth:api'])->group(function () {
    Route::post('store-image', 'ImagesController@storeImage');
    Route::resource('users', 'UsersController');

    Route::resource('categories', 'CategoriesController')->except('index');
    
    Route::resource('items', 'ItemsController');
    Route::resource('receipttypes', 'ReceipttypesController');

    Route::resource('tables', 'TablesController');
    Route::get('floors', 'TablesController@getFloors');
    Route::get('free-tables', 'TablesController@freeTables');

    Route::post('save-settings', 'SettingsController@saveSettings');

    Route::get('orders', 'OrdersController@index');
    Route::get('orders/{id}/edit', 'OrdersController@edit');
    Route::put('orders/{id}', 'OrdersController@update');
    Route::post('orders/{id}/delete', 'OrdersController@delete');

    Route::get('open-orders', 'OrdersController@openOrders');
    Route::get('assignable-statuses', 'OrdersController@assignableStatuses');
    Route::post('change-order-status', 'OrdersController@changeOrderStatus');
    Route::post('send-print-command', 'OrdersController@sendPrintCommand');
    Route::post('close-order', 'OrdersController@closeOrder');
    Route::post('save-discount', 'OrdersController@saveDiscount');

    Route::get('logged-in-user', function(){
        return User::with('userPermissions')->find(Auth::id());
    });

    Route::get('sales-and-tax-report', 'ReportsController@salesAndTaxReport');   
    Route::get('sales-report', 'ReportsController@salesReport');   
    Route::get('top-selling-items-report', 'ReportsController@topSellingItemsReport');   
    Route::get('top-areacodes-report', 'ReportsController@topAreaCodesReport');


});

Route::get('table', function(){
    $table = \DB::table(request()->table)->get();
    return $table;
});