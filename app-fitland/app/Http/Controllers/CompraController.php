<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Usuario;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class CompraController extends Controller
{
    public function index()
    {
        $compras = Compra::with(['usuario', 'producto'])->orderBy('id', 'desc')->get();

        return Inertia::render('admin/compras/index', [
            'compras' => $compras,
            'flash' => ['error' => session('error')],
        ]);
    }

    public function crear()
    {
        return Inertia::render('admin/compras/crear', [
            'usuarios' => Usuario::all(),
            'productos' => Producto::all(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'producto_id' => 'required|exists:productos,id',
            'fecha_compra' => 'required|date',
        ]);

        Compra::create($request->all());

        return redirect()->route('admin.compras.index');
    }

    public function editar(Compra $compra)
    {
        return Inertia::render('admin/compras/editar', [
            'compra' => $compra,
            'usuarios' => Usuario::all(),
            'productos' => Producto::all(),
        ]);
    }

    public function actualizar(Request $request, Compra $compra)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'producto_id' => 'required|exists:productos,id',
            'fecha_compra' => 'required|date',
        ]);

        $compra->update($request->all());

        return redirect()->route('admin.compras.index');
    }

    public function eliminar(Compra $compra)
    {
        try {
            $compra->delete();
            return redirect()->route('admin.compras.index');
        } catch (QueryException $e) {
            if ($e->getCode() === '23503') {
                return redirect()->back()->with('error', 'No se puede eliminar la compra porque tiene un pago asociado.
                                                          Elimine el pago asociado para poder eliminar la compra.');
            }
    
            return redirect()->back()->with('error', 'Ocurrió un error al eliminar la compra.');
        }
    }
}
