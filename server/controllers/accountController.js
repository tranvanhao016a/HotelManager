const Account= require("../model/account.model");
const Staff= require("../model/staff.model");

const accountController={
    getAllAccount: async(req,res)=>{
        try{
            const account=await Account.find().populate("staff");
            res.json(account);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getAccount: async(req,res)=>{
        try{
            const account=await Account.findOne({ user : req.params.user }).populate("staff");
            res.json(account);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateAccount: async(req,res)=>{
        try{
            await Account.findOneAndUpdate(
                { user : req.params.user },
                { $set: req.body}
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=accountController;