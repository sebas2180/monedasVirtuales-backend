const express= require('express');
const app = express();
const http = require('http');
//const cors = require('cors');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
global.jwt = require('jsonwebtoken');
global.config = require('./config/config');
global.verifyToken = require('././public/rutas/verifyToken');
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.set('port',PORT);
app.use(express.static(path.join(__dirname,'public')));
app.set('llave', config.llave);


server.listen(PORT,()=>{//cambiar a 30000 en desarollo
    console.log('server conectado en el puerto: '+server.address().port)
});
global.pruebaa ='prueaba';
////passport
const Sequelize =require('./passport/auth.js')(app,passport);
var crypto            = require('crypto');
var LocalStrategy     = require('passport-local').Strategy;
var sess              = require('express-session');
var Store             = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);

var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(sess({
   name: 'JSESSION',
   secret: 'MYSECRETISVERYSECRET',
   store:  store,
   resave: true,
   saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/////

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
const bit2me = require('./cheerio/bit2me')(app,passport);
//bit2me.bit2me();
const  contratoRoute= require('./public/rutas/contratoRoute')(app,passport);
const  passportRoute= require('./public/rutas/passportRoute')(app,passport);
const  monedaRoute= require('./public/rutas/monedaRoute')(app,passport);
const  usuarioRoute= require('./public/rutas/usuarioRoute')(app,passport);
const  cotizacionesroute= require('./public/rutas/cotizacionesRoutes')(app,passport);
const  cotizaciones = require('./public/cotizaciones');
cotizaciones.cotizaciones();
 require('./database/sequelize');

 

