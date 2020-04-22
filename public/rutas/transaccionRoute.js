

const transaccionController = require('../Controllers/transaccionController');
 
function transaccionRoute(app,passport){ 

    app.get('/getEstadisticasTransacciones',transaccionController.getEstadisticasTransacciones);
}
module.exports =transaccionRoute;