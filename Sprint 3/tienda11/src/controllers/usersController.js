const fs = require('fs')
const path = require('path')
const usersPath = path.join(__dirname,'../data/usuarios.json')
const { validationResult } = require('express-validator')
const UserModel = require('../models/User.js')
const bcryptjs = require('bcryptjs')
const db = require('../../database/models')
const Usuario = db.Usuarios

const listaUsersController = {
    listado: (req,res)=>{
        Usuario.findAll()
            .then((users)=>{
                res.render('listado-usuarios', {users})
            })
    },
    registro: (req,res) => {
        res.render('register')
    },
    enviarRegistro: (req,res)=>{
        Usuario.create({
            name: req.body.name,
            image: req.file.filename,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10)
        })
        res.redirect('/ingreso')
    },
    login: (req, res) => {
        res.render('login')
    },
    enviarlogin: (req, res) => {
        Usuario.findOne({
            where:{
                email: req.body.email
            }
        })
            .then((resultado)=>{
                // console.log(resultado)    
                if(resultado && bcryptjs.compareSync(req.body.password, resultado.password)){
                    delete resultado.password
                    req.session.userLogged = resultado

                    res.redirect('../usuario/' + resultado.id )
                }else{
                    res.render('login', { errors: {login: {msg: 'Email o contraseña incorrectos'}} })
                }
            })
    },
    logout: (req,res) => {
        res.clearCookie('recordar')
        req.session.destroy()
        res.redirect('../ingreso')
    },
    editarUsuario: (req,res)=>{
        Usuario.findOne({
            where:{
                id: req.params.id
            }
        })
            .then((usuario)=>{
                res.render('editar-usuario', {user : usuario})
            })
    },
    enviarUsuarioEditado: (req,res) => {
        Usuario.update({
            name: req.body.name,
            image: req.file.filename,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
        },
        {
            where: {id: req.params.id}
        })
        res.redirect('/usuario/' + req.params.id )
    },
    borrarUsuario: (req,res) => {
        Usuario.delete({
            where:{
                id: req.params.id
            }
        })
        res.render('listado-usuarios', { users : usuarios })
    },
    detalle: (req,res)=>{
        //console.log('sesion en detalle: ', req.session)
        Usuario.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((usuario)=>{
                res.render('usuario', {user : usuario})
            })
    }
};
module.exports = listaUsersController;