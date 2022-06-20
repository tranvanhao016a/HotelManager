const mongoose=require("mongoose");
// const Account= require("./account.model");
const staffSchema=new  mongoose.Schema({
    idStaff:{
        type:String,
        // required:true
    },
    //thể loại sách{
    //   type:[String ] //array kí tự
    //}
    nameStaff:{type:String},
    position:{type:String},
    phoneStaff:{type:String},
    sexStaff:{type:String},
    email:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
        },
    roomVoucher :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RoomVoucher"
    },]
})
let Staff =mongoose.model("Staff",staffSchema)
module.exports=Staff;