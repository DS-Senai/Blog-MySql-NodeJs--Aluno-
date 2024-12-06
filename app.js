// Iniciar o projeto: node app.js


// Criar projeto utiliza o npm init -y
// Instalar Dependencias:

// Express - npm install express --save
// Sequelize - npm install sequelize --save
// Nodemon - npm install
// Body-parser
// handlebars

// console.log("Tudo ok")

const express = require("express");
const app = express();
const path = require('path');

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.use(express.static(path.join()))

const port = 8080;

app.listen(port, function () {
    console.log("Servidor conectado http://localhost:"+port)
})