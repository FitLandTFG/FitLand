import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Pago {
  id: number;
  monto: number;
  fecha_pago: string;
  metodo_pago: string;
  estado: 'pendiente' | 'completado' | 'fallido';
  transaccion_id: string | null;
  usuario: {
    id: number;
    nombre_completo: string;
  };
  compra?: {
    id: number;
    fecha_compra: string;
  } | null;
  suscripcion?: {
    id: number;
    created_at: string;
    plan: {
      nombre: string;
    };
  } | null;
}

interface Props extends PageProps {
  pagos: Pago[];
}

const Index: React.FC<Props> = ({ pagos }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pagos</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/pagos/crear"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrar Pago
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
              <th className="px-4 py-2">Asociado a</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Método</th>
              <th className="px-4 py-2">Monto (€)</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.usuario?.nombre_completo ?? '—'}</td>
                <td className="px-4 py-2">
                  {p.compra
                    ? `Compra #${p.compra.id}`
                    : p.suscripcion
                    ? `Suscripción (${p.suscripcion.plan.nombre})`
                    : '—'}
                </td>
                <td className="px-4 py-2">
  {(p.compra?.fecha_compra ??
    p.suscripcion?.created_at ??
    p.fecha_pago
  ).slice(0, 19).replace('T', ' ')}
</td>


                <td className="px-4 py-2 capitalize">{p.metodo_pago}</td>
                <td className="px-4 py-2">{p.monto.toFixed(2)} €</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      p.estado === 'completado'
                        ? 'bg-green-600'
                        : p.estado === 'pendiente'
                        ? 'bg-yellow-500'
                        : 'bg-red-600'
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/pagos/${p.id}/editar`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <Link
                    as="button"
                    method="delete"
                    href={`/admin/pagos/${p.id}`}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={(e) => {
                      if (!confirm(`¿Eliminar el pago #${p.id}?`)) {
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
                <td colSpan={8} className="text-center text-gray-500 py-4">
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
