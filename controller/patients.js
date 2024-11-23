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
	const patients = await Patients.find({}).populate('user',{phone:1,name:1})
	response.json(patients)
})

patientRouter.get('/:id',async (request,response)=>{
	const id = request.params.id

  const patient = await Patients.find({'name':id})
  response.json(patient)
})


patientRouter.post('/doctor', async (request, response,next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  if(!decodedToken.id){
  	return response.status(401).json({error:'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
  //decoded token contain username, id and iat
  const patient  = await Patients.findOneAndUpdate({'name':body.name,'phone':body.phone},{user:user.id})

  user.patients = user.patients.concat(patient._id)
  await user.save()

  response.status(201).json(patient)

})

//prescription
patientRouter.post('/comment', async (request, response,next) => {
  const body = request.body
  console.log(body)
  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error:'token invalid'})
  }
  const today = new Date()
  const curr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
  // const curr = "21-10-2024"
  const patient  = await Patients.findOne({'name':body.name})
  // console.log(patient.data)
  const patientDates = Array.from(patient.data.keys())
  // console.log(patientDates)
  if(patientDates.includes(curr)){
    // console.log(patient.data.get(curr).bloodPressure.systolic)
    const newMedical = {
      heartRate:patient.data.get(curr).heartRate,
      bloodPressure:{systolic:patient.data.get(curr).bloodPressure.systolic,diastolic:patient.data.get(curr).bloodPressure.diastolic},
      oxygenLevel:patient.data.get(curr).oxygen,
      patientComments:patient.data.get(curr).patientComments,
      previousPrescriptions:body.comment,
      glucoseLevel:patient.data.get(curr).glucose,
      temperature:patient.data.get(curr).temperature,
      pain:patient.data.get(curr).pain
    }
    const updates = {
      height:patient.height,
      weight:patient.weight,
      bmi:patient.bmi,
      [`data.${curr}`]: newMedical,
    }
    const savedPatient = await Patients.findOneAndUpdate({'name':body.name},
      { $set: updates }, { new: true })
    // console.log(savedPatient)
    response.status(201).json(savedPatient)
    // response.json({error:"done"})
  }
  else{
    const newMedical = {
        previousPrescriptions:body.comment,
    }
    const updates = {
      height:body.height,
      weight:body.weight,
      bmi:body.bmi,
      [`data.${curr}`]: newMedical,
    }
    
    const savedPatient = await Patients.findOneAndUpdate({'name':body.name},
      { $set: updates },{new: true})
    // console.log(decodedToken)
    response.status(201).json(savedPatient)
  }
  

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