const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var moneda = sequelize.define('moneda',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        cotizacion: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        importe: {
            type: Sequelize.FLOAT,
            notEmpty: true
        }
    },
    {
      tableName: 'moneda'
    })
    return moneda;
}