const tipo_monedaModel = require('../../database/tipo_moneda')();
var crypto            = require('crypto');
module.exports={ 

    getTipoMonedaPorNombre : (nombre,callback) => {

        tipo_monedaModel.findOne({  where: { moneda : nombre}   }  ).then(
            res => {
                return callback(res);
            }
        )

    }
}