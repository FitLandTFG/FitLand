import React from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface Usuario {
  id: number;
  nombre_completo: string;
}

interface Suscripcion {
  id: number;
  nombre: string;
}

interface Props {
  usuarios: Usuario[];
  suscripciones: Suscripcion[];
}

const Crear: React.FC<Props> = ({ usuarios, suscripciones }) => {
  const { data, setData, post, processing, errors } = useForm({
    usuario_id: '',
    suscripcion_id: '',
    cantidad: '',
    fecha_pago: '',
    metodo_pago: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/pagos');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Pago</h1>

      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/pagos"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-semibold">Usuario</label>
          <select
            value={data.usuario_id}
            onChange={(e) => setData('usuario_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre_completo}
              </option>
            ))}
          </select>
          {errors.usuario_id && <p className="text-red-600 text-sm">{errors.usuario_id}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Suscripción</label>
          <select
            value={data.suscripcion_id}
            onChange={(e) => setData('suscripcion_id', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona una suscripción</option>
            {suscripciones.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
          {errors.suscripcion_id && <p className="text-red-600 text-sm">{errors.suscripcion_id}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cantidad (€)</label>
          <input
            type="number"
            step="0.01"
            value={data.cantidad}
            onChange={(e) => setData('cantidad', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.cantidad && <p className="text-red-600 text-sm">{errors.cantidad}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Fecha de Pago</label>
          <input
            type="date"
            value={data.fecha_pago}
            onChange={(e) => setData('fecha_pago', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fecha_pago && <p className="text-red-600 text-sm">{errors.fecha_pago}</p>}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Método de Pago</label>
          <input
            type="text"
            value={data.metodo_pago}
            onChange={(e) => setData('metodo_pago', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.metodo_pago && <p className="text-red-600 text-sm">{errors.metodo_pago}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Crear Pago
        </button>
      </form>
    </div>
  );
};

export default Crear;