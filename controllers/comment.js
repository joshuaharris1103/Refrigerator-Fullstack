/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Fridge = require('../models/properties')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

router.post('/:id', (req, res) => {
    const fridgeId = req.params.fridgeId
    console.log('this is the session\n', req.session)
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
        const theComment = req.body
        Fridge.findById(fridgeId)
            .then(fridge => {
                fridge.comments.push(theComment)
                return fridge.save()
            })
            .then(fridge => {
                res.redirect(`/fridge/${fridge.id}`)
            })
            .catch(err => {
                console.log(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20item`)
    }
})


router.delete('/delete/:fridgeId/:commId', (req, res) => {
    const {
        fridgeId,
        commId
    } = req.params
    Fridge.findById(fridgeId)
        .then(fridge => {
            const theComment = fridge.comments.id(commId)
            console.log('this is the comment to be deleted: \n', theComment)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    fridge.save()
                    res.redirect(`/fridge/${fridge.id}`)
                } else {
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
                }
            } else {
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router