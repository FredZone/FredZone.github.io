function lineType(str)

    { //returns the type of line from the text file...  
        var ans ="lyric";
        if ((str.substring (0,7)).toUpperCase()=="IREALB:"){ans = "irealb";}    
        else if (str.substring (0,4)=="http")  {ans = "link";}
        else if (str.substring (0,3)=="@@@")  {ans = "noteTech";}
        else if (str.substring (0,2)=="@@")  {ans = "noteTriv";}
        else if (str.substring (0,1)=="@")  {ans = "note";}
        else if (str.substring (0,1)=="#") {ans = "header";}
        else if (str.substring (0,1)=="$") {ans = "spacer";}
        else if (str.search(":")>-1) {ans = "hash";}
        else if (str.indexOf("|") >-1){ans ="chord";}
        return ans;
    }
    
function longestLine()//Common Lyic
    {   var count =0;
        var i=0;
        while (i < ARRlines.length)
        {
            var ltype = lineType(ARRlines[i]);
            if (ltype == "chord" | ltype == "lyric"| ltype == "note")
            {
                if (ARRlines[i].length > count){count = ARRlines[i].length;}
            }
            i = i+1;
        }    
        return count;
    }
function decodeFredComponent(str)//decodes problem char (?,@)
    {//alert("D")
        str=str.split("QMARK");
        str=str.join("?");
        str=str.split("AMARK");
        str=str.join("@");        
        return str;
    } 
function encodeFredComponent(str)//encodes problem char (?)
    {
        str=str.split("?");
        str=str.join("QMARK");
        str=str.split("@");
        str=str.join("AMARK");
        return str;
    }
    
function createSetSelector()//B
    {   //alert ('Lyric Common function');//creates an option box for the file SetList.txt in the top directory
        statusMsg("Starting Javascript: Loading List of Sets....");
        var path ="SetList.txt";
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var SETS =content.split("\n");
        ihtml ="SELECT A PLAYLIST: <select id='Set' style='font-size:2vw;font-family:Courrier New;' onchange='selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
        j=0;
        while (j < SETS.length)
        {
            if (SETS[j]!=="ALL TUNES") {ihtml =ihtml +"\n<option>"+ SETS[j] +"</option>";}
            j = j+1;
        }
        ihtml =ihtml +"\n</optgroup></Select>";
        document.getElementById("setSelect").innerHTML=ihtml;    
        //selectSet("ALL TUNES");//xxx0 was unnecessary
    }
    
function  passARR(pageName,arr,divider,leadingElements)
    {   //pass an array to another page and open that page
        //format leadingElements to pass other variables...(separated by the divider)
        //to pass a string set leading compents to null
        var pf=arr.join(divider);
        if (leadingElements!==null){pf=leadingElements+divider+pf;}
        window.open(pageName,encodeURI(encodeFredComponent(pf)));
    }
    
function receiveARR(divider)
    {//decode array and leading elements (put in receiving page)
    return decodeURIComponent(decodeFredComponent(window.name)).split(divider);
    }    