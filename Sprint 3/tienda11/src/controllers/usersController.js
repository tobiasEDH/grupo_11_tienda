const fs = require('fs')
const path = require('path')
const usersPath = path.join(__dirname,'../data/usuarios.json')
const { validationResult } = require('express-validator')

const listaUsersController={
    listado: (req,res)=>{
        let usuarios = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
        //console.log("usuarios: ", usuarios)
        res.render('listado-usuarios', { users: usuarios })
    },
    detalle: (req,res)=>{
        let usuarios = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
        let userDetalle = usuarios.find(user=>{
            return user.id == req.params.id
        })
        if(userDetalle != undefined || userDetalle != null){
            res.render('usuario', {user: userDetalle})
        }else{
            //console.log("usuarios redirect detalle: ", usuarios)
            res.render('listado-usuarios', { users : usuarios })
        }
    },
    registro: (req,res) => {
        let usuarios = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
        let errors = validationResult(req)
        if(errors.isEmpty()){
            //console.log("body: ", req.body)
            let userNuevo = {
                id: usuarios.length + 1,
                name: req.body.name,
                images: req.file.filename,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            }
            let usersActualizados = [...usuarios, userNuevo]
            let usersJSON = JSON.stringify(usersActualizados)
            fs.writeFileSync(usersPath, usersJSON)
            res.redirect('../usuario/'+userNuevo.id)
        }else{
            console.log("errores: ", errors)
            res.render('register', { errors: errors.mapped() })
        }
    },
    editarUsuario: (req,res)=>{
        let usuarios = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
        let userEdicion = usuarios.find(user => {
            return user.id == req.params.id
        })
        if(userEdicion != undefined || userEdicion != null){
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
            password: req.body.password,
        }
        let usuarios = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
        let usersActualizados = usuarios
        usersActualizados[req.params.id - 1] = userNuevo
        let usersJSON = JSON.stringify(usersActualizados)
        fs.writeFileSync(usersPath, usersJSON)
        res.redirect('../usuario/'+req.params.id)
    },
    borrarUsuario: (req,res) => {
        let usuarios = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
        if(req.params.id != undefined){
            let usersActualizados = usuarios
            if(usersActualizados.find(user=>{return user.id == req.params.id}) != undefined){
                usersActualizados.splice(req.params.id - 1, 1)
                let usersJSON = JSON.stringify(usersActualizados)
                fs.writeFileSync(usersPath, usersJSON)
                res.redirect('../usuario')
            }
        }
        res.render('listado-usuarios', { users: usuarios })
    }
};
module.exports = listaUsersController;