const indexController={
    index: (req,res)=>{
        res.render('index')
    },
    registro: (req, res)=>{
        res.render('register')
    },
    ingreso: (req,res)=>{
        res.render('login')
    },
    carrito: (req,res)=>{
        res.render('carrito')
    },
    producto: (req,res)=>{
        res.render('detalle-del-producto')
    },
    crearProducto: (req,res)=>{
        res.render('crear-producto')
    }
}
module.exports= indexController;