
const transaccionService =require('../Services/transaccionService');

module.exports = {

    // getEstadisticasTransacciones : async  (req,res,next) => {
    //    console.log('get estadisticas compra ...');
    //     const id_usuario = req.query.id_usuario;
    //     transaccionService.getEstadisticasPrecio(id_usuario,(cb) => {
    //         console.log('  estadisticas  compra enviado ...');
    //         return res.send(cb) ;
    //     })
    // }
    getEstadisticasTransaccionesV2 : async  (req,res,next) => {
        console.log('get estadisticas compra ...');
         const id_usuario = req.query.id_usuario;
         transaccionService.getEstadisticasPrecioV2(id_usuario).then(
             cb => {
                console.log('  estadisticas  compra enviado ...');
                return res.send(cb) ;

             }
         )
     }
}