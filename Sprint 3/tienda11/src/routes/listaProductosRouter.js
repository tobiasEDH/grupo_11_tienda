const express = require('express')
const router = express.Router()
const listaProductosController = require('../controllers/listaProductosController')

//Muestra todo el listado de productos de productos.json
router.get('/', listaProductosController.listado)

//Muestra el formulario de crear un producto y el envio de los datos a prodcutos.json
router.get('/crear', listaProductosController.crearProducto)
router.post('/', listaProductosController.enviarProducto)

//Muestra detalle de cada producto
router.get('/:id', listaProductosController.detalle)

router.put('/:id', listaProductosController.enviarProductoEditado)

// Edicion de producto
router.get('/:id/editar', listaProductosController.editarProducto)

module.exports= router;