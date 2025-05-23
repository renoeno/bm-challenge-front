import { API_URL } from '@/config/api';
import {
  AggregatedBook,
  Book,
  BookSearchParams,
  CreateBookRequestBody,
} from '@/types/types';

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

  async getBookById(id: number): Promise<{ success: boolean; book: Book }> {
    const response = await fetch(`${API_URL}/api/v1/books/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }

    return response.json();
  },

  async getAggregatedBooks(
    params: BookSearchParams = {},
  ): Promise<AggregatedBook[]> {
    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.query) queryParams.append('query', params.query);
    if (params.category) queryParams.append('category', params.category);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = `${API_URL}/api/v1/books/aggregated${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['books'],
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch aggregated books');
    }

    return response.json();
  },

  async getAggregatedBookById(
    id: number,
  ): Promise<{ success: boolean; book: AggregatedBook }> {
    const response = await fetch(`${API_URL}/api/v1/books/aggregated/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch aggregated book');
    }

    return response.json();
  },

  async createBook(
    bookData: CreateBookRequestBody,
    token: string,
    userRole: string,
  ): Promise<{ success: boolean; book: Book }> {
    try {
      if (!token) {
        throw new Error('Authentication required');
      }

      if (userRole !== 'ADMIN') {
        throw new Error('Admin privileges required');
      }
      
      const response = await fetch(`${API_URL}/api/v1/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to create book: ${response.status}`,
        );
      }

      const result = await response.json();
      return {
        success: true,
        book: result.book,
      };
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },
};
