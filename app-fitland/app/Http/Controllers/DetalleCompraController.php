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
            'flash' => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/detalle-compras/crear', [
            'compras' => Compra::with('usuario')->get(),
            'productos' => Producto::all(),
            'flash' => ['error' => session('error')],
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'compra_id' => 'required|exists:compras,id',
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        $producto = Producto::findOrFail($request->producto_id);

        if ($producto->stock < $request->cantidad) {
            return redirect()->back()->with('error', 'No hay suficiente stock para el producto: ' . $producto->nombre);
        }

        DetalleCompra::create([
            'compra_id' => $request->compra_id,
            'producto_id' => $request->producto_id,
            'cantidad' => $request->cantidad,
        ]);

        $producto->decrement('stock', $request->cantidad);

        return redirect()->route('admin.detalle-compras.index')->with('success', 'Producto añadido correctamente.');
    }

    public function editar(DetalleCompra $detalleCompra)
    {
        $detalleCompra->load(['compra.usuario', 'producto']);

        return Inertia::render('admin/detalle-compras/editar', [
            'detalle' => $detalleCompra,
            'flash' => ['error' => session('error')],
        ]);
    }

    public function actualizar(Request $request, DetalleCompra $detalleCompra)
    {
        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $producto = Producto::findOrFail($detalleCompra->producto_id);

        $producto->increment('stock', $detalleCompra->cantidad);

        if ($producto->stock < $request->cantidad) {
            return redirect()->back()->with('error', 'No hay suficiente stock para actualizar este producto: ' . $producto->nombre);
        }

        $detalleCompra->update([
            'cantidad' => $request->cantidad,
        ]);

        $producto->decrement('stock', $request->cantidad);

        return redirect()->route('admin.detalle-compras.index')->with('success', 'Detalle actualizado correctamente.');
    }

    public function eliminar(DetalleCompra $detalleCompra)
    {
        Producto::where('id', $detalleCompra->producto_id)->increment('stock', $detalleCompra->cantidad);

        $detalleCompra->delete();

        return redirect()->route('admin.detalle-compras.index')->with('success', 'Producto eliminado correctamente.');
    }
}
