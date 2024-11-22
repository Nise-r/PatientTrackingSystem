//contains all routes of api
const patientRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Patients = require('../models/patients')
const User = require('../models/user')

// noteRouter.get('/',(request,response)=>{
// 	response.send('<h1>Hello World</h1>')
// })

const getTokenFrom = request =>{
	const authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer ')){
		return authorization.replace('Bearer ','')
	}
	return null
}

patientRouter.get('/',async (request,response)=>{
	const patients = await Patients.find({}).populate('user',{username:1,name:1})
	response.json(patients)
})

// patientRouter.get('/:id',(request,response,next)=>{
// 	const id = request.params.id

// 	Patients.findById(id).then(note=>{
// 		if(note) response.json(note)
// 		else response.status(404).end()
// 	}).catch(error=>next(error))
// })


patientRouter.post('/doctor', async (request, response,next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  if(!decodedToken.id){
  	return response.status(401).json({error:'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
  //decoded token contain username, id and iat
  const patient  = await Patients.findOneAndUpdate({'name':body.name,'phone':body.phone},{user:user.id})

  // const note = new Note({
  //   	content:body.content,
  //   	important: body.important,
  //   	user:user.id
  //   })
  // const savedNote = await note.save()
  // console.log(patient)
  // console.log(body)
  user.patients = user.patients.concat(patient._id)
  await user.save()

  response.status(201).json(patient)

})

patientRouter.post('/', async (request, response,next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error:'token invalid'})
  }
  const today = new Date()
  const curr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`

  const patient  = await Patients.findOne({'name':decodedToken.name,'phone':decodedToken.phone})
  const newMedical = {
      heartRate:body.heartRate,
      bloodPressure:{systolic:body.systolic,diastolic:body.diastolic},
      oxygenLevel:body.oxygen,
      patientComments:body.comment,
      glucoseLevel:body.glucose,
      temperature:body.temperature,
      pain:body.pain
  }
  const updates = {
    height:body.height,
    weight:body.weight,
    bmi:body.bmi,
    [`data.${curr}`]: newMedical,
  }
  
  //decoded token contain username, id and iat
  // const newPatient = {
  //   	height:body.height,
  //   	weight:body.weight,
  //   	bmi:body.bmi,
  //     data:patient.data.concat({curr:newMedical})
  //   }
  // const savedPatient = await patient.save()
  const savedPatient = await Patients.findOneAndUpdate({'name':decodedToken.name,'phone':decodedToken.phone},
    { $set: updates })
  console.log(decodedToken)
  response.status(201).json(savedPatient)

})

// patientRouter.put('/:id',(request,response,next)=>{
// 	const body = request.body
// 	const note = {
// 		content:body.content,
// 		important:body.important
// 	}
// 	Note.findByIdAndUpdate(request.params.id,note,{new:true}).then(updatedNote=>{
// 		response.json(updatedNote)
// 	}).catch(error=>next(error))
// })

// patientRouter.delete('/:id',(request,response,next)=>{
// 	const id = request.params.id
// 	Note.findByIdAndDelete(id).then(result=>{
// 		response.status(204).end()
// 	}).catch(error=>next(error))
// })

module.exports = patientRouter