const Product = require('../models/product');

// Get all
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get one
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Create
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, unit, stock } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      unit,
      stock,
      image: req.file ? req.file.filename : null
    });

    res.json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.filename;

    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json({ message: "Product Updated", product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};
