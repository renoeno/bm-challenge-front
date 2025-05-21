'use client';

import { ShoppingBag } from 'feather-icons-react';
import Button from '../Button/Button';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface AddBookButtonProps {
  book: {
    id: number;
    title: string;
    author: string;
    variants: {
      id: number;
      variant: string;
      price: string;
      stock: number;
    }[];
    image?: string;
  };
  selectedVariant: string;
  quantity: number;
}

export default function AddBookButton({
  book,
  selectedVariant,
  quantity,
}: AddBookButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const variant = book.variants.find((v) => v.variant === selectedVariant);

  if (!variant) return null;

  const handleAddToCart = () => {
    setIsAdding(true);

    addItem({
      id: book.id,
      title: book.title,
      variant: variant.variant,
      price: variant.price,
      stock: variant.stock,
      author: book.author,
      quantity: quantity,
      image: book.image,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="w-[290px] bg-custom-text text-white flex items-center justify-center gap-3 font-bold text-[14px]"
      disabled={isAdding || variant.stock < quantity || quantity <= 0}
    >
      <ShoppingBag /> {isAdding ? 'Adicionado!' : 'Adicionar à sacola'}
    </Button>
  );
}
