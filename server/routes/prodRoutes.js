//2) Routes Handles
const express = require('express');
const prodController = require('../controllers/prodController');
//const {getAllTours...} = require('./../controllers/tourController');
const authController =require('./../controllers/authController');
//const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router(); //middleware


router.use('/:productId/reviews', reviewRouter);

router.route('/product-stats').get(prodController.getProductStats);
// router.route('/monthly-plan/:year').get(prodController.getMonthlyPlan);

router
    .route('/')
    .get(prodController.getAllProducts)
    .post(
        authController.protect, 
        authController.restrictTo('admin', 'moderator'),
        prodController.createProduct
    );

router
    .route('/:id')
    .get(prodController.getProduct)
    .patch(
        authController.protect,
        authController.restrictTo('admin', 'moderator'),
        prodController.updateProduct,
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'moderator'),
        prodController.deleteProduct
      );


    
module.exports = router;    