


const transaccionService =require('../Services/transaccionService');
const monedaService =require('../Services/monedaService');
const tipoMonedaService = require ('../Services/tipo_monedaService');

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
    getMonedas : async (req,res,next)=>{
        var sendMensaje = [];
        var BTC = [] , ETH=[],LTC= [];
        var symbols = [];
         monedaService.getSimbolos(req.payload.usuario,(callback)=>{
            callback.forEach(element => {
                symbols.push(element['dataValues']['symbol']);
            });
            let sinRepetidos = symbols.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
            console.log(sinRepetidos);
            var index =0;
            console.log(sinRepetidos.length);
            if(sinRepetidos==0){
                sendMensaje={   
                    status: 771,
                    BTC:BTC,
                    LTC:LTC,
                    ETC:ETH
                };
            return res.send(sendMensaje);
            }
            sinRepetidos.forEach(symb => {
                ++index;
               // console.log('forEach:    '+symb);
                 monedaService.getRegistroMoneda(symb,req.payload.usuario).then(
                    callback2=>{
                       // console.log(callback2)                       //console.log(callback2);
                        if(symb === 'BTC'){
                            BTC.push(callback2);
                        }
                        if(symb === 'ETH'){
                            ETH.push(callback2);
                            console.log(BTC);
                        }
                        if(symb === 'LTC'){             
                            LTC.push(callback2);
                            console.log(LTC);
                        } 
                        if(sinRepetidos[sinRepetidos.length -1 ]===symb){
                            //console.log(sendMensaje);
                            sendMensaje={   status: 770,
                                            BTC:BTC,
                                            LTC:LTC,
                                            ETC:ETH
                                        };
                            return res.send(sendMensaje);
                        }
                     }
                 )

            })
           
        }) 
            // console.log(sendMensaje);
            // sendMensaje={BTC:BTC,LTC:LTC,ETC:ETH};
            // return res.send(sendMensaje);
        
    },
    addMoneda :  async (req,res,next)=>{
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
                monto : treq.body.monto,
                cotizacion_usd : req.body.cotizacion_usd,
                tipo_moneda : req.body.nombre,
                tipo_operacion : req.body.tipo_operacion,
                id_usuario : req.body.id_usuario
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
        console.log('___________________________________________')
        
        transaccion = {
            monto_operacion : req.body.monto_operacion,
            cotizacion_usd : req.body.cotizacion_usd,
            tipo_moneda : req.body.nombre,
            tipo_operacion : req.body.tipo_operacion,
            cotizacion_usd : req.body.cotizacion_usd,
            id_usuario : req.body.id_usuario
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
    }
    ,
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
    getIdMonederos :(req,res,next)=>{
        console.log(req.query);
        monedaService.getIdMonederos(req.query.monedero,req.query.id_usuario,(resp)=>{
            
             return res.send((resp));
         })
    }
}