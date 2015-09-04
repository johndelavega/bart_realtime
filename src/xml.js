




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
