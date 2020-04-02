

const usuario = require('../Controllers/usuarioController');
function usuarioRoute(app){
    app.get('/',usuario.getUsuarios);
}

module.exports=usuarioRoute;