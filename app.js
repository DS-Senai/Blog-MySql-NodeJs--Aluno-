/*
 iniciar o projeto
 criar projeto utiliza o npm init -y
 instalar dependencias
 express - npm install express
 sequelize - npm install sequelize 
 nodemon - npm install nodemon
 body-parser -  npm install body-parser
 handlebars - npm install express-handlebars

*/

const express = require('express');
const port = 8083;
const path = require('path');
app = express();

app.use(express.static(path.join(__dirname + '/assets')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html" );
})
app.listen(port, () =>  console.log(`servidor conectado https://localhost:${port}`));


