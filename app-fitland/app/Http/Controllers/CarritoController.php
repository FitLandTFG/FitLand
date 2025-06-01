<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Support\Facades\Auth;

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
}
