require('dotenv').config();
const express = require("express");
const app = require("./app");

const port = process.env.PORT || 8000;

app.use(express.json())

app.get('/', (res, req)=>{
    res.send("http//:bohiba.com");
});


app.listen(port, ()=> {
    console.log(`Server working ${port}`);
});