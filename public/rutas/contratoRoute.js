const contrato = require('../Controllers/contratoController');
 
function contratoRoute(app,passport){
    //console.log(pruebaa);
    
    app.post('/crearContrato',verifyToken.verificar,contrato.crearContrato);

    app.get('/getContrato',contrato.getContrato);

    app.get('/getContratos',contrato.getContratos);

    app.get('/activarContrato',verifyToken.verificar,contrato.activarContrato);
 
    app.get('/getEstadisticasContratos',verifyToken.verificar,contrato.getEstadisticasContratos);    

    app.post('/registrarPago',verifyToken.verificar,contrato.registrarPago);
     
}
module.exports=contratoRoute;