require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id'],
  })
);
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Techcorp E-Commerce API',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Sunucu hatası',
    error: err.message,
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Techcorp Server] Sunucu http://localhost:${PORT} üzerinde çalışıyor.`);
  });
};

startServer();
