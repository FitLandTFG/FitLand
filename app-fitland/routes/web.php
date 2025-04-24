<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\esAdmin;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::prefix('admin')->middleware([esAdmin::class])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');

    // Rutas CRUD de usuarios
    Route::resource('usuarios', UsuarioController::class)->names('admin.usuarios');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
