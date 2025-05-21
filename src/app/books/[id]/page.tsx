import Button from '@/components/Button/Button';
import Quantity from '@/components/Quantity/Quantity';
import BookColors from '@/components/Variants/BookColors';
import { BookVariants } from '@/components/Variants/BookVariants';
import { bookService } from '@/services/bookService';
import { Breadcrumb } from '@chakra-ui/react';
import { ArrowRight, MessageCircle, ShoppingBag } from 'feather-icons-react';

interface BookPageProps {
  params: {
    id: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const bookId = parseInt(params.id);
  const result = await bookService.getAggregatedBookById(bookId);
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
        <div className="w-[473px] h-[584px] rounded-[12px] bg-custom-main-gray book.price flex-1"></div>
        <div className="flex-1 min-w-0">
          <p className="text-custom-text text-[38px] font-bold">
            {book.title}, {book.author}
          </p>
          <p className="text-custom-main-green text-[24px] font-bold">
            R${book.variants[0].price}
          </p>
          <p className="text-custom-tertiary-gray text-[16px] font-bold">
            ou 2 x {parseFloat(book.variants[0].price) / 2} sem juros
          </p>

          <p>{book.description}</p>
          <div className="mt-10"><BookVariants variants={book.variants} /></div>
          <div className='mt-8'>
            <BookColors />
          </div>
          <div className='mt-8'>
          <Quantity stock={book.variants[0].stock}/>
          </div>
          <div className='mt-10'> 
            <Button size='lg' className='w-[290px] bg-custom-text text-white flex items-center justify-center gap-3 font-bold text-[14px]'><ShoppingBag /> Adicionar à sacola</Button>
            <div className='mt-3'>
            <Button size='lg' variant='secondary' className='w-[290px] text-[#34A853] border-[#34A853] flex items-center justify-center gap-3 font-bold text-[14px]'><MessageCircle /> Tem alguma dúvida?</Button>
            </div>
          </div>
          <div className='mt-12'>
          <p className='font-bold text-[17px] text-custom-text'>Cálculo de frete</p>
            
          <div  className='mt-2 flex align-center gap-2'>
          <input
                  required
                  placeholder='Digite seu CEP'
                  className="w-[276px] relative block rounded-md border-0 py-1.5 px-3 text-custom-text ring-1 ring-inset ring-custom-text  focus:ring-custom-main-gray"
                />
  
  <Button className='bg-custom-text text-white '><ArrowRight /></Button>
          </div>

          <p className='text-[14px] text-custom-text underline'>Não sei meu cep</p>
          <div className='mt-2'>
            <div className='w-full rounded-lg border border-[#ECECEC] py-2 px-4'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[14px] font-semibold'>Nome do Frete</p>
                  <p className='text-[14px] text-custom-text'>Prazo</p>
                </div>
                <p className='text-[14px] text-custom-text'>Preço</p>
              </div>
            </div>
            <div className='w-full rounded-lg border border-[#ECECEC] py-2 px-4'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[14px] font-semibold'>Nome do Frete</p>
                  <p className='text-[14px] text-custom-text'>Prazo</p></div>
                <p className='text-[14px] text-custom-text'>Preço</p>
              </div>
            </div>
            <div className='w-full rounded-lg border border-[#ECECEC] py-2 px-4'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[14px] font-semibold'>Nome do Frete</p>
                  <p className='text-[14px] text-custom-text'>Prazo</p></div>
                <p className='text-[14px] text-custom-text'>Preço</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}
