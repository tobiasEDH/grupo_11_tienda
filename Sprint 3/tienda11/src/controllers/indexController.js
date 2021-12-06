const path = require('path')
const fs = require('fs')
const usersPath = path.join(__dirname,'../data/usuarios.json')
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
const UserModel = require('../models/User.js')
const db = require('../../database/models')
const Producto = require('../models/Producto.js')

const indexController={
    index: async (req,res)=>{
        let products = await Producto.getProductos()
        let temp = []
        products.forEach(producto => {
            temp.push(producto.dataValues)
        })
        res.render('index', { productos: temp })
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
        console.log(req.cookies.recordar)
        res.render('carrito')
    }
}
module.exports= indexController;