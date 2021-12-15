const fs = require('fs')
const path = require('path')
const usersPath = path.join(__dirname,'../data/usuarios.json')
const { validationResult } = require('express-validator')
const UserModel = require('../models/User.js')
const bcryptjs = require('bcryptjs')

const listaUsersController = {
    listado: async (req,res)=>{
        let usuarios = await UserModel.getUsers()
        let temp = []
        usuarios.forEach(usuario => {
            temp.push(usuario.dataValues)
        });
        //console.log("usuarios: ", temp)
        res.render('listado-usuarios', { users: temp })
    },
    registro: async (req,res) => {
        let usuarios = UserModel.getUsers()
        let errors = validationResult(req)
        if(errors.isEmpty()){
            //console.log("body: ", req.body)
            let userInDB = await UserModel.getUserByField('email', req.body.email)
            //console.log("userInDB: ", userInDB)
            if(userInDB){
                //console.log("entro al if del userInDB")
                res.render('register', { errors: {email: {msg: 'Este email ya se encuentra registrado'}} })
            }else{
                let userNuevo = {
                    Nombre: req.body.name,
                    Imagen: req.file.filename,
                    Apellido: req.body.lastName,
                    Email: req.body.email,
                    Contraseña: bcryptjs.hashSync(req.body.password, 10),
                }
                let response = await UserModel.createUser(userNuevo)
                if(response){
                    res.redirect('../ingreso')
                }
            }
        }else{
            console.log("errores: ", errors)
            res.render('register', { errors: errors.mapped() })
        }
    },
    login: async (req, res) => {
        let user = await UserModel.getUserByField('Email', (req.body.email != null && req.body.email != undefined) ? req.body.email : null)
        if(user){
            if(bcryptjs.compareSync(req.body.password, user.dataValues['Contraseña']))
            {
                delete user.dataValues['Contraseña']
                if(user.dataValues['Email'] == 'tobias.elkowich@gmail.com'){ user.dataValues['isAdmin'] = true }
                req.session.userLogged = user.dataValues
                if(req.body.recordar){
                    res.cookie('recordar', req.body.email, { maxAge: (1000*60)*60 })
                }
                res.redirect('../usuario/'+user.dataValues.ID_Usuario)
            }
        }else{
            res.render('login', { errors: {login: {msg: 'Email o contraseña incorrectos'}} })
        }
    },
    logout: (req,res) => {
        res.clearCookie('recordar')
        req.session.destroy()
        res.redirect('../ingreso')
    },
    editarUsuario: (req,res)=>{
        let usuarios = UserModel.getUsers()
        let userEdicion = UserModel.getUserByID(req.params.id)
        if(userEdicion != undefined && userEdicion != null){
            res.render('editar-usuario', {user: userEdicion})
        }else{
            res.render('listado-usuarios', { users: usuarios })
        }
    },
    enviarUsuarioEditado: (req,res) => {
        let userNuevo = {
            id: req.params.id,
            name: req.body.name,
            images: req.file.filename,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
        }
        UserModel.editUser(userNuevo)
        res.redirect('../usuario/'+req.params.id)
    },
    borrarUsuario: async (req,res) => {
        if(req.params.id != undefined){
            let response = await UserModel.deleteUser(req.params.id)
            if(response){
                res.redirect('../usuario')
            }else{
                res.redirect('../usuario/'+req.session.userLogged.ID_Usuario)
            }
        }
        let usuarios = UserModel.getUsers()
        res.render('listado-usuarios', { users: usuarios })
    },
    detalle: async (req,res)=>{
        //console.log('sesion en detalle: ', req.session)
        //console.log("req en detalle: ", req.params)
        //console.log("userDetalle: ", userDetalle)
        if(!req.session.userLogged || (req.session.userLogged.isAdmin && req.params.id != req.session.userLogged.ID_Usuario)){
            let userDetalle = await UserModel.getUserByID(req.params.id)
            if(userDetalle != undefined || userDetalle != null){
                let tempUser = {
                    id: userDetalle.dataValues.ID_Usuario,
                    name: userDetalle.dataValues.Nombre,
                    images: userDetalle.dataValues.Imagen,
                    lastName: userDetalle.dataValues.Apellido,
                    email: userDetalle.dataValues.Email
                }
                res.render('usuario', {user: tempUser})
            }else{
                //console.log("usuarios redirect detalle: ", usuarios)
                let usuarios = await UserModel.getUsers()
                res.render('listado-usuarios', { users : usuarios })
            }
        }else{
            let tempUser = {
                id: req.session.userLogged.ID_Usuario,
                name: req.session.userLogged.Nombre,
                images: req.session.userLogged.Imagen,
                lastName: req.session.userLogged.Apellido,
                email: req.session.userLogged.Email
            }
            res.render('usuario', {user: tempUser})
        }
    }
};
module.exports = listaUsersController;