//Variables============================================================
var ARRcollections="";//download text file and split ('\n')LEVEL 1//LIST OF FILES FOR THE PROGRAM
  var COL; //element number in ARRcollections[COL]
var ARRvideos="";//download ARRcollections[x] read text file and split ('\n')LEVEL 1 //ARR of encoded strings giving all pertinent info(LOOPS and Tabs)for a bunch of videos
  var VID;
var ARRloops="";//ARRvideos.split(";")  Level 2  any number of loops//ARRloops[0]=UTID#UTtitle//ARRloops[1>>>x].split("#")LOOPstart #LOOPstop #LOOPname #LOOPTab (ARRloops[0]>>[3])
  //var LOOP;//LOOPnumber obsolete
var ARRsteps="";//ARRloops[3].split "@"  //each step represents a beat//this contains all the TAB information
var ARRtabInfo ='';//ARRsteps[0].split('!')//Data about a tab if there is one
var ARRnotes="";// ARRsteps[x>>end].split('|')(all the notes played within one time basic increment of the TAB)
var ARRnote="";//ARRnotes[x].split('!')ARRnote[0]=string, ARRnote[1]=fret and action
var ARRrestore;
var ARRlog="NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE".split('-');
//VARIABLES for UTUBE SECTION
var CLOCKtime; //Current time...
var COLname;//Name of the Collection
var CUE;
var DEGREES;
var DUR=0;//in seconds of a loop
var EDITEDvideo=false; //note if the video has been edited
var FILEName;
var FILEsource="UNKNOWN";//UNKNOWN;WEBSITE;LOCAL;UNSAVED
var FILEstate="SAVED";//SAVED;EDITED
var FPS='X';//frames per second
var IFRAME=1;
var Iheight;//iframe height
var Iwidth;//iframe width
var LOOP;
var LOOPstart=0;//in seconds
var LOOPfinish=0;//in seconds
var LOOPtype;
var LOOPpause=2000;//milliseconds of pause
var LOOPtab="";//ARRloop[3] where the tab is stored in a string
var LOOPname="Un-named";
var PLAYERtime=0;//set by the monitor function, time of the UTUBE video
var MAG=100;//Magnification in percent
var MODE='Paused...';//mode of the UTUBE PLAYER
var MODEholder;//where commands are placed for the monitor to pick up on the next cycle
var MONITORcycles=0;
var player;//Utube player
var TIMEOUTloop;
var TIMEOUTtime;
var TIMEOUTwait;
var TIMEOUTtemp
var UTID='_sXXtitlAAgwpE';//You Tube Id (8 char?)
var UTtitle;// You Tube Title
var TIMER;
var TIMERaction;

/*TAB VARIABLES=====================================
var WORKbeat=1;
var WORKstring;
var STEPwidth;
var TITLE;
var ROOT;
var BEATS;
var INFO;
var LINK;
var AND;
var PARTA;
var PARTB;
var TIMEOUTtemp;
var DEGREES=0;
*/
//CORE FOR YOU TUBE API===========================================================
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
    videoId: '_sXXzAAgwpE',
    events:{
      'onReady': onPlayerReady
      }
    });
  }
//End of CORE FOR YOU TUBE API===========================================================
function editorRefresh(){//refreshes the editBar
  //alert(FILEname +": "+FILEsource);
  document.getElementById('editHeader').innerHTML="FILE NAME:"+ FILEname +"<br>FILE SOURCE: "+FILEsource+"<br>FILE STATE: "+FILEstate;
  document.getElementById('editLoopName').value=LOOPname;
  document.getElementById('editLoopFinish').value=secToMin(LOOPfinish);
  document.getElementById('editLoopStart').value=secToMin(LOOPstart);
  document.getElementById('editUTID').value=UTID;
  document.getElementById('editUTtitle').value=UTtitle;
  }

function barSelect(bar,msg){//chooses one of the control bars
  editorRefresh();
  statusMsg(bar + " selected...");
  var arrBar="sourceBar,editBar,rotateBar".split(",");
  var j=0;  var ctrl;
  while (j<arrBar.length){   
    if (msg===undefined) {msg="---";}
    ctrl =arrBar[j];
    if (bar==ctrl){dis(ctrl);}else{dis(ctrl,'none');}
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
  document.getElementById('fineTime').innerHTML=parseInt(player.getCurrentTime()*1000,10)/1000;
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
window.onload = function(){//alert('window.onload') ; //downloads and creates ARRcollections makes selector and selects default 
  NONE =document.getElementById('none').style.display;//*  create object
  vis('fileIndex','hidden');vis('videos','hidden');vis('loops','hidden');dis('blocker','block');
  clearTimeout(TIMEOUTtime);
  document.getElementById("msg").style.top='0%';
  document.getElementById("splash").style.display='none';
  statusMsg("Loading javascript...");
  MSGlast="...";
  mode('Loading...');
  collectionsGet();
  };
function collectionsGet(){//alert('collectionsGet()') ;//creates ARRcollections
  ARRcollections=fileDownload('UtubeUtool.txt').split("\n");
  var a = ARRcollections.indexOf("Default Videos");//load the default videos
  selectorBuild('fileIndex',ARRcollections,a);
  vis('fileIndex','visible');
  vis('fileName','hidden');
  colSelect(a);
  }
function colSelect(col){//alert('colSelect()');//creates the ARRcollections select box
  if (col===undefined|col===null|col===''){col=0;}
  COL=col;
  ARRrestore="none;none;none;none;none;".split(';');//blank restore
  dis('videos','none');
  dis('loops','none');
  mode('Loading...');
  vidsGet(0,-1);
  FILEsouce="WEBSITE";
  }
function vidsGet(vid,loop){//alert('vidsGet(vid,loop)');//creates ARRvideos passes default value to selector and default loop
  if (vid===undefined|vid===null|vid===''){vid=0;}
  var path="../Utool/"+ARRcollections[COL]+".txt";
  FILEname=ARRcollections[COL]; //alert(FILEname);
  ARRvideos=fileDownload(path).split('\n');
  mode('Loading...');
  videoSelectorCreate(vid,loop);}
  
function videoSelectorCreate(vid,loop){//alert('videoSelectorCreate('+vid+','+loop+')');//creates video selector and selects video vid and passes loop j
  if (vid>=ARRvideos.length){vid=ARRvideos.length-1;}//if you pick a number to high
  if (vid<=0|vid===undefined){vid=0;}//prevents video loop number
  var arr;
  var str="";
  var n=0;
  vis("videos","visible");vis('loops','hidden');dis('blocker','block');
  while(n<ARRvideos.length)
  {
      str=str+(ARRvideos[n].split(';')[0]).split('#')[1]+"\n";
      n=n+1;
  }
  arr=str.split('\n');
  selectorBuild('videos',arr,VID);
  vis('videos','visible');
  vis("videos","visible");vis('loops','visible');dis('blocker','block');
  dis('loops','none');
  dis('videos','block');
  mode('Loading...');
  if (vid>=0){vidSelect(vid,loop);}else{loopsGet(loop);}
  }
function vidSelect(vid,loop){//alert('vidSelect('+vid+','+loop+')');
  if (vid>=ARRvideos.length){vid=ARRvideos.length-1;}//if you pick a number to high
  if (vid<=0|vid===undefined){vid=0;}//prevents neg loop number
  document.getElementById('videos').selectedIndex=vid;//align selector
  VID=vid;//set the VID for all future processes
  vis("videos","visible");vis('loops','visible');dis('blocker','block');
  var temp=ARRvideos[vid].split(';')[0];//alert(temp);
  temp=temp.split('#');
  UTID=temp[0];// alert (UTID);
  UTtitle= temp[1];//alert (UTtitle);
  var path ="//www.youtube.com/embed/"+UTID;
  path=path+"?amp;showinfo=0&enablejsapi=1&rel=0";  //alert (path);//stops utube from showing more pages
  document.getElementById('player').src=path;
  dis('blocker','block');
  mode('Loading...');
  if(loop>=0){LOOP=loop;loopsGet(loop);}else{LOOP=0;}
  }
  
function onPlayerReady(event){//alert('Player Ready, getting Loop:'+LOOP);
  loopsGet(LOOP);
  }

function loopsGet(loop){//alert(' loopsGet(0)');//creates ARRloops
  var str;
  dis('blocker','block');
  str="";
  ARRloops="".split(',');
  ARRloops=ARRvideos[VID].split(';');//zzzzneed to trim it
  ARRloops.splice(0,1);//get rid of UTID and UTtitle
  if (ARRloops.length===0|ARRloops===undefined){//add loop if there are no loops
    loop=0;
    str='2#5#Bogus Loop';
    ARRloops=str.split(';');}
  mode('Loading...');
  loopSelectorCreate(loop);
  }

function loopSelectorCreate(loop){//alert('loopSelectorCreate('+loop+')');
  var str='';//cant be undefined
  var n=0;
  var arr;
  var titl; //alert(ARRloops);
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
  if (loop>=0){loopSelect(loop);}
  }

function loopSelect(loop) {//alert('loopSelect('+loop+')');//sets the default values of a loop     
  if (loop>=ARRloops.length){loop=ARRloops.length-1;}//if you pick a number to high
  if (loop<=0){loop=0;}//prevents neg loop number
  document.getElementById('loops').selectedIndex=loop;//align selector
  DUR=player.getDuration();
  LOOPtab=undefined;
  LOOPtab=ARRloops[loop].split('#')[3];
  LOOPname=ARRloops[loop].split('#')[2];
  LOOPfinish=ARRloops[loop].split('#')[1];
  LOOPstart=ARRloops[loop].split('#')[0];
  LOOPpause=document.getElementById('pause').value=2000;
  LOOP=loop;
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
  if(player.getCurrentTime()>0){mode('Paused...');}else{mode('Cueing...');}
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
    else if (MODE=='Resetting...'& player.getCurrentTime()===0) {mode('Ready...');dis('blocker','block');}
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
      dis('footer','block');dis('blocker','none'); }
    else if (MODE=='Ready...'){
      player.pauseVideo();
      player.seekTo(0.01);
      vis('buttonPlay','visible');
      vis('runImg','hidden');
      vis('loopStopper','hidden');
      dis('footer','block');dis('blocker','none');}
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
    while (i<arr.length)
        {
            str=str+"<option value="+i+">"+arr[i]+"</option>";
            i=i+1;    
        }
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
  //var clientHeight = document.getElementById('myDiv').clientHeight;
  //var clientHeight = document.getElementById('myDiv').clientHeight;
  //Iheight = document.getElementById('idiv').clientHeight;
  //Iwidth= document.getElementById('idiv').clientWidth;
  // alert(Iheight +'\n'+(Iheight/2)*(mag-1));
  // document.getElementById('idiv').scrollTop=(Iheight/2)*(mag-1);
  // document.getElementById('idiv').scrollLeft=(Iwidth/2)*(mag-1);
  }
  
function cto(){//clears timeouts
  clearTimeout(TIMEOUTloop);
  }
  
//Edit functions====================================
function loopDelete(loop){//Deletes specified loop
    if (ARRloops.length==1){
       alert('Thats your only loop! You change it but not delete it..');
    }
    else{
        protect(true);
        ARRloops.splice(loop,1);//remove your loop
        loopsToVid();
        loopSelectorCreate(loop);
        }
    }
function loopUpdate(loop,vid){//updates current loop to specified parameters
    var action;
    var arr;
    if (vid===undefined|vid===null|vid==='') {vid=VID;}
    if (loop===undefined|loop===null|loop==='') {loop=LOOP;}
    var currentTitle=ARRloops[loop].split('#')[2];
    action=confirm('Change loop #'+loop+' of video #'+vid+' to\nStart at:\n '+ secToMin(LOOPstart)+'\nFinish at:\n'+ secToMin(LOOPfinish));
    if (action===true){
      protect(true);
        ARRloops.splice(loop,1,LOOPstart+"#"+LOOPfinish +'#'+ currentTitle);
        loopSelectorCreate(loop);
      }
    arr=ARRloops[loop].split('#');
    action=prompt("Rename Current Loop?\n"+currentTitle,currentTitle);    
    if (action===null|action===currentTitle){return;}
    else{
      protect(true);
      ARRloops.splice(loop,1,arr[0]+"#"+arr[1] +'#'+ action);
      loopSelectorCreate(loop);
      }
    loopsToVid();
  }
function loopCapture(loop){//alert('loopCapture('+loop+')');//captures current loop and adds it to this spot
    var nam="New Loop";
    clearTimeout(TIMEOUTtime);
    var str;
    if (loop===undefined|loop===''|loop===null|loop>=ARRloops.length) {loop=ARRloops.length-1;}
    loop=parseInt(loop,10)+1;
    nam= window.prompt("Name of New Loop?","New-Loop");
    if (nam===false) {return;}
    protect(true);
    str=LOOPstart+"#"+LOOPfinish +'#'+nam;
    ARRloops.splice(loop,0,str);
    str = UTID+"#"+UTtitle+";"+ARRloops.join(";");
    ARRvideos.splice(VID,1,str);
    //alert('loopCapture('+loop+')');
    loopsToVid();
    //videoSelectorCreate(undefined,loop);
    //videoSelectorCreate(VID,loop);
    loopSelectorCreate(loop);
    }   
function vidsRestore(){//Restores video before last change
//alert(ARRrestore[0]);
        if (ARRrestore[0]!=='none'){
            ARRvideos=ARRrestore[0].split('\n');
            ARRrestore.splice(0,1);
            ARRrestore.splice(-1,0, 'none');
            videoSelectorCreate(0,0);
            alert('Last edit undone...');
            }
        else{alert('Sorry, no more restorable images...');}
    }
function saveVideoFile(){
  fileSaveTextAs('crapola.txt',ARRvideos.join('\n'));
  protect(false);
  }

function videosLocal(){//processes local video file (used with FileGetLocal)
    var n=document.getElementById('fileInput').value;
    FILEname=leftTo(leftTo(n,"\\",false,false),'.',false,true);
    document.getElementById('fileName').innerHTML=FILEname;
    ARRrestore="none;none;none;none;none;".split(';');//blank restore
    //protect(true);
    vis('fileName','visible');
    FILEsource='LOCAL';
    LOCAL=true;
    ARRvideos=TEMP.split('\n');
    videoSelectorCreate(0,0);
    }
function protect(a){//hides the collection selector and stores up to 5 changes
  if (a===true) {
    EDITEDvideo=true;
     ARRrestore.splice(0,0, ARRvideos.join('\n'));
      if (ARRrestore.length>5) {
         ARRrestore.splice(5,1);
        }
    vis('fileIndex','hidden');
    vis('fileName','visible');
    vis('edited','visible');
    document.getElementById('hdr').style.backgroundColor='red';}
  else{
    EDITEDvideo=false;
    vis('fileIndex','visible');
    vis('edited','hidden');
      document.getElementById('hdr').
    document.getElementById('hdr').style.backgroundColor='orange';}
  }
function deleteVideo(){//deletes current video
  if (ARRvideos.length==1) {
    alert('You can\'t delete your only video.. Just delete the entire collection');
    final();}
  else{
    if (confirm("WARNING!!!\n\nDeleting the Video will DELETE ALL its Associated Loops!\n\nContinue?")===true) {
      protect(true);
      ARRvideos.splice(VID,1);
      videoSelectorCreate(VID);}
    }
  }
function loadUTID(VID){//alert('loadUTID('+VID+')');//loads a specified utube video
  alert(VID)
  var a;
  var str =prompt("Paste your YouTube URL here...", "https://www.youtube.com/watch?v=Fd7BrjdTnrg");
  if (str===null) {statusMsg("New Loop Cancelled...",'yellow');return;}
  id= uTubeGetId(str);
  a=prompt("Choose a name for your video?","My Video");
  if (a===null) {statusMsg("New Loop Cancelled...",'yellow');return;}
  protect(true);
  str=id+"#"+a;
  protect(true);
  ARRvideos.splice(VID,0,str);
  //str="";
  vis('fileIndex','hidden');vis('saveVids','visible');vis('getVids','visible');
  videoSelectorCreate(VID,0);
  }
function loopsToVid(){//takes the ARRloops and puts it on the Current Video
  //if (vid!=VID) {if(confirm('Warning...NOT appending loops to the CURRENT Video')===null)return;}
  protect(true);
  var str=UTID+'#'+UTtitle+';'+ARRloops.join(';');
  ARRvideos.splice(VID,1,str);
  //if (loop>0) {loop=loop-1;}
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
//TRASH==============================================================
