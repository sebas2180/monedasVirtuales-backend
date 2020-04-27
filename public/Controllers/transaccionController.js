
const transaccionService =require('../Services/transaccionService');

module.exports = {

    getEstadisticasTransacciones :(req,res,next) => {
       // console.log('get estadisticasssssssssss');
        const id_usuario = req.query.id_usuario;
        transaccionService.getEstadisticasPrecio(id_usuario,(cb) => {
            //console.log(cb);
            return res.send(cb) ;
        })
    }
}