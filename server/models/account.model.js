const mongoose=require("mongoose");
const { timeStamp } = require("console");
const accountSchema=new  mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlength:5,
        maxlength:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        minlength:10,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    admin:{
        type:Boolean,
        default:false,
    },
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Staff"
        }
},{timestamps:true}
)

let Account =mongoose.model("Account",accountSchema)
module.exports=Account;