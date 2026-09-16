'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Sun, Moon, Search, Menu, X, ArrowRight } from 'lucide-react';
import { TechLogo } from './TechLogo';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Tüm Ürünler', href: '/products' },
    { name: 'Telefonlar', href: '/products?category=smartphones' },
    { name: 'Laptoplar', href: '/products?category=laptops' },
    { name: 'Saatler', href: '/products?category=smartwatches' },
    { name: 'Aksesuarlar', href: '/products?category=accessories' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-black/5'
          : 'bg-white/65 dark:bg-slate-950/65 backdrop-blur-lg backdrop-saturate-150 border-b border-slate-200/50 dark:border-slate-800/50'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Brand Logo */}
          <div className="flex-shrink-0 min-w-0">
            <TechLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-400/10 font-bold border border-sky-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions on the Right */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Arama Yap"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Karanlık Mod Değiştir"
              title={theme === 'dark' ? 'Açık Moda Geç' : 'Karanlık Moda Geç'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              )}
            </button>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-900 dark:hover:bg-slate-800 text-white border border-slate-700/50 shadow-sm transition-all active:scale-95"
              aria-label="Sepetim"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
              <span className="hidden sm:inline ml-1.5 text-xs font-semibold">Sepet</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static sm:ml-2 flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-5 px-1 text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle Button (ALWAYS VISIBLE on scroll) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-xl text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md transition-colors"
              aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl px-4 py-3 shadow-md">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Model veya donanım arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs transition-colors flex items-center gap-1"
              >
                Ara
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu (Semi-transparent backdrop blur) */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl px-4 py-5 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-900/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-slate-500">Görünüm Modu</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-800 dark:text-slate-200 font-medium"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Açık Mod
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" /> Koyu Mod
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
