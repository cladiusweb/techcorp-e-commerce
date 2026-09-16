import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Techcorp | Premium Teknoloji & Elektronik Mağazası',
  description:
    'En yeni akıllı telefonlar, dizüstü bilgisayarlar, akıllı saatler ve aksesuarlar. Yüksek mühendislik ve premium teknoloji Techcorp güvencesiyle.',
  keywords: [
    'Techcorp',
    'teknoloji',
    'akıllı telefon',
    'iPhone 16 Pro',
    'MacBook Pro',
    'akıllı saat',
    'kulaklık',
    'laptop',
  ],
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-300 antialiased`}
      >
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-16 sm:pt-20">{children}</main>
            <Footer />
            <Toast />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
