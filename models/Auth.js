const {Schema, model} = require('mongoose')

const auth = new Schema({
    name: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },

})

module.exports = model('Auth', auth)

