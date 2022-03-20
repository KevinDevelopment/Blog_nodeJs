const express = require('express');
const router = express.Router()
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const { response } = require('express');
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
    categoria.find().lean().sort({ date: 'desc' }).then((categorias) => {
        response.render('admin/categorias', { categorias: categorias })
    }).catch(() => {
        require.flash("error_msg", "houve um erro ao listar as categorias")
        response.redirect("/admin")
    })

})

router.post('/categorias/nova', (require, response) => {

    var erros = []

    if (!require.body.nome || typeof require.body.nome == undefined || require.body.nome == null) {
        erros.push({ texto: "Nome Inválido" })
    }

    if (!require.body.slug || typeof require.body.slug == undefined || require.body.slug == null) {
        erros.push({ texto: "Slug Inválido" })
    }

    if (require.body.nome.length < 2) {
        erros.push({ texto: "nome da categoria muito pequeno" })
    }

    if (erros.length > 0) {
        response.render("admin/addcategorias", { erros: erros })
    } else {
        const novaCategoria = {
            nome: require.body.nome,
            slug: require.body.slug
        }

        new categoria(novaCategoria).save().then(() => {
            require.flash("success_msg", "categoria criada com sucesso")
            response.redirect("/admin/categorias")
        }).catch(err => {
            require.flash("error_msg", "nao foi possivel cadastrar")
            require.redirect("/admin")

        })

    }



})

router.get("/categorias/edit/:id", (require, response) => {
    categoria.findOne({ _id: require.params.id }).lean().then((categoria) => {
        response.render("admin/editcategorias", { categoria: categoria })
    }).catch((err) => {
        require.flash("error_msg", "Esta categoria não existe.")
        response.redirect("/admin/categorias")
    })

})

router.post("/categorias/edit", (require, response) => {
    categoria.findOne({ _id: require.body.id }).then((categoria) => {
        categoria.nome = require.body.nome
        categoria.slug = require.body.slug
        categoria.save().then(() => {
            require.flash("success_msg", "Categoria editada com sucesso")
            response.redirect("/admin/categorias")
        }).catch((err) => {
            require.flash("error_msg", "Houve um erro na edição.")
        })
    }).catch((err) => {
        require.flash("error_msg", "houve um erro ao editar a categoria" + err)
        response.redirect("/admin/categorias")
    })
})

router.get('/categorias/add', (require, response) => {
    response.render('admin/addcategorias')
})

module.exports = router