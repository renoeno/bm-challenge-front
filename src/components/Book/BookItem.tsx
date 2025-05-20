import { Book } from "@/types/types";

export default function BookItem({book}: {book: Book}) {
    return <div className="w-[214px] h-[331px] flex flex-col justify-between">
        <div className="w-[214px] h-[264px] bg-custom-main-gray">

        </div>
        <div className="mt-2">
            <p className="text-custom-text leading-[1]">{book.title}, {book.author}</p>
            <p className="mt-2 text-custom-text font-bold text-[16px] leading-[1]">R$ {book.price}</p>
        </div>
    </div>
}