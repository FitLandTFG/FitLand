<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Pago;
use App\Models\Suscripcion;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class PagoController extends Controller
{



public function index()
{
    $pagos = Pago::with(['usuario', 'compra', 'suscripcion.plan'])
        ->orderByDesc('fecha_pago')
        ->get()
        ->map(function ($pago) {
            return [
                'id' => $pago->id,
                'monto' => $pago->monto,
                'fecha_pago' => Carbon::parse($pago->fecha_pago)->format('Y-m-d H:i:s'),
                'metodo_pago' => $pago->metodo_pago,
                'estado' => $pago->estado,
                'transaccion_id' => $pago->transaccion_id,
                'usuario' => [
                    'id' => $pago->usuario->id,
                    'nombre_completo' => $pago->usuario->nombre_completo,
                ],
                'compra' => $pago->compra ? [
                    'id' => $pago->compra->id,
                    'fecha_compra' => Carbon::parse($pago->compra->fecha_compra)->format('Y-m-d H:i:s'),
                ] : null,
                'suscripcion' => $pago->suscripcion ? [
                    'id' => $pago->suscripcion->id,
                    'created_at' => Carbon::parse($pago->suscripcion->created_at)->format('Y-m-d H:i:s'),
                    'plan' => [
                        'nombre' => $pago->suscripcion->plan->nombre,
                    ],
                ] : null,
            ];
        });

    return Inertia::render('admin/pagos/index', [
        'pagos' => $pagos,
    ]);
}

    public function crear()
    {
        return Inertia::render('admin/pagos/crear', [
            'compras' => Compra::with([
                'usuario',
                'productos' => function ($query) {
                    $query->withPivot('cantidad');
                }
            ])->get(),
            'suscripciones' => Suscripcion::with(['usuario', 'plan'])->get(),
        ]);
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'compra_id'       => 'nullable|exists:compras,id',
            'suscripcion_id'  => 'nullable|exists:suscripciones,id',
            'fecha_pago'      => 'required|date',
            'metodo_pago'     => 'required|string|max:50',
            'estado'          => 'required|in:pendiente,completado,fallido',
            'transaccion_id'  => 'nullable|string|max:100',
        ]);

        if (!$request->compra_id && !$request->suscripcion_id) {
            return back()->withErrors('Debes seleccionar una compra o una suscripción.');
        }

        $usuario_id = null;
        $monto = 0;

        DB::transaction(function () use ($request, &$usuario_id, &$monto) {
            if ($request->compra_id) {
                $compra = Compra::with(['usuario', 'productos'])->findOrFail($request->compra_id);
                $usuario_id = $compra->usuario_id;
                $monto = $compra->productos->sum(function ($producto) {
                    return $producto->precio * $producto->pivot->cantidad;
                });
            } elseif ($request->suscripcion_id) {
                $suscripcion = \App\Models\Suscripcion::with('usuario', 'plan')->findOrFail($request->suscripcion_id);
                $usuario_id = $suscripcion->usuario_id;
                $monto = $suscripcion->precio;
            }

            Pago::create([
                'usuario_id'      => $usuario_id,
                'compra_id'       => $request->compra_id,
                'suscripcion_id'  => $request->suscripcion_id,
                'monto'           => $monto,
                'fecha_pago'      => $request->fecha_pago,
                'metodo_pago'     => $request->metodo_pago,
                'estado'          => $request->estado,
                'transaccion_id'  => $request->transaccion_id ?? null,
            ]);

            if (isset($compra) && $request->estado === 'completado' && !$compra->stock_descargado) {
                foreach ($compra->productos as $producto) {
                    $cantidad = $producto->pivot->cantidad;
                    $producto->decrement('stock', $cantidad);
                }
                $compra->stock_descargado = true;
                $compra->save();
            }
        });

        return redirect()->route('admin.pagos.index');
    }

    public function editar(Pago $pago)
    {
        $pago->load([
            'compra.usuario',
            'compra.productos' => function ($query) {
                $query->withPivot('cantidad');
            },
            'suscripcion',
        ]);

        $compras = Compra::with([
            'usuario',
            'productos' => function ($query) {
                $query->withPivot('cantidad');
            },
        ])->get();

        $suscripciones = Suscripcion::with('usuario')->get();

        return Inertia::render('admin/pagos/editar', [
            'pago'    => $pago,
            'compras' => $compras,
            'suscripciones' => $suscripciones,
        ]);
    }


    public function actualizar(Request $request, Pago $pago)
    {
        $request->validate([
            'compra_id'      => 'required|exists:compras,id',
            'fecha_pago'     => 'required|date',
            'metodo_pago'    => 'required|string|max:50',
            'estado'         => 'required|in:pendiente,completado,fallido',
            'transaccion_id' => 'nullable|string|max:100',
        ]);

        $compra = Compra::with(['usuario', 'productos'])->findOrFail($request->compra_id);
        $usuario_id = $compra->usuario_id;

        $monto = $compra->productos->sum(function ($producto) {
            return $producto->precio * $producto->pivot->cantidad;
        });

        $estadoAnterior = $pago->getOriginal('estado');

        $pago->update([
            'usuario_id'     => $usuario_id,
            'compra_id'      => $compra->id,
            'monto'          => $monto,
            'fecha_pago'     => $request->fecha_pago,
            'metodo_pago'    => $request->metodo_pago,
            'estado'         => $request->estado,
            'transaccion_id' => $request->transaccion_id ?? null,
        ]);

        if (
            $estadoAnterior !== 'completado' && $request->estado === 'completado' && !$compra->stock_descargado
        ) {
            foreach ($compra->productos as $producto) {
                $cantidad = $producto->pivot->cantidad;

                if ($producto->stock < $cantidad) {
                    throw new \Exception("No hay suficiente stock para el producto: {$producto->nombre}");
                }

                $producto->decrement('stock', $cantidad);
            }

            $compra->stock_descargado = true;
            $compra->save();
        }
    }

    public function eliminar(Pago $pago)
    {
        $pago->delete();

        return redirect()->route('admin.pagos.index');
    }

public function crearSesion(Request $request)
{
    Stripe::setApiKey(env('STRIPE_SECRET'));

    // 🛒 CASO 1: Compra de productos desde el carrito
    if ($request->has('carrito') && $request->has('monto_total')) {
        $productos = $request->input('carrito');
        $montoTotal = $request->input('monto_total');

        if (empty($productos) || !$montoTotal) {
            return response()->json(['error' => 'El carrito está vacío o falta el monto total'], 400);
        }

        $lineItems = [[
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => 'Compra FitLand',
                ],
                'unit_amount' => intval(floatval($montoTotal) * 100), // en céntimos
            ],
            'quantity' => 1,
        ]];
    }

    // 💳 CASO 2: Compra de una suscripción
    elseif ($request->has('plan_nombre') && $request->has('precio')) {
        $planNombre = $request->input('plan_nombre');
        $precio = $request->input('precio');

        if (!$planNombre || !$precio) {
            return response()->json(['error' => 'Faltan datos de la suscripción'], 400);
        }

        $lineItems = [[
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => 'Suscripción: ' . $planNombre,
                ],
                'unit_amount' => intval(floatval($precio) * 100),
            ],
            'quantity' => 1,
        ]];
    }

    // ❌ Ningún caso válido
    else {
        return response()->json(['error' => 'Faltan datos para crear la sesión de pago'], 400);
    }

    $session = Session::create([
        'payment_method_types' => ['card'],
        'line_items' => $lineItems,
        'mode' => 'payment',
        'success_url' => route('pago.exito'),
        'cancel_url' => route('pago.cancelado'),
    ]);

    return response()->json(['url' => $session->url]);
}



   public function registrarDesdeStripe(Request $request)
{
    $pago = new Pago();
    $pago->usuario_id = Auth::id();
    $pago->compra_id = $request->input('compra_id'); // puede ser null
    $pago->suscripcion_id = $request->input('suscripcion_id'); // también puede ser null
    $pago->metodo_pago = $request->input('metodo_pago', 'Tarjeta Credito/Debito');
    $pago->estado = $request->input('estado', 'completado');
    $pago->monto = $request->input('monto');
    $pago->transaccion_id = $request->input('transaccion_id');
    $pago->created_at = now();
    $pago->updated_at = now();
    $pago->save();

    return response()->json(['message' => 'Pago registrado correctamente']);
}

}
