const mongoose = require("mongoose")


const respondSchema = new mongoose.Schema({
    msg: {
        type: String
    }
})

module.exports = mongoose.model('respond',respondSchema)