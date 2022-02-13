<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/application/{id}', function($id) {
    return Inertia::render('Application', [
        'application_id' => $id
    ]);
})->middleware(['auth', 'verified'])->name('application');

Route::get('/applications', function() {
    return Inertia::render('Applications');
})->middleware(['auth', 'verified'])->name('applications');

Route::get('/companies', function() {
    return Inertia::render('Companies');
})->middleware(['auth', 'verified'])->name('companies');

Route::get('/company/{id}', function($id) {
    return Inertia::render('Company', [
        'company_id' => $id
    ]);
})->middleware(['auth', 'verified'])->name('company');

Route::get('/interviews', function() {
    return Inertia::render('Interviews');
})->middleware(['auth', 'verified'])->name('interviews');

Route::get('/contacts', function() {
    return Inertia::render('Contacts');
})->middleware(['auth', 'verified'])->name('contacts');

require __DIR__.'/auth.php';
