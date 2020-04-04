const usuarioModel = require('../../database/usuarioModel')();
var crypto            = require('crypto');
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
       }),
       getUsuarioPorNick: (nick,callback)=>{
        usuarioModel.findOne({     where: {  usuario: nick      }     })
        .then(
          user=>{
            if(user) {
              console.log('if');
              var resp= {
                status:750,
                msj:"Nombre de usuario ya utilizado",
                usuario:user['dataValues']
              }
              return callback(null,resp);
            }else{
              console.log('else');
              var resp= {
                status:751,
                msj:"Usuario no encontrado!",
                usuario:null
              }
              return callback(null,resp);
            }
          }
        )
        .catch(
          err=>{
            console.log(err);
            var err= {
              status:752,
              msj:"Usuario no encontrado!"
            }
            return callback(err,null);
          }
        )
       },
       createUsuario:(usuario,callback)=>{
       // console.log('usuarioooo');
        //console.log(usuario.password);
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        salt = salt+''+usuario.password;
        var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
        const newUser = new usuarioModel();
        newUser.usuario= usuario.usuario;
        newUser.password = encPassword;
        newUser.pais= usuario.pais;
        newUser.email = usuario.email;
        newUser.createAt = usuario.create_at;
        newUser.rol = 'cliente';
        newUser.save().then(
          respCreate=>{
              const cb= {
                status:753,
                msj:"Usuario creado con exito!"
              }
            return callback(cb);
          }
        )

       },getUsuarioPorId: (id,callback)=>{
        usuarioModel.findOne({     where: {  id: id      }     })
        .then(
          user=>{
           // console.log(user['dataValues']);
            var resp = {};
            var error = {};
            if(user) {
               resp= {
                status:756,
                msj:user
              }
            }else{
               error= {
                status:757,
                msj:user
              }
            }
            console.log(user['dataValues']);
            return callback(error,resp);
          }
        )
       },
    
} 