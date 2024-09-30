const express = require("express")
const router = express.Router()
const cartController = require("../controllers/CartController")
const authToken = require("../utils/authToken")

router.use(authToken)
router.get("/", cartController.getAll)

router.put("/update/:id", cartController.update)

router.delete("/delete/:id", cartController.delete)

module.exports = router

