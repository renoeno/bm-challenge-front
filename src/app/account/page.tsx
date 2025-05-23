'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/types';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.accessToken) return;
      
      try {
        setLoadingOrders(true);
        setError(null);
        const response = await orderService.getOrders(user.accessToken);
        setOrders(response.orders || []);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoadingOrders(false);
      }
    };

    if (mounted && user && user.accessToken) {
      fetchOrders();
    }
  }, [user, mounted]);

  if (!mounted) {
    return null; 
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-600">Carregando conta...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">
            Você precisa estar logado para acessar esta página
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-custom-dark-gray font-bold text-[28px] leading-[1]">
          Minha Conta
        </h1>
      </div>
      <hr className="bg-custom-tertiary-gray" />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Informações Pessoais</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Tipo de conta:</strong> {user.role === 'ADMIN' ? 'Administrador' : 'Cliente'}</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Seus Pedidos</h2>
          {loadingOrders ? (
            <div className="text-center py-6">
              <div className="spinner"></div>
              <p className="mt-2 text-gray-600">Carregando pedidos...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-700">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        R$ {parseFloat(order.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}