import {
  AggregatedBook,
  Book,
  BookSearchParams,
  CreateOrderRequestBody,
  Order,
} from '@/types/types';
import { authenticatedFetch } from '@/utils/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const url = `${API_URL}/api/v1/orders`;

    const response = await authenticatedFetch(url, {
      next: {
        revalidate: 60,
        tags: ['books'],
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  },

  async getOrderById(id: number): Promise<{ success: boolean; order: Order }> {
    const response = await authenticatedFetch(`${API_URL}/api/v1/orders/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return response.json();
  },

  async createOrder(
    orderData: CreateOrderRequestBody,
  ): Promise<{ success: boolean; order: Order }> {
    try {
      const response = await authenticatedFetch(`${API_URL}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to create order: ${response.status}`,
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};
