import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Cpu,
  Sparkles,
  Zap,
  Globe2,
  Award,
  Users,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Hakkımızda | Techcorp Premium Teknoloji',
  description:
    'Techcorp olarak vizyonumuz, dünyanın en gelişmiş amiral gemisi donanımlarını en üstün müşteri deneyimiyle kullanıcılarla buluşturmaktır.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Cpu,
      title: 'Mühendislik Tutkusu',
      desc: 'Her donanım parçası, inovasyon ve performans sınırlarını zorlayan birinci sınıf mühendislik standartlarına göre seçilir.',
    },
    {
      icon: ShieldCheck,
      title: 'Kusursuz Orijinallik',
      desc: 'Platformumuzdaki tüm cihazlar doğrudan resmi üretici ve distribütörlerden tedarik edilir, %100 orijinaldir.',
    },
    {
      icon: Zap,
      title: 'Hızlı ve Güvenilir Teslimat',
      desc: 'Gelişmiş lojistik merkezimiz sayesinde siparişleriniz aynı gün özenle paketlenir ve güvenle adresinize ulaştırılır.',
    },
    {
      icon: Award,
      title: 'Uzman Teknik Destek',
      desc: 'Yalnızca satış yapmıyor, donanım uzmanlarımızla satın alma sonrasında da 7/24 yanınızda yer alıyoruz.',
    },
  ];

  const stats = [
    { value: '150.000+', label: 'Mutlu Müşteri' },
    { value: '%99.6', label: 'Memnuniyet Oranı' },
    { value: '12+', label: 'Amiral Gemisi Model' },
    { value: '2 Yıl', label: 'Resmi Distribütör Garantisi' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Biz Kimiz?
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Geleceğin Teknolojisini{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Bugünden İnşa Ediyoruz
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Techcorp, dijital çağın en güçlü işlemcilerini, titanyum zarafetini ve yüksek çözünürlüklü akustik mühendisliğini tek bir çatı altında sunan premium teknoloji platformudur.
          </p>
        </div>
      </section>

      {/* Narrative & Image Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-500">
                Mükemmeliyet Standardı
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Teknolojiye Tutkuyla Bağlı Bir Ekosistem
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                2024 yılında temelleri atılan Techcorp, sıradan bir e-ticaret sitesi olmanın ötesinde, kullanıcılarına sadece en iyi donanımları seçip sunan bir küratörlük anlayışına sahiptir.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Satışa sunduğumuz her akıllı telefon, dizüstü bilgisayar, akıllı saat ve ses ekipmanı; dayanıklılık, işlem performansı ve estetik açıdan en yüksek kriterleri karşılamak zorundadır.
              </p>

              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-sky-600 dark:bg-slate-800 dark:hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md group"
                >
                  Kataloğu Keşfedin
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 aspect-video sm:aspect-4/3 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                alt="Techcorp Donanım Laboratuvarı"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    Kalite Güvencesi
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    Her Cihaz Resmi Distribütör Onaylı
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="p-4">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-500">
              Temel Değerlerimiz
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Techcorp'u Farklı Kılan İlkeler
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
