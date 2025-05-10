import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Clase {
  id: number;
  nombre: string;
  horario: string;
  aforo: number;
}

interface Props extends PageProps {
  clase: Clase;
}

const Editar: React.FC<Props> = ({ clase }) => {
  const { data, setData, put, processing, errors } = useForm({
    nombre: clase.nombre,
    horario: clase.horario,
    aforo: clase.aforo,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/clases/${clase.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Clase</h1>

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
            onChange={(e) => setData('aforo', Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.aforo && <p className="text-red-600 text-sm">{errors.aforo}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar clase
          </button>
          <a href="/admin/clases" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Editar;
