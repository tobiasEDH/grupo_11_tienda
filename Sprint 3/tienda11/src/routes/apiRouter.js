const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')

router.get('/', apiController.index)

router.get('/users', apiController.listado)

router.get('/users/:id', apiController.user)

router.get('/products', apiController.productos)

router.get('/products/:id', apiController.producto)

module.exports = router;