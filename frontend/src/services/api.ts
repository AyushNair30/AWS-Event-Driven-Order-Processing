import type { OrderPayload, OrderResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

export async function createOrder(
  payload: OrderPayload
): Promise<OrderResponse> {
  const baseUrl = API_BASE_URL?.replace(/\/+$/, '');
  if (!baseUrl) {
    throw new Error(
      'API endpoint is not configured. Set VITE_API_URL in your environment.'
    );
  }

  const endpoint = `${baseUrl}/orders`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Unable to reach the order service. Please check your connection and try again.'
    );
  }

  if (!response.ok) {
    throw new Error(
      'We could not place your order right now. Please try again shortly.'
    );
  }

  let data: OrderResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error('Received an unexpected response from the order service.');
  }

  return data;
}

export function generateCustomerId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CUST-${id}`;
}
