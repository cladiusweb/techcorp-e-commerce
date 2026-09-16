'use client';

import React from 'react';
import Link from 'next/link';
import { TechLogo } from './TechLogo';
import { ShieldCheck, Truck, RotateCcw, Headphones, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-16 sm:mt-24 pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-10 sm:pb-14 border-b border-slate-800/80 mb-10 sm:mb-14">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Aynı Gün Hızlı Kargo</h4>
              <p className="text-[11px] text-slate-500">14:00 öncesi siparişlerde</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">2 Yıl Resmi Garanti</h4>
              <p className="text-[11px] text-slate-500">Distribütör belgeli ve onaylı</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">14 Gün Kolay İade</h4>
              <p className="text-[11px] text-slate-500">Koşulsuz iade ve değişim</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">7/24 Uzman Desteği</h4>
              <p className="text-[11px] text-slate-500">Teknoloji danışman hattı</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12 sm:mb-14">
          {/* Brand Column */}
          <div className="sm:col-span-2 space-y-4">
            <TechLogo size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Techcorp, en üst düzey donanım mühendisliği ve orijinal teknoloji ürünlerini premium alışveriş deneyimiyle sunar.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Durumu: Tüm Servisler Aktif
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Kategoriler
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/products?category=smartphones" className="hover:text-white transition-colors">
                  Akıllı Telefonlar
                </Link>
              </li>
              <li>
                <Link href="/products?category=laptops" className="hover:text-white transition-colors">
                  Dizüstü Bilgisayarlar
                </Link>
              </li>
              <li>
                <Link href="/products?category=smartwatches" className="hover:text-white transition-colors">
                  Akıllı Saatler
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-white transition-colors">
                  Aksesuarlar & Ses
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Tüm Katalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Support */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Kurumsal & Destek
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  İletişim & Destek
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Sepetim & Sipariş Özeti
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Teknoloji Bülteni
            </h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Lansmanlardan ve özel fırsatlardan ilk siz haberdar olun.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                  aria-label="Abone Ol"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500 block">
                Gizliliğinize önem veriyoruz. Asla spam gönderilmez.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Techcorp Teknoloji A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Gizlilik</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Koşullar</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">KVKK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
