const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, 
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
