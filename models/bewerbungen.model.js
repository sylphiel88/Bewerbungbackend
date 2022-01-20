const mongoose = require('mongoose')

const BewerbungSchema = mongoose.Schema({
    datum: {
        type: Date,
        default: Date.now
    },
    compName: {
        type: String,
        required: true
    },
    compTown: {
        type: String,
        required: true
    },
    compStreet: {
        type: String,
        required: true
    },
    beworben: {
        type: Boolean
    },
    status:{
        type: String
    },
    anmerkungen:{
        type: String
    },
    color1:{
        type: String,
        default: "#000000"
    },
    color2:{
        type: String,
        default: "#808080"
    }
});

module.exports = mongoose.model('bewerbungen', BewerbungSchema, 'bewerbungen')