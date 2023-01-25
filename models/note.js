// /////////////////////////////////////////////////////////
// //// Our schema for the comment subdocument          ////
// /////////////////////////////////////////////////////////
// const express = require('express')
// const Fridge = require('../models/fridge')
// const mongoose = require('../utils/middleware')

// const router = express.Router()
// // All we need from mongoose, to build subdocuments
// // is the schema constructor. 
// // SUBDOCUMENTS ARE NOT MONGOOSE MODELS.
// // we'll destructure the Schema function from mongoose
// const { Schema } = mongoose

// // note schema
// const noteSchema = new Schema({
//     note: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// })

// // Take note that there is no model function happening anywhere in this file. That's because SUBDOCS ARE NOT MONGOOSE MODELS.

// ////////////////////////////////////
// //// Export our Schema          ////
// ////////////////////////////////////
// module.exports = noteSchema