import React from 'react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface Plan {
  id: number;
  nombre: string;
  precio: number;
  tipo: 'Prueba' | 'Silver' | 'Gold' | 'Diamond';
  duracion_dias: number;
}

interface Props extends PageProps {
  planes: Plan[];
errors: Record<string, string>;
}

const Index: React.FC<Props> = ({ planes, errors }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Planes de Suscripción</h1>

        {errors.general && (
        <div className="mb-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
        </div>
        )}


      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/planes_suscripcion/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear Plan
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
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Duración (días)</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{plan.id}</td>
                <td className="px-4 py-2">{plan.nombre}</td>
                <td className="px-4 py-2">{plan.precio.toFixed(2)} €</td>
                <td className="px-4 py-2">{plan.tipo}</td>
                <td className="px-4 py-2">{plan.duracion_dias}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/planes_suscripcion/${plan.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/planes_suscripcion/${plan.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Estás seguro de que quieres eliminar el plan "${plan.nombre}"?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {planes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No hay planes registrados.
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
