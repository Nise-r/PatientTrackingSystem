const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	date:String,
	name:String,
	photo:{
		type:String
	}

})

imageSchema.set('toJSON',{
	transform:(document,returnedObject)=>{
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

 const Image = mongoose.model('Image',imageSchema)

 module.exports = Image