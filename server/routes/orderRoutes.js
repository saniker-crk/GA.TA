const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Routes for creating an order and fetching all orders (Admin only)
router
  .route('/')
  .post(orderController.createOrder) // Create an order
  .get(authController.restrictTo('admin'), orderController.getAllOrders); // Admin: Get all orders

// Route for fetching logged-in user's orders
router.route('/myorders').get(orderController.getMyOrders);

// Routes for specific order actions
router
  .route('/:id')
  .get(orderController.getOrderById) // Get an order by ID
router
.route('/:id/pay')
//.put(authController.protect, orderController.updateOrderToPaid);
.put(orderController.updateOrderToPaid); // Mark an order as paid

router
  .route('/:id/deliver')
  .put(authController.restrictTo('admin'), orderController.updateOrderToDelivered); // Mark an order as delivered

module.exports = router;
