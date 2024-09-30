const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const dotenv = require("dotenv")
dotenv.config()

// config
const database = require("./configs/database.js")

database.connect()

const PORT = process.env.PORT || 3001

// middleware
const bodyParser = require('body-parser')
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())

// router
const router = require("./routes")
router(app)

server.listen(PORT, () => {
    console.log("Server run success");
})