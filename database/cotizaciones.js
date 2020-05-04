const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var cotizaciones = sequelize.define('cotizaciones',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        proveedor: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        symbol: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        base: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        variacionDia: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        variacionHora: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        compra: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        venta: {
            type: Sequelize.FLOAT,
            notEmpty: true
        }
    },
    {
      tableName: 'cotizacion'
    })
    return cotizaciones;
}