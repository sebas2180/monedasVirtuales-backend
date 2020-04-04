 
var flash             = require('connect-flash');
var crypto            = require('crypto');
var LocalStrategy     = require('passport-local').Strategy;
var Store             = require('express-session').Store;
const mysql = require('.././database/mysql');
const User = require('.././database/usuarioModel')();
const connection = mysql.dbConnection();
const usuarioService =require('../public/Services/usuarioService');

 function ps(app,passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
      console.log('hola');
      usuarioService.getUsuarioPorId(id,(err,cb)=>{
        console.log(cb);
         done(err, cb);
      })
    });
    passport.use('local', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'password',
      passReqToCallback: true //passback entire req to call back
    } , function (req, usuario, password, done){
      console.log(usuario);
          if(!usuario || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
          var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
          
          
          console.log("select * from usuario where usuario = ?", [usuario]);

          connection.query("select * from usuario where usuario = ?", [usuario], function(err, rows){ 
              console.log(rows);
            if (err) return done(req.flash('message',err));
            if(!rows.length){ 
              return done(null, false, req.flash('message','Invalid username or password.')); 
            }else{
              console.log('password  :  '+password);
              salt = salt+''+password;
              var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
              var dbPassword  = rows[0].password;
              console.log(dbPassword);
              console.log(encPassword);
              if(!(dbPassword == encPassword)){
                  return done(null, false, req.flash('message','Invalid username or password.'));
               }
              return done(null, rows[0]);
            }
          });
        }
    ));
    passport.use('signup', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'password',
      passReqToCallback: true
    }, 
    async (req, usuario, password, done) => {
      const user = await  User.findOne({
        where: {  usuario: 'sebas'      }     });
      console.log(user);
      if(user) {
        return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
      } else {
        const newUser = new User();
        newUser.email = email;
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        salt = salt+''+password;
        var userPassword = crypto.createHash('sha1').update(salt).digest('hex');
        //         console.log('salt');
        newUser.password = userPassword;
      console.log(userPassword);
        await newUser.save();
        done(null, newUser);
      }
    }));
  }
      module.exports = ps;