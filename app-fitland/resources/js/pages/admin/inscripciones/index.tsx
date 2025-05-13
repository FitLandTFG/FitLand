import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Inscripcion {
  id: number;
  fecha_inscripcion: string;
  usuario: {
    id: number;
    nombre_completo: string;
  };
  clase: {
    id: number;
    nombre: string;
  };
}

interface Props extends PageProps {
  inscripciones: Inscripcion[];
}

const Index: React.FC<Props> = ({ inscripciones}) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Inscripciones</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/inscripciones/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrar Inscripción
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
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Clase</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{i.id}</td>
                <td className="px-4 py-2">{i.usuario?.nombre_completo ?? '—'}</td>
                <td className="px-4 py-2">{i.clase?.nombre ?? '—'}</td>
                <td className="px-4 py-2">{i.fecha_inscripcion}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/inscripciones/${i.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/inscripciones/${i.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar la inscripción #${i.id}?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {inscripciones.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No hay inscripciones registradas.
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
