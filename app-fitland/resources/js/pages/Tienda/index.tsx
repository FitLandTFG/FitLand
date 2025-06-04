import React, { useState, useEffect } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
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

  const { url } = usePage();
  const currentPage = new URLSearchParams(url.split('?')[1] || '').get('page') || 1;

  const aplicarFiltros = (nuevaBusqueda?: string, nuevaCategoria?: string) => {
    router.get(route('tienda.index'), {
      buscar: nuevaBusqueda !== undefined ? nuevaBusqueda : buscar,
      categoria: nuevaCategoria !== undefined ? nuevaCategoria : categoriaSeleccionada,
    }, { preserveState: true });
  };

  // Efecto para búsqueda reactiva (conserva la página actual)
  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    router.get(route('tienda.index'), {
      buscar,
      categoria: categoriaSeleccionada,
      page: currentPage,
    }, { preserveState: true });
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [buscar, categoriaSeleccionada, currentPage]);


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
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </li>
            ))}
          </ul>
        </aside>

        <main className="md:w-3/4 md:pl-6">
          <div className="mb-4 relative">
            <input
              type="text"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full p-2 pr-10 border rounded"
            />
            {buscar && (
              <button
                type="button"
                onClick={() => setBuscar('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {productos.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.data.map((producto) => (
                  <div key={producto.id} className="border p-4 rounded">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-80 object-contain"
                    />
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <p className="text-gray-700">{producto.precio.toFixed(2)}€</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {productos.links.map((link, index) => {
                  const label = link.label
                    .replace(/&laquo;|&raquo;/g, '')
                    .replace('Previous', 'Página anterior')
                    .replace('Next', 'Página siguiente');

                  return link.url ? (
                    <Link
                      key={index}
                      href={link.url}
                      className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span
                      key={index}
                      className="px-3 py-1 border rounded text-gray-400"
                    >
                      {label}
                    </span>
                  );
                })}
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
