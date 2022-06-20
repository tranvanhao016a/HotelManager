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
            const service=await Service.find({idService:req.params.idservice}).populate("roomVouchers");;
            res.json(service);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addService: async(req,res)=>{
        try{
            const newService=new Service(req.body);
            const saveService=await newService.save();
            res.json(saveService);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateService: async(req,res)=>{
        try{
            await Service.findOneAndUpdate(
                {idService:req.params.idservice},
                { $set: {
                    idService:req.body.idService,
                    nameService:req.body.nameService,
                    priceService:req.body.priceService},
                $push: {
                    roomVouchers:req.body.roomVouchers}
                });
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteService: async(req,res)=>{
        try{
            var ser= await Service.findOne({idService:req.params.idservice});
            console.log(typeof roomvoucher)
            // await RoomVoucher.findByIdAndUpdate(
            //     ser,
            //     {$pulll:{services: ser["_id"]}}
            //     );
            // await Service.findOneAndDelete({idService:req.params.idservice})
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }

}
module.exports=serviceController;