const Sequelize = require('sequelize');

var sequelize ;
var env = process.argv[2] || 'dev';
switch (env) {
    case 'dev':
       sequelize = new Sequelize('crytoInfo', 'root', '1234', {
        dialect: 'mysql',
        host: 'localhost',
        define: {
          timestamps: false
      }
      });
        break;
    case 'prod':
       sequelize = new Sequelize('heroku_9ec3058ce556a10', 'b85c9c21359917', '7f820141', {
        dialect: 'mysql',
        host: 'us-cdbr-iron-east-01.cleardb.net',
        define: {
          timestamps: false
      }
      });
        break;
}

  
  sequelize.authenticate()
    .then(() => {
      console.log('Conectado')
    })
    .catch(err => {
      console.log(err)
    })
  
  module.exports=sequelize;
  global.sequelize=sequelize;