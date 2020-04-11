const cotizacionesModel = require('../../database/cotizaciones')();
const mysql = require('../../database/mysql');
connection = mysql.dbConnection();
module.exports={

    getCotizaciones: (cb)=>{
        cotizacionesModel.findAll(   { offset: 9, limit:9,
                                        order: [['id','DESC']]
                                    })
        .then(
            resp =>{

                var repuesta={
                    status:770,
                    cotizaciones : resp
                };
                return cb(repuesta);
        })
    },getCotizacionParaMonedero:(callback)=>{
        const linea =' (select * from cotizacion where proveedor=\'bitstamp\' and base=\'USD\'' +
                    'limit 1) union (select * from cotizacion where proveedor=\'argenbtc\' limit 1) '+
                'union (select * from cotizacion where proveedor=\'bit2me\' and base=\'EUR\' limit 1)';
        //console.log(linea);
        connection.query(linea,(err,resp)=>{
            //console.log(resp);
        const sendResp = {
            status: 770,
            bitstamp:resp[0],
            bit2me:resp[2],
            argenBTC: resp[1]
        };
        return callback(sendResp);
    })
    }

}
