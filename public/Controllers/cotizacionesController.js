const cotizacionesService =require('../Services/cotizacionesService');

module.exports = {
    getCotizaciones : (req,res,next)=>{
       //console.log('get cotizaciones');
        cotizacionesService.getCotizaciones((callback)=>{
            return res.send(callback);
        });
    },
    getCotizacionParaMonedero : (req,res,next)=>{
        // console.log('get cotizaciones');
         cotizacionesService.getCotizacionParaMonedero((callback)=>{
             return res.send(callback);
         });
     }
}