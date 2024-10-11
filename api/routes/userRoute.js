const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authToken = require("../utils/authToken");
const authorizeUser = require("../utils/authorizeUser");

router.use(authToken);
router.get("/get-info", userController.getInfo);
router.get("/", authorizeUser("admin"), userController.getAll);

router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;
