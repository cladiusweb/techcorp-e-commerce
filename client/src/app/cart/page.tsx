'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, itemCount, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Shipping calculation: Free if over ₺1000
  const freeShippingThreshold = 1000;
  const shippingFee = totalAmount >= freeShippingThreshold || totalAmount === 0 ? 0 : 89;
  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalTotal = Math.max(0, totalAmount - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (code === 'TECH10') {
      setDiscountPercent(10);
      setCouponMessage({ text: 'Kupon uygulandı: %10 indirim kazandınız.', type: 'success' });
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setCouponMessage({ text: 'VIP indirimi uygulandı: %20 indirim.', type: 'success' });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ text: 'Geçersiz kupon kodu. (Demo kod: TECH10)', type: 'error' });
    }
  };

  const handleCheckout = () => {
    const num = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);
    setIsOrderCompleted(true);
    clearCart();
  };

  if (items.length === 0 && !isOrderCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Sepetiniz Boş
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mt-2 mb-8 leading-relaxed">
          En son teknoloji ürünü akıllı telefonlar, dizüstü bilgisayarlar ve aksesuarlar arasından dilediğinizi sepetinize ekleyebilirsiniz.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all hover:scale-102 active:scale-95"
        >
          Ürünleri İncele
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Alışveriş Sepeti
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Sepetinizde <strong className="text-sky-500 font-bold">{itemCount}</strong> adet ürün bulunmaktadır.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="self-start sm:self-auto text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 transition-colors flex items-center gap-1.5 py-2 px-3 rounded-xl border border-rose-500/20 hover:bg-rose-500/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Sepeti Temizle
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress Indicator */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50 dark:bg-slate-900/80 border border-sky-200 dark:border-sky-950 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {shippingFee === 0 ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Siparişiniz için Kargo Ücretsizdir.
                  </span>
                ) : (
                  <span>
                    Ücretsiz kargo avantajı için sepetinize{' '}
                    <strong className="text-sky-500">
                      {formatPrice(freeShippingThreshold - totalAmount)}
                    </strong>{' '}
                    değerinde daha ürün ekleyin.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Items Table/Cards */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id || item.productId}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200/60 dark:border-slate-800">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.productId}`}
                      className="font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-sky-500 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="text-[11px] sm:text-xs text-slate-400 block mt-0.5">
                      Birim: {formatPrice(item.price)}
                    </span>
                    <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-emerald-500">
                      Stokta Mevcut
                    </span>
                  </div>
                </div>

                {/* Stepper, Subtotal & Remove Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/60">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      aria-label="Adet Azalt"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      aria-label="Adet Artır"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    title="Ürünü Sepetten Kaldır"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Alışverişe Devam Et
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900/70 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-5 lg:sticky lg:top-28">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Sipariş Özeti
            </h2>

            {/* Coupon Code Box */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Kupon Kodu (TECH10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white uppercase placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-white font-bold text-xs transition-colors shrink-0"
                >
                  Uygula
                </button>
              </form>
              {couponMessage && (
                <p
                  className={`text-xs mt-2 ${
                    couponMessage.type === 'success' ? 'text-emerald-500 font-medium' : 'text-rose-500 font-medium'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Pricing Calculation Lines */}
            <div className="space-y-3 text-xs sm:text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Ara Toplam ({itemCount} Ürün)</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-500 font-medium">
                  <span>İndirim Tutarı (%{discountPercent})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Kargo Bedeli</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-500 font-bold">ÜCRETSİZ</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>KDV (%20 Dahil)</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice((finalTotal * 20) / 120)}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-slate-100 dark:border-slate-800 text-base sm:text-lg">
                <span className="font-bold text-slate-900 dark:text-white">Genel Toplam</span>
                <span className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Siparişi Tamamla (Güvenli Ödeme)
            </button>

            {/* Security Guarantee Text */}
            <div className="space-y-1.5 pt-2 text-[10px] sm:text-[11px] text-slate-400 text-center">
              <p className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit SSL Güvenli Ödeme Altyapısı
              </p>
              <p>MasterCard, Visa ve Troy ile 3D Secure Doğrulama</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Completion Success Modal */}
      {isOrderCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Siparişiniz Alındı
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Siparişiniz başarıyla sisteme aktarıldı ve sevkiyat hazırlığı başlatıldı.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Sipariş No:</span>
                <span className="font-mono font-bold text-sky-500">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Teslimat Süresi:</span>
                <span className="font-semibold text-slate-900 dark:text-white">1 İş Günü (Yarın)</span>
              </div>
            </div>

            <Link
              href="/"
              onClick={() => setIsOrderCompleted(false)}
              className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
