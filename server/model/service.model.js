const { Decimal128 } = require("mongodb");
const mongoose=require("mongoose");

const serviceSchema=new  mongoose.Schema({
    idService :{ type:String},
    nameService :{type:String},
    priceService : {type:Decimal128},
    roomVouchers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RoomVoucher"
        },
    ]
})

const Service=mongoose.model("Service",serviceSchema)
module.exports=Service;