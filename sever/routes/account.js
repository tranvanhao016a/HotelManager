const accountController= require("../controllers/accountController");
const router =require("express").Router();

router.get("/getAllAccount",accountController.getAllAccount);
router.get("/getAccount/:user",accountController.getAccount);
router.put("/updateAccount/:user",accountController.updateAccount);

module.exports=router;