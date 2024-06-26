const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const handleGoogleAuth = require("../controllers/googleAuth.controller");

//api/users
router.post("/", userController.createUser);
router.post("/find", userController.findUser);
router.get("/", userController.getUsers); // Admin Access
router.get("/:id", userController.getUser); // Admin Access
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/handleGoogleAuth", handleGoogleAuth);

module.exports = router;
