const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique:true,
	},
	name:String,
	passwordHash:String,
	patients:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Patients',
		validate:{
			validator:async function(value){
				if(value==null) return true
				const existingPatients = await this.model('User').find({
					_id:{$ne: this._id},
					patients:{$in:[value]}
				})
				return existingPatients.length===0
			},
			message:"patient already exist in doctor list",

		}
	}],
	phone:Number,
	email:String,
	type:String

})
 userSchema.set('toJSON',{
 	transform:(document,returnedObject)=>{
 		returnedObject.id = returnedObject._id.toString()
 		delete returnedObject._id
 		delete returnedObject.__v
 		delete returnedObject.passwordHash
 	}
 })

 const User = mongoose.model('User',userSchema)

 module.exports = User