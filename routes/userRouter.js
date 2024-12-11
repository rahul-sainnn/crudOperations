const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../Middleware/Authorization");

const router = express.Router();

router.route("/createUser").post(createUser)
router.route("/getUsers").get(isAuthenticated,isAdmin("admin"), getUsers)
router.route("/getUserById/:id").get(isAuthenticated,getUserById)
router.route("/updateUser/:id").put(isAuthenticated, updateUser)
router.route("/deleteUser/:id").delete(isAuthenticated,isAdmin("admin"),deleteUser)

module.exports = router;