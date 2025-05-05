import React from 'react';
import { useForm } from '@inertiajs/react';

interface Compra {
    id: number;
    producto_id: number;
    fecha_compra: string;
}

interface Usuario {
    id: number;
    nombre_completo: string;
}

interface Props {
    usuarios: Usuario[];
    compras: Compra[];
}

const Crear: React.FC<Props> = ({ usuarios, compras }) => {
    const { data, setData, post, processing, errors } = useForm({
        usuario_id: '',
        suscripcion_id: '',
        compra_id: '',
        metodo_pago: '',
        estado: '',
        monto: '',
        transaccion_id: '',
        fecha_pago: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/pagos');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Crear Pago</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block mb-1 font-semibold">Usuario</label>
                    <select
                        value={data.usuario_id}
                        onChange={(e) => setData('usuario_id', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre_completo}
                            </option>
                        ))}
                    </select>
                    {errors.usuario_id && <p className="text-red-600 text-sm">{errors.usuario_id}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Compra</label>
                    <select
                        value={data.compra_id}
                        onChange={(e) => setData('compra_id', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Seleccione una compra</option>
                        {compras.map((compra) => (
                            <option key={compra.id} value={compra.id}>
                                Producto ID: {compra.producto_id}
                            </option>
                        ))}
                    </select>
                    {errors.compra_id && <p className="text-red-600 text-sm">{errors.compra_id}</p>}
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

                <div>
                    <label className="block mb-1 font-semibold">Monto</label>
                    <input
                        type="number"
                        value={data.monto}
                        onChange={(e) => setData('monto', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.monto && <p className="text-red-600 text-sm">{errors.monto}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Transacción ID</label>
                    <input
                        type="text"
                        value={data.transaccion_id}
                        onChange={(e) => setData('transaccion_id', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.transaccion_id && <p className="text-red-600 text-sm">{errors.transaccion_id}</p>}
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

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Guardar Pago
                </button>
            </form>
        </div>
    );
};

export default Crear;