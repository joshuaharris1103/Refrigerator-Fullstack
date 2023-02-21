/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('./connection')
const Fridge = require('./fridge')


/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////
const db = mongoose.connection

db.on('open', () => {
    const startFridge = [
        { item: 'eggs', quantity: 12},
        { item: 'Bacon', quantity: 24},
        { item: 'Milk', quantity: 2},
        { item: 'OJ', quantity: 1},
        { item: 'Cheese', quantity: 8}
       
    ]
   
    Fridge.deleteMany({ owner: null })
        .then(() => {
            Fridge.create(startFridge)
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