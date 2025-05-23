'use client';
import CartButton from '@/components/Cart/CartButton';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { Provider } from '@/components/ui/provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavbarRoutes = ['/login', '/signup', '/books/create'];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={`flex-grow ${showNavbar ? 'ml-[244px]' : ''}`}>
        {children}
      </main>
      {showNavbar && <CartButton />}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#F6F7F9] flex font-dm-sans">
        <AuthProvider>
          <Provider>
            <CartProvider>
              <MainLayout>{children}</MainLayout>
            </CartProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
