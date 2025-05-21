'use client';

import { ShoppingBag } from 'feather-icons-react';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CartModal = dynamic(() => import('./CartModal'), { ssr: false });

export default function CartButton() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute top-7 right-12 cursor-pointer">
        <ShoppingBag size={20} />
      </div>
    );
  }

  const totalItems = getTotalItems();

  return (
    <>
      <div
        className="absolute top-7 right-12 cursor-pointer"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingBag size={20} />
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-custom-main-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </div>
        )}
      </div>

      {isCartOpen && (
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}
