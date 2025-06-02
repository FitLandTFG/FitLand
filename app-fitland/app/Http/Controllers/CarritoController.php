<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Support\Facades\Auth;

use App\Models\Usuario;
use App\Models\Producto;
use App\Models\ItemCarrito;
use Illuminate\Http\Request;

class CarritoController extends Controller
{
    public function obtener()
    {
        $usuarioId = Auth::id();

        $carrito = Carrito::where('usuario_id', $usuarioId)
            ->with(['items.producto'])
            ->first();

        if (!$carrito) {
            return response()->json(['items' => []]);
        }

        $items = $carrito->items->map(function ($item) {
            return [
                'id' => $item->id,
                'nombre' => $item->producto->nombre,
                'cantidad' => $item->cantidad,
                'precio' => $item->producto->precio,
            ];
        });

        return response()->json(['items' => $items]);
    }

      public function index()
    {
        $carritos = Carrito::with(['usuario', 'items.producto'])->get();

        return inertia('admin/carritos/index', [
            'carritos' => $carritos,
        ]);
    }

    public function crear()
    {
        $usuarios = Usuario::all();
        $productos = Producto::all();

        return inertia('admin/carritos/crear', [
            'usuarios' => $usuarios,
            'productos' => $productos,
        ]);
    }

    public function guardar(Request $request)
    {
        $data = $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        $carrito = Carrito::create([
            'usuario_id' => $data['usuario_id'],
        ]);

        foreach ($data['productos'] as $producto) {
            ItemCarrito::create([
                'carrito_id' => $carrito->id,
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
            ]);
        }

        return redirect()->route('admin.carritos.index');
    }

    public function editar(Carrito $carrito)
    {
        $usuarios = Usuario::all();
        $productos = Producto::all();

        $carrito->load('items.producto');

        return inertia('admin/carritos/editar', [
            'carrito' => $carrito,
            'usuarios' => $usuarios,
            'productos' => $productos,
        ]);
    }

    public function actualizar(Request $request, Carrito $carrito)
    {
        $data = $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        $carrito->update([
            'usuario_id' => $data['usuario_id'],
        ]);

        $carrito->items()->delete();

        foreach ($data['productos'] as $producto) {
            ItemCarrito::create([
                'carrito_id' => $carrito->id,
                'producto_id' => $producto['id'],
                'cantidad' => $producto['cantidad'],
            ]);
        }

        return redirect()->route('admin.carritos.index');
    }

    public function eliminar(Carrito $carrito)
    {
        $carrito->items()->delete();
        $carrito->delete();

        return redirect()->route('admin.carritos.index');
    }
}
