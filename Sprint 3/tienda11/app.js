const express= require('express')
const path= require('path')
const app= express()
const rutasIndex = require('./src/routes/indexRouter.js')
const port=3000


app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static('public'))

app.use('/', rutasIndex)

app.listen(port, ()=>{
    console.log('Servidor funcionando en http://localhost:' + port);
})

