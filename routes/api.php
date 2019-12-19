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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('applications', 'ApplicationController@index');
Route::post('applications', 'ApplicationController@store');
Route::get('applications/{id}', 'ApplicationController@show');
Route::put('applications/{application}', 'ApplicationController@update');
Route::get('applications/status/{appId}/{statusId}', 'ApplicationController@updateStatus');
Route::get('statuses', 'ApplicationStatusController@index');
Route::get('applications/{id}/interviews', 'ApplicationController@interviews');

Route::get('companies', 'CompanyController@index');
Route::post('companies', 'CompanyController@store');
Route::get('companies/{id}', 'CompanyController@show');
Route::put('companies/{company}', 'CompanyController@update');

Route::get('offers', 'OfferController@index');
Route::post('offers', 'OfferController@store');
Route::get('offers/{id}', 'OfferController@show');
Route::put('offers/{offer}', 'OfferController@update');

Route::get('interviews', 'InterviewController@index');
Route::post('interviews', 'InterviewController@store');
Route::get('interviews/types', 'InterviewController@types');
Route::get('interviews/{id}', 'InterviewController@show');
Route::put('interviews/{interview}', 'InterviewController@update');


Route::get('contacts', 'ContactController@index');
Route::post('contacts', 'ContactController@store');
Route::get('contacts/{id}', 'ContactController@show');
Route::put('contacts/{contact}', 'ContactController@update');

Route::get('locations', 'LocationController@index');
Route::post('locations', 'LocationController@store');
Route::get('locations/{id}', 'LocationController@show');
Route::put('locations/{location}', 'LocationController@update');

