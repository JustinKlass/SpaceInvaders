const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose =  require('mongoose');
const methodOverride = require('method-override');
const scoresController = require('./controllers/scores.js');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/basiccrud'


// MIDDLEWARE
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/', scoresController);

// DB SETUP
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


app.listen(port, () => {
    console.log('Shaun is a big smelly willy');
});