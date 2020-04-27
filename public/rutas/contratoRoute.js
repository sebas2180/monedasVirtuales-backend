const contrato = require('../Controllers/contratoController');
 
function contratoRoute(app,passport){
    //console.log(pruebaa);
    
    app.post('/crearContrato',verifyToken.verificar,contrato.crearContrato);

    app.get('/getContrato',contrato.getContrato);

    app.get('/getContratos',verifyToken.verificar,contrato.getContratos);

    app.get('/activarContrato',verifyToken.verificar,contrato.activarContrato);
 
    app.get('/getEstadisticasContratos',verifyToken.verificar,contrato.getEstadisticasContratos);    

    app.post('/registrarPago',verifyToken.verificar,contrato.registrarPagoV2);

    app.get('/getCantidadContratos',contrato.getCantidadContratos);
     
    //app.post('/registrarPagoV2', contrato.registrarPagoV2);
     
}
module.exports=contratoRoute;