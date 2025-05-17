<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Usuario;
use App\Models\Producto;
use App\Models\DetalleCompra;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class CompraController extends Controller
{
    public function index()
    {
        $compras = Compra::with(['usuario', 'productos'])->orderBy('id', 'desc')->get();

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
            'fecha_compra' => 'required|date',
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $compra = Compra::create([
                'usuario_id' => $request->usuario_id,
                'fecha_compra' => $request->fecha_compra,
            ]);

            foreach ($request->productos as $producto) {
                DetalleCompra::create([
                    'compra_id' => $compra->id,
                    'producto_id' => $producto['id'],
                    'cantidad' => $producto['cantidad'],
                ]);
            }
        });

        return redirect()->route('admin.compras.index');
    }

    public function editar(Compra $compra)
    {
        $compra->load('detalles.producto');

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
            'fecha_compra' => 'required|date',
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request, $compra) {
            $compra->update([
                'usuario_id' => $request->usuario_id,
                'fecha_compra' => $request->fecha_compra,
            ]);

            // Borrar los detalles antiguos
            $compra->detalles()->delete();

            // Insertar los nuevos
            foreach ($request->productos as $producto) {
                DetalleCompra::create([
                    'compra_id' => $compra->id,
                    'producto_id' => $producto['id'],
                    'cantidad' => $producto['cantidad'],
                ]);
            }
        });

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
