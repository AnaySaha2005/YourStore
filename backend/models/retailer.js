const mongoose = require("mongoose");
const RetailerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  shopname: {
    type: String,
    required: true,
  },
  shoptype: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  itemList:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Item"
  }],
  description:{
    type:String,
  }
});
const Retailer = mongoose.model("Retailer", RetailerSchema);
module.exports = Retailer;
