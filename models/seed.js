/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('../utils/connection')
const Fridge = require('./fridge')


/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////
const db = mongoose.connection

db.on('open', () => {
    const startFridge = [
        { item: 'eggs', quantity: 12, dateAdded: 11/21/22 , expiration: 11/25/22 },
        { item: 'Bacon', quantity: 24, dateAdded: 11/21/22, expiration: 01/30/23 },
        { item: 'Milk', quantity: 2 , dateAdded: 11/21/22, expiration: 01/30/23 },
        { item: 'OJ', quantity: 1, dateAdded: 11/21/22, expiration: 01/30/23 },
        { item: 'Cheese', quantity: 8, dateAdded: 11/21/22, expiration: 01/30/23},
       
    ]
   
    Fridge.deleteMany({ owner: null })
        .then(() => {
            Fridge.create(fridgeFruits)
                .then(data => {
                    console.log('here are the created items: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})