import { PageProps } from '@/types';
import Navbar from '@/components/navbar';
import { Head, usePage } from '@inertiajs/react';

interface Plan {
    id: number;
    nombre: string;
    precio: number;
    duracion_dias: number;
    tipo: 'Prueba' | 'Silver' | 'Gold' | 'Diamond';
}

export default function SuscripcionesIndex() {
    const { planes } = usePage().props as unknown as { planes: Plan[] };

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

    return (
        <>
            <Navbar />
            <Head title="Planes de Suscripción" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
                <h1 className="text-4xl font-bold mb-8 text-center">Planes de Suscripción</h1>
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
                    {planes.map((plan) => (
                        <div
                            key={plan.id}
                            className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-6 border border-gray-200"
                        >
                            <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-8">
                                <img
                                    src={`/images/Planes suscripciones/${plan.tipo}.png`}
                                    alt={`Imagen del plan ${plan.tipo}`}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="w-full md:w-3/4">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">{plan.nombre}</h2>
                                <p className="text-lg leading-relaxed text-gray-800">
                                    {descripciones[plan.tipo]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
