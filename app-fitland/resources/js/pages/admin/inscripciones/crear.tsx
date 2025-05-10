import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Clase {
  id: number;
  nombre: string;
}

interface Props extends PageProps {
  usuarios: Usuario[];
  clases: Clase[];
}

const Crear: React.FC<Props> = ({ usuarios, clases }) => {
  const { data, setData, post, processing, errors } = useForm({
    usuario_id: '',
    clase_id: '',
    fecha_inscripcion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/inscripciones');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registrar Inscripción</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Usuario</label>
          <select
            value={data.usuario_id}
            onChange={(e) => setData('usuario_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre_completo}
              </option>
            ))}
          </select>
          {errors.usuario_id && <p className="text-red-600 text-sm">{errors.usuario_id}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Clase</label>
          <select
            value={data.clase_id}
            onChange={(e) => setData('clase_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar clase</option>
            {clases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {errors.clase_id && <p className="text-red-600 text-sm">{errors.clase_id}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Fecha de Inscripción</label>
          <input
            type="date"
            value={data.fecha_inscripcion}
            onChange={(e) => setData('fecha_inscripcion', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fecha_inscripcion && <p className="text-red-600 text-sm">{errors.fecha_inscripcion}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Registrar inscripción
          </button>
          <a href="/admin/inscripciones" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
