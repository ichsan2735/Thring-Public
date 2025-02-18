const express = require("express")
const userRoute = require("./userRoutes")
const postRoute = require("./postRoutes")
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/login/google", UserController.googleLogin)

router.use(authentication)

router.use("/user", userRoute)
router.use("/post", postRoute)

module.exports = router