const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationships')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts: [
        {
            content: String,
            date: {
                type : Date,
                default: Date.now(),
            }
        }
    ]
})

module.exports = mongoose.model('User', userSchema);