import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps, User } from '@/types';

interface Props extends PageProps {
  usuario: User;
}

const Edit: React.FC<Props> = ({ usuario }) => {
  const { data, setData, put, processing, errors } = useForm({
    nombre_completo: usuario.nombre_completo,
    documentacion: usuario.documentacion,
    domicilio: usuario.domicilio,
    email: usuario.email,
    password: '',
    imagen: usuario.imagen,
    roles: usuario.roles as 'user' | 'admin', // Asegura que sea 'user' o 'admin'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/usuarios/${usuario.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {[
          { name: 'nombre_completo', label: 'Nombre completo' },
          { name: 'documentacion', label: 'DNI/NIF' },
          { name: 'domicilio', label: 'Domicilio' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Nueva contraseña (opcional)', type: 'password' },
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
            onChange={(e) => setData('roles', e.target.value as 'user' | 'admin')} // Asegura que sea 'user' o 'admin'
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
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default Edit;
