'use client';

import { AggregatedBook, Book } from '@/types/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BookItem({ book }: { book: AggregatedBook }) {
  const router = useRouter();
  const handleRedirectToBookPage = () => {
    router.push(`/books/${book.id}`);
  };
  const price = book.variants[0].price;
  return (
    <div
      className="w-[214px] h-[331px] flex flex-col justify-between cursor-pointer"
      onClick={handleRedirectToBookPage}
    >
      <div className="w-[214px] h-[264px] rounded-lg flex items-center justify-center bg-[#F2F2F2]">

      <Image
              src={book.image}
              alt={`Capa do livro ${book.title}`}
              width={130}
              height={200}
            />
      </div>
      <div className="mt-2">
        <p className="text-custom-text leading-[1]">
          {book.title}, {book.author}
        </p>
        <p className="mt-2 text-custom-text font-bold text-[16px] leading-[1]">
          R$ {price}
        </p>
      </div>
    </div>
  );
}
