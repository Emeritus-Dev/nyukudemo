import React, { useState, useMemo } from 'react';
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Truck,
  PackageCheck,
  Star,
  CheckCircle2,
  Loader2,
  Lock,
  FileDown,
  Mail,
} from 'lucide-react';
import type { Product } from '../data/products';
import { processSimulatedCheckout, generateAndDownloadReceiptPDF } from '../utils/checkoutService';

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

type CheckoutStep = 'bag' | 'details' | 'processing' | 'confirmed';

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
  const [step, setStep] = useState<CheckoutStep>('bag');
  const [customerName, setCustomerName] = useState('Tshegofatso Hlabela');
  const [customerEmail, setCustomerEmail] = useState('chegofatsoemeritus1704@gmail.com');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [lastOrderSnapshot, setLastOrderSnapshot] = useState<{
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const parseNumericPrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const rawSubtotal = items.reduce(
    (acc, item) => acc + parseNumericPrice(item.product.price) * item.quantity,
    0
  );

  const discountRate = tier === 'gold' ? 0.15 : tier === 'silver' ? 0.10 : 0.05;
  const discountAmount = rawSubtotal * discountRate;
  const finalTotal = rawSubtotal - discountAmount;

  const dynamicDates = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();

    const deliveryStart = new Date(now);
    deliveryStart.setDate(now.getDate() + 2);

    const deliveryEnd = new Date(now);
    deliveryEnd.setDate(now.getDate() + 5);

    const startStr = `${deliveryStart.getDate()} ${months[deliveryStart.getMonth()]}`;
    const endStr = `${deliveryEnd.getDate()} ${months[deliveryEnd.getMonth()]}`;

    return `${startStr} - ${endStr}`;
  }, []);

  if (!isOpen) return null;

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setConfirmedOrderId('');
    }
    setErrorMsg('');
    onClose();
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) return;

    setErrorMsg('');
    setStep('processing');

    const snapshot = {
      items: [...items],
      subtotal: rawSubtotal,
      discount: discountAmount,
      total: finalTotal,
    };

    try {
      const orderId = await processSimulatedCheckout({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        items: snapshot.items,
        subtotal: snapshot.subtotal,
        discount: snapshot.discount,
        total: snapshot.total,
        deliveryWindow: dynamicDates,
        tier,
      });

      setLastOrderSnapshot(snapshot);
      setConfirmedOrderId(orderId);
      setStep('confirmed');

      if (onClearCart) {
        onClearCart();
      } else {
        snapshot.items.forEach((item) => onRemoveItem(Number(item.product.id), item.size));
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg('Email dispatch failed. Check your EmailJS keys in checkoutService.ts (PDF was still generated).');
      setStep('details');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleCloseDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md flex flex-col shadow-2xl transition-all border-l ${
            isDark
              ? 'bg-zinc-950 border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {step === 'details' && (
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="p-1 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer mr-1"
                  aria-label="Back to bag"
                >
                  <ArrowLeft className="w-4 h-4 text-amber-400" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-gothic text-xl font-black uppercase tracking-wider">
                {step === 'bag' && `CART (${totalCount})`}
                {step === 'details' && 'SECURE CHECKOUT'}
                {step === 'processing' && 'AUTHORIZING...'}
                {step === 'confirmed' && 'ORDER CONFIRMED'}
              </h2>
            </div>
            <button
              onClick={handleCloseDrawer}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: BAG VIEW */}
          {step === 'bag' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-zinc-200 dark:divide-white/10 no-scrollbar">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <ShoppingBag className="w-12 h-12 text-zinc-500 mx-auto stroke-[1.5]" />
                    <p className="font-gothic text-base font-bold uppercase">Your Bag is Empty</p>
                    <p className="text-xs font-mono text-zinc-400 max-w-xs mx-auto">
                      Explore our seasonal drop pieces and archived syndicate staples.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="pt-6 first:pt-0 flex gap-4 text-left">
                      <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.images.front}
                          alt={item.product.title}
                          className="w-full h-full object-contain filter drop-shadow-md"
                        />
                      </div>

                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-bold font-gothic line-clamp-1 uppercase">
                          {item.product.title}
                        </h4>
                        <p className="font-mono text-xs font-bold text-amber-500">
                          {item.product.price}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-400">
                          SIZE: <span className="font-bold text-slate-800 dark:text-zinc-200">{item.size}</span>
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-zinc-200 dark:border-white/15 rounded-lg overflow-hidden font-mono text-xs">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(Number(item.product.id), item.size, -1)}
                              className="px-2.5 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(Number(item.product.id), item.size, 1)}
                              className="px-2.5 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(Number(item.product.id), item.size)}
                            className="text-[11px] font-mono text-zinc-400 hover:text-red-400 underline underline-offset-2 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {items.length > 0 && (
                  <div className="pt-6">
                    <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/15 bg-zinc-900 text-white space-y-1 text-left shadow-lg">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <h4 className="font-gothic text-xs font-black uppercase tracking-wider">
                          {tier === 'bronze'
                            ? 'This order upgrades you to Bronze'
                            : tier === 'silver'
                            ? 'This order qualifies you for Silver Syndicate'
                            : 'Gold Archive Syndicate Active'}
                        </h4>
                      </div>
                      <p className="text-[11px] font-sans text-zinc-300 leading-relaxed pl-6">
                        {tier === 'gold'
                          ? 'You are enjoying 15% VIP discount, free express delivery, and sealed drop access.'
                          : tier === 'silver'
                          ? 'Your member discount on future orders moves up to 10%. This order keeps your active tier benefits.'
                          : 'Your member discount on future orders moves up to the Bronze rate. This order keeps your current rate.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-zinc-200 dark:border-white/10 space-y-6 bg-zinc-50 dark:bg-zinc-950">
                  <div className="space-y-3">
                    <div className="relative flex items-center justify-between">
                      <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-amber-400 z-0" />

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
                          <Truck className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
                          <PackageCheck className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between text-left text-xs font-sans">
                      <div className="w-1/3">
                        <p className="font-bold text-slate-900 dark:text-white">Today</p>
                        <p className="text-[11px] text-zinc-500 font-mono">Order placed</p>
                      </div>
                      <div className="w-1/3 text-center">
                        <p className="font-bold text-slate-900 dark:text-white">Tomorrow</p>
                        <p className="text-[11px] text-zinc-500 font-mono">Order ships</p>
                      </div>
                      <div className="w-1/3 text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{dynamicDates}</p>
                        <p className="text-[11px] text-zinc-500 font-mono">Delivered</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="w-full py-4 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-gothic text-sm font-black uppercase tracking-widest hover:bg-amber-400 hover:text-black dark:hover:bg-amber-400 dark:hover:text-black transition-all flex items-center justify-between shadow-xl cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        CHECKOUT • R {finalTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: DISPATCH DETAILS & SIMULATED GATEWAY */}
          {step === 'details' && (
            <form onSubmit={handleCompletePayment} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
              <div className="space-y-5 text-left">
                <div className="p-4 rounded-2xl border border-amber-400/25 bg-amber-400/5 space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Yoco / PayFast Sandbox Simulation
                  </p>
                  <p className="text-xs text-zinc-300">
                    Submitting will immediately download your official PDF invoice and email the receipt to your inbox.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase font-bold text-zinc-400 block">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase font-bold text-zinc-400 block">
                    Confirmation Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-zinc-900/60 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Archive Subtotal</span>
                    <span>R {rawSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Syndicate Discount ({Math.round(discountRate * 100)}%)</span>
                    <span>- R {discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Courier ({dynamicDates})</span>
                    <span>FREE</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-amber-400">
                    <span>Total Payable</span>
                    <span>R {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-gothic text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>PAY R {finalTotal.toFixed(2)} & SEND RECEIPT</span>
              </button>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
              <h3 className="font-gothic text-xl font-black uppercase">Processing Dispatch</h3>
              <p className="text-xs font-mono text-zinc-400 max-w-xs">
                Generating your Nyüku PDF tax receipt and sending confirmation to {customerEmail}...
              </p>
            </div>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === 'confirmed' && (
            <div className="flex-1 flex flex-col justify-between p-6 text-center">
              <div className="my-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 font-bold">
                    REF: {confirmedOrderId}
                  </span>
                  <h3 className="font-gothic text-2xl font-black uppercase pt-2">
                    Order Dispatched
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    Your receipt PDF has been downloaded and a confirmation email was sent to{' '}
                    <span className="text-white font-bold">{customerEmail}</span>.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 pt-2 max-w-xs mx-auto">
                  {lastOrderSnapshot && (
                    <button
                      type="button"
                      onClick={() =>
                        generateAndDownloadReceiptPDF(
                          {
                            customerName,
                            customerEmail,
                            items: lastOrderSnapshot.items,
                            subtotal: lastOrderSnapshot.subtotal,
                            discount: lastOrderSnapshot.discount,
                            total: lastOrderSnapshot.total,
                            deliveryWindow: dynamicDates,
                            tier,
                          },
                          confirmedOrderId
                        )
                      }
                      className="w-full py-3 px-4 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download PDF Receipt Again</span>
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Sent Successfully</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-full py-4 rounded-2xl bg-white text-black font-gothic text-sm font-black uppercase tracking-widest hover:bg-amber-400 transition-all cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;