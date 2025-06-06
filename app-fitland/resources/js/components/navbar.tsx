import AppLogo from './app-logo';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';
import { useState, useRef, useEffect } from 'react';
import type { ItemCarrito } from '@/types';


export default function Navbar() {
  const { auth } = usePage<{ auth: { user: User } }>().props;
  const user = auth.user;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [carritoTotal, setCarritoTotal] = useState(0);

  useEffect(() => {
    const actualizarTotal = () => {
      const carritoRaw = localStorage.getItem('carrito');
      const carrito = carritoRaw ? JSON.parse(carritoRaw) : [];
      const total = carrito.reduce((acc: number, item: ItemCarrito) => acc + item.cantidad, 0);
      setCarritoTotal(total);
    };

    actualizarTotal(); // carga inicial

    window.addEventListener('carritoActualizado', actualizarTotal);
    return () => window.removeEventListener('carritoActualizado', actualizarTotal);
  }, []);

  return (
    <nav className="h-22 bg-[#222222] text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-6">
        {user?.roles === 'admin' && (
          <a href="/admin" className="text-lg px-5 py-2 hover:underline">
            Panel de administración
          </a>
        )}
      </div>

      <div className="absolute right-1/2 transform -translate-x-1/2">
        <Link href="/">
          <AppLogo />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/horario-clases" className="text-lg px-5 py-2 hover:underline">
          Clases
        </Link>

        {user && (
          <Link href="/inscripciones" className="text-lg px-5 py-2 hover:underline">
            Inscripciones
          </Link>
        )}

        <Link href="/tienda" className="text-lg px-5 py-2 hover:underline">
          Tienda
        </Link>

        {user && (
          <Link href={route('carrito.index')} className="text-lg px-5 py-2 hover:underline">
            Carrito ({carritoTotal})
          </Link>
        )}

        {/* Usuario */}
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setOpenUserMenu(!openUserMenu)} className="focus:outline-none cursor-pointer">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-13 h-13 rounded-full border object-cover"
              />
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                <Link href="/ajustes" className="block px-4 py-2 hover:bg-gray-100">
                  Ajustes
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="text-lg px-5 py-2 hover:underline">Iniciar sesión</Link>
            <Link href="/register" className="text-lg px-5 py-2 hover:underline">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
