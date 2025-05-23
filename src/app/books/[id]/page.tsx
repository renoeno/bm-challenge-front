import BookActions from '@/components/Book/BookActions';
import CollapsibleDescription from '@/components/CollapsibleDescription/CollapsibleDescription';
import { bookService } from '@/services/bookService';
import { Breadcrumb } from '@chakra-ui/react';
import Image from 'next/image';

export default async function BookPage({ params }: {  params: Promise<{ id: string }> }) {
  const bookId = (await params).id

  const result = await bookService.getAggregatedBookById(parseInt(bookId));
  const book = result.book;

  return (
    <div className="min-h-screen px-8 py-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-custom-dark-gray font-bold text-[28px] leading-[1]">
          Todos Livros
        </h1>
      </div>
      <hr className="bg-custom-tertiary-gray" />
      <div className="mt-6 ">
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/">
                <span className="text-custom-text text-[16px]">Início</span>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">
                <span className="text-custom-text text-[16px]">Livros</span>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>
                {' '}
                <span className="text-custom-text text-[16px]">
                  {book.category[0]}
                </span>
              </Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
      <div className="mt-6 flex gap-10">
      <div className="mt-6 flex gap-10 overflow-visible">
        <div className="w-[473px] flex-none">
          <div className="sticky top-6 w-[473px] h-[584px] rounded-[12px] bg-[#F2F2F2] flex justify-center items-center">
            <Image
              src={book.image}
              alt={`Capa do livro ${book.title}`}
              width={312}
              height={488}
            />
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-custom-text text-[38px] font-bold">
            {book.title}, <span className="uppercase">{book.author}</span>
          </p>
          <p className="text-custom-main-green text-[24px] font-bold">
            R${book.variants[0].price}
          </p>
          <p className="text-custom-tertiary-gray text-[16px] font-bold">
            ou 2 x {parseFloat(book.variants[0].price) / 2} sem juros
          </p>

          <div className="my-6">
            <CollapsibleDescription description={book.description} />
          </div>
          
          <BookActions book={book} />
        </div>
      </div>
      </div>
    </div>
  );
}
