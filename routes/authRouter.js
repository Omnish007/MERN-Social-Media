const router = require("express").Router()
const authCtrl = require("../controller/authCtrl")

router.post("/register", authCtrl.register)

router.post("/login", authCtrl.login)

router.post("/logout", authCtrl.logout)

router.post("/refresh_token", authCtrl.gentrateAccessToken)

module.exports = router