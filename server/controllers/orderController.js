const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = catchAsync(async (req, res, next) => {
  // attach the user from the protect middleware
  req.body.user = req.user._id;

  const newOrder = await Order.create(req.body)

  await Promise.all(
    newOrder.orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(`Δεν βρέθηκε το προϊόν με id: ${item.product}`, 404);
      }

      
      if (product.countInStock < item.qty) {
        throw new AppError(
          `Δεν υπάρχει αρκετό απόθεμα για το προϊόν: ${product.name}`,
          400
        );
      }

      product.countInStock -= item.qty;
      // console.log(
      //   `Προϊόν: ${product.name}, νέο stock: ${product.countInStock}`
      // );
      await product.save();
    })
  );

  res.status(201).json({
    status: 'success',
    data: newOrder
  });
});


// @desc    Get all orders (Admin only)
// @route   GET /api/v1//orders
// @access  Private/Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email');
  
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      data: orders
    }
  });
});


// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = factory.getOne(Order, { 
  path: 'user', 
  select: 'name email' 
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});



// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  // Παράδειγμα ενοποίησης
res.status(200).json({
  status: 'success',
  results: orders.length,
  data: {
    data: orders
  }
});

  });

