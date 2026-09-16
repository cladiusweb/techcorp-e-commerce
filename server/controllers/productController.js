const Product = require('../models/Product');
const seedProducts = require('../seeds/seedData');
const { isConnected } = require('../config/db');

// In-memory products store for offline/standalone mode
let localProducts = [...seedProducts];

// @desc    Get all products with category filter, search, and sort
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search, sort, featured, limit } = req.query;

    if (isConnected()) {
      let query = {};

      if (category && category !== 'all') {
        query.category = category.toLowerCase();
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      let mongooseQuery = Product.find(query);

      if (sort === 'price-asc') {
        mongooseQuery = mongooseQuery.sort({ price: 1 });
      } else if (sort === 'price-desc') {
        mongooseQuery = mongooseQuery.sort({ price: -1 });
      } else if (sort === 'rating') {
        mongooseQuery = mongooseQuery.sort({ rating: -1 });
      } else {
        mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
      }

      if (limit) {
        mongooseQuery = mongooseQuery.limit(Number(limit));
      }

      const products = await mongooseQuery.exec();
      return res.status(200).json({
        success: true,
        count: products.length,
        source: 'mongodb',
        data: products,
      });
    }

    // In-memory fallback
    let results = [...localProducts];

    if (category && category !== 'all') {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (featured === 'true') {
      results = results.filter((p) => p.isFeatured);
    }

    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
      );
    }

    if (sort === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    if (limit) {
      results = results.slice(0, Number(limit));
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      source: 'memory',
      data: results,
    });
  } catch (error) {
    console.error('getProducts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ürünler getirilirken bir sunucu hatası oluştu',
      error: error.message,
    });
  }
};

// @desc    Get single product by ID or slug
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnected()) {
      let product;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      if (!product) {
        product = await Product.findOne({ slug: id });
      }

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Ürün bulunamadı',
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    }

    // In-memory fallback
    const product = localProducts.find((p) => p._id === id || p.slug === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('getProductById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ürün detayı getirilirken hata oluştu',
      error: error.message,
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
const getFeaturedProducts = async (req, res) => {
  try {
    if (isConnected()) {
      const products = await Product.find({ isFeatured: true }).limit(6);
      return res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    }

    const products = localProducts.filter((p) => p.isFeatured).slice(0, 6);
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get categories summary
// @route   GET /api/products/categories
const getCategories = async (req, res) => {
  try {
    const categories = [
      {
        id: 'smartphones',
        name: 'Akıllı Telefonlar',
        description: 'Pro kameralar, yapay zeka çipleri ve titanyum gövdeler',
        icon: 'Smartphone',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
        count: 3
      },
      {
        id: 'laptops',
        name: 'Dizüstü Bilgisayarlar',
        description: 'M3 Max, OLED ekranlar ve sınır tanımayan güç',
        icon: 'Laptop',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
        count: 3
      },
      {
        id: 'smartwatches',
        name: 'Akıllı Saatler',
        description: 'Titanyum zırh, GPS ve gelişmiş sağlık takibi',
        icon: 'Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        count: 3
      },
      {
        id: 'accessories',
        name: 'Aksesuarlar',
        description: 'Uzamsal ses kulaklıkları ve MagSafe istasyonları',
        icon: 'Headphones',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
        count: 3
      }
    ];

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getCategories,
};
