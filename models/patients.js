//defining schema for project
const mongoose = require('mongoose')

const medicalSchema  = new mongoose.Schema({
		heartRate:Number,
	    bloodPressure:
	      { systolic: Number, diastolic: Number},
	    oxygenLevel:Number,
	    previousPrescriptions: String,
	    patientComments: String,
	    glucoseLevel:Number,
	    temperature: Number,
	    pain:Number,
})

const patientSchema = new mongoose.Schema({
	name:{
		type:String
	},
    phone:{
    	type:Number
    },
    height: Number,
    weight: Number,
    bmi: Number,
    data:{
	  type: Map,
	  of: medicalSchema,
	  required: false
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
})



patientSchema.set('toJSON',{
	transform:(document,returnedObject)=>{
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Patients',patientSchema)