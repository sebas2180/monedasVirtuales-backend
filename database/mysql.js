
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
        host: 'sebastianbatalla-do-user-7445190-0.a.db.ondigitalocean.com',
        port : 25060,
        user: 'doadmin',
        password: 'dowhoivl3kpdn4pz',
        database: 'crytoinfo',
        insecureAuth : true,
        dateStrings:true,
        multipleStatements: true
        // ,
        // pool: {
        //   idle: 20000,
        //   evict: 15000,
        //   acquire: 30000
        // }
      //   dialectOptions: {
      //     socketPath: "/var/run/mysqld/mysqld.sock"
      // },
      // define: {
      //     paranoid: true
      // }
}
module.exports = {
 
dbConnection: function () {
  connection = mysql.createPool(db_config);

  connection.query('select 1 + 1', (err, rows) => { /* */ });
  return connection;

  }
}
// const mysql = require('mysql2');

// var connection;
 
 
  
// // var db_config={
// //             host: 'localhost',
// //             user: 'root',
// //             password: '1234',
// //             database: 'crytoinfo',
// //             insecureAuth : true,
// //             port: 3306,
// //             dateStrings:true
// //         }
 
// var  db_config={
//         host: 'db-mysql-nyc1-18623-do-user-6877514-0.a.db.ondigitalocean.com',
//         port : 25060,
//         user: 'doadmin',
//         password: 'vj4gdmbs9si2agwj',
//         database: 'crytoinfo',
//         insecureAuth : true,
//         dateStrings:true
// }
 
// module.exports = {
 
// dbConnection: function () {

 
//   connection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused
//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       //setTimeout(this.dbConnection, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       this.dbConnection() ;                         // lost due to either server restart, or a
//     } else {     
//       if(err.code == 'ETIMEDOUT') {
//          this.dbConnection() ;     
//       }                                 // connnection idle timeout (the wait_timeout
//       //console.log(err);                            // server variable configures this)
//     }
//   });
  
//   return connection;
// }

// };