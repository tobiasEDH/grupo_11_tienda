const express= require('express')
const path= require('path')
const app= express()
const port=3000

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'))
})

app.get('/detalle-del-producto', (req,res)=>{
    res.sendFile(path.join(__dirname, './views/productDetail.html'))
})

app.get('/carrito-de-compras', (req,res)=>{
    res.sendFile(path.join(__dirname, './views/productCart.html'))
})

app.get('/ingreso', (req,res)=>{
    res.sendFile(path.join(__dirname, './views/login.html'))
})

app.get('/registro', (req,res)=>{
    res.sendFile(path.join(__dirname, './views/register.html'))
})

app.use(express.static('public'))

app.listen(port, ()=>{
    console.log('Servidor funcionando en http://localhost:'+port);
})