'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Smartphone, Laptop, Watch, Headphones } from 'lucide-react';

export const CategoryCards: React.FC = () => {
  const categories = [
    {
      id: 'smartphones',
      name: 'Akıllı Telefonlar',
      desc: 'Yapay zeka çipleri, 200MP kameralar ve titanyum gövdeler',
      count: '3 Model',
      icon: Smartphone,
      gradient: 'from-blue-600/80 to-cyan-500/80',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'laptops',
      name: 'Dizüstü Bilgisayarlar',
      desc: 'M3 Max, OLED ekranlar ve profesyonel iş istasyonları',
      count: '3 Model',
      icon: Laptop,
      gradient: 'from-indigo-600/80 to-purple-600/80',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'smartwatches',
      name: 'Akıllı Saatler',
      desc: 'Titanyum zırh, çift frekanslı GPS ve derin dalış sensörleri',
      count: '3 Model',
      icon: Watch,
      gradient: 'from-amber-600/80 to-orange-500/80',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'accessories',
      name: 'Aksesuarlar',
      desc: 'Kayıpsız Hi-Res kulaklıklar ve 15W hızlı MagSafe istasyonları',
      count: '3 Model',
      icon: Headphones,
      gradient: 'from-emerald-600/80 to-teal-500/80',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-500">
              Kategorilere Göz Atın
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Teknoloji Kategorileri
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 sm:mt-0">
            En güncel donanım ekosistemini keşfedin ve yaşam alanınızı dönüştürün.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col justify-end p-6"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark & Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      <IconComponent className="w-5 h-5 text-sky-300" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 text-white border border-slate-700/50 backdrop-blur-sm">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 flex items-center justify-between group-hover:text-sky-300 transition-colors">
                    {cat.name}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
