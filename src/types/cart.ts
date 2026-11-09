import type { Product } from '../data/types';

export interface CartItem {
  id: string; // instance id: `${product.id}-${size}`
  product: Product;
  size: string;
  quantity: number;
  status: 'active' | 'hold' | 'reserved';
  reservedUntil?: number; // epoch timestamp for 15-minute countdown
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}