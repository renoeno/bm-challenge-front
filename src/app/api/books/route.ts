import { API_URL } from '@/config/api';
import { Book } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

interface CreateBookRequestBody {
  title: string;
  author: string;
  description: string;
  category: string[];
  price: string;
  image?: string;
  stock: number;
}

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/v1/books`);

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Error fetching data' },
        { status: 401 },
      );
    }

    const bookData: Book[] = await response.json();
    return NextResponse.json(bookData, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { message: 'Error fetching books' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateBookRequestBody = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.author ||
      !body.category ||
      !body.price ||
      !body.stock
    ) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/api/v1/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: body.title,
        description: body.description,
        author: body.author,
        category: body.category,
        price: body.price,
        image: body.image,
        stock: body.stock,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Error creating book' },
        { status: response.status },
      );
    }

    const createdBook: Book = await response.json();
    return NextResponse.json(
      { message: 'Book created successfully', book: createdBook },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { message: 'Error creating book' },
      { status: 500 },
    );
  }
}
