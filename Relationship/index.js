const express = require('express')
const app = express()
const userModel = require('./models/userModel.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.post('/create', async (req, res) => {
    const createdUser = await userModel.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
    })

    res.json(createdUser);
})

app.post('/:username/create/post', async (req, res) => {
    let user = await userModel.findOne({username : req.params.username});
    user.posts.push({
        content : "new post" 
    })
    user.save();
    res.json(user);
})

app.listen(3000)