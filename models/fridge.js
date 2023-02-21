// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const commentSchema = require ('./comment')

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
			type: Date },
		expiration: { 
			type: Date },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		comments: [commentSchema]
	},{ timestamps: true })

const Fridge = model('Fridge', fridgeSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Fridge
