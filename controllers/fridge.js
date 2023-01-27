// Import Dependencies
const express = require('express')
const Fridge = require('../models/fridge')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })

// Routes

// Home Screen
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

//(edit page???)
router.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	Fridge.find({ owner: userId })
		.then(fridge => {
			res.render('/fridge/index', { fridge, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// GET route that renders our page with the form for new items
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('fridge/new', { username, loggedIn })
})

// create (fridge/new) -> POST route that actually calls the db and makes a new document
router.post('/', async (req, res) => {
	req.body.owner = req.session.userId
	// req.body.ready = req.body.ready === 'on' ? true : false
	const newItem = req.body
	console.log('this is req.body aka newItem, after owner\n', newItem)
	Fridge.create(newItem)
		.then(fridge => {
			res.redirect(`fridge/`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// This Get route allows us to SEE edit page
router.get('/:id', (req, res) => {
	const id = req.body.id
	Fridge.findById(id)
		.then(fridge => {
			const {username, loggedIn, userId} = req.session
			res.render('fridge/edit', { fridge, ...req.session})
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// PUT route used to update sepcific item
router.get('/:id/edit', (req, res) => {
	const fridgeId = req.body.id
	Fridge.findById(fridgeId)
		.then(fridge => {
			res.render('/edit', { fridge, ...req.session })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// PUT route used to update sepcific item
router.put('/:id', (req, res) => {
	const id = req.params.id
	console.log(req.body)
	// const fridgeId = req.body.id
	// req.body.ready = req.body.ready === 'on' ? true : false
	Fridge.findByIdAndUpdate(id, req.body)
		.then(fridge => {
			if (fridge.owner == req.session.userId){
				return fridge.updateOne(req.body)
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20item`)
			}
		})
		.then(()=>{
			res.redirect(`/fridge`)
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
			console.log('deleted')
			if (fridge.owner == req.session.userId){
				return fridge.deleteOne
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20item`)
			}
		})
		.then(() => {
			res.redirect('/fridge')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
