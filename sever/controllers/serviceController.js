const Service= require("../model/service.model");
const RoomVoucher=require("../model/roomvoucher.model")
const serviceController={
    getAllService: async(req,res)=>{
        try{
            const service=await Service.find().populate("roomVouchers");
            res.json(service);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getService: async(req,res)=>{
        try{
            const service=await Service.find({nameService:req.params.nameService}).populate("roomVouchers");;
            res.json(service);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addService: async(req,res)=>{
        try{
            var service =await KindRoom.findOne({nameKindRoom:req.body.nameKindRoom})
            // console.log(kindroom)
            if(service==null){
                const newService=new Service(req.body);
                const saveService=await newService.save();
                res.json(saveService);}
            else{
                res.json("Service exits");
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateService: async(req,res)=>{
        try{
            await Service.findOneAndUpdate(
                {idService:req.params.idservice},
                { $set: {
                    nameService:req.body.nameService,
                    priceService:req.body.priceService},
                });
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteService: async(req,res)=>{
        try{
            var ser= await Service.findOne({idService:req.params.idservice});
            // console.log(ser["_id"]);
            if(ser!=null){
            var rV =  await RoomVoucher.find({services:ser["_id"]});
            // console.log(typeof rV);
            if(rV!=null){
                rV.forEach(async(element) => {
                // console.log(element["idRoomVoucher"]);
                var roomVoucher=RoomVoucher.findById(element["_id"]);
                await roomVoucher.updateOne({ $pull: {services:ser["_id"]}})
                });
            }
            await Service.findOneAndDelete({idService:req.params.idservice})
            res.json("Delete success!!");
            }
            else{
                res.json("Service exits!!");
            }
            }
        catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=serviceController;