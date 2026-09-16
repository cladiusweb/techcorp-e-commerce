'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const Toast: React.FC = () => {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white border border-sky-500/30 px-5 py-3.5 rounded-2xl shadow-2xl shadow-sky-500/10">
        <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-100">{toastMessage}</p>
        </div>
        <div className="flex items-center gap-2 ml-3 pl-3 border-l border-slate-700">
          <Link
            href="/cart"
            onClick={closeToast}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors py-1 px-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Sepete Git
          </Link>
          <button
            onClick={closeToast}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
