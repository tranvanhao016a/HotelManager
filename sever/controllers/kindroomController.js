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
            var kindroom =await KindRoom.findOne({nameKindRoom:req.body.nameKindRoom})
            // console.log(kindroom)
            if(kindroom==null){
                const newKindRoom=new KindRoom(req.body);
                const saveKindRoom=await newKindRoom.save();
                res.json(saveKindRoom);}
            else{
                res.json("KindRoom exits");
            }
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
                { $set: {
                    nameKindRoom:req.body.nameKindRoom,
                    cusMax:req.body.cusMax,
                    priceRoom:req.body.priceRoom,
                    image:req.body.image
                }}
            );
            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteKindRoom: async(req,res)=>{
        try{
            var kindroom= await KindRoom.findOne({idKindRoom:req.params.idKindRoom});
            // console.log(ser["_id"]);
            if(kindroom!=null){
                var room =  await Room.find({kindRoom:kindroom["_id"]});
                // console.log(typeof rV);
                if(room!=null){
                    var roomde=Room.findById(room["_id"]);
                    await roomde.updateOne({ $set: {kindRoom:null}})
                    }
                await KindRoom.findOneAndDelete({ idKindRoom : req.params.idKindRoom })
                res.json("Delete success!!");
                }
            else{
                res.json("Kind room exits!!");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=kindroomController;