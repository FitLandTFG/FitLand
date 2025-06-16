<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Pago;
use App\Models\Suscripcion;
use App\Models\Usuario;
use App\Models\PlanSuscripcion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
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

        DB::transaction(function () use ($pago, $request, $usuario_id, $compra, $monto, $estadoAnterior) {
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
                $estadoAnterior !== 'completado' &&
                $request->estado === 'completado' &&
                !$compra->stock_descargado
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

            if (
                $estadoAnterior === 'completado' &&
                in_array($request->estado, ['pendiente', 'fallido']) &&
                $compra->stock_descargado
            ) {
                foreach ($compra->productos as $producto) {
                    $cantidad = $producto->pivot->cantidad;
                    $producto->increment('stock', $cantidad);
                }

                $compra->stock_descargado = false;
                $compra->save();
            }
        });

        return redirect()->route('admin.pagos.index');
    }


    public function eliminar(Pago $pago)
    {
        $pago->delete();

        return redirect()->route('admin.pagos.index');
    }

    public function crearSesion(Request $request)
    {
        $usuario = Auth::user();

        if ($request->boolean('suscripcion')) {
            $planId = $request->input('plan_id');
            $plan = \App\Models\PlanSuscripcion::findOrFail($planId);

            $precio = $plan->precio;
            $unitAmount = intval(bcmul($precio, '100', 2));


            Stripe::setApiKey(env('STRIPE_SECRET'));

            $session = \Stripe\Checkout\Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => "Suscripción {$plan->nombre}",
                        ],
                        'unit_amount' => $unitAmount,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('pago.exito'),
                'cancel_url' => route('pago.cancelado'),
            ]);

            return response()->json(['url' => $session->url]);
        }

        $productos = $request->input('carrito', []);

        if (empty($productos)) {
            return response()->json(['error' => 'El carrito está vacío'], 400);
        }

        $ids = collect($productos)->pluck('id')->unique()->toArray();
        $productosDB = \App\Models\Producto::whereIn('id', $ids)->get()->keyBy('id');

        $total = 0;
        foreach ($productos as $item) {
            $producto = $productosDB->get($item['id']);
            $cantidad = intval($item['cantidad']);

            if ($producto && $cantidad > 0) {
                $total = bcadd($total, bcmul($producto->precio, $cantidad, 2), 2);
            }
        }

        $tieneDescuento = $usuario?->suscripcionActiva()?->exists() && str_contains(strtolower($usuario->suscripcionActiva->plan->nombre ?? ''), 'diamond');

        if ($tieneDescuento) {
            $total *= 0.90;
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => ['name' => 'Compra FitLand'],
                    'unit_amount' => intval($total * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('pago.exito'),
            'cancel_url' => route('pago.cancelado'),
        ]);

        return response()->json(['url' => $session->url]);
    }


    public function registrarDesdeStripe(Request $request)
    {
        $usuario_id = Auth::id();
        $compra_id = $request->input('compra_id');
        $suscripcion_id = $request->input('suscripcion_id');

        if (!$compra_id && !$suscripcion_id) {
            return response()->json(['error' => 'Debe enviarse una compra o una suscripción.'], 400);
        }

        DB::transaction(function () use ($usuario_id, $compra_id, $suscripcion_id, $request) {
            $monto = '0.00';

            if ($compra_id) {
                $compra = Compra::with(['productos', 'usuario.suscripcionActiva.plan'])->findOrFail($compra_id);

                foreach ($compra->productos as $producto) {
                    $subtotal = bcmul($producto->precio, $producto->pivot->cantidad, 2);
                    $monto = bcadd($monto, $subtotal, 2);
                }

                $suscripcionActiva = $compra->usuario->suscripcionActiva;

                if ($suscripcionActiva && str_contains(strtolower($suscripcionActiva->plan->nombre), 'diamond')) {
                    $monto = bcmul($monto, '0.90', 2);
                }
            } elseif ($suscripcion_id) {
                $suscripcion = Suscripcion::with(['plan'])->findOrFail($suscripcion_id);
                $monto = $suscripcion->plan->precio;
            }

            $pago = new Pago();
            $pago->usuario_id = $usuario_id;
            $pago->compra_id = $compra_id;
            $pago->suscripcion_id = $suscripcion_id;
            $pago->metodo_pago = $request->input('metodo_pago', 'Tarjeta Credito/Debito');
            $pago->estado = $request->input('estado', 'completado');
            $pago->monto = $monto;
            $pago->transaccion_id = $request->input('transaccion_id');
            $pago->created_at = now();
            $pago->updated_at = now();
            $pago->save();

            if (isset($compra) && $pago->estado === 'completado' && !$compra->stock_descargado) {
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
        });

        return response()->json(['message' => 'Pago registrado correctamente']);
    }
}