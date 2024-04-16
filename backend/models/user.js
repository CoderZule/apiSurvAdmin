const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    Firstname: { type: String, require },
    Lastname:{ type: String, require },
    Cin:{ type: String, require },
    Email: { type: String, require },
    Password: { type: String, require },
    RoleAdmin: { type: Boolean, require, default: true }

}, {
    timestamps: true,
})

const User= mongoose.model('User', userSchema)

module.exports = User