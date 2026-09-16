'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const categoryNames: Record<string, string> = {
    smartphones: 'Akıllı Telefon',
    laptops: 'Dizüstü Bilgisayar',
    smartwatches: 'Akıllı Saat',
    accessories: 'Aksesuar',
  };

  const discountRate =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const productId = product._id || product.id || product.slug;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/50 dark:hover:border-sky-500/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300">
      {/* Badges Overlay */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.tag && (
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-lg bg-slate-900/80 dark:bg-slate-800/90 text-white backdrop-blur-md border border-slate-700/40 shadow-sm">
            {product.tag}
          </span>
        )}
        {discountRate > 0 && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-md bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm">
            %{discountRate} İndirim
          </span>
        )}
      </div>

      {/* Product Image Link */}
      <Link
        href={`/products/${productId}`}
        className="relative w-full pt-[85%] bg-slate-50 dark:bg-slate-950/50 overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-semibold text-slate-900 dark:text-white shadow-lg">
            <Eye className="w-3.5 h-3.5 text-sky-500" /> Detayları İncele
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {categoryNames[product.category] || product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
            <span>{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${productId}`} className="mb-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action Button Footer */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] line-through text-slate-400 dark:text-slate-500 font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`relative inline-flex items-center justify-center p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
              isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-900 hover:bg-sky-600 dark:bg-slate-800 dark:hover:bg-sky-600 text-white'
            }`}
            title="Sepete Ekle"
          >
            {isAdded ? (
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Eklendi</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-sky-400 group-hover:text-white" />
                <span className="hidden sm:inline">Sepete Ekle</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
