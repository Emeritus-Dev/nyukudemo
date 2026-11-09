import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { type Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: number[];
  darkMode?: boolean;
}

export default function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  darkMode = true,
}: ProductGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => {
        const isHovered = hoveredId === product.id;
        const displayImage =
          isHovered && (product.images.folded || product.images.side || product.images.back)
            ? product.images.folded || product.images.side || product.images.back || product.images.front
            : product.images.front;

        const isWishlisted = wishlistIds.includes(product.id);
        const defaultSize = product.sizes[0]?.size || 'One Size';

        return (
          <div
            key={product.id}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`group rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
              darkMode
                ? 'bg-gradient-to-b from-[#0F172A]/80 to-[#070B16]/90 border-white/10 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10'
                : 'bg-white border-slate-200 hover:border-amber-500/50 hover:shadow-xl'
            }`}
          >
            {/* Wishlist Heart Button */}
            {onToggleWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleWishlist(product);
                }}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-500 text-white'
                    : darkMode
                    ? 'bg-black/40 text-slate-300 hover:text-white hover:bg-black/70'
                    : 'bg-white/80 text-slate-700 hover:text-black hover:bg-white'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            )}

            {/* Product Image Stage */}
            <Link
              to={`/product/${product.id}`}
              className="aspect-square p-6 flex items-center justify-center relative overflow-hidden group/img cursor-pointer"
            >
              <img
                src={displayImage}
                alt={product.title}
                className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover/img:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = product.images.front;
                }}
              />

              {/* Minimal Category Tag */}
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-amber-400 backdrop-blur-md border border-white/10">
                  {product.category}
                </span>
              </div>
            </Link>

            {/* Product Information: Clean Title, Bold Price & Action */}
            <div className="p-5 flex flex-col justify-between flex-1 border-t border-inherit/40 space-y-3">
              <div>
                <Link
                  to={`/product/${product.id}`}
                  className="hover:text-amber-500 transition block"
                >
                  <h3 className="font-extrabold text-sm tracking-tight line-clamp-1">
                    {product.title}
                  </h3>
                </Link>
                <div className="text-base font-black text-amber-500 mt-1">
                  {product.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-inherit/20">
                <Link
                  to={`/product/${product.id}`}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                    darkMode
                      ? 'border-white/10 hover:border-white/30 text-slate-300'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                  title="View Angles"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => onAddToCart(product, defaultSize)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black hover:bg-amber-400 transition font-black text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}