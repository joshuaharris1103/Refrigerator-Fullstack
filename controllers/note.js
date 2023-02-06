// /////////////////////////////////////
// //// Import Dependencies         ////
// /////////////////////////////////////
// const express = require('express')
// const Fridge = require('../models/fridge')

// /////////////////////////////////////
// //// Create Router               ////
// /////////////////////////////////////
// const router = express.Router()

// //////////////////////////////
// //// Routes               ////
// //////////////////////////////
// // 
// // POST -> `/note/<someFridgeId>`
// router.post('/:fridgeId', (req, res) => {

//     const fridgeId = req.params.fridgeId

//     console.log('this is the session\n', req.session)
//     if (req.session.loggedIn) {
//         req.body.author = req.session.userId
//         const theNote = req.body
//         Fridge.findById(fridgeId)
//             .then(fridge => {
//                 fridge.note.push(theNote)
//                 return fridge.save()
//             })
//             .then(fridge => {
//                 res.redirect(`/fridge/${fridge.id}`)
//             })
//             .catch(err => {
//                 console.log(err)
//                 res.redirect(`/error?error=${err}`)
//             })
//     } else {
//         res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20fridge`)
//     }
// })

// // DELETE -> `/note/delete/<someFridgeId>/<someCommentId>`
// router.delete('/delete/:fridgeId/:noteId', (req, res) => {
//     const {
//         fridgeId,
//         noteId
//     } = req.params
//     Fridge.findById(fridgeId)
//         .then(fridge => {
//             const theNote = Fridge.notes.id(noteId)
//             console.log('this is the comment to be deleted: \n', theNote)
//             if (req.session.loggedIn) {
//                 if (theNote.author == req.session.userId) {
//                     theNote.remove()
//                     fridge.save()
//                     res.redirect(`/fridge/${fridge.id}`)
//                 } else {
//                     res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
//                 }
//             } else {
//                 res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.redirect(`/error?error=${err}`)
//         })
// })


// //////////////////////////////
// //// Export Router        ////
// //////////////////////////////
// module.exports = router