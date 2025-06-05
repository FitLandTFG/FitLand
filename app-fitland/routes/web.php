<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\esAdmin;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\PlanSuscripcionController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\SuscripcionController;
use App\Http\Controllers\TiendaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\HorarioClasesController;


Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito');
Route::middleware('auth')->get('/carrito/obtener', [CarritoController::class, 'obtener']);


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

    // Pagos
    Route::get('pagos', [PagoController::class, 'index'])->name('admin.pagos.index');
    Route::get('pagos/crear', [PagoController::class, 'crear'])->name('admin.pagos.crear');
    Route::post('pagos', [PagoController::class, 'guardar'])->name('admin.pagos.guardar');
    Route::get('pagos/{pago}/editar', [PagoController::class, 'editar'])->name('admin.pagos.editar');
    Route::put('pagos/{pago}', [PagoController::class, 'actualizar'])->name('admin.pagos.actualizar');
    Route::delete('pagos/{pago}', [PagoController::class, 'eliminar'])->name('admin.pagos.eliminar');

    // Compras
    Route::get('compras', [CompraController::class, 'index'])->name('admin.compras.index');
    Route::get('compras/crear', [CompraController::class, 'crear'])->name('admin.compras.crear');
    Route::post('compras', [CompraController::class, 'guardar'])->name('admin.compras.guardar');
    Route::get('compras/{compra}/editar', [CompraController::class, 'editar'])->name('admin.compras.editar');
    Route::put('compras/{compra}', [CompraController::class, 'actualizar'])->name('admin.compras.actualizar');
    Route::delete('compras/{compra}', [CompraController::class, 'eliminar'])->name('admin.compras.eliminar');

    // Clases
    Route::get('clases', [ClaseController::class, 'index'])->name('admin.clases.index');
    Route::get('clases/crear', [ClaseController::class, 'crear'])->name('admin.clases.crear');
    Route::post('clases', [ClaseController::class, 'guardar'])->name('admin.clases.guardar');
    Route::get('clases/{clase}/editar', [ClaseController::class, 'editar'])->name('admin.clases.editar');
    Route::put('clases/{clase}', [ClaseController::class, 'actualizar'])->name('admin.clases.actualizar');
    Route::delete('clases/{clase}', [ClaseController::class, 'eliminar'])->name('admin.clases.eliminar');

    // Inscripciones
    Route::get('inscripciones', [InscripcionController::class, 'index'])->name('admin.inscripciones.index');
    Route::get('inscripciones/crear', [InscripcionController::class, 'crear'])->name('admin.inscripciones.crear');
    Route::post('inscripciones', [InscripcionController::class, 'guardar'])->name('admin.inscripciones.guardar');
    Route::get('inscripciones/{inscripcion}/editar', [InscripcionController::class, 'editar'])->name('admin.inscripciones.editar');
    Route::put('inscripciones/{inscripcion}', [InscripcionController::class, 'actualizar'])->name('admin.inscripciones.actualizar');
    Route::delete('inscripciones/{inscripcion}', [InscripcionController::class, 'eliminar'])->name('admin.inscripciones.eliminar');

    // Detalle de Compras (gestión manual por parte del admin)
    Route::get('detalle-compras', [DetalleCompraController::class, 'index'])->name('admin.detalle-compras.index');
    Route::get('detalle-compras/crear', [DetalleCompraController::class, 'crear'])->name('admin.detalle-compras.crear');
    Route::post('detalle-compras', [DetalleCompraController::class, 'guardar'])->name('admin.detalle-compras.guardar');
    Route::get('detalle-compras/{detalleCompra}/editar', [DetalleCompraController::class, 'editar'])->name('admin.detalle-compras.editar');
    Route::put('detalle-compras/{detalleCompra}', [DetalleCompraController::class, 'actualizar'])->name('admin.detalle-compras.actualizar');
    Route::delete('detalle-compras/{detalleCompra}', [DetalleCompraController::class, 'eliminar'])->name('admin.detalle-compras.eliminar');

    // Carritos
    Route::get('carritos', [CarritoController::class, 'index'])->name('admin.carritos.index');
    Route::get('carritos/crear', [CarritoController::class, 'crear'])->name('admin.carritos.crear');
    Route::post('carritos', [CarritoController::class, 'guardar'])->name('admin.carritos.guardar');
    Route::get('carritos/{carrito}/editar', [CarritoController::class, 'editar'])->name('admin.carritos.editar');
    Route::put('carritos/{carrito}', [CarritoController::class, 'actualizar'])->name('admin.carritos.actualizar');
    Route::delete('carritos/{carrito}', [CarritoController::class, 'eliminar'])->name('admin.carritos.eliminar');
});

Route::get('/tienda', [TiendaController::class, 'index'])->name('tienda.index');

Route::get('/horario-clases', [HorarioClasesController::class, 'index'])->name('horario.clases');

Route::prefix('carrito')->middleware(['auth'])->group(function () {
    Route::get('/', [CarritoController::class, 'vistaUsuario'])->name('carrito.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
