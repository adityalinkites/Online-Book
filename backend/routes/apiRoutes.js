const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const { verifyToken } = require("../middleware/authMiddleware");



router.get("/def", apiController.def);

//Register POST METHOD
router.post("/register", apiController.registerUser);

//Add Comic
router.post("/addComic", upload.single("image"), apiController.addComic);

//Web List
router.get("/webList", verifyToken, apiController.WebList);

//Delete
router.delete("/deleteRow", apiController.DeleteComic);

router.delete("/deleteUser", apiController.DeleteUser);

//User List
router.get("/UserList", verifyToken, apiController.UserList);

//Pre Filled Data
router.get("/preFillData/:id", apiController.prefillData);

//Single User Data
router.get("/singleUser/:id", verifyToken, apiController.SingleUser);

//Login User
router.post("/login", apiController.Login);

//Update Comic
router.put("/updateComic/:id",verifyToken, upload.single("image"), apiController.UpdateComic);

// Update User
router.put("/updateUser/:id", upload.single("image"), apiController.UpdateUser);

//Insert Cart Values
router.post("/checkOut", verifyToken, apiController.InsertCartValues);

//Select Order
router.get("/yourOrder/:id", verifyToken, apiController.SelectOrders);


module.exports = router;
