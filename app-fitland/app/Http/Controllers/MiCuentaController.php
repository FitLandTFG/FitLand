<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;
use App\Models\Inscripcion;
use App\Models\Suscripcion;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class MiCuentaController extends Controller
{
    public function index()
    {
        $usuario = auth()->user();

        $usuario->foto_perfil_url = $usuario->imagen
    ? asset('' . $usuario->imagen)
    : asset('images/defaults/avatar.jpg');

        $suscripcionActiva = Suscripcion::with('plan')
            ->where('usuario_id', $usuario->id)
            ->where('estado', 'activa')
            ->whereDate('fecha_inicio', '<=', now())
            ->whereDate('fecha_fin', '>=', now())
            ->first();

        $compras = Compra::with(['detalles.producto', 'pago'])
        ->where('usuario_id', $usuario->id)
        ->orderByDesc('fecha_compra')
        ->get()
        ->map(function ($compra) {
            return [
                'id' => $compra->id,
                'fecha' => $compra->fecha_compra,
                'productos' => $compra->detalles->map(function ($detalle) {
                    return [
                        'nombre' => $detalle->producto->nombre,
                        'imagen_url' => $detalle->producto->imagen ? asset($detalle->producto->imagen) : null,
                        'precio' => $detalle->producto->precio,
                        'cantidad' => $detalle->cantidad,
                    ];
                }),
                'pago' => [
                'monto' => $compra->pago?->monto ?? 0.00,
                ],
            ];
        });

        $inscripciones = Inscripcion::with('clase')
            ->where('usuario_id', $usuario->id)
            ->orderByDesc('fecha_inscripcion')
            ->get()
            ->map(function ($inscripcion) {
                return [
                    'id' => $inscripcion->id,
                    'fecha' => $inscripcion->fecha_inscripcion,
                    'clase' => [
                        'nombre' => $inscripcion->clase->nombre,
                    ],
                ];
            });

        return Inertia::render('MiCuenta/index', [
            'usuario' => $usuario,
            'suscripcionActiva' => $suscripcionActiva,
            'compras' => $compras,
            'inscripciones' => $inscripciones,
        ]);
    }

public function actualizarImagen(Request $request)
{
    $request->validate(['imagen' => 'required|image|max:2048']);

    $user = $request->user();

    // Ruta física absoluta al directorio donde quieres guardar
    $carpetaDestino = public_path('/images/Perfil');

    // Crear la carpeta si no existe
    if (!file_exists($carpetaDestino)) {
        mkdir($carpetaDestino, 0755, true);
    }

    // Borrar imagen anterior si existe
    if ($user->imagen && file_exists(public_path($user->imagen))) {
        unlink(public_path($user->imagen));
    }

    // Guardar con un nombre personalizado (por ejemplo: usuario_5.jpg)
    $extension = $request->file('imagen')->getClientOriginalExtension();
    $nombreArchivo = 'usuario_' . $user->id . '.' . $extension;

    $request->file('imagen')->move($carpetaDestino, $nombreArchivo);

    // Guardar el path relativo para poder usarlo con asset()
    $user->imagen = '/images/Perfil/' . $nombreArchivo;
    $user->save();

    return response()->json([
        'foto_perfil_url' => asset($user->imagen),
        'success' => true,
    ]);
}



    public function cambiarContrasena(Request $request)
    {
        $request->validate([
            'contrasena_actual' => ['required'],
            'nueva_contrasena' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $usuario = Auth::user();

        if (!Hash::check($request->contrasena_actual, $usuario->password)) {
            return response()->json(['mensaje' => 'La contraseña actual no es correcta.'], 422);
        }

        $usuario->password = Hash::make($request->nueva_contrasena);
        $usuario->save();

        return response()->json(['mensaje' => 'Contraseña actualizada correctamente.']);
    }

    public function cancelarSuscripcion(Request $request)
{
    $usuario = Auth::user();

    // Cambiar estado de la suscripción activa a 'cancelada'
    $suscripcion = Suscripcion::where('usuario_id', $usuario->id)
        ->where('estado', 'activa')
        ->whereDate('fecha_inicio', '<=', now())
        ->whereDate('fecha_fin', '>=', now())
        ->first();

    if ($suscripcion) {
        $suscripcion->estado = 'cancelada';
        $suscripcion->save();

        return response()->json(['mensaje' => 'Suscripción cancelada']);
    }

    return response()->json(['mensaje' => 'No se encontró una suscripción activa'], 404);
}
}
