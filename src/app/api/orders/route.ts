import { Item, Order } from '@/types/types';
import { authenticatedFetch } from '@/utils/api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface CreateOrderRequestBody {
  itens: Item[];
}

const API_URL = 'http://localhost:3005';

export async function GET(request: NextRequest) {
  try {
    const response = await authenticatedFetch(`${API_URL}/api/v1/orders`);

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Error fetching data' },
        { status: 401 },
      );
    }

    const orderData: Order[] = await response.json();
    return NextResponse.json(orderData, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Error fetching orders' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequestBody = await request.json();

    if (!body.itens || body.itens.length === 0) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const response = await authenticatedFetch(`${API_URL}/api/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itens: body.itens }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Error creating order' },
        { status: response.status },
      );
    }

    const createdOrder: Order = await response.json();
    return NextResponse.json(
      { message: 'Order created successfully', order: createdOrder },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Error creating order' },
      { status: 500 },
    );
  }
}
