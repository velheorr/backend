const {Schema, model} = require('mongoose')

const rent = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    price: {
        type: String,
    },
    inventory: {
        type: String,
    },
    factory: {
        type: String,
    },
    date: {
        type: String,
    },
})

module.exports = model('rent', rent)


