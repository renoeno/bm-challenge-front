'use client';

import { AggregatedBook, Variant } from '@/types/types';
import Button from '../Button/Button';
import { MessageCircle, ArrowRight } from 'feather-icons-react';
import Quantity from '../Quantity/Quantity';
import BookColors from '../Variants/BookColors';
import { BookVariants } from '../Variants/BookVariants';
import { useState } from 'react';
import AddBookButton from './AddBookButton';

export default function BookActions({ book }: { book: AggregatedBook }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    book.variants[0],
  );
  const [quantity, setQuantity] = useState(0);

  const handleSelectVariant = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleUpdateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <>
      <div className="mt-10">
        <BookVariants
          variants={book.variants}
          handleSelectVariant={(variant: Variant) =>
            handleSelectVariant(variant)
          }
        />
      </div>
      <div className="mt-8">
        <BookColors />
      </div>
      <div className="mt-8">
        <p className="font-bold text-[17px]">Quantidade</p>
        <p className="text-[16px] mt-2">
          ⚠️ Para este produto quantidade mínima é:
        </p>
        <div className="mt-5">
          <Quantity
            stock={selectedVariant.stock}
            quantity={quantity}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </div>
      </div>
      <div className="mt-10">
        <AddBookButton
          book={book}
          selectedVariant={selectedVariant.variant}
          quantity={quantity}
        />
        <div className="mt-3">
          <Button
            size="lg"
            variant="secondary"
            className="w-[290px] text-[#34A853] border-[#34A853] flex items-center justify-center gap-3 font-bold text-[14px]"
          >
            <MessageCircle /> Tem alguma dúvida?
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <p className="font-bold text-[17px] text-custom-text">
          Cálculo de frete
        </p>

        <div className="mt-2 flex align-center gap-2">
          <input
            required
            placeholder="Digite seu CEP"
            className="w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-custom-text ring-1 ring-inset ring-custom-text  focus:ring-custom-main-gray"
          />

          <Button className="bg-custom-text text-white ">
            <ArrowRight />
          </Button>
        </div>

        <p className="text-[14px] text-custom-text underline mt-2">
          Não sei meu cep
        </p>
        <div className="mt-2">
          <div className="w-full rounded-lg border border-[#ECECEC] py-2 px-4">
            <div className="flex justify-between">
              <div>
                <p className="text-[14px] font-semibold">Nome do Frete</p>
                <p className="text-[14px] text-custom-text">Prazo</p>
              </div>
              <p className="text-[14px] text-custom-text">Preço</p>
            </div>
          </div>
          <div className="w-full rounded-lg border border-[#ECECEC] py-2 px-4">
            <div className="flex justify-between">
              <div>
                <p className="text-[14px] font-semibold">Nome do Frete</p>
                <p className="text-[14px] text-custom-text">Prazo</p>
              </div>
              <p className="text-[14px] text-custom-text">Preço</p>
            </div>
          </div>
          <div className="w-full rounded-lg border border-[#ECECEC] py-2 px-4">
            <div className="flex justify-between">
              <div>
                <p className="text-[14px] font-semibold">Nome do Frete</p>
                <p className="text-[14px] text-custom-text">Prazo</p>
              </div>
              <p className="text-[14px] text-custom-text">Preço</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
