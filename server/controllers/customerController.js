const Customer= require("../models/customer.model");
const RoomVoucher=require("../models/roomvoucher.model")

const customerController={
    getAllCustomer: async(req,res)=>{
        try{
            const customer=await Customer.find().populate("roomVouchers");
            res.json(customer);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getCustomer: async(req,res)=>{
        try{
            const customer=await Customer.findOne({phoneCus:req.params.phonecus}).populate("roomVouchers");
            res.json(customer);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateCustomer: async(req,res)=>{
        try{
            await Customer.findOneAndUpdate(
                { phoneCus : req.params.phonecus },
                //$pull lấy ra khỏi mảng 
                { $set: {
                    idCard:req.body.idCard,
                    nameCus:req.body.nameCus,
                    // phoneCus:req.body.phoneCus,
                    sexCus:req.body.sexCus,
                    address:req.body.address
                },
                $push: {
                    roomVouchers:req.body.roomVouchers}
                }
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=customerController;