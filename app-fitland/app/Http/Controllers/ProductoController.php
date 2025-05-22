<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::orderBy('id', 'desc')->get();

        return Inertia::render('admin/productos/index', [
            'productos' => $productos,
            'flash' => ['error' => session('error')],
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/productos/crear');
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:ropa,suplemento,bebida,accesorio',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'required|string',
            'stock' => 'required|integer|min:0|max:999',
        ]);

        Producto::create($request->all());

        return redirect()->route('admin.productos.index');
    }

    public function editar(Producto $producto)
    {
        return Inertia::render('admin/productos/editar', [
            'producto' => $producto
        ]);
    }

    public function actualizar(Request $request, Producto $producto)
    {
        $request->validate([
            'tipo' => 'required|in:ropa,suplemento,bebida,accesorio',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'required|string',
            'stock' => 'required|integer|min:0|max:999',
        ]);

        $producto->update($request->all());

        return redirect()->route('admin.productos.index');
    }

    public function eliminar(Producto $producto)
    {
        try {
            $producto->delete();
            return redirect()->route('admin.productos.index');
        } catch (QueryException $e) {
            if ($e->getCode() === '23503') {
                return redirect()->back()->with('error', 'No se puede eliminar el producto porque tiene una compra asociada.
                                                          Elimine las compras asociadas para poder eliminar el producto.');
            }

            return redirect()->back()->with('error', 'Ocurrió un error al eliminar la clase.');
        }
    }
}
