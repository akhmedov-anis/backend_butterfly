const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    MONGO_LOGIN: process.env.MONGO_LOGIN,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD
}