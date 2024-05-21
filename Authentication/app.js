const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

// app.get("/", (req,res) => {
//     res.cookie("name","hamaad")
//     res.send("Done")
//     console.log(req.cookies);
// })

// app.get("/", (req, res) => {
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash('djskdhshdkjhsdjshjdkh', salt, function(err, hash) {
//           console.log(hash);
//         });
//     });
// })

// app.get('/', (req, res) => {
//     res.send("Working!")
//     bcrypt.compare("djskdhshdkjhsdjshjdkh", "$2b$10$gNsay9y3httKzvBblEFofuTXRWXZc2TejS9LUVwmkMJrIG.w0Yhia", function(err, result) {
//         console.log(result);
//     });
// })

app.get('/', (req, res) => {
    res.send("Working!")
    let token = jwt.sign({email: 'test@example.com'}, 'dhsdjkhskjdhkjshdiuywehdsjkhsajkdhsajk')
    console.log(token);
    res.cookie("token", token)
})

app.get('/read', (req, res) => {
    res.send("Reading!")
    let data = jwt.verify(req.cookies.token, "dhsdjkhskjdhkjshdiuywehdsjkhsajkdhsajk")
    console.log(data);
})

app.listen(3000);