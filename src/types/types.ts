export interface Item {
  bookId: number;
  quantity: number;
}

export interface Order {
  id: number;
  itens: Item[];
  total: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string[];
  stock: number;
  price: string;
  image: string;
}

export interface AggregatedBook {
  id: number;
  title: string;
  description: string;
  category: string[];
  image: string;
  author: string;
  variants: Variant[];
}

export interface Variant {
  id: number;
  variant: string;
  price: string;
  stock: number;
}

export interface BookSearchParams {
  query?: string;
  category?: string;
  sortBy?: 'title' | 'price' | 'author';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  [key: string]: any;
}
