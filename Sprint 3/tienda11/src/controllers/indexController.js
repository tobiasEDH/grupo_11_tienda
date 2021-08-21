const path = require('path')
const fs = require('fs')
const productosPath = path.join(__dirname,'../data/productos.json')
const productos = JSON.parse(fs.readFileSync(productosPath,'utf-8'))
const usuariosPath = path.join(__dirname,'../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosPath,'utf-8'))

const indexController={
    index: (req,res)=>{
        res.render('index', {productos})
    },
    registro: (req, res)=>{
        res.render('register')
    },
    enviarRegistro: (req,res)=>{
        let usuario={
            id: usuarios.length +1,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            images: req.body.images
        }
        
        let usuariosActualizados;
        if(usuarios == ""){
             usuariosActualizados= []
        }else{
            usuariosActualizados=usuarios
        }

        usuariosActualizados.push(usuario)

        let usuariosJSON= JSON.stringify(usuariosActualizados)

        fs.writeFileSync(usuariosPath, usuariosJSON)

        res.redirect('/')
    },
    ingreso: (req,res)=>{
        res.render('login')
    },
    carrito: (req,res)=>{
        res.render('carrito')
    },

    editarProducto: (req,res)=>{
        res.render('editar-producto')
    }
}
module.exports= indexController;