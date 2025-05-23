import { API_URL } from '@/config/api';
import {
  CreateOrderRequestBody,
  Order,
} from '@/types/types';
import { authenticatedFetch } from '@/utils/api';

export const orderService = {
  async getOrders(
    token: string,): Promise<{ success: boolean; orders: Order[]}> {
    const url = `${API_URL}/api/v1/orders`;

    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
        tags: ['books'],
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const result = await response.json();

    return {
      success: true,
      orders: result || [],
    };

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
    token: string,
  ): Promise<{ success: boolean; order: Order }> {
    try {

      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      
      return {
        success: true,
        order: result.order,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};
