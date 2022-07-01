const staffController= require("../controllers/staffController");
const router =require("express").Router();

router.get("/getAllStaff",staffController.getAllStaff);
router.get("/getStaff/:idstaff",staffController.getStaff);
router.post("/addStaff",staffController.addStaff);
router.put("/updateStaff/:idstaff",staffController.updateStaff);
router.delete("/deleteStaff/:idstaff",staffController.deleteStaff);

module.exports=router;