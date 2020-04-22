  
const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var tipo_moneda = sequelize.define('tipo_moneda',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        symbol: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        moneda: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    },
    {
      tableName: 'tipo_moneda'
    })
    return tipo_moneda;
}