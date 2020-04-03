const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var usuario = sequelize.define('usuario',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
      
        id_moneda: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        monto: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },
        tipo: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        createAt: {

            type: Sequelize.DATE,
            field: 'create_at'
        }
    },
    {
      tableName: 'usuario'
    })
    return usuario;
}