const express = require('express');
const app = express();
const port = 5500;
const mongoose =  require('mongoose');
const methodOverride = require('method-override');
// const productsController = require('./controllers/products.js');


// MIDDLEWARE
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
// app.use('/products', productsController);

// DB SETUP
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


app.listen(port, () => {
    console.log('Shaun is a big smelly willy');
});