//const fs = require('fs');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handlerFactory');



exports.getAllProducts = factory.getAll(Product);  
exports.getProduct = factory.getOne(Product, {path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);


exports.getProductStats = catchAsync(async (req, res, next) => {
    
    const stats = await Product.aggregate([
        {
            $match: {  ratingsAverage: {$gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty'},
                num: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
                
            }
        },
        {
            $sort: { avgPrice: 1 }
            
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

