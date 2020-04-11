const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var contrato = sequelize.define('contrato',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        categoria: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        createAt: {
            type: Sequelize.DATE,
            field: 'create_at',
            notEmpty: false
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            notEmpty: false
        },
        fecha_fin: {
            type: Sequelize.DATE,
            notEmpty: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        eth_pagado: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        pagos_registrados: {
            type: Sequelize.INTEGER,
            notEmpty: false
            
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            notEmpty: false
        },
        status: {
            type: Sequelize.STRING,
            notEmpty: false
        },
        id_monedero: {
            type: Sequelize.INTEGER,
            notEmpty: false
        }
    },
    {
      tableName: 'contrato'
    })
    return contrato;
}