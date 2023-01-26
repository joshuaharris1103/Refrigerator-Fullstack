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

// index that shows only the user's examples
router.get('/', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Fridge.find({ owner: userId })
		.then(fridge => {
			res.render('/fridge/index', { fridge, username, loggedIn })
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
// router.get('/mine', (req, res) => {
//     // find fruits by ownership, using the req.session info
//     Fridge.find({ owner: req.session.userId })
//         .populate('owner', 'username')
//         .then(fridge => {
//             res.render('fruits/index', { fruits, ...req.session })
//         })
//         .catch(err => {
//             // otherwise throw an error
//             console.log(err)
//             // res.status(400).json(err)
//             res.redirect(`/error?error=${err}`)
//         })
// })

// router.get('/json', (req, res) => {
//     // find fruits by ownership, using the req.session info
//     Fruit.find({ owner: req.session.userId })
//         .populate('owner', 'username')
//         .then(fridge => {
//             // if found, display the fruits
//             res.status(200).json({ fridge: fridge })
//         })
//         .catch(err => {
//             // otherwise throw an error
//             console.log(err)
//             res.status(400).json(err)
//         })
// })

// edit route -> GET that takes us to the edit form view
router.get('/edit/:id', (req, res) => {
	// we need to get the id
	const fridgeId = req.params.id
	Fridge.findById(fridgeId)
		.then(fridge => {
			console.log('server is recieving get request')
			res.render('fridge/edit', { fridge, ...req.session })
		})
		.catch((error) => {
			console.log('server is not recieving get request')
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const id = req.params.id
	// req.body.ready = req.body.ready === 'on' ? true : false
	Fridge.findByIdAndUpdate(id, req.body)
		.then(fridge => {
			if (fridge.owner == req.session.userId){
				return fridge.updateOne(req.body)
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20item`)
			}
		})
		then(()=>{
			res.redirect(`/fridge/${id}`)
		})
		.catch((error) => {
			console.log('server is not recieving get request')
			res.redirect(`/error?error=${error}`)
		})
})

// show route
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

// delete route
router.delete('fridge/:id', (req, res) => {
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
		.then(id => {
			res.redirect('/fridge')
		})
		.catch(error => {

			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
