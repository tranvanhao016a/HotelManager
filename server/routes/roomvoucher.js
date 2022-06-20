const roomvoucherController= require("../controllers/roomvoucherController");
const router =require("express").Router();

router.get("/getAllRoomVoucher",roomvoucherController.getAllRoomVoucher);
router.get("/getRoomVoucher/:idRoomVoucher",roomvoucherController.getRoomVoucher);
router.post("/addRoomVoucher",roomvoucherController.addRoomVoucher);
router.put("/updateRoomVoucher/:idRoomVoucher",roomvoucherController.updateRoomVoucher);
router.delete("/deleteRoomVoucher/:idRoomVoucher",roomvoucherController.deleteRoomVoucher);

module.exports=router;