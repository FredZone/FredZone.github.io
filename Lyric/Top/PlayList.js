//GLOBAL VARIABLES====================================================================================
var ARRlines;//lines in the song
var ARRtracks;//tracks
var ARRprint;//print array
var ARR;
var CELL;
var DUR;
var DURcalc; 
var DURtext;
var Fobj; //File object
var Fstr;  //File String // csv of file names
var BPM;
var BEATS;
var HITyear="????";
var KEY;
var MAXcell = 60;
var QUAL;
var SETname = "Unknown";
var TITLE ="UN-NAMED LIST";
var TAG =9999;
var SONGtitle;
var SONGtempo;
var SONGkey;
var SONGsound;
var SONGnotes;
var SONGvolume;
function updateSong() {
    SONGnotes = document.getElementById('songNotes').value;
    SONGtitle = document.getElementById('songTitle').value;
    SONGkey = document.getElementById('songKey').value;
    SONGsound = document.getElementById('songSound').value;
    SONGtempo = document.getElementById('songTempo').value;
    SONGvolume = document.getElementById('songVolume').value;
    document.getElementById(CELL).value = recode();
    document.getElementById('warning').style.display = 'block';
    document.getElementById('msg').innerHTML = "SAVE YOUR CHANGES!";
    }
    
    function recode() {
        var str = "";
        if (SONGvolume >= 0) {
            str = "|" + SONGvolume;
            alert(str)
            }
            if (SONGnotes.length !== 0 | str.length !== 0) {
                SONGnotes = (SONGnotes.split("\n")).join("@");
                str = "|" + SONGnotes + str;
                }
                if (SONGsound.length !== 0 | str.length !== 0) {
                    str = "|" + SONGsound + str;
                    }
                    if (SONGtempo.length !== 0 | str.length !== 0) {
                        str = "|" + SONGtempo + str;
                        }
                        if (SONGkey.length !== 0 | str.length !== 0) {
                str = "|" + SONGkey + str;
                }
                str = SONGtitle + str;
                alert(str)
    return str;
    }
    
    function decode(args) { //works
        defaults();
        var k = "";
        var n = " ";
    var i = 0;
    var arr = args.split("|");
    document.getElementById("songNum").value = CELL;
    document.getElementById("songTitle").value = SONGtitle = arr[0];
    if (arr.length > 1) {
        SONGkey = arr[1];
        arrKeys = (":0,A:1,Bb:2,B:3,C:4,C#:5,D:6,Eb:7,E:8,F:9,F#:10,G:11,Ab:12").split(",");
        while (n == " ") {
            k = arrKeys[i].split(":");
            if (k[0] == arr[1]) {
                n = k[1];
                SONGkey = k[0];
                }
                i = i + 1;
                }
                document.getElementById("songKey").selectedIndex = n;
                if (arr.length > 2) {
            document.getElementById("songTempo").value = SONGtempo = arr[2];
            n = " ";
            if (arr.length > 3) {
                SONGsound = arr[3];
                arrSounds = (":0,SILENT:1,BACK TRACK:2,CLICK TRACK:3,VOCAL:4,DRUM ROCK:5,DRUM COUNTRY:6,DRUM COUNT:7").split(",");
                i = 0;
                while (n == " ") {
                    k = arrSounds[i].split(":");
                    if (k[0] == arr[3]) {
                        n = k[1];
                        SONGsound = arr[3];
                    }
                    i = i + 1;
                    }
                document.getElementById("songSound").selectedIndex = n;
                if (arr.length > 4) {
                    document.getElementById("songNotes").value = SONGnotes = (arr[4].split('@')).join('\n');
                }
                if (arr.length > 5) {
                    document.getElementById("songVolume").value = SONGvolume = arr[5];
                } else {
                    document.getElementById("songVolume").value = SONGvolume = null;
                }
            }
        }
    }
}

function defaults() {
    document.getElementById("songTitle").value = SONGtitle = "";
    SONGkey = "";
    document.getElementById("songKey").selectedIndex = 0;
    document.getElementById("songTempo").value = "";
    SONGtempo = "";
    SONGsound = "";
    document.getElementById("songSound").selectedIndex = 0;
    document.getElementById("songNotes").value = "";
    SONGnotes = "";
}

//BOOT FUNCTIONS====================================================================================
window.onload = function() {
    reset();
    var x = receiveARR();
    if (!x) //normal first time boot, no query string
    {
        createSetSelector(); //boot to the default list
    } else {
        selectSet(x);
    }
};
//RECENT========================================================================================================

function saveList()
    {
        arrUpdate();
        TITLE = document.getElementById("title").value;
        saveTextAsFile(TITLE,ARR.join('\n'));   
    }

function home(){window.open("index.html");} 

function   analizeSong(sTitle,item)
    {   //works with the first line
        var path ="../text/" + sTitle + ".txt";  //get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var cont = request.responseText;
        ARRlines = cont.split("\n");//make an array of lines
        cont ="";
        var fileInfo;
        var line =(ARRlines[0]);
        if (!item)
        {
            fTitle = hash(line,"TITLE",'None');
            DUR = hash(line,"DUR","???");
            BPM= hash(line,"BPM","???");
            BEATS = hash(line,"BEATS","???");
            KEY = hash(line,"KEY","???");
            QUAL = (hash(line,"QUAL","???"));
            ARTIST = (hash(line,"ARTIST","???"));
            HITyear = (hash(line,"HITyear","???"));
            fileInfo = "TITLE: " + fTitle+ "\nDURATION (specified): "+ secToMin(DUR)+"\nBPM: "+ BPM+"\nBEATS: "+ BEATS +"\nKEY: "+ KEY+"\nQUALITY: "+ QUAL+"\nARTIST: "+ ARTIST;               
            countBARS();
            DURcalc = parseInt(BARS*BEATS*60/BPM,10);
            if (isNaN(DURcalc)===true) {DURcalc=0;}
            fileInfo =fileInfo + "\nBARS :"+BARS +  "\nDURATION (calc) :"+ secToMin(DURcalc);
        }else if (item =="ALL"){
            fileInfo = line;
        }else{
            fileInfo = hash(line,item,"?");
        }
        return fileInfo;
    }

function printBigList()
  {
    document.getElementById('printSpinner3').style.visibility='visible';
    var titlePlus="";
    var newKey ="";
    var newBPM ="";
    var line = "";
    var title ="";
    var  str ="";
    var durSet =0;
    var songCount =0;
    var songNum =0;
    var hasAlt=false;
    var alt = false;
        str = "<!DOCTYPE html><html><head><Title>" + TITLE +"</title>\n";
        str = str + "\n<style>\nBody\n{font-size : 2.7vw; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:Left;background-color:white;}\n";
        str = str + "X2{font-size : 4vw ; text-align:Center}\n";
        str = str + "X3{font-size : 2.7vw ;color:Black;}\n";
        str = str + "X4{font-size : 2.7vw ;color:Green;}\n";
        str = str + "\n</style></head><body>";
        str = str+"<X2>"+TITLE +"</X2><pre>\n";                
        str = str+"===========================";
        var j = 0;
        while (j < MAXcell)
        {   titlePlus=document.getElementById("a"+j).value;
            arrTitle =titlePlus.split("|");
            title=arrTitle[0];
            if (title.substr(0,1)=="@") {title = title.substr(1);alt = true; hasAlt=true;}else {songCount = songCount+1;}
            if (title)
                {
                if (alt === true)
                {
                    if (songCount<10) {line = "**";}else{line = "** ";}
                }else{
                    line = songCount +":";
                }
                if (songCount<10) {line = " " + line ;}
                analizeSong(title); //alert("anlized "+j);
                if (arrTitle[1]!== undefined & arrTitle[1]!=="") {newKey = arrTitle[1];}else {newKey=KEY;}
                line ="\n"+ line  +"("+newKey+") " + title.toUpperCase();
                line = line.substring(0,40);    
                str =str+ line;
                }
            alt = false;
            j = j+1;
        }
        str = str +"<br>===========================";
        if (hasAlt === true) {str=str +"\n** Alternate Song";}
        str = str + "</pre></body></html>";
        var newWindow = window.open(scrollbars=1);
        newWindow .document.open();
        newWindow .document.write(str);
        newWindow .document.close();
        document.getElementById('printSpinner3').style.visibility='hidden';
    }  

 function printList()
  {
    document.getElementById('printSpinner').style.visibility='visible';
    var titlePlus="";
    var newKey ="";
    var newBPM ="";
    var line = "";
    var title ="";
    var  str ="";
    var durSet =0;
    var songCount =0;
    var songNum =0;
    var hasAlt=false;
    var alt = false;
        str = "<!DOCTYPE html><html><head><Title>" + TITLE +"</title>\n";
        str = str + "\n<style>\nBody\n{font-size : 2.7vw; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:Left;background-color:white;}\n";
        str = str + "X2{font-size : 4vw ; text-align:Center}\n";
        str = str + "X3{font-size : 2.7vw ;color:Black;}\n";
        str = str + "X4{font-size : 2.7vw ;color:Green;}\n";
        str = str + "\n</style></head><body>";
        str = str+"<X2>"+TITLE +"</X2><pre>\n";                
        str = str+"===========================================" + "KEY BPM";
        var j = 0;
        while (j < MAXcell)
        {   titlePlus=document.getElementById("a"+j).value;
            arrTitle =titlePlus.split("|");
            title=arrTitle[0];
            document.getElementById('statusMsg').innerHTML=title;
            if (title.substr(0,1)=="@") {title = title.substr(1);alt = true; hasAlt=true;}else {songCount = songCount+1;}
            if (title)
                {
                if (alt === true){line = "**";}else{line = songCount +":";}
                if (songCount<10) {line = " " + line ;}
                line ="\n"+ line +"  " + title.toUpperCase()+"                                   ";
                line = line.substring(0,40);    
                analizeSong(title); //alert("anlized "+j);
                if (arrTitle[1]!== undefined & arrTitle[1]!=="") {newKey = arrTitle[1];}else {newKey=KEY;}
                line=line +newKey;
                line = line+"    ";
                line = line.substring(0,47);
                if (arrTitle[2]!== undefined & arrTitle[2]!=="") {newBPM = arrTitle[2];}else {newBPM= BPM;}
                line = line +"("+ newBPM +")";
                line = line+"     ";
                line = line.substring(0,52);
                str =str+ line;
                }
            alt = false;
            j = j+1;
        }
        str = str +"<br>=================================================";
        if (hasAlt === true) {str=str +"\n** Indicates Alternate Song";}
        str = str + "</pre></body></html>";
        var newWindow = window.open(scrollbars=1);
        newWindow .document.open();
        newWindow .document.write(str);
        newWindow .document.close();
        document.getElementById('printSpinner').style.visibility='hidden';
    }  

function analizeList()
    {
    document.getElementById('printSpinner2').style.visibility='visible';
    var gap=15;//15 second gap
    var titlePlus="";
    var newKey ="";
    var newBPM ="";
    var line = "";
    var title ="";
    var  str ="";
    var durSet =0;
    var songCount =0;
    var songNum =0;
    var hasAlt=false;
    var alt = false;
        str = "<!DOCTYPE html><html><head><Title>" + TITLE +"</title>\n";
        str = str + "\n<style>\nBody\n{font-size : 2.7vw; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:Left;background-color:white;}\n";
        str = str + "X2{font-size : 4vw ; text-align:Center}\n";
        str = str + "X3{font-size : 2.7vw ;color:Black;}\n";
        str = str + "X4{font-size : 2.7vw ;color:Green;}\n";
        str = str + "\n</style></head><body>";
        str = str+"<X2>"+TITLE +"</X2><pre>\n";                
        str = str+"===========================================" + "KEY BPM  Dur   Time";
        var j = 0;
        while (j < MAXcell)
        {   titlePlus=document.getElementById("a"+j).value;
            arrTitle =titlePlus.split("|");
            title=arrTitle[0];
            if (title.substr(0,1)=="@") {title = title.substr(1);alt = true; hasAlt=true;}else {if(title){songCount = songCount+1;}}
            if (title)
                {
                analizeSong(title); //alert("anlized "+j);
                if (alt === true){line = "**";}else{line = songCount +":";}
                if (songCount<10) {line = " " + line ;}
                //line ="\n"+ line +"  " + title +".....................................................................";
                line ="\n"+ line +"  " + title.toUpperCase() +" ("+HITyear+").....................................................................";
                line = line.substring(0,45);    
                if (arrTitle[1]!== undefined & arrTitle[1]!==""){newKey = arrTitle[1];}else {newKey=KEY;}
                line=line +newKey;
                line = line+"    ";
                line = line.substring(0,47);
                if (arrTitle[2]!== undefined & arrTitle[2]!==""){newBPM = arrTitle[2];}else {newBPM= BPM;}
                line = line +"("+ newBPM +")";
                line = line+"     ";
                line = line.substring(0,52);
                var ast ="";
                if ((DURcalc)===0) {
                    if (title.substring(0,4)=="====") {
                        DURcalc=0;
                        gap=0;
                        line="<br>-----Total Playlist================================";
                    }else{
                        gap=15
                        DURcalc =120; ast ="*";
                        line = line+"{"+ secToMin(DURcalc)+"}";
                    }
                }
                line = line+"{"+ secToMin(DURcalc)+"}";
                if (title.substring(0,3)=='==='){gap=0}
  
                if (alt ===false){durSet= parseInt(durSet,10)+parseInt(DURcalc,10)+gap;line = line+"["+ secToMin(durSet)+"]" +ast;}else{line =line+"-----";}
                //if (alt ===false){durSet= parseInt(durSet,10)+parseInt(DURcalc,10)+15;line = line+"["+ secToMin(durSet)+"]" +ast;}else{line =line+"-----";}
                str =str+ line;
                }
            alt = false;
            j = j+1;
        }
        str = str +"<br>================================================================";
        str = str +"<br>TOTAL SET: " + secToMin(durSet)+   "(At 15 seconds between songs)<br>";
        str = str +secToMin(durSet/songCount)+ " Average Song Length...";
        str = str + "<br>*  Indicates Estimated Duration";
        if (hasAlt === true) {str=str +"<br>** Indicates Alternate Song";}
        str = str + "</pre></body></html>";
        var newWindow = window.open(scrollbars=1);
        newWindow .document.open();
        newWindow .document.write(str);
        newWindow .document.close();
        document.getElementById('printSpinner2').style.visibility='hidden';
    }  
function arrUpdate()
{   ARR="";
    var songStr ="";
    var song ="";
    songStr=document.getElementById("a0").value; 
    var j = 1;
    while (j< MAXcell)
        {
        song =document.getElementById("a"+j).value; 
        if (song.length >2)
            {
               songStr = songStr +"\n" + song;
            }
        j = j+1;
        }
        ARR=songStr.split('\n');
    }

function reset()
    {
    getTracks();
    listOfTunes();
    listOfTracks();
    listOfSets()
    var j =0;
    while (j< MAXcell){(document.getElementById('a' +(j))).value ="";j = j+1;}
    document.getElementById('title').value ="Put Playlist Title HERE";
    }

function selectSet(set,num)//C
    {  //Selects your set and tune by number
        //("Getting " + set +" from the Server");
        if (!num) {num = 0;}
        if (!set) {
         alert(1);//zzzzzzzzzzzzzzzzzzzzzzzzzz
        }
        TUNEnum = num ;
        SETname = set;
        SETlist = "";
        var request = new XMLHttpRequest();
        path ="../Sets/"+SETname+".txt";
        request.open("GET", path, false);
        request.send(null);
        var str = request.responseText;
        screenUpdate(str,SETname);
    } 

//FILE FUNCTIONS======================================================================================
function saveTextAsFile(fileName,textToWrite)
        {      
            var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
            var downloadLink = document.createElement("a");
            downloadLink.download = fileName;
                // provide text for the link. This will be hidden so you can actually use anything you want.
            downloadLink.innerHTML = "My Hidden Link";
                // allow our code to work in webkit & Gecko based browsers without the need for a if / else block.
            window.URL = window.URL || window.webkitURL;
        // Create the link Object.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        // when link is clicked call a function to remove it from the DOM in case user wants to save a second file.
            downloadLink.onclick = destroyClickedElement;
        // make sure the link is hidden.
            downloadLink.style.display = "none";
        // add the link to the DOM
            document.body.appendChild(downloadLink);
        // click the new link
            downloadLink.click();
        }

function destroyClickedElement(event)
        {
        // remove the link from the DOM XXX why a separte function????
            document.body.removeChild(event.target);
        }

function importPlaylist()//XXX
    {
        Fobj = document.getElementById('fileInput').files;//created fileInput in first step
        //alert (Fobj[0].name);
        Fstr = makeListFileNames(Fobj);
        //alert (Fstr);
    }

function setUpListener()               
    {
        document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
    }

function readSingleFile(e)
        {
        var file = e.target.files[0];
        if (!file){ alert("No Valid File...");return;}//incase no file
        var reader = new FileReader();
        reader.onload = function(e)
        {
            var contents = e.target.result;//to screenUpdate is program specific
            //get rid of the damn line feeds
            while (contents.indexOf("\r") >= 0)
            {contents = contents.replace("\r", "");}
            //program specific steps below
            document.getElementById('title').value= (file.name.substring(0,(file.name.length)-4));
            TITLE =document.getElementById('title').value;
            screenUpdate(contents, TITLE);
        };
        reader.readAsText(file);
    }

//LIST NAVIGATION==================================================================================
function tag(num) //tag a cell to work on
{ //alert(TAG + " == " +num);
    if (num == TAG) {
        CELL = "";
        TAG = 9999;
        defaults();
    } else {
        TAG = num;
        CELL = "a" + num;
    } //clear or tag
    var j = 0;
    while (j < MAXcell) { //alert(CELL +" == a" +j)
        if ("a" + j == CELL) {
            document.getElementById("a" + j).style.backgroundColor = 'yellow';
            decode(document.getElementById("a" + j).value);
        } else {
            document.getElementById("a" + j).style.backgroundColor = 'white';
        }
        j = j + 1;
    }
}

function up() {
    if (TAG > 0) {
        var x = document.getElementById("a" + TAG).value;
        document.getElementById("a" + TAG).value = document.getElementById("a" + (TAG - 1)).value;
        document.getElementById("a" + (TAG - 1)).value = x;
        tag(TAG - 1);
    }
}

function down() {
    var x = document.getElementById("a" + TAG).value;
    document.getElementById("a" + TAG).value = document.getElementById("a" + (TAG + 1)).value;
    document.getElementById("a" + (TAG + 1)).value = x;
    tag(TAG + 1);

}

function space() {
    document.getElementById("a" + TAG).value = ""; //clears a cell
    defaults();
}

function del() {
    j = TAG;
    while (j < MAXcell) {
        document.getElementById("a" + j).value = document.getElementById("a" + (j + 1)).value;
        j = j + 1;
    }
    document.getElementById("a" + MAXcell).value = "";
}

function ins() {
    //alert(TAG +"  "+MAXcell)
    j = MAXcell;
    while (j > TAG) {
        document.getElementById("a" + j).value = document.getElementById("a" + (j - 1)).value;
        j = j - 1;
    }
    document.getElementById("a" + TAG).value = "";
}
//ARRAY FILES =========================================================================================================       

function countBARS() {
    var j = 0;
    BARS = 0;
    while (j < ARRlines.length) //go through the 
    {
        var line = ARRlines[j];
        if (lineType(line) == 'chord') {
            var count = countChr(line, "|");
            BARS = BARS + count; //total the |'s 
        }
        j = j + 1;
    }
}

function screenUpdate(str, title) {
    if (!title) {
        TITLE = document.getElementById('title').value;
    } else {
        document.getElementById('title').value = title;
        TITLE = title;
    }
    var j = 0;
    var i = 0;
    var arr = str.split("\n");
    while (j < MAXcell) {
        if (arr[j]) {
            document.getElementById("a" + i).value = arr[j];
            i = i + 1;
        } else {
            document.getElementById("a" + j).value = "";
        }
        j = j + 1;
    }
}

function addTune(tuneName) {
    document.getElementById("a" + TAG).value = tuneName;
}

function getTracks() {
    var path = "ALL TRACKS.txt";
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    ARRtracks = content.split("\n");
}
//IFORMATION MANAGEMENT========================================================================================

function displayInfo(id,key){alert(analizeSong(document.getElementById(id).value,key));}

function listOfTunes() //Get a list of ALL TUNES to select from
{
    TUNElist = "";
    var request = new XMLHttpRequest();
    path = "../Sets/ALL TUNES.txt";
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    TUNElist = content.split("\n");
    var lst = "<select id='mySet' onchange='addTune(this.value)' style='width:30vw'><br>optgroup>";
    j = 0;
    while (j < TUNElist.length) {
        lst = lst + "\n<option>" + TUNElist[j] + "</option>";
        j = j + 1;
    }
    lst = lst + "\n</optgroup></Select>";
    document.getElementById("tuneList").innerHTML = lst; //makes the tune list should be named tune or selected tune
}

function listOfTracks() //Get a list of ALL TRACKS to select from
{
    TRACKlist = "";
    var request = new XMLHttpRequest();
    path = "ALL TRACKS.txt";
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    TRACKlist = content.split("\n");
    var lst = "<select id='mySet' onchange='addTune(this.value)' style='width:30vw'><br>optgroup>";
    j = 0;
    while (j < TRACKlist.length) {
        lst = lst + "\n<option>" + TRACKlist[j] + "</option>";
        j = j + 1;
    }
    lst = lst + "\n</optgroup></Select>";
    document.getElementById("trackList").innerHTML = lst; //makes the track list should be named tune or selected tune
}

function listOfSets() {
    var path = "SetList.txt";
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    var SETS = content.split("\n");
    ihtml = "<select id='Set' onchange='selectSet(this.value,0)'><optgroup>\n<option selected>ALL TUNES</option>";
    j = 0;
    while (j < SETS.length) {
        if (SETS[j] !== "ALL TUNES") {
            ihtml = ihtml + "\n<option>" + SETS[j] + "</option>";
        }
        j = j + 1;
    }
    ihtml = ihtml + "\n</optgroup></Select>";
    document.getElementById("setSelect").innerHTML = ihtml;
    // alert(document.getElementById('Set').value);
}
//Borrowed function ================================================================================

function hash(hashString, key, defaultVal) //Gets hash values from string a:b,c:d,e:f,......
{
    var arrHash = (hashString.split(",")); // an array from hashString   
    var i = 0;
    while (i < arrHash.length) {
        var ele = (arrHash[i].split(":")); //Hash4 an array of the first element of Hash3
        if (ele[0] == key) {
            defaultVal = ele[1];
            i = arrHash.length; //kick you out must be a better way
        }
        i++;
    }
    return defaultVal;
}

function countChr(str, chr) { //counts chr in a line
    var i = 0;
    var count = 0;
    while (i < str.length) {
        if (str[i] == chr) {
            count = count + 1;
        }
        i = i + 1;
    }
    return count;
}

function secToMin(sec) //XXX this sucks
{
    var m = parseInt((sec / 60), 10);
    var s = parseInt(parseFloat((sec / 60) - parseInt(sec / 60, 10)) * 60, 10);
    if (s < 10) {
        s = ":0" + s;
    } else {
        s = ":" + s;
    }
    return m + s;
}