// js/xml.js
//
//




function john3a() {
  return "xml.js:john3a()";
}





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

//exports.jonh3 = john3; // public function





//------------------------------------------------------------

// must be declared outside function for persistency
var m_minutes = [];


// process multiple <etd>
function john4(tag, xml, level) {


  //  m_minutes = []; // clear reset empty | // reseting it here will only process the last etd

    var xml_len = xml.length;

    //jsFiddleConsole.log("function john4() ....... tag = " + tag + ",  level = " + level + ",  xml_len = " + xml_len);



    //var tag = "etd";

    var tag1 = "<" + tag + ">";
    var tag2 = "</" + tag + ">";


    //    jsFiddleConsole.log("john4(),  tag = " + t2);


    var pos1 = xml.search(tag1); // position/location

    //    var n2 = xml.search(t2);

    // need to process only 1 etd within while loop!!!

    var i = 0;
    // while ( (i = i + 2) < 10 )   // OK
    while ((pos1 = xml.search(tag1)) > -1) {


        //      jsFiddleConsole.log(" while i  = " + i++);

        //        jsFiddleConsole.log("john4(),  xml_len = " + xml_len);

        var pos2 = xml.search(tag2);

        pos2 = pos2 + tag2.length;

        //var pos0 = pos2 + tag2.length;

        //pos0 = pos2;

        //var l = n2 - n1; // length of text value
        //var res = xml.substr(n1 + l1, l); // extract text value


        // 2015-04-21
        if ((tag == "etd") && (xml.search("<destination>") > -1)) {

//            brtDebugXml("etd  xml substring = " + xml.substring(pos1, pos2));

//            brtPrint("john4() 27, destination = " + john3("destination", xml.substring(pos1, pos2)));
            //jsFiddleConsole.log("john4() 27, destination = ?; tag = " + tag);            

        }


        // recursive call
        if ((tag == "etd") && (xml.search("<estimate>") > -1)) {
            //            john4("estimate", xml.substr(n1, n0),level+1); // <etd> ... </etd>
            //jsFiddleConsole.log("john4(), estimate = " + john4("estimate", xml.substr(0, n0)));            

        }



        // destination abbreviation
        //jsFiddleConsole.log("john4(), destination = " + john3("destination", xml.substr(0, n0)));



        if ((tag == "estimate") && (xml.search("<minutes>") > -1)) {

//            brtDebugXml(" estimate xml substring = " + xml.substring(pos1, pos2));

            var minutes = john3("minutes", xml.substring(pos1, pos2));
            //brtPrint("john4() 8, minutes = " + minutes);
            m_minutes.push(minutes);
            //brtPrint("minutes len = " + m_minutes.length);
            //brtPrint("john4() 8, minutes = " + john3("minutes", xml.substring(pos1, pos2)));  // <<<<<<<<<<<<<<<          

        }

        // recursive call
        if (tag == "etd") {
            // process multiple estimates
            john4("estimate", xml.substring(pos1, pos2), level + 1); // <etd> ... </etd>
        }



        xml = xml.substr(pos2, xml_len - pos2); // next <etd> or <estimate>
        xml_len = xml.length;

        //brtDebugXml(" next xml = " + xml);


    } // while    



    //return "john4()";
    //return john3("name",m_xml);


    //return "version 20, array len = " + m_minutes.length; //john3("abbr",m_xml) + " = " + john3("name",m_xml);
    return m_minutes;

} // john4(tag, xml, level)




//------------------------------------------------------------

function john5(tag, xml, level) {

/*  
    var test = [7, 9, "Leaving", 2, 4];
    var len1 = test.length;
    var test1 = [];

    // replace "Leaving" with 0
    test.forEach(function (entry) {
        if ((entry.toString()).toUpperCase() == "LEAVING")
            test1.push(0);
        else
            test1.push(entry);
    })
*/    
  
  
  
    m_minutes = []; // reset

    var return1 = john4(tag, xml, level);

  
    // replace "Leaving" with 0
    var return2 = [];
    return1.forEach(function (entry) {
        if ((entry.toString()).toUpperCase() == "LEAVING")
            return2.push(0);
        else
            return2.push(entry);
    });

    return1 = return2;

    return1.sort(function (a, b) { return a - b; }); // ascending;  b - a for descending  
  
  
  
    // return as json and process it here
  
    var returnStr = return1.toString();

//    var lenA = return1.length;
//    var lenS = returnStr.length;

    returnStr = returnStr.replace("Leaving", "0");

// points.sort(function(a, b){return a-b});

    return returnStr;
}

//------------------------------------------------------------






