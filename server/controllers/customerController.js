const Customer= require("../model/customer.model");
const RoomVoucher=require("../model/roomvoucher.model")

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
            const customer=await Customer.find({phoneCus:req.params.phonecus}).populate("roomVouchers");
            res.json(customer);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addCustomer: async(req,res)=>{
        try{
            const newCustomer=new Customer(req.body);
            const saveCustomer=await newCustomer.save();
            res.json(saveCustomer);
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
                    phoneCus:req.body.phoneCus,
                    sexCus:req.body.sexCus
                },
                $push: {
                    roomVouchers:req.body.roomVouchers}
                }
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteCustomer: async(req,res)=>{
        try{
            var cus= await Customer.findOne({ phoneCus : req.params.phonecus });
            // await RoomVoucher.findByIdAndUpdate(cus,{$pull:{customer:cus["_id"]}});
            // await Customer.findOneAndDelete({ phoneCus : req.params.phonecus })
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=customerController;