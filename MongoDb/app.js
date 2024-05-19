const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    name: "hamaad",
    username: "hamaad123",
    email: "hamaad@gmail.com",
  });
  res.send(user);
});

app.get("/update", async (req, res) => {
  let user = await userModel.findOneAndUpdate(
    { username: "hamaad123" },
    { name: "hamaad afzal" },
    { new: true }
  );
  res.send(user);
});

app.get("/read", async (req, res) => {
  let user = await userModel.find();
//   let user = await userModel.find({name:'hamaad afzal'});
  res.send(user);
});

app.get("/delate", async (req, res) => {
  let user = await userModel.findOneAndDelete({name:'hamaad afzal'});
  res.send(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
