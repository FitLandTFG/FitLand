import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Carrito {
  id: number;
  usuario: {
    id: number;
    nombre_completo: string;
  };
  items: {
    id: number;
    producto: {
      nombre: string;
    };
    cantidad: number;
  }[];
}

interface Props extends PageProps {

  carritos: Carrito[];
  flash?: {
    error?: string;
  };
}

const Index: React.FC<Props> = ({ carritos, flash }) => {

  return (

    <div className="p-6">
      {flash?.error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Gestión de Carritos</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/carritos/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear Carrito
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
              <th className="px-4 py-2">Productos en el Carrito</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carritos.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.usuario?.nombre_completo ?? '—'}</td>
                <td className="px-4 py-2">
                  {c.items.length > 0
                    ? c.items.map((i) => `${i.producto.nombre} x${i.cantidad}`).join(', ')
                    : '—'}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/carritos/${c.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/carritos/${c.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar el carrito #${c.id}?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {carritos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  No hay carritos registrados.
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
