const express = require("express")
const app = express()

const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 7777

app.use(cors())
app.use(bodyParser.json())

app.use("/users", require("./routes/users.js"))
app.use("/chats", require("./routes/chats.js"))
app.use("/message", require("./routes/message.js"))

app.get('/', function (req, res) {
    res.send('<h1 style="font-family: Gilroy; text-transform: uppercase;">nothing</h1>')
});

if (process.env.NODE_ENV == "production") {
    console.log("production");

    mongoose.connect(`mongodb+srv://akhmedovanis:nipanid2@cluster0.na8pc.mongodb.net/?retryWrites=true&w=majority`, () => {
        console.log("Успешно подключились к global данных :)");
    })

    mongoose.set("debug", true)
} else {
    console.log("development");
    mongoose.connect("mongodb://localhost:27017/app", () => {
        console.log("Успешно подключились к базе данных :)");
    })
    mongoose.connection.on('error', err => {
        console.log(err);
    })
    mongoose.set("debug", true)
}


app.listen(PORT)