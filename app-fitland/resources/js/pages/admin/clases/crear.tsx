import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

const Crear: React.FC<PageProps> = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    horario: '',
    aforo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/clases');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Clase</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Nombre</label>
          <input
            type="text"
            value={data.nombre}
            onChange={(e) => setData('nombre', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.nombre && <p className="text-red-600 text-sm">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Horario</label>
          <input
            type="datetime-local"
            value={data.horario}
            onChange={(e) => setData('horario', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.horario && <p className="text-red-600 text-sm">{errors.horario}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Aforo</label>
          <input
            type="number"
            value={data.aforo}
            onChange={(e) => setData('aforo', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.aforo && <p className="text-red-600 text-sm">{errors.aforo}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Crear clase
          </button>
          <a href="/admin/clases" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
