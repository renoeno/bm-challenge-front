'use client';

import { useState, useEffect } from 'react';
import { bookService } from '@/services/bookService';
import { BookSearchParams } from '@/types/types';
import { Book } from '@/types/types';

export function useBooks(initialParams: BookSearchParams = {}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] =
    useState<BookSearchParams>(initialParams);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await bookService.getBooks(searchParams);
        setBooks(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchParams]);

  const updateSearchParams = (newParams: Partial<BookSearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  };

  const searchBooks = (query: string) => {
    updateSearchParams({ query, page: 1 });
  };

  const filterByCategory = (category: string) => {
    updateSearchParams({ category, page: 1 });
  };

  const sortBooks = (
    sortBy: 'title' | 'price' | 'author',
    sortOrder: 'asc' | 'desc',
  ) => {
    updateSearchParams({ sortBy, sortOrder });
  };

  const changePage = (page: number) => {
    updateSearchParams({ page });
  };

  return {
    books,
    loading,
    error,
    searchParams,
    searchBooks,
    filterByCategory,
    sortBooks,
    changePage,
    updateSearchParams,
  };
}
