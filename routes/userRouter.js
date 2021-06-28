const router = require("express").Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controller/userCtrl")

router.get("/search", auth ,userCtrl.searchUser)


module.exports = router