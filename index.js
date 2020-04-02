const express= require('express');
const app = express();
const http = require('http');
//const cors = require('cors');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.set('port',PORT);
app.use(express.static(path.join(__dirname,'public')));
server.listen(PORT,()=>{//cambiar a 30000 en desarollo
    console.log('server conectado en el puerto: '+server.address().port)
});

const  usuarioRoute= require('./public/rutas/usuarioRoute')(app);
 require('./public/database/sequelize');