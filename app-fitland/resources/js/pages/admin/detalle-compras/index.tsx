import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface DetalleCompra {
  id: number;
  cantidad: number;
  compra: {
    id: number;
    usuario: {
      nombre_completo: string;
    };
  };
  producto: {
    id: number;
    nombre: string;
  };
}

interface Props extends PageProps {
  detalles: DetalleCompra[];
  flash?: {
    error?: string;
    success?: string;
  };
}

const Index: React.FC<Props> = ({ detalles, flash }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de detalles de compras</h1>

      {flash?.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {flash.error}
        </div>
      )}
      {flash?.success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {flash.success}
        </div>
      )}

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/detalle-compras/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Añadir producto a compra
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
              <th className="px-4 py-2">Compra</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{d.id}</td>
                <td className="px-4 py-2">#{d.compra.id}</td>
                <td className="px-4 py-2">{d.compra.usuario.nombre_completo}</td>
                <td className="px-4 py-2">{d.producto.nombre}</td>
                <td className="px-4 py-2">{d.cantidad}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/detalle-compras/${d.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/detalle-compras/${d.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar el detalle de compra #${d.id}?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {detalles.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No hay detalles registrados.
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
