const fs = require('fs')
const path = require('path')
const db = require('../../database/models')
const Carrito = require('./Carrito.js')

const User = {
    filename: path.join(__dirname,'../data/usuarios.json'),
    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },
    getUsers: async function(){
        return await db.Usuarios.findAll().then((usuarios) => { return usuarios }).catch(e => {console.log(e)})
    },
    getUserByID: async function(id){
        let users = this.getData()
        let user = users.find(oneUser => oneUser.id == id)
        return await db.Usuarios.findByPk(id).then((usuario) => {return usuario}).catch(e => {console.log(e)})
    },
    getUserByField: async function(field, text){
        let temp = {}
        temp[field] = (text == undefined) ? null : text
        let user = null
        if(temp[field] != null){
            user = await db.Usuarios.findOne({where: temp}).then((usuario) => {return usuario}).catch(e => {console.log(e)})
            //console.log('user logeado: ', user)
        }
        return user
    },
    createUser: async function(userData){
        /*let users = this.getData()
        users.push(userData)
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))*/
        let responseUser
        let responseCarrito = await Carrito.createCarrito(userData.Nombre)
        if(responseCarrito != null){
            //console.log("responseCarrito: ", responseCarrito)
            userData["ID_Carrito"] = responseCarrito
            responseUser = await db.Usuarios.create(userData)
        }
        //console.log("User Nuevo: ", userData)
        //console.log("responseUser: ", responseUser)
        return true
    },
    deleteUser: async function(id){
        let response
        let user = null
        user = await db.Usuarios.findByPk(id).then((usuario) => {return usuario}).catch(e => {console.log(e)})
        if(user){
            response = await db.Usuarios.destroy({where: {ID_Usuario: id}})
            response = await Carrito.deleteCarrito(user.dataValues['ID_Carrito'])
            return true
        }else{
            return false
        }
    },
    editUser: function(newUser){
        let users = this.getData()
        users[newUser.id - 1] = newUser
        fs.writeFileSync(this.filename, JSON.stringify(users, null, ' '))
    }
}

module.exports = User