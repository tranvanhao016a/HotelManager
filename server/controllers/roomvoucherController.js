const Service= require("../models/service.model");
const Customer= require("../models/customer.model");
const Staff= require("../models/staff.model");
const Room= require("../models/room.model");
const RoomVoucher=require("../models/roomvoucher.model")
const roomvoucherController={
    getAllRoomVoucher: async(req,res)=>{
        try{
            const roomVouchers=await RoomVoucher.find().populate("staff").populate("room").populate("customer").populate("services");
            res.json(roomVouchers);
            // res.json(req.body)
        }catch(err){
            res.status(500).json(err);
        }
    },
    getRoomVoucher: async(req,res)=>{
        try{
            const roomVoucher=await RoomVoucher.findOne({idRoomVoucher:req.params.idRoomVoucher}).populate("staff").populate("room").populate("customer").populate("services");
            res.json(roomVoucher);
        }catch(err){
            res.status(500).json(err);
        }
    },
    addRoomVoucher: async(req,res)=>{
        try{
            var roomvoucher = await RoomVoucher.findOne({idRoomVoucher:req.body.idRoomVoucher})
            // console.log(roomvoucher)
            if(roomvoucher==null){
                // console.log("askfhaksjjh")
                // thêm room voucher
                const newRoomVoucher=new RoomVoucher({
                    idRoomVoucher : req.body.idRoomVoucher,
                    bookingDate : req.body.bookingDate ,
                    payDay : req.body.payDay ,
                    numCus : req.body.numCus ,
                    adults : req.body.adults ,
                    children : req.body.children 
                });
                const saveRoomVoucher=await newRoomVoucher.save();
                // them room voucher vao room
                var roomRV=await Room.findOneAndUpdate(
                    { idRoom : req.body.idRoom },
                    { $set: {roomVoucher:saveRoomVoucher._id}});
                var staffRV=await Staff.findOneAndUpdate(
                    { nameStaff : req.body.nameStaff },
                    { $push: {roomVouchers:saveRoomVoucher._id}});
                await RoomVoucher.findByIdAndUpdate(
                    saveRoomVoucher._id ,
                    { $set: {
                        staff:staffRV._id,
                        room:roomRV._id
                    }});    
                // console.log(room)
                // kiem tra khách hàng
                var checkCus =await Customer.findOne({phoneCus:req.body.phoneCus}) 
                // them khách hàng mới    
                if(checkCus==null){
                    const newCustomer=new Customer({
                        idCard :req.body.idCard,
                        nameCus :req.body.nameCus,
                        phoneCus :req.body.phoneCus,
                        sexCus :req.body.sexCus,
                        address:req.body.address
                    });
                    const saveCustomer=await newCustomer.save();
                    
                    await Customer.findByIdAndUpdate(saveCustomer["_id"],{ $push: {roomVouchers:saveRoomVoucher._id}});
                    await RoomVoucher.findByIdAndUpdate(saveRoomVoucher["_id"],{ $set: {room:room["_id"],customer:saveCustomer._id}});
                    // console.log("dhsdhdhdh")
                }else{
                    await Customer.findByIdAndUpdate(checkCus["_id"],{ $push: {roomVouchers:saveRoomVoucher._id}});
                    await RoomVoucher.findByIdAndUpdate(saveRoomVoucher["_id"],{ $set: {room:room["_id"],customer:checkCus["_id"]}});
                    // console.log("fffffff")
                }              
                res.json(saveRoomVoucher);
            }
            else{
                res.json("Room Voucher exits");
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateRoomVoucher: async(req,res)=>{
        try{
            await RoomVoucher.findOneAndUpdate(
                {idRoomVoucher:req.params.idRoomVoucher},
                { $set: {
                    bookingDate:req.body.bookingDate,
                    numCus:req.body.numCus,
                    total:req.body.total,
                    adults : req.body.adults ,
                    children : req.body.children ,
                }}
            );
            var roomvoucher=await RoomVoucher.findOne({idRoomVoucher:req.params.idRoomVoucher})
            var checkstaff=await Staff.findOne({nameStaff:req.body.nameStaff})

            if(checkstaff["position"]=="receptionist"){
                var staff=await Staff.findOneAndUpdate({nameStaff:req.body.nameStaff},{ $push: {roomVouchers:roomvoucher["_id"]}});
                await RoomVoucher.findOneAndUpdate({idRoomVoucher:req.params.idRoomVoucher},{ $set: {staff:staff["_id"]}});
            }
            var service=await Service.findOneAndUpdate({nameService:req.body.nameService},{ $push: {roomVouchers:roomvoucher["_id"]}});
            await RoomVoucher.findOneAndUpdate({idRoomVoucher:req.params.idRoomVoucher},{ $push: {services:service["_id"]}});

            var room=await Room.findOneAndUpdate({idRoom:req.body.idRoom},{ $set: {roomVoucher:roomvoucher["_id"]}});
            await RoomVoucher.findOneAndUpdate({idRoomVoucher:req.params.idRoomVoucher},{ $set: {room:room["_id"]}});

            res.json("Update success!!");
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteRoomVoucher: async(req,res)=>{
        try{
            var roomvoucher= await RoomVoucher.findOne({idRoomVoucher:req.params.idRoomVoucher});
            var checkstaff=await Staff.findById(roomvoucher["staff"])
            if(checkstaff!=null){
                var staff=await Staff.findByIdAndUpdate(roomvoucher["staff"],{$pull:{roomVouchers:roomvoucher["_id"]}}); 
            }
            var arrServicse=roomvoucher["services"];
            arrServicse.forEach(async(element) => {
                await Service.findByIdAndUpdate(element,{$pull:{roomVouchers:roomvoucher["_id"]}});
            });
            await Room.findByIdAndUpdate(roomvoucher["room"],{$set:{roomVouchers:null}});
            await Customer.findByIdAndUpdate(roomvoucher["customer"],{$pull:{roomVouchers:roomvoucher["_id"]}});
            await RoomVoucher.findOneAndDelete({idRoomVoucher:req.params.idRoomVoucher})
            res.json("Delete success!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports=roomvoucherController;