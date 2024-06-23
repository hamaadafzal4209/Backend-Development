const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userModel = require("./models/userModel.js");
const postModel = require("./models/postModel.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/relationships")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.post("/create", async (req, res) => {
  const createdUser = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  res.json(createdUser);
});

app.post("/:username/create/post", async (req, res) => {
    const user = await userModel.findOne({ username: req.params.username });

    const createdPost = await postModel.create({
        content: "jdkjskdjsklj",
        userId: user._id,
    })  

    user.posts.push(createdPost);
    await user.save();
    
    res.send({user, createdPost});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
