const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },

    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    avtar: {
        type: String,
        default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-256%2Faccount-profile-avatar-man-circle-round-user-30452.png&f=1&nofb=1"
    },

    role: {
        type: String,
        default: "user"
    },

    gender: {
        type: String,
        default: "male"
    },

    mobile: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        default: "male"
    },

    story: {
        type: String,
        default: "",
        maxlength: 200
    },

    website: {
        type: String,
        default: ""
    },

    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref:"user"
        },
    ],

    following: [
        {
            type: mongoose.Types.ObjectId,
            ref:"user"
        },
    ],

}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)