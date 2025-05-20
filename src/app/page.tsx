import BookItem from "@/components/Book/BookItem";
import CategoryFilter from "@/components/Filters/CategoryFilter";
import CategoryHero from "@/components/Filters/CategoryHero";
import Filter from "@/components/Filters/Filter";
import SearchBar from "@/components/SearchBar/SearchBar";
import { bookService } from "@/services/bookService";
import { Book } from "@/types/types";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}


export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await new Promise<SearchParams>((resolve) => {
    resolve(searchParams);
  });

  let selectedCategory = params.category as string | undefined;

  if(!selectedCategory) {
    selectedCategory = "Todos"
  }
  
  // Fetch all available categories first (independent of filtering)
  const allBooks = await bookService.getBooks();
  const allCategories = [...new Set(allBooks.map((book: Book) => book.category).flat())];
  allCategories.unshift("Todos");
  
  // Then fetch filtered books (if a category is selected)
  const bookData = selectedCategory !== "Todos" 
    ? await bookService.getBooks({
        category: selectedCategory,
      })
    : allBooks; // Reuse already fetched books if no category filter
 
 
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
      <div className="mt-6 ">
        {selectedCategory ? <CategoryHero category={selectedCategory} /> : <div className="w-full bg-custom-tertiary-gray rounded-full h-[296px]"></div>}
      </div>
      <div className="mt-5">
        <CategoryFilter categories={allCategories} selectedCategory={selectedCategory} />
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
