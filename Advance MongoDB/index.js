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

// app.get("/createMany", async (req, res, next) => {
//     try {
//         const allUsers = await userModel.insertMany(dummyUsers);
//         res.send(allUsers);
//     } catch (error) {
//         next(error);
//     }
// });

// er operator

app.get("/users", async (req, res) => {
    const users = await userModel.find({age : {$eq: 30}})
    res.json(users)
})


app.listen(3000, () => {
    console.log('Connected to server');
});
