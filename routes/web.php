<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Requests\InputDetailController;
use App\Http\Controllers\Requests\RequestTemplateController;

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

Route::middleware(['auth'])->group(function () {
    // User Managerment
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::prefix('/users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('Users');
        Route::get('/detail/{id}', [UserController::class, 'view'])->name('Detail_users');
        Route::post('/update/{id}', [UserController::class, 'update'])->name('Update_users');
        Route::post('/delete', [UserController::class, 'delete'])->name('Delete_users');
        Route::post('/create', [UserController::class, 'create'])->name('Create_users');
    });
    // Request Templates
    Route::prefix('/request-templates')->group(function () {
        Route::get('/', [RequestTemplateController::class, 'index'])->name('Request_templates');
        Route::post('/create', [RequestTemplateController::class, 'create'])->name('Create_Request_template');
        Route::get('/{id}', [RequestTemplateController::class, 'edit'])->name('Detail_request_template');
        Route::put('/{id}', [RequestTemplateController::class, 'update'])->name('Update_request_template');
        Route::post('/{id}/update', [RequestTemplateController::class, 'updateField'])->name('Update_field_request_template');
        Route::post('/{id}', [RequestTemplateController::class, 'destroy'])->name('Delete_request_template');
        // Input detail routes
        
        Route::post('/{id}/input-details/create', [InputDetailController::class, 'create'])->name('Create_input_detail');
        Route::put('/{id}/input-details/{input_id}', [InputDetailController::class, 'update'])->name('Update_input_detail');
        Route::post('/{id}/input-details/{input_id}', [InputDetailController::class, 'delete'])->name('Delete_input_detail');
    });

    // Request Managerment
    Route::prefix('/requests')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('Requests');
        Route::get('/detail/{id}', [UserController::class, 'view'])->name('Detail_Request');
        Route::post('/update/{id}', [UserController::class, 'update'])->name('Update_Request');
        Route::get('/delete/{id}', [UserController::class, 'delete'])->name('Delete_Request');
        Route::post('/create', [UserController::class, 'create'])->name('Create_Request');
    });
});

Route::get('/test', function () {
    echo "a";
    phpinfo();
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
