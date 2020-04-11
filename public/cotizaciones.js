var request = require('request');
var cron = require('node-cron');
var j = request.jar();
var cotizaciones = require('../database/cotizaciones')();
module.exports = {

   cotizaciones: async ()=>{
    cron.schedule('*/10 * * * * *', () => {
        //console.log('running a task every minute');
        request('https://api.bit2me.com/v1/ticker2', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
            for (let index = 0; index < 3; index++) {
                var cotizacion = new cotizaciones;
                if(index>-1){
                    cotizacion.proveedor='Bit2me';
                    cotizacion.symbol= body['data'][index]['symbol'];
                    cotizacion.base= body['data'][index]['base'];
                    cotizacion.venta= body['data'][index]['sell'];
                    cotizacion.compra= body['data'][index]['buy'];
                    cotizacion.name= body['data'][index]['name'];
                    cotizacion.save();
                }
            }
        });
        request('https://api.decrypto.com.ar:8081/1.0/frontend/precios/', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                //console.log(body['dca']);
                cotizacion.proveedor='DeCrypto';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'USD';
                cotizacion.venta= body['dcb'];
                cotizacion.compra= body['dca'];
                cotizacion.name= body['currency'];
                cotizacion.save();
        });
        request('http://preev.com/pulse/units:btc+usd/sources:bitstamp+kraken', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
               // console.log(body['btc']['usd']['bitstamp']);
                cotizacion.proveedor='Bitstamp';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'USD';
                cotizacion.venta= body['btc']['usd']['bitstamp']['last'];
                 cotizacion.compra= body['btc']['usd']['bitstamp']['last'];
                 cotizacion.name='Bitcoin';
                 cotizacion.save();
    
      });
        request('https://argenbtc.com/public/cotizacion_js.php', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
               //console.log(body);
               
                cotizacion.proveedor='ArgenBtc';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'ARS';
                cotizacion.compra= body['precio_compra'];
                cotizacion.venta= body['precio_venta'];
                cotizacion.name='Bitcoin';
                cotizacion.save();
    
        });

        request.get({url: 'https://api.satoshitango.com/v3/ticker/ARS', jar: j}, function(err, httpResponse, html) {
            const aux = JSON.parse(httpResponse['body']);
            const monedaRipio =( aux['data']['ticker']);
            //console.log(monedaRipio);
            // kk
                var cotizacionBTC = new cotizaciones;
                cotizacionBTC.proveedor='Satoshitango';
                cotizacionBTC.symbol= 'BTC';
                cotizacionBTC.base= 'ARS';
                cotizacionBTC.compra= monedaRipio['BTC']['ask'];
                cotizacionBTC.venta= monedaRipio['BTC']['bid'];
                cotizacionBTC.name='Bitcoin';
                cotizacionBTC.save();

                var cotizacionLTC = new cotizaciones;
                cotizacionLTC.proveedor='Satoshitango';
                cotizacionLTC.symbol= 'LTC';
                cotizacionLTC.base= 'ARS';
                cotizacionLTC.compra= monedaRipio['LTC']['ask'];
                cotizacionLTC.venta= monedaRipio['LTC']['bid'];
                cotizacionLTC.name='Litecoin';
                cotizacionLTC.save();

                var cotizacionETH = new cotizaciones;
                cotizacionETH.proveedor='Satoshitango';
                cotizacionETH.symbol= 'ETH';
                cotizacionETH.base= 'ARS';
                cotizacionETH.compra= monedaRipio['ETH']['ask'];
                cotizacionETH.venta= monedaRipio['ETH']['bid'];
                cotizacionETH.name='Ethereum';
                cotizacionETH.save();


        });


      });
   }

}