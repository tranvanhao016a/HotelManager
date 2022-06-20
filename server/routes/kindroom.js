const kindroomController= require("../controllers/kindroomController");
const router =require("express").Router();

router.get("/getAllKindRoom",kindroomController.getAllKindRoom);
router.get("/getKindRoom/:idKindRoom",kindroomController.getKindRoom);
router.post("/addKindRoom",kindroomController.addKindRoom);
router.put("/updateKindRoom/:idKindRoom",kindroomController.updateKindRoom);
router.delete("/deleteKindRoom/:idKindRoom",kindroomController.deleteKindRoom);

module.exports=router;