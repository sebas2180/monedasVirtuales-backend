
const mysql = require('mysql2');

var connection;
 
 
  
// var db_config={
//             host: 'localhost',
//             user: 'root',
//             password: '1234',
//             database: 'crytoinfo',
//             insecureAuth : true,
//             port: 3306,
//             dateStrings:true
//         }
 
var  db_config={
        host: 'us-cdbr-iron-east-01.cleardb.net',
        user: 'bb4140aeaa24a0',
        password: 'af327668',
        // database: 'heroku_3f3fe830ae5ac81',
        insecureAuth : true,
        port: 3306,
        dateStrings:true
}
 
module.exports = {
 
dbConnection: function () {

    // connection = mysql.createConnection(db_config);

    // console.log('conexion a BD exitosa.');
    // connection.connect(function(err) {              // The server is either down
    //     if(err) {                                     // or restarting (takes a while sometimes).
    //       console.log('error when connecting to db:', err);
    //       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    //     }                                     // to avoid a hot loop, and to allow our node script to
    //   });

    //   connection.on('error', function(err) {
    //     console.log('db error', err);
    //     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    //       handleDisconnect();                         // lost due to either server restart, or a
    //     } else {                                      // connnection idle timeout (the wait_timeout
    //       throw err;                                  // server variable configures this)
    //     }
    //   });

  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(dbConnection, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      dbConnection();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                             // server variable configures this)
    }
  });
  
  return connection;
}
 



};