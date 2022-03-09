const express = require('express')
const router = express.Router()
const path = require('path')
const app = express()
app.set('views', path.join(__dirname, '../views'));



router.get('/', (require, response) => {
    response.render('admin/index')
})

router.get('/posts', (require, response) => {
    response.send('Minha pagina de posts')
})

router.get('/categoria', (require, response) => {
    response.send('Minha pagina de categorias')
})

module.exports = router