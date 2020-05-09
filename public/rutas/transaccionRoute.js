

const transaccionController = require('../Controllers/transaccionController');
 
function transaccionRoute(app,passport){ 

    app.get('/getEstadisticasTransacciones',transaccionController.getEstadisticasTransaccionesV2);
}
module.exports =transaccionRoute;