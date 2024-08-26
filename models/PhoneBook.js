const {Schema, model} = require('mongoose')

const phoneBook = new Schema({
    /*name: {
        type: String,
        unique: true,
        required: true
    },*/
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    dep: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    org: {
        type: String,
    },


})

module.exports = model('PhoneBook', phoneBook)


