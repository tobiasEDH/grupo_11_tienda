const express = require('express')
const router = express.Router()
const listaProductosController = require('../controllers/listaProductosController')

//Muestra todo el listado de productos de productos.json
router.get('/', listaProductosController.listado)

//Muestra detalle de cada producto
router.get('/detalle/:id', listaProductosController.detalle)

//Muestra el formulario de crear un producto y el envio de los datos a prodcutos.json
router.get('/crear', listaProductosController.crearProducto)
router.post('/crear', listaProductosController.enviarProducto)

module.exports= router;