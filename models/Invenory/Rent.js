const {Schema, model} = require('mongoose')

const rent = new Schema({
    inventory: {
        type: String,
        required: true
    },
    person: {
        type: String,
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
    },

})

module.exports = model('rent', rent)


