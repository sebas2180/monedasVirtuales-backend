const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var transaccion = sequelize.define('transaccion',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        monto: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        cotizacion_usd: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        tipo_moneda: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        tipo_operacion: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        id_usuario: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    },
    {
      tableName: 'transaccion'
    })
    return transaccion;
}