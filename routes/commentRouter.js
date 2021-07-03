const router = require("express").Router()
const commentCtrl = require("../controller/commentCtrl")
const auth = require("../middleware/auth")


router.post("/comment", auth, commentCtrl.createComment)



module.exports = router