// iniciar o projeto: node app.js
/**
 * npm init -y
 * Instalar depedencias
 * express npm install express
 * sequelize npm install sequelize
 * nodemon npm install nodemon
 * body parser npm install body-parser
 * handlebars npm install express-handlebars
 */

console.log('ok')

const express = require('express')
const app = express()
const port = 8000

const path = require('path');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.use(express.static(path.join(__dirname,"assets")))

app.listen(port, function(){
    console.log(`Servidor conectado http://localhost:${port}`)
})