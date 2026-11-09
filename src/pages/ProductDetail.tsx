import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import { PRODUCTS, type Product } from '../data/products';

interface ProductDetailProps {
  onAddToCart: (product: Product, size: string) => void;
  darkMode?: boolean;
}

export default function ProductDetail({ onAddToCart, darkMode = true }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  // Determine available image angles safely
  const availableImages = useMemo(() => {
    if (!product) return [];
    const imgs: { key: string; label: string; src: string }[] = [];
    if (product.images.front) imgs.push({ key: 'front', label: 'Front', src: product.images.front });
    if (product.images.side) imgs.push({ key: 'side', label: 'Side', src: product.images.side });
    if (product.images.folded) imgs.push({ key: 'folded', label: 'Folded', src: product.images.folded });
    if (product.images.back) imgs.push({ key: 'back', label: 'Back / Detail', src: product.images.back });
    return imgs;
  }, [product]);

  const [activeImage, setActiveImage] = useState<string>(
    availableImages[0]?.src || product?.images.front || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[0]?.size || ''
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (availableImages.length > 0) {
      setActiveImage(availableImages[0].src);
    }
    if (product?.sizes[0]?.size) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product, availableImages]);

  if (!product) {
    return (
      <div
        className={`min-h-screen pt-36 px-6 flex flex-col items-center justify-center ${
          darkMode ? 'bg-[#070B16] text-white' : 'bg-slate-50 text-slate-900'
        }`}
      >
        <h2 className="text-2xl font-black mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">
          The requested item does not exist or has been archived from the catalog.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
          <span>Back to Collection</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Product Images Showcase */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {availableImages.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 scrollbar-none">
              {availableImages.map((img) => (
                <button
                  key={img.key}
                  type="button"
                  onClick={() => setActiveImage(img.src)}
                  className={`w-20 h-20 rounded-2xl p-2 border transition-all cursor-pointer overflow-hidden ${
                    activeImage === img.src
                      ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105'
                      : darkMode
                      ? 'bg-white/5 border-white/10 hover:border-white/30'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-contain filter drop-shadow-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = product.images.front;
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Hero Viewer */}
          <div
            className={`flex-1 aspect-square rounded-3xl border flex items-center justify-center p-8 relative overflow-hidden ${
              darkMode
                ? 'bg-gradient-to-b from-[#0F172A]/70 to-[#070B16]/90 border-white/10'
                : 'bg-white border-slate-200'
            }`}
          >
            <img
              src={activeImage || product.images.front}
              alt={product.title}
              className="max-w-full max-h-full object-contain filter drop-shadow-2xl transition-all duration-300 hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = product.images.front;
              }}
            />
          </div>
        </div>

        {/* Right: Product Spec & Size Select */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-amber-500 mb-2">
              {product.category} • {product.gender}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              {product.title}
            </h1>
            <p className="text-2xl font-black text-amber-500 mt-3">
              {product.price}
            </p>

            <div className="mt-6 pt-6 border-t border-inherit">
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {product.description}
              </p>
              <div className="mt-4 text-[11px] font-bold text-slate-400">
                <span className="text-white">Material Spec:</span> {product.material}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Available Shades ({product.colors.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-lg text-[11px] font-bold bg-white/5 border border-white/10 text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mt-6">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Select Size / Dimension
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                      selectedSize === s.size
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105'
                        : darkMode
                        ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                        : 'bg-slate-100 border border-slate-200 text-slate-800'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="space-y-4 pt-6 border-t border-inherit">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                added
                  ? 'bg-emerald-500 text-black'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:brightness-110 active:scale-98'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {product.price}</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2 pt-4 text-center text-[10px] text-slate-400 font-bold border-t border-inherit">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>Nationwide Shipping</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                <span>Verified Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}