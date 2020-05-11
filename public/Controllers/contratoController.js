const contatoService =require('../Services/contatoService');

module.exports = {

    crearContrato: (req,res,next)=>{
        var contrato={
            categoria: req.body.categoria,
            cantidad: req.body.cantidad,
            eth_pagado: req.body.eth_pagado,
            id_usuario: req.body.id_usuario,
            id_monedero: req.body.id_monedero
        }
        contatoService.crearContrato(contrato,(cb)=>{

            res.end(JSON.stringify(cb));
        })
    },
    getContrato:(req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario,
            id: req.query.id
        }
        console.log(req.query);
        contatoService.getContrato(contrato,(cb)=>{
            res.send(cb);
        })
    },
    getEstadisticasContratos: async    (req,res,next)=>{
        console.log('get estadisticas contratos ...')
        var contrato={
            id_usuario: req.query.id_usuario 
        }
        console.log(req.query);
        // contatoService.getEstadisticasContratos(contrato,(cb)=>{
        //     console.log('  estadisticas enviaddo   ...')
        //     res.send(cb);
        // })
    setTimeout( function(){
         contatoService.getEstadisticasContratosV2(contrato).then(
            cb =>{
                console.log(cb);
                console.log('  estadisticas enviaddo   ...');
                res.send(cb);
            }
        )
    },0);
    },
    getListaPagos:async(req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario,
            id_contrato : req.query.id_contrato
        }
        contatoService.getListaPagos(contrato,async(cb)=>{
            res.send(cb);
        })
    },
    getContratos: async (req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario 
        }
        // setTimeout(async()=>{
        //      contatoService.getContratos(contrato).then(
        //         cb => {
        //             console.log('   contratos enviados... ')
        //             res.send(cb);
        //         }
        //     );
        // },0);
        contatoService.getContratos(contrato,(cb)=>{
            console.log('   contratos enviados... ')
            res.send(cb);
        })
    },
    getCantidadContratos:  async (req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario 
        }
        console.log(req.query);
          contatoService.getCantidadContratos(contrato,(cb)=>{
            console.log(' cantidad contratos enviado...');
            res.send(cb);
        })
        //   setTimeout( async()=>{
        //      contatoService.getCantidadContratosV2(contrato).then(
        //         cb => {
        //             console.log(' cantidad contratos enviado...');
        //             res.send(cb);
        //         }
        //         );
        //   },0);
    },
    
    activarContrato:async(req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario,
            id: req.query.id
        }
        console.log(req.query);
        contatoService.activarContrato(contrato,(cb)=>{
            res.send(cb);
        })
    },
    registrarPago:async (req,res,next)=>{
        var contrato={
            id_usuario: req.body.id_usuario,
            id: req.body.id,
            eth_recibido: req.body.eth_recibido,
            id_monedero : req.body.id_monedero
        }
       
        contatoService.registrarPago(contrato,(cb)=>{
        res.end(JSON.stringify(cb));
        })
    },
    registrarPagoV2:  async(req,res,next)=>{
        console.log( '.. registrat pago')
        var contrato={
            id_usuario: req.body.id_usuario,
            tipo_contrato: req.body.tipo_contrato,
            eth_recibido: req.body.eth_recibido,
           // id_monedero : req.body.id_monedero
        }
        setTimeout(async function() { 
             contatoService.registrarPagoV3(contrato).then(
                cb => {
                    console.log(' .... pago guardado.')
                    res.end(JSON.stringify(cb));
                }
            )
        }, 0);

        // contatoService.registrarPagoV2(contrato,(cb)=>{
        // res.end(JSON.stringify(cb));
        // })
    },
      
      
}