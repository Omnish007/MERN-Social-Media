const router = require("express").Router()
const postCtrl = require("../controller/postCtrl")
const auth = require("../middleware/auth")

router.route("/posts")
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPost)

router.route("/post/:id")
    .patch(auth, postCtrl.updatePost)
    .get(auth, postCtrl.getPost)

router.patch("/post/:id/like", auth, postCtrl.likePost)
router.patch("/post/:id/unlike", auth, postCtrl.unlikePost)

router.get("/user_posts/:id", auth, postCtrl.getUserPosts)

module.exports = router