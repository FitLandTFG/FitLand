<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiendaController extends Controller
{
    public function index(Request $request)
    {
        $query = Producto::query();

        if ($request->filled('categoria')) {
            $query->where('tipo', $request->input('categoria'));
        }

        if ($request->filled('buscar')) {
            $query->where('nombre', 'like', '%' . $request->input('buscar') . '%');
        }

        $productos = $query->paginate(9)->withQueryString();

        $categorias = Producto::select('tipo')->distinct()->pluck('tipo');

        return Inertia::render('Tienda/index', [
            'productos' => $productos,
            'categorias' => $categorias,
            'filtros' => $request->only(['categoria', 'buscar']),
        ]);
    }
}