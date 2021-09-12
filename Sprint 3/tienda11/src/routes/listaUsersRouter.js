const express = require('express')
const router = express.Router()
const listaUsersController = require('../controllers/listaUsersController')

//Muestra todo el listado de usuarios de usuarios.json
router.get('/', listaUsersController.listado)

//Muestra detalle de cada usuario
router.get('/:id', listaUsersController.detalle)

router.put('/:id', listaUsersController.enviarUsuarioEditado)

router.delete('/:id', listaUsersController.borrarUsuario)

// Edicion de usuario
router.get('/:id/editar', listaUsersController.editarUsuario)

module.exports = router;