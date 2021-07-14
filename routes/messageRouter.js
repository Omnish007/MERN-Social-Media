const router = require("express").Router()
const messagesCtrl = require("../controller/messageCtrl")
const auth = require("../middleware/auth")

router.post("/message", auth, messagesCtrl.createMessage)

router.get("/conversations", auth, messagesCtrl.getConversations)

router.get("/message/:id", auth, messagesCtrl.getMessages)

router.delete("/message/:id", auth, messagesCtrl.deleteMessages)


module.exports = router