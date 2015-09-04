
// var xml = require('xml'); // does not appear to be required, methods from other js modules are accessible, 2015-05-10 john

/*

[PHONE] pebble-app.js:?: ReferenceError: require is not defined
    at pebble-js-app.js:2:11
[PHONE] pebble-app.js:?: JS failed.

*/

var build_num = "06a";


var m_station = "DBRK"; //"WOAK"; //"DBRK"; //"POWL"; //"PLZA";
var m_direction = "N";

var m_xml_bart_etd = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + m_station + "&key=MW9S-E7SL-26DU-VV8V&dir=" + m_direction;



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


function john1() {
    return "john1()";
}

function john2() {
    return "john2()";
}


/*
// extract text value based on a tag
function john3(tag, xml) {

    // <tag attribute="avalue">text content</tag>

    //var token1 = "destination";
    //var token1 = "name"; //"color"; //"abbreviation"; // "minutes"; //"name";
    var ds1 = "name"; //"test1";
    //ds1 = ds1.concat(token1);
    //ds1 = ds1 +">";

    //m_res = "<"+token1+">";

    var t1 = "<" + tag + ">";
    var t2 = "</" + tag + ">";


 //   jsFiddleConsole.log("john3(),  tag = " + t2);


    var n1 = xml.search(t1); // open tag location
    var l1 = t1.length;
    var n2 = xml.search(t2); // close tag location
    var l2 = t2.length;
    
    var l = n2 - n1 - l2 + 1; // length of text value

    // n1+l1 = start location of text value
    var res = xml.substr(n1 + l1, l); // extract text value


    return res;

} // john3(tag,xml)

*/






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
  
 
  var msg1 = {};
  msg1.Monday = 1;
  msg1.Tuesday = 2;
  //console.log("msg1 = ", msg1.toString());
  console.log("msg1 = ", msg1.toString());

  
  var response;
  var station = "PLZA"; // POWL DBRK? NBRK?
  var req = new XMLHttpRequest();
  // build the GET request
  // http://api.bart.gov/api/etd.aspx?cmd=etd&orig=PLZA&key=MW9S-E7SL-26DU-VV8V&dir=n

  //req.open('GET', "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=PLZA&key=MW9S-E7SL-26DU-VV8V&dir=n", true);
  
  //req.open('GET', "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + station + "&key=MW9S-E7SL-26DU-VV8V&dir=n", true);
  
  // xml from bart.gov are being fetched OK
  var url_xml = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=DBRK&key=MW9S-E7SL-26DU-VV8V&dir=N";

  //req.open('GET', "http://dev.markitondemand.com/Api/Quote/json?" + "symbol=" + symbol, true); // causing the problem
  
  // http://maksil.net/test1/json/json1.txt  // utf-8 does not work
  
  //var url_json = "http://dev.markitondemand.com/Api/Quote/json?" + "symbol=" + symbol;
  //var url_json = "http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL";
  //var url_json = "http://dev.markitondemand.com";
  //var url_json = "http://notfound12345.123"; // execution stops at req.onload
  
  var url_json = "http://maksil.net/test1/json/json2-ansi.txt";
  //var url_json = "http://maksil.net/test1/json/json2-ansi.txt.not.found";
  
  
  console.log(" before open() status = ", req.status);
  console.log(" readyState = ", req.readyState);

  
  //req.open('GET', url_json, true); // true = async
  // m_xml_bart_etd url_xml
  req.open('GET', m_xml_bart_etd, true); // true = async
  
  
  //req.open('GET', "http://maksil.net/test1/json/json2-ansi.txt", true); // this fixes the problem
  
 //  var xml2js = require('xml2js');
  
  //console.log(" DEBUG 00, req.open() url = ",url_json);
  console.log(" DEBUG 00, req.open() url = ",url_xml);
  console.log(" status = ", req.status);
  console.log(" readyState = ", req.readyState);
  
  
  req.onload = function(e) {
    
       console.log(" DEBUG 01 - req.onload = function(e)");
    
    if (req.readyState == 4) {
      console.log("req.readyState == 4");
      
      // 200 - HTTP OK
      if(req.status == 200) {
        var xml = req.responseText; // calling this twice appears to cause runtime problem
        console.log("req.status == 200");
        console.log(" req.responseText 20  " + xml);

        // TODO: convert xml to json here
        console.log("TODO: convert xml to json  " + john1()); // + xml.john3());

console.log(" john3a() = " + john3a());

        var minutes = john3("minutes",xml);
        console.log(" minutes = " + minutes);
        
        //response = JSON.parse(req.responseText); // JSON = java script object notation
    
        response = {"Data":{"Status":"SUCCESS","Name":"Autodesk Inc","Symbol":"ADSK","LastPrice":54.01, "0": 16, "1":"string1"}};

        console.log("response = " + response);    // = [object Object]   
        

              
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
          //var smbol_json = response.Data.Symbol;
          console.log("json response.Data.Symbol  = " + response.Data.Symbol.toString());
          console.log("json response.Data.LastPrice = s" + response.Data.LastPrice.toString());
          
          var s = "ver1";
          var s1 = s.replace("1",build_num);
          msg.price = minutes.toString() + "  min";
          msg.symbol = symbol; //m_station; //"dbrk"; //s1; //"JOHN"; //egd1,  this can be retreived from the cloud, does not need iOS companion app
          Pebble.sendAppMessage(msg);
          //Pebble.sendAppMessage( { '0': 16, '1':'string1'});
          //Pebble.sendAppMessage( { 'price': 16});
          
          //Pebble.sendAppMessage( { '0': 'ok', '1': "$" + price.toString() }  ); //egd1 OK  JSON
          //Pebble.sendAppMessage( { '0': 'ok', '1': marketCap.toString() }  ); //egd1 OK
        
          
          
          
        } // if (response.Data)
        
      } // if (req.readyState == 4)
      
      else {
        console.log("Request returned error code " + req.status.toString());
      }
    
    } // if (req.readyState == 4)
  
  }; // req.onload = function(e) 
  
  
  
 
req.error = function(e) {
            console.log("req.error called. Error: " + e);
        };


req.onreadystatechange = function(){
            console.log("req.onreadystatechange called. readyState: " + this.readyState);
        };
 
  
req.onerror = function(e) {
    console.log("onerror = " + e.error);
  };

  
  console.log("req.send() 1");
  
  req.send(null);
  
  console.log("req.send() 2");



}  // function fetchStockQuote(symbol, isInitMsg) { ... }



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
                          
                    //      fetchStockQuote(symbol, isInitMsg);
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
                        
                        }); // Pebble.addEventListener(...)
