


function usuarioRoute(app){
    app.get('/',(req,res,next)=>{
        res.send({a:'hola'});
    });
}

module.exports=usuarioRoute;