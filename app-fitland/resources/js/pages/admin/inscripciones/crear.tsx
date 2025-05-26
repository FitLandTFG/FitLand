import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';

dayjs.locale('es');
dayjs.extend(utc);

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Clase {
  id: number;
  nombre: string;
  horario: string;
}

interface Inscripcion {
  usuario_id: number;
  clase_id: number;
}

interface Props extends PageProps {
  usuarios: Usuario[];
  clases: Clase[];
  inscripciones: Inscripcion[];
}

const Crear: React.FC<Props> = ({ usuarios, clases, inscripciones }) => {
  const { data, setData, post, processing, errors } = useForm<{
    usuario_id: number | string;
    nombre_clase: string;
    clase_id: number | string;
    fecha_inscripcion: string;
  }>({
    usuario_id: '',
    nombre_clase: '',
    clase_id: '',
    fecha_inscripcion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const yaInscrito = inscripciones.some(
      (i) =>
        i.usuario_id === Number(data.usuario_id) &&
        i.clase_id === Number(data.clase_id)
    );

    if (yaInscrito) {
      alert('Este usuario ya está inscrito en esta clase.');
      return;
    }

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
            value={data.nombre_clase}
            onChange={(e) => {
              setData('nombre_clase', e.target.value);
              setData('clase_id', '');
              setData('fecha_inscripcion', '');
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar clase</option>
            {[...new Set(clases.map((c) => c.nombre))].map((nombreClase, i) => (
              <option key={i} value={nombreClase}>
                {nombreClase}
              </option>
            ))}
          </select>
          {errors.nombre_clase && <p className="text-red-600 text-sm">{errors.nombre_clase}</p>}
        </div>

        {/* Fecha de inscripción */}
        <div>
          <label className="block mb-1 font-semibold">Fecha de Inscripción</label>
          <select
            value={data.fecha_inscripcion}
            onChange={(e) => {
              const claseSeleccionada = clases.find(
                (c) =>
                  c.nombre === data.nombre_clase &&
                  dayjs.utc(c.horario).format('YYYY-MM-DD HH:mm:ss') === e.target.value
              );

              if (claseSeleccionada) {
                setData('clase_id', claseSeleccionada.id);
                setData('fecha_inscripcion', dayjs.utc(claseSeleccionada.horario).format('YYYY-MM-DD HH:mm:ss'));
              }
            }}
            className="w-full border rounded px-3 py-2"
            disabled={!data.nombre_clase}
          >
            <option value="">
              {data.nombre_clase ? 'Seleccionar horario' : 'Seleccione una clase primero'}
            </option>
            {data.nombre_clase &&
              clases
                .filter(
                  (c) =>
                    c.nombre === data.nombre_clase &&
                    dayjs.utc(c.horario).isAfter(dayjs()) // solo futuros
                )
                .sort((a, b) => dayjs.utc(a.horario).unix() - dayjs.utc(b.horario).unix())
                .map((c) => {
                  const valor = dayjs.utc(c.horario).format('YYYY-MM-DD HH:mm:ss');
                  const texto = dayjs.utc(c.horario).format('dddd, DD MMMM YYYY - HH:mm');
                  const capitalizado = texto.charAt(0).toUpperCase() + texto.slice(1);
                  return (
                    <option key={c.id} value={valor}>
                      {capitalizado}
                    </option>
                  );
                })}
          </select>
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
          <a
            href="/admin/inscripciones"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Crear;
