<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::orderBy('id', 'desc')->get();

        return Inertia::render('admin/productos/index', [
            'productos' => $productos
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/productos/crear');
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:ropa,suplemento',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'required|string',
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
            'tipo' => 'required|in:ropa,suplemento',
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'required|string',
        ]);

        $producto->update($request->all());

        return redirect()->route('admin.productos.index');
    }

    public function eliminar(Producto $producto)
    {
        $producto->delete();

        return redirect()->route('admin.productos.index');
    }
}
