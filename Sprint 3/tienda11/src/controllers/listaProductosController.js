const fs = require('fs')
const path = require('path')
const db = require('../../database/models')
const Marca = db.Marcas
const Producto = require('../models/Producto.js')

const listaProductosController={
    listado: async (req,res)=>{
        let products = await Producto.getProductos()
        let temp = []
        products.forEach(producto => {
            temp.push(producto.dataValues)
        })
        res.render('listado', { productos: temp })
    },
    detalle: async (req,res)=>{
        let detalleProducto = await Producto.getProductoByID(req.params.id)
        if(detalleProducto.dataValues){
            res.render('detalle-producto',{ producto: detalleProducto.dataValues })
        }
        /*if(productoDetalle != undefined || productoDetalle != null){
            res.render('detalle-producto', {producto: productoDetalle})
        }else{
            res.render('listado', { productos })
        }*/
    },
    crearProducto: (req,res)=>{
        Marca.findAll()
        .then((marcas)=>{
            return res.render('crear-producto',{marcas})
        })
    },
    enviarProducto: (req,res)=>{ 
        Producto.create({
            name: req.body.name,
            discount: req.body.discount,
            image: req.file.filename,
            id_mark: req.body.mark,
            price: req.body.price
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
            price: req.body.price
        },
        {
            where: {id: req.params.id}
        })
        res.redirect('../productos/'+req.params.id)
    },
    borrarProducto: (req,res) => {
        Producto.destroy({
            where: {id: req.params.id}
        })
        res.render('listado', { productos })
    },
    listadoProducto: async (req,res)=>{
        let products = await Producto.getProductos()
        let temp = []
        products.forEach(producto => {
            temp.push(producto.dataValues)
        })
        res.render('listado', { productos: temp })
    }
}
module.exports= listaProductosController;