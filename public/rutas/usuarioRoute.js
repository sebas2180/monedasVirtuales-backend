

const usuario = require('../Controllers/usuarioController');
function usuarioRoute(app,passport){

    app.get('/',usuario.getUsuarios);
    
    app.get('/verificarToken',verifyToken.verificar,usuario.verificarToken);
}
module.exports=usuarioRoute;