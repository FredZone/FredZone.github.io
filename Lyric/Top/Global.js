//Modified 4/29/20 11:06 CDT
//^GLOBAL VARIABLES DO NOT DELETE HERE====================== 
var ARRstatusLog="<pre><X2>=================DEBUG LOG=================</x2></pre>".split('@');//Status Log
var LOG=640;//length of Debug log Log
var TIMEOUTcrap  //throway for one time use
var MSGlast="No Message...";//Last Message
var MSG2="NO MESSAGE!";//Shows up if no msg
var MSGready="Welcome to the GLOBAL Template!(YADA)"
var STATUSmon=1;//sets the Debug mode, 0=off/1=log while hidden/2=log Real time
var TEMP="Initialized";//use it as required but close in the routine that opens it
var TEMPflag;//REQUIRED FOR fileGetLocal()
var TEMPlocalFileName="unknown"//REQUIRED FOR fileGetLocal()clear in parent routine
var TIMEOUTpop
var ARRstatusLog="START>>>".split('-');
var MSGcount=0;
var RAT;
dragElement(document.getElementById("statusWindow"));//required for each drag element

//^For TEMPO FUNCTION================================================???RELOCATE
var TEMPOtime;
var TEMPO;
var TEMPOcount;
var TEMPOtimeLast;
var TEMPOstart;//====================================================

//^COMMON BOOT --START And END OF BOOT
window.onload = function() {//put first two at the start of your code
    squish(1.0,0.5);
    document.getElementById("debugTrigger").focus();
    var agent=(navigator.userAgent.split(')').reverse()[0].match(/(?!Gecko|Version|[A-Za-z]+?Web[Kk]it)[A-Z][a-z]+/g)[0])
    ARRstatusLog=("================BOOTING in "+agent+"==================").split('-');
    statusMsg("PRESS ANY KEY or CLICK THE 'BUG' to monitor the boot...")
    TIMEOUTcrap = setTimeout(function() {
        statusMsg('Booting...')
        boot();
    }, 1500);
}


function finishBoot(){    // put at the end End Custom Boot routine
    document.getElementById('msg').style.top='0%';//move the msg to the top
    dis('debugButton','block'); //YADA after development change to none
    statusMsg(MSGready)
    dis('thinking','none')
    dis('splash','none');
}
//^END COMMON CODE & END BOOT========================================

function whodat() {//
    alert("GLOBAL.JS")
}

//^DRAG ELEMENT======================================================
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        //document.getElementById(elmnt.id + "header").ontouchstart =dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
        //elmnt.ontouchstart =dragMouseDown; 
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        //document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        //document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        //document.ontouchend = null;
        //document.ontouchmove = null;
    }
}

//^ STATUS MSG AND DEBUG MONITOR=====================================
function monitorBoot() { //initiated by the user at boot
    clearTimeout(TIMEOUTcrap);
    statusMonitor(2);
    dis('splash','none')
    statusMsg('Debug Mode; Initiated by User');
    boot();
}

function statusMsg(msg,bgcolor,marq){// COLOR SCHEME: light grey=normal;red=problem ;yellow-pause USER makes next move; green=Ready
    if(msg===null||msg==='' || msg===" ") {msg = "ERROR: No Status Message Passed";}
    if(STATUSmon>0) {
        if(ARRstatusLog.length>LOG){ARRstatusLog.pop()}
        if(bgcolor==0){ARRstatusLog.splice(0,0,stdTime("",true)+"       <X8>"+msg+"</X8>");}
        else{ARRstatusLog.splice(0,0,stdTime("",true) +"  <X1>"+msg+"</X1>");}}
    if(STATUSmon>1){    
        document.getElementById('bootText').innerHTML="<pre>"+ARRstatusLog.join('<br>')+"</pre>";}    
    if(bgcolor==0) {return}//0=LOG ONLY
    if(bgcolor==1) {alert("STATUS MSG\n"+msg);return}//alert instead of statu
    sm2(msg,bgcolor,marq);}    

function sm2(msg,bgcolor,marq){//post the message
    var clr="black";
    MSG2=MSGlast;
    if(msg===null){msg="*"+MSGlast;}
    else{MSGlast = msg;}
    if(document.getElementById('splash').style.display=="block") {bgcolor = "transparent"}
    else if(bgcolor == "black"|bgcolor == "red"|bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr = 'white';}
    else if(bgcolor == "yellow"|bgcolor == "transparent"){clr = 'green';}
    else if(bgcolor == "none"|bgcolor == "transparent"){clr = "transparent";}
    else{bgcolor = 'lightgrey';}//default
    if(marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";bgcolor='yellow'}
    document.getElementById("msg").style.color = clr;
    document.getElementById("msg").style.backgroundColor = bgcolor;
    document.getElementById("msg").innerHTML = msg;} 

function statusMonitor(m) { //set the statusMonitor function
    var line = ""
    if (m === 0) {
        line = "<X2>Debug Log Deactivated...</X2>";
        dis('statusWindow', 'none');
        dis('bug', 'none');
    }
    if (m === 1) {
        dis('statusWindow', 'none');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Hidden...</X2>";
    } else if (m === 2) {
        dis('statusWindow', 'block');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Displayed...</X2>";
    }
    STATUSmon = m;
    //statusMsg("Status Monitor set: "+m)
    statusMsg(line);
}

function monitorWindow() {
    dis('statusWindow');
    if (document.getElementById('statusWindow').style.display === 'block') {
        statusMonitor(2);
        document.getElementById('bootText').innerHTML = "<pre>" + ARRstatusLog.join('<br>') + "</pre>";
    } else {
        statusMonitor(1)
    }
}
function setMonitor() {
    if (STATUSmon === 0) {
        statusMonitor(2)
    } else {
        statusMonitor(0)
    }
}

//^MISC FUNCTIONS====================================================
function secToMin(sec){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//* XXX this sucks
    var m =parseInt((sec/60),10);
    var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
    if(s < 10) {s = ":0" + s;}else{s = ":" + s;}
    return m+s;} 

function hash(hashString, key, defaultVal) { //grey-normal;red-attention Required ;yellow-normal pause or inwork//* Gets hash values from string a:b,c:d,e:f,......
    var arrHash = (hashString.split(",")); //*  an array from hashString   
    var i = 0;
    while (i < arrHash.length) {
        var ele = (arrHash[i].split(":")); //* Hash4 an array of the first element of Hash3
        if (ele[0] == key) {
            defaultVal = ele[1];
            i = arrHash.length;
        } //* kick you out must be a better way
        i++;
    }
    return defaultVal;
}

function stdTime(androidTime,sec){//returns hh:mm:ss with AM or PM
    var s=0;
    var h=0;
    var m=0;
    var x ="AM";
    var st;
    if(androidTime===null|androidTime===undefined|androidTime===""|androidTime===" ") {
        var today = new Date();
        h=today.getHours();
        m=today.getMinutes();
        s=today.getSeconds();}
    else{
         return androidTime;}
    if(h>11) {x="PM";}
    if(h>12) {h=h-12;}
    if(m < 10) {m = "0" + m;}
    if(sec===true){//if you want seconds
        if(s < 10) {s = "0" + s;}
        m=m+":"+s;}
    st=(h + ":" + m+x);
    return st;}


//^FORM CONTROL======================================================
function dis(id, disp) {
    if (disp === undefined) {
        if (document.getElementById(id).style.display == 'none') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    } else {
        if (disp == 'none') {
            document.getElementById(id).style.display = 'none';
        } else {
            document.getElementById(id).style.display = 'block';
        }
    }
}

function vis(ID,style){
    if(style===undefined){
        if(document.getElementById(ID).style.visibility =='visible') {
            style='hidden';}
        else{
            style='visible';}}
    document.getElementById(ID).style.visibility =style;}
 
function popUp(txt, title, seconds, color) {
    clearTimeout(TIMEOUTpop);
    if (title == undefined) {
        title = 'POP UP NOTE!'
    }
    if (color == undefined) {
        color = 'lightgrey'
    }
    document.getElementById('popText').innerHTML = txt
    document.getElementById('popTitle').innerHTML = title
    document.getElementById('popText').style.backgroundColor = color;
    dis('popper', 'block')
    if (seconds == undefined|seconds==''|seconds==' ') {
        document.getElementById('popCloser').style.display = 'none'
    } else {
        TIMEOUTpop = setTimeout(function() {
            dis('popper', 'none');
        }, seconds * 1000);
    }
    
}

//*ENCODE FOR EXCHANGE===============================================
function encodeFredComponent(str){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//* encodes problem char (?,@)
    str=str.split("?");
    str=str.join("QMARK");
    str=str.split("@");
    str=str.join("AMARK");
    return str;}

function decodeFredComponent(str){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//* decodes problem char (?,@)
    str=str.split("QMARK");
    str=str.join("?");
    str=str.split("AMARK");
    str=str.join("@");
    return str;}
    

function createSetSelector() { //creates an option box for the file SetList.txt in the top directory
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
}

//^FILE HANDLERS=====================================================
/*fileGetLocal(process)
    //REQUIRED FOR FUNCTION TO WORK
        <form action=false><input type="file" id="fileInput" style="display:none;"/></form> THIS MUST BE IN HTML PAGE
        var TEMPflag  GLOBAL VARIABLE (THIS IS IN THIS FILE)
        var TEMP="?"  GLOBAL VARIABLE (THIS IS IN THIS FILE)
        document.getElementById('fileInput').addEventListener('change', readSingleFile, false);(THIS IS IN THIS FILE)
    INFO
        loads the text file as TEMP then processes TEMP using the function 'process'  i.e eval(process +'(TEMP)')
        CLEARS TEMPflag ASAP after use...DANGEROUS
        note 'nested' readSingleFile(e)*/

document.getElementById('fileInput').addEventListener('change', readSingleFile, false);

function XXXXX() {//use this function as 'process' to test your code: fileGetLocal('XXXXX')
    alert(TEMP);
}

function fileGetLocal(code) {
    //process is the name of the process to evaluate the text,
    //The file itself will be TEMP  example for TEMPflag="FILExyz=TEMP" etc
    TEMPflag = code;
    statusMsg('Getting User Selected Local file...')
    document.getElementById('fileInput').click();
}

function readSingleFile(e) {

    statusMsg("Reading Local file...");
    TEMP = undefined; //clear old TEMP
    var file = e.target.files[0];
    if (!file) {
        TEMPflag = undefined;
        statusMsg("Failed to get Local File...", 'red');
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        TEMP = e.target.result;
        statusMsg("Local File Retrieved...");
        eval(TEMPflag);  //EVAL is EVIL, find something else
        TEMPflag = undefined;
        statusMsg("Local File Processed...");
    }; 
    reader.readAsText(file);
}

function fileDownload(path) {
    statusMsg ('Downloading: '+path)
    var content = "Attemping to Download" + path;
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    content = request.responseText;
    if (content.search("404") > -1 | content.length < 1) {
        content = '404 Error' + content
    }
    return content; //could be undfined or null, not tested for
}

function fileSaveTextAs(fileName, textToWrite) {
    var textFileAsBlob = new Blob([textToWrite], {
        type: 'text/plain'
    });
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL; // allowcode to work in webkit & Gecko based browsers// without the need for a if / else block.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement; // when link is clicked call a function to remove it from// the DOM in case user wants to save a second file.
    downloadLink.style.display = "block";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    statusMsg('Please Verify that ' + fileName + ' was created');
}

function destroyClickedElement(event) { // remove the link from the DOM
    document.body.removeChild(event.target);
}


//^MISC HTML WRITERS=================================================
function selectorBuild(id, arr, sel) { 
  if (sel === undefined | sel === null | sel === '') {
    sel = 0;
  }
  var i = 0;
  var str = '';
  while (i < arr.length) {
    str = str + "<option value=" + i + ">" + arr[i] + "</option>";
    i = i + 1;
  }
  document.getElementById(id).innerHTML = str;
  document.getElementById(id).selectedIndex = sel;
}

//^ARRAY Functions===================================================
function moveArrElement(arr, from, to) { //test 1 to 3
  if (to == from) {
    return;
  }
  var ele = (window[arr])[from];
  if (from < to) {
    window[arr].splice(to, 0, ele); //put from in to //window[arr].splice(window[arr].length,0,ele);//put from in to
    window[arr].splice(from, 1);
  } //remove the orriginal
  else {
    window[arr].splice(to, 0, ele); //put it
    window[arr].splice(from + 1, 1);
  }
}

function receiveARR(divider,keepName) {//decode array (or string) and leading elements (put in receiving Array)
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
        
//^SCREEN CONTROLS===================================================
function launchIntoFullscreen(element){
       if(element.requestFullscreen) {element.requestFullscreen();}
       else if(element.mozRequestFullScreen) {element.mozRequestFullScreen();}
       else if(element.webkitRequestFullscreen) {element.webkitRequestFullscreen();}
       else if(element.msRequestFullscreen) {element.msRequestFullscreen();}}

function exitFullscreen(){
      if(document.exitFullscreen) {document.exitFullscreen();}
      else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();}
      else if(document.webkitExitFullscreen) {document.webkitExitFullscreen();}
      else if(element.msCancelFullscreen) {document.msCancelFullscreen();}}//this step is BOGUS
      
function squish(tall,wide) {
    RAT = parseFloat(window.innerHeight / window.innerWidth);
    var pct
    if (RAT > tall) {
        pct=parseInt((window.innerWidth/window.innerHeight)*100)+"%";
        statusMsg("Adjusting to Tall Screen "+RAT,'red');
        document.getElementById('field').style.fontsize="2vh";
        document.getElementById('field').style.height=pct;
        document.getElementById('field').style.width="100%";
    } else if(RAT < wide){
        pct=parseInt(RAT*100/wide)+"%";
        statusMsg("Adjusting to wide Screen "+RAT,'red')
        document.getElementById('field').style.fontsize="0.25vw"
        document.getElementById('field').style.height="100%"
        document.getElementById('field').style.width=pct
    }else{
        statusMsg("Normal screen "+RAT,'green')
        document.getElementById('field').style.fontsize="2vh"
        document.getElementById('field').style.width="100%"
        document.getElementById('field').style.height="100%"
        statusMsg('READY...', 'yellow')
    }
}
//^STRING FUNCTIONS==================================================
function breakStrAtCaps(str){return(str.match(/[A-Z]*[^A-Z]+/g));} //returns array of words split by in string split with Caps  ZAP 07 possible obsolete

function leftTo(str,find,incFind,keepLeft){//comes from the left of a string to a'find' string 
    var n = str.indexOf(find);    
    if (incFind===true){n=n+find.length;} //include find?
    if (keepLeft===true){str = str.substring(0, n);}//keep left or right
    else{str = str.split(find).pop();}
    return str;}

function lTrim(str){//trims leading spaces
    var bog = str;
    while (bog.substring(0,1)==" "){bog = bog.substring(1,bog.length);}
    return bog;}

function rTrim(str){//trims following spaces
    var bog = str;
    while (bog.substring(bog.length-1)==" "){bog = bog.substring(0,bog.length-1);}
    return bog;}
    
function fileGetExtension(filename){return filename.split('.').pop();}//returns extension

//^SCREEN SIZING=====================================================OBSOLETE???
function rat(){
    //WINDht, WINDwt RAT must all be definded in parent js
    //use the RAT on boot and resize elements for different ratios of length to width 
    WINDht = window.innerHeight;
    WINDwt = window.innerWidth;
    RAT =parseFloat(WINDht/WINDwt);
    if (RAT>=0.8) {
        document.getElementById('main').style.height="50%";
        //code
    }
    alert(RAT)}

function autoSize(id,fVh,bottom,ht,wt){//* id//* fontsize(vh)//* text Bottom//* ht//*  % done at  1/1 screen RAT
    alert("This function 'autoSize' is considered obsolete\n 4/26/2020")
    if(fVh!==undefined){fVh = parseFloat(fVh/RAT)+'vh';document.getElementById(id).style.fontSize=fVh ;}
    if (bottom!==undefined){bottom =parseInt(bottom/RAT,10)+'%';document.getElementById(id).style.bottom=bottom ;}
    if (ht!==undefined){ht =parseInt(ht/RAT,10)+'%';document.getElementById(id).style.height=ht;}
    if (wt!==undefined){wt =parseInt(wt*RAT,10)+'%';document.getElementById(id).style.width=wt;}}
    
//^TEMPO Getter======================================================??RELOCATE???
function getTempo() { //simple tempo program for getting tempo manually
  var d = new Date();
  TEMPOtime = d.getTime();
  if (TEMPOtime - TEMPOtimeLast > 2000) { //reset if over 2 sec
    TEMPO = 1000;
    TEMPOcount = 0;
    TEMPOtimeLast = TEMPOtime;
    TEMPOstart = TEMPOtime;
    document.getElementById('tempoGetter').innerHTML = 'TEMPO<br>TOOL';
  } else {
    TEMPOtime = d.getTime();
    TEMPOcount = TEMPOcount + 1;
    var t = (TEMPOtime - TEMPOstart) / 60000;
    TEMPO = parseInt(TEMPOcount / t, 10);
    document.getElementById('tempoGetter').innerHTML = TEMPO + " bpm<br>In " + parseInt(t * 60, 10) + " sec."; //}
    TEMPOtimeLast = TEMPOtime;
  }
}

//^LYRIC FUNCTIONS===================================================??RELOCATE????
function lineType(str){//used in my text files for music
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
//05/19/2020@6:58PM added thinking icon to be used when program is taking longer time for downloads etc