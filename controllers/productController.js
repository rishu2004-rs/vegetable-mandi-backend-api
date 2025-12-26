const Product = require('../models/product');

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Create product ✅ FIXED
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, unit, stock } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      unit,
      stock,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    res.status(201).json({
      message: "Product created",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product ✅ FIXED
exports.updateProduct = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
