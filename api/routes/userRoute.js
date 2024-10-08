const express = require("express")
const router = express.Router()
const userController = require("../controllers/UserController")
const authToken = require("../utils/authToken")

router.use(authToken)
router.get("/get-info", userController.getInfo)
router.get("/", userController.getAll)

module.exports = router

