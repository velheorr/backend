const {Schema, model} = require('mongoose')

const iptables = new Schema({
    ip: {
        type: Number,
        required: true
    },
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    info: {
        type: String,
    },
    notes: {
        type: String,
    },
})

module.exports = model('iptables', iptables)


