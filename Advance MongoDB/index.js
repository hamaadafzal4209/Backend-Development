const express = require('express');
const app = express();
const dummyUsers = require('./utils/data.js');
const userModel = require('./models/user.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/operation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.get("/", (req, res, next) => {
    res.send("Working");
});

app.get("/createMany", async (req, res, next) => {
    try {
        const allUsers = await userModel.insertMany(dummyUsers);
        res.send(allUsers);
    } catch (error) {
        next(error);
    }
});

app.listen(3000, () => {
    console.log('Connected to server');
});
