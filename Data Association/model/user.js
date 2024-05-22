const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testingdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
    ],
});

module.exports = mongoose.model("user", userSchema);