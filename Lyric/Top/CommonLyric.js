//Will use this as the LYRIC COMMON PROGRAM for ALL script in the 'Top' Directory except on Next Player
//those verified are are:
//   from PlayList.html lineType()longestLine()deodeFredComponant() enncodeFredComponant()passARR(),receiveARR()
//   
function lineType(str){   
    var ans ="lyric";
    if(str.substring (0,7).toUpperCase()=="IREALB:"){ans = "irealb";}    
    else if(str.substring (0,4).toUpperCase()=="TAB:"){ans = "tab";}    
    else if(str.substring (0,4)=="http")  {ans = "link";}
    else if(str.substring (0,3)=="@@@")  {ans = "noteTech";} 
    else if(str.substring (0,2)=="@@")  {ans = "noteTriv";}
    else if(str.substring (0,1)=="@")  {ans = "note";}
    else if(str.substring (0,1)=="#") {ans = "header";}
    else if(str.substring (0,2)=="$$") {ans = "noteLive";}
    else if(str.substring (0,1)=="$") {ans = "spacer";}
    else if(str.search(":")>-1) {ans = "hash";}
    else if(str.indexOf("|") >-1){ans ="chord";}
    return ans;}

function longestLine() {
    var count = 0;
    var i = 0;
    while (i < ARRlines.length) {
        var ltype = lineType(ARRlines[i]);
        if (ltype == 'lyric' | ltype == 'chord') {
            if (ARRlines[i].length > count) {
                count = ARRlines[i].length;
            }
        }
        i++;
    }
    return count;
}

function decodeFredComponent(str) //decodes problem char (?,@)
{ //alert("D")
    str = str.split("QMARK");
    str = str.join("?");
    str = str.split("AMARK");
    str = str.join("@");
    return str;
}

function encodeFredComponent(str) //encodes problem char (?)
{
    str = str.split("?");
    str = str.join("QMARK");
    str = str.split("@");
    str = str.join("AMARK");
    return str;
}

function createSetSelector() //B
{ //alert ('Lyric Common function');//creates an option box for the file SetList.txt in the top directory
    //statusMsg("Starting Javascript: Loading List of Sets....");not all programs use a status message
    var path = "SetList.txt";
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    var SETS = content.split("\n");
    ihtml = "SELECT A PLAYLIST: <select id='Set' style='font-size:2vw;font-family:Courrier New;' onchange='selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
    j = 0;
    while (j < SETS.length) {
        if (SETS[j] !== "ALL TUNES") {
            ihtml = ihtml + "\n<option>" + SETS[j] + "</option>";
        }
        j = j + 1;
    }
    ihtml = ihtml + "\n</optgroup></Select>";
    document.getElementById("setSelect").innerHTML = ihtml;
    //selectSet("ALL TUNES");//xxx0 was unnecessary
}

function receiveARR(divider,keepName) {//decode array (or string) and leading elements (put in receiving page)
    var oldName=window.name;
    var data;
    if(divider===undefined)//recieve a string
        {data=decodeURIComponent(decodeFredComponent(window.name));}
    else//receive and array
        {data=decodeURIComponent(decodeFredComponent(window.name)).split(divider);}
    if(keepName===true|keepName===undefined|keepName===''){window.name=oldName;}
    return  data;}

function passARR(pageName,arr,divider,leadingElements){//take data, array or string and pass to another page//if its an array it you must use a divider (i.e. '\n')
    var pf;
    if(Array.isArray(arr)===true){pf=arr.join(divider);}else{pf=arr;}
    if(leadingElements!==null){pf=leadingElements+divider+pf;}
    window.open(pageName,encodeURI(encodeFredComponent(pf)),"toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
    dis('prntType','none')}

