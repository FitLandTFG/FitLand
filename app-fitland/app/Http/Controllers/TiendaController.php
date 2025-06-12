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

        if ($request->filled('categoria')) {
            $query->where('tipo', $request->input('categoria'));
        }

        if ($request->filled('buscar')) {
            $buscar = strtolower($request->input('buscar'));
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . $buscar . '%']);
        }

        $productos = $query->orderBy('id', 'desc')->paginate(9)->withQueryString();

        $categorias = Producto::select('tipo')->distinct()->pluck('tipo');

        $suscripcion = $user?->suscripcion?->plan_id ?? null;

        return Inertia::render('Tienda/index', [
            'productos' => $productos,
            'categorias' => $categorias,
            'suscripcion' => $suscripcion,
            'filtros' => $request->only(['categoria', 'buscar']),
            'user' => Auth::user(),
        ]);
    }
}
