const express = require('express');
const router = express.Router()
const path = require('path')
const app = express()
const mongoose = require('mongoose')
require('../models/Categoria')
const categoria = mongoose.model('categorias')
app.set('views', path.join(__dirname, '../views'));



router.get('/', (require, response) => {
    response.render('admin/index')
})

router.get('/posts', (require, response) => {
    response.send('Minha pagina de posts')
})

router.get('/categorias', (require, response) => {
    response.render('admin/categorias')
})

router.post('/categorias/nova', (require, response) => {

    var erros = []

    if (!require.body.nome || typeof require.body.nome == undefined || require.body.nome == null) {
        erros.push({ texto: "Nome Inválido" })
    }

    if (!require.body.slug || typeof require.body.slug == undefined || require.body.slug == null) {
        erros.push({ texto: "Slug Inválido" })
    }

    if(require.body.nome.length < 2){
        erros.push({texto: "Digir"})
    }


    const novaCategoria = {
        nome: require.body.nome,
        slug: require.body.slug
    }

    new categoria(novaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch(err => {
        console.log("erro ao salvar categoria")
    })
})

router.get('/categorias/add', (require, response) => {
    response.render('admin/addcategorias')
})

module.exports = router