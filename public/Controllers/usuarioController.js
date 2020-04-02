

const usuarioService =require('../Services/usuarioService');


module.exports = {
    getUsuarios : (req,res,next)=>{
        usuarioService.getUsuariosService().then(
          resp=>{
            console.log(resp);
            console.log(resp);
              return res.send(resp);
          }
      )
    }
}