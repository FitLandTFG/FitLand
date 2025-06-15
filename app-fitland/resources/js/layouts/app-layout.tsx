import { ReactNode } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
}