const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ürün adı zorunludur'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Kategori zorunludur'],
      enum: ['smartphones', 'laptops', 'smartwatches', 'accessories'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Fiyat zorunludur'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 20,
    },
    image: {
      type: String,
      required: [true, 'Ana görsel URL zorunludur'],
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Açıklama zorunludur'],
    },
    features: {
      type: [String],
      default: [],
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for formatted price or discount calculation
productSchema.virtual('discountRate').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
