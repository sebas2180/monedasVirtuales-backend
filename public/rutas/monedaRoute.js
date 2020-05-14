

const moneda = require('../Controllers/monedaController');
 
function usuarioRoute(app,passport){
    //console.log(pruebaa);
    
    app.get('/getMoneda',verifyToken.verificar, moneda.getMoneda);

    app.get('/getMonedas',verifyToken.verificar, moneda.getMonedas);

    app.get('/getImportes',verifyToken.verificar, moneda.getImporte);

    app.post('/addMoneda',verifyToken.verificar, moneda.addMoneda);

    app.post('/updateImporte',verifyToken.verificar,moneda.updateImporte);

    app.post('/transferenciaSaldo',verifyToken.verificar, moneda.transferenciaSaldo);

    app.post('/updateCotizacion',verifyToken.verificar,moneda.updateCotizacion);
     
    app.get('/getNombreMonederos', moneda.getNombreMonederos);

    app.get('/getIdMonederos', moneda.getIdMonederos);

    app.get('/getNombreMonedero', moneda.getNombreMonedero);

    app.get('/getBuscarNombre', verifyToken.verificar,moneda.getBuscarNombre);
}

module.exports=usuarioRoute;