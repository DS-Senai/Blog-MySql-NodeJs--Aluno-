/**
 * Express - npm install express
 * Sequelize - npm install sequelize
 * nodemom - npm install nodemom
 * Body-parser - npm install body-parser
 * handlebars - npm install handlebars
 */


const express = require('express')
const { dirname } = require('path')
const app = express()
const path = require('path')
const port = 8080




app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html")
})



app.listen(8080,function(){
    console.log("Servidor conectado  http://localhost:"+port)
})