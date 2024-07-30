const {Schema, model} = require('mongoose')

const authLog = new Schema({
    name: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },

})

module.exports = model('AuthLog', authLog)

