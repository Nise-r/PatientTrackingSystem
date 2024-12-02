const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const patientRouter = require('./controller/patients')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const imageRouter = require('./controller/image')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const multer = require('multer') 
const path = require('path')



mongoose.set('strictQuery',false)


logger.info('connecting to',config.MONGODB_URI)

const connectDB = async () =>{
	try{
		await mongoose.connect(config.MONGODB_URI)
		console.log('connected')
	}catch(error){
		console.log(error)
	}
	
}
connectDB()

// mongoose.connect(config.MONGODB_URI).then(result=>{
// 	console.log('connected to MONGODB')
// }).catch(error=>{
// 	logger.error('error connecting to MONGODB',error.message)
// })


app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(middleware.requestLogger)
// app.use(middleware.tokenChecker)

app.use('/api/patients',patientRouter)
app.use('/api/user',userRouter)
app.use('/api/login',loginRouter)
app.use('/api/user',imageRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
