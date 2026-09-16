const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techcorp';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if MongoDB is not running locally
    });
    isConnected = true;
    console.log(`[MongoDB] Bağlantı başarılı: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Yerel MongoDB bağlantısı kurulamadı (${error.message}).`);
    console.log(`[Database] Bellek içi / Mock Veri Motoru devreye alındı. Uygulama kesintisiz çalışıyor.`);
    isConnected = false;
    return false;
  }
};

module.exports = { connectDB, isConnected: () => isConnected };
