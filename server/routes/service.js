const serviceController= require("../controllers/serviceController");
const router =require("express").Router();

router.get("/getAllService",serviceController.getAllService);
router.get("/getService/:idService",serviceController.getService);
router.post("/addService",serviceController.addService);
router.put("/updateService/:idservice",serviceController.updateService);
router.delete("/deleteService/:idservice",serviceController.deleteService);

module.exports=router;