const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const scoreSchema = new Schema(
    {
    name: {type: String, maxlength: 3},
    score: {type: Number}
  },
   {timestamps: true}
   );

const scores = mongoose.model('score', scoreSchema);

//make this exportable to be accessed in `app.js`
module.exports = scores;