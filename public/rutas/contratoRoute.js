

const contrato = require('../Controllers/contratoController');
 
function contratoRoute(app,passport){
    //console.log(pruebaa);
    
    app.post('/crearContrato',contrato.crearContrato);

    app.get('/getContrato',contrato.getContrato);

    app.get('/getContratos',contrato.getContratos);

    app.get('/activarContrato',contrato.activarContrato);
 
        
    app.post('/registrarPago',contrato.registrarPago);

}
module.exports=contratoRoute;