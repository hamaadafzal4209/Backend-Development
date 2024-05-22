const express = require('express');
const app = express();

const userModel = require('./model/user');
const postModel = require('./model/posts');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello");
});

app.get('/create', async (req, res) => {
    const createdUser = await userModel.create({
        username: "hamaad",
        email: "hamaad@gmail.com",
        age: "20",
    });
    res.send(createdUser);
});

app.get('/post/create', async (req, res) => {
    let createdPost = await postModel.create({
        postData: "Hello All Posts",
        user: "664cd14a7b355d8393ee0593"
    });

    let user = await userModel.findOne({ _id: "664cd14a7b355d8393ee0593" });
    if (user) {
        user.posts.push(createdPost._id);
        await user.save();
        res.send(createdPost);
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
