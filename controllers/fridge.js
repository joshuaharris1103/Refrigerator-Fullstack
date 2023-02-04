// Import Dependencies
const express = require('express')
const { findOneAndUpdate } = require('../models/fridge')
const Fridge = require('../models/fridge')

// Create router
const router = express.Router()

// Routes

// index ALL
router.get('/', (req, res) => {
	Fridge.find({})
		.then(fridge => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('fridge/index', { fridge, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's fridge
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Fridge.find({ owner: userId })
		.then(fridge => {
			res.render('fridge/index', { fridge, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('fridge/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Fridge.create(req.body)
		.then(fridge => {
			console.log('this was returned from create', fridge)
			res.redirect('/fridge')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	const fridgeId = req.params.id
	Fridge.findById(fridgeId)
		.then(fridge => {
			res.render('fridge/edit', { fridge })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const fridgeId = req.params.id
	// req.body.ready = req.body.ready === 'on' ? true : false

	Fridge.findByIdAndUpdate(fridgeId, req.body, { new: true })
		.then(fridge => {
			res.redirect(`/fridge/`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const fridgeId = req.params.id
	Fridge.findById(fridgeId)
		.then(fridge => {
            const {username, loggedIn, userId} = req.session
			res.render('fridge/show', { fridge, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const fridgeId = req.params.id
	Fridge.findByIdAndRemove(fridgeId)
		.then(fridge => {
			res.redirect('/fridge')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router