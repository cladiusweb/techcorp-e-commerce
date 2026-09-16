import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { getProducts } from '@/lib/api';
import FeaturedSlider from '@/components/FeaturedSlider';
import CategoryCards from '@/components/CategoryCards';

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter((p) => p.isFeatured);
  const heroProduct = allProducts.find((p) => p.slug === 'iphone-16-pro-max') || allProducts[0];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-8 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Soft Background Radial Lighting (contained without overflow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-semibold uppercase tracking-wider">
                Amiral Gemisi Teknoloji Ekosistemi
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Geleceğin Teknolojisi,{' '}
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Bugün Elinizde.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Yüksek mühendislik, amiral gemisi işlemciler ve ödüllü tasarımlar. Techcorp ile en üst seviye teknoloji ekosistemine adım atın.
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-102 active:scale-95 group"
                >
                  Tüm Ürünleri İncele
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products?category=smartphones"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  Akıllı Telefonlar
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Key Trust Stats (Fully Responsive on 320px+) */}
              <div className="pt-6 grid grid-cols-3 gap-2 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    12+
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Premium Cihaz
                  </span>
                </div>
                <div className="flex flex-col text-center sm:text-left border-x border-slate-200 dark:border-slate-800 px-2 sm:px-3">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    %100
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Resmi Garanti
                  </span>
                </div>
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    24 Saat
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Hızlı Teslimat
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase (Clean, NO protruding floating badges, NO horizontal overflow) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-2 shadow-xl">
                <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden">
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-4 sm:p-6">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider mb-1.5 w-max">
                      Haftanın Öne Çıkanı
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {heroProduct.name}
                    </h2>
                    <div className="mt-2 sm:mt-3 flex items-center justify-between">
                      <span className="text-lg sm:text-2xl font-black text-white">
                        ₺{heroProduct.price.toLocaleString('tr-TR')}
                      </span>
                      <Link
                        href={`/products/${heroProduct._id || heroProduct.slug}`}
                        className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-sky-400 hover:text-white transition-colors"
                      >
                        İncele
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <CategoryCards />

      {/* Featured Slider Carousel */}
      <FeaturedSlider products={featuredProducts} />

      {/* Trust Proposition Bar */}
      <section className="py-10 sm:py-14 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Aynı Gün Kargo</h3>
                <p className="text-xs text-slate-500">14:00 öncesi tüm siparişlerde</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">2 Yıl Distribütör Garantisi</h3>
                <p className="text-xs text-slate-500">Orijinal garantili ürünler</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">14 Gün Kolay İade</h3>
                <p className="text-xs text-slate-500">Koşulsuz iade hakkı</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
