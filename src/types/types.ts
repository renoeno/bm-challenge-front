export interface Item {
  bookId: number;
  quantity: number;
}

export interface CreateBookRequestBody {
  title: string;
  author: string;
  description: string;
  category: string[];
  price: string;
  image?: string;
  stock: number;
}

export interface CreateOrderRequestBody {
  itens: Item[];
  total: string;
}
export interface CartItem {
  id: number;
  title: string;
  author: string;
  stock: number;
  variant: string;
  price: string;
  quantity: number;
  image?: string;
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
