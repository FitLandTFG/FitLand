import AppLogo from './app-logo';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';
import { useState, useRef, useEffect } from 'react';
import type { ItemCarrito } from '@/types';

export default function Navbar() {
  const { auth } = usePage<{ auth: { user: User } }>().props;
  const user = auth.user;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [carritoTotal, setCarritoTotal] = useState(0);

  useEffect(() => {
    const actualizarTotal = () => {
      const carritoRaw = localStorage.getItem('carrito');
      const carrito = carritoRaw ? JSON.parse(carritoRaw) : [];
      const total = carrito.reduce((acc: number, item: ItemCarrito) => acc + item.cantidad, 0);
      setCarritoTotal(total);
    };

    actualizarTotal();
    window.addEventListener('carritoActualizado', actualizarTotal);
    return () => window.removeEventListener('carritoActualizado', actualizarTotal);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="w-full bg-[#111111] text-white shadow-md z-50 relative">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8 relative">

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setOpenUserMenu(!openUserMenu)} className="focus:outline-none relative w-14 h-14">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className={`w-14 h-14 rounded-full object-cover cursor-pointer transition duration-150 border 
                  ${openUserMenu
                      ? 'border-[#41A510] border-[2.5px]'
                      : 'border-white border-[1.5px]'
                    }
                `}
              />
              </button>
              {openUserMenu && (
                <div className="absolute left-6 mt-1 w-40 bg-white text-black rounded shadow-md z-50">
                  <Link
                    href="/mi-cuenta"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cerrar sesión
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
              >
                Registrarse
              </Link>
            </>
          )}

          {user?.roles === 'admin' && (
            <Link
              href="/admin"
              className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
            >
              Panel de administración
            </Link>
          )}
        </div>

        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <Link href="/">
            <AppLogo />
          </Link>
        </div>

        <div className="lg:hidden ml-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded cursor-pointer hover:text-[#41A510]"
            aria-label="Menú"
          >
            {mobileMenuOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <span className="text-xl font-bold">☰</span>
            )}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <Link
            href="/horario-clases"
            className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
          >
            Clases
          </Link>
          {user && (
            <Link
              href="/inscribirse"
              className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
            >
              Inscripciones
            </Link>
          )}
          <Link
            href="/tienda"
            className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
          >
            Tienda
          </Link>
          <Link
            href="/suscripciones"
            className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
          >
            Suscripciones
          </Link>
          {user && (
            <Link
              href={route('carrito.index')}
              className="text-lg px-5 py-2 hover:underline hover:decoration-[#41A510] hover:decoration-2"
            >
              Carrito ({carritoTotal})
            </Link>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="flex flex-col items-start gap-2 px-6 py-4 bg-[#111111] border-t border-gray-700">
          {user?.roles === 'admin' && (
            <Link href="/admin" className="text-lg py-1 hover:text-[#41A510]">Panel de administración</Link>
          )}
          <Link href="/horario-clases" className="text-lg py-1 hover:text-[#41A510]">Clases</Link>
          {user && (
            <Link href="/inscribirse" className="text-lg py-1 hover:text-[#41A510]">Inscripciones</Link>
          )}
          <Link href="/tienda" className="text-lg py-1 hover:text-[#41A510]">Tienda</Link>
          <Link href="/suscripciones" className="text-lg py-1 hover:text-[#41A510]">Suscripciones</Link>
          {user && (
            <Link href={route('carrito.index')} className="text-lg py-1 hover:text-[#41A510]">
              Carrito ({carritoTotal})
            </Link>
          )}
          {user ? (
            <><Link
              href="/mi-cuenta"
              method="post"
              as="button"
              className="text-lg py-1 text-left hover:text-[#41A510] cursor-pointer"
            >
              Mi cuenta
            </Link><Link
              href="/logout"
              method="post"
              as="button"
              className="text-lg py-1 text-left hover:text-[#41A510] cursor-pointer"
            >
                Cerrar sesión
              </Link></>
          ) : (
            <>
              <Link href="/login" className="text-lg py-1 hover:text-[#41A510]">Iniciar sesión</Link>
              <Link href="/register" className="text-lg py-1 hover:text-[#41A510]">Registrarse</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}