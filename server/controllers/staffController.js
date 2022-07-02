const Staff= require("../model/staff.model");
const Account=require("../model/account.model")
const RoomVoucher=require("../model/roomvoucher.model")

const staffController={
    getAllStaff: async(req,res)=>{
        try{
            const staff=await Staff.find().populate("email").populate("roomVouchers");
            res.json(staff);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getStaff: async(req,res)=>{
        try{
            const staff=await Staff.find({idStaff:req.params.idstaff}).populate("email").populate("roomVouchers");
            res.json(staff);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addStaff: async(req,res)=>{
        try{
            if(req.body.position=="receptionist"){
                const newStaff=new Staff(
                    {        
                        idStaff: req.body.idStaff,              
                        nameStaff:req.body.nameStaff,
                        position:req.body.position,
                        phoneStaff:req.body.phoneStaff,
                        status:"woking",
                        sexStaff:req.body.sexStaff,
                        address:req.body.address
                    }
                );
                const saveStaff=await newStaff.save();          
                var checkAccount= await Account.findOne({user:req.body.user});
                // // console.log(checkAccount+"7777777"+typeof checkAccount);
                var flag;
                if(checkAccount==null){
                    const newAccount=new Account({
                        user : req.body.user,
                        password :req.body.password,
                        staff: saveStaff._id
                    });
                    const saveAccount = await newAccount.save();
                    flag=saveAccount._id;
            }
            else {
                var account= await Account.findOneAndUpdate({user:req.body.user},{ $set: {staff:saveStaff._id}});
                flag=account["_id"];
        }
        var savestaff = await Staff.findOneAndUpdate({_id:saveStaff._id},{ $set: {email:flag}});
        res.json(savestaff);
        }
            else{
                const newStaff=new Staff(req.body);
                const saveStaff=await newStaff.save();
                res.json(saveStaff);
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateStaff: async(req,res)=>{
        try{
            var updateStaff=await Staff.findOne({ idStaff : req.params.idstaff })
            // console.log(updateStaff["roomVouchers"])
            var accountde= Account.findById(updateStaff["email"]);
            await accountde.updateOne({ $set: {staff:null}})
            var account= Account.findOne({user:req.body.user});
            await account.updateOne({ $set: {staff:updateStaff["_id"]}})
            var acc=await Account.findOne({user:req.body.user});

            await Staff.findOneAndUpdate(
                { idStaff : req.params.idstaff },
                { $set:                 
                    {
                    nameStaff:req.body.nameStaff,
                    position:req.body.position,
                    phoneStaff:req.body.phoneStaff,
                    sexStaff:req.body.sexStaff,
                    status:req.body.status,
                    address:req.body.address,
                    email:acc["_id"]
                    }
                }
               );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteStaff: async(req,res)=>{
        try{
            var staff= await Staff.findOne({ idStaff : req.params.idstaff });
            if(staff!=null){
                await Account.findByIdAndUpdate(staff["email"],{$set:{staff:null}});
                await Staff.findOneAndUpdate({ idStaff : req.params.idstaff },{$set:{status:"leave",email:null}})
                var arrRV=staff["roomVouchers"];
                arrRV.forEach(async(element) => {
                    var checkRV=await RoomVoucher.findById(element)
                    var position=staff["position"];
                    if(checkRV!=null && position=="receptionist" ){
                        var roomVoucher=RoomVoucher.findById(element);
                        await roomVoucher.updateOne({ $set: {staff:null}})
                        var stafde=Staff.findOne({ idStaff : req.params.idstaff });
                        await stafde.updateOne({ $pull: {roomVouchers:checkRV["_id"]}})
                    }
                    });
                res.json("Delete success!!");
            }
            else{
                res.json("Staff has quit");
            }

        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=staffController;