const Sequelize = require('sequelize');

var sequelize ;
var env = process.argv[2] || 'dev';

    // sequelize = new Sequelize('crytoInfo', 'root', '1234', {
    //     dialect: 'mysql',
    //     host: 'localhost',
    //     logging: false,
    //     define: {
    //       timestamps: false
    //   }
    //   });


//const sequelize = new Sequelize('database', 'username', 'password', {
    sequelize = new Sequelize('crytoinfo', 'doadmin', 'vj4gdmbs9si2agwj', {
        dialect: 'mysql',
        port : 25060,
        host: 'db-mysql-nyc1-18623-do-user-6877514-0.a.db.ondigitalocean.com',
        //logging: false,
        define: {
          timestamps: false,
          
      }
      });



  
  sequelize.authenticate()
    .then(() => {
      console.log('Conectado')
    })
    .catch(err => {
      console.log(err)
    })
  
  module.exports=sequelize;
  global.sequelize=sequelize;