const mongoose = require('mongoose')





const schema = new mongoose.Schema({
  item_name : {
    type: String,
    required: true
},
  quantity : {
    type: Number,
    required: true
},
  item_price : {
    type: Number,
    required: true
},
  shop : {
    type: String,
    required: true
},
})


module.exports = mongoose.model('items', schema);
