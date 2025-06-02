<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\Usuario;
use App\Models\Producto;
use App\Models\ItemCarrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CarritoController extends Controller
{
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

    public function vistaUsuario()
    {
        $usuarioId = Auth::id();

        $carrito = Carrito::with('items.producto')
            ->where('usuario_id', $usuarioId)
            ->first();

        $items = $carrito ? $carrito->items->map(function ($item) {
            return [
                'id' => $item->id,
                'cantidad' => $item->cantidad,
                'producto' => [
                    'id' => $item->producto->id,
                    'nombre' => $item->producto->nombre,
                    'precio' => $item->producto->precio,
                    'imagen_url' => $item->producto->imagen_url,
                ]
            ];
        }) : [];

        $total = collect($items)->sum(function ($item) {
            return $item['cantidad'] * $item['producto']['precio'];
        });

        return Inertia::render('Carrito/index', [
            'carrito' => [
                'items' => $items,
                'total' => $total,
            ],
        ]);
    }

    public function eliminarItem($id)
    {
        $item = ItemCarrito::findOrFail($id);
        
        $carrito = Carrito::where('usuario_id', Auth::id())->first();

        if ($item->carrito_id !== $carrito->id) {
            abort(403, 'No puedes eliminar este producto.');
        }

        $item->delete();

        return redirect('/carrito');
    }

    public function vaciar()
    {
        $carrito = Carrito::where('usuario_id', Auth::id())->first();

        if ($carrito) {
            $carrito->items()->delete();
        }

        return redirect('/carrito');
    }

    public function checkout()
    {
        $carrito = Carrito::with('items.producto')->where('usuario_id', Auth::id())->first();

        if (!$carrito || $carrito->items->isEmpty()) {
            return redirect('/carrito')->withErrors('Tu carrito está vacío.');
        }
    
        DB::transaction(function () use ($carrito) {
            $carrito->items()->delete();
        });

        return redirect('/carrito')->with('success', 'Compra finalizada con éxito.');
    }
}
