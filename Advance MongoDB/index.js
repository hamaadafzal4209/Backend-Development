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

// insert many function

app.get("/createMany", async (req, res, next) => {
    try {
        const allUsers = await userModel.insertMany(dummyUsers);
        res.send(allUsers);
    } catch (error) {
        next(error);
    }
});

// eq operator

app.get("/equal", async (req, res) => {
    const users = await userModel.find({age : {$eq: 30}})
    res.json(users)
})

// ne operator

app.get("/notequal", async (req, res) => {
    const users = await userModel.find({age : {$ne: 30}})
    res.json(users)
})

// lt operator

app.get("/lessthen", async (req, res) => {
    const users = await userModel.find({age : {$lt: 29}})
    res.json(users)
})

// lte operator

app.get("/lessthenorequal", async (req, res) => {
    const users = await userModel.find({age : {$lte: 28}})
    res.json(users)
})

// gt operator

app.get("/greaterthen", async (req, res) => {
    const users = await userModel.find({age : {$gt: 28}})
    res.json(users)
})

// gte operator

app.get("/greaterthenorequal", async (req, res) => {
    const users = await userModel.find({age : {$gte: 28}})
    res.json(users)
})

// in operator

app.get("/in", async (req, res) => {
    const users = await userModel.find({age : {$in: [25,27,30,35]}})
    res.json(users)
})


app.listen(3000, () => {
    console.log('Connected to server');
});
