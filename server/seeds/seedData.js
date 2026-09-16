const products = [
  {
    _id: '66e864c201a0a101b1000001',
    name: 'iPhone 16 Pro Max',
    slug: 'iphone-16-pro-max',
    category: 'smartphones',
    price: 84999,
    originalPrice: 89999,
    rating: 4.9,
    reviewCount: 238,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Titanyum zarafeti ve A18 Pro çipin sınırsız gücü. 6.9 inç Super Retina XDR ekran, ProMotion teknolojisi ve 48 MP Fusion kamera ile sinematik video deneyimi.',
    features: [
      '5. Derece Titanyum Tasarım ve İnce Çerçeveler',
      'A18 Pro Çip: Donanım Hızlandırmalı Işın İzleme',
      '48 MP Fusion Kamera ve 5x Telefoto Zoom',
      'Kamera Denetimi Butonu ile Anında Yakalama',
      'Tüm Gün Süren Efsanevi Pil Ömrü'
    ],
    specs: {
      'Ekran': '6.9 inç Super Retina XDR OLED (120Hz ProMotion)',
      'İşlemci': 'Apple A18 Pro (3nm)',
      'Bellek / Depolama': '8 GB RAM / 256 GB NVMe',
      'Arka Kamera': '48 MP Fusion + 48 MP Ultra Geniş + 12 MP 5x Telefoto',
      'Ön Kamera': '12 MP TrueDepth',
      'Batarya': '4.685 mAh, 30W Hızlı Şarj & 25W MagSafe',
      'Ağırlık': '227 gram'
    },
    isFeatured: true,
    isNewProduct: true,
    tag: 'Çok Satan'
  },
  {
    _id: '66e864c201a0a101b1000002',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'smartphones',
    price: 74999,
    originalPrice: 79999,
    rating: 4.8,
    reviewCount: 184,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Galaxy AI çağı başladı. Titanyum gövde, yerleşik S-Pen kalemi ve 200 MP çözünürlüklü sensörü ile mobil fotoğrafçılıkta yeni bir zirve.',
    features: [
      'Galaxy AI: Anında Canlı Çeviri ve Circle to Search',
      'Titanyum Çerçeve ve Corning Gorilla Armor Yansıma Önleyici Cam',
      '200 MP Ultra Çözünürlüklü Ana Sensör',
      'Gömülü S-Pen ile Kusursuz Not Alma ve Çizim',
      'Snapdragon 8 Gen 3 for Galaxy İşlemci'
    ],
    specs: {
      'Ekran': '6.8 inç Dinamik LTPO AMOLED 2X, 2600 nit',
      'İşlemci': 'Snapdragon 8 Gen 3 for Galaxy',
      'Bellek / Depolama': '12 GB RAM / 512 GB UFS 4.0',
      'Arka Kamera': '200 MP + 50 MP (5x) + 10 MP (3x) + 12 MP Geniş',
      'Batarya': '5.000 mAh, 45W Hızlı Şarj',
      'Ağırlık': '232 gram'
    },
    isFeatured: true,
    isNewProduct: false,
    tag: 'Galaxy AI'
  },
  {
    _id: '66e864c201a0a101b1000003',
    name: 'Google Pixel 9 Pro XL',
    slug: 'google-pixel-9-pro-xl',
    category: 'smartphones',
    price: 64999,
    originalPrice: 68999,
    rating: 4.7,
    reviewCount: 92,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Google yapay zekasının en saf hali. Tensor G4 yongası, Gemini Live entegrasyonu ve ödüllü kamera vizörü ile sınıfının en akıllı telefonu.',
    features: [
      'Google Tensor G4 İşlemci ve Titan M2 Güvenlik',
      'Gemini Live ile Gerçek Zamanlı Sesli Yapay Zeka Asistanı',
      'Super Res Zoom 30x ve Video Boost Teknolojisi',
      '7 Yıl Boyunca Garantili Android ve Güvenlik Güncellemeleri'
    ],
    specs: {
      'Ekran': '6.8 inç Super Actua OLED (1-120Hz), 3000 nit',
      'İşlemci': 'Google Tensor G4',
      'Bellek / Depolama': '16 GB RAM / 256 GB',
      'Arka Kamera': '50 MP Ana + 48 MP Ultra Geniş + 48 MP 5x Telefoto',
      'Batarya': '5.060 mAh, 37W Hızlı Şarj'
    },
    isFeatured: false,
    isNewProduct: true,
    tag: 'Yeni'
  },
  {
    _id: '66e864c201a0a101b1000004',
    name: 'MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3-max',
    category: 'laptops',
    price: 129999,
    originalPrice: 139999,
    rating: 5.0,
    reviewCount: 312,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Profesyoneller için sınırları aşan performans. 16 çekirdekli CPU, 40 çekirdekli GPU içeren M3 Max çip ve göz kamaştırıcı Liquid Retina XDR ekran.',
    features: [
      'Apple M3 Max Çip (16 CPU / 40 GPU)',
      '16.2 inç Liquid Retina XDR Ekran, 1600 nit tepe parlaklık',
      '36 GB Birleşik Bellek ve 1 TB Süper Hızlı SSD',
      '22 Saate Varan Eşsiz Pil Ömrü',
      'Stüdyo Kalitesinde Üçlü Mikrofon ve 6 Hoparlörlü Ses Sistemi'
    ],
    specs: {
      'Ekran': '16.2 inç Liquid Retina XDR (3456x2234), ProMotion 120Hz',
      'İşlemci': 'Apple M3 Max (16 Çekirdek)',
      'Grafik': '40 Çekirdekli Tümleşik GPU',
      'RAM': '36 GB Birleşik Bellek',
      'Depolama': '1 TB NVMe SSD',
      'Ağırlık': '2.16 kg',
      'Portlar': '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, 3.5mm Jack'
    },
    isFeatured: true,
    isNewProduct: false,
    tag: 'En İyisi'
  },
  {
    _id: '66e864c201a0a101b1000005',
    name: 'Dell XPS 16 (2024)',
    slug: 'dell-xps-16-2024',
    category: 'laptops',
    price: 98499,
    originalPrice: 104999,
    rating: 4.8,
    reviewCount: 76,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Fütüristik tasarım, kusursuz işçilik. CNC işlenmiş alüminyum gövde, görünmez dokunmatik touchpad ve 4K OLED InfinityEdge ekran.',
    features: [
      'Intel Core Ultra 9 185H İşlemci (AI Boost NPU)',
      'NVIDIA GeForce RTX 4070 8GB GDDR6 Grafik',
      '4K+ (3840x2400) OLED Dokunmatik Ekran',
      'Kapasitif Dokunmatik Fonksiyon Satırı ve Görünmez Cam Touchpad',
      '32 GB LPDDR5x RAM ve 1 TB PCIe 4.0 SSD'
    ],
    specs: {
      'Ekran': '16.3 inç 4K OLED Dokunmatik, %100 DCI-P3',
      'İşlemci': 'Intel Core Ultra 9 185H (16 Çekirdek)',
      'Grafik': 'NVIDIA GeForce RTX 4070 (60W)',
      'RAM': '32 GB LPDDR5x 7467 MHz',
      'Depolama': '1 TB M.2 NVMe SSD',
      'Ağırlık': '2.2 kg'
    },
    isFeatured: false,
    isNewProduct: true,
    tag: 'OLED Dokunmatik'
  },
  {
    _id: '66e864c201a0a101b1000006',
    name: 'ASUS ROG Zephyrus G16',
    slug: 'asus-rog-zephyrus-g16',
    category: 'laptops',
    price: 89999,
    originalPrice: 94999,
    rating: 4.9,
    reviewCount: 115,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra ince oyuncu ve içerik üretici canavarı. 240Hz ROG Nebula OLED ekran, Slash Aydınlatma arkalığı ve RTX 4080 gücü.',
    features: [
      '2.5K 240Hz 0.2ms ROG Nebula OLED Panel',
      'NVIDIA GeForce RTX 4080 12GB GDDR6',
      'AMD Ryzen 9 AI 370 İşlemci',
      'Sadece 1.49 cm Kalınlık ve 1.85 kg Ağırlık',
      'Sıvı Metal Soğutma ve 2. Nesil Arc Flow Fanlar'
    ],
    specs: {
      'Ekran': '16 inç OLED 2.5K (2560x1600), 240Hz, G-SYNC',
      'İşlemci': 'AMD Ryzen 9 AI HX 370',
      'Grafik': 'NVIDIA GeForce RTX 4080 (115W)',
      'RAM': '32 GB LPDDR5X',
      'Depolama': '2 TB PCIe 4.0 SSD',
      'Pil': '90Wh, 100W Type-C Şarj Destekli'
    },
    isFeatured: true,
    isNewProduct: true,
    tag: 'Gaming & Creator'
  },
  {
    _id: '66e864c201a0a101b1000007',
    name: 'Apple Watch Ultra 2',
    slug: 'apple-watch-ultra-2',
    category: 'smartwatches',
    price: 44999,
    originalPrice: 47999,
    rating: 4.9,
    reviewCount: 162,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'En zorlu maceralar ve ekstrem sporlar için tasarlandı. Havacılık sınıfı 49 mm titanyum kasa, 3000 nit ekran ve çift frekanslı hassas GPS.',
    features: [
      '49 mm Havacılık Standardında Titanyum Gövde',
      '3000 Nit Safir Kristal Ekran',
      'S9 SiP Çip ve Dokunmadan Çift Tıklama Hareketi',
      'Hassas Çift Frekanslı L1 ve L5 GPS',
      '72 Saate Varan Düşük Güç Modu Pil Ömrü'
    ],
    specs: {
      'Kasa': '49 mm Titanyum, 100m Su Geçirmezlik, Dalış Sertifikalı',
      'Ekran': 'Hassas Retina OLED, 3000 nit',
      'Pil Ömrü': 'Normal kullanımda 36 saat, Düşük Güç modunda 72 saat',
      'Sensörler': 'EKG, SpO2, Su Sıcaklığı, Derinlik Göstergesi, Pusula',
      'Ağırlık': '61.4 gram'
    },
    isFeatured: true,
    isNewProduct: false,
    tag: 'Ekstrem Dayanıklı'
  },
  {
    _id: '66e864c201a0a101b1000008',
    name: 'Samsung Galaxy Watch Ultra',
    slug: 'samsung-galaxy-watch-ultra',
    category: 'smartwatches',
    price: 32999,
    originalPrice: 35999,
    rating: 4.7,
    reviewCount: 88,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Yastık formunda titanyum çerçeve, 100 saatlik güç tasarrufu modu ve gelişmiş BioActive sensörü ile Galaxy serisinin en güçlü saati.',
    features: [
      '47 mm Titanyum 4. Sınıf Gövde',
      '10 ATM Suya ve 55°C Aşırı Sıcağa Dayanıklılık',
      'Çoklu Spor Takibi ve Hızlı Aksiyon Düğmesi',
      'Enerji Skoru ve Uyku Apnesi Analizi (AI Destekli)'
    ],
    specs: {
      'Kasa': '47 mm Titanyum, Safir Cam, IP68 / 10ATM',
      'İşlemci': 'Exynos W1000 (3nm, 5 Çekirdek)',
      'Ekran': '1.5 inç Süper AMOLED, 3000 nit',
      'Pil': '590 mAh, 100 saate kadar'
    },
    isFeatured: false,
    isNewProduct: true,
    tag: 'Yapay Zeka Sağlık'
  },
  {
    _id: '66e864c201a0a101b1000009',
    name: 'Garmin Epix Pro Gen 2 Sapphire',
    slug: 'garmin-epix-pro-gen-2',
    category: 'smartwatches',
    price: 38500,
    originalPrice: 41999,
    rating: 4.9,
    reviewCount: 64,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Her an hazır taktik ve outdoor spor saati. Çarpıcı AMOLED ekran, yerleşik LED el feneri ve 31 güne varan akıllı saat pil performansı.',
    features: [
      '51 mm Titanyum Bezel ve Çizilmez Safir Kristal Cam',
      'Dahili Çok Modlu Beyaz ve Kırmızı LED El Feneri',
      'Önceden Yüklenmiş TopoActive Haritalar',
      'Gelişmiş Tırmanış Puanı ve Dayanıklılık Puanı Metrikleri'
    ],
    specs: {
      'Kasa': '51mm Titanyum / Fiber Takviyeli Polimer',
      'Ekran': '1.4 inç AMOLED (454x454)',
      'Pil Ömrü': 'Akıllı Saat Modunda 31 Güne Kadar',
      'Su Geçirmezlik': '10 ATM (100 metre)'
    },
    isFeatured: false,
    isNewProduct: false,
    tag: 'Outdoor Pro'
  },
  {
    _id: '66e864c201a0a101b1000010',
    name: 'Sony WH-1000XM5 Kulaklık',
    slug: 'sony-wh-1000xm5',
    category: 'accessories',
    price: 14999,
    originalPrice: 16999,
    rating: 4.9,
    reviewCount: 420,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sessizliğin zirvesi. İki işlemci ve sekiz mikrofonla güçlendirilen sektör lideri aktif gürültü engelleme ve stüdyo kalitesinde Hi-Res Audio.',
    features: [
      'Entegre İşlemci V1 ve HD Gürültü Engelleme İşlemcisi QN1',
      '30 Saate Varan Pil Ömrü ve 3 Dakikalık Hızlı Şarjla 3 Saat Kullanım',
      'Ultra Konforlu Yumuşak Uyumlu Deri Tasarım',
      'Speak-to-Chat Akıllı Konuşma Algılama Modu',
      'Çok Noktalı Bağlantı (Aynı Anda 2 Cihaza Bağlanma)'
    ],
    specs: {
      'Sürücü': '30 mm Karbon Fiber Kompozit Kubbe',
      'Frekans Tepkisi': '4 Hz - 40.000 Hz',
      'Bağlantı': 'Bluetooth 5.2, LDAC, AAC, SBC, 3.5mm Aux',
      'Ağırlık': '250 gram'
    },
    isFeatured: true,
    isNewProduct: false,
    tag: 'ANC Lideri'
  },
  {
    _id: '66e864c201a0a101b1000011',
    name: 'Apple AirPods Max',
    slug: 'apple-airpods-max',
    category: 'accessories',
    price: 24999,
    originalPrice: 26999,
    rating: 4.8,
    reviewCount: 215,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Akustik mühendisliği ve birinci sınıf lüks tasarım. Eloksallı alüminyum kulaklık kapakları, nefes alabilen örgü taç ve dinamik kafa izleme.',
    features: [
      'Apple Tasarımı Dinamik Sürücü ile Yüksek Doğrulukta Ses',
      'Dinamik Kafa İzleme Özellikli Uzamsal Ses',
      'Hesaplamalı Ses Teknolojili Çift H1 Kulaklık Çipi',
      'Şeffaf Mod ve Profesyonel Düzeyde Aktif Gürültü Engelleme'
    ],
    specs: {
      'Sürücü': '40 mm Özel Apple Dinamik Sürücü',
      'Çip': 'Her Kulaklıkta Apple H1 Kulaklık Çipi',
      'Pil': 'ANC ve Uzamsal Ses Açıkken 20 Saate Kadar',
      'Ağırlık': '384.8 gram'
    },
    isFeatured: true,
    isNewProduct: false,
    tag: 'Premium Ses'
  },
  {
    _id: '66e864c201a0a101b1000012',
    name: 'Belkin BoostCharge Pro 3-in-1 MagSafe',
    slug: 'belkin-boostcharge-pro-3-in-1',
    category: 'accessories',
    price: 5499,
    originalPrice: 5999,
    rating: 4.8,
    reviewCount: 140,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'iPhone, Apple Watch ve AirPods cihazlarınızı aynı anda en yüksek hızda kablosuz şarj edin. Resmi MagSafe 15W sertifikalı minimalist şarj istasyonu.',
    features: [
      'Resmi Apple MagSafe 15W Hızlı Şarj Desteği',
      'Apple Watch Serisi İçin %33 Daha Hızlı Şarj Modülü',
      'Minimalist Paslanmaz Çelik Ağaç Mimarisi',
      'Yatay ve Dikey Görünüm Açısı (StandBy Modu Uyumlu)'
    ],
    specs: {
      'Toplam Çıkış': 'iPhone: 15W | Apple Watch: 5W | AirPods: 5W',
      'Malzeme': 'Paslanmaz Çelik ve Mat Silikon Taban',
      'Kutu İçeriği': '1.5m Entegre Güç Adaptörü Dahil'
    },
    isFeatured: false,
    isNewProduct: true,
    tag: '15W MagSafe'
  }
];

module.exports = products;
