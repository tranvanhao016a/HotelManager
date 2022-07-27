const Account= require("../models/account.model");
const bcrypt=require("bcrypt");

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
            const account=await Account.findOne({ username : req.params.username }).populate("staff");
            res.json(account);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateAccount: async(req,res)=>{
        try{
            const salt =await bcrypt.genSalt(10);
            const hashed =await bcrypt.hash(req.body.password, salt);

            await Account.findOneAndUpdate(
                { username : req.params.username },
                { $set: {
                    username : req.body.username,
                    email: req.body.email,
                    password:hashed
                }}
            );
            res.send({message:"Upload success!"});
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=accountController;