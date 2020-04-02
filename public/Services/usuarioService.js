const usuarioModel = require('../database/usuarioModel')();
module.exports={
    getUsuariosService:  ()=>
        new Promise((resolve,reject)=>{
             usuarioModel.findAll()
               .then(
                   resp=>{
                       //console.log(resp[0].dataValues);
                       const sendInfo={
                           status: 752,
                           msj:'Banco encontrados',
                           bancos: resp[0].dataValues
                         }
                         console.log(sendInfo);
                      resolve(sendInfo);
                   }
               )
       })
    
} 