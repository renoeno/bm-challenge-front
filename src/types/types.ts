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
    category: string;
    stock: number;
    price: string;
    image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  [key: string]: any; 
}