

const moneda = require('../Controllers/monedaController');
function usuarioRoute(app){
    app.get('/getMonedas',moneda.getMonedas);

    app.post('/addMoneda',moneda.addMoneda);

    app.post('/updateImporte',moneda.updateImporte);

    app.post('/updateCotizacion',moneda.updateCotizacion);
}

module.exports=usuarioRoute;