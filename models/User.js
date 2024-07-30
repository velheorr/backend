const {Schema, model} = require('mongoose')

const user = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        required: true,
        type: String,
    },
    position: {
        required: false,
        type: String,
    },
    auth: {
        dashboard: {
                type: Boolean,
                default: false
        },
        iboard: {
                type: Boolean,
                default: false
        },
        portal: {
                type: Boolean,
                default: false
        }
    }
})

module.exports = model('User', user)


