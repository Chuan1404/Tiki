const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/CategoryController")

router.get("/", categoryController.getAll)
router.post("/add", categoryController.add)
router.put("/update/:id", categoryController.update)
router.delete("/delete/:id", categoryController.delete)

module.exports = router

