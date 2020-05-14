const monedaModel = require('../../database/monedaModel')();
var Sequelize = require('sequelize');
const mysql = require('../../database/mysql');
connection = mysql.dbConnection();
module.exports={

  getMonedasService:  (callback)  =>
            monedaModel.findAll() .then(
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
    )},
    transferenciaSaldo:(transferencia,cb)=>{
      const moneda_origen = {
        id_usuario : transferencia.id_usuario,
        nombre_moneda : transferencia.nombre_moneda,
        id_monedero_origen : transferencia.id_monedero_origen,
        saldo_origen : transferencia.saldo_origen,
        saldo_nuevo_origen : transferencia.saldo_nuevo_origen
      }
      monedaModel.update({importe: moneda_origen.saldo_nuevo_origen},
                          { where : { id_usuario : moneda_origen.id_usuario , nombre : moneda_origen.nombre_moneda, 
                                      importe: moneda_origen.saldo_origen,id : moneda_origen.id_monedero_origen }}
          )  .then(
        resMoneda => {
          
          if (resMoneda.length == 1 ) {
          const moneda_destino = {
            id_usuario : transferencia.id_usuario,
            nombre_moneda : transferencia.nombre_moneda,
            id_monedero_destino : transferencia.id_monedero_destino,
            saldo_destino : transferencia.saldo_destino,
            saldo_nuevo_destino : transferencia.saldo_nuevo_destino
          }
          console.log('moneda_destino')
          console.log(moneda_destino )
          monedaModel.update({importe: moneda_destino.saldo_nuevo_destino},
            { where : {   importe : moneda_destino.saldo_destino, id : moneda_destino.id_monedero_destino }})
              .then(
                  resdestino => {
                    console.log(resdestino)
                  if (resdestino.length === 1 ) {
                    const sendResp = {
                      status: 737,
                      msj: 'Actualizacion exitosa!.'
                    }
                    return cb(sendResp);
                  } else {
                    const sendResp = {
                      status: 736,
                      msj: 'Hubo un error al actualizar los saldos, por favor reintente en un rato.!'
                    }
                    return cb(sendResp);
                  }
            }
          )
          .catch(
            errDestino =>  {
              console.log( errDestino );
            }
          )
          } else {
            const sendResp = {
              status: 736,
              msj: 'Hubo un error al actualizar los saldos, por favor reintente en un rato.'
            }
            return cb(sendResp);
          }
        })
      }
  ,getMoneda:(moneda,callback)=>{
      monedaModel.findOne({ where : { id_usuario : moneda.id_usuario , nombre : moneda.nombre_moneda, monedero : moneda.nombre_monedero }}
                      )
      .then(
        resMoneda=>{
          console.log('resMoneda');
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
      )
    .catch(
      err=>{
        console.log(err);
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
  ,getRegistroMoneda:  (usuario)=>{
    return new Promise((resolve,reject)=>{
     // console.log(usuario);
      monedaModel.findAll({ where :{ id_usuario: usuario }})
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

  }, 
  getBuscarNombre: (monedero,callback) => {
    monedaModel.findOne( { where: { nombre : monedero.nombre , monedero : monedero.monedero} } ).then(
      res=> {
       
        if( res  == null){
          const sendResp= {
            status : 750,
            msj: 'No se encontró monedero'
          }
          return callback(sendResp);
        } else {
          if( res  != null){
            const sendResp= {
              status : 751,
              msj: 'Se encontró monedero'
            }
            return callback(sendResp);
          }
        }
      }
    )
  }
},

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