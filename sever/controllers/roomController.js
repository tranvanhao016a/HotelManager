const Room= require("../model/room.model");
const RoomVoucher=require("../model/kindroom.model");
const KindRoom = require("../model/kindroom.model");

const roomController={
    getAllRoom: async(req,res)=>{
        try{
            const room=await Room.find().populate("kindRoom").populate("kindRoom").populate("roomVoucher");
            res.json(room);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getRoom: async(req,res)=>{
        try{
            // const room=await Room.find({idRoom:req.params.idRoom}).populate("kindRoom").populate("roomVoucher");
            const room=await Room.find({idRoom:req.params.idRoom}).populate("kindRoom").populate("roomVoucher");
            res.json(room);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addRoom: async(req,res)=>{
        try{
            var room =await Room.findOne({idRoom:req.body.idRoom})
            // console.log(kindroom)
            if(room==null){
                const newRoom=new Room({
                    idRoom:req.body.idRoom,
                    status :req.body.status
                });
                const saveRoom=await newRoom.save();
                res.json(saveRoom);
                var checkKR= await KindRoom.findById(room["kindRoom"]);
                if(checkKR!=null){
                    var kindromup=KindRoom.findOne({ nameKindRoom : req.body.nameKindRoom });
                    await kindromup.updateOne({ $push: {rooms:kd["_id"]}})
                }

            }
            else{
                res.json("Room exits");
            }

        }catch(err){
            res.status(500).json(err);
        }
    },
    updateRoom: async(req,res)=>{
        try{
            var kindrom= await KindRoom.findOne({ nameKindRoom : req.body.nameKindRoom });
            // console.log(kindrom)
            if(kindrom!=null){
                await Room.findOneAndUpdate(
                    { idRoom : req.params.idRoom }, 
                    { $set: {
                        kindRoom :kindrom["_id"],
                        status :req.body.status,
                    }}
                );
                    var kd= await Room.findOne({ idRoom : req.params.idRoom });
                    var kindromup=KindRoom.findOne({ nameKindRoom : req.body.nameKindRoom });
                    await kindromup.updateOne({ $push: {rooms:kd["_id"]}})
            }
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteRoom: async(req,res)=>{
        try{
            var room= await Room.findOne({idRoom : req.params.idRoom });
            // console.log(ser["_id"]);
            if(room!=null){
                var kindroom =  await KindRoom.findById(room["kindRoom"]);
                // console.log(typeof rV);
                if(kindroom!=null){
                    var kindroomde=KindRoom.findById(room["kindRoom"])
                    await kindroomde.updateOne({ $pull: {rooms:room["_id"]}})
                    }
                var checkRV=await RoomVoucher.findById(room["roomVoucher"])
                if(checkRV!=null){
                    var roomVoucher=RoomVoucher.findById(room["roomVoucher"]);
                    await roomVoucher.updateOne({ $set: {room:null}})
                }
                await Room.findOneAndDelete({idRoom : req.params.idRoom})
                res.json("Delete success!!");
            }
            else{
                res.json("Room exits!!");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=roomController;