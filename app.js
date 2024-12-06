console.log("Tudo ok");

const express = require("express");
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

const port = 8080;

app.listen(port, function(){
    console.log("Servidor conectado http://localhost:"+port)
})