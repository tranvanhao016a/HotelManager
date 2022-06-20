const accountController= require("../controllers/accountController");
const router =require("express").Router();

router.get("/getAllAccount",accountController.getAllAccount);
router.get("/getAccount/:user",accountController.getAccount);
router.post("/addAccount",accountController.addAccount);
router.post("/updateAccount/:user",accountController.updateAccount);
router.delete("/deleteAccount/:user",accountController.deleteAccount);

module.exports=router;