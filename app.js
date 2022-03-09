//carregando módulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = ('mongoose')
const admin = require('./routes/admin')
const path = require('path')

//configurações

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Hnadlebars
const hbs = handlebars.create({defaultLayout: 'main'})
app.engine('handlebars', () => hbs)
app.set('view engine', 'handlebars');


//mongoose

//public 
app.use(express.static(path.join(__dirname, 'public')))


//Rotas
app.use('/admin', admin)

//Outros

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Servidor estartado na porta ${PORT}`)
})

