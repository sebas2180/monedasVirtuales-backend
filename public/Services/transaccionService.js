  
const transaccionModel = require('../../database/transaccion')();
var Sequelize = require('sequelize');
const mysql = require('../../database/mysql');
connection = mysql.dbConnection();
module.exports={

    addTransaccion :(trans ,cb) => {
        var newTransaccion = new transaccionModel();
        console.log(trans);
        newTransaccion.monto = trans.monto_operacion;
        newTransaccion.cotizacion_usd = trans.cotizacion_usd;
        newTransaccion.tipo_moneda = trans.tipo_moneda;
        newTransaccion.tipo_operacion = trans.tipo_operacion;
        newTransaccion.id_usuario = trans.id_usuario;
        newTransaccion.save().then(
            res=>{
                if( res == 1){
                    const sendResp ={
                        status:730,
                        msj:'Guardado con exito!'
                    }
                    return cb();
                }else{
                    const sendResp ={
                        status:730,
                        msj:'Guardado con exito!'
                    }
                    return cb();
                }
            }
        )
        .catch(
            err=>{console.log(err)}
        )
    },getEstadisticasPrecio : (id_usuario,cb) => {

        var linea= 'SELECT F.*,SUM(cotizacion_restante/N_restante)promedio_restante FROM(SELECT k.tipo_moneda,sum(k.compra) compra,sum(k.venta) '+
        'venta,sum(compra-venta)restante,sum(k.cotizacion_compra) cotizacion_compra,sum(k.N_compra) N_compra,'+
        'sum(cotizacion_compra/N_compra) promedio_compra, sum(k.cotizacion_venta) cotizacion_venta, '+
        'sum(k.N_venta) N_venta,sum(cotizacion_venta/N_venta) promedio_venta,sum(cotizacion_compra-cotizacion_venta)'+
        ' cotizacion_restante,sum(N_compra-N_venta) N_restante FROM (SELECT IFNULL(sum(monto),0) compra,0 venta,'+
        'IFNULL(sum(cotizacion_usd),0) cotizacion_compra,IFNULL(count(1),0) N_compra,0 cotizacion_venta,0 N_venta,tipo_moneda '+
        'from transaccion where UPPER(tipo_operacion)=UPPER(\'compra\') AND'+
        ' UPPER(id_usuario)=UPPER(\''+id_usuario+'\') GROUP BY tipo_moneda UNION ALL SELECT 0 compra,'+
        'IFNULL(sum(monto),0) venta,0 cotizacion_compra,0 N_compra,IFNULL(sum(cotizacion_usd),0) cotizacion_venta,IFNULL(count(1),0) N_venta,'+
        'tipo_moneda  FROM transaccion WHERE UPPER(tipo_operacion)=UPPER(\'venta\') AND UPPER(id_usuario)=UPPER(\''+id_usuario+'\') GROUP BY tipo_moneda)k '+
        'group by k.tipo_moneda)F GROUP BY F.tipo_moneda';
        //console.log(linea);
        connection.query(linea,(err,resp)=>{
            return cb(resp);
        });
        
    }
}