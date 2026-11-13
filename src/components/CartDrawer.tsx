import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
  Loader2,
  Sparkles,
  User,
} from 'lucide-react';
import type { Product } from '../data/products';
import {
  processSimulatedCheckout,
  generateAndDownloadReceiptPDF,
  type CheckoutPayload,
} from '../utils/checkoutService';
import { getActiveUser } from '../utils/authStorage';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, size: string, delta: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  onClearCart?: () => void;
  tier?: 'bronze' | 'silver' | 'gold';
  isDark?: boolean;
}

const parsePriceZAR = (priceStr: string): number => {
  const numeric = priceStr.replace(/[^0-9.]/g, '');
  const val = parseFloat(numeric);
  return isNaN(val) ? 0 : val;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  tier = 'gold',
  isDark = true,
}) => {
  const activeUser = getActiveUser();

  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState<string>(
    activeUser?.fullName || 'Tshegofatso Hlabela'
  );
  const [customerEmail, setCustomerEmail] = useState<string>(
    activeUser?.email || 'chegofatsoemeritus1704@gmail.com'
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<CheckoutPayload | null>(null);

  useEffect(() => {
    const user = getActiveUser();
    if (user) {
      setCustomerName(user.fullName);
      setCustomerEmail(user.email);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const discountRate = tier === 'gold' ? 0.15 : tier === 'silver' ? 0.1 : 0.05;
  const deliveryWindow = tier === 'gold' ? '2–3 Business Days (Express)' : '3–5 Business Days';

  const subtotal = items.reduce(
    (sum, item) => sum + parsePriceZAR(item.product.price) * item.quantity,
    0
  );
  const discount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discount);

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    setIsProcessing(true);

    const payload: CheckoutPayload = {
      customerName: customerName.trim() || 'Syndicate Collector',
      customerEmail: customerEmail.trim() || 'chegofatsoemeritus1704@gmail.com',
      items: [...items],
      subtotal,
      discount,
      total,
      deliveryWindow,
      tier,
    };

    try {
      const orderId = await processSimulatedCheckout(payload);
      setConfirmedOrderId(orderId);
      setLastPayload(payload);
      setStep('confirmed');
      if (onClearCart) {
        onClearCart();
      }
    } catch (err) {
      console.error('Checkout dispatch failed:', err);
      setCheckoutError(
        'PDF invoice downloaded, but email dispatch encountered a network issue. Verify your EmailJS keys or connection.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setStep('bag');
    setCheckoutError(null);
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md flex flex-col justify-between border-l shadow-2xl transition-colors ${
            isDark
              ? 'bg-zinc-950 border-white/10 text-white shadow-black'
              : 'bg-white border-slate-200 text-slate-950 shadow-slate-400'
          }`}
        >
          {/* Top Drawer Header */}
          <div className="px-6 py-5 border-b border-inherit/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-gothic text-lg font-black uppercase tracking-wider">
                {step === 'bag' && `Syndicate Bag (${items.reduce((a, b) => a + b.quantity, 0)})`}
                {step === 'checkout' && 'Express Archive Checkout'}
                {step === 'confirmed' && 'Order Authenticated'}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-9 h-9 rounded-full border border-inherit/20 flex items-center justify-center text-zinc-400 hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {step === 'bag' && (
              <>
                {items.length === 0 ? (
                  <div className="py-24 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-gothic text-lg font-black uppercase">Your Bag is Empty</h3>
                    <p className="text-xs font-mono text-zinc-400 max-w-xs mx-auto leading-relaxed">
                      Explore Batch 04 pieces and add your size to unlock automated PDF invoicing and dispatch tracking.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3.5 text-left ${
                          isDark
                            ? 'bg-zinc-900/80 border-white/10'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl bg-black p-1.5 flex items-center justify-center shrink-0">
                          <img
                            src={item.product.images.front}
                            alt={item.product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-gothic text-xs sm:text-sm font-bold uppercase truncate">
                            {item.product.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                            <span className="px-2 py-0.5 rounded bg-amber-400/15 text-amber-400 font-bold">
                              SIZE: {item.size}
                            </span>
                            <span className="font-bold text-amber-400">{item.product.price}</span>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(Number(item.product.id), item.size, -1)}
                              className="w-6 h-6 rounded-lg border border-inherit/20 flex items-center justify-center hover:border-amber-400 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(Number(item.product.id), item.size, 1)}
                              className="w-6 h-6 rounded-lg border border-inherit/20 flex items-center justify-center hover:border-amber-400 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(Number(item.product.id), item.size)}
                          className="p-2 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form id="nyuku-checkout-form" onSubmit={handleConfirmOrder} className="space-y-5 text-left">
                <div className="p-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tier.toUpperCase()} SYNDICATE PRIVILEGE APPLIED</span>
                  </div>
                  <p className="text-xs font-sans text-zinc-300">
                    Your {Math.round(discountRate * 100)}% tier discount and complimentary express courier ({deliveryWindow}) are locked in.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block">
                    Recipient Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Full Name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${
                        isDark
                          ? 'bg-zinc-900 border-white/15 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block">
                    Confirmation & Receipt Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${
                        isDark
                          ? 'bg-zinc-900 border-white/15 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400">
                    An official HTML order confirmation will be sent here and a PDF tax invoice will download automatically.
                  </p>
                </div>

                {checkoutError && (
                  <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono leading-relaxed">
                    {checkoutError}
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl border space-y-2 text-xs font-mono ${
                    isDark ? 'bg-zinc-900/70 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between text-zinc-400">
                    <span>Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                    <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Discount ({Math.round(discountRate * 100)}%)</span>
                    <span>- R {discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Nationwide Courier</span>
                    <span>FREE</span>
                  </div>
                  <div className="pt-2 border-t border-inherit/15 flex justify-between text-sm font-black text-amber-400">
                    <span>TOTAL DUE</span>
                    <span>R {total.toFixed(2)}</span>
                  </div>
                </div>
              </form>
            )}

            {step === 'confirmed' && confirmedOrderId && (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30">
                    DISPATCH QUEUED • ZEBEDIELA
                  </span>
                  <h3 className="font-gothic text-2xl font-black uppercase pt-1">
                    You Made Our Day
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Order Reference: <span className="text-white font-bold">{confirmedOrderId}</span>
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border text-left space-y-2 text-xs font-mono ${
                    isDark ? 'bg-zinc-900/80 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="flex items-center gap-2 text-emerald-400 font-bold">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>PDF Tax Invoice Downloaded</span>
                  </p>
                  <p className="flex items-center gap-2 text-amber-400 font-bold">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate">Confirmation sent to {customerEmail}</span>
                  </p>
                </div>

                {lastPayload && (
                  <button
                    type="button"
                    onClick={() => generateAndDownloadReceiptPDF(lastPayload, confirmedOrderId)}
                    className="w-full py-3 rounded-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-400 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download PDF Invoice Again</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-gothic text-sm font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Continue Exploring Archive
                </button>
              </div>
            )}
          </div>

          {/* Bottom Sticky Summary Bar */}
          {items.length > 0 && step !== 'confirmed' && (
            <div className="p-6 border-t border-inherit/15 space-y-4 bg-black/40 backdrop-blur-md">
              {step === 'bag' && (
                <>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span>R {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>{tier.toUpperCase()} Tier Privilege ({Math.round(discountRate * 100)}%)</span>
                      <span>- R {discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-amber-400 pt-1.5 border-t border-white/10">
                      <span>Estimated Total</span>
                      <span>R {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-gothic text-sm font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 'checkout' && (
                <div className="space-y-2.5">
                  <button
                    type="submit"
                    form="nyuku-checkout-form"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-black font-gothic text-sm font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating Invoice & Sending...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Complete Order • R {total.toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setStep('bag')}
                    className="w-full py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Bag
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;