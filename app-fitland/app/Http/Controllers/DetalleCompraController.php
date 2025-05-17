<?php

namespace App\Http\Controllers;

use App\Models\DetalleCompra;
use App\Models\Compra;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetalleCompraController extends Controller
{
    public function index()
    {
        $detalles = DetalleCompra::with(['compra.usuario', 'producto'])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/detalle-compras/index', [
            'detalles' => $detalles,
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/detalle-compras/crear', [
            'compras' => Compra::with('usuario')->get(),
            'productos' => Producto::all(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'compra_id' => 'required|exists:compras,id',
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        DetalleCompra::create([
            'compra_id' => $request->compra_id,
            'producto_id' => $request->producto_id,
            'cantidad' => $request->cantidad,
        ]);

        return redirect()->route('admin.detalle-compras.index');
    }

    public function editar(DetalleCompra $detalleCompra)
    {
        $detalleCompra->load(['compra.usuario', 'producto']);

        return Inertia::render('admin/detalle-compras/editar', [
            'detalle' => $detalleCompra,
        ]);
    }

    public function actualizar(Request $request, DetalleCompra $detalleCompra)
    {
        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $detalleCompra->update([
            'cantidad' => $request->cantidad,
        ]);

        return redirect()->route('admin.detalle-compras.index');
    }

    public function eliminar(DetalleCompra $detalleCompra)
    {
        $detalleCompra->delete();

        return redirect()->route('admin.detalle-compras.index');
    }
}
