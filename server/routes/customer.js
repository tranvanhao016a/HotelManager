const customerController= require("../controllers/customerController");
const router =require("express").Router();

router.get("/getAllCustomer",customerController.getAllCustomer);
router.get("/getCustomer/:phonecus",customerController.getCustomer);
router.post("/addCustomer",customerController.addCustomer);
router.put("/updateCustomer/:phonecus",customerController.updateCustomer);
router.delete("/deleteCustomer/:phonecus",customerController.deleteCustomer);

module.exports=router;