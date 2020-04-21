const Sequelize = require('sequelize');

var sequelize ;
var env = process.argv[2] || 'dev';

    // sequelize = new Sequelize('crytoInfo', 'root', '1234', {
    //     dialect: 'mysql',
    //     host: 'localhost',
    //     logging: false,
    //     define: {
    //       timestamps: false      }
    //   });

 
    sequelize = new Sequelize('crytoinfo', 'doadmin', 'vj4gdmbs9si2agwj', {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      dialect: 'mysql',
      port: 25060,
      logging: false,
      host: 'db-mysql-nyc1-18623-do-user-6877514-0.a.db.ondigitalocean.com',
      define: {
        timestamps: false
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