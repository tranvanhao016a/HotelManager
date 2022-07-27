const accountController= require("../controllers/accountController");
const router =require("express").Router();
const middlewareController= require("../controllers/middlewareController");

router.get("/getAllAccount",accountController.getAllAccount);
router.get("/getAccount/:username",accountController.getAccount);
router.put("/updateAccount/:username",accountController.updateAccount);
// router.get("/",middlewareController.verifyToken,userController.getAllUsers);
// router.delete("/:username",middlewareController.verifyTokenAndAdminAuth,userController.deleteUser);

module.exports=router;