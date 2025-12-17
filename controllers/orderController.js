const Order = require('../models/order');
const Product = require('../models/product');

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    let totalAmount = 0;

    for (let i of items) {
      const product = await Product.findById(i.product);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.stock < i.quantity) {
        return res.json({ message: `Not enough stock for ${product.name}` });
      }

      product.stock -= i.quantity;
      await product.save();

      totalAmount += product.price * i.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount
    });

    res.json({ message: "Order Created", order });

  } catch (error) {
    res.status(500).json({ error });
  }
};

// GET ALL ORDERS (ADMIN/VENDOR)
exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.json(orders);
};

// GET ONE ORDER
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user')
    .populate('items.product');

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json(order);
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({ message: "Order Updated", order });
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order Deleted" });
};
