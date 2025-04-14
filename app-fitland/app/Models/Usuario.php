<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
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

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
