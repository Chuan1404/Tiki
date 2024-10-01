const express = require("express")
const router = express.Router()
const orderController = require("../controllers/OrderController")
const authToken = require("../utils/authToken")

router.use(authToken)
router.get("/", orderController.getAll)
router.post("/add", orderController.add)


module.exports = router

