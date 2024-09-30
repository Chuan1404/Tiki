const express = require("express")
const router = express.Router()
const productController = require("../controllers/ProductController")
const upload = require("../configs/multer");

router.get("/", productController.getAll)
router.post("/add", upload.single("thumbnailUrl"), productController.add)
router.put("/update/:id", upload.single("thumbnailUrl"), productController.update)
router.delete("/delete/:id", productController.delete)

module.exports = router

