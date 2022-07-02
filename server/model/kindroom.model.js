const { Decimal128 } = require("mongodb");
const mongoose=require("mongoose");

const kindroomSchema=new  mongoose.Schema({
    idKindRoom :{type:String},
    nameKindRoom :{type:String},
    cusMax : {type:Number},
    priceRoom:{type:Number},
    image:{type:String},
    rooms : [
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Room"},
    ]
})
let KindRoom=mongoose.model("KindRoom",kindroomSchema)

module.exports=KindRoom;