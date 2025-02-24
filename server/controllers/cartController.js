const paypal = require('stripe')(process.env.PAYPAL_CLIENT_ID);
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handlerFactory');



exports.getCheckoutSession = catchAsync(async (req,res,next) => {
    // 1) Get the currently booked products
    const product = await Product.findById(req.params.productId);

    // 2) Create checkout session
    const session = await paypal.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}`,
        cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.productId,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: product.price * 100,
              product_data: {
                name: `${product.name} Product`,
                description: product.summary,
                //images: [`/${product.imageCover}`],
              },
            },
          },
        ],
        mode: 'payment',
      });
     
      //3- Send to client
      res.status(200).json({
        status: 'success',
        session,
      });

});