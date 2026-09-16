require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('./seedData');

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techcorp';

  try {
    console.log(`[Seed] MongoDB bağlantısı kuruluyor: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('[Seed] Veritabanı bağlantısı başarılı.');

    console.log('[Seed] Mevcut ürünler temizleniyor...');
    await Product.deleteMany({});

    console.log(`[Seed] ${products.length} adet demo teknoloji ürünü aktarılıyor...`);
    const inserted = await Product.insertMany(products);

    console.log(`[Seed] Başarılı! Toplam ${inserted.length} ürün veritabanına eklendi.`);
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Hatası]: ${error.message}`);
    console.log('[Seed] Not: Yerel MongoDB çalışmıyorsa backend otomatik olarak bellek içi seed verisini kullanacaktır.');
    process.exit(0);
  }
};

seedDatabase();
