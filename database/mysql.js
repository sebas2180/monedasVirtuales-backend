

const mysql = require('mysql2');

var connection;
var env = process.argv[2] || 'dev';
var db_config;
switch (env) {
    case 'dev':
          db_config={
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'crytoinfo',
            insecureAuth : true,
            port: 3306,
            dateStrings:true
        }
        break;
    case 'prod':
          db_config={
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'crytoinfo',
            insecureAuth : true,
            port: 3306,
            dateStrings:true
        }
        break;
}
module.exports = {
 
dbConnection: function () {

    connection = mysql.createConnection(db_config);


    // var db_config={
    //     host: 'localhost',
    //     user: 'root',
    //     password: '1234',
    //     database: 'crytoinfo',
    //     insecureAuth : true,
    //     port: 3306,
    //     dateStrings:true
    // }
    // console.log('a');

    connection = mysql.createConnection(db_config);

    console.log('conexion a BD exitosa.');
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
      });

      connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    
    return connection;
}


};