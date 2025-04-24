import React from 'react';
import { useForm } from '@inertiajs/react';

const Create: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre_completo: '',
    documentacion: '',
    domicilio: '',
    email: '',
    password: '',
    imagen: '',
    roles: 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/usuarios');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Usuario</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {[
          { name: 'nombre_completo', label: 'Nombre completo' },
          { name: 'documentacion', label: 'DNI/NIF' },
          { name: 'domicilio', label: 'Domicilio' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Contraseña', type: 'password' },
          { name: 'imagen', label: 'Imagen (URL)' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block mb-1 font-semibold">{label}</label>
            <input
              type={type}
              value={data[name as keyof typeof data]}
              onChange={(e) => setData(name as keyof typeof data, e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-red-600 text-sm">{errors[name as keyof typeof errors]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1 font-semibold">Rol</label>
          <select
            value={data.roles}
            onChange={(e) => setData('roles', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.roles && <p className="text-red-600 text-sm">{errors.roles}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Crear usuario
        </button>
      </form>
    </div>
  );
};

export default Create;
