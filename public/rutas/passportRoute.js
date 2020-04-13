//const jwt = require('jsonwebtoken');
//var verifyToken = require('./verifyToken');
var passportController = require('../Controllers/passportController');
//var crypto            = require('crypto');
    function usuarioRoute(app,passport){
       
        app.post('/signup',passportController.signup);

        app.post('/login', function(req, res, next) {
          console.log(req.body)
        passport.authenticate('local', function(err, user, info) {
          //console.log(req.body.usuario);
          if (err) { 
            return next(err); 
          }
          console.log(user);
          if (!user){
            console.log('no logeado');
             { const devolver={
             status:702,
             success:'Contraseña y/o usuario no valido'
          }
          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
          return res.send(JSON.stringify(devolver)); }
          }else{
            req.logIn(user, function(err) {
              if (err) { return next(err); }
               verifyToken.login(req.body.usuario,req.body.rol,(token)=>{
                const devolver={
                  status:703,
                  success:'usuario logeado',
                  user: user,
                  token: token
                }
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                return res.send(JSON.stringify(devolver));
               })
            });
          }       
        })(req, res, next);   
    });

        app.get('/logout',isAuthenticated, (req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            console.log('desconexion');
            req.logout();
            req.session.destroy(function (err) {
            if(err){
                return res.end(JSON.stringify({ status:998, msj:'Error en desconectar'   }));
            }
              const sendInfo={
                status: 999,
                msj:'Desconexion correcta'
              }
            return res.end(JSON.stringify(sendInfo));
        });
      });



    // app.get('/getRol',isAuthenticated,(req,res,next)=>{
    //     usuarioModel.getRol(req.query.id_user)
    //     .then(
    //       resp=>{
    //         res.send(resp);
    //       }
    //     )
    // });
    // app.get('/panelUser',isAuthenticated, (req, res, next) => {
    //     res.render('profile');
    // });
    // app.get('/getUsuario',isAuthenticated, (req, res, next) => {
    //  resp =usuarioModel.getUsuario(req.query.id)
    //  .then(
    //    resp=>{
    //     if(!resp){
    //       console.log('null');
    //       const sendInfo={
    //           status: 709,
    //           msj: 'Ops!.No se encontraron el usuario',
    //           beneficiario: ''
    //         }
    //         res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //         return res.end(JSON.stringify(sendInfo));
    //   }else{
    //     const sendInfo={
    //       status: 710,
    //       msj: 'Perfecto!, se han encontrado usuario',
    //       usuario: resp
    //     }

        
    //     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //     return res.end(JSON.stringify(sendInfo));
    //    }
    //   }
    //  )

      
    // });
    // app.get('/getAllUsers',isAuthenticated, (req, res, next) => {
    //   usuarioModel.getUsuarios()
    //   .then(
    //     resp=>{

    //      if(!resp){
           
    //        const sendInfo={
    //            status: 713,
    //            msj: 'Ops!.No se encontraron usuarios',
    //            usuarios: ''
    //          }
    //          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //          return res.end(JSON.stringify(sendInfo));
    //    }else{
    //      const sendInfo={
    //        status: 714,
    //        msj: 'Perfecto!, se han encontrado usuarios',
    //        usuarios: resp
    //      }    
    //      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //      return res.end(JSON.stringify(sendInfo));
    //     }
    //    }
    //   )
    //  });
 
    //  app.get('/getUserForEmail',isAuthenticated, (req, res, next) => {
    //   resp =usuarioModel.getUserForEmail(req.query.email)
    //   .then(
    //     resp=>{
    //      if(!resp){
    //        console.log('null');
    //        const sendInfo={
    //            status: 715,
    //            msj: 'Ops!.No se encontraron usuario con el mail proporcionado',
    //            beneficiario: ''
    //          }
    //          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //          return res.end(JSON.stringify(sendInfo));
    //    }else{
    //      const sendInfo={
    //        status: 716,
    //        msj: 'Perfecto!, se han encontrado usuario/s con el mail proporcionado',
    //        usuario: resp
    //      }
 
         
    //      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //      return res.end(JSON.stringify(sendInfo));
    //     }
    //    }
    //   )
 
       
    //  });
    //  app.get('/getUserForUser',isAuthenticated, (req, res, next) => {
    //   resp =usuarioModel.getUserForUser(req.query.usuario)
    //   .then(
    //     resp=>{
    //      if(!resp){
    //        console.log('null');
    //        const sendInfo={
    //            status: 717,
    //            msj: 'Ops!.No se encontraron usuario con el usuario proporcionado',
    //            beneficiario: ''
    //          }
    //          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //          return res.end(JSON.stringify(sendInfo));
    //    }else{
    //      const sendInfo={
    //        status: 718,
    //        msj: 'Perfecto!, se han encontrado usuario/s con el usuario proporcionado',
    //        usuario: resp
    //      }
 
         
    //      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //      return res.end(JSON.stringify(sendInfo));
    //     }
    //    }
    //   )
 
       
    //  });
    // app.post('/login', function(req, res, next) {
    //     passport.authenticate('local', function(err, user, info) {
    //       if (err) { 
    //         return next(err); 
    //       }
    //       console.log(user['id']);
    //       if (!user){
    //         console.log('no logeado');
    //          { const devolver={
    //          status:702,
    //          success:'usuario no existente'
    //       }
    //       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              
    //       return res.send(JSON.stringify(devolver)); }
    //       }else{
    //         req.logIn(user, function(err) {
    //           if (err) { return next(err); }
    //           console.log('logeado');
    //           const devolver={
    //             status:703,
    //             success:'usuario logeado',
    //             user: user
    //           }
    //           res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //           return res.send((devolver));
    //         });
    //       }       
    //     })(req, res, next);   
    // });

//     app.get('/logout',isAuthenticated, (req, res, next) => {
//         console.log('desconexion');
//         req.logout();
//         req.session.destroy(function (err) {
//           const sendInfo={
//             status: 999,
//             url:'Desconexion correcta'
//           }
    
          
//             res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//            return res.end(JSON.stringify(sendInfo.url));
//       });
//       });
//     app.put('/addUsusario',isAuthenticated,(req,res) =>{
//         usuarioModel.addUsuario(req.body)
//         .then(
//             resp=>{
//                       console.log(resp);
//                       return res.end(JSON.stringify(resp));
//             }
//         )
//         .catch(
//             err =>{
//                 console.log(err);
//             }
//         )
//     });

//     app.get('/disabledUsuario',isAuthenticated,(req,res) =>{
//       usuarioModel.disabledUsuario(req.query)
//       .then(
//           resp=>{
//               console.log(resp);
//               return res.end(JSON.stringify(resp));
//           }
//       )
//       .catch(
//           err =>{
//               console.log(err);
//           }
//       )
//   });
//   app.get('/validarPassword',isAuthenticated,(req,res) =>{
//     console.log(req.query);
//     usuarioModel.validarPassword(req.query)
//     .then(
//         resp=>{
//             console.log(resp);
//             return res.end(JSON.stringify(resp));
//         }
//     )
//     .catch(
//         err =>{
//             console.log(err);
//         }
//     )
// });
// app.get('/usuarioVerificado',isAuthenticated,(req,res) =>{
//   console.log(req.query);
//   usuarioModel.usuarioVerificado(req.query)
//   .then(
//       resp=>{
//           console.log(resp);
//           return res.end(JSON.stringify(resp));
//       }
//   )
//   .catch(
//       err =>{
//           console.log(err);
//       }
//   )
// });
// app.post('/updateUsuario',isAuthenticated,(req,res) =>{

//   usuarioModel.updateUsuario(req.body)
//   .then(
//       resp=>{
//           console.log(resp);
//           return res.end(JSON.stringify(resp));
//       }
//   )
//   .catch(
//       err =>{
//           console.log(err);
//       }
//   )
// });
}

module.exports = usuarioRoute;

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
  console.log('aut');
    return next();

}
