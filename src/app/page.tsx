import BookItem from "@/components/Book/BookItem";
import CategoryFilter from "@/components/Filters/CategoryFilter";
import Filter from "@/components/Filters/Filter";
import SearchBar from "@/components/SearchBar/SearchBar";
import { bookService } from "@/services/bookService";
import { Book } from "@/types/types";

export default async function Home() {
  const bookData = await bookService.getBooks()
  const categories = [...new Set(bookData.map((book: Book) => book.category).flat())];
  console.log(bookData)

  return (
    <div className="min-h-screen px-8 py-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-custom-dark-gray font-bold text-[28px] leading-[1]">
          Todos Livros
        </h1>
      </div>
      <hr className="bg-custom-tertiary-gray"/>
      <div className="mt-4 flex justify-between items-center ">
        <div className="w-[50%]">
        <SearchBar /></div>
        <Filter />
      </div>
      <div className="mt-5">
        <CategoryFilter categories={categories} />
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-4">
          {bookData.map((book: Book) => (
            <BookItem
            key={book.id}
            book={book}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
