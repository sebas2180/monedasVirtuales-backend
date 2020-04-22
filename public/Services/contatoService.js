const contratoModel = require('../../database/contrato')();
const monedaModel = require('../../database/monedaModel')();
const pago_contratoModel = require('../../database/pago_contrato')();
const mysql = require('../../database/mysql');
connection = mysql.dbConnection();
module.exports={

    crearContrato: (contrato,cb)=>{
        //console.log(contrato);
        if(contrato.id_monedero  > -1 )  {
            monedaModel.findOne({ where : { id: contrato.id_monedero }}).then(
                resp0 =>{
                   var importeActualizado = parseFloat( resp0['dataValues']['importe']) - parseFloat( contrato.eth_pagado) ;
                   console.log(importeActualizado);
                    monedaModel.update( { importe : importeActualizado},{ where: {id: contrato.id_monedero }}).then(
                        respUpdateMonedero => {
                            console.log('__________________respUpdateMonedero');
                            console.log(respUpdateMonedero);
                            console.log('fin__________________respUpdateMonedero');
                        }
                    );
                }
            )
        }
        var newContrato = new contratoModel();
        newContrato.categoria = contrato.categoria;
        newContrato.cantidad = contrato.cantidad;
        newContrato.eth_pagado = contrato.eth_pagado;
        newContrato.id_usuario = contrato.id_usuario;
        newContrato.id_monedero = contrato.id_monedero;
        newContrato.save().then(
            res=>{
                if(res['dataValues']) {
                    //console.log(res['dataValues']);
                    monedaModel.findOne( { where: {  id_usuario : contrato.id_usuario , monedero:'Kualiandp' } } )
                    .then(
                        resFindKulian => {
                            //console.log(resFindKulian['dataValues']);
                            if( resFindKulian ) { 
                                var importeH = parseFloat( res['dataValues']['eth_pagado'])+resFindKulian['dataValues']['importe'];
                                //console.log(contrato);
                                var linea = 'UPDATE moneda SET importe='+importeH+' WHERE id_usuario=\''+contrato.id_usuario+'\' and monedero=\'Kualiandp\'';
                                //console.log(linea);
                                connection.query(linea,(err,respUpdateKulian)=>{
                                    if(err) {console.log(err)};
                                    if(respUpdateKulian['affectedRows'] == 1) {
                                        var resSend  ={
                                            status:769,
                                            msj:'Guardado con exito!',
                                            id_contrato: res['dataValues']['id']
                                        }
                                        return cb(resSend);
                                    }else {
                                        var resSend  ={
                                            status:768,
                                            msj:'Error al crear moneda kulian!'
                                            
                                        }
                                        return cb(resSend);
                                    }
                                    
                                })
                            }else{
                                var NKM  = new monedaModel;
                                NKM.monedero = 'Kualiandp';
                                NKM.importe = contrato.eth_pagado;
                                NKM.id_usuario = contrato.id_usuario;
                                NKM.symbol = 'ETH' ;
                                NKM.nombre = 'Ethereum';
                                console.log(NKM);
                                NKM.save().then(
                                    respNewKulian =>{
                                        if (respNewKulian['dataValues']){
                                            console.log(respNewKulian);
                                            var resSend  ={
                                                status:769,
                                                msj:'Guardado con exito',
                                                id_contrato: res['dataValues']['id']
                                            }
                                            return cb(resSend);
                                        }else {
                                            var resSend  ={
                                                status:768,
                                                msj:'Error al crear moneda kulian'
                                                
                                            }
                                            return cb(resSend);
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    },getContrato:(contrato,cb)=>{
            contratoModel.findOne({where:{ id: contrato.id , id_usuario:contrato.id_usuario }}).then(
                res=>{
                    console.log(res['dataValues']);
                    return cb(res);
                }
            )
    },getEstadisticasContratos:(contrato,cb)=>{
        var linea ='SELECT SUM(F.eth_pagado) eth_pagado,SUM(F.cantidad) cantidad,SUM(F.contratos) contratos,F.status,SUM(F.eth_recibido) eth_recibido '+
        'FROM (SELECT id, SUM(C.cantidad) cantidad,IFNULL(SUM(C.eth_pagado),0) eth_pagado ,COUNT(1) '+
        'contratos,status,0 eth_recibido FROM contrato C WHERE id_usuario  = \''+contrato.id_usuario+'\' group by C.id,C.STATUS '+
        'UNION SELECT null id,0 cantidad,IFNULL(null,0) eth_pagado,0 contratos,q.status status,SUM(P.eth_pagado) '+
        'FROM pagos_contratos P INNER JOIN contrato q ON P.id_contrato = q.id WHERE q.id_usuario = \''+contrato.id_usuario+'\''+
        'GROUP BY q.status)F GROUP BY F.status;'
        // var linea = 'SELECT SUM(cantidad) cantidad,SUM(eth_pagado) eth_pagado ,COUNT(1) contratos,status FROM contrato '+
        //             ''+
        //                 'WHERE id_usuario = \''+contrato.id_usuario+'\' group by status;'

        
        console.log(linea);
        connection.query(linea,(err,res,next)=>{
            res.forEach(element => {
                console.log(element)
            });
        return cb(res);
        })
    },getContratos:(contrato,cb)=>{
        var linea =  'SELECT C.*,SUM(p.eth_pagado) as eth_recibido,M.monedero FROM contrato C LEFT  JOIN pagos_contratos P '+
        'ON P.id_contrato = C.id INNER JOIN moneda M ON m.id=C.id_monedero WHERE C.id_usuario=\''+contrato.id_usuario+'\' GROUP BY C.id';
        console.log(linea);
        connection.query(linea,(err,resp)=> {
            if(err) {console.log(err);}
            console.log(resp);
            return cb(resp);
        })
    },
    activarContrato:(contrato,cb)=>{
        var diaActual = new Date;
        contratoModel.update({fecha_inicio: diaActual,pagos_registrados:0,status:'Activo' },
        {where:
            { id: contrato.id , id_usuario:contrato.id_usuario , status:'Sin activar' }}).then(
            resp=>{
                if ( resp == 1){
                    var resSend  ={
                        status:770,
                        msj:'Contrato activado con exito'
                    }
                    return cb(resSend);
                } else {
                    var resSend  ={
                        status:771,
                        msj:'Ops, este contrato ya se encuentra activado'
                    }
                    return cb(resSend);
                }
            }
        )
    },registrarPago:(contrato,cb)=>{
   var aux_id_moneda ;
        monedaModel.findOne({where: {  id : contrato.id_monedero  }}).then(
            resFindMoney => {aux_id_moneda = (resFindMoney['dataValues']['id']);}
        )
    contratoModel.update({pagos_registrados:sequelize.literal('pagos_registrados + 1')},
    {where:
        { id: contrato.id , id_usuario : contrato.id_usuario , status:'Activo'  }}).then(
        res=>{
            if( res== 1 ){
                monedaModel.findOne({where:{id: contrato.id_monedero}}).then(
                    resFind => {
                        console.log('respfind')
                        console.log(resFind['dataValues']['importe']+'    '+contrato.eth_recibido);
                        if(resFind['dataValues']){
                            var auxiliar_importe =parseFloat( resFind['dataValues']['importe'])+parseFloat( contrato.eth_recibido );
                            console.log(auxiliar_importe);
                            monedaModel.update({importe : auxiliar_importe},{
                                where: {
                                   id : contrato.id_monedero
                                }//,returning: true
                            }).then(
                                resp1=>{
                                    //console.log('resp1')
                                   // console.log(resp1);
                                    if( resp1 == 1 ) {
                                        var pago = new pago_contratoModel();
                                        pago.eth_pagado = parseFloat( contrato.eth_recibido );
                                        pago.id_contrato =contrato.id ;
                                        pago.save().then(
                                            resp2 => {
                                                if(resp2['dataValues']) {
                                                    var resSend  ={
                                                        status:772,
                                                        msj:'Contrato actualizado con exito'
                                                    }
                                                    return cb(resSend);
                                                }else {
                                                    var resSend  ={
                                                        status:774,
                                                        msj:'Ops, no se puedo guardar el pago recibido'
                                                    }
                                                    return cb(resSend);
                                                }
                                            }
                                        )
                                        
                                    } else {
                                        // realizar borrado de la suma anterior
                                        var resSend  ={
                                            status:774,
                                            msj:'Ops, este contrato no se encuentra activado'
                                        }
                                        return cb(resSend);
                                    }
                                }
                            )
                        } else {
                            var resSend  ={
                                status:773,
                                msj:'Ops, hubo un problema al encontrar el monedero'
                            }
                            return cb(resSend);
                        }
                        console.log(res['dataValues']);
                    }
                )
            } else {
                var resSend  ={
                    status:773,
                    msj:'Ops, este contrato no se encuentra activado'
                }
                return cb(resSend);
            }
        }
    )
    }
        
}