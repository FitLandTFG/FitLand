<?php

return [
    'required' => 'El campo :attribute es obligatorio.',
    'email' => 'El campo :attribute debe ser un correo válido.',
    'confirmed' => 'La confirmación de :attribute no coincide.',
    'min' => [
        'string' => 'El campo :attribute debe tener al menos :min caracteres.',
    ],
    'max' => [
        'string' => 'El campo :attribute no puede tener más de :max caracteres.',
    ],
    'unique' => 'El campo :attribute ya está en uso.',
    'regex' => 'El formato del campo :attribute no es válido.',

    'attributes' => [
        'email' => 'correo electrónico',
        'password' => 'contraseña',
        'current_password' => 'contraseña actual',
        'documentacion' => 'documentación',
        'nombre_completo' => 'nombre completo',
    ],
];
