const productRoute = require("./productRoute")
const categoryRoute = require("./categoryRoute")
const authRoute = require("./authRoute")
const userRoute = require("./userRoute")

function router(app) {
    app.use("/category", categoryRoute)
    app.use("/product", productRoute)
    app.use("/auth", authRoute)
    app.use("/user", userRoute)
}

module.exports = router