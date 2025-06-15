<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Producto;

class ProductoTest extends TestCase
{
    public function test_producto_puede_guardarse()
    {
        $producto = Producto::create([
            'nombre' => 'Camiseta negra',
            'descripcion' => 'Camiseta negra con el logo de FitLand perfecta para entrenar',
            'precio' => 19.99,
            'tipo' => 'ropa',
            'stock' => 27,
            'imagen' => 'images/Productos/Camiseta negra unisex.png'
        ]);

        $this->assertDatabaseHas('productos', [
            'nombre' => 'Camiseta negra',
            'precio' => 19.99,
        ]);
    }
}