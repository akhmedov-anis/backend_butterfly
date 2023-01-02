const mongoose = require('mongoose')

const Chats = mongoose.Schema({
    // сам юзер
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // другой юзер
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isYourFriend: {
        type: Boolean
    },
    text: {
        type: mongoose.Schema.Types.Array,
        ref: "Messages"
    },
})

module.exports = mongoose.model("Chats", Chats) 