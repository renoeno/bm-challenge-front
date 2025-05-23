import BookItem from '@/components/Book/BookItem';
import CategoryFilter from '@/components/Filters/CategoryFilter';
import CategoryHero from '@/components/Filters/CategoryHero';
import Filter from '@/components/Filters/Filter';
import SearchBar from '@/components/SearchBar/SearchBar';
import { bookService } from '@/services/bookService';
import { AggregatedBook } from '@/types/types';


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string;
    query?: string; }>
}) {

  let selectedCategory = (await searchParams).category
  const searchQuery = (await searchParams).query

  if (!selectedCategory) {
    selectedCategory = 'Todos';
  }

  const allBooks = await bookService.getAggregatedBooks();
  const allCategories = [
    ...new Set(allBooks.map((book: AggregatedBook) => book.category).flat()),
  ];
  allCategories.unshift('Todos');

  const bookData = await bookService.getAggregatedBooks({
    category: selectedCategory !== 'Todos' ? selectedCategory : undefined,
    query: searchQuery || undefined,
  });

  return (
    <div className="min-h-screen px-8 py-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-custom-dark-gray font-bold text-[28px] leading-[1]">
          Todos Livros
        </h1>
      </div>
      <hr className="bg-custom-tertiary-gray" />
      <div className="mt-4 flex justify-between items-center ">
        <div className="w-[50%]">
          <SearchBar />
        </div>
        <Filter />
      </div>
      {!searchQuery ? (
        <div className="mt-6 ">
          {selectedCategory && selectedCategory !== 'Todos' ? (
            <CategoryHero category={selectedCategory} />
          ) : (
            <div className="w-full bg-custom-tertiary-gray rounded-full h-[296px]"></div>
          )}
        </div>
      ) : null}
      <div className={searchQuery ? 'mt-8' : 'mt-5'}>
        {!searchQuery ? (
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
          />
        ) : null}
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-4">
          {bookData.map((book: AggregatedBook) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
