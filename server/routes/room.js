const roomController= require("../controllers/roomController");
const router =require("express").Router();

router.get("/getAllRoom",roomController.getAllRoom);
router.get("/getRoom/:idRoom",roomController.getRoom);
router.post("/addRoom",roomController.addRoom);
router.put("/updateRoom/:idRoom",roomController.updateRoom);
router.delete("/deleteRoom/:idRoom",roomController.deleteRoom);

module.exports=router;