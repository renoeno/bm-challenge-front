'use client';

import { Dialog, Portal } from '@chakra-ui/react';
import Button from '../Button/Button';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { X, ShoppingBag } from 'feather-icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Quantity from '../Quantity/Quantity';
import { orderService } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateItemQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body scroll
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (orderSuccess) {
      // Auto close after 5 seconds
      timer = setTimeout(() => {
        setOrderSuccess(false);
        onClose();
        router.push('/');
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [orderSuccess, onClose, router]);

  const handleCheckout = async () => {
    try {
      setSubmiting(true);

      const total = (getTotalPrice() + 39.9).toFixed(2);

      const currItems = items.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
      }));

      const response = await orderService.createOrder({
        total: total,
        items: currItems,
      }, user?.accessToken || '');

      if (!response.success) {
        console.error('Falha ao criar pedido. Por favor, tente novamente.');
        onClose();
      } else {
        
        clearCart()
        setOrderSuccess(true);
      }

    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error('Falha ao criar pedido. Por favor, tente novamente.');
      }
      onClose();
    } finally {
      setSubmiting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => e.open === false && !orderSuccess && onClose()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="rounded-[24px] w-full max-w-[485px] h-full max-h-[702px] flex flex-col bg-white">
            <Dialog.Header className="p-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-start">
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

                <Dialog.CloseTrigger asChild>
                  <button 
                    type="button" 
                    aria-label="Close dialog"
                    disabled={orderSuccess}
                  >
                    <X width={20} />
                  </button>
                </Dialog.CloseTrigger>
              </div>
            </Dialog.Header>
            <Dialog.Body className="p-4 overflow-y-auto flex-1">
              {orderSuccess ? (
                <div className="flex items-center justify-center h-full">
                  {/* Simple success message with custom styling */}
                  <div className="bg-custom-main-green bg-opacity-10 text-custom-main-green rounded-lg p-6 text-center">
                    <div className="w-16 h-16 mx-auto bg-custom-main-green bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-custom-main-green" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold">Pedido realizado com sucesso!</h3>
                    <p className="mt-2">
                      Seu pedido foi registrado e está sendo processado.
                    </p>
                    <p className="mt-4 text-sm text-opacity-70">
                      Fechando em 5 segundos...
                    </p>
                  </div>
                </div>
              ) : items.length === 0 ? (
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
                          <div className="w-[183px] h-[226px] relative mr-3 flex-1">
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
                                handleUpdateQuantity={(qty) => 
                                  updateItemQuantity(item.id, item.variant, qty)
                                }
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
                          disabled={submiting || getTotalPrice() === 0}
                        >
                          {submiting ? 'Processando...' : 'Finalizar Compra'}
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