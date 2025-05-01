import React from 'react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface Producto {
  id: number;
  tipo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface Props extends PageProps {
  productos: Producto[];
}

const Index: React.FC<Props> = ({ productos }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/productos/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear Producto
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
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2 capitalize">{p.tipo}</td>
                <td className="px-4 py-2">{p.precio.toFixed(2)} €</td>
                <td className="px-4 py-2">
                  <img src={p.imagen} alt="Producto" className="w-10 h-10 object-cover rounded" />
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/productos/${p.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/productos/${p.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar el producto "${p.nombre}"?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No hay productos registrados.
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
