

const usuario = require('../Controllers/usuarioController');
function usuarioRoute(app,passport){
    
    app.get('/',usuario.getUsuarios);
}

module.exports=usuarioRoute;