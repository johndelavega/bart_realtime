// js/pebblekt-app.js
// tested confirmed specific filename is not required!!!
//
// This is a PebbleKit Javascript project, not pebble.js
// http://developer.getpebble.com/guides/pebble-apps/pebblekit-js
//
// var xml = require('xml'); // does not appear to be required, methods from other js modules are accessible, 2015-05-10 john

// https://developer.getpebble.com/docs/pebblejs/#require-path

/*

[PHONE] pebble-app.js:?: ReferenceError: require is not defined
    at pebble-js-app.js:2:11
[PHONE] pebble-app.js:?: JS failed.

*/

// var xml = require('xml'); 


var m_stationDefault = "DBRK"; //"WOAK"; //"DBRK"; //"POWL"; //"PLZA";
var m_station = m_stationDefault;
var m_direction = "N";

var m_xml_bart_etd = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + m_station + "&key=MW9S-E7SL-26DU-VV8V&dir=" + m_direction;


function john1() {
    return "john1()";
}

function john2() {
    return "john2()";
}




//  var xml2js = require('xml2js'); // [PHONE] pebble-app.js:?: Error: BART Realtime: Can't Find Module xml2js

//  var xml2js = require('xml2js');  // require is not define
//[PHONE] pebble-app.js:?: ReferenceError: require is not defined
//   at pebble-js-app.js:5:12


// 
function fetchBartETA(station, isInitMsg) {

//    var rand2 = Math.random();

    //  console.log("fetchBartETA(...)  rand2 = ",rand2);

    console.log("fetchBartETA(...)  station = ", station);


//    var response;
    //var station = "PLZA"; // POWL DBRK? NBRK?
    var req = new XMLHttpRequest();
    // build the GET request
    // http://api.bart.gov/api/etd.aspx?cmd=etd&orig=PLZA&key=MW9S-E7SL-26DU-VV8V&dir=n

    //req.open('GET', "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=PLZA&key=MW9S-E7SL-26DU-VV8V&dir=n", true);

    //req.open('GET', "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + station + "&key=MW9S-E7SL-26DU-VV8V&dir=n", true);

    // xml from bart.gov are being fetched OK
//    var url_xml = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=DBRK&key=MW9S-E7SL-26DU-VV8V&dir=N";

    //req.open('GET', "http://dev.markitondemand.com/Api/Quote/json?" + "symbol=" + symbol, true); // causing the problem

    // http://maksil.net/test1/json/json1.txt  // utf-8 does not work

    //var url_json = "http://dev.markitondemand.com/Api/Quote/json?" + "symbol=" + symbol;
    //var url_json = "http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL";
    //var url_json = "http://dev.markitondemand.com";
    //var url_json = "http://notfound12345.123"; // execution stops at req.onload

    //  var url_json = "http://maksil.net/test1/json/json2-ansi.txt";
    //var url_json = "http://maksil.net/test1/json/json2-ansi.txt.not.found";


    console.log(" before open() status = ", req.status);
    console.log(" readyState = ", req.readyState);



    if (m_station.toUpperCase() == "DBRK")
    { m_direction = "N"; }
    else if (m_station.toUpperCase() == "PLZA")
    { m_direction = "S"; }


    m_xml_bart_etd = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + m_station + "&key=MW9S-E7SL-26DU-VV8V&dir=" + m_direction;

    //req.open('GET', url_json, true); // true = async
    // m_xml_bart_etd url_xml
    req.open('GET', m_xml_bart_etd, true); // true = async


    //req.open('GET', "http://maksil.net/test1/json/json2-ansi.txt", true); // this fixes the problem

    //  var xml2js = require('xml2js');

    //console.log(" DEBUG 00, req.open() url = ",url_json);
//    console.log(" DEBUG 00, req.open() url = ", url_xml);
    console.log(" status = ", req.status);
    console.log(" readyState = ", req.readyState);


    req.onload = function (e) {

        console.log(" DEBUG 01 - req.onload = function(e)");

        if (req.readyState == 4) {
            console.log("req.readyState == 4");

            // 200 - HTTP OK
            if (req.status == 200) {
                
                var xml = req.responseText; // calling this twice appears to cause runtime problem
                
                console.log("req.status == 200");
                console.log(" req.responseText 20  " + xml);

                // TODO: convert xml to json here
                console.log("TODO: convert xml to json  " + john1()); // + xml.john3());

                console.log(" john3a() = " + john3a());

                //var minutes = john3("minutes",xml);
                var minutes = john5("etd", xml, 0);

                console.log(" minutes = " + minutes);

                //response = JSON.parse(req.responseText); // JSON = java script object notation

                //response = { "Data": { "Status": "SUCCESS", "Name": "Autodesk Inc", "Symbol": "ADSK", "LastPrice": 54.01, "0": 16, "1": "string1" } };

                //console.log("response = " + response);    // = [object Object]   



                    var msg = {};
              
                    msg.minutes = minutes.toString() + "  min";
                    msg.station = station; //m_station; //"dbrk"; //s1; //"JOHN"; //egd1,  this can be retreived from the cloud, does not need iOS companion app
                    Pebble.sendAppMessage(msg);


            } // if (req.status == 200) {

            else {
                console.log("Request returned error code " + req.status.toString());
            }

        } // if (req.readyState == 4)

    }; // req.onload = function(e) 




    req.error = function (e) {
        console.log("req.error called. Error: " + e);
    };


    req.onreadystatechange = function () {
        console.log("req.onreadystatechange called. readyState: " + this.readyState);
    };


    req.onerror = function (e) {
        console.log("onerror = " + e.error);
    };


    console.log("req.send() 1");

    req.send(null);

    console.log("req.send() 2");



}  // function fetchBartETA(symbol, isInitMsg) { ... }




// Set callback for the app ready event
Pebble.addEventListener("ready",
                        function (e) {

                            //console.log("connect! " + e.ready.toString());
                            console.log("Pebble.addEventListener(ready) e.type = " + e.type);
                            console.log("appmessage : e.payload = " + e.payload);
                            // Fetch saved symbol from local storage (using
                            // standard localStorage webAPI)
                            //symbol2 = localStorage.getItem("symbol");

                            m_station = localStorage.getItem("station");

                            console.log("localStorage.getItem('station') : m_station = " + m_station);


                            if (m_station === null) {
                                m_station = m_stationDefault;
                            }



                            //                           var isInitMsg;



                            fetchBartETA(m_station, false); //DBRK 


                        }); // Pebble.addEventListener("ready",





// Set callback for appmessage events
Pebble.addEventListener("appmessage",
                        function (e) {
                            //                         window.navigator.

                            console.log("Pebble.addEventListener(message) e.type = " + e.type);
                            //                          console.log("Pebble.addEventListener(...) previous symbol = " + symbol); // rename to m_symbol

                            console.log("message");

                            console.log("appmessage : e.payload = " + e.payload);
                            console.log("appmessage : e.payload.init = " + e.payload.init);
                            //console.log("appmessage : e.payload.symbol = " + e.payload.symbol);
                            console.log("appmessage : e.payload.message = " + e.payload.message);
                            console.log("appmessage : e.payload.status = " + e.payload.status);
                            console.log("appmessage : e.payload.station = " + e.payload.station);

                            //                          var symbol_prev = symbol;

                            var isInitMsg;
                            if (e.payload.init) {
                                console.log("if (e.payload.init)  m_station = " + m_station);
                                isInitMsg = true;
                                fetchBartETA(m_station, isInitMsg);
                            }
                            else if (e.payload.fetch) {
                                console.log("else if (e.payload.fetch)");
                                isInitMsg = false;
                                fetchBartETA(m_station, isInitMsg);
                            }
                            else if (e.payload.station) {
                                console.log("else if (e.payload.station)");
                                var stationPayload = e.payload.station;

                                if (stationPayload.toUpperCase() == "DBRK" || stationPayload.toUpperCase() == "PLZA") {
                                    m_station = stationPayload;
                                }

                                //localStorage.setItem("symbol", symbol);
                                localStorage.setItem("station", m_station);
                                isInitMsg = false;
                                fetchBartETA(m_station, isInitMsg);
                            }

                        }); // Pebble.addEventListener(...)
