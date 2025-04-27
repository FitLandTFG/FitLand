<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\esAdmin;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\SuscripcionController;

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

    // Usuarios
    Route::get('usuarios', [UsuarioController::class, 'index'])->name('admin.usuarios.index');
    Route::get('usuarios/crear', [UsuarioController::class, 'crear'])->name('admin.usuarios.crear');
    Route::post('usuarios', [UsuarioController::class, 'guardar'])->name('admin.usuarios.guardar');
    Route::get('usuarios/{usuario}/editar', [UsuarioController::class, 'editar'])->name('admin.usuarios.editar');
    Route::put('usuarios/{usuario}', [UsuarioController::class, 'actualizar'])->name('admin.usuarios.actualizar');
    Route::delete('usuarios/{usuario}', [UsuarioController::class, 'destroy'])->name('admin.usuarios.destroy');

    // Suscripciones
    Route::get('suscripciones', [SuscripcionController::class, 'index'])->name('admin.suscripciones.index');
    Route::get('suscripciones/crear', [SuscripcionController::class, 'crear'])->name('admin.suscripciones.crear');
    Route::post('suscripciones', [SuscripcionController::class, 'guardar'])->name('admin.suscripciones.guardar');
    Route::get('suscripciones/{suscripcion}/editar', [SuscripcionController::class, 'editar'])->name('admin.suscripciones.editar');
    Route::put('suscripciones/{suscripcion}', [SuscripcionController::class, 'actualizar'])->name('admin.suscripciones.actualizar');
    Route::delete('suscripciones/{suscripcion}', [SuscripcionController::class, 'destroy'])->name('admin.suscripciones.destroy');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
