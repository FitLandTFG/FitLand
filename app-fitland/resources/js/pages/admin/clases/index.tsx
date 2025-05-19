import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Clase {
  id: number;
  nombre: string;
  horario: string;
  aforo: number;
}

interface Props extends PageProps {
  clases: Clase[];
  flash: {
    error?: string;
  };
}

const Index: React.FC<Props> = ({ clases, flash }) => {
  return (
    <div className="p-6">
      {flash.error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Gestión de Clases</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/clases/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear Clase
        </Link>
        <a
          href="/admin"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Volver
        </a>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Horario</th>
              <th className="px-4 py-2">Aforo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{dayjs(c.horario).tz('Europe/Madrid').format('DD/MM/YYYY HH:mm')}</td>
                <td className="px-4 py-2">{c.aforo}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/clases/${c.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/clases/${c.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar la clase "${c.nombre}"?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {clases.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No hay clases registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
