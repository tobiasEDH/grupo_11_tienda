 const express = require('express')
 const router = express.Router()
 const indexController = require('../controllers/indexController')

router.get('/', indexController.index)

router.get('/ingreso', indexController.ingreso)

router.get('/registro', indexController.registro)
router.post('/registro', indexController.enviarRegistro)

router.get('/carrito-de-compras', indexController.carrito)



router.get('/editar-producto', indexController.editarProducto)

module.exports = router;