const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// const opencage = require('opencage-api-client')


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

	// opencage.geocode({ q: 'skit, ramnagaria, jaipur, rajasthan,india' }).then((data) => {
	//   console.log(data.results[0].geometry)
	//   // { "lat": 49.2909409, "lng": -123.024879 }
	// }).catch((error) => { console.warn(error.message) })

	response.status(200).send({token:token,username:user.username,name:user.name,phone:user.phone,type:user.type,email:user.email,address:user.address,routine:user.routine})
})



module.exports = loginRouter