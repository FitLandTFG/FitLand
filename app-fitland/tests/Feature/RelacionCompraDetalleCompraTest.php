<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Compra;
use App\Models\DetalleCompra;
use App\Models\Producto;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RelacionCompraDetalleCompraTest extends TestCase
{
    public function test_compra_tiene_detalles_asociados(): void
    {
        // Crear usuario
$usuario = new Usuario();
$usuario->nombre_completo = 'Test User';
$usuario->documentacion = '12345678A';
$usuario->domicilio = 'Calle Falsa 123';
$usuario->email = 'test' . uniqid() . '@user.com';
$usuario->password = bcrypt('12345678');
$usuario->imagen = 'usuario.jpg';
$usuario->save();

        // Crear producto válido
        $producto = Producto::create([
            'nombre' => 'Creatina',
            'descripcion' => 'Suplemento de fuerza',
            'precio' => 19.99,
            'tipo' => 'suplemento', // debe ser un valor válido
            'imagen' => 'creatina.jpg',
        ]);

        // Crear compra
        $compra = Compra::create([
            'usuario_id' => $usuario->id,
            'fecha' => now(),
        ]);

        // Crear detalle asociado a la compra
        $detalle = DetalleCompra::create([
            'compra_id' => $compra->id,
            'producto_id' => $producto->id,
            'cantidad' => 2,
            'precio_unitario' => $producto->precio,
        ]);

        // Verificar que el detalle está relacionado correctamente
        $this->assertEquals(1, $compra->detalles->count());
        $this->assertEquals($detalle->id, $compra->detalles->first()->id);
        $this->assertEquals($compra->id, $detalle->compra->id);
    }
}
