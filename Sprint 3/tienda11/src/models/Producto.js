const fs = require('fs')
const path = require('path')
const db = require('../../database/models')

const Producto = {
    filename: path.join(__dirname,'../data/usuarios.json'),
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },
    getProductos: async function(){
        return await db.Productos.findAll().then((productos) => { return productos }).catch(e => {console.log(e)})
    },
    getProductoByID: async function(id){
        return await db.Productos.findByPk(id).then((producto) => {return producto}).catch(e => {console.log(e)})
    },
    getProductoByField: async function(field, text){
        let temp = {}
        temp[field] = (text == undefined) ? null : text
        let product = null
        if(temp[field] != null){
            product = await db.Productos.findOne({where: temp}).then((producto) => {return producto}).catch(e => {console.log(e)})
        }
        return product
    },
    createProducto: async function(productData){
        /*let users = this.getData()
        users.push(userData)
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))*/
        let response = null
        if(productData != null && productData != undefined){
            response = await db.Productos.create({
                Nombre_Comprador: productData
            }).then((producto) => {return producto}).catch(e => {console.log(e)})
            //console.log("ID Carrito Nuevo: ", response.dataValues.ID_Carrito)
            /*response = await db.Carritos.findOne({where: {"Nombre_Comprador": userData}}).then(carrito => {return carrito}).catch(e => {console.log(e)})
            console.log("Carrito Nuevo 2: ", response)*/
        }
        //console.log("Carrito Nuevo: ", response)
        return response.dataValues.ID_Producto
    },
    deleteProducto: async function(id){
        let product = null
        product = await db.Productos.findByPk(id).then((producto) => {return producto}).catch(e => {console.log(e)})
        if(product){
            db.Productos.destroy({where: {ID_Producto: id}})
            return true
        }else{
            return false
        }
    }/*,
    editUser: function(newUser){
        let users = this.getData()
        users[newUser.id - 1] = newUser
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))
    }*/
}

module.exports = Producto