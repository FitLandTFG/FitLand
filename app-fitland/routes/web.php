<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\esAdmin;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\PlanSuscripcionController;
use App\Http\Controllers\SuscripcionController;
use App\Http\Controllers\ProductoController;

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
    Route::delete('usuarios/{usuario}', [UsuarioController::class, 'eliminar'])->name('admin.usuarios.eliminar');

    // Planes de suscripción
    Route::get('planes_suscripcion', [PlanSuscripcionController::class, 'index'])->name('admin.planes_suscripcion.index');
    Route::get('planes_suscripcion/crear', [PlanSuscripcionController::class, 'crear'])->name('admin.planes_suscripcion.crear');
    Route::post('planes_suscripcion', [PlanSuscripcionController::class, 'guardar'])->name('admin.planes_suscripcion.guardar');
    Route::get('planes_suscripcion/{plan}/editar', [PlanSuscripcionController::class, 'editar'])->name('admin.planes_suscripcion.editar');
    Route::put('planes_suscripcion/{plan}', [PlanSuscripcionController::class, 'actualizar'])->name('admin.planes_suscripcion.actualizar');
    Route::delete('planes_suscripcion/{plan}', [PlanSuscripcionController::class, 'eliminar'])->name('admin.planes_suscripcion.eliminar');

    // Suscripciones
    Route::get('suscripciones', [SuscripcionController::class, 'index'])->name('admin.suscripciones.index');
    Route::get('suscripciones/crear', [SuscripcionController::class, 'crear'])->name('admin.suscripciones.crear');
    Route::post('suscripciones', [SuscripcionController::class, 'guardar'])->name('admin.suscripciones.guardar');
    Route::get('suscripciones/{suscripcion}/editar', [SuscripcionController::class, 'editar'])->name('admin.suscripciones.editar');
    Route::put('suscripciones/{suscripcion}', [SuscripcionController::class, 'actualizar'])->name('admin.suscripciones.actualizar');
    Route::delete('suscripciones/{suscripcion}', [SuscripcionController::class, 'eliminar'])->name('admin.suscripciones.eliminar');

    // Productos
    Route::get('productos', [ProductoController::class, 'index'])->name('admin.productos.index');
    Route::get('productos/crear', [ProductoController::class, 'crear'])->name('admin.productos.crear');
    Route::post('productos', [ProductoController::class, 'guardar'])->name('admin.productos.guardar');
    Route::get('productos/{producto}/editar', [ProductoController::class, 'editar'])->name('admin.productos.editar');
    Route::put('productos/{producto}', [ProductoController::class, 'actualizar'])->name('admin.productos.actualizar');
    Route::delete('productos/{producto}', [ProductoController::class, 'eliminar'])->name('admin.productos.eliminar');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
