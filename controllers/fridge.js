// Import Dependencies
const express = require('express')
const Fridge = require('../models/fridge')

// Create router
const router = express.Router()

// Routes

// // Home Screen for non user
// router.get('/', (req, res) => {
// 	Fridge.find({ owner: req.session.userId })		
// 		.then(fridge => {
// 			const username = req.session.username
// 			const loggedIn = req.session.loggedIn
			
// 			res.render('fridge/index', { fridge, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// router.get('/json', (req, res) => {
// 	Fridge.find({})
// 		.then(fridge => {
// 			const username = req.session.username
// 			const loggedIn = req.session.loggedIn
			
// 			res.json(fridge)
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // // Homescreen for user
// router.get('/:owner/fridge', (req, res) => {
//     const { username, userId, loggedIn } = req.session
// 	Fridge.find({ owner: userId })
// 		.then(fridge => {
// 			res.render('/fridge/index', { fridge, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // // GET route that renders our page with the form for new items
// router.get('/new', (req, res) => {
// 	const { username, userId, loggedIn } = req.session
// 	res.render('fridge/new', { username, loggedIn })
// })

// // // CREATE (fridge/new) -> POST route that actually calls the db and makes a new document
// router.post('/', (req, res) => {
// 	req.body.owner = req.session.userId
// 	// req.body.ready = req.body.ready === 'on' ? true : false
// 	const newItem = req.body
// 	Fridge.create(newItem)
// 	.then(fridge => {
// 			console.log('this is req.body aka newItem, after owner\n', fridge)
// 			res.redirect(`fridge/`)
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })


// // // SHOW route
// router.get('/:id', (req, res) => {
// 	const fridgeId = req.body.id
// 	Fridge.findById(fridgeId)
// 		.then(fridge => {
// 			res.render(`fridge/${fridgeId}`, { fridge, ...req.session})
// 			console.log('EDIT FORM HAS BEEN CREATED')
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })
// //Takes me to edit
// router.get('/:id/edit', (req, res) => {
// 	const fridgeId = req.params.id
// 	Fridge.findById(fridgeId)
// 		.then(fridge => {
// 			console.log('ITEM EDIT HAS BEEN MADE')
// 			res.redirect(`/fridge`)
// 		})
// 		.catch((error) => {
// 			console.log('ITEM EDIT HAS FAILED')
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// router.get('/edit', (req, res) => {
// 	const fridgeId = req.params.id
// 	Fridge.findById(fridgeId)
// 		.then(fridge => {
// 			console.log('new edit route redirect works')
// 			res.redirect(`/edit/${fridgeId}`)
// 		})
// 		.catch((error) => {
// 			console.log('ITEM EDIT HAS FAILED')
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// router.put('/:id', (req, res) => {
// 	const fridgeId = req.params.id
// 	// req.body.ready = req.body.ready === 'on' ? true : false

// 	Fridge.findByIdAndUpdate(fridgeId, req.body, { new: true })
// 		.then(fridge => {
// 			res.redirect(`/fridge/${fridge._id}`)
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })
// // // PUT route used to update sepcific item
// // router.put('/edit/:id', (req, res) => {
// // 	const fridgeId = req.params.id
// // 	console.log('this id is:', fridgeId)
// // 	Fridge.findById(fridgeId)
// // 		.then(fridge => {
// // 			if (fridge.owner == req.session.userId){
// // 				console.log('This item was successfully updated')
// // 				res.redirect('/fridge')
// // 				return Fridge.updateOne(req.body)
// // 			} else {
// // 				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20item`)
// // 				console.log('this is the redirect')
// // 			}
// // 		})
// // 		.then(() => {
// // 			res.redirect(`/fridge/edit/${fridgeId}`)
// // 			console.log('this item has been updated')
// // 		})
// // 		.catch((error) => {
// // 			res.redirect(`/error?error=${error}`)
// // 		})
// // })


// // router.get('fridge/item', (req, res) => {
// // 	res.json('hello world')
// // 	const { username, userId, loggedIn } = req.session
// // 	res.render('fridge/item', { username, loggedIn })
// // })




// // delete route
// router.delete('/:id', (req, res) => {
// 	const fridgeId = req.params.id
// 	Fridge.findById(fridgeId)
// 		.then(fridge => {
// 			console.log('deleted')
// 			if (fridge.owner == req.session.userId){
// 				console.log('delete if statement hit')
// 				return fridge.deleteOne()
// 			} else {
// 				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20item`)
// 			}
// 		})
// 		.then(() => {
// 			res.redirect('/fridge')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// //SHOW
// // router.get("/:id", (req, res) => {
// //     const id = req.params.id
// //     Fridge.findById(id)
// // 		.populate('username')
// //         .then(fridge => {
// //             res.json({ fridge: fridge})
// //         })
// // 		.catch((error) => {
// // 			res.redirect(`/error?error=${error}`)
// // 		})
// // })
/////////////////////////////////////////

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

// index that shows only the user's fridge
router.get('/mine', (req, res) => {
    // destructure user info from req.session
	Fridge.find({ owner: req.session.userId })
		.populate('owner', 'username')
		.then(fridge => {
			res.render('fridge/index', { fridge, ...req.session})
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