const {Schema, model} = require('mongoose')

const resetPassword = new Schema({
    tempLink: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

module.exports = model('ResetPassword', resetPassword)

