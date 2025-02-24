const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


const productSchema = new mongoose.Schema({ //pass scema as an object
    name: {
        type: String,
        required: [true, 'A product must have a name'],
       unique: true,
        trim: true,
        maxlength: [40, 'A product name must have less or equal than 40 characters'],
        minlength: [4, 'A product name must have more or equal than 4 characters'],
        //validate: [validator.isAlphanumeric, 'Product name only contain caracters and numbers']
    },
    slug: String,
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    ratingsAverage: {
            type: Number,
            default:4.5,
            min: [1, 'Rating must be between 1.0 and 5 stars'],
            max: [5, 'Rating must be between 1.0 and 5.00 stars'],
            set: val => Math.round(val * 10) / 10
    },
    summary: {
        type: String,
        //required: [true, 'A product must have a description']
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        //required:[true, 'A product must have cover image']
    },
    images: [String],
    brand: {
        type: String,
        default: ''
    },
    countInStock: {
        type: Number,
        required: [true, ' A product must have quantity'],
        min: 0,
        max: 255
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    price:  {
            type: Number,
            required: [true, 'A product must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val) {
                // this only points to current doc on New document creation
                return val < this.price; //100 < 200
            },
            message: 'Discount price ({VALUE}) should be below the regular price'
        }
    },
    secretProduct: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number
    },
    cat: {
        type: String,
        enum: [ 'all','headphone', 'laptop', 'watch', 'speaker', ],
    },
    type: {
        type: String,
        enum: [ 'all','new', 'featured', 'top'],
    }
   }, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
    
});


productSchema.index({price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });


// Virtual populate 
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});

// Domcument Middlewear: runs before .save() and .create() 
productSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
});



// Query Middleware
// productSchema.pre('find', function(next) {
productSchema.pre(/^find/, function(next) {
    this.find({ secretProduct: { $ne: true}});

    this.start = Date.now();
    next();
});



// productSchema.post(/^find/, function(docs, next) {
//     console.log(`Query took ${Date.now() - this.start}  milliseconds ! `);
//     console.log(docs);
//     next();
// });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;