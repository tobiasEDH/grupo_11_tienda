const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const rutasIndex = require('./src/routes/indexRouter.js');
const rutasProductos = require('./src/routes/listaProductosRouter.js');
const rutasUsers = require('./src/routes/usersRouter.js');
const port = 3000;
const methodOverride = require('method-override');

const userLogged = (req,res,next) => {
    res.locals.isLogged = false
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.id = req.session.userLogged.id
    }
    next()
}

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(userLogged)

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));
app.use('/', rutasIndex);
app.use('/productos', rutasProductos);
app.use('/usuario', rutasUsers);

app.listen(port, ()=>{
    console.log('Servidor funcionando en http://localhost:' + port);
});

