import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
