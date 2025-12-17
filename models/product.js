const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },  // Leafy, Root, Herbs...
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  stock: { type: Number, default: 0 },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
