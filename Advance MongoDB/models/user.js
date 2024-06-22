const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    email: String,
    isMarried: Boolean
})

module.exports = mongoose.model('User', userSchema);