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
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        rol: {
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