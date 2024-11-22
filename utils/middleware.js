//middleware to add in between requests and response

const logger = require('./logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = request =>{
	const authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer ')){
		return authorization.replace('Bearer ','')
	}
	return null
}

const requestLogger = (request,response,next)=>{
	logger.info('Method: ', request.method)
	logger.info('Path: ',request.path)
	logger.info('Body: ',request.body)
	logger.info('---')
	next()
}
// const tokenChecker = (request,response,next)=>{
// 	const body = request.body
// 	  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
// 	  if(!decodedToken.id){
// 	  	return response.status(401).json({error:'token invalid'})
// 	  }
// 	  next()
// }

const unknownEndpoint = (request,response)=>{
	response.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (error,request,response,next)=>{
	logger.error(error.message)
	if(error.name ==='CastError'){
		return response.status(400).send({error:'malformatted id'})
	}else if(error.name === 'ValidationError'){
		return response.status(400).send({error:error.message})
	}else if(error.name ==='MongoServerError' && error.message.include('E11000 duplicate key error')){
		return response.status(400).json({error:'username must be unique'})
	}else if(error.name ==='JsonWebTokenError'){
		return response.status(401).json({error:'invalid token'})
	}else if(error.name === 'TokenExpiredError'){
		return response.status(401).json({error:'token expired'})
	}
	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	// tokenChecker
}