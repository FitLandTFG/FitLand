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
        'roles'
    ];

    // Oculta solo el remember_token, permite ver la contraseña hasheada
    protected $hidden = [
        'remember_token',
    ];

    public function esAdmin()
    {
        return $this->roles === 'admin';
    }
}
