import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Plan {
  id: number;
  nombre: string;
  precio: number;
  duracion_dias: number;
}

interface Props extends PageProps {
  usuarios: Usuario[];
  planes: Plan[];
}

const Crear: React.FC<Props> = ({ usuarios, planes }) => {
  const { data, setData, post, processing, errors } = useForm({
    usuario_id: '',
    plan_id: '',
    precio: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'activa',
  });

  // Al seleccionar un plan, actualiza el precio y fecha de fin si hay fecha de inicio
  useEffect(() => {
    const planSeleccionado = planes.find(p => p.id === Number(data.plan_id));

    if (planSeleccionado) {
      setData('precio', planSeleccionado.precio.toFixed(2));

      if (data.fecha_inicio) {
        const inicio = new Date(data.fecha_inicio);
        const fin = new Date(inicio);

        if (planSeleccionado.duracion_dias >= 360) {
          fin.setFullYear(fin.getFullYear() + 1);
        } else if (planSeleccionado.duracion_dias >= 28) {
          fin.setMonth(fin.getMonth() + 1);
        } else {
          fin.setDate(fin.getDate() + planSeleccionado.duracion_dias);
        }

        setData('fecha_fin', fin.toISOString().split('T')[0]);
      }
    }
  }, [data.plan_id, data.fecha_inicio, planes, setData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/suscripciones');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Suscripción</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Usuario */}
        <div>
          <label className="block font-semibold mb-1">Usuario</label>
          <select
            value={data.usuario_id}
            onChange={(e) => setData('usuario_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>{u.nombre_completo}</option>
            ))}
          </select>
          {errors.usuario_id && <p className="text-red-600 text-sm">{errors.usuario_id}</p>}
        </div>

        {/* Plan */}
        <div>
          <label className="block font-semibold mb-1">Plan</label>
          <select
            value={data.plan_id}
            onChange={(e) => setData('plan_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un plan</option>
            {planes.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          {errors.plan_id && <p className="text-red-600 text-sm">{errors.plan_id}</p>}
        </div>

        {/* Precio (solo lectura) */}
        <div>
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="number"
            value={data.precio}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        {/* Fecha de inicio */}
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

        {/* Fecha de fin (calculada, solo lectura) */}
        <div>
          <label className="block font-semibold mb-1">Fecha de fin</label>
          <input
            type="date"
            value={data.fecha_fin}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block font-semibold mb-1">Estado</label>
          <select
            value={data.estado}
            onChange={(e) => setData('estado', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="activa">Activa</option>
            <option value="expirada">Expirada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          {errors.estado && <p className="text-red-600 text-sm">{errors.estado}</p>}
        </div>

        {/* Botones */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Crear suscripción
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

export default Crear;
