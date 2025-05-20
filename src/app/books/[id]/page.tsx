import { bookService } from "@/services/bookService";
import { Book } from "@/types/types";
import { Breadcrumb } from "@chakra-ui/react"

export default async function BookPage(){
  const result = await bookService.getBookById(1)
  const book = result.book

    return  <div className="min-h-screen px-8 py-5 w-full">
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
                <Breadcrumb.Link href="/"><span className="text-custom-text text-[16px]">Início</span></Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                <Breadcrumb.Link href="#"><span className="text-custom-text text-[16px]">Livros</span></Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                <Breadcrumb.CurrentLink> <span className="text-custom-text text-[16px]">{book.category[0]}</span></Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </div>
    <div className="mt-6 flex gap-10">

        <div className="w-[473px] h-[584px] rounded-[12px] bg-custom-main-gray book.price"></div>
        <div className="flex-1 min-w-0">
          <p className="text-custom-text text-[38px] font-bold">{book.title}, {book.author}</p>
          <p className="text-custom-main-green text-[24px] font-bold">R${book.price}</p>
          <p className="text-custom-tertiary-gray text-[16px] font-bold">ou 2 x {parseFloat(book.price) / 2} sem juros</p>

          <p>{book.description}</p>
        </div>
    </div>
    <div className="mt-4">
     
    </div>
  </div>
}