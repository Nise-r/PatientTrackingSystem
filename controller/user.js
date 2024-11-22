const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const Patient = require('../models/patients')


userRouter.get('/',async (request,response)=>{
	const users = await User.find({}).populate('patients',{name:1,data:1})
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

module.exports = userRouter