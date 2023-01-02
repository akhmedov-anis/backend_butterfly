const express = require("express")
const router = express.Router()
const Chats = require("../models/chats")
const Users = require("../models/users")

router.get("/", async (req, res) => {
    try {
        let chat = await Chats.find()

        res.json({
            ok: true,
            message: 'Курсы получены',
            data: chat
        })
    }
    catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    try {
        Chats.create(req.body, async (error, data) => {
            if (error) {
                console.log(error);

                res.json({
                    ok: false,
                    message: "Error inside callback function WTF!",
                    error
                })
            } else {
                let user1 = await Users.findById(data.user1)
                let user2 = await Users.findById(data.user2)
                user1.chats.push(data.user2)
                user2.chats.push(data.user2)
                user1.save()
                user2.save()

                console.log(data.usersId);
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