import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    nombre_completo: string;
    documentacion: string;
    domicilio: string;
    avatar?: string;
    email: string;
    password: string;
    imagen: string;
    roles: 'user' | 'admin'; // Basado en tu enum rolesusuarios_enum
    email_verified_at: string | null;
    remember_token: string | null;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown;
  }
  export interface PageProps {
  auth: Auth;
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: unknown;
}
export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  stock?: number;
}

