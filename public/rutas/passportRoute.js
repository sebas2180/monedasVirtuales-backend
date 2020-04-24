//const jwt = require('jsonwebtoken');
//var verifyToken = require('./verifyToken');
var passportController = require('../Controllers/passportController');
//var crypto            = require('crypto');
    function usuarioRoute(app,passport){
       
        app.post('/signup',passportController.signup);

        app.post('/login', function(req, res, next) {
          console.log('a');
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
              console.log('logeado');
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

        app.get('/logout', (req, res, next) => {
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
}

module.exports = usuarioRoute;