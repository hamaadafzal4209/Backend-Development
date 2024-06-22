const express = require("express");
const app = express();
const dummyUsers = require("./utils/data.js");
const userModel = require("./models/user.js");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/operation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/", (req, res, next) => {
  res.send("Working");
});

// Insert many users
app.get("/createMany", async (req, res, next) => {
  try {
    const allUsers = await userModel.insertMany(dummyUsers);
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

// $eq operator
app.get("/equal", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $eq: 30 } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $ne operator
app.get("/notequal", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $ne: 30 } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $lt operator
app.get("/lessthan", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $lt: 29 } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $lte operator
app.get("/lessthanorequal", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $lte: 28 } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $gt operator
app.get("/greaterthan", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $gt: 28 } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $gte operator
app.get("/greaterthanorequal", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $gte: 28 } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $in operator
app.get("/in", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $in: [25, 27, 30, 35] } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $nin operator
app.get("/nin", async (req, res, next) => {
  try {
    const users = await userModel.find({ age: { $nin: [25, 27, 30, 35] } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// $exists operator
app.get("/exists", async (req, res, next) => {
  try {
    const users = await userModel.find({ isAdmin: { $exists: true } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => {
  console.log("Connected to server");
});
