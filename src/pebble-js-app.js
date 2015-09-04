// We use the fake "PBL" symbol as default
var defaultSymbol = "PBL";
var symbol = defaultSymbol;

//var test = require("yo");

  var req1 = new XMLHttpRequest();

var rand1 = Math.random();

//var doc2 = new DOMParser();  // ReferenceError: Can't find variable: DOMParser

var string = '<!DOCTYPE html><html><head></head><body>content</body></html>';

//var doc = new DOMParser().parseFromString(string, 'text/xml');
// [PHONE] pebble-app.js:?: Error: BART Realtime: ReferenceError: Can't find variable: DOMParser

//var doc = window.DOMParser.parseFromString(string, 'text/xml');


//var doc1 = doc.body.innerHTML; 



//  var xml2js = require('xml2js'); // [PHONE] pebble-app.js:?: Error: BART Realtime: Can't Find Module xml2js

//  var xml2js = require('xml2js');  // require is not define
//[PHONE] pebble-app.js:?: ReferenceError: require is not defined
//   at pebble-js-app.js:5:12


// Fetch stock data for a given stock symbol (NYSE or NASDAQ only) from markitondemand.com
// & send the stock price back to the watch via app message
// API documentation at http://dev.markitondemand.com/#doc
function fetchStockQuote(symbol, isInitMsg) {
 
  var rand2 = Math.random();
  
//  console.log("fetchStockQuote(...)  rand2 = ",rand2);

    console.log("fetchStockQuote(...)  symbol = ", symbol);
  
  //  console.log(doc1);
  
//  JSON.parse("test");
  
//  var xml2js = require('xml2js');
   
   var xml = "<root>This is a root object!<child>This a child</child></root>";

//   xml2js.parseString(xml, function (error, result) {
//       console.log(result); // JSObject
//   });
  
//var test1 = require("yo1");
  
  //var bool = window.DOMParser;
  
  //var a1 = navigator.
  
  //var doc2 = new DOMParser();
  
 // Pebble.sendAppMessage( { '0': 16, '1':'string1'});
  
//  return;
  
 /* 
  var msg1 = {};
  msg1.Monday = 1;
  msg1.Tuesday = 2;
  //console.log("msg1 = ", msg1.toString());
  console.log(msg1);
  */
  
  var response;
  var station = "PLZA"; // POWL DBRK? NBRK?
  var req = new XMLHttpRequest();
  // build the GET request
  // http://api.bart.gov/api/etd.aspx?cmd=etd&orig=PLZA&key=MW9S-E7SL-26DU-VV8V&dir=n

  //req.open('GET', "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=PLZA&key=MW9S-E7SL-26DU-VV8V&dir=n", true);
  
  //req.open('GET', "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + station + "&key=MW9S-E7SL-26DU-VV8V&dir=n", true);
  

  //req.open('GET', "http://dev.markitondemand.com/Api/Quote/json?" + "symbol=" + symbol, true); // causing the problem
  
  // http://maksil.net/test1/json/json1.txt  // utf-8 does not work
   req.open('GET', "http://maksil.net/test1/json/json2-ansi.txt", true); // this fixes the problem
  
 //  var xml2js = require('xml2js');
  
   console.log(" DEBUG 00");
  
  req.onload = function(e) {
    
       console.log(" DEBUG 01 - req.onload = function(e)");
    
    if (req.readyState == 4) {
      // 200 - HTTP OK
      if(req.status == 200) {
        console.log(" req.responseText  " + req.responseText);
        response = JSON.parse(req.responseText); // java script object notation
        
        var price;
        var marketCap;
        
        if (response.Message) {
          // the markitondemand API sends a response with a Message
          // field when the symbol is not found
          Pebble.sendAppMessage({
            "price": "Not Found"});
        }
        if (response.Data) {
          // data found, look for LastPrice
          //price = response.Data.LastPrice;
          price = rand2;
          console.log("debug01 " + price);
          marketCap = response.Data.MarketCap;  //   {"Data":{ ... ,"MarketCap":13239446990, ... }}

          
          var msg = {};
          
/*        

          if (isInitMsg) {
//            msg.ini = false;
            msg.init = true;
            msg.symbol = symbol;
          }
          
*/          
          var s = "rand1";
          var s1 = s.replace("1","16");
          msg.price = "$" + price.toString();
          msg.symbol = s1; //"JOHN"; //egd1,  this can be retreived from the cloud, does not need iOS companion app
          Pebble.sendAppMessage(msg);
          //Pebble.sendAppMessage( { '0': 16, '1':'string1'});
          //Pebble.sendAppMessage( { 'price': 16});
          
          //Pebble.sendAppMessage( { '0': 'ok', '1': "$" + price.toString() }  ); //egd1 OK  JSON
          //Pebble.sendAppMessage( { '0': 'ok', '1': marketCap.toString() }  ); //egd1 OK
        
          
          
          
        }
      } else {
        console.log("Request returned error code " + req.status.toString());
      }
    }
  };
  
  req.send(null);

}




/*

// Set callback for the app ready event
Pebble.addEventListener("ready",
                        function(e) {
                          
                          //console.log("connect! " + e.ready.toString());
                          console.log("Pebble.addEventListener(ready) e.type = " + e.type);
                          // Fetch saved symbol from local storage (using
                          // standard localStorage webAPI)
                          symbol = localStorage.getItem("symbol");
                          
console.log("Pebble.addEventListener(...) symbol = " + symbol);
                          
                          if (!symbol) {
                            symbol = "AAPL"; //egd1
                          }
                          
                          var isInitMsg = true;
                          
                          fetchStockQuote(symbol, isInitMsg);
                          //fetchStockQuote("AAPL", isInitMsg);  //egd2 ADSK  AAPL MSFT GOOG
                          
                        });

*/

// Set callback for appmessage events
Pebble.addEventListener("appmessage",
                        function(e) {
 //                         window.navigator.

                          console.log("Pebble.addEventListener(message) e.type = " + e.type);                          
                          console.log("Pebble.addEventListener(...) symbol = " + symbol);
                          
                            console.log("message");
                          
                            console.log("appmessage : e.payload = " + e.payload);
                            console.log("appmessage : e.payload.init = " + e.payload.init);
                            console.log("appmessage : e.payload.symbol = " + e.payload.symbol);
                            console.log("appmessage : e.payload.message = " + e.payload.message);
                            console.log("appmessage : e.payload.status = " + e.payload.status);
                          
                          var isInitMsg;
                          if (e.payload.init) {
                            console.log("if (e.payload.init)  symbol = " + symbol);
                            isInitMsg = true;
                            fetchStockQuote(symbol, isInitMsg);
                          }
                          else if (e.payload.fetch) {
                            console.log("else if (e.payload.fetch)");
                            isInitMsg = false;
                            fetchStockQuote(symbol, isInitMsg);
                          }
                          else if (e.payload.symbol) {
                            console.log("else if (e.payload.symbol)");                            
                            symbol = e.payload.symbol;
                            localStorage.setItem("symbol", symbol);
                            isInitMsg = false;
                            fetchStockQuote(symbol, isInitMsg);
                          }
                        });
