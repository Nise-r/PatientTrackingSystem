//loads variables from .env

require('dotenv').config()


let PORT = process.env.PORT
let MONGODB_URI=process.env.MONGODB_URI
let APIKEY = process.env.APIKEY

module.exports = {
	PORT,
	MONGODB_URI,
	APIKEY
}