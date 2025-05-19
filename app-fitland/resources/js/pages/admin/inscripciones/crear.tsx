import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import dayjs from 'dayjs';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Clase {
  id: number;
  nombre: string;
  horario: string; // ← Necesario para obtener la fecha
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

  // Actualiza automáticamente la fecha cuando cambia clase_id
  useEffect(() => {
    const claseSeleccionada = clases.find(c => c.id === Number(data.clase_id));
    if (claseSeleccionada) {
      // Formato ISO 8601: YYYY-MM-DDTHH:mm:ss (válido para timestamp)
      const horarioFormateado = dayjs(claseSeleccionada.horario).format('YYYY-MM-DDTHH:mm:ss');
      setData('fecha_inscripcion', horarioFormateado);
    } else {
      setData('fecha_inscripcion', '');
    }
  }, [data.clase_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/inscripciones');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registrar Inscripción</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Usuario */}
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

        {/* Clase */}
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

        {/* Fecha de inscripción (readonly y autocompletada) */}
        <div>
          <label className="block mb-1 font-semibold">Fecha de Inscripción</label>
          <input
            type="datetime-local"
            value={data.fecha_inscripcion}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
          {errors.fecha_inscripcion && <p className="text-red-600 text-sm">{errors.fecha_inscripcion}</p>}
        </div>

        {/* Botones */}
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