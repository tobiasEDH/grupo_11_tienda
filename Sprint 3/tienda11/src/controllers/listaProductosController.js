const fs = require('fs')
const path = require('path')
const db = require('../../database/models')
const Marca = db.Marcas
const Producto = db.Productos
const Categoria = db.Categorias

const listaProductosController={
    listado: (req,res)=>{
        Producto.findAll()
            .then((productos)=>{
                return res.render('listado', { productos })        
            })
        
    },
    detalle: (req,res)=>{
        Producto.findByPk(req.params.id)
            .then((producto)=>{
            return res.render('detalle-producto',{producto})
        })
        /*if(productoDetalle != undefined || productoDetalle != null){
            res.render('detalle-producto', {producto: productoDetalle})
        }else{
            res.render('listado', { productos })
        }*/
    },
    crearProducto: (req,res)=>{
        Marca.findAll()
        .then((marcas)=>{
            res.render('crear-producto', {marcas})
        })
    },
    enviarProducto: (req,res)=>{ 
        console.log(req.file)
        Producto.create({
            name: req.body.name,
            discount: req.body.discount,
            image: req.file.filename,
            id_mark: req.body.mark,
            price: req.body.price,
            description: req.body.description
        })
            res.redirect('../productos')
    },
    editarProducto: (req,res)=>{
        Producto.findByPk(req.params.id)
        .then((producto)=>{
            return res.render('editar-producto',{producto})
        })
    },
    enviarProductoEditado: (req,res) => {
        Producto.update({
            name: req.body.name,
            discount: req.body.discount,
            image: req.file.filename,
            id_mark: req.body.mark,
            price: req.body.price,
            description: req.body.description
        },
        {
            where: {id: req.params.id}
        })
        res.redirect('/productos/'+req.params.id)
    },
    borrarProducto: (req,res) => {
        Producto.destroy({
            where: {id: req.params.id}
        })
        res.redirect('http://localhost:3000/productos')
    },
    listadoProducto: (req,res)=>{
        Producto.findAll()
        .then((productos)=>{
            return res.render('listadoProductos',{productos})
        })
    }
}
module.exports= listaProductosController;