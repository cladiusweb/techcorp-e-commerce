'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Filter,
  SlidersHorizontal,
  Search,
  RotateCcw,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Grid,
  Check,
  Star,
  ChevronDown,
  X,
} from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import { fallbackProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

function ProductsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Local state
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(140000);
  const [minRating, setMinRating] = useState<number>(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category & search from URL if changed
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const s = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSearchQuery(s);
  }, [searchParams]);

  // Fetch from backend API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data?.length > 0) {
            setProducts(data.data);
          }
        }
      } catch (e) {
        console.warn('API error, using fallback products:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories: { id: string; name: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', name: 'Tüm Kategoriler', icon: Grid },
    { id: 'smartphones', name: 'Akıllı Telefonlar', icon: Smartphone },
    { id: 'laptops', name: 'Dizüstü Bilgisayarlar', icon: Laptop },
    { id: 'smartwatches', name: 'Akıllı Saatler', icon: Watch },
    { id: 'accessories', name: 'Aksesuarlar', icon: Headphones },
  ];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, sortBy]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    router.replace(`/products?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(140000);
    setMinRating(0);
    setSortBy('featured');
    router.replace('/products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Teknoloji Kataloğu
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          En son teknolojiyle donatılmış akıllı telefonlar, laptoplar, saatler ve aksesuarlar.
        </p>
      </div>

      {/* Main Grid: Sidebar + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold text-sm"
          >
            <Filter className="w-4 h-4 text-sky-500" />
            Filtreleri Göster ({filteredProducts.length} Ürün)
          </button>
        </div>

        {/* Left Sidebar Filter (Desktop + Mobile Drawer) */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } lg:block lg:col-span-1 space-y-6`}
        >
          <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6 sticky top-28">
            {/* Header & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                <SlidersHorizontal className="w-4 h-4 text-sky-500" />
                Filtreler
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Sıfırla
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Kategori
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const count =
                    cat.id === 'all'
                      ? products.length
                      : products.filter((p) => p.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span>{cat.name}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Maksimum Fiyat
                </h3>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                  ₺{maxPrice.toLocaleString('tr-TR')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="140000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₺5.000</span>
                <span>₺140.000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Minimum Değerlendirme
              </h3>
              <div className="flex flex-col gap-1.5">
                {[4.9, 4.8, 4.7].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      minRating === rating
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rating} ve üzeri</span>
                    </div>
                    {minRating === rating && <Check className="w-3.5 h-3.5 text-sky-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            {/* Search within catalog */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Katalogda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-sky-500 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Results Count & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white font-bold">
                  {filteredProducts.length}
                </strong>{' '}
                ürün bulundu
              </span>

              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold py-2 pl-3 pr-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="featured">Sıralama: Öne Çıkanlar</option>
                  <option value="price-asc">Fiyat: Artan</option>
                  <option value="price-desc">Fiyat: Azalan</option>
                  <option value="rating">En Yüksek Puan</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Search/Filter Badges */}
          {(selectedCategory !== 'all' || searchQuery || minRating > 0 || maxPrice < 140000) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Aktif Filtreler:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-500 text-xs font-semibold border border-sky-500/20">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => handleCategorySelect('all')} className="hover:text-sky-700" aria-label="Kaldır">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-500 text-xs font-semibold border border-indigo-500/20">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-indigo-700" aria-label="Kaldır">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-semibold border border-amber-500/20">
                  {minRating}+ Puan
                  <button onClick={() => setMinRating(0)} className="hover:text-amber-700" aria-label="Kaldır">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice < 140000 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-500/10 text-slate-500 text-xs font-semibold border border-slate-500/20">
                  Maks ₺{maxPrice.toLocaleString('tr-TR')}
                  <button onClick={() => setMaxPrice(140000)} className="hover:text-slate-700" aria-label="Kaldır">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold underline underline-offset-2 ml-1"
              >
                Temizle
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Kriterlere uygun ürün bulunamadı
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2 mb-6">
                Farklı bir arama terimi deneyebilir veya filtrelerinizi sıfırlayabilirsiniz.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-sky-500 dark:hover:bg-sky-400 transition-colors"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
          Katalog yükleniyor...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
