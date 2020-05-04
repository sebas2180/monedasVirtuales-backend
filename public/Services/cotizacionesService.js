const cotizacionesModel = require('../../database/cotizaciones')();
const mysql = require('../../database/mysql');
connection = mysql.dbConnection();
module.exports={
    getCotizacion :(proveedor,symbol,base,cb) => {
        cotizacionesModel.findOne( { where : { proveedor : proveedor , symbol : symbol , base : base } ,
             offset: 1, limit:1, order: [['id','DESC']]     } )
        .then(
            res => {
                if ( res ) {
                    return cb(res) ;
                } else {
                    return cb (null) ;
                }
            }
        )
    },
    getCotizacionesV2: (cb)=>{
        var linea = 'SELECT COUNT(1) cantidad from (select count(1),proveedor,base from cotizacion group by proveedor, base,symbol) X';
        //console.log(linea ) ;
        connection.query(linea,(err,res) => {
            if (err){ console.log(err); }
            var numero = parseFloat(res[0].cantidad);
            cotizacionesModel.findAll(   { offset: numero, limit:numero,
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
    });
    },
    getCotizacionesBTCUSD: (cb)=>{
        var linea = 'SELECT COUNT(1) cantidad from (select count(1),proveedor,base'+
        ' FROM cotizacion WHERE base=\'USD\' AND symbol=\'BTC\' GROUP BY proveedor) X  GROUP BY X.base ' ;
        
        connection.query(linea,(err,res) => {
            if (err){ console.log(err); }
            console.log('Esperando get count' ) ;
            var numero = parseFloat(res[0].cantidad);
            cotizacionesModel.findAll(   { offset: numero, limit:numero,
                order: [['id','DESC']]
            },{where : { base:'USD' , symbol : 'BTC'}})
        .then(
        resp =>{
            console.log('Esperando get resultados' ) ;
            return cb(resp);
        })
    });
    },
    getCotizaciones: (cb)=>{
        var linea = 'SELECT COUNT(1) cantidad from (select count(1),proveedor,base from cotizacion group by proveedor, base,symbol) X';
        connection.query(linea,(err,res) => {
            if (err){ console.log(err); }
            var numero = parseFloat(res[0].cantidad);
            cotizacionesModel.findAll(   { offset: numero, limit:numero,
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
    });
    },
getCotizacionParaMonedero:(callback)=>{
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
