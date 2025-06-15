<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Clase;

class ClaseTest extends TestCase
{

    public function test_clase_puede_guardarse(): void
    {
        $categoria = new Clase();
        $categoria->nombre = 'Karate';
        $categoria->horario = '2025/06/21 18:00';
        $categoria->aforo = '20';
        $this->assertTrue($categoria->save());
    }
}