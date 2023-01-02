const express = require("express")
const router = express.Router()
const Messages = require("../models/message")
const Chats = require("../models/chats")
 
router.post("/", async (req, res) => {
    try {
        Messages.create(req.body, async (error, data) => {
            if (error) {
                console.log(error);

                res.json({
                    ok: false,
                    message: "Error inside callback function WTF!",
                    error
                }) 
            } else {
                let chat = await Chats.findById(data.chatId)
                chat.text.push({user: data.user, text: data.text})
                chat.save()
                
                res.json({
                    ok: true,
                    message: "Element created!",
                    element: data
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            message: "Some error",
            error
        })
    }
})

module.exports = router