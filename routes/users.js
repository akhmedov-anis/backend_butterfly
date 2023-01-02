const express = require("express")
const router = express.Router()
const Users = require("../models/users")
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);

router.get("/", async (req, res) => {
    try {
        let user = await Users.find()

        res.json({
            ok: 2,
            message: 'Пользлватели получены',
            data: user
        })
    }
    catch (error) {
        console.log(error);
    }
})

router.get("/:name", async (req, res) => {
    try {
        console.log(req.params.name);
        Users.findOne({ "name": req.params.name }, (error, data) => {
            if (error) {
                res.json({
                    ok: false,
                    message: "Some error",
                    error
                })
            } else {
                if (data == null) {
                    res.json({
                        ok: false,
                        message: 'No user!'
                    })
                } else {
                    let isName = req.params.name == data.name

                    if (isName) {
                        res.json({
                            ok: 1,
                            message: "Get One User",
                            data
                        })
                        return
                    }

                    res.json({
                        ok: false,
                        message: "Wrong Name! Login is not  OK!"
                    })
                }
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

router.post("/register", async (req, res) => {
    try {
        console.log('qwe');
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        Users.create(req.body, async (error, data) => {
            if (error) {
                console.log(error);

                res.json({
                    ok: false,
                    message: "Error inside callback function WTF!",
                    error
                })
            } else {
                let newUser = JSON.parse(JSON.stringify(data))

                delete newUser.password

                res.json({
                    ok: true,
                    message: "Element created!",
                    data: newUser
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

router.post("/login", async (req, res) => {
    try {
        Users.findOne({ "email": req.body.email }, (error, data) => {
            if (error) {
                res.json({
                    ok: false,
                    message: "Some error!"
                })
            } else {
                if (data == null) {
                    res.json({
                        ok: false,
                        message: "No user!",
                        dat: data
                    })
                } else {
                    let isPasswordCorrect = bcrypt.compareSync(req.body.password, data.password)
                    
                    if(isPasswordCorrect) {
                        res.json({
                            ok: true,
                            message: "Signed In"
                        })

                        return
                    }

                    res.json({
                        ok: false,
                        message: "Wrong Password! Login is OK!"
                    })
                }
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