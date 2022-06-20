const KindRoom= require("../model/kindroom.model");
const Room=require("../model/room.model");

const kindroomController={
    getAllKindRoom: async(req,res)=>{
        try{
            const kindroom=await KindRoom.find().populate("rooms");
            res.json(kindroom);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getKindRoom: async(req,res)=>{
        try{
            const kindroom=await KindRoom.find({idKindRoom:req.params.idKindRoom}).populate("rooms");
            res.json(kindroom);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addKindRoom: async(req,res)=>{
        try{
            const newKindRoom=new KindRoom(req.body);
            const saveKindRoom=await newKindRoom.save();
            res.json(saveKindRoom);

// var today  = new Date("2021-02-18T00:00:00.000Z");
// console.log(today.toLocaleDateString("en-US"));
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateKindRoom: async(req,res)=>{
        try{
            await KindRoom.findOneAndUpdate(
                { idKindRoom : req.params.idKindRoom },
                //$pull lấy ra khỏi mảng 
                { $set: {
                    idKindRoom:req.body.idKindRoom,
                    nameKindRoom:req.body.nameKindRoom,
                    cusMax:req.body.cusMax,
                    priceRoom:req.body.priceRoom
                },
                $push: {
                    rooms:req.body.rooms}
                }
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteKindRoom: async(req,res)=>{
        try{
            var idkindroom= await KindRoom.findOne({ idKindRoom : req.params.idKindRoom });
            await Room.findByIdAndUpdate(idkindroom,{$pull:{kindRoom:idkindroom["_id"]}});
            await KindRoom.findOneAndDelete({ idKindRoom : req.params.idKindRoom })
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=kindroomController;