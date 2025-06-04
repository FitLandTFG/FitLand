import React, { useState, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  tipo: string;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Props = {
  productos: {
    data: Producto[];
    links: PaginationLink[];
  };
  categorias: string[];
  filtros: {
    categoria?: string;
    buscar?: string;
  };
};

export default function Tienda({ productos, categorias, filtros }: Props) {
  const [buscar, setBuscar] = useState(filtros.buscar || '');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(filtros.categoria || '');

  const aplicarFiltros = (nuevaBusqueda?: string, nuevaCategoria?: string) => {
    router.get(route('tienda.index'), {
      buscar: nuevaBusqueda !== undefined ? nuevaBusqueda : buscar,
      categoria: nuevaCategoria !== undefined ? nuevaCategoria : categoriaSeleccionada,
    }, { preserveState: true });
  };

  // Efecto para buscar a medida que el usuario escribe (con retardo)
 useEffect(() => {
  const delayDebounce = setTimeout(() => {
    router.get(route('tienda.index'), {
      buscar,
      categoria: categoriaSeleccionada,
    }, { preserveState: true });
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [buscar, categoriaSeleccionada]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4">
        <aside className="md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Categorías</h2>
          <ul>
            <li
              className={`cursor-pointer mb-1 ${!categoriaSeleccionada ? 'font-bold' : ''}`}
              onClick={() => {
                setCategoriaSeleccionada('');
                aplicarFiltros(buscar, '');
              }}
            >
              Todas
            </li>
            {categorias.map((categoria) => (
              <li
                key={categoria}
                className={`cursor-pointer mb-1 ${categoriaSeleccionada === categoria ? 'font-bold' : ''}`}
                onClick={() => {
                  setCategoriaSeleccionada(categoria);
                  aplicarFiltros(buscar, categoria);
                }}
              >
                {categoria}
              </li>
            ))}
          </ul>
        </aside>

        <main className="md:w-3/4 md:pl-6">
          <div className="mb-4">
            <input
              type="text"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full p-2 border rounded"
            />
          </div>

          {productos.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.data.map((producto) => (
                  <div key={producto.id} className="border p-4 rounded">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <p className="text-gray-700">€{producto.precio.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {productos.links.map((link, index) => (
                  link.url ? (
                    <Link
                      key={index}
                      href={link.url}
                      className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                    >
                      {link.label.replace(/&laquo;|&raquo;/g, '')}
                    </Link>
                  ) : (
                    <span
                      key={index}
                      className="px-3 py-1 border rounded text-gray-400"
                    >
                      {link.label.replace(/&laquo;|&raquo;/g, '')}
                    </span>
                  )
                ))}
              </div>
            </>
          ) : (
            <p>No se han encontrado resultados con esa búsqueda.</p>
          )}
        </main>
      </div>
    </>
  );
}
