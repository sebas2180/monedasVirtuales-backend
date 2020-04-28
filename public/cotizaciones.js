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
                //console.log(body);
                var auxiliarUSD = body['data'][0];
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='DeCrypto';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'USD';
                cotizacion.venta= parseFloat(auxiliarUSD['dcb'])-(parseFloat(auxiliarUSD['dcb'])*0.035);
                cotizacion.compra=  parseFloat(auxiliarUSD['dca'])-(parseFloat(auxiliarUSD['dca'])*0.035);
                cotizacion.name='Bitcoin';
                cotizacion.save();
                var auxiliarARS = body['data'][1];
                var cotizacionARS = new cotizaciones;
                cotizacionARS.proveedor='DeCrypto';
                cotizacionARS.symbol= 'BTC';
                cotizacionARS.base= 'ARS';
                cotizacionARS.venta= parseFloat(auxiliarARS['dcb'])-(parseFloat(auxiliarARS['dcb'])*0.035);
                cotizacionARS.compra=  parseFloat(auxiliarARS['dca'])-(parseFloat(auxiliarARS['dca'])*0.035);
                cotizacionARS.name= 'Bitcoin';
                cotizacionARS.save();
        });
        request('https://www.coinbase.com/api/v2/assets/prices?base=USD&filter=listed&resolution=latest', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                const aux = body['data'][3]['prices']
                cotizacion.proveedor='Copay';
                cotizacion.symbol= body['data'][3]['base'];
                cotizacion.base= body['data'][3]['currency'];
                cotizacion.venta= aux.latest;
                cotizacion.compra= aux.latest;
                cotizacion.name='Ethereum';
                cotizacion.save();
        
          });    
          
          request('https://criptoya.com/exchanges/Sesocio.php?coin=ETH&fiat=ARS&vol=5', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Sesocio';
                cotizacion.symbol= 'ETH' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Ethereum';
                 cotizacion.save();
        
          }); 
          request('https://criptoya.com/exchanges/Sesocio.php?coin=BTC&fiat=ARS&vol=0.1', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Sesocio';
                cotizacion.symbol= 'BTC' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Bitcoin';
                cotizacion.save();
        
          }); 
          request('https://criptoya.com/exchanges/CryptoMkt.php?coin=ETH&fiat=ARS&vol=5', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Cryptomkt';
                cotizacion.symbol= 'ETH' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Ethereum';
                cotizacion.save();
          }); 
          request('https://criptoya.com/exchanges/Decrypto.php?coin=BTC&fiat=ARS&vol=0.1', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Cryptomkt';
                cotizacion.symbol= 'BTC' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Bitcoin';
                cotizacion.save();
          });    
        request('http://preev.com/pulse/units:btc+usd/sources:bitstamp+kraken', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
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
            if(!aux['data']['error']){
                const monedaRipio =( aux['data']['ticker']);
                if(monedaRipio['BTC'] ){
                    var cotizacionBTC = new cotizaciones;
                    cotizacionBTC.proveedor='Satoshitango';
                    cotizacionBTC.symbol= 'BTC';
                    cotizacionBTC.base= 'ARS';
                    cotizacionBTC.compra= monedaRipio['BTC']['ask'];
                    cotizacionBTC.venta= monedaRipio['BTC']['bid'];
                    cotizacionBTC.name='Bitcoin';
                    cotizacionBTC.save();
    
                }
                if( monedaRipio['ETH']){
                    var cotizacionLTC = new cotizaciones;
                    cotizacionLTC.proveedor='Satoshitango';
                    cotizacionLTC.symbol= 'LTC';
                    cotizacionLTC.base= 'ARS';
                    cotizacionLTC.compra= monedaRipio['LTC']['ask'];
                    cotizacionLTC.venta= monedaRipio['LTC']['bid'];
                    cotizacionLTC.name='Litecoin';
                    cotizacionLTC.save();
                }
    
                    var cotizacionETH = new cotizaciones;
                    cotizacionETH.proveedor='Satoshitango';
                    cotizacionETH.symbol= 'ETH';
                    cotizacionETH.base= 'ARS';
                    cotizacionETH.compra= monedaRipio['ETH']['ask'];
                    cotizacionETH.venta= monedaRipio['ETH']['bid'];
                    cotizacionETH.name='Ethereum';
                    cotizacionETH.save();
    
            }


        });


      });
   }

}