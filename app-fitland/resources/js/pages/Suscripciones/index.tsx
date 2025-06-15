import Navbar from '@/components/navbar';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { User } from '@/types';

interface Plan {
    id: number;
    nombre: string;
    precio: number;
    duracion_dias: number;
    tipo: 'Prueba' | 'Silver' | 'Gold' | 'Diamond';
}

export default function SuscripcionesIndex() {
const { planes, tieneSuscripcionActiva, auth } = usePage().props as unknown as {
  planes: Plan[];
  tieneSuscripcionActiva: boolean;
  auth: { user: User | null };
};

const user = auth.user;


    const [modalVisible, setModalVisible] = useState(false);

    const caracteristicas = [
        {
            label: 'Acceso ilimitado al gimnasio',
            tipos: ['Prueba', 'Silver', 'Gold', 'Diamond'],
        },
        {
            label: 'Inscripción ilimitada a clases',
            tipos: ['Gold', 'Diamond'],
        },
        {
            label: 'Mochila de regalo',
            tipos: ['Gold', 'Diamond'],
        },
        {
            label: '10% descuento en tienda',
            tipos: ['Diamond'],
        },
        {
            label: 'Invitar a un amigo sin límites',
            tipos: ['Diamond'],
        },
    ];

    const renderCheck = () => <span className="text-green-600 font-bold text-xl">✔</span>;
    const renderCross = () => <span className="text-red-500 font-bold text-xl">✘</span>;

    const descripciones: Record<string, string> = {
        Prueba:
            'Con este plan de prueba gratuito, podrás acceder al gimnasio sin límites durante 30 días. Es ideal para probar nuestras instalaciones antes de contratar un plan completo. Solo puede usarse una vez y sin haber contratado otra suscripción antes.',
        Silver:
            'El plan más económico. Incluye acceso ilimitado al gimnasio durante el periodo contratado. No permite inscribirse a ninguna de las clases.',
        Gold:
            'Incluye todo lo del plan Silver, además de inscripción ilimitada a cualquier clase del gimnasio y una mochila de deportiva de FitLand de regalo.',
        Diamond:
            'Incluye todos los beneficios del plan Gold. Además, obtienes un 10% de descuento en todos los productos de la tienda y puedes invitar a una persona a entrenar contigo sin límites presentando ambos DNI en recepción.',
    };

    const handleSuscripcion = async (planId: number) => {
    if (!user) {
        window.location.href = '/login';
        return;
    }

    if (tieneSuscripcionActiva) {
        setModalVisible(true);
        return;
    }


     try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // Eliminar cualquier carrito antiguo para evitar pagos duplicados
    // Eliminar cualquier carrito antiguo
        localStorage.removeItem('carrito');

        // Guardamos solo el plan_id para luego registrar la suscripción tras el pago
        localStorage.setItem('plan_id', planId.toString());

        const pagoRes = await fetch('/pago/crear-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify({
                suscripcion: true, // indicamos que es una suscripción
                plan_id: planId,
            }),
        });

   const pagoData = await pagoRes.json();

        if (pagoData.url) {
            window.location.href = pagoData.url;
        } else {
            alert('No se pudo iniciar el pago.');
        }
    } catch (error) {
        console.error('Error en la suscripción:', error);
        alert('Error inesperado al procesar la suscripción.');
    }


    };

    return (
        <>
            <Navbar />
            <Head title="Planes de Suscripción" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
                <h1 className="text-4xl font-bold mb-4 text-center">Planes de Suscripción</h1>
                <p className="text-lg text-center text-gray-700 mb-12">
                    Disfruta de cualquier suscripción sin ningún tipo de permanencia ni pago automático, evitando que pagues de más.
                </p>

                <div className="overflow-x-auto mb-12">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left text-lg font-semibold p-4 border-b"></th>
                                {planes.map((plan) => (
                                    <th key={plan.id} className="text-center text-lg font-semibold p-4 border-b">
                                        {plan.nombre}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100">
                                <td className="text-left font-medium p-4">Duración</td>
                                {planes.map((plan) => (
                                    <td key={plan.id} className="text-center p-4">
                                        {plan.duracion_dias === 365
                                            ? '1 año'
                                            : plan.duracion_dias === 30
                                                ? '1 mes'
                                                : `${Math.round(plan.duracion_dias / 30)} meses`}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="text-left font-medium p-4 bg-gray-100">Precio</td>
                                {planes.map((plan) => (
                                    <td key={plan.id} className="text-center p-4 bg-gray-100">
                                        {plan.precio === 0 ? 'Gratis' : `${plan.precio.toFixed(2)} €`}
                                    </td>
                                ))}
                            </tr>

                            {caracteristicas.map((caracteristica, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="text-left font-medium p-4">{caracteristica.label}</td>
                                    {planes.map((plan) => (
                                        <td key={plan.id} className="text-center p-4">
                                            {caracteristica.tipos.includes(plan.tipo) ? renderCheck() : renderCross()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 gap-10 mt-12">
                    {['Prueba', 'Silver', 'Gold', 'Diamond'].map((tipo) => {
                        const planMensual = planes.find(p => p.tipo === tipo && p.duracion_dias === 30);
                        const planAnual = planes.find(p => p.tipo === tipo && p.duracion_dias === 365);

                        if (!planMensual) return null;

                        return (
                            <div
                                key={tipo}
                                className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-6 border border-gray-200"
                            >
                                <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-8">
                                    <img
                                        src={`/images/Planes suscripciones/${tipo}.png`}
                                        alt={`Imagen del plan ${tipo}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="w-full md:w-3/4">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                        {tipo === 'Prueba' ? 'Plan de prueba' : `Suscripción ${tipo}`}
                                    </h2>
                                    <p className="text-lg leading-relaxed text-gray-800 mb-4">
                                        {descripciones[tipo]}
                                    </p>

                                    <div className="text-gray-700 font-medium text-base mb-6">
                                        {tipo === 'Prueba' ? (
                                            <span>30 días de prueba gratuitos</span>
                                        ) : (
                                            <>
                                                {planMensual && <p>Mensual: {planMensual.precio.toFixed(2)} €</p>}
                                                {planAnual && <p>Anual: {planAnual.precio.toFixed(2)} €</p>}
                                            </>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200 cursor-pointer"
                                            onClick={() => handleSuscripcion(planMensual.id)}

                                        >
                                            {tipo === 'Prueba' ? 'Obtener plan de prueba' : 'Suscripción mensual'}
                                        </button>

                                        {tipo !== 'Prueba' && planAnual && (
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition duration-200 cursor-pointer"
                                                onClick={() => handleSuscripcion(planAnual.id)}

                                            >
                                                Suscripción anual
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {modalVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-lg">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Ya tienes una suscripción activa</h2>
                        <p className="text-gray-700 mb-6">
                            Para adquirir una nueva suscripción, primero debes cancelar la actual.
                        </p>
                        <button
                            onClick={() => setModalVisible(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
