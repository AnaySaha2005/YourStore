const mongoose=require('mongoose');
const ItemSchema=mongoose.Schema({
    item:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Retailer",
        required:true
    }
})
const Item=mongoose.model("Item",ItemSchema)
module.exports=Item;