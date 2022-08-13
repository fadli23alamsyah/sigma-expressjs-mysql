const dotenv = require('dotenv')

dotenv.config({path: './.env'})

module.exports = {
    host: process.env.HOSTDB,
    user: process.env.USERNAMEDB,
    password: process.env.PASSWORDDB,
    database: process.env.DBNAME
}