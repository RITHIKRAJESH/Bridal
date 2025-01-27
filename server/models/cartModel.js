const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user_tbls"},
    items:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"bridal_tbls"},
            quantity:{type:Number },
            size:{type:String}
        }
    ]
},{timestamps:true})

const cartModel=new mongoose.model('cart_tbl',cartSchema)

module.exports=cartModel