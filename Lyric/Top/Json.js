//*GLOBAL VARIABLES HERE!!!!
var JSONfile="";
var JSONobj;
var JSONdown;
var ARRcollections;
var VID
dragElement(document.getElementById("notePad"));

//YOUR BOOT CODE=============================================================

function toggleWrap(id) {//you must have this function to mate with Global.js Boot and debug
    if(document.getElementById('demo').style.whiteSpace=="nowrap"){
        document.getElementById('demo').style.whiteSpace="normal";
        document.getElementById(id).innerHTML="SCROLL Y";
    }else{
        document.getElementById('demo').style.whiteSpace="nowrap";
                document.getElementById(id).innerHTML="WRAP Y";
    }
}
function buildSelector(id){
    if (id==undefined) {
        id='selectorA'
    }
   document.getElementById('padHTML').innerHTML="<select id=\'"+id+"\'><option>"+id+"</option></select>" 
}
var ARRoldList

function boot() {//you must have this function to mate with Global.js Boot and debug
    statusMsg('Loading default Database!')
    JSONget(document.getElementById('dbSelect').value)//default database
    
//Custom Opening  ===You can bypass this =============================================================  
   
    document.getElementById('demo').value=fileDownload('../Utool/Blues Justin Sandercoe(best).txt');
    document.getElementById('code').value="convertOld()";
    popUp('Programers Custom Settings','Custom Opening...',1,'white')
    ARRoldList=fileDownload('../Tube/OldList.txt').split('\n')   
    selectorBuild('selectX',ARRoldList,0)
    collectionsGet()
    MSGready="Welcome to the JSON Jungle Gym"
//^COMMON CODE (FINISH BOOT)
    finishBoot()
}
//END OF YOUR BOOT CODE=============================================================

function bullshit(){
     document.getElementById('titleA').value=(JSONobj.file.title)
     document.getElementById('descA').value=(JSONobj.file.desc)
}
//stolen======================================================================================
function collectionsGet() { //creates ARRcollections from server or local stollen from Utool-3
    statusMsg("Requesting Collection List'")
    ARRcollections = fileDownload('../Tube/Utool.txt').split("\n");
    selectorBuild('fileIndex', ARRcollections, 0);
    dis('fileIndex', 'block');
    colSelect(0)
}
function colSelect(col){//creates the ARRcollections select box
    if (col===undefined|col===null|col===''){col=0;}
    statusMsg('Collection '+col+ ' selected...'  );
    COL=col;//set the working Collection
    document.getElementById('fileIndex').selectedIndex=COL  // need only one of these
 
    
    
    vidsGet(col);
    }

function vidsGet(vid){//alert('vidsGet('+vid+')');//creates ARRvideos passes default value to selector and default loop
    statusMsg('Requesting Collection '+COL);
    if (vid===undefined|vid===''|vid===null){vid=0;}
    FILEname=ARRcollections[COL];
    statusMsg('Getting JSON Collection '+FILEname);
    jsonLoad("../Tube/"+FILEname+".json")
}

function jsonLoad(path) {//XXXshould go to json.js eventually
    statusMsg ('Downloading JSON data file: '+path)
    var content = "Attemping to Download" + path;
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    content = request.responseText;
    if (content.search("404") > -1 | content.length < 1) {
        statusMsg("Possible 404 error indicates Server didn't find: "+path)
    }
    statusMsg("Parsing JSON data file" )
    JSONfile=content;
    JSONobj=JSON.parse(content)
    fillVideos()
    
    document.getElementById('titleA').value=JSONobj.file.title;
    document.getElementById('descA').innerHTML=JSONobj.file.desc;

}

function fillVideos() { //JSONselector(sel,str)
    statusMsg('Listing the Available Videos...')
    var x, val, out;
    out = ""
    for (x in JSONobj.file.tracks) {
        val = JSONobj.file.tracks[x].title
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    TRACKcount=JSONobj.file.tracks.length
    document.getElementById('videos').innerHTML = out
    document.getElementById('videos').selectedIndex=0
    
    vidSelect(0)
}
//Here is where stolengoes south======================================================
function vidSelect(vid) {
    statusMsg(JSONobj.file.tracks[vid].title+ " video selected.")
    VID = vid;
    VIDnew = true;//????
    LOOPtype = 'none';
    document.getElementById('videos').selectedIndex = vid; //align selector
    document.getElementById('titleB').innerHTML=JSONobj.file.tracks[vid].title;
    document.getElementById('notesB').innerHTML=JSONobj.file.tracks[vid].notes;
    document.getElementById('utidB').value=JSONobj.file.tracks[vid].utid;


/*   UTID = JSONobj.file.tracks[vid].utid;
    UTtitle = JSONobj.file.tracks[vid].title;
    var path = "https://www.youtube.com/embed/" + UTID;
    path = path + "?enablejsapi=1"; //Works but shows ads;SHORTEST WORKING SOLUTION working solution
    document.getElementById('player').src = path;
    
    
    
    
    
    
    
    if (ONLINE===false) {
        statusMsg("YOU ARE OFFLINE!  YOU TUBE WONT WORK!");
        loopsGet(0);
    }else{
        statusMsg('Waiting for Video to load...','red')*/
        loopsGet()
    }

function loopsGet() { //JSONselector(sel,str)
    statusMsg("Loading the loops "+VID)
    var x, val, out;
    out = ""
    for (x in JSONobj.file.tracks[VID].loops) {
        val = JSONobj.file.tracks[VID].loops[x].title
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    document.getElementById('loops').innerHTML = out
    LOOPcount=JSONobj.file.tracks[VID].loops.length
    loopSelect(0)
   
}

function loopSelect(loop) {
    statusMsg("Loop " + loop + " selected...")
    LOOP = loop
    LOOPname = JSONobj.file.tracks[VID].loops[LOOP].title;
    
    document.getElementById('startC').value=JSONobj.file.tracks[VID].loops[LOOP].start;
    document.getElementById('stopC').value=JSONobj.file.tracks[VID].loops[LOOP].stop;
    document.getElementById('titleC').value=JSONobj.file.tracks[VID].loops[LOOP].title;
    document.getElementById('tabC').value=JSONobj.file.tracks[VID].loops[LOOP].tab;
    document.getElementById('descC').value=JSONobj.file.tracks[VID].loops[LOOP].desc;
    //document.getElementById('loopStart').value=LOOPstart = JSONobj.file.tracks[VID].loops[LOOP].start; //in seconds
    //document.getElementById('loopFinish').value=LOOPfinish = JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds
   // LOOPtab=JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds
   // LOOPtab=JSONobj.file.tracks[VID].loops[LOOP].tab; //in seconds
   // LOOPnote=JSONobj.file.tracks[VID].loops[LOOP].desc; //in seconds
   // MSGready=LOOPname+ " Ready...("+ LOOPstart + " --> " + LOOPfinish +" seconds.)"
    //changeMode('Paused');
}



//end of stolen=============================================================

function editorUpdate(){
document.getElementById('titleA').value=JSONobj.file.title;
document.getElementById('descA').innerHTML=JSONobj.file.desc;
    
document.getElementById('videos').selectedIndex = vid; //align selector
document.getElementById('titleB').innerHTML=JSONobj.file.tracks[vid].title;
document.getElementById('notesB').innerHTML=JSONobj.file.tracks[vid].notes;
document.getElementById('utidB').value=JSONobj.file.tracks[vid].utid;

document.getElementById('startC').value=JSONobj.file.tracks[VID].loops[LOOP].start;
document.getElementById('stopC').value=JSONobj.file.tracks[VID].loops[LOOP].stop;
document.getElementById('titleC').value=JSONobj.file.tracks[VID].loops[LOOP].title;
document.getElementById('tabC').value=JSONobj.file.tracks[VID].loops[LOOP].tab;
document.getElementById('descC').value=JSONobj.file.tracks[VID].loops[LOOP].desc;
}


function nice() {//fakes a JSON.parse of one of any json file but prints if its good or BAD!
    var space = ""
    var ARRcrap
    str = document.getElementById('demo').value
    //Part 1 hierarcy "--[---}---,"
    str = str.replace(/{/g, "\n{");
    str = str.replace(/}/g, "\n}\n");
    str = str.replace(/,/g, ",\n");
    str = str.replace(/\[/g, "\n[");
    str = str.replace(/]/g, "\n]\n");
    for (i = 1; i < 30; i++) {
        str = str.replace(/  /g, " ");
    }
    document.getElementById('demo').value = str
    for (i = 1; i < 5; i++) {
        str = str.replace(/\n\n/g, "\n");
        str = str.replace(/ \n/g, "");
        str = str.replace(/}\n,/g, "},");
        str = str.replace(/]\n,/g, "],");
    }
    document.getElementById('demo').value = str
//Part 2 indenting
    arrCrap = str.split('\n');
    for (i = 1; i < arrCrap.length; i++) {
        oldSpace = space
        if (arrCrap[i].charAt(0) == "{" || arrCrap[i].charAt(0) == "[" || arrCrap[i].charAt(arrCrap[i].length - 1) == "{" || arrCrap[i].charAt(arrCrap[i].length - 1) == "[") {
            space = space + "    "
            arrCrap[i] = oldSpace + arrCrap[i];
        } else if (arrCrap[i].charAt(0) == "}" || arrCrap[i].charAt(0) == "]") { //   ||  str.charAt(arrCrap[i].length-1)=="}"            || str.charAt(arrCrap[i].length-1)=="]")
            space = space.slice(0, -4);
            arrCrap[i] = space + arrCrap[i];
        } else arrCrap[i] = space + arrCrap[i];
    }
    str = arrCrap.join('\n');
    document.getElementById('demo').value = str
    statusMsg ("Faked a JSON.stringify but printed the errors....")
}

function convertOld() {
    var FILE;
    var NEW = '{\"file\":{\"title\":\"TITLE\",\"desc\":\"'
    var LOOP;
    var ARRvideos;
    var VIDcount;
    var ARRtracks;
    var TRACKcount
    var LOOPS
    var ARRloops;
    var ARRdetails
    var FILEnote;
    var commaD;
    var commaT
    var commaL
    var i;
    var j;
    var loopString;
    document.getElementById('demo').value = NEW;
    path='../Utool/'+ARRoldList[document.getElementById('selectX').value]
    ARRvideos = fileDownload(path).split('\n');
    FILEnote = ARRvideos[0]; //Get the FILEnote
    ARRvideos.splice(0, 1); //strip FILE NOTE FROM ARRAY
    VIDcount = ARRvideos.length;
    NEW = NEW + FILEnote + '\",\"tracks\":['
    for (i = 0; i < VIDcount; i++) {
        if (i <= parseInt(VIDcount - 2, 10)) {
            commaT = ',';
        } else {
            commaT = (' ');
        }
        ARRtracks = ARRvideos[i].split('#')
        NEW = NEW + '{\"utid\":\"' + ARRtracks[0] + '\",\"title\":\"' + ARRtracks[1] + '\",\"notes\":\"' + ARRtracks[2] + '",\"loops\":['
        LOOPS = ARRvideos[i].split(";");
        LOOPS.splice(0, 1); //strip track info
        //if (i == 0) {alert(LOOPS[0])};
        LOOPcount = LOOPS.length;
        for (j = 0; j < LOOPcount; j++) {
            if (j <= parseInt(LOOPcount - 2, 10)) {
                commaL = ',';
            } else {
                commaL = ('');
            }
            ARRdetails = LOOPS[j].split('#');
            DETAILcount = ARRdetails.length;
            for (k = 0; k < DETAILcount; k++) {
                if (k <= parseInt(DETAILcount - 2, 10)) {
                    commaD = ',';
                } else {
                    commaD = ('');
                }
            }
            NEW = NEW + '{\"title\":\"' + ARRdetails[2] + '\",\"start\":\"' + ARRdetails[0] + '\",\"stop\":\"' + ARRdetails[1] + '\",\"desc\":\"' + ARRdetails[3] + '\",\"tab\":\"' + ARRdetails[4] + '\"}' + commaL
        }
        NEW = NEW + ']}' + commaT
    }
    NEW = NEW + ']}}'
    document.getElementById('demo').value = NEW;
}


function original(){
    document.getElementById('demo').value=JSONdown
    document.getElementById('state').innerHTML='LAST GET'
    document.getElementById('demo').style.backgroundColor='white'
    document.getElementById('state').style.backgroundColor='white'
}

function beautify() {
    JSONobj=JSON.parse(document.getElementById('demo').value);
    document.getElementById('demo').value=JSON.stringify( JSONobj,null,4)
}

function beautifyString(str) {
    alert(JSON.stringify(str,null,3))
    dis('notePad','block');
    document.getElementById('pad').value=JSON.stringify(str,null,3)
}

function demoToPad(){
    document.getElementById('padHTML').innerHTML=document.getElementById('demo').value;
}

function JSONget(path) {//valid 5/1/2020@2:34PM
    statusMsg ('Downloading: '+path)
    var content = "Attemping to Download" + path;
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    content = request.responseText;
    if (content.search("404") > -1 | content.length < 1) {
        content = '404 Error' + content
    }
    JSONfile=JSONdown=content;
    JSONobj=JSON.parse(content)
    document.getElementById('state').innerHTML='Downloaded'
    document.getElementById('demo').style.backgroundColor='white'
    statusMsg("JSONfile=JSONdown=content; JSON File "+ path)
    document.getElementById('demo').value=content
    validate()
}


function logGet(){
    document.getElementById('demo').value=TEMP;
    JSONfile=document.getElementById('demo').value
    JSONdown=JSONfile;
    document.getElementById('state').innerHTML='LOCAL GET'
    document.getElementById('state').style.backgroundColor='white'
    document.getElementById('demo').style.backgroundColor='white'
    validate()
    JSONobj=JSON.parse(TEMP)
    statusMsg("LOCAL JSON FILE LOADED...")
}

function lastSave(){
    document.getElementById('demo').value=JSONfile;
    document.getElementById('state').innerHTML='LAST SAVE'
    document.getElementById('state').style.backgroundColor='yellow'
    document.getElementById('demo').style.backgroundColor='yellow'
    statusMsg("Restored last Update")
}

function edited(){
    document.getElementById('state').innerHTML='Edited'
    document.getElementById('state').style.backgroundColor='pink'
    document.getElementById('demo').style.backgroundColor='pink'
    statusMsg("Edited")
}

function update(){
    document.getElementById('state').innerHTML='Updated'
    JSONfile= document.getElementById('demo').value
    document.getElementById('state').style.backgroundColor='lightblue'
    document.getElementById('demo').style.backgroundColor='lightblue'
    statusMsg("JSONfile Updated -Remember to save")
}

function save(){
    document.getElementById('state').innerHTML='SAVED'
    document.getElementById('state').style.backgroundColor='lightgreen'
    document.getElementById('demo').style.backgroundColor='lightgreen'
    statusMsg("JSONfile saved")
}

function validate(){
    popUp("ERROR","INVALID JSON...There is an error in your file",undefined,'RED');
    JSONobj=null;
    JSONobj=JSON.parse(document.getElementById('demo').value);
    popUp("X","Valid JSON parse...Your file Looks Good",1,'green')    
}


//Use bracket notation to access the property values.
function good() {//valid 5/1/2020@3:48PM
    var file=JSONobj.file.title
    var x=0;
    var out='';
    for (x=0;x<3;x++){
        out=out+JSONobj.file.loops[x].name+ "<br>";
    }
    popUp(out,file);
}


function fillSelector() { //JSONselector(sel,str)
    var sel ='selectorA'
    var x, val, out;
    out = ""
    for (x in JSONobj.file.tracks) {
        val = JSONobj.file.tracks[x].des
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    document.getElementById('selectorA').innerHTML = out
}

function inWork(sel, str) { //JSONselector(sel,str)
    var x, val, out;
    out = ""
    for (x in JSONobj.file.tracks.loops) {
    val = JSONobj.file.tracks.loops[x].title
        alert(out)
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    document.getElementById('selectorA').innerHTML = out
}

//=============================================================
function fillForm( ){//form will be the second form
    popUp (JSON.parse(JSONobj))
    statusMsg('filling form')
    var x=0
    var txt
    statusMsg(JSONobj.file.loops[x].start)
    txt= "==========<br>";
    while (x<3) {
      txt=txt +JSONobj.file.loops[x].start+ "<br>";
      JSONobj.file.loops[x].start=300
      x=x+1
      statusMsg(txt)
    }
    popUp(txt)
    document.getElementById('demo').value=JSON.parse(JSONobj);
  }

function ZZZOldToJson(){
NEW="{\n\"file\":{\"title\":\"NEW TITLE\","//start
COLnote=ARRvideos[0];//.split(';').join('\n');//Get the FILE NOTE
ARRvideos=document.getElementById('demo').value.split('\n');
COLnote=ARRvideos[0];
ARRvideos.splice(0,1);//strip FILE NOTE FROM ARRAY
VID=0//start here
LOOP=0
NEW=NEW+"\n\"desc\":\""+COLnote+"\",\n\"tracks \":\n[\n\{\n\"utid\""
alert(NEW)
alert('GOOD\n'+ARRvideos[VID])//GOOD
ARRloops=ARRvideos[VID].split('#')
ARRloops.splice(0,1);//remove the link
alert(ARRloops[0])
alert(ARRvideos[1])
ARRloops=ARRvideos[VID].split('#')
NEW=NEW+ARRloops[0]+"\",\n\"title\":\""+ARRloops[1]+"\", \n\"notes\":\""+ARRloops[2]+"\", \n\"loops\":\":\n[\n\{\n\"title\","+ARRloops[5]+"\", \n\"start\","+ARRloops[3]+"\", \n\"finish\""
alert(NEW)
}

function ZZZreplacePoundSign(){
    var a;
    a=a.replace(/#/g,"#");
    document.getElementById('padHTML').innerHTML=a
    document.getElementById('demo').value=a    
}



