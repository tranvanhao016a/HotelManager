const staffController= require("../controllers/staffController");
const router =require("express").Router();

router.get("/getAllStaff",staffController.getAllStaff);
router.get("/getStaff/:idstaff",staffController.getStaff);
router.post("/addStaff",staffController.addStaff);
router.put("/updateStaff/:idstaff",staffController.updateAccount);
router.delete("/deleteStaff/:idstaff",staffController.deleteAccount);

module.exports=router;