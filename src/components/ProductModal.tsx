import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldAlert, Sparkles, ChevronRight, Heart } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  isDark?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  isDark = true,
}) => {
  if (!isOpen || !product) return null;

  const availableSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes.map((s) => s.size)
      : product.availableSizes && product.availableSizes.length > 0
      ? product.availableSizes
      : ['S', 'M', 'L', 'XL'];

  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0] || 'M');
  const [activeAngleKey, setActiveAngleKey] = useState<string>('front');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const imagesMap = product.images as unknown as Record<string, string | undefined>;
  const activeImageSrc = imagesMap[activeAngleKey] || product.images.front;

  const currentSizeObj = product.sizes?.find((s) => s.size === selectedSize);
  const currentStock = currentSizeObj?.stock ?? 12;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div
          className={`inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform rounded-3xl border shadow-2xl overflow-hidden relative ${
            isDark
              ? 'bg-[#0B1120] border-white/10 text-white shadow-black/90'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
          }`}
        >
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
            {onToggleWishlist && (
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-red-400'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-amber-400 hover:text-black flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            <div
              className={`md:col-span-6 p-6 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r ${
                isDark ? 'bg-zinc-950/80 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400">
                  BATCH 04 // LIMPOPO ARCHIVE
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  ID: #{String(product.id).padStart(3, '0')}
                </span>
              </div>

              <div className="relative aspect-square my-6 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
                <img
                  src={activeImageSrc}
                  alt={product.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_32px_rgba(0,0,0,0.65)] transition-all duration-300 transform hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2 no-scrollbar">
                {Object.entries(product.images)
                  .filter(([, src]) => Boolean(src))
                  .map(([key, src]) => {
                    const isActive = activeAngleKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveAngleKey(key)}
                        className={`w-14 h-14 rounded-xl border p-1 transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? 'border-amber-400 bg-amber-400/10 scale-105'
                            : isDark
                            ? 'border-white/10 bg-white/5 hover:border-white/30'
                            : 'border-slate-200 bg-white hover:border-slate-400'
                        }`}
                      >
                        <img
                          src={src}
                          alt={key}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    {product.category}
                  </span>
                  <h3 className="font-gothic text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    {product.title}
                  </h3>
                  <p className="font-mono text-xl font-bold text-amber-400 pt-1">
                    {product.price}
                  </p>
                </div>

                <p className="text-xs leading-relaxed font-sans text-slate-600 dark:text-zinc-300">
                  {product.description}
                </p>

                <div
                  className={`p-3.5 rounded-2xl border text-xs font-mono space-y-1 ${
                    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TEXTILE PROVENANCE & MATERIAL</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {product.material}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 uppercase font-bold">Select Sizing</span>
                    <span className="text-amber-400 font-bold">
                      {currentStock <= 5 ? (
                        <span className="flex items-center gap-1 text-red-400">
                          <ShieldAlert className="w-3 h-3" />
                          Only {currentStock} left in stock
                        </span>
                      ) : (
                        `${currentStock} units available`
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-11 h-10 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-300 font-black shadow-md scale-105'
                              : isDark
                              ? 'border-white/10 bg-white/5 text-zinc-300 hover:border-amber-400/50 hover:text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-amber-400/50 hover:text-black'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-inherit/20">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`w-full py-4 px-6 rounded-2xl font-gothic text-sm font-black uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500 text-black'
                      : 'bg-amber-400 hover:bg-amber-300 text-black active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Syndicate Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • {product.price}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </>
                  )}
                </button>

                <p className="text-[10px] font-mono text-center text-zinc-500 uppercase tracking-widest">
                  Free Nationwide Courier • Direct From Zebediela, Limpopo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;