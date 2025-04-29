<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('planes_suscripcion', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->double('precio', 5, 2);
            $table->enum('tipo', ['Prueba', 'Silver', 'Gold', 'Diamond']);
            $table->smallInteger('duracion_dias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_suscripcions');
    }
};
