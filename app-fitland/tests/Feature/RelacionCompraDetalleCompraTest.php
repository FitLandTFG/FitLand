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
        $usuario = new Usuario();
        $usuario->nombre_completo = 'Test User';
        $usuario->documentacion = '12345678A';
        $usuario->domicilio = 'Calle Falsa 123';
        $usuario->email = 'test' . uniqid() . '@user.com';
        $usuario->password = bcrypt('12345678');
        $usuario->imagen = 'usuario.jpg';
        $usuario->save();

        $producto = Producto::create([
            'nombre' => 'Creatina',
            'descripcion' => 'Suplemento de fuerza',
            'precio' => 19.99,
            'tipo' => 'suplemento',
            'imagen' => 'creatina.jpg',
        ]);

        $compra = Compra::create([
            'usuario_id' => $usuario->id,
            'fecha' => now(),
        ]);

        $detalle = DetalleCompra::create([
            'compra_id' => $compra->id,
            'producto_id' => $producto->id,
            'cantidad' => 2,
            'precio_unitario' => $producto->precio,
        ]);

        $this->assertEquals(1, $compra->detalles->count());
        $this->assertEquals($detalle->id, $compra->detalles->first()->id);
        $this->assertEquals($compra->id, $detalle->compra->id);
    }
}
