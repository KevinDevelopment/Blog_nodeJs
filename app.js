//carregando módulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const admin = require('./routes/admin')
const path = require('path')

//configurações

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Handlebars

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views');

//mongoose
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("conexão ao banco estabelecida com sucesso!")
}).catch(err => {
    console.log(`não foi possivel se concetar ai banco de dados ${err}`)
})

//public 
app.use(express.static(path.join(__dirname, 'public')))


//Rotas
app.use('/admin', admin)

//Outros

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Servidor estartado na porta ${PORT}`)
})

