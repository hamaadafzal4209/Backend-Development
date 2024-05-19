const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./model/user.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/read", async (req, res) => {
    let allUsers = await userModel.find();
    res.render("read", { users: allUsers });
});

app.get("/delete/:id", async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

app.get("/edit/:userId", async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userId });
    res.render('edit', { user: user });
});

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect('/read');
});

app.post("/update/:userId", async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.userId, { name, email, image });
    res.redirect('/read');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
