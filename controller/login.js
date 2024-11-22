const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


loginRouter.post('/',async (request,response)=>{
	const { username, password} = request.body
	const user = await User.findOne({username})
	const passwordCorr = user === null ?false:await bcrypt.compare(password,user.passwordHash)

	if(!(user && passwordCorr)){
		return response.status(401).json({error:"invalid username or password"})
	}
	const userForToken = {
		username: user.username,
		name:user.name,
		phone:user.phone,
		id: user._id
	}
	const token =  jwt.sign(
		userForToken,
		process.env.SECRET,
		{expiresIn:60*60}
	)

	response.status(200).send({token:token,username:user.username,name:user.name,phone:user.phone,type:user.type})
})

module.exports = loginRouter