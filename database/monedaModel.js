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
        },
        symbol: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        createAt: {
            type: Sequelize.DATE,
            field: 'create_at',
            notEmpty: false
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'id_usuario'
        },
        compraUSD: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        compraARS: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        compraEUR: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        monedero: {
            type: Sequelize.STRING 
        }
    },
    {
      tableName: 'moneda'
    })
    return moneda;
}