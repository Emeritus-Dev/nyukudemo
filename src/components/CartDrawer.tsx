import React, { useMemo } from 'react';
import type { Product } from '../data/products';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

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

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  tier = 'bronze',
}: CartDrawerProps) {
  const parsePrice = (priceStr: string): number => {
    const numeric = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numeric, 10) || 0;
  };

  const rawSubtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + parsePrice(item.product.price) * item.quantity;
    }, 0);
  }, [items]);

  const discountRate = useMemo(() => {
    switch (tier) {
      case 'gold':
        return 0.15; // 15% VIP discount
      case 'silver':
        return 0.1; // 10% Member discount
      default:
        return 0;
    }
  }, [tier]);

  const discountAmount = Math.round(rawSubtotal * discountRate);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 text-white border-l border-white/10 shadow-2xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-gothic text-lg tracking-wider text-white">Your Vault Bag</h2>
                <p className="text-[10px] font-mono text-zinc-400">
                  {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-zinc-500">
                <ShoppingBag className="w-12 h-12 stroke-[1.5] text-zinc-600" />
                <p className="text-sm font-semibold">Your bag is currently empty.</p>
                <p className="text-xs max-w-xs text-zinc-500">
                  Select archival cutouts or catalog drops from the main showcase to reserve your pieces.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 p-1.5">
                    <img
                      src={item.product.images.front}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.title}</h4>
                    <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                      Size: <span className="text-amber-400 font-bold">{item.size}</span>
                    </p>
                    <p className="text-xs font-mono font-bold text-amber-400 mt-1">
                      {item.product.price}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 border border-white/10 bg-black/40 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>R{rawSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{tier.toUpperCase()} Member Perk</span>
                    <span>-R{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Dispatch & Courier</span>
                  <span className="text-white">Calculated at WhatsApp checkout</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white font-gothic">
                  <span>Total Due</span>
                  <span className="text-amber-400 font-mono text-base">R{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    `Hello Nyüku Concierge, I would like to reserve the following vault order:\n\n` +
                      items
                        .map(
                          (item) =>
                            `• ${item.product.title} (Size: ${item.size}, Qty: ${item.quantity}) - ${item.product.price}`
                        )
                        .join('\n') +
                      `\n\nTotal: R${finalTotal.toLocaleString()}`
                  );
                  window.open(`https://wa.me/27798139535?text=${message}`, '_blank');
                }}
                className="w-full py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-xl"
              >
                <span>Reserve via Concierge WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Authentic Syndicate Vault Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}