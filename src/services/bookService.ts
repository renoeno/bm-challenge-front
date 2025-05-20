import { Book, BookSearchParams } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export const bookService = {
  async getBooks(params: BookSearchParams = {}): Promise<Book[]> {
    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.query) queryParams.append('query', params.query);
    if (params.category) queryParams.append('category', params.category);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = `${API_URL}/api/v1/books${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['books'],
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return response.json();
  },

  async getBookById(id: number): Promise<Book> {
    const response = await fetch(`${API_URL}/api/v1/books/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }

    return response.json();
  },
};
