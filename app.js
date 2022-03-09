//carrgando módulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { handle } = require('express/lib/application')
const mongoose = ('mongoose')

//configurações

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Hnadlebars
const hbs = handlebars.create({defaultLayout: 'main'})
app.engine('handlebars', () => hbs)

//mongoose


//Rotas

//Outros

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Servidor estartado na porta ${PORT}`)
})

