'use client';

import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import Button from '../Button/Button';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { Trash2, X, ShoppingBag } from 'feather-icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Quantity from '../Quantity/Quantity';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateItemQuantity, getTotalPrice } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    router.push('/cart');
  };

  if (!mounted) {
    return null;
  }

  const handleUpdateQuantity = (quantity: number) => {
    if (quantity < 1) {
      return;
    }
    updateItemQuantity(items[0].id, items[0].variant, quantity);
  };

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => e.open === false && onClose()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="rounded-[24px] w-full max-w-[485px] h-full max-h-[702px] flex flex-col">
            <Dialog.Header className="p-4">
              <div className="flex items-center justify-between w-full">
                <Dialog.Title>
                  <div className="flex items-start justify-between">
                    <div className="border rounded-lg border-[#F2F3F6] p-2">
                      <ShoppingBag width={17} />{' '}
                    </div>
                    <div className="ml-3">
                      <p className="font-bold text-[14px] leading-[20px]">
                        Carrinho
                      </p>
                      <p className="text-[12px] leading-[20px]">
                        Certifique da sua escolha e finalize a compra
                      </p>
                    </div>
                  </div>

                  <Dialog.CloseTrigger asChild className="mt-4 mr-4">
                    <button type="button" aria-label="Close dialog">
                      <X width={20} />
                    </button>
                  </Dialog.CloseTrigger>
                </Dialog.Title>
              </div>
            </Dialog.Header>
            <Dialog.Body className="p-4 overflow-y-auto flex-1">
              {items.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.variant}`}
                          className="flex pb-4 gap-x-8"
                        >
                          <div className="w-[183px] h-[226px]  relative mr-3 flex-1">
                            <div className="bg-gray-200 w-full h-full rounded-lg" />
                          </div>

                          <div className="flex-1 mr-8">
                            <p className="text-custom-text text-[16px] font-bold">
                              {item.title},{' '}
                              <span className="uppercase">{item.author}</span>
                            </p>
                            <p className="text-custom-main-green text-[16px] font-bold mt-3">
                              R${parseFloat(item.price).toFixed(2)}
                            </p>

                            <div className="flex items-center justify-between mt-4">
                              <Quantity
                                quantity={item.quantity}
                                stock={10}
                                handleUpdateQuantity={handleUpdateQuantity}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="w-full rounded-lg border border-[#ECECEC] p-4 mt-4">
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
                      <div className="w-full flex justify-center mt-12">
                        <Button
                          className="px-8 py-2 leading-[20px]"
                          onClick={handleCheckout}
                        >
                          Finalizar Compra
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
