/*^PROBLEMS
must KILL looping when switching tracks
Put a developers version of //statusMsg
The Title file line is duplicated if it is updated
The title of loops needs to update when you add a loop
*/
/*^Notes to SELF========================================================
Set default do a global replacement of the UTID in the HTML and Javacript file 2 places
Put the number of the Collection in var COL=?
*/
//^VARIABLES============================================================
//universal Variables//should be in the Gloabal
var NONE;
//REQUIRED TO LOG Status Mssages,See Developer Section
var LOG=false;
var ARRstatusLog="START>>>".split('-');
var MSGcount=0;
//ARRAYS
var ARRbacktracks;
var ARRtrack="FUIrivkXiHg|C|100|10|25|Default Track".split('|');//BACKTRACKid,BACKTRACKkey,BACKTRACKtempo,BACKTRACKstart,BACKTRACKstop,BACKTRACKNotes
//var DEFAULT=true;
var DEFAULTarr='';
var BACKTRACKpath;
//TITLE,UTID,KEY,Class,Tempo,start,stop,Notes,notes
var BACKTRACKtitle="Default Track";
var BACKTRACKid='FUIrivkXiHg';
var BACKTRACKkey='?';
var BACKTRACKclass="-";
var BACKTRACKtempo='';
var BACKTRACKstart=5;
var BACKTRACKstop=20;
var BACKTRACKnotes='No Notes';
//var BACKTRACKdefault="xxx";
var player2;//backtrack player
var TEMPOpct='%';
var TEMPO=0;
var TEMPOstart=0;
var TEMPOcount=0;
var TEMPOtime=0;
var TEMPOtimeLast=0;
var TIMEOUTbtMon;
var UTback;
var POPup;

//^CORE YOU TUBE API====================================================DONT MESS WITH THIS
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.called by api

//load any APIs Asynchronus
function onYouTubeIframeAPIReady() {
  player2 = new YT.Player('player2',{
    events:{
      'onReady': btReady}
      });}

function myBrowser(){//retruns your browser name
  var brws="Unknown";
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) { brws='Opera';}
  else if(navigator.userAgent.indexOf("Chrome") != -1 ){brws='Chrome';}
  else if(navigator.userAgent.indexOf("Safari") != -1){brws='Safari';}
  else if(navigator.userAgent.indexOf("Firefox") != -1 ){brws='Firefox';}
  else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (document.documentMode === true )){brws='IE';}
  return(brws);}

function winOpen(){//simply opens a window for only chrome bowser
  //var browse='Chrome';
  //browse=myBrowser();
  //if(browse!='Chrome'){alert("SORRY...\nChrome is the ONLY browser that has a 'pitch' add-on\nYour browser is "+browse+"...");}
  window.open("https://www.youtube.com/watch?v="+BACKTRACKid,'Your Utube Selection');}

 
function getTempo(){//simple tempo program for getting tempo manually
  var d = new Date();
  TEMPOtime=d.getTime();
  if (TEMPOtime -TEMPOtimeLast>2000) {//reset if over 2 sec
    TEMPO=1000; TEMPOcount=0;
    TEMPOtimeLast=TEMPOtime;
    TEMPOstart= TEMPOtime;
    document.getElementById('tempoGetter').innerHTML='TEMPO<br>TOOL';}
  else{  
    TEMPOtime=d.getTime();
    TEMPOcount=TEMPOcount+1;
    var t=(TEMPOtime-TEMPOstart)/60000;
    TEMPO=parseInt(TEMPOcount/t,10);
    document.getElementById('tempoGetter').innerHTML=TEMPO+" bpm<br>In " +parseInt(t*60,10)+" sec.";//}
    TEMPOtimeLast=TEMPOtime;} }

//^BOOT ================================================================
window.onload = function(){//sets defaults and get default BACKTRACKdefault
  statusMsg("Loading javascript...");
  NONE =document.getElementById('none').style.display;//*  create object
  document.getElementById("msg").style.top='0%';
  if(navigator.onLine) {ONLINE=true;}else{statusMsg("OFF LINE",'red');ONLINE=false;}
  MSGlast="...";
  TEMP=receiveARR('|','BACKING');
  DEFAULTarr='';
  if (window.name===''|window.name===" "|TEMP ===""|TEMP===undefined|TEMP==='Initilized'|TEMP===null){
    //no id passed, take the default
    //TITLE,UTID,KEY,Class,Tempo,start,stop,Notes,notes
    TEMP=DEFAULTarr='Default,FUIrivkXiHg,Key?,Default,,,,No Notes'.split(',');
    btGetList('Default');}
  else{
    //id passed make this the default; convert 4 element TEMP to 8 element TEMP
    TEMP=DEFAULTarr=("Video Passed from U-TOOL,"+TEMP[0]+",Key?,Class?,"+TEMP[1]+","+TEMP[2]+","+TEMP[3]+",No Notes Passed").split(',');
    btGetList('Default');}};

function btGetList(path){//get the backtrack List
  dis('btPlaying','none');
  dis('btLooping','none');
  if (path=='Default'){
    TEMP=DEFAULTarr;
    document.getElementById('btIndex').style.display='none';
    document.getElementById('btLists').selectedIndex=0;
    //BACKTRACKtitle='DEFAULT Track';
    btGet();}
  else{
    document.getElementById('btIndex').style.display='block';
    ARRbacktracks=fileDownload('../Utool/btLists/'+path+'.csv').split('\n');
    ARRbacktracks.splice(0,1);//Remove Title line
    var arr="".split(".");
    var arr2="".split(".");
    for(j=0;j<ARRbacktracks.length;j++){
      arr2=ARRbacktracks[j].split(',');
      arr.splice(j,0,arr2[0]+" ("+arr2[2]+" @ "+arr2[4]+" bpm)" );}
    selectorBuild('btIndex',arr,0);
    document.getElementById('player2').src= "XXX";//kill current player
    document.getElementById('btIndex').selectedIndex=0;//select 0
    optionalBt(0);}}
    
function optionalBt(A){
  statusMsg('User Requested Track.',LOG);
  TEMP=ARRbacktracks[A].split(',');
  btGet();}

function btGet(){//7 value TEMP must be set....
  //Use TEMP
  BACKTRACKtitle=TEMP[0]+' ('+TEMP[3]+')';
  BACKTRACKid=TEMP[1];
  BACKTRACKkey=TEMP[2];
  BACKTRACKclass=TEMP[3];
  BACKTRACKtempo=TEMP[4];
  BACKTRACKstart=TEMP[5];
  BACKTRACKstop=TEMP[6];
  BACKTRACKnotes=TEMP[7];
  statusMsg('Loading...'+BACKTRACKtitle+': '+BACKTRACKid);
  if (BACKTRACKnotes===undefined) {BACKTRACKnotes="NO BACKTRACK NOTES...";}
  //if (isNaN(BACKTRACKtempo)) {BACKTRACKtempo='';}
  if (isNaN(BACKTRACKstart)) {BACKTRACKstart='0';}
  vis('notes','hidden');
  document.getElementById('notes').innerHTML=BACKTRACKnotes;
  TEMPOpct=' bpm';
  if (isNaN(BACKTRACKtempo)===true|(BACKTRACKtempo)===''|(BACKTRACKtempo)===null){BACKTRACKtempo=100;TEMPOpct='%';}
  BACKTRACKpath= "https://www.youtube.com/embed/"+BACKTRACKid+"?autoplay=0&enablejsapi=1&rel=0";
  document.getElementById('btLoop').innerHTML="...";
  document.getElementById('player2').src= "../../icons/blackTools.png";
  document.getElementById('player2').src= BACKTRACKpath;
  document.getElementById('btTempo').innerHTML=BACKTRACKtempo+TEMPOpct;
  document.getElementById("pm0").checked=true;
  document.getElementById('tempoGetter').innerHTML='TEMPO<br>TOOL';}
  if (isNaN(BACKTRACKstop)) {BACKTRACKstop=player2.duration;}   
//^BACKTRACK=======================================================================

function btPlay() {
  clearTimeout(TIMEOUTbtMon);
  player2.playVideo();
  dis('btPlaying','block');
  dis('btLooping','none');
  statusMsg('Playing...');}
  
function btStop() {
  clearTimeout(TIMEOUTbtMon);
  player2.pauseVideo();
  dis('btPlaying','none');
  dis('btLooping','none');
  statusMsg('Stopped.');}
  
function btMonitor() {
  TIMEOUTbtMon=setTimeout(function(){
    clearTimeout(TIMEOUTbtMon);
    if (player2.getCurrentTime()>BACKTRACKstop){
      btStartLoop();
      return;}
    else{
      document.getElementById('btLoop').innerHTML=BACKTRACKstop-parseInt(player2.getCurrentTime(),10)+" sec";//parseIn(parseInt(BACKTRACKstop,10)-,10),10)+"sec";
      btMonitor();}
    },1000) ;}

function btPlayLoop() {
  clearTimeout(TIMEOUTbtMon);
  player2.playVideo();
  btMonitor();
  dis('btLooping','block');
  dis('btPlaying','none');
  statusMsg('Looping...');}

function setBT(typ){
  var s =parseInt(player2.getCurrentTime(),10);
  if (typ=='start') {BACKTRACKstart=s;document.getElementById('btGo').innerHTML=s;}
  else{BACKTRACKstop=s;document.getElementById('btEnd').innerHTML=s;}}

function btReady(){
  dis('btLooping','none');
  dis('btPlaying','none');
  player2.pauseVideo();
  var dur= parseInt(player2.getDuration(),10);
  clearTimeout(TIMEOUTbtMon);
  if (isNaN(BACKTRACKstart)===true|BACKTRACKstart<=0){
    BACKTRACKstart=parseInt(0,10);}
  if(isNaN(BACKTRACKstop)===true|BACKTRACKstop<=0|BACKTRACKstop>dur){
    BACKTRACKstop=dur-2;}
  document.getElementById('btGo').innerHTML=BACKTRACKstart;
  document.getElementById('btEnd').innerHTML=BACKTRACKstop;
  document.getElementById('btLoop').innerHTML= BACKTRACKstop-BACKTRACKstart+' sec';
  player2.seekTo(BACKTRACKstart);
  player2.pauseVideo();
  statusMsg(BACKTRACKtitle+': Ready...');}

function btClose(){
  dis('backTrackBar','none');
  player2.pauseVideo();
  dis('backTrackBar','none');
  player2.seekTo(BACKTRACKstart);
  clearTimeout(TIMEOUTbtMon);
  document.getElementById('btLoop').innerHTML="Stopped";
  dis('btLooping','none');dis('btPlaying','none');}

function btStartLoop(){
  document.getElementById('btLoop').innerHTML="Looping";
  clearTimeout(TIMEOUTbtMon);
  player2.seekTo(BACKTRACKstart);
  player2.playVideo();
  dis('btLooping','block');
  dis('btPlaying','none');
  btMonitor();
  statusMsg('Looping...');}

function btStopLoop(){
  clearTimeout(TIMEOUTbtMon);
  player2.pauseVideo();
  document.getElementById('btLoop').innerHTML="Stopped";
  dis('btPlaying','none');
  dis('btLooping','none');
  statusMsg('Stopped...');}
//===============================================================================
function bigHdr(form,f,h,w,t,r){//form=id;f=formHeight&h=headerHt
  var of=leftTo(document.getElementById(form).style.height,"%",false,true);
  var oh=leftTo(document.getElementById(form+'Hdr').style.height,"%",false,true);
  if(of-f===0){
    document.getElementById(form+'Hdr').style.height='100%';
    document.getElementById(form+'Body').style.height='0%';
    document.getElementById(form).style.height=((h/100)*f)+"%";}
  else{
    document.getElementById(form+'Hdr').style.height=h+'%';
    document.getElementById(form+'Body').style.height=parseInt(100-h,10)+'%';
    document.getElementById(form).style.height=f+'%';}
  if (isNaN(w)===false){
    document.getElementById(form).style.width=w+'%';}
  if (isNaN(t)===false){
    document.getElementById(form).style.top=t+'%';}
  if (isNaN(r)===false){
    document.getElementById(form).style.right=r+'%';}}

//^CONTROL FUNCTIONS=============================================================
function backtrackInfo()
  { //alert('shit');
    //alert(BACKTRACKtitle+":\nID:   " +BACKTRACKid+"\nKEY; "+BACKTRACKkey+"\nCLASS; "+BACKTRACKclass+"\nTEMPO; "+BACKTRACKtempo+"\nSTART; "+BACKTRACKstart+"\nSTOP; "+BACKTRACKstop+"\nNOTES; "+BACKTRACKnotes);
    dis('newLine');
    }
function btSpeedSet(){//backtrack Speed
  var speed=document.querySelector('input[name="bSpeed"]:checked').value;
  document.getElementById('btTempo').innerHTML=parseInt(BACKTRACKtempo*speed,10)+TEMPOpct;
  player2.setPlaybackRate(speed);}

//dragElement============================================================
 // dragElement(document.getElementById(("bt")));//apparenlty you must initiateThis
  dragElement(document.getElementById(("backTrackBar")));//apparenlty you must initiateThis

  function dragElement(elmnt) {
    var pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
    document.getElementById(elmnt.id + "Mover").onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;}
    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";}
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;}}
      
//End of CORE FOR YOU TUBE API==========================================
//^STRING TYPE FUNCTIONSfunction encodeLines(str,splitter){
  str=str.split('#').join('HASHTAG');
  str=str.split('\n').join(splitter);
  return str; }

function decodeLines(str,splitter){
  str=str.split('HASHTAG').join('#');
  str=str.split(splitter).join('\n');
  return str; }

function ZZZinfo(id){
  var str ="INFO-"+id+":\n\n";
  str=str+ "VID:" +VID+"\n";
  str=str+ "LOOP:" +LOOP+"\n";
  alert(str);}


//^GOING GLOBAL????=====================================================
function selectorBuild(id,arr,sel){//probably going global
  if (sel===undefined|sel===null|sel==='') {sel=0;}
  var i=0;var str='';
  while (i<arr.length){
    str=str+"<option value="+i+">"+arr[i]+"</option>";
    i=i+1;}
  document.getElementById(id).innerHTML=str;
  document.getElementById(id).selectedIndex=sel;}
//^   ARRAY Functionsfunction moveArrElement(arr,from,to){//test 1 to 3  if (to==from) {return;}  var ele=(window[arr])[from];  if (from<to) {    window[arr].splice(to,0,ele);//put from in to    //window[arr].splice(window[arr].length,0,ele);//put from in to    window[arr].splice(from,1);}//remove the orriginal  else{    window[arr].splice(to,0,ele);//put it    window[arr].splice(from+1,1);}}  
//NAVIGATION============================================================

/*^Notes to Self
Use the following as 'spliters in a file from now on  1=\n 2=; 3=Dont know yet
*/
/*^FILE MAP ===========================================================
FILE= uTool.txt is a list of file names with no extension The file names become ARRcollections
FILE utool.txt.this is used to select files
    Collection.split(\n)
Characters used as dividers.
level 0 (the whole file

level 1  \n  (first line is a NOTE)
level 2  ;   separates first line into LOOP info{ ;[0]} and videos{;[1>n]}   
level 3  #   separates loop level items
level 4  $   used as a line separator
level 5  :   used in tabs and notes      |
File Editor============================================================       
      [0] =COLnote  (lines split by ; # encoded 'HASHTAG' to prevent split)
      [1]>>[n]= ARRvideos (with COLnote striped the ARRvidos is now just videos)
          ARRvideos is finalize by removing original ARRvideos[0]
          ARRvideos.split[;]
Video Editor============================================================
                  [0].split(#) ex 1234567890h#Rock and Roll#Lots of rock stufff#try78io0plk|34|500#
  >                   [0]UTID
  >                   [1]UTtitle
  >                   [2]UTnote (encoded with $ for \n)
  >                   [3]UTback .split{|}
  >                         UTbackID
  >                         UTbackStart
                            UtbackEnd
Loop Editor==========================
                  [1]>[n].split{#} ex 23#44#Loop A#General BS$Bs line 2#
  >                   [0]LOOPstart 23
  >                   [1]LOOPstop 44
  >                   [2]LOOPname LOOP A
  >                   [3]LOOPnote General BS
                                  Bs line 2(encoded with $ for \n)
 Tab Editor===================================
                      split@   A@4@2@5@1:3b5|3:3b5@1:3|3:3b5.......
                          [0]=key   A
                          [1]=bar   4
                          [2]=divs  2 per beat
                          [3]=chr   5 chr per div
                          [4]>[n]=  action at beat 0  1:3b5|3:3b5
                            split{|}=
                                    string and action  1:3b5 
    >                         split{:}=
                                      string =1
                                      action =3b5 

END FILE MAP===========================================================*/         
/*^TRASH===============================================================
function videosLocal(){//processes local video file (used with FileGetLocal)
  var n=document.getElementById('fileInput').value;
  FILEname=leftTo(leftTo(n,"\\",false,false),'.',false,true);
  document.getElementById('fileName').innerHTML=FILEname;
  protect(false);
  vis('fileName','visible');
  FILEsource='LOCAL';
  LOCAL=true;
  ARRvideos=TEMP.split('\n');
  videoSelectorCreate(0,0);
  }
=======================================================================*/  