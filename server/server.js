const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err=> {
  console.log('Uncaught Exception ! ** Shutting down.. **');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({path: './config.env'})
const app = require('./app');





// console.log(app.get('env'));  //development
// console.log(process.env);  


const DB = process.env.DATABASE.replace(    
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


dbConnect().catch(err => console.log(err));
   
async function dbConnect() {
  await mongoose.connect(DB, {
// useNewUrlParser: true,
    // useCreateIndex: true,
//useUnifiedTopology: true, 
    //useFindAndModify: false
})
.then(() => console.log('DB connection successful'));
}
   
// mongoose.connect(DB).then(console.log('DB connection successfull!'));


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
console.log(`App running port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection ** Shutting down..');
  server.close(() => {
    process.exit(1);
  });
});





// Testing
//  const testProduct =new Product({
//      name: 'pc1',
//      price: 999    
//  });

//  testProduct.save().then(doc => {
//      console.log(doc);
//  }).catch(err => {
//      console.log('!! ERROR !!:', err)

//  });



