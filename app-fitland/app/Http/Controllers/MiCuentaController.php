<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MiCuentaController extends Controller
{
    public function index()
    {
        return Inertia::render('MiCuenta/index');
    }
}
