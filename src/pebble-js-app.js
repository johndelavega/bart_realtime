// We use the fake "PBL" symbol as default
var defaultSymbol = "PBL";
var symbol = defaultSymbol;

// Fetch stock data for a given stock symbol (NYSE or NASDAQ only) from markitondemand.com
// & send the stock price back to the watch via app message
// API documentation at http://dev.markitondemand.com/#doc
function fetchStockQuote(symbol, isInitMsg) {
  
  console.log("fetchStockQuote(...)");
  
 // Pebble.sendAppMessage( { '0': 16, '1':'string1'});
  
//  return;
  
  var response;
  var req = new XMLHttpRequest();
  // build the GET request
  req.open('GET', "http://dev.markitondemand.com/Api/Quote/json?" +
    "symbol=" + symbol, true);
  req.onload = function(e) {
    if (req.readyState == 4) {
      // 200 - HTTP OK
      if(req.status == 200) {
        console.log(req.responseText);
        response = JSON.parse(req.responseText);
        
        var price;
        
        if (response.Message) {
          // the markitondemand API sends a response with a Message
          // field when the symbol is not found
          Pebble.sendAppMessage({
            "price": "Not Found"});
        }
        if (response.Data) {
          // data found, look for LastPrice
          price = response.Data.LastPrice;
          console.log("debug01 " + price);

          
          var msg = {};
/*          
          if (isInitMsg) {
//            msg.ini = false;
            msg.init = true;
            msg.symbol = symbol;
          }
*/          
          msg.price = "$" + price.toString();
          //Pebble.sendAppMessage(msg);
          //Pebble.sendAppMessage( { '0': 16, '1':'string1'});
          //Pebble.sendAppMessage( { 'price': 16});
          Pebble.sendAppMessage( { '0': 'ok', '1': price.toString() }  ); //egd1
        }
      } else {
        console.log("Request returned error code " + req.status.toString());
      }
    }
  };
  req.send(null);
}

// Set callback for the app ready event
Pebble.addEventListener("ready",
                        function(e) {
                          console.log("connect! " + e.ready);
                          console.log(e.type);
                          // Fetch saved symbol from local storage (using
                          // standard localStorage webAPI)
                          symbol = localStorage.getItem("symbol");
                          
                          if (!symbol) {
                            symbol = "ADSK";// "AAPL"; //egd1
                          }
                          
                          var isInitMsg = true;
                          
                          //fetchStockQuote(symbol, isInitMsg);
                          fetchStockQuote("AAPL", isInitMsg);  //egd2
                          
                        });



// Set callback for appmessage events
Pebble.addEventListener("appmessage",
                        function(e) {
                          console.log("message");
                          var isInitMsg;
                          if (e.payload.init) {
                            isInitMsg = true;
                            fetchStockQuote(symbol, isInitMsg);
                          }
                          else if (e.payload.fetch) {
                            isInitMsg = false;
                            fetchStockQuote(symbol, isInitMsg);
                          }
                          else if (e.payload.symbol) {
                            symbol = e.payload.symbol;
                            localStorage.setItem("symbol", symbol);
                            isInitMsg = false;
                            fetchStockQuote(symbol, isInitMsg);
                          }
                        });
