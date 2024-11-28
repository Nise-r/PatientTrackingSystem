const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Patient = require('../models/patients')


userRouter.get('/',async (request,response)=>{
	const users = await User.find({}).populate('patients',{name:1,phone:1})
	response.json(users)
})

userRouter.post('/',async (request,response)=>{
	const {username,name,password,phone,email,type} = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password,saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
		phone,
		email,
		type
	})
	const savedUser = await user.save()
	if(type==='patient'){
		const patient = new Patient({
			name,
			phone
		})
		const savedPatient = await patient.save()
	}
	

	response.status(201).json(savedUser)
})

const getTokenFrom = request =>{
	const authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer ')){
		return authorization.replace('Bearer ','')
	}
	return null
}


userRouter.post('/edit',async (request,response)=>{
	const {name,phone,email,address,routine} = request.body

	//checking token
	const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
	if(!decodedToken.id){
		return response.status(401).json({error:'token invalid'})
	}

	//find if user exists
	// const user = await User.findById(decodedToken.id)
	// const user  = await User.findOneAndUpdate({'name':decodedToken.name,'phone':decodedToken.phone},{user:user.id})
	const user = await User.findByIdAndUpdate(decodedToken.id,{name:name,phone:phone,email:email,address:address,routine:routine});

	

	response.status(201).json(user)
})

module.exports = userRouter