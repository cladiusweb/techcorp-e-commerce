'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface FeaturedSliderProps {
  products: Product[];
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 dark:text-sky-400 text-xs font-bold tracking-wider uppercase mb-2 border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Özel Seçimler
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Öne Çıkan Teknolojiler
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-1">
              Yüksek mühendislik, ödüllü tasarımlar ve en yeni amiral gemisi cihazlar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors mr-2 group"
            >
              Tüm Ürünler
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-2xl border transition-all ${
                  canScrollLeft
                    ? 'border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm'
                    : 'border-slate-100 dark:border-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                }`}
                aria-label="Önceki Ürünler"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-2xl border transition-all ${
                  canScrollRight
                    ? 'border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm'
                    : 'border-slate-100 dark:border-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                }`}
                aria-label="Sonraki Ürünler"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;
