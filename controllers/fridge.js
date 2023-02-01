// Import Dependencies
const express = require('express')
const { findOneAndUpdate } = require('../models/fridge')
const Fridge = require('../models/fridge')

// Create router
const router = express.Router()

// Routes

// Home Screen for non user
router.get('/', (req, res) => {
	Fridge.find({ owner: req.session.userId })		
		.then(fridge => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('fridge/index', { fridge, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

router.get('/json', (req, res) => {
	Fridge.find({})
		.then(fridge => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.json(fridge)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// // Homescreen for user
router.get('/:owner/fridge', (req, res) => {
    const { username, userId, loggedIn } = req.session
	Fridge.find({ owner: userId })
		.then(fridge => {
			res.render('/fridge/index', { fridge, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// // GET route that renders our page with the form for new items
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('fridge/new', { username, loggedIn })
})

// // CREATE (fridge/new) -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.owner = req.session.userId
	// req.body.ready = req.body.ready === 'on' ? true : false
	const newItem = req.body
	Fridge.create(newItem)
	.then(fridge => {
			console.log('this is req.body aka newItem, after owner\n', fridge)
			res.redirect(`fridge/`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// // This Get route allows us to SEE edit form for specific item
router.get('/:id', (req, res) => {
	const fridgeId = req.body.id
	Fridge.findById(fridgeId)
		.then(fridge => {
			const {username, loggedIn, userId} = req.session
			res.render('fridge/edit', { fridge, ...req.session})
			console.log('EDIT FORM HAS BEEN CREATED')
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})
// // PUT route used to update sepcific item
router.put('/edit/:id', (req, res) => {
	const fridgeId = req.params.id
	console.log('this id is:', fridgeId)
	Fridge.findById(fridgeId)
		.then(fridge => {
			if (fridge.owner == req.session.userId){
				console.log('This item was successfully updated')
				return Fridge.findOneAndUpdate(req.body)
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20item`)
				console.log('this is the redirect')
			}
		})
		.then(() => {
			res.redirect(`/fridge/edit/${fridgeId}`)
			console.log('this item has been updated')
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

router.get('/edit/:id', (req, res) => {
	const fridgeId = req.params.id
	Fridge.findById(fridgeId)
		.then(fridge => {
			console.log('ITEM EDIT HAS BEEN MADE')
			res.redirect(`../${fridgeId}`)
		})
		.catch((error) => {
			console.log('ITEM EDIT HAS FAILED')
			res.redirect(`/error?error=${error}`)
		})
})
// router.get('fridge/item', (req, res) => {
// 	res.json('hello world')
// 	const { username, userId, loggedIn } = req.session
// 	res.render('fridge/item', { username, loggedIn })
// })




// delete route
router.delete('/:id', (req, res) => {
	const fridgeId = req.params.id
	Fridge.findById(fridgeId)
		.then(fridge => {
			console.log('deleted')
			if (fridge.owner == req.session.userId){
				console.log('delete if statement hit')
				return fridge.deleteOne()
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

//SHOW
// router.get("/:id", (req, res) => {
//     const id = req.params.id
//     Fridge.findById(id)
// 		.populate('username')
//         .then(fridge => {
//             res.json({ fridge: fridge})
//         })
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// Export the Router
module.exports = router