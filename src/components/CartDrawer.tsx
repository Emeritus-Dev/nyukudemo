import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, size: string, delta: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  tier?: 'bronze' | 'silver' | 'gold';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  tier = 'gold',
}) => {
  // 15-minute countdown reservation timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  // Tier discount percentages
  const tierDiscountPercent = tier === 'gold' ? 0.15 : tier === 'silver' ? 0.1 : 0.05;

  // Compute Subtotal
  const subtotal = items.reduce((acc, item) => {
    const numericPrice = parseInt(item.product.price.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * tierDiscountPercent);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-900 shadow-2xl flex flex-col justify-between transition-colors">

          {/* Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-gothic tracking-wider dark:text-white text-zinc-900">
                  Your Nyüku Bag
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-black uppercase">
                  {tier} Member
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl dark:bg-zinc-900 bg-zinc-100 hover:scale-105 transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Timed Reservation Notice */}
            <div className="mt-4 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-pulse" /> Cart Reserved For:
              </span>
              <span className="font-mono font-bold">{formatTimer(timeLeft)}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-zinc-400">
                <p className="text-base font-semibold">Your shopping bag is empty</p>
                <p className="text-xs mt-1 text-zinc-500">Add pieces from the collection to claim membership perks.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3.5"
                >
                  <img
                    src={item.product.images.front}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover bg-zinc-200 dark:bg-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold dark:text-white text-zinc-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs font-mono font-bold text-amber-500 mt-0.5">
                      {item.product.price}
                    </p>
                    <span className="text-[10px] text-zinc-400 uppercase font-mono">
                      Size: {item.size}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-lg text-xs font-mono">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="hover:text-amber-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="hover:text-amber-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-900 space-y-3 bg-zinc-50 dark:bg-zinc-950">
              <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-zinc-900 dark:text-white font-semibold">
                    R{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-amber-500 font-semibold">
                  <span>{tier.toUpperCase()} Member Perk ({tierDiscountPercent * 100}%)</span>
                  <span className="font-mono">-R{discountAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-900 dark:text-white font-bold text-sm pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-amber-500">
                    R{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => alert(`Proceeding to PayFast / Ozow with ZAR ${finalTotal.toLocaleString()}`)}
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all"
              >
                Instant Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-zinc-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Encrypted RSA 2048 • South African Door Courier
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export type { CartDrawerProps, CartItem };
export default CartDrawer;