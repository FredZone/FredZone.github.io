//^RESERVED VARIABLES FOR GLOBAL ROUTINES KEEP THESE
var NONE;  //used for dis function
var MSGlast="???"; //last message
var TEMPflag;//REQUIRED FOR fileGetLocal()
var TEMPlocalFileName="unknown"//REQUIRED FOR fileGetLocal()clear in parent routine
var TEMP="Initialized";//use it as required but close in the routine that opens it
//for StatusMsg
var LOG=true;//if you want to log status messages set to true
var ARRstatusLog="START>>>".split('-');
var MSGcount=0;
//???dont remember why I have these
var POPUP;
POPUPon=false;
//Window ht and wt used in some sizing routines
var WINDht;//* view window height
var WINDwt;

/*^REQUIRED IN HTML PAGE!!!!===================================================================
    <form action=false><input type="file" id="fileInput" style="display:none;"/></form>
    <div id="msg">Loading HTML...</div> //set style as desired
    <a id="none" style=" display:none; visibility:hidden"></a>
*/

//^BOOT ================================================================
statusMsg("Loading Global Routines...");


//^FILE FUNCTIONS================================================================
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

document.getElementById('fileInput').addEventListener('change', readSingleFile, false);//must be here!

function XXXXX(){alert(TEMP);}//use this function as 'process' to test your code: fileGetLocal('XXXXX')

function fileGetLocal(process){TEMPflag=process;document.getElementById('fileInput').click();}
//process is the name of the process to evaluate the text

function readSingleFile(e){
    statusMsg("Reading file...");
    TEMP=undefined;//clear old TEMP
    var file = e.target.files[0];
    TEMPlocalFileName=e.target.files[0].name;
    if (!file){
        TEMPflag=undefined;
        statusMsg("Failed to get Local File...",'red');}
    var reader = new FileReader();
    reader.onload = function(e){
        TEMP = e.target.result;
        statusMsg("File Retrieved...");
        var str=TEMPflag+"(TEMP)";
        TEMPflag=undefined;
        eval(str);};//EVAL is EVIL, find something else
    reader.readAsText(file);}

/*
fetch('http://localhost/foo.txt')
  .then(response => response.text())
  .then((data) => {
    console.log(data)
  })
*/
function fileDownloadX(path){
    statusMsg('Downloading: '+ path);
    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
        console.log(xhr.responseText);}
    xhr.open("GET",path);
    xhr.send();
    if (xhr===undefined |xhr.search("404")>-1){
        xhr=undefined;
        statusMsg("Download Failed...",'red');}
    else {(statusMsg ('File Downloaded...'));}
    return xhr;}

function fileDownload(path){
    statusMsg('Downloading: '+ path);
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    if (content===undefined |content.search("404")>-1){
        content=undefined;
        statusMsg("Download Failed...",'red');}
    else {(statusMsg ('File Downloaded...'));}
    return content;
    }

function fileDownload3(path,process) {
  statusMsg('Sync Loading :'+path);
  console.log(path);
  var myRequest = new Request(path);
  fetch(myRequest).then(function(response) {
    return response.text()
    .then(function(text) {   //.then(function(text) {
      //alert(text);
      eval(process);
    })
    .catch(function() {
     //alert('CRASH');
      statusMsg('Crash Downloading: ('+path+')');
    });});}


function fileDownload4(path,process) {
    statusMsg('Sync Loading :'+path);
    console.log(path);
    var myRequest = new Request(path);
    fetch(myRequest)
        .then(function(response){
            return response.text()
                .then(function(text){
                    eval(process);})
        .catch(function(){
            if (response.length<2) {statusMsg('Crashed Downloading: ('+path+')')}
            else(statusMsg('Crashed Evaluating: ('+path+')'));});});}





function fileDownload2(path){
    statusMsg('Downloading: '+ path);
    var content="crap"
    fetch(path) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.text()) // Transform the data into text
    .then(function(data){
        alert(data);
        //content=data;
        //alert(content)
        return data;
        })


    .catch(function(error) {
        alert(error)
    // This is where you run code if the server returns any errors
    });
    }



function fileSaveTextAs(fileName,textToWrite){   
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;// allowcode to work in webkit & Gecko based browsers// without the need for a if / else block.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;// when link is clicked call a function to remove it from// the DOM in case user wants to save a second file.
    downloadLink.style.display = "block";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    statusMsg('Please Verify that '+fileName+ ' was created');}

function destroyClickedElement(event){   
    document.body.removeChild(event.target);}
// remove the link from the DOM

//^DISPLAY ROUTINES===============================================================================================================
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

function vis(id,style){
    if (style===undefined){
        if (document.getElementById(id).style.visibility =='visible') {
            style='hidden';}
        else{
            style='visible';}
        }
    document.getElementById(id).style.visibility =style;}

function dis(id,disp){
//toggles display by id or sets it to 'style' block or none (requires this line in the html page)
//requires variable: var NONE;
//requires this line in the window.onload: NONE =document.getElementById('none').style.display;
//requires this line in the html file: <a id="none" style=" display:none; visibility:hidden"></a>    
    if (disp===undefined){
        if (document.getElementById(id).style.display == NONE){
            document.getElementById(id).style.display='block';}
        else{document.getElementById(id).style.display=NONE;}}
    else{
        if (disp=='none'){
            document.getElementById(id).style.display = NONE;}
        else{
            document.getElementById(id).style.display = 'block' ;}}}

function rat(){
    //WINDht, WINDwt RAT must all be definded in parent js
    //use the RAT on boot and resize elements for different ratios of length to width 
    WINDht = window.innerHeight;
    WINDwt = window.innerWidth;
    RAT =parseFloat(WINDht/WINDwt);}

function autoSize(id,fVh,bottom,ht,wt){//* id//* fontsize(vh)//* text Bottom//* ht//*  % done at  1/1 screen RAT
    if(fVh!==undefined){fVh = parseFloat(fVh/RAT)+'vh';document.getElementById(id).style.fontSize=fVh ;}
    if (bottom!==undefined){bottom =parseInt(bottom/RAT,10)+'%';document.getElementById(id).style.bottom=bottom ;}
    if (ht!==undefined){ht =parseInt(ht/RAT,10)+'%';document.getElementById(id).style.height=ht;}
    if (wt!==undefined){wt =parseInt(wt*RAT,10)+'%';document.getElementById(id).style.width=wt;}}

//^NAVIGATION ROUTINES====================================================================================
function home(){window.open("index.html");}

//^STRING FUNCTIONS====================================================================================
function breakStrAtCaps(str){return(str.match(/[A-Z]*[^A-Z]+/g));} //returns array of words split by in string split with Caps

function leftTo(str,find,incFind,keepLeft){//comes from the left of a string to a'find' string 
    var n = str.indexOf(find);    
    if (incFind===true){n=n+find.length;} //include find?
    if (keepLeft===true){str = str.substring(0, n);}//keep left or right
    else{str = str.split(find).pop();}
    return str;}

function lTrim(str){
    var bog = str;
    while (bog.substring(0,1)==" "){bog = bog.substring(1,bog.length);}
    return bog;}

function rTrim(str){
    var bog = str;
    while (bog.substring(bog.length-1)==" "){bog = bog.substring(0,bog.length-1);}
    return bog;}
    
function fileGetExtension(filename){return filename.split('.').pop();}
    
function secToMin(sec){//XXX this sucks
    var m =parseInt((sec/60),10);
    var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
    if (s < 10) {s = ":0" + s;}else{s = ":" + s;}
    return m+s;}

//^UTUBE FUNCTIONS========================================================================================
function uTubeGetId(str){//if other charcters show up add them here...
    str=(leftTo(str,"v=",true,false));
    if(str.includes("#")===true){str=leftTo(str,"#",false,true);}
    if(str.includes("=")===true){str=leftTo(str,"=",false,true);}
    if(str.includes("&")===true){str=leftTo(str,"&",false,true);}
    statusMsg("YouTube ID: "+ str);
    return str;}

//^MISC ROUTINES==============================================================================
function statusMsgXXX(msg,bgcolor,marq){//* xxx could trim to 40 chr
    // COLOR SCHEME: light grey=normal;red=problem ;yellow-pause or inwork; green=Ready
    if(msg===null){msg=MSGlast;}
    MSGlast = msg;
    var clr;
    if( document.getElementById("msg").style.top !="0%"){bgcolor = 'Transparent';clr='red';}//for splash screen
    else if (bgcolor === undefined){bgcolor = 'lightgrey';}//default
    document.getElementById("msg").style.backgroundColor = bgcolor;
    if (bgcolor == "black"|bgcolor == "red"){clr = 'white';}
    else if (bgcolor == "yellow"){clr = 'red';}
    else if (bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr='white';}
    else{clr='black';}
    document.getElementById("msg").style.color = clr;
    if (marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";}
    document.getElementById("msg").innerHTML = msg;}
    
function echo(ech){alert("ECHO:\n"+ech);}   //just test if this program is woring using i.e. echo('shit')
    
function statusMsg(msg,bgcolor,marq) { 
  // COLOR SCHEME: light grey=normal;red=problem ;yellow-pause or inwork; green=Ready
  if(LOG===true & bgcolor===true){
    ARRstatusLog.splice(0,0,">>>>:"+msg);
    return;}
  ARRstatusLog.splice(0,0,MSGcount+":  "+msg);
  ARRstatusLog.splice(30,1);
  if(msg===null){msg=MSGlast;}
  MSGlast = msg;
  var clr;
  if( document.getElementById("msg").style.top !="0%"){bgcolor = 'Transparent';clr='red';}//for splash screen
  else if (bgcolor === undefined){bgcolor = 'lightgrey';}//default
  document.getElementById("msg").style.backgroundColor = bgcolor;
  if (bgcolor == "black"|bgcolor == "red"){clr = 'white';}
  else if (bgcolor == "yellow"){clr = 'red';}
  else if (bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr='white';}
  else{clr='black';}
  document.getElementById("msg").style.color = clr;
  if (marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";}
  document.getElementById("msg").innerHTML = msg;
  MSGcount=MSGcount+1;}     
    

function  passARR(pageName,arr,divider,leadingElements,winSpecs){
    //alert(POPUP);
    if (POPUP!==undefined) {POPUP.close();}//close exiting POPUP
    //take data, array or string and pass to another page
    //if its an array it you must use a divider (i.e. '\n')
    winSpecs="toolbar=no,status=no,titlebar=no,scrollbars=no,menubar=no,location=no;resizable=yes,top=10,left=10,width=700,height='350";
    var pf;
    if(Array.isArray(arr)===true){pf=arr.join(divider);}else{pf=arr;}
    if (leadingElements!==null&leadingElements!==undefined){pf=leadingElements+divider+pf;}
    //if (leadingElements.length>0){pf=leadingElements+divider+pf;}
    //alert("Pass: "+ pf);
    // window.open(pageName,encodeURI(encodeFredComponent(pf)));}
    POPUP=window.open(pageName,encodeURI(encodeFredComponent(pf)),winSpecs);}


function receiveARR(divider,keepName){//decode array (or string) and leading elements (put in receiving page)
    //alert("Recieve:"+window.name);
    var oldName=window.name;
    var data;
    if (divider===undefined)//recieve a string
        {data=decodeURIComponent(decodeFredComponent(window.name));}
    else//receive an array
        {data=decodeURIComponent(decodeFredComponent(window.name)).split(divider);}
    if(keepName===true|keepName===undefined|keepName===''){window.name=oldName;}
    return  data;}

function decodeFredComponent(str){//decodes problem char (?,@)
    str=str.split("QMARK");
    str=str.join("?");
    str=str.split("AMARK");
    str=str.join("@");        
    return str;}

function encodeFredComponent(str){//encodes problem char (?)
    str=str.split("?");
    str=str.join("QMARK");
    str=str.split("@");
    str=str.join("AMARK");
    return str;}

//dragElement============================================================
  
dragElement(document.getElementById(("tabBar")));//apparentlty you must initiateThis
  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(elmnt.id + "Mover").onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      }
    function elementDrag(e) {
      e = e || window.event;
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
      }
  }