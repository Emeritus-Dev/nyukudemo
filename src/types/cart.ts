import type { Product } from '../data/products';

export interface CartItem {
  id?: string | number;
  product: Product;
  size: string;
  quantity: number;
  status?: string;
}

export interface WishlistItem {
  id: string | number;
  product: Product;
  addedAt?: string | Date;
}
