

const cotizaciones = require('../Controllers/cotizacionesController');
 
function usuarioRoute(app,passport){
    //console.log(pruebaa);
    
    app.get('/getCotizaciones',cotizaciones.getCotizaciones);

    app.get('/getCotizacionesV2',cotizaciones.getCotizacionesV2);

    app.get('/getCotizacionParaMonedero',cotizaciones.getCotizacionParaMonedero);
     
    app.get('/getCotizacionesBTCUSD',cotizaciones.getCotizacionesBTCUSD);
}

module.exports=usuarioRoute;