const path = require('path')
const fs = require('fs')
const productosPath = path.join(__dirname,'../data/productos.json')
const productos = JSON.parse(fs.readFileSync(productosPath,'utf-8'))
const usersPath = path.join(__dirname,'../data/usuarios.json')
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
const UserModel = require('../models/User.js')

const indexController={
    index: (req,res)=>{
        res.render('index', {productos})
    },
    registro: (req, res)=>{
        if(req.session.userLogged != undefined){
            //console.log('hay un user: ', req.session.userLogged)
            let userDetalle = UserModel.getUserByID(req.session.userLogged.id)
            res.render('usuario', { user: userDetalle })
        }else{
            //console.log('no hay un user: ', req.session.userLogged)
            res.render('register')
        }
    },
    enviarRegistro: (req,res)=>{
        let user = {
            id: users.length +1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            images: req.body.images
        }
        
        let usersActualizados;
        if(users == ""){
             usersActualizados= []
        }else{
            usersActualizados = users
        }

        usersActualizados.push(user)

        let usersJSON= JSON.stringify(usersActualizados)

        fs.writeFileSync(usersPath, usersJSON)

        res.redirect('/')
    },
    ingreso: (req,res)=>{
        if(req.session.userLogged != undefined){
            //console.log('hay un user: ', req.session.userLogged)
            let userDetalle = UserModel.getUserByID(req.session.userLogged.id)
            res.render('usuario', { user: userDetalle })
        }else{
            //console.log('no hay un user: ', req.session.userLogged)
            res.render('login')
        }
    },
    carrito: (req,res)=>{
        res.render('carrito')
    },

    editarProducto: (req,res)=>{
        res.render('editar-producto')
    }
}
module.exports= indexController;