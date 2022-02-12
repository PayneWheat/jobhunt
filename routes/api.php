<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ApplicationStatusController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NoteController;

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

// Route::get('applications', 'ApplicationController@index');
Route::get('applications', [ApplicationController::class, 'index']);
// Route::post('applications', 'ApplicationController@store');
Route::post('applications', [ApplicationController::class, 'store']);
// Route::get('applications/{id}', 'ApplicationController@show');
Route::get('applications/{id}', [ApplicationController::class, 'show']);
// Route::put('applications/{application}', 'ApplicationController@update');
Route::put('applications/{application}', [ApplicationController::class, 'update']);
// Route::get('applications/status/{appId}/{statusId}', 'ApplicationController@updateStatus');
Route::get('applications/status/{appId}/{statusId}', [ApplicationController::class, 'updateStatus']);

// Route::get('statuses', 'ApplicationStatusController@index');
Route::get('statuses', [ApplicationStatusController::class, 'index']);
// Route::get('applications/{id}/interviews', 'ApplicationController@interviews');
Route::get('applications/{id}/interviews', [InterviewController::class, 'byApplication']);

// Route::get('companies', 'CompanyController@index');
Route::get('companies', [CompanyController::class, 'index']);
// Route::post('companies', 'CompanyController@store');
Route::post('companies', [CompanyController::class, 'store']);
// Route::get('companies/{id}', 'CompanyController@show');
Route::get('companies/{id}', [CompanyController::class, 'show']);
// Route::put('companies/{company}', 'CompanyController@update');
Route::put('companies/{company}', [CompanyController::class, 'update']);

// Route::get('offers', 'OfferController@index');
Route::get('offers', [OfferController::class, 'index']);
// Route::post('offers', 'OfferController@store');
Route::post('offers', [OfferController::class, 'store']);
// Route::get('offers/{id}', 'OfferController@show');
Route::get('offers/{id}', [OfferController::class, 'show']);
// Route::put('offers/{offer}', 'OfferController@update');
Route::put('offers/{offer}', [OfferController::class, 'update']);

// Route::get('interviews', 'InterviewController@index');
Route::get('interviews', [InterviewController::class, 'index']);
// Route::post('interviews', 'InterviewController@store');
Route::post('interviews', [InterviewController::class, 'store']);
// Route::get('interviews/types', 'InterviewController@types');
Route::get('interviews/types', [InterviewController::class, 'types']);
// Route::get('interviews/{id}', 'InterviewController@show');
Route::get('interviews/{id}', [InterviewController::class, 'show']);
// Route::put('interviews/{interview}', 'InterviewController@update');
Route::put('interviews/{interview}', [InterviewController::class, 'update']);


// Route::get('contacts', 'ContactController@index');
Route::get('contacts', [ContactController::class, 'index']);
// Route::post('contacts', 'ContactController@store');
Route::post('contacts', [ContactController::class, 'store']);
// Route::get('contacts/{id}', 'ContactController@show');
Route::get('contacts/{id}', [ContactController::class, 'show']);
// Route::put('contacts/{contact}', 'ContactController@update');
Route::put('contacts/{contact}', [ContactController::class, 'update']);
Route::get('contacts/company/{id}', [ContactController::class, 'byCompany']);

// Route::get('locations', 'LocationController@index');
Route::get('locations', [LocationController::class, 'index']);
// Route::post('locations', 'LocationController@store');
Route::post('locations', [LocationController::class, 'store']);
// Route::get('locations/{id}', 'LocationController@show');
Route::get('locations/{id}', [LocationController::class, 'show']);
// Route::put('locations/{location}', 'LocationController@update');
Route::put('locations/{location}', [LocationController::class, 'update']);

// Route::post('notes/create', 'NoteController@store');
Route::post('notes/create', [NoteController::class, 'store']);