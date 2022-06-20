const Service= require("../model/service.model");
const Customer= require("../model/customer.model");
const Staff= require("../model/staff.model");
const Room= require("../model/room.model");
const RoomVoucher=require("../model/roomvoucher.model")
const serviceController={
    getAllRoomVoucher: async(req,res)=>{
        try{
            const service=await RoomVoucher.find().populate("staff").populate("room").populate("customer").populate("services");
            res.json(service);
            // res.json(req.body)
        }catch(err){
            res.status(500).json(err);
        }
    },
    getRoomVoucher: async(req,res)=>{
        try{
            const service=await RoomVoucher.find({idRoomVoucher:req.params.idRoomVoucher}).populate("staff").populate("room").populate("customer").populate("services");
            res.json(service);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addRoomVoucher: async(req,res)=>{
        try{
            const newRoomVoucher=new RoomVoucher(req.body);
            const saveRoomVoucher=await newRoomVoucher.save();
            res.json(saveRoomVoucher);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateRoomVoucher: async(req,res)=>{
        try{
            await RoomVoucher.findOneAndUpdate(
                {idRoomVoucher:req.params.idRoomVoucher},
                //$pull lấy ra khỏi mảng 
                { $set: {
                    idRoomVoucher:req.body.idRoomVoucher,
                    staff:req.body.staff,
                    room:req.body.room,
                    customer:req.body.customer,
                    bookingDate:req.body.bookingDate,
                    numCus:req.body.numCus,
                    total:req.body.total,
                },
                $push: {
                    services:req.body.services}
                }
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteRoomVoucher: async(req,res)=>{
        try{
            var roomvoucher= await RoomVoucher.findOne({idRoomVoucher:req.params.idRoomVoucher});
            console.log(typeof roomvoucher)
            // await Service.findByIdAndUpdate(
            //     email,
            //     {$pulll:{servicees: roomvoucher["_id"]}}
            //     );
            // await RoomVoucher.findOneAndDelete({idRoomVoucher:req.params.idRoomVoucher})
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }

}
module.exports=serviceController;