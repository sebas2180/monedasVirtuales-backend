const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var pagos_contratos = sequelize.define('pagos_contratos',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        createAt: {
            type: Sequelize.DATE,
            field: 'create_at',
            notEmpty: false
        },
        eth_pagado: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        id_contrato: {
            type: Sequelize.INTEGER,
            notEmpty: false
            
        }
    },
    {
      tableName: 'pagos_contratos'
    })
    return pagos_contratos;
}