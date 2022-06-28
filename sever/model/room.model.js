const mongoose=require("mongoose");

const roomSchema=new  mongoose.Schema({
    idRoom :{ type:String},
    kindRoom :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"KindRoom"
    },
    status :{type:String},
    roomVoucher :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RoomVoucher"
    },

})
const Room=mongoose.model("Room",roomSchema)

module.exports=Room;