const customerController= require("../controllers/customerController");
const router =require("express").Router();

router.get("/getAllCustomer",customerController.getAllCustomer);
router.get("/getCustomer/:phonecus",customerController.getCustomer);
router.put("/updateCustomer/:phonecus",customerController.updateCustomer);

module.exports=router;