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
    getEstadisticasContratos:(req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario 
        }
        console.log(req.query);
        contatoService.getEstadisticasContratos(contrato,(cb)=>{
            res.send(cb);
        })
    },
    getContratos:(req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario 
        }
        console.log(req.query);
        contatoService.getContratos(contrato,(cb)=>{
            res.send(cb);
        })
    },
    
    activarContrato:(req,res,next)=>{
        var contrato={
            id_usuario: req.query.id_usuario,
            id: req.query.id
        }
        console.log(req.query);
        contatoService.activarContrato(contrato,(cb)=>{
            res.send(cb);
        })
    },
    registrarPago:(req,res,next)=>{
        var contrato={
            id_usuario: req.body.id_usuario,
            id: req.body.id,
            eth_recibido: req.body.eth_recibido,
            id_monedero : req.body.id_monedero
        }
       
        contatoService.registrarPago(contrato,(cb)=>{
        res.end(JSON.stringify(cb));
        })
    }
      
      
}