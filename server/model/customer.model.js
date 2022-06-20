const mongoose=require("mongoose");

const customerSchema=new  mongoose.Schema({
    idCard :{ type:String},
    nameCus :{type:String},
    phoneCus :{type:String},
    sexCus :{type:String},
    roomVouchers:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"RoomVoucher"},
    ]
})
const Customer=mongoose.model("Customer",customerSchema)

module.exports=Customer;