'use client';
import CartButton from '@/components/Cart/CartButton';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { Provider } from '@/components/ui/provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';

function NavbarWrapper() {
  'use client';

  const pathname = usePathname();
  const noNavbarRoutes = ['/login', '/signup', '/account'];

  if (noNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
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
              <NavbarWrapper /> {children}
              <CartButton />
            </CartProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
