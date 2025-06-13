<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    protected $table = 'usuarios';

    public $timestamps = false;

    protected $fillable = [
        'nombre_completo',
        'documentacion',
        'domicilio',
        'email',
        'password',
        'imagen',
        'roles',
        'email_verified_at'
    ];

    protected $hidden = [
        'remember_token',
    ];

    public function esAdmin()
    {
        return $this->roles === 'admin';
    }

public function suscripcionActiva()
{
    return $this->hasOne(\App\Models\Suscripcion::class)
        ->where('estado', 'activa')
        ->whereDate('fecha_inicio', '<=', now())
        ->whereDate('fecha_fin', '>=', now());
}

}
