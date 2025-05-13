import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Compra {
  id: number;
  fecha_compra: string;
  usuario: {
    id: number;
    nombre_completo: string;
  };
  producto: {
    id: number;
    nombre: string;
  };
}

interface Props extends PageProps {
  compras: Compra[];
  flash: {
    error?: string;
  };

}

const Index: React.FC<Props> = ({ compras, flash }) => {
  return (
    <div className="p-6">
      {flash.error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Gestión de Compras</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/compras/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrar Compra
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
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Fecha de Compra</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.usuario?.nombre_completo ?? '—'}</td>
                <td className="px-4 py-2">{c.producto?.nombre ?? '—'}</td>
                <td className="px-4 py-2">{c.fecha_compra}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/compras/${c.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/compras/${c.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar la compra #${c.id}?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {compras.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No hay compras registradas.
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
