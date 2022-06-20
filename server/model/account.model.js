const mongoose=require("mongoose");

const accountSchema=new  mongoose.Schema({
    user :{ type:String},
    password :{type:String},
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Staff"
        }
})

let Account =mongoose.model("Account",accountSchema)
module.exports=Account;