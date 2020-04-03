const usuarioModel = require('../../database/usuarioModel')();
module.exports={
    getUsuariosService:  ()=>
        new Promise((resolve,reject)=>{
             usuarioModel.findAll()
               .then(
                   resp=>{
                    const sendInfo={
                           status: 752,
                           msj:'Banco encontrados',
                           bancos: resp
                         }
                         console.log(sendInfo);
                      resolve(sendInfo);
                    }
               )
       })
    
} 