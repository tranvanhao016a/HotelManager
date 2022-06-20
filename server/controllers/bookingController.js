const Staff= require("../model/staff.model");
const Account=require("../model/account.model")

const staffController={
    getAllStaff: async(req,res)=>{
        try{
            const staff=await Staff.find().populate("email");
            res.json(staff);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getStaff: async(req,res)=>{
        try{
            const staff=await Staff.find({idStaff:req.params.idstaff}).populate("email");
            res.json(staff);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addStaff: async(req,res)=>{
        try{
            const newStaff=new Staff(req.body);
            const saveStaff=await newStaff.save();
            res.json(saveStaff);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateAccount: async(req,res)=>{
        try{
            await Staff.findOneAndUpdate(
                { idStaff : req.params.idstaff },
                //$pull lấy ra khỏi mảng 
                { $set: req.body}
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteAccount: async(req,res)=>{
        try{
            var email= await Staff.findOne({ idStaff : req.params.idstaff });
            await Account.findByIdAndUpdate(email,{$set:{staff:null}});
            await Staff.findOneAndDelete({ idStaff : req.params.idstaff })
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=staffController;