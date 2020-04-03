const monedaModel = require('../database/monedaModel')();
module.exports={
  getMonedasService:    ()  =>
        new Promise((resolve,reject)=>{
            monedaModel.findAll()
               .then(
                   resp=>{
                    const sendInfo={
                           status: 752,
                           msj:'Monedas encontradas',
                           monedas: resp
                         }
                
                      resolve(sendInfo);
                    }
               )
               .catch(
                 err=>{
                   reject(err);
                 }
               )
       }),
  addMoneda: function (mon,callback){
   // new Promise((resolve,reject)=>{
      var moneda = new monedaModel();
      moneda.nombre=mon.nomsbre;
      moneda.cotizacion=mon.cotizacion;
      moneda.importe = 0;
      moneda.save().then(
        resp=>{
          console.log(resp['dataValues']);
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
    monedaModel.update(
                        {importe: mon.importe},
                        {where:{id:mon.id}}
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
    return callback()
  },
  updateCotizacion: (mon,callback)=>{
    monedaModel.update(
                        {importe: mon.cotizacion},
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