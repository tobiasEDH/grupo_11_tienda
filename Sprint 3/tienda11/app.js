const express= require('express')
const path= require('path')
const app= express()
const rutasIndex = require('./src/routes/indexRouter.js')
const rutasProductos= require('./src/routes/listaProductosRouter.js')
const port=3000


app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use('/', rutasIndex)
app.use('/productos', rutasProductos)

app.listen(port, ()=>{
    console.log('Servidor funcionando en http://localhost:' + port);
})

