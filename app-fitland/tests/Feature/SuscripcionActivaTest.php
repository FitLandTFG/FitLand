<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Suscripcion;
use App\Models\PlanSuscripcion;
use Illuminate\Support\Carbon;

class SuscripcionActivaTest extends TestCase
{
    public function test_usuario_tiene_suscripcion_activa(): void
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
            'nombre' => 'Gold',
            'descripcion' => 'Acceso completo',
            'precio' => 39.99,
            'duracion_dias' => 30,
            'tipo' => 'Gold',
        ]);

        Suscripcion::create([
            'usuario_id' => $usuario->id,
            'plan_id' => $plan->id,
            'precio' => $plan->precio,
            'fecha_inicio' => now()->subDays(5),
            'fecha_fin' => now()->addDays(25),
            'estado' => 'activa',
        ]);

        $usuario->refresh();

        $this->assertNotNull($usuario->suscripcionActiva);
        $this->assertEquals('activa', $usuario->suscripcionActiva->estado);
    }
}
