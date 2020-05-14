const contratoModel = require('../../database/contrato')();
const monedaModel = require('../../database/monedaModel')();
const pago_contratoModel = require('../../database/pago_contrato')();
var http = require('http');
//const cotizacionServide = require ('./cotizacionesService');
const mysql = require('../../database/mysql');
var request = require('request');
var host = '167.99.54.122';
var port = '3001';
connection = mysql.dbConnection();
module.exports={

    crearContrato:  (contrato,cb)=>{
        //console.log(contrato);
        if(contrato.id_monedero  > -1 )  {
            monedaModel.findOne({ where : { id: contrato.id_monedero }}).then(
                resp0 =>{
                   var importeActualizado = parseFloat( resp0['dataValues']['importe']) - parseFloat( contrato.eth_pagado) ;
                   console.log(importeActualizado);
                    monedaModel.update( { importe : importeActualizado},{ where: {id: contrato.id_monedero }}).then(
                        respUpdateMonedero => {
                            console.log('__________________respUpdateMonedero');
                            console.log(respUpdateMonedero);
                            console.log('fin__________________respUpdateMonedero');
                        }
                    );
                }
            )
        }
        var newContrato = new contratoModel();
        newContrato.categoria = contrato.categoria;
        newContrato.cantidad = contrato.cantidad;
        newContrato.eth_pagado = contrato.eth_pagado;
        newContrato.id_usuario = contrato.id_usuario;
        newContrato.id_monedero = contrato.id_monedero;
        newContrato.save().then(
            res=>{
                if(res['dataValues']) {
                    //console.log(res['dataValues']);
                    monedaModel.findOne( { where: {  id_usuario : contrato.id_usuario , monedero:'Kualiandp' } } )
                    .then(
                        resFindKulian => {
                            //console.log(resFindKulian['dataValues']);
                            if( resFindKulian ) { 
                                var importeH = parseFloat( res['dataValues']['eth_pagado'])+resFindKulian['dataValues']['importe'];
                                //console.log(contrato);
                                var linea = 'UPDATE moneda SET importe='+importeH+' WHERE id_usuario=\''+contrato.id_usuario+'\' and monedero=\'Kualiandp\'';
                                //console.log(linea);
                                connection.query(linea,(err,respUpdateKulian)=>{
                                    if(err) {console.log(err)};
                                    if(respUpdateKulian['affectedRows'] == 1) {
                                        var resSend  ={
                                            status:769,
                                            msj:'Guardado con exito!',
                                            id_contrato: res['dataValues']['id']
                                        }
                                        return cb(resSend);
                                    }else {
                                        var resSend  ={
                                            status:768,
                                            msj:'Error al crear moneda kulian!'
                                            
                                        }
                                        return cb(resSend);
                                    }
                                    
                                })
                            }else{
                                var NKM  = new monedaModel;
                                NKM.monedero = 'Kualiandp';
                                NKM.importe = contrato.eth_pagado;
                                NKM.id_usuario = contrato.id_usuario;
                                NKM.symbol = 'ETH' ;
                                NKM.nombre = 'Ethereum';
                                console.log(NKM);
                                NKM.save().then(
                                    respNewKulian =>{
                                        if (respNewKulian['dataValues']){
                                            console.log(respNewKulian);
                                            var resSend  ={
                                                status:769,
                                                msj:'Guardado con exito',
                                                id_contrato: res['dataValues']['id']
                                            }
                                            return cb(resSend);
                                        }else {
                                            var resSend  ={
                                                status:768,
                                                msj:'Error al crear moneda kulian'
                                                
                                            }
                                            return cb(resSend);
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    },getContrato: (contrato,cb)=>{
            contratoModel.findOne({where:{ id: contrato.id , id_usuario:contrato.id_usuario }}).then(
                res=>{
                    console.log(res['dataValues']);
                    return cb(res);
                }
            )
    },
    getEstadisticasContratosV2: async  (contrato)=>{
        return new Promise((resolve,reject)=> {
            var linea ='SELECT SUM(F.eth_pagado) eth_pagado,SUM(F.cantidad) cantidad,SUM(F.contratos) contratos,F.status,SUM(F.eth_recibido) eth_recibido '+
            'FROM (SELECT id, SUM(C.cantidad) cantidad,IFNULL(SUM(C.eth_pagado),0) eth_pagado ,COUNT(1) '+
            'contratos,status,0 eth_recibido FROM contrato C WHERE id_usuario  = \''+contrato.id_usuario+'\' group by C.id,C.STATUS '+
            'UNION SELECT null id,0 cantidad,IFNULL(null,0) eth_pagado,0 contratos,q.status status,SUM(P.eth_pagado) '+
            'FROM pagos_contratos P INNER JOIN contrato q ON P.id_contrato = q.id WHERE q.id_usuario = \''+contrato.id_usuario+'\''+
            'GROUP BY q.status)F GROUP BY F.status;'
            console.log('linea estadisticas contrato..')
             connection.query(linea,(err,res,next)=>{
                 if(err) { console.log(err);}
                 console.log(res);
                resolve(res);
            })
        });
    },
    getContratos:  async (contrato,cb)=>{
        var linea = `SELECT C.*,SUM(P.eth_pagado) as eth_recibido,M.monedero FROM contrato C LEFT  JOIN pagos_contratos P  
        ON P.id_contrato = C.id INNER JOIN moneda M ON M.id=C.id_monedero WHERE C.id_usuario='${contrato.id_usuario}' GROUP BY C.id`;
        console.log(' .. linea get contratos');
        connection.query(linea,(err,resp)=> {
            if(err) {console.log(err);}
           // console.log(resp);
            return cb(resp);
        });
    }, 
     getCantidadContratos: async(contrato,cb)=>{
      var linea =  `SELECT categoria,sum(cantidad) as cantidad FROM contrato WHERE id_usuario=? GROUP BY categoria`;
      console.log('... linea get cantidad contratos');
      var contratos = {
          bajo : 0,
          medio: 0,
          alto : 0
      }
      connection.query(linea,[contrato.id_usuario],(err,res) => {
          if ( err ) { console.log(err); } else {
              res.forEach(element => {
                  if(element.categoria === 'Bajo riesgo' ) {
                      contratos.bajo = element.cantidad;
                  }
                  if(element.categoria === 'Medio riesgo' ) {
                    contratos.medio = element.cantidad;
                }
                if(element.categoria === 'Alto riesgo' ) {
                    contratos.alto = element.cantidad;
                }
              });
              return cb(contratos);
          }
      })  
    },
    getListaPagos :async(contrato,cb)=> {
        pago_contratoModel.findAll({     where: {  id_contrato      : contrato.id_contrato    }    })
        .then(
            res =>{ 
                if( res ) { 
                    const linea = `SELECT SUM(eth_pagado) recibido,COUNT(1) N FROM pagos_contratos WHERE id_contrato=?`;
                    console.log(linea);
                    connection.query(linea, [contrato.id_contrato],(err1,res1)=>{
                        if(err1) { 
                            const resSend = {
                                status: 780 ,
                                pagos: null
                            }
                            return cb(resSend);
                        }
                        var proveedor = 'Copay';
                        var symbol= 'ETH'
                        var path = `/getCotizacion?proveedor=${proveedor}&base=USD&symbol=${symbol}`;
 
                        var options = {
                            host: host,
                            port: port,
                            path: path,
                            method: 'GET',
                            encoding: null
                        };
                        invocarServicio(options, null, function (data, err) {
                            if (err) {
                                next(null, err);
                            } else {
                                console.log('cotizacion bitstamp recibido ...')
                                //console.log(data);
                                const resSend = {
                                    status: 780 ,
                                    pagos: res,
                                    N: res1[0].N,
                                    recibido:res1[0].recibido,
                                    promedio_recibido: parseFloat(res1[0].recibido)/parseFloat(res1[0].N),
                                    CopayUSD:  data
                                }
                            return cb(resSend);
                            }
                        });
                       
                        // cotizacionServide.('Copay','ETH','USD',(cb2)=> {
                        //     console.log('cb2')
                        //     const resSend = {
                        //         status: 780 ,
                        //         pagos: res,
                        //         N: res1[0].N,
                        //         recibido:res1[0].recibido,
                        //         promedio_recibido: parseFloat(res1[0].recibido)/parseFloat(res1[0].N),
                        //         CopayUSD:  cb2['dataValues']
                        //     }
                        //     return cb(resSend);
                        // });
                    });
                } else{
                    const resSend = {
                        status: 780 ,
                        pagos: null
                    }
                    return cb(resSend);
                }
            }
        )
    },
    activarContrato:(contrato,cb)=>{
        var diaActual = new Date;
        contratoModel.update({fecha_inicio: diaActual,pagos_registrados:0,status:'Activo' },
        {where:
            { id: contrato.id , id_usuario:contrato.id_usuario , status:'Sin activar' }}).then(
            resp=>{
                if ( resp == 1){
                    var resSend  ={
                        status:770,
                        msj:'Contrato activado con exito'
                    }
                    return cb(resSend);
                } else {
                    var resSend  ={
                        status:771,
                        msj:'Ops, este contrato ya se encuentra activado'
                    }
                    return cb(resSend);
                }
            }
        )
    },
    registrarPagoV3: async (contrato)=>{
        return new Promise((resolve,reject) => {
            var linea = `SELECT SUM(cantidad) as cantidad FROM contrato where id_usuario=? and categoria=?`;
              console.log('linea registrar pagos ..');
                connection.query(linea,[contrato.id_usuario,contrato.tipo_contrato],(err,resp)=>{
                 if(err){ console.log(err) }
                 console.log('select ok.');
                 if( !resp ){
                     console.log('null')
                 }else{
                     //console.log('cantidad de contratos: '+resp[0].cantidad)
                     var unidad = parseFloat(contrato.eth_recibido) / parseFloat(resp[0].cantidad);
                     //console.log('contrato.eth_recibido '+contrato.eth_recibido + '     unidad    '+unidad );
                     var linea2 = `SELECT * FROM contrato where id_usuario=? and categoria=? and status='Activo'`;
                     //console.log(linea2);
                     connection.query(linea2,[contrato.id_usuario,contrato.tipo_contrato],(err2,resp2)=>{
                         if(err2){ console.log(err) }
                         contratoModel.update({pagos_registrados:sequelize.literal('pagos_registrados + 1')},
                         {where: {id_usuario : contrato.id_usuario , status:'Activo'  }})
                         .then(
                             resp3 =>{     
                                 console.log('monedero    '+resp2[0].id_monedero);
                                  monedaModel.findOne({where:{id: resp2[0].id_monedero}}).then(
                                     resFind => {
                                         console.log('respfind')
                                         console.log(resFind['dataValues']['importe']+'    '+contrato.eth_recibido);
                                         if(resFind['dataValues']){
                                             var auxiliar_importe =parseFloat( resFind['dataValues']['importe'])+parseFloat( contrato.eth_recibido );
                                             console.log('NUEVO IMPORTE      ' + auxiliar_importe);
                                             console.log('NUEVO IMPORTE      '+resFind['dataValues']['importe']);
                                             monedaModel.update({importe : auxiliar_importe},{
                                                 where: {
                                                    id : resp2[0].id_monedero
                                                 }
                                             })
                                             .then(
                                                 resp10 => {
                                                     console.log(resp10);
                                                     for (let index = 0; index < resp2.length; index++) {
                                                         console.log('index   '+index)
                                                         const element = resp2[index];
                                                        // console.log(parseFloat(element.cantidad)+'     '+parseFloat(unidad))
                                                         var importe= parseFloat(element.cantidad)*parseFloat(unidad);
                                                         //console.log('cantidadddddddd'+importe);
                                                         var pago = new pago_contratoModel();
                                                         pago.eth_pagado = parseFloat( importe );
                                                         pago.id_contrato =element.id ;
                                                         pago.fecha = contrato.fecha;
                                                         pago.save()
                                                         .then(
                                                             resp4 => {console.log( 'ok');}
                                                         )
                                                         .catch(
                                                             err4=>  {console.log( err4);
                                                            
                                                         var resSend  ={
                                                             status:773,
                                                             msj:'Hubo un error'
                                                             }
                                                             resolve(resSend);
                                                         })
                                                     if(index+1 == resp2.length){
                                                         var resSend  ={
                                                             status:772,
                                                             msj:'Contrato actualizado con exito'
                                                         }
                                                         resolve(resSend);
                                                     }
                                                     }
                                                 }
                                             )
                                         }
                                     }
                                 )
                                 .catch(
                                     errE => {
                                         console.log(errE);
                                     }
                                 )
                     })
                     .catch(
                         err=>{
                             console.log(err);
                             var resSend  ={
                                 status:773,
                                 msj:'Hubo un error'
                             }
                             resolve(resSend);
                         }
                         
                     )
                     });
                 }   
             })
        });
    }
}
async function   invocarServicio(options, jsonObject, next) {
    var req = await http.request(options, function(res) {
        var contentType = res.headers['application/json; charset=utf-8'];
        /**
         * Variable para guardar los datos del servicio RESTfull.
         */
        var data = '';
 
        res.on('data', function (chunk) {
            // Cada vez que se recojan datos se agregan a la variable
            data += chunk;
        }).on('end', function () {
            // Al terminar de recibir datos los procesamos
            var response = null;
            //response = data;

            // // Nos aseguramos de que sea tipo JSON antes de convertirlo.
            // if (contentType.indexOf('application/json') != -1) {
            //     response = JSON.parse(data);
            //     console.log(response);
            // }
            response = JSON.parse(data);
            // Invocamos el next con los datos de respuesta
            next(response, null);
        })
        .on('error', function(err) {
            // Si hay errores los sacamos por consola
            console.error('Error al procesar el mensaje: ' + err)
        })
        .on('uncaughtException', function (err) {
            // Si hay alguna excepción no capturada la sacamos por consola
            console.error(err);
        });
    }).on('error', function (err) {
        // Si hay errores los sacamos por consola y le pasamos los errores a next.
        console.error('HTTP request failed: ' + err);
        next(null, err);
    });
 
    // Si la petición tiene datos estos se envían con la request
    if (jsonObject) {
        req.write(jsonObject);
    }
 
    req.end();
};