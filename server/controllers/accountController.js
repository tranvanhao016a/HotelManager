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
    addAccount: async(req,res)=>{
        try{
            const newAccount=new Account(req.body);
            const saveAccount=await newAccount.save();
            res.json(saveAccount);
            // if(req.body.user){
            //     const staff=Staff.findById(req.body.user);
            //$push add vào array
            //nếu có nhập id mà idoject staff Account thì thểm vào idoject emails 
            //     await staff.updateOne({$push:{emails:saveAccount._id}})
            // }
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateAccount: async(req,res)=>{
        try{
            await Account.findOneAndUpdate(
                { user : req.params.user },
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
            //lấy id cuốn sách ra khỏi mảng books có trùng id 
            // await Staff.findOneAndUpdate(
            //     { idStaff : req.params.id },
            //     //$pull lấy ra khỏi mảng 
            //     { $pull: {books:req.body.id}}
            // );
            var idstaff= await Account.findOne({ user : req.params.user });
            await Staff.findByIdAndUpdate(idstaff,{$set:{email:null}});
            await Account.findOneAndDelete({ user : req.params.user })
            res.json("Delete success!!");
            // res.json(req.body)
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=accountController;