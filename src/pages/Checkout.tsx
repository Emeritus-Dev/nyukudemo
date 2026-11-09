import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  Shield,
  ArrowLeft,
  Lock,
  MapPin,
  ChevronRight,
  Package,
} from 'lucide-react';
import { type CartItem } from '../types/cart';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
  darkMode?: boolean;
}

type FulfillmentMethod = 'courier_guy' | 'pudo' | 'paxi' | 'pickup' | 'meetup';
type PaymentGateway = 'card' | 'ozow' | 'payflex' | 'payjustnow' | 'happypay' | 'mobicred';

export default function Checkout({ cart, onClearCart, darkMode = true }: CheckoutProps) {
  const navigate = useNavigate();

  // Guest details state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    city: 'Cape Town',
    postalCode: '',
    pickupLocation: 'South Point NMJ, Woodstock',
    meetupLocation: 'CPUT District Six Campus Corridor',
  });

  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>('courier_guy');
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Active items calculation (excluding on hold)
  const activeItems = useMemo(() => cart.filter((item) => item.status !== 'hold'), [cart]);

  const parsePrice = (priceStr: string): number => {
    return Number(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const subtotal = useMemo(() => {
    return activeItems.reduce((acc, item) => {
      return acc + parsePrice(item.product.price) * item.quantity;
    }, 0);
  }, [activeItems]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    switch (fulfillment) {
      case 'courier_guy':
        return 120;
      case 'pudo':
        return 70;
      case 'paxi':
        return 60;
      case 'pickup':
      case 'meetup':
        return 0;
      default:
        return 0;
    }
  }, [fulfillment, subtotal]);

  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `NYK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderComplete(true);
      onClearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div
        className={`min-h-screen pt-32 pb-24 px-6 flex items-center justify-center font-sans ${
          darkMode ? 'bg-[#070B16] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <div
          className={`max-w-lg w-full p-8 sm:p-10 rounded-3xl border text-center space-y-6 ${
            darkMode ? 'bg-[#0F172A]/90 border-white/10' : 'bg-white border-slate-200 shadow-2xl'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-500">
              Payment & Order Verified
            </span>
            <h2 className="text-3xl font-black tracking-tight mt-1">Order Confirmed</h2>
            <p className="text-xs text-slate-400 mt-2">
              Reference Code:{' '}
              <span className="font-mono font-bold text-white tracking-widest">{orderId}</span>
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl text-left text-xs space-y-2 border ${
              darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex justify-between">
              <span className="text-slate-400">Recipient:</span>
              <span className="font-bold">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span className="font-bold">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fulfillment:</span>
              <span className="font-bold uppercase tracking-wider text-amber-500">
                {fulfillment.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-inherit">
              <span className="text-slate-400">Total Settled:</span>
              <span className="font-black text-white">R{total.toLocaleString('en-ZA')}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Confirmation email and tracking updates have been dispatched to your email address.
          </p>

          <Link
            to="/shop"
            className="block w-full py-4 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition"
          >
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  if (activeItems.length === 0) {
    return (
      <div
        className={`min-h-screen pt-36 px-6 flex flex-col items-center justify-center font-sans ${
          darkMode ? 'bg-[#070B16] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <Package className="w-12 h-12 text-slate-600 mb-4" />
        <h2 className="text-2xl font-black">Your Checkout Bag is Empty</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Add items to your cart or release items from hold to proceed with order payment.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-28 pb-20 px-6 lg:px-16 transition-colors font-sans ${
        darkMode ? 'bg-[#070B16] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleProcessOrder} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Guest info, Delivery & South African Gateway */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-[#0F172A]/70 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h2 className="text-base font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Customer Identification</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  First Name *
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Last Name *
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Phone Number (SA +27) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="082 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 2. South African Fulfillment Method */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-[#0F172A]/70 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h2 className="text-base font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Fulfillment & Dispatch</span>
            </h2>

            <div className="space-y-3">
              {[
                { id: 'courier_guy', title: 'The Courier Guy (Door-to-Door)', price: 'R120', note: '2-3 Business Days' },
                { id: 'pudo', title: 'Pudo Smart Locker / Kiosk', price: 'R70', note: 'Locker-to-Locker Nationwide' },
                { id: 'paxi', title: 'PAXI Point (PEP Store Pickup)', price: 'R60', note: '7-9 Business Days Service' },
                { id: 'pickup', title: 'Self-Collection Pickup', price: 'Free', note: 'South Point NMJ, Woodstock' },
                { id: 'meetup', title: 'Campus / CBD Handover Meetup', price: 'Free', note: 'CPUT District Six Corridor' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    fulfillment === opt.id
                      ? 'border-amber-500 bg-amber-500/10'
                      : darkMode
                      ? 'border-white/10 bg-white/5 hover:border-white/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillment === opt.id}
                      onChange={() => setFulfillment(opt.id as FulfillmentMethod)}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="text-xs font-black">{opt.title}</div>
                      <div className="text-[11px] text-slate-400">{opt.note}</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-500">{opt.price}</span>
                </label>
              ))}
            </div>

            {/* Address input if door shipping */}
            {fulfillment === 'courier_guy' && (
              <div className="mt-4 pt-4 border-t border-inherit/40 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Street Address *
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 15 Sir Lowry Road"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Suburb / Town *
                    </label>
                    <input
                      required
                      type="text"
                      name="suburb"
                      value={formData.suburb}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                        darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Postal Code *
                    </label>
                    <input
                      required
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none ${
                        darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. South African Payment Gateways */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-[#0F172A]/70 border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <h2 className="text-base font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Payment Gateway</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'card', name: 'Credit / Debit Card', sub: 'Visa & Mastercard' },
                { id: 'ozow', name: 'Ozow Instant EFT', sub: 'Capitec, FNB, Standard, Nedbank' },
                { id: 'payflex', name: 'Payflex', sub: '4 interest-free installments' },
                { id: 'payjustnow', name: 'PayJustNow', sub: '3 monthly interest-free splits' },
                { id: 'happypay', name: 'Happy Pay', sub: '2 pay-day installments' },
                { id: 'mobicred', name: 'Mobicred', sub: 'Revolving online credit account' },
              ].map((gw) => (
                <label
                  key={gw.id}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentGateway === gw.id
                      ? 'border-amber-500 bg-amber-500/10'
                      : darkMode
                      ? 'border-white/10 bg-white/5 hover:border-white/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentGateway"
                      checked={paymentGateway === gw.id}
                      onChange={() => setPaymentGateway(gw.id as PaymentGateway)}
                      className="accent-amber-500"
                    />
                    <span className="text-xs font-black">{gw.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">{gw.sub}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div
            className={`p-6 sm:p-8 rounded-3xl border sticky top-28 space-y-6 ${
              darkMode ? 'bg-[#0F172A]/90 border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}
          >
            <h3 className="text-base font-black uppercase tracking-wider">Order Summary</h3>

            {/* Item list */}
            <div className="max-h-72 overflow-y-auto space-y-3 pr-2 scrollbar-none">
              {activeItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 py-2 border-b border-inherit/40">
                  <div className="w-14 h-14 rounded-xl bg-white/5 p-1 shrink-0 border border-inherit">
                    <img
                      src={item.product.images.front}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold truncate">{item.product.title}</h4>
                    <p className="text-[10px] text-slate-400">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-black text-amber-500 shrink-0">
                    {item.product.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({activeItems.length} items)</span>
                <span className="font-bold text-white">R{subtotal.toLocaleString('en-ZA')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Fulfillment ({fulfillment.toUpperCase()})</span>
                <span className="font-bold text-white">
                  {shippingCost === 0 ? 'FREE' : `R${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black pt-3 border-t border-inherit">
                <span>Total Due</span>
                <span className="text-amber-500">R{total.toLocaleString('en-ZA')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition shadow-xl cursor-pointer flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <span>Authorizing Gateway...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Confirm & Settle R{total.toLocaleString('en-ZA')}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>3D-Secure 256-Bit SSL Encrypted Verification</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}