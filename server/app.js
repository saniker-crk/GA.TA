const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const prodRouter = require(`./routes/prodRoutes`);
const userRouter = require(`./routes/userRoutes`);
const reviewRouter = require('./routes/reviewRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const uploadRouter = require('./routes/uploadRoutes');

   
const app = express();

app.set('trust proxy', true); // 1 ή true

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// Allow requests from your frontend origin
//app.use(cors({ origin: 'http://localhost:3000' }));
// 1) Global  Midlewares

// Serving static files
 //app.use(express.static(`${__dirname}/public`));
//app.use(express.static(path.join(__dirname, 'public')));

// Εξυπηρέτηση στατικών αρχείων από τον φάκελο εικόνων
app.use('/img/products', express.static(path.join(__dirname, '../img/products')));
// Παράδειγμα: αν οι εικόνες βρίσκονται στο "server/public/img/products"
//app.use('/img/products', express.static(path.join(__dirname, 'public', 'img', 'products')));


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",    // ή nonce/hash αντί για αυτό
            "https://www.paypal.com",
            "https://www.sandbox.paypal.com"
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",    // πολλές φορές χρειάζεται το unsafe-inline για style
            "https://maxst.icons8.com", // επιτρέπεις CSS από icons8
          ],
          imgSrc: [
            "'self'",
            "data:",
            "https://www.paypalobjects.com",
            "https://www.paypal.com"
          ],
          frameSrc: [
            "'self'",
            "https://www.paypal.com",
            "https://www.sandbox.paypal.com"
          ],
          connectSrc: [
            "'self'",
            "https://www.paypal.com",
            "https://www.sandbox.paypal.com",
            "https://www.paypalobjects.com"
          ]
        },
      },
    })
  );
  


// Development logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.get('/', (req, res) => {
      res.status(200).send('Hello from the server!');
    });
}



// What max request from the same IP in 1 hour
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour !'
});
app.use('/api',limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// DAta sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'ratingsQuantity',
        'ratingsAverage',
        'price',
        'countInStock'
    ]
}));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
    req.requestTime =new Date().toISOString();
    // console.log(req.headers);
    next();
});


// 2) Routes Handles
//app.get('/api/v1/products', getAllProduct);
// app.get(`/api/v1/products`, getAllProduct);
// app.get('/api/v1/products/:id', getProduct);
// app.post('/api/v1/products', createProduct);
// app.patch('/api/v1/products/:id', updateProduct);
// app.delete('/api/v1/products/:id', deleteProduct);

// 3) Routes
// app.get('/', (req, res) => {
//     res.status(200).render('base');
// });
// app.get('/', (req, res) => {
//     res.status(200).send('Hello from the server!');
//   });


// ...






app.use('/api/v1/products', prodRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/upload', uploadRouter);

app.get('/api/v1/config/paypal', (req, res) => res.send({ clientId:
    process.env.PAYPAL_CLIENT_ID 
}));


// production logging
if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,  '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
      });
}

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);


// 4) Start Server
module.exports = app;