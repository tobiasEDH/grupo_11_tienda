const UserModel = require('../models/User.js')
const Producto = require('../models/Producto.js')

const indexController={
    index: (req,res)=>{
        res.redirect('../api/users')
    },
    listado: async (req,res)=>{
        let users = await UserModel.getUsers()
        let temp = []
        users.forEach(user => {
            delete user.dataValues['Contraseña']
            delete user.dataValues['Imagen']
            delete user.dataValues['ID_Carrito']
            user.dataValues['Detalle'] = 'http://localhost:3000/api/users/' + user.dataValues['ID_Usuario']
            temp.push(user.dataValues)
        })
        let object = {
            count: temp.length,
            users: temp
        }
        res.send(object)
    },
    user: async (req,res)=>{
        let userDetalle = await UserModel.getUserByID(req.params.id)
        if(userDetalle != undefined || userDetalle != null){
            delete userDetalle.dataValues['Contraseña']
            let imagen = userDetalle.dataValues['Imagen']
            userDetalle.dataValues['Imagen'] = 'http://localhost:3000/img/users/' + imagen
            res.send(userDetalle.dataValues)
        }else{
            res.redirect('../users')
        }
    },
    productos: async (req,res)=>{
        let products = await Producto.getProductos()
        let temp = []
        products.forEach(product => {
            temp.push(product.dataValues)
        })
        res.send(temp)
    },
    producto: async (req,res)=>{
        let productDetalle = await Producto.getProductoByID(req.params.id)
        if(productDetalle != undefined || productDetalle != null){
            res.send(productDetalle.dataValues)
        }else{
            res.redirect('../products')
        }
    }
}
module.exports= indexController;