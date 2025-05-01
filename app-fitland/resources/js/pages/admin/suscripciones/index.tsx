import React from 'react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface Suscripcion {
  id: number;
  usuario: { nombre_completo: string };
  plan: { nombre: string };
  precio: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'activa' | 'expirada' | 'cancelada';
}

interface Props extends PageProps {
  suscripciones: Suscripcion[];
}

const Index: React.FC<Props> = ({ suscripciones }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Suscripciones</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/suscripciones/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear Suscripción
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
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Precio (€)</th>
              <th className="px-4 py-2">Inicio</th>
              <th className="px-4 py-2">Fin</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suscripciones.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{s.id}</td>
                <td className="px-4 py-2">{s.usuario?.nombre_completo}</td>
                <td className="px-4 py-2">{s.plan?.nombre}</td>
                <td className="px-4 py-2">{s.precio.toFixed(2)} €</td>
                <td className="px-4 py-2">{s.fecha_inicio}</td>
                <td className="px-4 py-2">{s.fecha_fin}</td>
                <td className="px-4 py-2 capitalize">{s.estado}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/suscripciones/${s.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/suscripciones/${s.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar la suscripción de "${s.usuario?.nombre_completo}"?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {suscripciones.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-4">
                  No hay suscripciones registradas.
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
