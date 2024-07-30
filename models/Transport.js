const {Schema, model} = require('mongoose')

const transport = new Schema({
    name: {
        type: String,
    },
    car: {
        type: String,
    },
    carmodel: {
        type: String,
    },
    number: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },

})

module.exports = model('Transport', transport)


