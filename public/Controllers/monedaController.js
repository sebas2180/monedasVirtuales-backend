

const usuarioService =require('../Services/monedaService');


module.exports = {
    getMonedas : (req,res,next)=>{
        usuarioService.getMonedasService().then(
          resp=>{
              return res.send(resp);
          }
      )
    },
    addMoneda :  async (req,res,next)=>{

        usuarioService.addMoneda(req.body,(resp)=>{
            console.log(resp);
            return res.end(JSON.stringify(resp));
        })
    },
    updateImporte :   (req,res,next)=>{
       // console.log(req.body);
        usuarioService.updateImporte(req.body,(resp)=>{
            console.log(resp);
            return res.send((resp));
        })
    },
    updateCotizacion :  (req,res,next)=>{
        //console.log(req);
        console.log(req.body);
        usuarioService.updateCotizacion(req.body,(resp)=>{
            console.log('resp')
            console.log(resp);
           
            return res.send((resp));
        })
    }
}