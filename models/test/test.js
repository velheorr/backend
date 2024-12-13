const {Schema, model} = require('mongoose')

const testUsers = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: Boolean,
    },
    date: {
        type: String,
        required: true
    },

})

module.exports = model('TestUsers', testUsers)