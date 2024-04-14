const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    RoleAdmin: { type: Boolean, require, default: true }

}, {
    timestamps: true,
})

const User= mongoose.model('User', userSchema)

module.exports = User