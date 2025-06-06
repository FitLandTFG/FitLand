import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';

type Clase = {
  id: number;
  nombre: string;
  horario: string;
  hora: string;
  dia: string;
  aforo: number;
};

const diasSemana: Record<string, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

const coloresClase: Record<string, string> = {
  Zumba: 'bg-pink-500',
  Pilates: 'bg-green-500',
  GAP: 'bg-yellow-500',
  HIIT: 'bg-red-500',
  'Full Body Workout': 'bg-indigo-500',
  'Cardio Dance': 'bg-orange-400',
  Yoga: 'bg-purple-500',
  'Entrenamiento Funcional': 'bg-emerald-500',
  Boxeo: 'bg-blue-500',
  Kickboxing: 'bg-rose-500',
};

function formatearRango(fechaInicio: string, fechaFin: string) {
  const f1 = new Date(fechaInicio);
  const f2 = new Date(fechaFin);

  const diaInicio = f1.getDate();
  const diaFin = f2.getDate();
  const mes = f1.toLocaleDateString('es-ES', { month: 'long' });
  const año = f1.getFullYear();

  return `Del ${diaInicio} al ${diaFin} de ${mes} de ${año}`;
}

export default function HorarioClases() {
  const { clases, inicio, fin } = usePage().props as unknown as {
    clases: Clase[];
    inicio: string;
    fin: string;
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {formatearRango(inicio, fin)}
        </h1>

        {/* Tabla */}
        <div className="grid grid-cols-8 gap-px text-sm rounded overflow-hidden">
          {/* Celda vacía (esquina superior izquierda) */}
          <div
            className="p-3 text-center text-lg"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />

          {/* Encabezado de días */}
          {Object.values(diasSemana).map((dia) => (
            <div
              key={dia}
              className="p-3 font-bold text-center text-white text-lg border border-gray-300"
              style={{ backgroundColor: '#7DD625' }}
            >
              {dia}
            </div>
          ))}

          {/* Filas por hora */}
          {Array.from({ length: 16 }).map((_, index) => {
            const hora = `${(6 + index).toString().padStart(2, '0')}:00`;

            return (
              <React.Fragment key={hora}>
                {/* Columna de horas */}
                <div
                  className="text-center font-semibold flex items-center justify-center text-lg border border-gray-300"
                  style={{
                    backgroundColor: '#7DD625',
                    color: '#FFFFFF',
                    height: '5rem',
                  }}
                >
                  {hora}
                </div>

                {/* Celdas por día */}
                {Object.keys(diasSemana).map((diaIng) => {
                  const clase = clases.find((c) => {
                    const [horaClase] = c.hora.split(':').map(Number);
                    const horaActual = parseInt(hora.split(':')[0]);
                    return c.dia === diaIng && horaClase === horaActual;
                  });

                  return (
                    <div
                      key={diaIng + hora}
                      className="bg-white h-20 p-1 border border-gray-300"
                    >
                      {clase && (
                        <div
                            className={`${coloresClase[clase.nombre] || 'bg-gray-500'} text-white rounded-md h-full w-full flex flex-col justify-center items-center text-center px-2 py-2 shadow-sm hover:shadow-md transition-shadow`}
                            >
                            <div className="font-semibold text-sm leading-snug">{clase.nombre}</div>
                            <div className="text-xs mt-1">{clase.hora} - {clase.aforo} plazas</div>
                            </div>

                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
