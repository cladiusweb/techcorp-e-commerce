const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      default: 'default-session',
      index: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

cartSchema.virtual('totalAmount').get(function () {
  return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

cartSchema.virtual('itemCount').get(function () {
  return this.items.reduce((acc, item) => acc + item.quantity, 0);
});

cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

module.exports = Cart;
