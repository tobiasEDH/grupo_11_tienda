function recordarMiddleware (req, res, next){
    next();

    if (req.cookies.recordar != undefined && req.session.userLogged == undefined) {
        
    }
}