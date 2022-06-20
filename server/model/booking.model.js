const mongoose=require("mongoose");

const bookingSchema=new  mongoose.Schema({
    idBooking:{type:String},
    name :{ type:String},
    phone :{type:String},
    adults: {type:Number},
    children: {type:Number},
    CheckinDate: {type:Date},
    CheckoutDate: {type:Date},
    idRoom: {type:String},
    KindRoom: {type:String},
    status:{type:String}
})
//moment(new Date()).format("DD/MM/YYYY")
const Booking=mongoose.model("Booking",bookingSchema)

module.exports=Booking;