
const transaccionService =require('../Services/transaccionService');
const monedaService =require('../Services/monedaService');
const tipoMonedaService = require ('../Services/tipo_monedaService');
const mysql = require('../../database/mysql');
connection = mysql.dbConnection();
module.exports = {
    getImporte :   (req,res,next)=>{
        monedaService.getImportes(req.payload.usuario,(callback)=>{

            return res.send(callback);
        });
    },
    getMoneda:(req,res,next)=>{
        var moneda={
            id_usuario: req.query.id_usuario,
            nombre_monedero : req.query.nombre_monedero,
            nombre_moneda : req.query.nombre_moneda
        }
        monedaService.getMoneda(moneda,(cb)=>{
            res.send(cb);
        })
    },
    getMonedas :(req,res,next)=>{
        var sendMensaje = [];
        var BTC = [] , ETH=[],LTC= [];
        var symbols = [];  
               console.log( ' get monedas ...');
                 monedaService.getRegistroMoneda(req.payload.usuario).then(
                    callback2=>{
                       // console.log(callback2)   
                       var index =1;
                       callback2.forEach(element => {
                        if(element.symbol === 'BTC'){
                            // var linea = `SELECT * FROM cotizacion WHERE proveedor='Bitstamp' AND base='USD' AND symbol='BTC' order by id DESC LIMIT 1`
                            //  connection.query(linea, function await (err,res0)   {       
                            //     element.compraUSD = parseFloat(res0[0].compra * element.importe) ;
                            // }) ;
                            BTC.push(element);
                            
                        }
                        if(element.symbol === 'ETH'){
                            ETH.push(element);
                            //console.log(BTC);
                        }
                        if(element.symbol === 'LTC'){             
                            LTC.push(element);
                           // console.log(element);
                        }
                        if(index === callback2.length){
                           // console.log(BTC);
                            if(callback2.length>0){
                                //console.log(sendMensaje);
                                sendMensaje={   status: 770,
                                                BTC:BTC,
                                                LTC:LTC,
                                                ETC:ETH
                                            };
                                            console.log(' monedas enviadas .....');
                                return res.send(sendMensaje);
                            }else{
    
                            }
                        }else{
                            index++;
                        }
                           
                    });                    
                }
            )
    },
    addMoneda :   (req,res,next)=>{
        tipoMonedaService.getTipoMonedaPorNombre(req.body.nombre,(cb)=>{
            moneda = {
                nombre: req.body.nombre,
                monedero: req.body.monedero,
                symbol: cb['symbol'],
                importe: req.body.importe,
                id_usuario :  req.body.id_usuario,
                cotizacion : 0
            }
            transaccion = {
                monto : req.body.monto,
                cotizacion_usd : req.body.cotizacion_usd,
                tipo_moneda : req.body.nombre,
                tipo_operacion : req.body.tipo_operacion,
                id_usuario : req.body.id_usuario,
                id_monedero : req.body.monedero
            }

            monedaService.addMoneda(moneda,(resp)=>{
                transaccionService.addTransaccion(transaccionService,(resp2)=>{
                    console.log(resp2);
                });
                return res.end(JSON.stringify(resp));
            })
        });
    },
    updateImporte :   (req,res,next)=>{
        transaccion = {
            monto_operacion : req.body.monto_operacion,
            cotizacion_usd : req.body.cotizacion_usd,
            tipo_moneda : req.body.nombre,
            tipo_operacion : req.body.tipo_operacion,
            cotizacion_usd : req.body.cotizacion_usd,
            id_usuario : req.body.id_usuario,
            id_monedero : req.body.monedero
        }
        console.log(transaccion);
       monedaService.updateImporte(req.body,(resp)=>{
        transaccionService.addTransaccion(transaccion,(resp2)=>{
            console.log(resp2);
        });
            return res.send((resp));
        })
    },
    updateCotizacion :  (req,res,next)=>{
        //console.log(req);
        console.log(req.body);
        monedaService.updateCotizacion(req.body,(resp)=>{
            console.log('resp')
            console.log(resp);
           
            return res.send((resp));
        })
    },//transferenciaSaldo
    transferenciaSaldo :  (req,res,next)=>{
        var aux = req.body;
        const transaccionOrigen = {
                monto : req.body.monto,
                tipo_moneda : req.body.nombre_moneda,
                tipo_operacion : req.body.tipo_operacion,
                id_usuario : req.body.id_usuario,
                id_monedero : req.body.id_monedero_origen
        }
        const transaccionDestino = {
            monto : req.body.monto,
            tipo_moneda : req.body.nombre_moneda,
            tipo_operacion : req.body.tipo_operacion,
            id_usuario : req.body.id_usuario,
            id_monedero : req.body.id_monedero_destino
        }
        monedaService.transferenciaSaldo(aux,(resp)=>{
            transaccionService.addTransaccion(transaccionOrigen,(resp2)=>{
                console.log(resp2);
                transaccionService.addTransaccion(transaccionDestino,(resp2)=>{
                    console.log(resp2);
                    return res.send((resp));
                });
            });
            })
    },
    getNombreMonederos :  (req,res,next)=>{
        var aux = req.query;
        const datos = {
            id_usuario: req.query.id_usuario,
            nombre_moneda : req.query.nombre_moneda
        }
        monedaService.getNombreMonederos(datos,(resp)=>{
           // console.log(resp);
            return res.send((resp));
        })
    },
    getNombreMonedero :  (req,res,next)=>{
        var id_monedero = req.query.id_monedero ;
        console.log(id_monedero);
         
        monedaService.getNombreMonedero(id_monedero,(resp)=>{
           // console.log(resp);
            return res.send((resp));
        })
    },
    getIdMonederos :  (req,res,next)=>{
        console.log(req.query);
        monedaService.getIdMonederos(req.query.monedero,req.query.id_usuario,(resp)=>{
            
             return res.send((resp));
         })
    }
}