const mongoose = require('mongoose')

const Messages = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isReview: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model("Messages", Messages) 