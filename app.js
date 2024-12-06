console.log("Tudo ok");


const express = require("express")
const app = express()
const path = require("path")
const port =8080;



app.get('/', (req,res) => {
    res.sendFile(__dirname+ "/index.html")
}) 

app.use(express.static(path.join(__dirname, "assets")))



app.listen(port, function(){
    console.log("Servidor conectado http://localhost:" + port)
})