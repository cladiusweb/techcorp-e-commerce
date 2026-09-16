const Cart = require('../models/Cart');
const Product = require('../models/Product');
const seedProducts = require('../seeds/seedData');
const { isConnected } = require('../config/db');

// In-memory cart store for session/offline mode
let localCartItems = [];

// Helper to calculate totals
const calculateTotals = (items) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, totalAmount };
};

// @desc    Get user cart
// @route   GET /api/cart
const getCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';

    if (isConnected()) {
      let cart = await Cart.findOne({ sessionId }).populate('items.product');
      if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
      }

      const formattedItems = cart.items.map((item) => ({
        id: item._id,
        productId: item.product ? item.product._id : null,
        product: item.product,
        name: item.product ? item.product.name : 'Ürün',
        price: item.price,
        image: item.product ? item.product.image : '',
        quantity: item.quantity,
      }));

      const { itemCount, totalAmount } = calculateTotals(formattedItems);

      return res.status(200).json({
        success: true,
        data: {
          items: formattedItems,
          itemCount,
          totalAmount,
        },
      });
    }

    // In-memory fallback
    const { itemCount, totalAmount } = calculateTotals(localCartItems);
    return res.status(200).json({
      success: true,
      data: {
        items: localCartItems,
        itemCount,
        totalAmount,
      },
    });
  } catch (error) {
    console.error('getCart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sepet bilgisi alınırken hata oluştu',
      error: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
const addToCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'productId parametresi zorunludur',
      });
    }

    const qty = parseInt(quantity, 10) || 1;

    if (isConnected()) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Ürün bulunamadı',
        });
      }

      let cart = await Cart.findOne({ sessionId });
      if (!cart) {
        cart = new Cart({ sessionId, items: [] });
      }

      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += qty;
      } else {
        cart.items.push({
          product: productId,
          quantity: qty,
          price: product.price,
        });
      }

      await cart.save();
      await cart.populate('items.product');

      const formattedItems = cart.items.map((item) => ({
        id: item._id,
        productId: item.product._id,
        product: item.product,
        name: item.product.name,
        price: item.price,
        image: item.product.image,
        quantity: item.quantity,
      }));

      const { itemCount, totalAmount } = calculateTotals(formattedItems);

      return res.status(200).json({
        success: true,
        message: `${product.name} sepete eklendi`,
        data: {
          items: formattedItems,
          itemCount,
          totalAmount,
        },
      });
    }

    // In-memory fallback
    const product = seedProducts.find((p) => p._id === productId || p.slug === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı',
      });
    }

    const existingIndex = localCartItems.findIndex((item) => item.productId === productId);

    if (existingIndex > -1) {
      localCartItems[existingIndex].quantity += qty;
    } else {
      localCartItems.push({
        id: `item-${Date.now()}`,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: qty,
      });
    }

    const { itemCount, totalAmount } = calculateTotals(localCartItems);

    return res.status(200).json({
      success: true,
      message: `${product.name} sepete eklendi`,
      data: {
        items: localCartItems,
        itemCount,
        totalAmount,
      },
    });
  } catch (error) {
    console.error('addToCart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sepete ekleme sırasında hata oluştu',
      error: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
const updateCartItem = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = parseInt(quantity, 10);

    if (isConnected()) {
      let cart = await Cart.findOne({ sessionId });
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Sepet bulunamadı' });
      }

      if (qty <= 0) {
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      } else {
        const item = cart.items.find((item) => item.product.toString() === productId);
        if (item) {
          item.quantity = qty;
        }
      }

      await cart.save();
      await cart.populate('items.product');

      const formattedItems = cart.items.map((item) => ({
        id: item._id,
        productId: item.product ? item.product._id : null,
        product: item.product,
        name: item.product ? item.product.name : '',
        price: item.price,
        image: item.product ? item.product.image : '',
        quantity: item.quantity,
      }));

      const { itemCount, totalAmount } = calculateTotals(formattedItems);

      return res.status(200).json({
        success: true,
        data: {
          items: formattedItems,
          itemCount,
          totalAmount,
        },
      });
    }

    // In-memory fallback
    if (qty <= 0) {
      localCartItems = localCartItems.filter(
        (item) => item.productId !== productId && item.id !== productId
      );
    } else {
      const item = localCartItems.find(
        (item) => item.productId === productId || item.id === productId
      );
      if (item) {
        item.quantity = qty;
      }
    }

    const { itemCount, totalAmount } = calculateTotals(localCartItems);

    return res.status(200).json({
      success: true,
      data: {
        items: localCartItems,
        itemCount,
        totalAmount,
      },
    });
  } catch (error) {
    console.error('updateCartItem error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sepet güncellenirken hata oluştu',
      error: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';
    const { productId } = req.params;

    if (isConnected()) {
      let cart = await Cart.findOne({ sessionId });
      if (cart) {
        cart.items = cart.items.filter(
          (item) => item.product.toString() !== productId && item._id.toString() !== productId
        );
        await cart.save();
      }

      const formattedItems = cart
        ? cart.items.map((item) => ({
            id: item._id,
            productId: item.product,
            price: item.price,
            quantity: item.quantity,
          }))
        : [];

      const { itemCount, totalAmount } = calculateTotals(formattedItems);

      return res.status(200).json({
        success: true,
        message: 'Ürün sepetten kaldırıldı',
        data: {
          items: formattedItems,
          itemCount,
          totalAmount,
        },
      });
    }

    // In-memory fallback
    localCartItems = localCartItems.filter(
      (item) => item.productId !== productId && item.id !== productId
    );

    const { itemCount, totalAmount } = calculateTotals(localCartItems);

    return res.status(200).json({
      success: true,
      message: 'Ürün sepetten kaldırıldı',
      data: {
        items: localCartItems,
        itemCount,
        totalAmount,
      },
    });
  } catch (error) {
    console.error('removeFromCart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ürün silinirken hata oluştu',
      error: error.message,
    });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';

    if (isConnected()) {
      let cart = await Cart.findOne({ sessionId });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
    }

    localCartItems = [];

    return res.status(200).json({
      success: true,
      message: 'Sepet temizlendi',
      data: {
        items: [],
        itemCount: 0,
        totalAmount: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
