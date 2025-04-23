<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\esAdmin;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware([esAdmin::class])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
