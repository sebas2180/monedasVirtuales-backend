var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request-promise');


async function  bit2me(app,passport){

    const $ = await request({
        uri:'https://bit2me.com/inicio',
        transform:body=> cheerio.load(body,'utf-8')
    })
    const title = $('p','.live-ticker-box').next() ;
    console.log(title.html());
 
    // request('https://bit2me.com/inicio',(err,res,body)=>{
    //     if( !err  && res.statusCode == 200){
    //         let  $ = cheerio.load(body);
    //        var result =  $('p.buy-price','#live-ticker-box btc');
    //        console.log('3434')
    //        console.log(result.data());
    //     }
    // })
}
module.exports = bit2me;
 