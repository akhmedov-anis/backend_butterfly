const mongoose = require('mongoose')

const Users = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: mongoose.Schema.Types.Array,
        default: []
    },
    settings: {
        type: mongoose.Schema.Types.Array,
        default: [
            {
                theme: 'white'
            },
            {
                language: 'en'
            },
            {
                privacy: {
                    image: true,
                    username: true,
                    desc: '',
                    number: Number
                }
            },
            {
                secondPassword: {
                    isOn: false                   
                }
            },
        ]
    },
    lastSeen: {
        type: Boolean,
        
    },
    chats: {
        type: mongoose.Schema.Types.Array,
        ref: "Chats"
    }
})

module.exports = mongoose.model("Users", Users) 