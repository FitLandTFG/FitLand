import React from 'react';
import { Link } from '@inertiajs/react';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Suscripcion {
  id: number;
  nombre: string;
}

interface Pago {
  id: number;
  usuario: Usuario;
  suscripcion: Suscripcion;
  cantidad: number;
  fecha_pago: string;
  metodo_pago: string;
}

interface Props {
  pagos: Pago[];
}

const Index: React.FC<Props> = ({ pagos }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pagos</h1>

      <div className="mb-4 flex space-x-4">
        <Link href="/admin/pagos/crear" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Registrar Pago
        </Link>
        <a href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Volver
        </a>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Suscripción</th>
              <th className="px-4 py-2">Cantidad (€)</th>
              <th className="px-4 py-2">Fecha de Pago</th>
              <th className="px-4 py-2">Método</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{pago.id}</td>
                <td className="px-4 py-2">{pago.usuario?.nombre_completo}</td>
                <td className="px-4 py-2">{pago.suscripcion?.nombre}</td>
                <td className="px-4 py-2">{pago.cantidad.toFixed(2)}</td>
                <td className="px-4 py-2">{pago.fecha_pago}</td>
                <td className="px-4 py-2">{pago.metodo_pago}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/pagos/${pago.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/pagos/${pago.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar el pago #${pago.id}?`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
            {pagos.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No hay pagos registrados.
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