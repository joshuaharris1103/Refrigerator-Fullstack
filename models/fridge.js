// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const noteSchema = require ('./note')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const fridgeSchema = new Schema(
	{
		item: { 
			type: String,
			required: true },
        quantity: { 
			type: Number,
			required: true },
		dateAdded: { 
			type: Date,
			required: true },
		expiration: { 
			type: Date,
			required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		note: [noteSchema]
	},{ timestamps: true })

const Fridge = model('Fridge', fridgeSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Fridge
