const Room= require("../model/room.model");
const RoomVoucher=require("../model/kindroom.model")

const roomController={
    getAllRoom: async(req,res)=>{
        try{
            const room=await Room.find().populate("kindRoom").populate("roomVoucher");
            res.json(room);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getRoom: async(req,res)=>{
        try{
            // const room=await Room.find({idRoom:req.params.idRoom}).populate("kindRoom").populate("roomVoucher");
            const room=await Room.find({idRoom:req.params.idRoom});
            res.json(room);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addRoom: async(req,res)=>{
        try{
            const newRoom=new Room(req.body);
            const saveRoom=await newRoom.save();
            res.json(saveRoom);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateRoom: async(req,res)=>{
        try{
            await Room.findOneAndUpdate(
                { idRoom : req.params.idRoom }, 
                { $set: req.body}
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteRoom: async(req,res)=>{
        try{
            var idroom= await Room.findOne({ idRoom : req.params.idRoom });
            await RoomVoucher.findByIdAndUpdate(idroom,{$set:{room:null}});
            await Room.findOneAndDelete({ idRoom : req.params.idRoom })
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=roomController;