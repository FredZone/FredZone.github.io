//*GLOBAL FUNCTIONS
var TIMEOUTcrap


//BOOT================================================================================
window.onload = function() {
   //window.addEventListener("beforeunload", function(event) { alert("UNLOAD")}); //USELESS because it does not work
    var agent=(navigator.userAgent.split(')').reverse()[0].match(/(?!Gecko|Version|[A-Za-z]+?Web[Kk]it)[A-Z][a-z]+/g)[0])
    ARRstatusLog=("================BOOTING in "+agent+"==================").split('-');
    statusMsg("PRESS ANY KEY or CLICK THE 'BUG' to monitor the boot...")
    document.getElementById("debugTrigger").focus();
    TIMEOUTcrap = setTimeout(function() {
        start();
    }, 1500);
}

function start(){
    statusMsg ('Put your BOOT CODE here')
    boot();
}

//bogus This is your function ends with the last section==================================================
function boot(){//this is supplanted by your function
    dis('splash','none');
    document.getElementById('msg').style.top='0%';
    statusMsg ('MAKE YOUR OWN boot() function')
}

//*Drag element=========================================================================

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

// statusMsg and Monitor============================================================================================================
var MSGlast="No Message...";
var MSG2="NO MESSAGE!";
var LOG=640;//length of Log
var ARRstatusLog="<pre><X2>=================DEBUG LOG=================</x2></pre>".split('@');
var STATUSmon=1;//sets the Debug mode, 0=off/1=log while hidden/2=log Real time
dragElement(document.getElementById("statusWindow"));


function monitorBoot() { //initiated by the user at boot
    clearTimeout(TIMEOUTcrap);
    statusMonitor(2);
    statusMsg('Debug Mode; Initiated by User');
    start();
}

function statusMsg(msg,bgcolor,marq){// COLOR SCHEME: light grey=normal;red=problem ;yellow-pause or inwork; green=Ready
    if(msg===null||msg==='' || msg===" ") {msg = "ERROR: No Status Message Passed";}
    if(STATUSmon>0) {
        if(ARRstatusLog.length>LOG){ARRstatusLog.pop()}
        if(bgcolor==0){ARRstatusLog.splice(0,0,stdTime("",true)+"       <X8>"+msg+"</X8>");}
        else{ARRstatusLog.splice(0,0,stdTime("",true) +"  <X1>"+msg+"</X1>");}}
    if(STATUSmon>1){    
        document.getElementById('bootText').innerHTML="<pre>"+ARRstatusLog.join('<br>')+"</pre>";}    
    if(bgcolor==0) {return}
    if(bgcolor==1) {alert("STATUS MSG\n"+msg);return}
    sm2(msg,bgcolor,marq);}    

function sm2(msg,bgcolor,marq){
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
        line = "<X2>Debug Log Deactivated==================</X2>";
        dis('statusWindow', 'none');
        dis('bug', 'none');
    }
    if (m === 1) {
        dis('statusWindow', 'none');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Hidden============</X2>";
    } else if (m === 2) {
        dis('statusWindow', 'block');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Displayed=========</X2>";
    }
    STATUSmon = m;
    statusMsg("Status Monitor set: "+m)
    statusMsg(line, 0);
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

//MISC FUNCTIONS

function secToMin(sec){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ XXX this sucks
    var m =parseInt((sec/60),10);
    var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
    if(s < 10) {s = ":0" + s;}else{s = ":" + s;}
    return m+s;} 

function hash(hashString,key,defaultVal){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ Gets hash values from string a:b,c:d,e:f,......
    var arrHash = (hashString.split(",")); //^  an array from hashString   
    var i=0;
    while (i < arrHash.length){
        var ele=(arrHash[i].split(":"));//^ Hash4 an array of the first element of Hash3
        if(ele[0] == key){
            defaultVal = ele[1];
            i = arrHash.length;} //^ kick you out must be a better way
        i++;}
    return defaultVal;}

function dis(id,disp){
    if(disp===undefined){
            if(document.getElementById(id).style.display == 'none'){
                document.getElementById(id).style.display='block';}
            else{document.getElementById(id).style.display='none';}}
        else{
            if(disp=='none') {
                document.getElementById(id).style.display = 'none';}
            else{document.getElementById(id).style.display = 'block' ;}}}

function vis(ID,style){
    if(style===undefined){
        if(document.getElementById(ID).style.visibility =='visible') {
            style='hidden';}
        else{
            style='visible';}}
    document.getElementById(ID).style.visibility =style;}
    
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

function encodeFredComponent(str){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ encodes problem char (?,@)
    str=str.split("?");
    str=str.join("QMARK");
    str=str.split("@");
    str=str.join("AMARK");
    return str;}

function decodeFredComponent(str){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ decodes problem char (?,@)
    str=str.split("QMARK");
    str=str.join("?");
    str=str.split("AMARK");
    str=str.join("@");
    return str;}
    
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

//*DEVELOPER FUNCTIONS ===================================================================
