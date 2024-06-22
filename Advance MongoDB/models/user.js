const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    email: String,
    age: Number,
    isMarried: Boolean,
    isAdmin: Boolean
})

module.exports = mongoose.model('User', userSchema);