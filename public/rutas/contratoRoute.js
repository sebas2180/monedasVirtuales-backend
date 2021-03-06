const contrato = require('../Controllers/contratoController');
 
function contratoRoute(app,passport){
    //console.log(pruebaa);
    
    app.post('/crearContrato',verifyToken.verificar,contrato.crearContrato);

    app.get('/getContrato',verifyToken.verificar,  contrato.getContrato);

    app.get('/getContratos',contrato.getContratos);

    app.get('/activarContrato',verifyToken.verificar,contrato.activarContrato);
 
    app.get('/getEstadisticasContratos',verifyToken.verificar,contrato.getEstadisticasContratos);    

    app.post('/registrarPago',verifyToken.verificar,contrato.registrarPagoV2);

    app.get('/getCantidadContratos', contrato.getCantidadContratos);

    
    app.get('/getListaPagos',contrato.getListaPagos);
     
    //app.post('/registrarPagoV2', contrato.registrarPagoV2);
     
}
module.exports=contratoRoute;