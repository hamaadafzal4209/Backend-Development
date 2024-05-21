const express = require('express');
const app = express();

app.get("/", (req,res) => {
    res.cookie("name","hamaad")
    res.send("Done")
})

app.listen(3000);