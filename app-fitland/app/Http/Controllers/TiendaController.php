<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TiendaController extends Controller
{
    public function index(Request $request)
    {
        $query = Producto::query();

        // Filtro por categoría (tipo)
        if ($request->filled('categoria')) {
            $query->where('tipo', $request->input('categoria'));
        }

        // Filtro por búsqueda insensible a mayúsculas
        if ($request->filled('buscar')) {
            $buscar = strtolower($request->input('buscar'));
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . $buscar . '%']);
        }

        // Paginación con preservación de filtros en la URL
        $productos = $query->orderBy('id', 'desc')->paginate(9)->withQueryString();

        // Obtener lista de categorías únicas
        $categorias = Producto::select('tipo')->distinct()->pluck('tipo');

        // Renderizar la vista Inertia
        return Inertia::render('Tienda/index', [
            'productos' => $productos,
            'categorias' => $categorias,
            'filtros' => $request->only(['categoria', 'buscar']),
            'user' => Auth::user(),
        ]);
    }
}
