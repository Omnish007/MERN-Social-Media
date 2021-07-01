const router = require("express").Router()
const postCtrl = require("../controller/postCtrl")
const auth = require("../middleware/auth")

router.route("/posts")
    .post(auth, postCtrl.createPost)

module.exports = router