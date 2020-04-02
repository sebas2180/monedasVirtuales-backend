const Sequelize= require('sequelize');
const sequelize= require('./sequelize');

module.exports= () =>{

    var usuario = sequelize.define('usuario',{
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
      
        nombre: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        apellido: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        usuario: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    },
    {
      tableName: 'usuario'
    })
    return usuario;
}