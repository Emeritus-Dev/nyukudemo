import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  // Extract all available image angles from the product
  const imageViews = [
    { key: 'front', label: 'Front', url: product.images.front },
    { key: 'side', label: 'Side', url: product.images.side },
    { key: 'back', label: 'Back', url: product.images.back },
    { key: 'folded', label: 'Detail / Angle', url: product.images.folded },
  ].filter((view): view is { key: string; label: string; url: string } => Boolean(view.url));

  const [activeImage, setActiveImage] = useState<string>(product.images.front);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0]?.size || 'One Size'
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const selectedStock =
    product.sizes?.find((s) => s.size === selectedSize)?.stock ?? 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 transition-colors my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left Column: Image Angles & Gallery */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-850 flex items-center justify-center group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-white uppercase border border-white/10">
                {product.category}
              </span>
            </div>

            {/* Thumbnail Multi-Angle Switcher */}
            {imageViews.length > 1 && (
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Select View Angle:
                </p>
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {imageViews.map((view) => {
                    const isSelected = activeImage === view.url;
                    return (
                      <button
                        key={view.key}
                        onClick={() => setActiveImage(view.url)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          isSelected
                            ? 'border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={view.url}
                          alt={view.label}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 font-bold uppercase truncate">
                          {view.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Specs & Ordering */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-black uppercase">
                  Verified Archive
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  ID: #{String(product.id).padStart(3, '0')}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-gothic tracking-wider text-zinc-900 dark:text-white leading-tight">
                {product.title}
              </h2>

              <p className="text-2xl font-extrabold font-mono text-amber-500 dark:text-amber-400 mt-2">
                {product.price}
              </p>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Material Details */}
              <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs">
                <span className="text-zinc-400 uppercase font-mono font-bold">Material: </span>
                <span className="text-zinc-800 dark:text-zinc-200">{product.material}</span>
              </div>

              {/* Available Sizes Picker */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-500">
                    Select Size
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {selectedStock <= 5 ? (
                      <span className="text-rose-500 font-bold">Only {selectedStock} left!</span>
                    ) : (
                      `${selectedStock} in stock`
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-black shadow-md scale-105'
                            : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-2xl font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isAdded
                    ? 'bg-emerald-500 text-white scale-[1.01]'
                    : 'bg-amber-400 hover:bg-amber-300 text-black hover:scale-[1.01]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add To Bag ({selectedSize})
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-zinc-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Door Delivery across South Africa • 14-Day Free Exchange
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;