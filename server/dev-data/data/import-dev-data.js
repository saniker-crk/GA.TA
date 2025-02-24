const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour =require('./../../models/productModel');
const Product = require('./../../models/productModel');

dotenv.config({path: './config.env'});  

const DB = process.env.DATABASE.replace(    
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

dbConnect().catch(err => console.log(err));
   
async function dbConnect() {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
   useFindAndModify: false
})
.then(() => console.log('DB connection successful'));
}
// read Json file
const products = JSON.parse(
    fs.readFileSync(`${__dirname}/products.json`, 'utf8')
);

// import data into db
const importData = async () => {
    try {
        await Product.create(products);
        console.log('Data successfully loaded !');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// Delete all data from collection 
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data successfully deleted !');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] == '--import') {
    importData();
} else if (process.argv[2] == '--delete') {
    deleteData();
}