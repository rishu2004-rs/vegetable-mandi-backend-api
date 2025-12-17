const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
