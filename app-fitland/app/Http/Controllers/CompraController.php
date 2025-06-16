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
use Illuminate\Support\Facades\Auth;

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
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        try {
            DB::transaction(function () use ($request) {
                foreach ($request->productos as $producto) {
                    $productoBD = Producto::findOrFail($producto['id']);
                    if ($productoBD->stock < $producto['cantidad']) {
                        throw new \Exception("La cantidad solicitada supera el stock disponible del producto: {$productoBD->nombre}");
                    }
                }

                $compra = Compra::create([
                    'usuario_id' => $request->usuario_id,
                ]);

                foreach ($request->productos as $producto) {
                    DetalleCompra::create([
                        'compra_id' => $compra->id,
                        'producto_id' => $producto['id'],
                        'cantidad' => $producto['cantidad'],
                    ]);

                    Producto::where('id', $producto['id'])->decrement('stock', $producto['cantidad']);
                }
            });

            return redirect()->route('admin.compras.index');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
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

        try {
            DB::transaction(function () use ($request, $compra) {
                foreach ($compra->detalles as $detalle) {
                    Producto::where('id', $detalle->producto_id)->increment('stock', $detalle->cantidad);
                }

                $compra->update([
                    'usuario_id' => $request->usuario_id,
                    'fecha_compra' => $request->fecha_compra,
                ]);

                $compra->detalles()->delete();

                foreach ($request->productos as $producto) {
                    $productoBD = Producto::findOrFail($producto['id']);

                    if ($productoBD->stock < $producto['cantidad']) {
                        throw new \Exception("No hay suficiente stock para el producto: {$productoBD->nombre}");
                    }
                }

                foreach ($request->productos as $producto) {
                    DetalleCompra::create([
                        'compra_id' => $compra->id,
                        'producto_id' => $producto['id'],
                        'cantidad' => $producto['cantidad'],
                    ]);

                    Producto::where('id', $producto['id'])->decrement('stock', $producto['cantidad']);
                }
            });

            return redirect()->route('admin.compras.index');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function eliminar(Compra $compra)
    {
        try {
            $compra->detalles()->delete();
            $compra->delete();

            return redirect()->route('admin.compras.index');
        } catch (QueryException $e) {
            if ($e->getCode() === '23503') {
                return redirect()->back()->with('error', 'No se puede eliminar la compra porque tiene un pago asociado. Elimine el pago asociado para poder eliminar la compra.');
            }

            return redirect()->back()->with('error', 'Ocurrió un error al eliminar la compra.');
        }
    }

    public function crearDesdeCarritoStripe(Request $request)
    {
        $carrito = $request->input('carrito', []);
        if (empty($carrito)) {
            return response()->json(['error' => 'Carrito vacío'], 400);
        }

        $usuarioId = Auth::id();

        $compra = Compra::where('usuario_id', $usuarioId)
            ->whereDoesntHave('pago')
            ->whereDate('created_at', today())
            ->latest()
            ->first();

        if (!$compra) {
            $compra = new Compra();
            $compra->usuario_id = $usuarioId;
            $compra->created_at = now();
            $compra->updated_at = now();
            $compra->save();
        } else {
            $compra->detalles()->delete();
        }

        $total = 0;

        foreach ($carrito as $item) {
            $detalle = new DetalleCompra();
            $detalle->compra_id = $compra->id;
            $detalle->producto_id = $item['id'];
            $detalle->cantidad = $item['cantidad'];
            $detalle->created_at = now();
            $detalle->updated_at = now();
            $detalle->save();

            $total += $item['precio'] * $item['cantidad'];
        }

        return response()->json([
            'message' => 'Compra registrada',
            'compra_id' => $compra->id,
            'total' => $total
        ]);
    }
}
