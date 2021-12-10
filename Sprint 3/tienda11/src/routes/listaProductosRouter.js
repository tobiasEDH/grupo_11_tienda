const express = require('express')
const router = express.Router()
const path = require('path')
const listaProductosController = require('../controllers/listaProductosController')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/products')
    },
    filename: function(req, file, cb){
        console.log(file)
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage})

// Muestra todo el listado de productos de productos.json
router.get('/', listaProductosController.listado)

// Muestra el listado de productos para edicion o borrar
router.get('/listado', listaProductosController.listadoProducto)

// Muestra el formulario de crear un producto y el envio de los datos a prodcutos.json
router.get('/crear', authMiddleware,listaProductosController.crearProducto)
router.post('/crear', upload.single('images'), listaProductosController.enviarProducto)

// Muestra detalle de cada producto
router.get('/:id', listaProductosController.detalle)

// Edicion de producto
router.get('/:id/editar', authMiddleware,listaProductosController.editarProducto)
router.post('/:id/editar', upload.single('images'),listaProductosController.enviarProductoEditado)

//
router.post('/:id/borrar', listaProductosController.borrarProducto)

//
router.get('/carrito')

router.post('/:id/agregar', listaProductosController.agregarProducto)

module.exports= router;