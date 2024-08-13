const {Schema, model} = require('mongoose')

const licence = new Schema({
    org: {
        type: String,
        required: true
    },
    seller: {
        type: String,
    },
    vendor: {
        type: String,
        required: true
    },
    lic: {
        type: String,
    },
    key: {
        type: String,
        required: true
    },
    start: {
        type: String,
    },
    exp: {
        type: String,
    },
    info: {
        type: String,
    },
    notes: {
        type: String,
    },
    amount: {
        type: String,
    },
    status: {
        type: Boolean,
    }

})

module.exports = model('Licence', licence)


