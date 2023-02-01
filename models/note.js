// /////////////////////////////////////////////////////////
// //// Our schema for the comment subdocument          ////
// /////////////////////////////////////////////////////////
// const mongoose = require('../utils/middleware')

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
//     },
//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
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