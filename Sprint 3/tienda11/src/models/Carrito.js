const fs = require('fs')
const path = require('path')
const db = require('../../database/models')

const Carrito = {
    filename: path.join(__dirname,'../data/usuarios.json'),
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },
    getCarritos: async function(){
        return await db.Carritos.findAll().then((carritos) => { return carritos }).catch(e => {console.log(e)})
    },
    getCarritoByID: async function(id){
        let users = this.getData()
        let user = users.find(oneUser => oneUser.id == id)
        return await db.Carritos.findByPk(id).then((carrito) => {return carrito}).catch(e => {console.log(e)})
    },
    getCarritoByField: async function(field, text){
        let temp = {}
        temp[field] = (text == undefined) ? null : text
        let cart = null
        if(temp[field] != null){
            cart = await db.Carritos.findOne({where: temp}).then((carrito) => {return carrito}).catch(e => {console.log(e)})
        }
        return cart
    },
    createCarrito: async function(cartData){
        /*let users = this.getData()
        users.push(userData)
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))*/
        let response = null
        if(cartData != null && cartData != undefined){
            response = await db.Carritos.create({
                Nombre_Comprador: cartData
            }).then((carrito) => {return carrito}).catch(e => {console.log(e)})
            //console.log("ID Carrito Nuevo: ", response.dataValues.ID_Carrito)
            /*response = await db.Carritos.findOne({where: {"Nombre_Comprador": userData}}).then(carrito => {return carrito}).catch(e => {console.log(e)})
            console.log("Carrito Nuevo 2: ", response)*/
        }
        //console.log("Carrito Nuevo: ", response)
        return response.dataValues.ID_Carrito
    },
    deleteCarrito: async function(id){
        let cart = null
        cart = await db.Carritos.findByPk(id).then((carrito) => {return carrito}).catch(e => {console.log(e)})
        if(cart){
            db.Carritos.destroy({where: {ID_Carrito: id}})
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

module.exports = Carrito