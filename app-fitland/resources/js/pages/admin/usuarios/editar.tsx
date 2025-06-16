import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps, User } from '@/types';

interface Props extends PageProps {
  usuario: User;
}

const Editar: React.FC<Props> = ({ usuario }) => {
  const { data, setData, put, processing, errors } = useForm({
    nombre_completo: usuario.nombre_completo,
    documentacion: usuario.documentacion,
    domicilio: usuario.domicilio,
    email: usuario.email,
    password: '',
    imagen: usuario.imagen,
    roles: usuario.roles,
    email_verified_at: usuario.email_verified_at,
  });

  const [isVerified, setIsVerified] = useState<boolean>(!!usuario.email_verified_at);

 const handleCheckboxChange = () => {
  const nuevoEstado = !isVerified;
  setIsVerified(nuevoEstado);

  if (nuevoEstado) {
    const now = new Date();
    const fechaLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    setData('email_verified_at', fechaLocal);
  } else {
    setData('email_verified_at', null);
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/usuarios/${usuario.id}`);
  };

  useEffect(() => {
    if (usuario.email_verified_at) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [usuario.email_verified_at]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {[
          { name: 'nombre_completo', label: 'Nombre completo' },
          { name: 'documentacion', label: 'DNI/NIF' },
          { name: 'domicilio', label: 'Domicilio' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Contraseña (dejar vacío para no cambiar)', type: 'password' },
          { name: 'imagen', label: 'Imagen (URL)' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block mb-1 font-semibold">{label}</label>
            <input
              type={type}
              value={data[name as keyof typeof data] ?? ''}
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
            onChange={(e) => setData('roles', e.target.value as 'user' | 'admin')}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.roles && <p className="text-red-600 text-sm">{errors.roles}</p>}
        </div>

        <div>
          <label className="font-semibold">¿Email Verificado? </label>
          <input
            type="checkbox"
            checked={isVerified}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          {errors.email_verified_at && (
            <p className="text-red-600 text-sm">{errors.email_verified_at}</p>
          )}
        </div>

    <div className="flex space-x-4">
    <button
      type="submit"
      disabled={processing}
      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
    >
      Actualizar usuario
    </button>

    <a
      href="/admin/usuarios"
      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
    >
      Volver
    </a>
  </div>
      </form>
    </div>
  );
};

export default Editar;
