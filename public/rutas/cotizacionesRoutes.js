

const cotizaciones = require('../Controllers/cotizacionesController');
 
function usuarioRoute(app,passport){
    //console.log(pruebaa);
    
    app.get('/getCotizaciones',cotizaciones.getCotizaciones);

    app.get('/getCotizacionParaMonedero',cotizaciones.getCotizacionParaMonedero);

}

module.exports=usuarioRoute;