const fs = require('fs')
const path = require('path')
const usersPath = path.join(__dirname,'../data/usuarios.json')
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

const listaUsersController={
    listado: (req,res)=>{
        res.render('listado-usuarios', { users })
    },
    detalle: (req,res)=>{
        let userDetalle = users.find(user=>{
            return user.id == req.params.id
        })
        if(userDetalle != undefined || userDetalle != null){
            res.render('usuario', {user: userDetalle})
        }else{
            res.render('listado-usuarios', { users })
        }
    },
    editarUsuario: (req,res)=>{
        let userEdicion = users.find(user => {
            return user.id == req.params.id
        })
        if(userEdicion != undefined || userEdicion != null){
            res.render('editar-usuario', {user: userEdicion})
        }else{
            res.render('listado-usuarios', { users })
        }
    },
    enviarUsuarioEditado: (req,res) => {
        let userNuevo = {
            id: req.params.id,
            name: req.body.name,
            images: req.body.images,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        }
        let usersActualizados = users
        usersActualizados[req.params.id - 1] = userNuevo
        let usersJSON = JSON.stringify(usersActualizados)
        fs.writeFileSync(usersPath, usersJSON)
        res.redirect('../usuario/'+req.params.id)
    },
    borrarUsuario: (req,res) => {
        if(req.params.id != undefined){
            let usersActualizados = users
            if(usersActualizados.find(user=>{return user.id == req.params.id}) != undefined){
                usersActualizados.splice(req.params.id - 1, 1)
                console.log(usersActualizados)
            }
        }
        res.render('listado-usuarios', { users })
    }
};
module.exports = listaUsersController;