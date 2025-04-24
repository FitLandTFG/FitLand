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
    
    Route::resource('usuarios', UsuarioController::class)
    ->only(['index', 'crear', 'guardar', 'editar', 'actualizar', 'eliminar'])
    ->names('admin.usuarios');
    Route::get('usuarios/crear', [UsuarioController::class, 'crear'])->name('admin.usuarios.crear');
    Route::post('usuarios', [UsuarioController::class, 'guardar'])->name('admin.usuarios.guardar');
    Route::get('usuarios/{usuario}/editar', [UsuarioController::class, 'editar'])->name('admin.usuarios.editar');
    Route::put('usuarios/{usuario}', [UsuarioController::class, 'actualizar'])->name('admin.usuarios.actualizar');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
