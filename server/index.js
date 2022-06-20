const express =require("express");
const cors =require("cors");
const app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
const morgan=require("morgan");
const dotenv =require("dotenv");
const staffRouter= require("./routes/staff")
const accountRouter= require("./routes/account")
const serviceRouter= require("./routes/service")
const customerRouter= require("./routes/customer")
const kindroomRouter= require("./routes/kindroom")
const roomRouter= require("./routes/room")
const roomvoucherRouter= require("./routes/roomvoucher")
// const bookingRouter= require("./routes/booking")

//tao file .env 
//MONGODB_URL=mongodb+srv://user:password@cluster0.fidun.mongodb.net/Hotel?retryWrites=true&w=majority

dotenv.config();
mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("Connected to MongoDB");
})
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

app.use("/staff",staffRouter);
app.use("/account",accountRouter);
app.use("/service",serviceRouter);
app.use("/customer",customerRouter);
app.use("/kindroom",kindroomRouter);
app.use("/room",roomRouter);
app.use("/roomvoucher",roomvoucherRouter);
// app.use("/booking",bookingRouter);

app.listen(3000,()=>{
    console.log("Server is running...");
})