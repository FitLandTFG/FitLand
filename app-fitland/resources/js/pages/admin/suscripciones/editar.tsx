import React from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Plan {
  id: number;
  nombre: string;
}

interface Suscripcion {
  id: number;
  usuario_id: number;
  plan_id: number;
  precio: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'activa' | 'expirada' | 'cancelada';
}

interface Props extends PageProps {
  suscripcion: Suscripcion;
  usuarios: Usuario[];
  planes: Plan[];
}

const Editar: React.FC<Props> = ({ suscripcion, usuarios, planes }) => {
  const { data, setData, put, processing, errors } = useForm({
    usuario_id: suscripcion.usuario_id,
    plan_id: suscripcion.plan_id,
    precio: suscripcion.precio,
    fecha_inicio: suscripcion.fecha_inicio,
    fecha_fin: suscripcion.fecha_fin,
    estado: suscripcion.estado,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/suscripciones/${suscripcion.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Suscripción</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-semibold mb-1">Usuario</label>
          <select
            value={data.usuario_id}
            onChange={(e) => setData('usuario_id', Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>{u.nombre_completo}</option>
            ))}
          </select>
          {errors.usuario_id && <p className="text-red-600 text-sm">{errors.usuario_id}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Plan</label>
          <select
            value={data.plan_id}
            onChange={(e) => setData('plan_id', Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {planes.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          {errors.plan_id && <p className="text-red-600 text-sm">{errors.plan_id}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="number"
            value={data.precio}
            onChange={(e) => setData('precio', parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.precio && <p className="text-red-600 text-sm">{errors.precio}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Fecha de inicio</label>
          <input
            type="date"
            value={data.fecha_inicio}
            onChange={(e) => setData('fecha_inicio', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fecha_inicio && <p className="text-red-600 text-sm">{errors.fecha_inicio}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Fecha de fin</label>
          <input
            type="date"
            value={data.fecha_fin}
            onChange={(e) => setData('fecha_fin', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fecha_fin && <p className="text-red-600 text-sm">{errors.fecha_fin}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Estado</label>
          <select
            value={data.estado}
            onChange={(e) => setData('estado', e.target.value as Suscripcion['estado'])}
            className="w-full border rounded px-3 py-2"
          >
            <option value="activa">Activa</option>
            <option value="expirada">Expirada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          {errors.estado && <p className="text-red-600 text-sm">{errors.estado}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Actualizar suscripción
          </button>

          <a
            href="/admin/suscripciones"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Volver
          </a>
        </div>
      </form>
    </div>
  );
};

export default Editar;
