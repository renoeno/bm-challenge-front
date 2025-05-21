'use client';

import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import Button from '../Button/Button';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { Trash2, X } from 'feather-icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateItemQuantity, getTotalPrice } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    onClose();
    router.push('/cart');
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => e.open === false && onClose()}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline">Open</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {items.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variant}`}
                      className="flex border-b pb-4"
                    >
                      <div className="w-20 h-20 relative mr-3">
                        <div className="bg-gray-200 w-full h-full" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-xs text-gray-500">
                          Variante: {item.variant}
                        </p>
                        <p className="font-bold mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded">
                            <button
                              className="w-6 h-6 flex items-center justify-center"
                              onClick={() =>
                                updateItemQuantity(
                                  item.id,
                                  item.variant,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              className="w-6 h-6 flex items-center justify-center"
                              onClick={() =>
                                updateItemQuantity(
                                  item.id,
                                  item.variant,
                                  item.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="text-red-500"
                            onClick={() => removeItem(item.id, item.variant)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="w-full rounded-lg border border-[#ECECEC] py-2 px-4 mt-4">
                    <div className="flex justify-between mb-4">
                      <span>Subtotal ({items.length} produtos):</span>
                      <span className="font-bold">
                        R$ {getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span>Frete:</span>
                      <span className="font-bold">R$ 39.90</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span>Total:</span>
                      <span className="font-bold text-custom-main-green">
                        R$ {(getTotalPrice() + 39.9).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Body>
            {items.length > 0 && (
              <Dialog.Footer className="flex justify-center sticky bottom-0 bg-white">
                <Button onClick={handleCheckout}>Finalizar Compra</Button>
              </Dialog.Footer>
            )}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
