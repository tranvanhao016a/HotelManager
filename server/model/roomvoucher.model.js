const { Decimal128 } = require("mongodb");
const mongoose=require("mongoose");
const roomvoucherSchema=new  mongoose.Schema({
    idRoomVoucher : {type:String},
    staff : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Staff"
    } ,
    room : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    } ,
    customer : {       
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    bookingDate : {type:Date} ,
    payDay : {type:Date} ,
    numCus : {type:Number}  ,
    services: [
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service"
        },
    ] ,
    total: {type:Decimal128}
})

const RoomVoucher=mongoose.model("RoomVoucher",roomvoucherSchema)
module.exports=RoomVoucher;