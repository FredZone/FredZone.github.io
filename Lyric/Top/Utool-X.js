/*PROBLEMS
  sometimes locks on loading(provided Reset)
  help does not work
  infinite loop keeps going, need a universal stop*/
//Variables============================================================
var ARRcollections="";//download text file and split ('\n')LEVEL 1//LIST OF FILES FOR THE PROGRAM
var ARRvideos="";//download ARRcollections[x] read text file and split ('\n')LEVEL 1 //ARR of encoded strings giving all pertinent info(LOOPS )for a bunch of videos
var ARRlog="NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE".split('-');//used in the Utube playback modes
var ARRloops="";//ARRvideos.split(";")  Level 2  any number of loops//ARRloops[0]=UTID#UTtitle//ARRloops[1>>>x].split("#")LOOPstart #LOOPstop #LOOPname (ARRloops[0]>>[2])
//VARIABLES for UTUBE SECTION
//var BACKTRACK;xxx
var CLOCKtime; //Current time...
var COLname;//Name of the Collection
var COL; //element number in ARRcollections[COL]
var CUE;
var DEGREES=0;
var DUR=0;//in seconds of a loop
var EDITEDvideo=false; //note if the video has been edited
var FILEName;//name of the file downloaded defining videos and loops (ARRcollections)
var FILEsource="UNKNOWN";//UNKNOWN;WEBSITE;LOCAL;UNSAVED
var FILEstate="SAVED";//SAVED;EDITED
var FPS='X';//frames per second
var IFRAME=1;//???????????????????????????
var Iheight;//iframe height
var Iwidth;//iframe width
var LOOP;//index of working loop in ARRloops
var LOOPstart=0;//in seconds
var LOOPfinish=0;//in seconds
var LOOPtype;//once or repeat
var LOOPpause=2000;//milliseconds of pause
var LOOPtab=null;//ARRloop[4] where the tab is stored in a string
var LOOPname="Un-named";//ARRloop[2] where the tab is stored in a string
var LOOPnote=null;//ARRloop[3] where the tab is stored in a string
var PLAYERtime=0;//set by the monitor function, time of the UTUBE video
var MAG=100;//Magnification in percent
var MODE='Paused...';//mode of the UTUBE PLAYER
var MODEholder;//where commands are placed for the monitor to pick up on the next cycle
var MONITORcycles=0;
var player;//Utube player
var player2;
var TIMEOUTloop;
var TIMEOUTtime;
var TIMEOUTwait;
var TIMEOUTtemp;
var TIMER;
var TIMERaction;
var UTID='_sXXtitlAAgwpE';//You Tube Id (8 char?)
var UTtitle;// You Tube Title
var UTnote;//Utube Note
var UTback;//uTube backing track with | separating start in seconds
var VID;//the index of the video in ARRvideos
var VIDnote;

//var VIDtitle;
//CORE FOR YOU TUBE API===========================================================DONT MESS WITH THIS
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.called by api
//var player;


function onYouTubeIframeAPIReady() {
  player = new YT.Player('player',{
    //position:absolute,
    height:  '100%',
    width: '100%',
    //rel:0,//does not help
    videoId: '_sXXzAAgwpE',//works without this
    events:{
      'onReady': onPlayerReady
      }
    });
  }

function btSpeedSet(){
  var speed=document.querySelector('input[name="bSpeed"]:checked').value;
  player2.setPlaybackRate(speed);}



//dragElement===================================================
  dragElement(document.getElementById(("backTrackBar")));//apparenlty you must initiateThis
  dragElement(document.getElementById(("noteBar")));//apparenlty you must initiateThis
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
//End of CORE FOR YOU TUBE API===========================================================
function encodeLines(str,x){
  str=str.split('\n').join(x);
  return str;
  }
function decodeLines(str,x){
  str=str.split(x).join('\n');
  return str;
  }

function editorRefresh(){//refreshes the editBar
  //alert(FILEname +": "+FILEsource);
  document.getElementById('editFileName').value=FILEname;
  document.getElementById('editHeader').innerHTML="SOURCE: "+FILEsource;
  document.getElementById('editLoopName').value=LOOPname;
  document.getElementById('editUTtitle').value=UTtitle;
  document.getElementById('editUTnote').value=UTnote;
  document.getElementById('editUTback').value=UTback;
  }
function info(id){
  var str ="INFO-"+id+":\n\n";
  str=str+ "VID:" +VID+"\n";
  str=str+ "LOOP:" +LOOP+"\n";
  alert(str);
}
function barSelect(bar,msg){//chooses one of the control bars
  editorRefresh();
  statusMsg(bar + " selected...");
  var arrBar="editBar,rotateBar,tabBar,noteBar,helpBar,backTrackBar".split(",");
  var j=0;  var ctrl;
  while (j<arrBar.length){   
    if (msg===undefined) {msg="---";}
    ctrl =arrBar[j];
    if (bar==ctrl){dis(ctrl);}
    else{dis(ctrl,'none');}
    j = j+1;
    }
  var r= document.getElementById(bar).style.display;
  if (bar!=="none"){
    if (r=='block') {statusMsg((bar+ " BAR Opened...").toUpperCase());}
    else{statusMsg((bar+ " BAR CLOSED...").toUpperCase());}    //code
    }
  else{statusMsg("Ready");}
  }

function spin (id,deg,interval){//id=id of div to rotate;deg=increment(degrees) to rotate CW;interval=time between increments (0 means one increment only)
  clearTimeout(TIMEOUTtemp);
  DEGREES=parseInt(DEGREES+deg,10);
  if (DEGREES<0) {DEGREES=parseInt(360+DEGREES,10);}
  if (DEGREES>=360){DEGREES=parseInt(DEGREES-360,10);}
  document.getElementById(id).style.webkitTransform = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.mozTransform    = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.msTransform     = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.oTransform      = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.transform       = 'rotate('+DEGREES+'deg)';
  document.getElementById('arc').innerHTML=DEGREES+"&deg<br>FLIP";  
  if (interval>0){//auto spin until TIMEOUTtemp is cleared
    TIMEOUTtemp=setTimeout(function(){
      document.getElementById('spinStop').style.visibility='visible';
      spin('player',deg,interval);
      },interval);  
    }
  }

TIMEOUTwait=setTimeout(function(){MODE='Looping...';clearTimeout(TIMEOUTwait);},document.getElementById('pause').value); 

function rotateDegrees(id,deg){
  DEGREES=parseInt(DEGREES+deg,10);
  if (DEGREES<0) {DEGREES=parseInt(360+DEGREES,10);}
  if (DEGREES>=360){DEGREES=parseInt(DEGREES-360,10);}
  document.getElementById(id).style.webkitTransform = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.mozTransform    = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.msTransform     = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.oTransform      = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.transform       = 'rotate('+DEGREES+'deg)';
  document.getElementById('arc').innerHTML=DEGREES+"<br>FLIP";
  }

function frame(){//fake a frame by frame progression
  player.playVideo();
  player.pauseVideo();
  document.getElementById('fineTime').innerHTML=(parseInt(player.getCurrentTime()*1000,10)/1000).toFixed(2);
  if(FPS==='X'){clearTimeout(TIMEOUTscroll);vis('fpsGo','visible');player.unMute();document.getElementById('fineTime').innerHTML="-";}
  else{
    vis('fpsGo','hidden');
    TIMEOUTscroll=setTimeout(function() //reusing TIMEOUTscroll
      {
      clearTimeout(TIMEOUTscroll);
      frame();
      },FPS);
    }
  }
//LOAD/BOOT ROUTINE==============================================================================

function onPlayerReady(event){alert('G');
wLoad();
}



//window.onload = function(){//alert('A');//downloads and creates ARRcollections makes selector and selects default 
//
//};  
function wLoad(){ alert('wLoad'),wLoad2();}
function wLoad2(){ alert('????')  
  NONE =document.getElementById('none').style.display;//*  create object
  vis('fileIndex','hidden');vis('videos','hidden');vis('loops','hidden');dis('blocker','block');//hide the selectors
  clearTimeout(TIMEOUTtime);
  document.getElementById("msg").style.top='0%';
  document.getElementById("splash").style.display='none';
  statusMsg("Loading javascript...");
  MSGlast="...";
  mode('Loading...');
  //player2 = new YT.Player('player2');
  collectionsGet('server'); //server,new
  }



function collectionsGet(type){//alert('B');//creates ARRcollections from server or local
  if (type=='server') {
    FILEsource="WEBSITE";
    ARRcollections=fileDownload('UtubeUtool.txt').split("\n");
    var a = ARRcollections.indexOf("Default Videos");//load the default videos
    if (a===null) {a=0;}//incase Default Videos in not in ARRCollections
    selectorBuild('fileIndex',ARRcollections,a);
    vis('fileIndex','visible');
    vis('fileName','hidden');
    statusMsg('Select a Collection of videos');
    dis('blocker','none');
    alert('LOAD YOUR COLLECTION...');}
   // colSelect(a);}
  else{
    FILEsource="LOCAL";
    alert("ALERT:\nA New 'bogus' File is Loading...\nEdit it and save it...");
    ARRcollections="00".split(";");
    selectorBuild('fileIndex',ARRcollections,0);
    vis('fileIndex','visible');
    vis('fileName','hidden');
    FILEname= 'BOGUS';
    colSelect(0);}
  }
function colSelect(col){//alert('C');//creates the ARRcollections select box
  if (col===undefined|col===null|col===''){col=0;}
  COL=col;//set the working Collection
  dis('videos','none');
  dis('loops','none');
  mode('Loading...');
  vidsGet(0,0);
  }
function vidsGet(vid,loop){//alert('D');//creates ARRvideos passes default value to selector and default loop
  if (vid===undefined|vid===''|vid===null){vid=0;}
  var path="";
  VID=vid;
  LOOP=loop;
  FILEname=ARRcollections[COL];
  path="../Utool/"+FILEname+".txt";//}
  ARRvideos=fileDownload(path).split('\n');
  document.getElementById('fileName').innerHTML=FILEname;
  mode('Loading...');
  videoSelectorCreate(VID,LOOP);}

function videoSelectorCreate(vid,loop){//alert('E');//creates video selector and selects video 'vid' and passes 'loop')
  if (vid>=ARRvideos.length){vid=ARRvideos.length-1;}//if you pick a number to high
  if (vid<=0|vid===undefined){vid=0;}//prevents video loop number below 0
  var arr;
  var str="";
  var n=0;
  vis("videos","visible");vis('loops','hidden');dis('blocker','block');
  while(n<ARRvideos.length){
    str=str+(ARRvideos[n].split(';')[0]).split('#')[1]+"\n";
    n=n+1;}
  arr=str.split('\n');
  selectorBuild('videos',arr,vid);
  vis('videos','visible');
  vis("videos","visible");vis('loops','visible');dis('blocker','block');
  dis('loops','none');
  dis('videos','block');
  mode('Loading...');
  VID=vid;LOOP=loop;
  if (VID>=0){vidSelect(VID,LOOP);}else{loopsGet(LOOP);}
  }
  
function vidSelect(vid,loop){//alert('F');
  var sec=0;
  var pathFull= undefined;
  if (vid>=ARRvideos.length){vid=ARRvideos.length-1;}//if you pick a number to high
  if (vid<=0|vid===undefined){vid=0;}//prevents neg loop number
  document.getElementById('videos').selectedIndex=vid;//align selector
  vis("videos","visible");vis('loops','visible');dis('blocker','block');
  var temp=ARRvideos[vid].split(';')[0];//alert(temp);
  temp=temp.split('#');
  UTID=temp[0];
  UTtitle= temp[1];
  UTnote=temp[2];
  UTback=temp[3];
  var path ="//www.youtube.com/embed/"+UTID;
  //path=path+"?amp;showinfo=0&enablejsapi=1&rel=0"; //My original solution USED TO WORK
  path=path+"?enablejsapi=1";//Works but shows ads;SHORTEST WORKING SOLUTION working solution
  //path=path+"?&rel=0";//does NOT HIDE ADDS
  // path=path+"?enablejsapi=1&?showinfo=0";//Works but shows ads
  //path=path+"?rel=0&?amp;showinfo=0&?enablejsapi=1";//hides suggestions no jsapi
  //path=path+"?rel=0&?enablejsapi=1";//hides suggestions no jsapi
  //path=path+"?amp;showinfo=0&enablejsapi=1&rel=0"; //WORKS but shows suggestions
  dis('blocker','block');
  document.getElementById('player').src=path;
  VID=vid;LOOP=loop;//alert("VID-Selected: "+VID);//set the VID for all future processes
  /*666 mode('Loading...');
  if(LOOP>=0){loopsGet(LOOP);}else{LOOP=0;}*/

  if (UTback!==undefined) {//Load a backtrack to player2
    vis('buttonBackTrack','visible');
    sec =UTback.split('|')[1];
    var btid=UTback.split("|")[0];
    if (sec===undefined){sec=0;}
    pathFull= "https://www.youtube.com/embed/"+btid+"?start="+sec+"&autoplay=0&enablejsapi=1&loop=1&playlist="+btid;
    document.getElementById('player2').src= pathFull;}
   // document.getElementById('player2').src="https://www.youtube.com/embed/"+ oldBack;}
  else{
    vis('buttonBackTrack','hidden');
    document.getElementById('player2').src="xxx";}
  document.getElementById('videoNote').innerHTML=UTnote;
  mode('Loading...');
  loopsGet(LOOP);
  }

//function onPlayerReady(event){//alert('G');
  //loopsGet(LOOP);
//}
function loopsGet(loop){//alert('H');//creates ARRloops
  var str;
  dis('blocker','block');
  str="";
  ARRloops="".split(',');
  ARRloops=ARRvideos[VID].split(';');//zzzzneed to trim it
  ARRloops.splice(0,1);//get rid of UTID and UTtitle
  if (ARRloops.length===0|ARRloops===undefined){//add loop if there are no loops
    loop=0;
    str='2#5#Bogus Loop#-#-';
    ARRloops=str.split(';');}
  mode('Loading...');
  LOOP=loop;
  loopSelectorCreate(LOOP);
  }

function loopSelectorCreate(loop){//alert('I');
  var str='';//cant be undefined
  var n=0;
  var arr;
  var titl;
  while( n<ARRloops.length){
    titl=(ARRloops[n].split('#')[2]);
    if (titl===undefined) {titl='LOOP '+parseInt(1+n,10);}
    str=str+titl+':';
    n=n+1;}
  str=str.substring(0,str.length-1);//cut off last':'
  arr=str.split(":");
  selectorBuild('loops',arr,loop);
  if (loop===undefined) {loop=0;}
  dis('loops','block');
  LOOP=loop;
  if (LOOP>=0){loopSelect(LOOP);}
  }

function loopSelect(loop) {//alert('J');//sets the default values of a loop     
  if (loop>=ARRloops.length){loop=ARRloops.length-1;}//if you pick a number to high
  if (loop<=0){loop=0;}//prevents neg loop number
  document.getElementById('loops').selectedIndex=loop;//align selector
  DUR=player.getDuration();
  LOOP=loop;
  LOOPtab=ARRloops[LOOP].split('#')[4];
  if (LOOPtab===undefined) {LOOPtab="-";}
  LOOPnote=ARRloops[LOOP].split('#')[3];
  if (LOOPnote===undefined) {LOOPnote="-";}
  LOOPname=ARRloops[LOOP].split('#')[2];
  if (LOOPnote===undefined) {LOOPnote="LOOP "+loop;}
  LOOPfinish=ARRloops[LOOP].split('#')[1];
  //if (LOOPfinish===undefined) {LOOPfinish=5;}
  LOOPstart=ARRloops[LOOP].split('#')[0];
  if (LOOPfinish===undefined|LOOPstart===undefined) {LOOPfinish=5;LOOPstart=1;}
  document.getElementById('editLoopTab').value=decodeLines(LOOPtab,'$');
  document.getElementById('tabView').innerHTML='<pre>'+LOOPtab.split('$').join('<br>')+'</pre>';
  if (LOOPtab.length>2) {vis('buttonTab','visible');}else{vis('buttonTab','hidden');}
  if (LOOPnote.length>2) {vis('buttonNote','visible');}else{vis('buttonNote','hidden');}
  document.getElementById('editLoopNote').value=decodeLines(LOOPnote,'$');
  document.getElementById('loopNote').innerHTML=LOOPnote.split('$').join('<br>');
  PLAYERtime=0;//set by the monitor   
  document.getElementById('runImg').style.visibility='hidden';
  document.getElementById('loopstart').value=secToMin(LOOPstart);
  document.getElementById('loopfinish').value=secToMin(LOOPfinish);
  document.getElementById('loopTime').innerHTML="0:00";
  document.getElementById('mag').value="1";
  document.getElementById('rate').value=1;
  final();
  }
function  final(){//alert(' final()');
  mode('Loading...');
  document.getElementById('slider1').max=DUR;
  document.getElementById('slider1').value=0;
  editorRefresh();
  timeMon(); //start the monitor of time
  if(player.getCurrentTime()>1){mode('Paused...');}else{mode('Cueing...');}//zzz
  }
//Monitor Loop==============================================================================
function mode(M){MODEholder=M;}

function timeMon(){ //The timing engine with trigger points and command receptions             
  clearTimeout(TIMEOUTtime);
  MONITORcycles=MONITORcycles+1;
  var d = new Date();
  CLOCKtime = d.getTime();//= new Date().getTime();//(clock time)
  PLAYERtime=parseInt(player.getCurrentTime(),10);
  document.getElementById('loopTime').innerHTML=secToMin(PLAYERtime);
  document.getElementById('slider1').value=PLAYERtime;
  TIMEOUTtime=setTimeout(function(){   //Triggers
    if(1==2){alert('TIME MONITOR FAILURE');}
    else if (CLOCKtime>=TIMER & TIMER!==0){TIMER=0; mode(TIMERaction); TIMERaction=undefined;}
    else if (MODE=='Cueing...'& player.getCurrentTime()>=0.5){mode('Resetting...');}//dis('footer','none');} 
    //else if (MODE=='Resetting...'& PLAYERtime===0) {mode('Paused...');dis('footer','block');}
    //else if (MODE=='Resetting...'& player.getCurrentTime()===0) {mode('Ready...');dis('blocker','block');}
    else if (MODE=='Resetting...'& player.getCurrentTime()<1000) {mode('Ready...');dis('blocker','block');}
    else if (MODE=='Finding Loop...'& PLAYERtime==LOOPstart ){mode('Looping...');}
    else if (MODE=='Looping...'& PLAYERtime>=LOOPfinish){
      if(LOOPtype=='once'){
        mode('Paused...');}
      else{
        mode('Delay...');}
      }            
    if (MODEholder!==undefined){
      statusMsg('JAVASCRIPT CRASH: '+MSGlast+">>"+MODEholder,'red');
      MODE=MODEholder;
      logAction(MODE);
      MONITORcycles=0;
      MOLDholder=undefined;//single entry point for MODE
    if (MODE=='Loading...'){
      dis('blocker','block');}
    if (MODE=='Paused...'){
      player.pauseVideo();
      vis('buttonPlay','visible');
      vis('runImg','hidden');
      vis('loopStopper','hidden');
      dis('blocker','none'); }//dis('footer','block')
    else if (MODE=='Ready...'){
      player.pauseVideo();
      player.seekTo(0.01);
      vis('buttonPlay','visible');
      vis('runImg','hidden');
      vis('loopStopper','hidden');
      dis('blocker','none');}//dis('footer','block');
    else if(MODE=='Playing...'){
      player.playVideo();
      vis('buttonPlay','hidden');
      vis('runImg','visible');
      vis('loopStopper','hidden');}
    else if(MODE=='Cueing...'){
      player.playVideo();
      vis('buttonPlay','hidden');
      vis('runImg','visible');
      vis('loopStopper','hidden');
      dis('blocker','block');}
    else if(MODE=='Looping...'){
      player.playVideo();
      vis('buttonPlay','hidden');
      vis('runImg','visible');
      vis('loopStopper','visible');}               
    else if(MODE=='Resetting...') {
      player.pauseVideo();
      player.seekTo(0.0);
      vis('buttonPlay','visible');
      vis('runImg','hidden');
      dis('blocker','block');}    
    else if(MODE=='Finding Loop...'){
      player.pauseVideo();
      player.seekTo(LOOPstart);
      vis('buttonPlay','visible');
      vis('runImg','hidden');
      vis('loopStopper','visible'); }
    else if(MODE=='Delay...'){
      player.pauseVideo();
      TIMER=parseInt(document.getElementById('pause').value,10) +parseInt(CLOCKtime,10);
      TIMERaction="Finding Loop...";
      vis('buttonPlay','visible');
      vis('runImg','visible');
      vis('loopStopper','visible');}
    }
    MODEholder=undefined;
    statusMsg(MODE);
    timeMon();    
  },50);
  }  
//GOING GLOBAL????====================================================================
function selectorBuild(id,arr,sel){//probably going global
  if (sel===undefined|sel===null|sel==='') {sel=0;}
  var i=0;var str='';
  while (i<arr.length){
    str=str+"<option value="+i+">"+arr[i]+"</option>";
    i=i+1;}
  document.getElementById(id).innerHTML=str;
  document.getElementById(id).selectedIndex=sel; 
  } 
//NAVIGATION============================================================
function loopStart(type){
  LOOPtype=type; 
  if (LOOPtype=='repeat'){document.getElementById('loopStopper').style.left="50%";}
  else if (LOOPtype=='once'){document.getElementById('loopStopper').style.left="60%";}
  mode('Finding Loop...');
  }
function loopSetStart(sec){
  var newStart;
  if (sec===undefined) {newStart=parseInt(player.getCurrentTime(),10);}
  else {newStart=parseInt(parseInt(LOOPstart,10)+parseInt(sec,10),10);}
  if (newStart<0|newStart>=DUR-1){newStart=0;}
  LOOPstart=newStart;
  document.getElementById('loopstart').value=secToMin(LOOPstart);
  if (LOOPstart>=LOOPfinish){LOOPfinish=LOOPstart+1;document.getElementById('loopfinish').value=secToMin(LOOPfinish);} 
  }
function loopSetFin(delta){
  var newFin=parseInt(DUR,10);
  if(delta===undefined|delta===0) {newFin=parseInt(player.getCurrentTime(),10);}
  else {newFin=parseInt(parseInt(LOOPfinish,10)+parseInt(delta,10),10);}
  if (newFin<=1|newFin>=parseInt(DUR-1,10)){newFin=parseInt(parseInt(LOOPstart,10)+1,10);statusMsg('????');}
  LOOPfinish=newFin;//alert(LOOPfinish)
  document.getElementById('loopfinish').value=secToMin(LOOPfinish);
  if (LOOPstart>=LOOPfinish){LOOPstart=LOOPfinish-1;document.getElementById('loopstart').value=secToMin(LOOPstart);} 
  }
function sizeFrame(mag){//sizes the video
  MAG=mag*100;
  document.getElementById('player').style.width =MAG+"%";
  document.getElementById('player').style.height =MAG+"%";
  }
function cto(){//clears timeouts
  clearTimeout(TIMEOUTloop);
  }
//Edit functions====================================
function loopDelete(loop){//Deletes specified loop
  if (ARRloops.length==1){
     alert('Thats your only loop! You change it but not delete it..'); }
  else{
    protect(true);
    ARRloops.splice(loop,1);//remove your loop
    loopsToVid();
    loopSelectorCreate(loop);
    barSelect();}
  }

function vidUpdate(){//alert('loopCapture('+LOOP+')');//captures current loop and adds it to this spot//zzzThis works
  var str;
  var s=LOOPstart;
  var f=LOOPfinish;
  var n=document.getElementById('editLoopNote').value;
  var t=document.getElementById('editLoopTab').value;
  var nam=document.getElementById('editLoopName').value;
  var vn=document.getElementById('editUTtitle').value;
  var vb=document.getElementById('editUTback').value;
  var vo=document.getElementById('editUTnote').value;
  var vi=UTID;
  protect(true);
  n=encodeLines(n,'$');
  t=encodeLines(t,'$');  
  clearTimeout(TIMEOUTtime);
  str=s+"#"+f+'#'+nam+'#'+n+'#'+t;
  ARRloops.splice(LOOP,1,str);
  str = vi+"#"+vn+"#"+vo+"#"+vb+";"+ARRloops.join(";");
  ARRvideos.splice(VID,1,str);
  videoSelectorCreate(VID,LOOP);
  }     

function vidsRestore(){
alert('Sorry, no more restore...');}
  
function loopCapture(loop){//alert('loopCapture('+loop+')');//captures current loop and adds it to this spot//zzzThis works
  var nam="New Loop";
  clearTimeout(TIMEOUTtime);
  var str;
  if (loop===undefined|loop===''|loop===null|loop>=ARRloops.length) {loop=ARRloops.length-1;}
  loop=parseInt(loop,10)+1;
  nam= window.prompt("Name of New Loop?","New-Loop");
  if (nam===false) {return;}
  protect(true);
  str=LOOPstart+"#"+LOOPfinish +'#'+nam +'#'+LOOPnote +'#'+LOOPtab;
  ARRloops.splice(loop,0,str);
  str = UTID+"#"+UTtitle+"#"+UTnote+"#"+UTback+";"+ARRloops.join(";");
  ARRvideos.splice(VID,1,str);
  loopSelectorCreate(loop);
  barSelect();
  }

function saveVideoFile(){
  
  if (confirm('ONCE YOU SAVE YOUR FILE YOUR \'SAVE FILE\' WARNING WILL GO AWAY')===true){
    fileSaveTextAs(FILEname+'.txt',ARRvideos.join('\n'));
    protect(false);}
  barSelect();
  }
  
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
function protect(a){//hides the collection selector and stores up to 5 changes
  if (a===true) {
    EDITEDvideo=true;
    vis('fileIndex','hidden');//prevent changing file
    vis('fileName','visible');//show file name that is being edited
    vis('edited','visible');//show Warning
    document.getElementById('hdr').style.backgroundColor='red';}
  else{
    EDITEDvideo=false;
    vis('fileIndex','visible');
    vis('edited','hidden');
    vis('fileName','hidden');
    document.getElementById('hdr').style.backgroundColor='lightgrey';}
    }

function deleteVideo(){//deletes current video
  if (ARRvideos.length==1) {
    alert('You can\'t delete your only video.. Delete the entire file...');
    final();}
  else{
    if (confirm("WARNING!!!\n\nDeleting "+UTtitle+" will DELETE ALL its Associated Loops!\n\nContinue?")===true) {
      protect(true);
      ARRvideos.splice(VID,1);
      videoSelectorCreate(VID);
      barSelect();}
    }
  }
function loadUTID(VID){//loads a specified new utube video
  var str =prompt("Paste your YouTube URL here...", "https://www.youtube.com/watch?v=Fd7BrjdTnrg");
  id= uTubeGetId(str);
  str=id+"#"+prompt("Choose a name for your video?","My New Video");
  str=str+'#1#5#Dummy Loop';
  protect(true);
  ARRvideos.splice(VID,0,str);//alert(ARRvideos.join("\n"));
  videoSelectorCreate(VID,0);
  barSelect();}

function loopsToVid(){//takes the ARRloops and puts it on the Current Video ARRvid[VID]
  protect(true);
  var str=UTID+'#'+UTtitle+';'+ARRloops.join(';');
  ARRvideos.splice(VID,1,str);
  }

//DEVELOPER Functions=====================
function logAction(action){
  ARRlog.splice(0,0,MODE+'-'+CLOCKtime);
  if (ARRlog.length>=11) {ARRlog.splice(11,1);}
  }
function monitorStatus(args) {
  var str="MONITOR STATUS\n";
  str=str+"Last Action: "+MODE;
  str=str+"\nCycles Ago:"+MONITORcycles;
  str=str+"\nPending Event:"+TIMERaction;
  str=str+"\n==============================\n";
  str=str+ARRlog.join('\n');
  alert (str);
  }

function help(hdr,txt)
    {
        if(hdr===undefined){hdr='HELP SCREEN',txt="Select a Topic from the Left Hand List...";}
        if(txt===undefined){txt=getTextFile('../help/'+hdr+'.txt');}
        vis('helpDiv','visible');
        document.getElementById('helpIntro').innerHTML=hdr;
        document.getElementById('helpBody').innerHTML=txt;
    }






//tabFunctions======================================================
function tabNew(){
  var tab='';
  var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  var bar=document.getElementById('bars').value;
  var bea=document.getElementById('beat').value;
  var div=document.getElementById('divs').value;
  var spa=document.getElementById('chrs').value;
  var lin ="";
  var s=' ';
  var d='';
  var b="|";
  var lin2=' |';
  var s2='.';
  var d2='&';
  var b2 ='|';
  var i=1;
    //create space block
  while (i<spa-1){
    s=s+' ';
    s2=s2+'.';
    i=i+1;
    }
  //alert('Space \n|'+s +'|\n|'+s2+'|');
  //create div block
  i=1;
  d=s;
  d2=s2;
  while (i<div) {
    d=s+"-"+d;
    d2=s2+'&'+d2;
    i=i+1;
    }
  //alert('Space \n|'+d +'|\n|'+d2+'|');
  //create beat block
  i=bea;
  while (i>0){
    b='-'+d+b;
    b2=i+d2+b2;
    i=i-1;
    }
  //alert('Space \n|'+b +'|\n|'+b2+'|');
  //create bar block
  i=1;
  while (i<=bar){
    lin=lin+b;
    lin2=lin2+b2;
    i=i+1;
    }
  //alert(lin +'\n'+lin2);
  i=0;
  while (i<6){
    tab=tab+ arrStrings[i]+lin+'\n';
    i=i+1;
    }
  tab =lin2+'\n'+tab;
  document.getElementById('editLoopTab').value=tab;
  }
  
  /*FILE MAP=====================================================
ARRCollections{\n}
  ARRvideos{;}
    ARRloops[0]{#}
      Properties of the video
      [0]UTID
      [1]UTtitle
      [2]UTnote
      [3]UTback {|}
        [0]backing track ID ????should be separates?
        [1]start in seconds
ARRloops[1>n]{#}
      properties of loops
      [0]LOOPstart
      [1]LOOPstop
      [2]LOOPname
      [3]LOOPnote
      [4]LOOPtab {$}
        [n]lines in tab
END FILE MAP===================================================*/         
//TRASH==============================================================
