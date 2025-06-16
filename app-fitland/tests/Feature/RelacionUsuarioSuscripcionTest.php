<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Suscripcion;
use App\Models\PlanSuscripcion;

class RelacionUsuarioSuscripcionTest extends TestCase
{
    public function test_usuario_tiene_una_suscripcion(): void
    {
        $usuario = new Usuario();
        $usuario->nombre_completo = 'Test User';
        $usuario->documentacion = '12345678A';
        $usuario->domicilio = 'Calle Falsa 123';
        $usuario->email = 'test' . uniqid() . '@user.com';
        $usuario->password = bcrypt('12345678');
        $usuario->imagen = 'usuario.jpg';
        $usuario->save();

        $plan = PlanSuscripcion::create([
            'nombre' => 'Prueba45',
            'descripcion' => 'Acceso completo a todas las funciones',
            'precio' => 29.99,
            'duracion_dias' => 30,
            'tipo' => 'Prueba',
        ]);

        $suscripcion = Suscripcion::create([
            'usuario_id' => $usuario->id,
            'plan_id' => $plan->id,
            'precio' => $plan->precio,
            'fecha_inicio' => now(),
            'fecha_fin' => now()->addDays($plan->duracion_dias),
            'estado' => 'activa',
        ]);

        $usuario->refresh();

        $this->assertEquals($suscripcion->id, $usuario->suscripcion->id);
        $this->assertEquals($usuario->id, $suscripcion->usuario->id);
    }
}
