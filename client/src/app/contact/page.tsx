'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Sipariş ve Kargo Takibi',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Müşteri Hizmetleri',
      desc: '0850 440 83 24',
      sub: 'Haftanın her günü 09:00 - 21:00',
    },
    {
      icon: Mail,
      title: 'E-Posta Desteği',
      desc: 'destek@techcorp.com.tr',
      sub: 'Ortalama yanıt süresi: 2 saat',
    },
    {
      icon: MapPin,
      title: 'Genel Merkez',
      desc: 'Maslak Teknoloji Vadisi',
      sub: 'Büyükdere Cad. No: 142, Sarıyer / İstanbul',
    },
    {
      icon: Clock,
      title: 'Hızlı Kargo Saati',
      desc: 'Hafta İçi 14:00',
      sub: 'Öncesi verilen siparişler aynı gün kargoda',
    },
  ];

  const faqs = [
    {
      q: 'Siparişim ne zaman kargoya verilir?',
      a: 'Hafta içi saat 14:00\'e kadar verilen tüm siparişler aynı gün anlaşmalı hızlı kargo firmalarımıza teslim edilir.',
    },
    {
      q: 'Satılan ürünler orijinal ve garantili midir?',
      a: 'Evet. Techcorp üzerinden satılan tüm ürünler %100 orijinal olup en az 2 yıl resmi distribütör veya üretici garantisine sahiptir.',
    },
    {
      q: 'İade ve değişim şartlarınız nelerdir?',
      a: 'Ürününüzü teslim aldığınız tarihten itibaren 14 gün içerisinde orijinal kutusu ve faturasıyla birlikte koşulsuz iade edebilirsiniz.',
    },
    {
      q: 'Vade farksız taksit imkanı hangi kartlarda geçerlidir?',
      a: 'Tüm amiral gemisi ürünlerimizde Bonus, Maximum, World, Axess ve Paraf kredi kartlarına vade farksız 3 taksit seçeneği sunulmaktadır.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative py-12 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-500">
            Bizimle İletişime Geçin
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Yardımcı Olmaktan Mutluluk Duyarız
          </h1>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Siparişleriniz, teknik donanım sorularınız veya kurumsal işbirlikleri için uzman ekibimize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {info.title}
                  </h3>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white">
                    {info.desc}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {info.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Form & Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                Bize Mesaj Gönderin
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                Formu doldurduktan sonra müşteri temsilcimiz en kısa sürede sizinle irtibata geçecektir.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Mesajınız Başarıyla İletildi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Talebiniz destek sistemimize kaydedildi. Uzman ekibimiz 2 saat içinde geri dönüş sağlayacaktır.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Sipariş ve Kargo Takibi',
                        message: '',
                      });
                    }}
                    className="mt-4 text-xs font-bold text-sky-500 hover:underline"
                  >
                    Yeni Bir Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        Adınız Soyadınız *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        E-Posta Adresiniz *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        placeholder="Örn: ahmet@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        Telefon Numaranız
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        placeholder="Örn: 0532 123 45 67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        Konu
                      </label>
                      <select
                        id="subject-select"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                      >
                        <option>Sipariş ve Kargo Takibi</option>
                        <option>Teknik Donanım Danışmanlığı</option>
                        <option>İade ve Değişim Talebi</option>
                        <option>Kurumsal Toplu Alım & İhale</option>
                        <option>Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={5}
                      placeholder="Talebinizi veya sorunuzu detaylıca belirtin..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-500/20 transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Mesajı Gönder
                  </button>
                </form>
              )}
            </div>

            {/* Side FAQs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-sky-500" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Sıkça Sorulan Sorular
                  </h3>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-white cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            openFaq === idx ? 'rotate-180 text-sky-500' : ''
                          }`}
                        />
                      </button>
                      {openFaq === idx && (
                        <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
