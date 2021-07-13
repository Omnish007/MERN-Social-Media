const mongoose = require("mongoose")

const conversationScema = new mongoose.Schema({

    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],

    text: String,
    
    media: Array,
}, {
    timestamps: true
})

module.exports = mongoose.model("conversation", conversationScema)