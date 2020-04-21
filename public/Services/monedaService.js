const monedaModel = require('../../database/monedaModel')();
var Sequelize = require('sequelize');
 
module.exports={
  getMonedasService:    (callback)  =>
            monedaModel.findAll()
               .then(
                   resp=>{
                    const sendInfo={
                           status: 752,
                           msj:'Monedas encontradas',
                           monedas: resp
                    }
                    console.log(sendInfo);
                      return callback(sendInfo);
                    }
               )
               .catch(
                 err=>{
                   console.log(err);
                  const sendInfo={
                    status: 763,
                    msj:'Error en extraer informacion'
                } 
                return callback(sendInfo);
                   
                 }
  )
  ,getSimbolos:(usuario,callback)=>{
    //console.log('el usuario'+usuario);
    monedaModel.findAll({ attributes: ['symbol'],where : { id_usuario : usuario }},{ group :['SYMBOL'] })
    .then(
      respSimbolos=>{
          return callback(respSimbolos);
        }
    )}
  ,getMoneda:(moneda,callback)=>{
      monedaModel.findOne({ where : { id_usuario : moneda.id_usuario , nombre : moneda.nombre_moneda, monedero : moneda.nombre_monedero }}
                      )
      .then(
        resMoneda=>{
         if ( resMoneda) { 
          const sendInfo = {
            status: 770 ,
            moneda: resMoneda
          }
          return callback(sendInfo);
         } else {
          const sendInfo = {
            status: 771 ,
            moneda: 'null'
          }
          return callback(sendInfo);
         }
          }
      )}
  ,getNombreMonederos:(datos,callback)=>{
    console.log(datos);
    monedaModel.findAll({ attributes: ['monedero'],where : { id_usuario : datos.id_usuario,nombre:datos.nombre_moneda }},{ group :['monedero'] })
    .then(
      respSimbolos=>{
          return callback(respSimbolos);
        }
    )}
  ,getNombreMonedero:(id_monedero,callback)=>{
      console.log('id_monedero    '+id_monedero);
      monedaModel.findOne({ attributes: ['monedero'],where : { id : id_monedero }})
      .then(
        respNombre=>{
          
            return callback(respNombre);
          }
      )}
  ,getIdMonederos:(nombreMonedero,usuario,callback)=>{
    console.log('el usuario'+usuario);
    monedaModel.findOne({ attributes: ['id'],where : { id_usuario : usuario,monedero:nombreMonedero }})
    .then(
      resIdMonedero=>{
          return callback(resIdMonedero);
        }
    )}
  ,getRegistroMoneda:  (symbol,usuario)=>{
    return new Promise((resolve,reject)=>{
      console.log(usuario);
      monedaModel.findAll({ where :{symbol: symbol, id_usuario: usuario }})
        .then(
            resBTC=>{
              //console.log(resBTC);
              var respuesta =[];
              resBTC.forEach(element => {
                respuesta.push(element['dataValues']);
              });
              //console.log(respuesta);
                resolve(respuesta);
            }
        )
    })  
  }
  ,getImportes: (usuario,cb)=>{
     monedaModel.findAll({
      attributes: [  'nombre',[sequelize.fn('sum', sequelize.col('importe')), 'importe']],
      group : ['nombre'],
      where:{
        id_usuario:usuario
          }
        }).then(
      res=>{
        return cb(res);
      }
    )
    
  },
//   getMonedasService2:      (callback)  =>
//    monedaModel.findAll({ attributes: [ 'symbol']},{ group :['SYMBOL'] })
//      .then(
//          resp=>{
//            getBitcoin(resp,(cb)=>{
//             console.log(cb);
//             var sendInfo={
//               status: 752,
//               msj:'Monedas encontradas',
//               ETC: ETH_Monedas,
//               BTC: BTC_Monedas,
//               LTC: LTC_Monedas
//             }
//             //console.log(sendInfo);
//               return callback(sendInfo);
//           })
//         })
//      .catch(
//        err=>{
//          //console.log(err);
//         const sendInfo={
//           status: 763,
//           msj:'Error en extraer informacion'
//       } 
//       return callback(sendInfo);
         
//        }
// ),
  addMoneda: function (mon,callback){
      var moneda = new monedaModel();
      moneda.nombre=mon.nombre;
      moneda.monedero=mon.monedero;
      moneda.cotizacion=0;
      moneda.id_usuario = mon.id_usuario;
      moneda.symbol = mon.symbol;
      moneda.importe = mon.importe;
      moneda.save().then(
        resp=>{
          const sendInfo={
            status: 752,
            msj:'Moneda guardada' 
          }
      return callback(sendInfo);
        }
      )
      .catch(
        err=>{
          const sendInfo={
            status: 753,
            msj:'Monedas no guardada' 
            
          }
          return callback(sendInfo);
        }
      )
  //  })
  },
  updateImporte: (mon,callback)=>{
    console.log(mon);
    monedaModel.update(
                        {importe: mon.importe},
                        {where:{id:mon.id_monedero}}
                    ).then(
                      resp=>{
                        const sendInfo={
                          status: 754,
                          msj:'Importe actualizado con exito' 
                        }
                        return callback(sendInfo);
                      }
                    )
                    .catch(
                      error=>{
                        const sendInfo={
                          status: 755,
                          msj:'Error al actualizar importe' 
                        }
                        return callback(sendInfo);
                      }
                    )
  },
  updateCotizacion: (mon,callback)=>{
    monedaModel.update(
                        {cotizacion: mon.cotizacion},
                        {where:{id:mon.id}}
                    ).then(
                      resp=>{
                        const sendInfo={
                          status: 756,
                          msj:'Cotizacion actualizada con exito' 
                        }
                        return callback(sendInfo);
                      }
                    )
                    .catch(
                      error=>{
                        const sendInfo={
                          status: 757,
                          msj:'Error al actualizar cotizacion' 
                        }
                        return callback(sendInfo);
                      }
                    )

  }
} 

function getBitcoin (mon,callback){
  var BTC_Monedas =[];
  var ETH_Monedas=[];
  var LTC_Monedas=[];

  console.log('mon');//console.log(mon);
  mon.forEach(element => {
    if(element == 'BTC'){
      monedaModel.findAll({ where :{'symbol':'BTC' }})
      .then(
          resBTC=>{
            console.log('btc encontrado');
            //console.log(resBTC[0]['dataValues']);
            BTC_Monedas  = resBTC[0]['dataValues'];
           // console.log(BTC_Monedas);
          }
      )
    }
    if(element == 'ETH'){
      monedaModel.findAll({ where :{'symbol':'ETH' }})
      .then(
          resETH=>{
            console.log('etc encontrado');
            ETH_Monedas  = resETH;
          }
      )
    }
    if(element == 'LTC'){
      monedaModel.findAll({ where :{'symbol':'LTC' }})
      .then(
          resLTC=>{
            console.log('ltc encontrado');
            LTC_Monedas  = resLTC['dataValues'];
          }
      )
    }
  });
  return callback({ETH_Monedas,BTC_Monedas,LTC_Monedas});
}