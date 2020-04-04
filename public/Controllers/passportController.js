

const usuarioService =require('../Services/usuarioService');
const passport = require('passport');
const express= require('express');
const app = express();

module.exports = {
    signup : (req,res,next)=>{
       //console.log(req.body.usuario);
        usuarioService.getUsuarioPorNick(req.body.usuario,(error,callback)=>{
            //console.log(callback);
            if(callback.status == (751 || 752)){
               // console.log(callback);
                usuarioService.createUsuario(req.body,(callback2)=>{
               //     console.log('callback2')
                    return res.send(callback2);
                });    
            }else{
                return res.send(callback);
            }
    });
    }

}