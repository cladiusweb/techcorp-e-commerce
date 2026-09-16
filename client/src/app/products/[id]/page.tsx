'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Cpu,
} from 'lucide-react';
import { Product } from '@/types';
import { fallbackProducts } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const id = params.id as string;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setProduct(json.data);
            setSelectedImage(json.data.image);
            return;
          }
        }
      } catch (e) {
        console.warn('API error fetching product, using fallback:', e);
      }

      // Local fallback
      const found = fallbackProducts.find((p) => p._id === id || p.slug === id);
      if (found) {
        setProduct(found);
        setSelectedImage(found.image);
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      // Find related products in same category
      const related = fallbackProducts
        .filter((p) => p.category === product.category && p.slug !== product.slug)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const categoryNames: Record<string, string> = {
    smartphones: 'Akıllı Telefonlar',
    laptops: 'Dizüstü Bilgisayarlar',
    smartwatches: 'Akıllı Saatler',
    accessories: 'Aksesuarlar',
  };

  if (!product && !loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ürün Bulunamadı</h2>
        <p className="text-slate-500 mt-2 mb-6">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link
          href="/products"
          className="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-semibold text-sm hover:bg-sky-600 transition-colors"
        >
          Kataloğa Dön
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-slate-500">
        Ürün detayları yükleniyor...
      </div>
    );
  }

  const galleryImages = [
    product.image,
    ...(product.images || []).filter((img) => img !== product.image),
  ];

  const discountRate =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Ana Sayfa
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/products" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Katalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {categoryNames[product.category] || product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white font-bold text-xs border border-slate-800 tracking-wide uppercase">
                {product.tag}
              </span>
            )}
            {discountRate > 0 && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-extrabold rounded-lg bg-rose-500 text-white shadow-lg">
                %{discountRate} İndirim
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white dark:bg-slate-900 ${
                    selectedImage === img
                      ? 'border-sky-500 shadow-lg shadow-sky-500/20 scale-102'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Purchase Controls */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {categoryNames[product.category] || product.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 stroke-none" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({product.reviewCount} kullanıcı değerlendirmesi)
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <Check className="w-3.5 h-3.5" /> Stokta Var (Hemen Kargoda)
              </span>
              <span className="text-xs text-slate-400">Kalan Stok: {product.stock} adet</span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg line-through text-slate-400 font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              KDV dahildir. Anlaşmalı kredi kartlarına <strong className="text-sky-500">vade farksız 3 taksit</strong> imkanı.
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Ürün Açıklaması
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features Bullet Points */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-500" />
                Öne Çıkan Mühendislik Özellikleri
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 p-0.5 rounded-full bg-sky-500/20 text-sky-500">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Purchase Actions: Quantity & Add to Cart */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-1.5 sm:w-36">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white disabled:opacity-30 transition-colors"
                aria-label="Adet Azalt"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-900 dark:text-white text-sm px-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white disabled:opacity-30 transition-colors"
                aria-label="Adet Artır"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Large "Sepete Ekle" Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-sm transition-all duration-200 shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                isAdded
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/25'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Sepete Eklendi!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Sepete Ekle ({formatPrice(product.price * quantity)})
                </>
              )}
            </button>
          </div>

          {/* Value Assurance Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <Truck className="w-5 h-5 text-sky-500 mb-1" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">Ücretsiz Kargo</span>
              <span className="text-[9px] text-slate-400">14:00'e kadar aynı gün</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <ShieldCheck className="w-5 h-5 text-indigo-500 mb-1" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">2 Yıl Garanti</span>
              <span className="text-[9px] text-slate-400">Distribütör belgeli</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <RotateCcw className="w-5 h-5 text-purple-500 mb-1" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">14 Gün İade</span>
              <span className="text-[9px] text-slate-400">Koşulsuz kolay iade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Teknik Özellikler
            </h2>
          </div>
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden bg-white dark:bg-slate-900/40 shadow-sm">
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr
                    key={key}
                    className={`border-b border-slate-100 dark:border-slate-800/60 ${
                      idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/30' : ''
                    }`}
                  >
                    <td className="py-4 px-6 text-xs sm:text-sm font-bold text-slate-900 dark:text-white w-1/3 sm:w-1/4 border-r border-slate-100 dark:border-slate-800/60">
                      {key}
                    </td>
                    <td className="py-4 px-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800/80">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
            İlginizi Çekebilecek Benzer Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
