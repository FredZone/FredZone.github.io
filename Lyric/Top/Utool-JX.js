//^PROBLEMS;
  /*must KILL looping when switching tracksPut a developers version of statusMsg
    The Title file line is duplicated if it is updated
    The title of loops needs to update when you add a loop
    */
  /*^Notes to SELF========================================================
    Set default do a global replacement of the UTID in the HTML and Javacript file 2 places
    Put the number of the Collection in var COL=?
    */
//^VARIABLES============================================================
//^ARRAYS
  var TEMPO=0;
  var TEMPOstart=0;
  var TEMPOcount=0;
  var TEMPOtime=0;
  var TEMPOtimeLast=0;
  var ARRcollections="";//download text file and split ('\n')LEVEL 1//LIST OF FILES FOR THE PROGRAM
  var ARRvideos="";//download ARRcollections[x] read text file and split ('\n')LEVEL 1 //ARR of encoded strings giving all pertinent info(LOOPS )for a bunch of videos
  var ARRloops="";//ARRvideos.split(";")  Level 2  any number of loops//ARRloops[0]=UTID#UTtitle//ARRloops[1>>>x].split("#")LOOPstart #LOOPstop #LOOPname (ARRloops[0]>>[2])
  var ARRbacktracks;
  var ARRkeys="A,Bb,B,C,C#,D,Db,Eb,E,F,F#,G,Ab".split(',');
//REQUIRED TO LOG Status Mssages,See Developer Section
  //var LOG=true;
  //var ARRstatusLog="START>>>".split('-');
  //var MSGcount=0;
//VARIABLES for UTUBE SECTION
  var BACKTRACKdefault;
  var BACKTRACKpath;
  var BACKtrackStart=0;
  var BACKtrackStop;
  var CLOCKtime; //Current time...
  var COLname;//Name of the Collection
  var COLnote;//Collection Note
  var COL=0; //element number in ARRcollections[COL]
  var DEGREES=0;//used in rotation
  var DUR=0;//in seconds of a loop
  var EDITEDvideo=false; //note if the video has been edited
  var FILEName;//name of the file downloaded defining videos and loops (ARRcollections)
  var FILEsource="UNKNOWN";//UNKNOWN;WEBSITE;LOCAL;CUSTOM
  var FILEstate="pristine";//pristine,pending,edited,saved
  var FPS=30;//frames per second
  var FRAMEtime;
  var FRAMES=1;
  var INFOshow='loop';
  var IFRAME=1;//???????????????????????????
  var Iheight;//iframe height
  var Iwidth;//iframe width
  var LOOPING=false;
  var LOOPx=0;
  var LOOP;//index of working loop in ARRloops
  var LOOPlast;
  var LOOPstart=0;//in seconds
  var LOOPfinish=0;//in seconds
  var LOOPtype;//once or repeat or seq
  var LOOPpause=2000;//milliseconds of pause
  var LOOPtab=null;//ARRloop[4] where the tab is stored in a string
  var LOOPname="Un-named";//ARRloop[2] where the tab is stored in a string
  var LOOPnote=null;//ARRloop[3] where the tab is stored in a string
  var PLAYERtime=0;//set by the monitor function, time of the UTUBE video
  var MAG=100;//Magnification in percent
  var MODE='Paused...';//mode of the UTUBE PLAYER
  var MODElast;
  var MODEholder;//where commands are placed for the monitor to pick up on the next cycle
  var MONITORcycles=0;
  var NOTIFY="";
  var ONLINE=false;
  var player;//Utube player
  var TIMEOUTloop;
  var TIMEOUTtime;
  var TIMEOUTwait;
  var TIMEOUTtemp;
  var TIMEOUTbtMon;
  var TIMEOUTscroll
  var TIMER;
  var TIMERaction;
  var TABtype;//comp, std
  var UTID='LcOempNj6_g';//You Tube Id (11 char?)used the default here
  var UTtitle;// You Tube Title
  var UTnote;//Utube Note
  var UTback;//uTube backing track with | separating start in seconds
  var VIDx=0;
  var VID;//the index of the video in ARRvideos
  var VIDnote;
  var VIDnew;//indicates a nev video selection so 'cue' the video file

//^CORE YOU TUBE API====================================================DONT MESS WITH THIS
  // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.called by api
  //var player;
  //dragElement(document.getElementById(("tabBar")));//apparentlty you must initiateThis
function saveChanges(op){alert('DEAD')}

function addNewLoop(){
}

function editStatus(state,ids){//updated,new,saved,fresh,changed
  var arr = ids.split(";");
  var col='black';
  var bg='white';
  var j=0;
  //alert(state);
  if (state==='changed') {col='red',bg ='yellow'}
  else if (state==='fresh'|state==='new'|state==='updated'){col='black',bg='white';}
  while(j<arr.length){
    document.getElementById(arr[j]).style.color=col;
    document.getElementById(arr[j]).style.backgroundColor=bg;
    if (state==='new') {document.getElementById(arr[j]).value='';}
    j=j+1;}
    ;}


function protect(){//tries to protect user changes until saved or disgarded  //pristine,pending,edited,saved
    if (pristine,pending,edited,saved==='fresh')       {dis('changeBar','none'); vis('saveButton','hidden');  vis('undoButton','hidden'); vis('updateButton','hidden');}
    else if (state==='changed'){dis('changeBar','block');vis('saveButton','visible'); vis('undoButton','visible');vis('updateButton','visible');}
    else if (state==='new')    {dis('changeBar','block');vis('saveButton','visible'); vis('undoButton','visible');vis('updateButton','hidden');}
    else if (state==='updated'){dis('changeBar','block');vis('saveButton','visible'); vis('undoButton','hidden'); vis('updateButton','hidden');}
    else if (state==='saved')  {dis('changeBar','none'); vis('updateButton','hidden');vis('undoButton','hidden'); vis('saveButton','hidden');}}
//^BOOT ================================================================
window.onload = function(){//downloads and creates ARRcollections makes selector and selects default 
  WINDht = window.innerHeight;
  WINDwt = window.innerWidth;
  NONE =document.getElementById('none').style.display;//*  create object
  statusMsg("Loading Utool javascript...");
  dis('blocker','block');
  //dis('colIndex','block');dis('videoIndex','block');dis('loopIndex','block');//show the indicies
  FILEname="File..." ; COLnote='Loading';
  //why????
  vis('fileNameSpecial','hidden');
  clearTimeout(TIMEOUTtime);
  document.getElementById("msg").style.top='0%';
  MSGlast="...";
  dis('splash','none')
  LOOPtype='none';
  var LOOPstart=0;//in seconds
  LOOPfinish=1;//in seconds
  LOOPpause=2000;//milliseconds of pause
  VIDnew=true;
  if(navigator.onLine) {ONLINE=true;}else{;ONLINE=false;statusMsg("OFF LINE",'red')}
  collectionListGet();};

function collectionListGet(){//creates ARRcollections from server or local
  statusMsg('Downloading Collection List...UtubeUtool.txt');
  //if (EDITEDvideo===true) {
  //  if (confirm('ALL YOUR SAVED CHANGES WILL BE LOST')===false) {
  //    statusMsg('Reload Cancelled !!!','red');
  //  return;}}
  //protect(false);
  //;
  //dis('blocker','none');
  //FILEsource="WEBSITE";
  //COL=0;
  fileDownload3("UtubeUtool.txt","buildColSelector(text)");}
  
function buildColSelector(txt){
  statusMsg("Building Collection Selector")
  txt=txt+"\nNew Collection"
  ARRcollections=txt.split("\n");
  selectorBuild('colIndex',ARRcollections,0);
  //vis('fileNameSpecial','hidden');
  collectionGet(0,0,0)};

function collectionGet(col,vid,loop){//creates ARRcollections from server or local
  VIDx=vid;
  LOOPx=loop;
  dis('blocker','block');
  if (col==ARRcollections.length-1) {
    path="New Collection.txt";
    FILEname="NAME THIS COLLECTION"
    FILEsource="NEW";
    }
  else{
    FILEname=ARRcollections[col];
    statusMsg('Loading File 2: '+FILEname);
    var path="../uTool/"+ FILEname+".txt";
    FILEsource="WEBSITE";}
    //if (EDITEDvideo===true) {
     // if (confirm('ALL YOUR SAVED CHANGES WILL BE LOST')===false) {
     //   statusMsg('Reload Cancelled !!!','red');
      //  return;}}
  //protect(false);
  editStatus('fresh','editFILEname;editCOLnote');
  fileDownload3(path,"buildVideoSelector(text)");}  


function undo(){
  videoGet(VID,LOOP)
  dis('updateBar','none');}
  
  function localCollection(){
    FILEsource="LOCAL";
    VIDx=0;
    LOOPx=0;
    fileGetLocal('buildVideoSelector')}

function buildVideoSelector(txt){
  if (FILEsource==="LOCAL") {//get Local file name
    var str=TEMPlocalFileName;
    FILEname=leftTo(str,".",false,true)}
  vid= VIDx;
  loop=LOOPx;
  if (vid===undefined|isNaN(vid)===true){vid=0}
  statusMsg("Building Video Selector")
  //txt=txt+"\nNew Collection"
  ARRvideos=txt.split("\n");
  COLnote=ARRvideos[0];
  editStatus('fresh','editFILEname;editCOLnote');
  document.getElementById('editFILEname').value=FILEname;
  document.getElementById('editCOLnote').value=COLnote;
  editFILEname=FILEname
  editCOLnote=ARRvideos[0]
  ARRvideos.splice(0,1);//remove note
  var n=1;
  var str='';
  var arr='';
  var str=(ARRvideos[0].split(';')[0]).split('#')[1];//first element
  while(n<ARRvideos.length){
    str=str+("\n"+(ARRvideos[n].split(';')[0]).split('#')[1]);
    n=n+1;}
    var arr=(str.split('\n'));
  selectorBuild('videoIndex',arr,0);
  videoGet(vid,loop)
  };

function videoGet(vid,loop){
  dis('blocker','block');
  statusMsg("Loading video "+vid )
  var temp=ARRvideos[vid].split(';')[0];//alert(temp);
  temp=temp.split('#');
  UTID=temp[0];document.getElementById('editUTID').value=UTID;
  UTtitle= temp[1];document.getElementById('editUTtitle').value=UTtitle;
  UTnote=temp[2];document.getElementById('editUTnote').value=decodeLines(UTnote,'$');
  //BACKTRACKdefault=
  UTback=temp[3];document.getElementById('editUTback').value=UTback;
  dis('videoIndex','block')
  editStatus('fresh','editUTID;editUTtitle;editUTnote;editUTback'); //clear edit colors
  var path ="//www.youtube.com/embed/"+UTID;
  path=path+"?enablejsapi=1";//Works but shows ads;SHORTEST WORKING SOLUTION working solution
  //path=path+'&rel=0';//tried this
  //path=path+'&ytp-pause-overlay=0';//tried this
  //path=path+'&modestbranding=1';
  //path=path+'&amp;showinfo=0?ecver=2';//tried this
  //path=path+'&showinfo=0?ecver=2';//tried this
  //path=path+"&ytp-scroll-min=0&ytp-pause-overlay=0";
  //alert("PATH\n"+path);
  document.getElementById('player').src=path;
  var n=0;
  statusMsg(UTtitle+" > "+UTID+": "+UTnote+" ("+UTback+")")
  VID=vid
  loopsGet(vid)}
  
function loopsGet(vid,loop){//alert(' loopsGet('+loop')');//creates ARRloops
  statusMsg('Loading Loops...');
  var str="";
  ARRloops=ARRvideos[vid].split(';');//zzzzneed to trim it
  ARRloops.splice(0,1);//get rid of UTID and UTtitle
  if (ARRloops.length===0|ARRloops===undefined){//add loop if there are no loops
    loop=0;
    str='2#5#Bogus Loop##';
    ARRloops=str.split(';');}
  mode('Loading...');
  loopSelectorCreate();} 
  
 function loopSelectorCreate(loop){
  statusMsg('Creating Loop Selector...');
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
  selectorBuild('loopIndex',arr,0);
  statusMsg("Selecting Default Loop")
  loopSelect(0,false);}
  
function loopSelect(loop,autoPlay) {//sets the default values of a loop     
  statusMsg('Loop: '+ loop + " AutoPlay: "+autoPlay);
  if (autoPlay===false) {LOOPING=false;}
  LOOPlast=LOOP;
  if (loop>=ARRloops.length){//if you pick a number too high
    if (LOOPtype==='seq') {loop=0;}
    else{loop=ARRloops.length-1;}
    }
  if (loop<=0){loop=0;}//prevents neg loop number
  //document.getElementById('loops').selectedIndex=loop;//align selector to loop
  //document.getElementById('loopTarget').innerHTML=document.getElementById('loops').innerHTML+"<option>--END---</option>";
  //document.getElementById('loopTarget').selectedIndex=loop;
  statusMsg("ydD")
  LOOP=loop;
  LOOPtab=ARRloops[LOOP].split('#')[4];
  LOOPnote=ARRloops[LOOP].split('#')[3];
  if (LOOPnote===undefined) {LOOPnote="-";}
  LOOPname=ARRloops[LOOP].split('#')[2];
  if (LOOPnote===undefined) {LOOPnote="LOOP "+loop;}
  LOOPfinish=ARRloops[LOOP].split('#')[1];
  LOOPstart=ARRloops[LOOP].split('#')[0];
  editStatus('fresh','loopTarget;editLOOPname;editLOOPstart;editLOOPfinish;editLOOPnote;editLOOPtab;stringView');
  document.getElementById('editLOOPname'),value=LOOPname;
  loopSync('start','set',LOOPstart,false);
  loopSync('finish','set',LOOPfinish,false);
  if (LOOPtab.substr(0,1)==="A"){TABtype="comp";}else if(LOOPtab.substr(0,1)==="-"){TABtype="none";}else{TABtype="std";}
  statusMsg("TABtype: "+TABtype);
  if (TABtype==='comp') {
    statusMsg("New style tab (uncompressed)");
    document.getElementById('stringView').value=LOOPtab;
    document.getElementById('tabSmall').value=document.getElementById('editLOOPtab').value=stringToTab(LOOPtab);
    }
  else if(TABtype==='std'){
    notify(LOOPname +" is an old style tab (uncompressed)\nRecommend Updating it...");
    document.getElementById('editLOOPtab').value=LOOPtab.split('$').join('\n');
    document.getElementById('tabView').value=LOOPtab.split('$').join('\n');
    document.getElementById('stringView').value=tabToString(document.getElementById('tabView').value);}
  else if(TABtype==='none'){
    document.getElementById('editLOOPtab').value='-';
    document.getElementById('stringView').value='-';}
  if (LOOPtab.length>2) {vis('buttonTab','visible');}else{vis('buttonTab','hidden');}
  statusMsg("Tab loaded...: "+TABtype);
  document.getElementById('editLOOPnote').value=decodeLines(LOOPnote,'$');
  document.getElementById('editLOOPname').value=LOOPname;
  //document.getElementById('lNote').innerHTML=LOOPname+' (Loop '+parseInt(LOOP+1,10)+')<br>'+LOOPnote.split('$')[0];
  PLAYERtime=0;//set by the monitor   
  document.getElementById('runImg').style.display='none';
  document.getElementById('loopTime').innerHTML="0:00";
  document.getElementById('mag').value="1";
  document.getElementById('rate').value=1;
  infoShow(INFOshow);
  roll()}  
  
/*
  var path ="//www.youtube.com/embed/"+UTID;
  path=path+"?enablejsapi=1";//Works but shows ads;SHORTEST WORKING SOLUTION working solution
  //path=path+'&rel=0';//tried this
  //path=path+'&ytp-pause-overlay=0';//tried this
  //path=path+'&modestbranding=1';
  //path=path+'&amp;showinfo=0?ecver=2';//tried this
  //path=path+'&showinfo=0?ecver=2';//tried this
  //path=path+"&ytp-scroll-min=0&ytp-pause-overlay=0";
  //alert("PATH\n"+path);
  document.getElementById('player').src=path;
  //alert('Video '+vid)
  //alert("VIDEO "+vid+":\n"+ARRvideos[vid])
  var n=0;
  ARRloops=ARRvideos[vid].split(";")
  ARRloops.splice(0,1)
  //alert("ARRloops:\n"+ARRloops.join('\n'));
  var arr=''
    while(n<ARRloops.length){
      arr.splice(n,0,((ARRloops[n].split('#')[2])));
      n=n+1;}
    alert("arr:\n"+arr.join("\n"))
    
    
    
  alert("Verified to here...");////888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
*/ 
//^ON VIDEO READY ROUTINE===============================================
function onPlayerReady(event){
  //if (Xfactor=='clear') {Xfactor='API';statusMsg('API Loaded, waiting on file processing...')}
  //else if (Xfactor=='setup'|Xfactor=='Roll'){Xfactor='clear';statusMsg("Running...");
  //roll()
  statusMsg('--Player Ready--')
  dis('blocker','none');
  }

function getTempo(){
  var d = new Date();
  TEMPOtime=d.getTime();
  if (TEMPOtime -TEMPOtimeLast>2000) {//reset if over 2 sec
    TEMPO=1000; TEMPOcount=0;
    TEMPOtimeLast=TEMPOtime;
    TEMPOstart= TEMPOtime;
    document.getElementById('tempoGetter').innerHTML='TPO';}
  else{  
    TEMPOtime=d.getTime();
    TEMPOcount=TEMPOcount+1;
    TEMPO=parseInt(TEMPOcount/((TEMPOtime-TEMPOstart)/60000),10);
    document.getElementById('tempoGetter').innerHTML=TEMPO;//}
    TEMPOtimeLast=TEMPOtime;} }

function cto(){
  clearTimeout(TIMEOUTscroll);
  clearTimeout(TIMEOUTloop);
  //clearTimeout(TIMEOUTtime);
  //clearTimeout(TIMEOUTwait)
  }

function frameNext(){
  var t=player.getCurrentTime();
  statusMsg("FRAME: "+parseInt(t*FPS,10));
  player.seekTo(t+((1*FRAMES)/FPS));}

function frame(){//fake a frame by frame progression
  TIMEOUTscroll=setTimeout(function(){ //reusing TIMEOUTscroll
    //clearTimeout(TIMEOUTscroll);
    newTime=player.getCurrentTime();
    //var newFrame=parseInt(player.getCurrentTime()*FPS ,10);
    if(FRAMEtime!=newTime){
      FRAMEtime=newTime;
      player.seekTo(newTime+(1/FPS)*FRAMES);
      //FRAME=parseInt(player.getCurrentTime()*FPS ,10);
      statusMsg("FRAME: "+parseInt(player.getCurrentTime()*FPS ,10));}
    frame();},100);}

function transposeNote(note,steps){
  var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab"; 
  var arrScale=scale.split(",");
  var i=12;
  while(arrScale[i]!==note){
    i=i+1;}
  return(arrScale[i+steps]);}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player',{
    height:  '100%',
    width: '100%',
    events:{
      'onReady': onPlayerReady}
      });}

function userBreak(){
 dis('blocker','none'),mode('Paused...');
 statusMsg('USER BREAK','red');}

function bigHdr(form,f,h,max){//form=id;f=formHeight&h=headerHt
  var of=leftTo(document.getElementById(form).style.height,"%",false,true);
  var oh=leftTo(document.getElementById(form+'Hdr').style.height,"%",false,true);
  if(of-f===0){
    document.getElementById(form+'Hdr').style.height='100%';
    document.getElementById(form+'Body').style.height='0%';
    document.getElementById(form).style.height=((h/100)*f)+"%";}
  else{
    document.getElementById(form+'Hdr').style.height=h+'%';
    document.getElementById(form+'Body').style.height=parseInt(100-h,10)+'%';
    document.getElementById(form).style.height=f+'%';
    if (max===true){
      document.getElementById(form).style.height='100%';
      document.getElementById(form).style.width='100%';}}}

function transposeTab(tabStr,steps){
  var msg="";
  var ele;
  var newStr='';
  var key;
  var bars;
  var div;
  var chr;
  var arr;//divide by '@'
  var wire; //inc.split('|')
  var move; //wire.split(':')[1]
  arr=tabStr.split('@');
  //alert(arr[4]);
  key=arr[0];
  bars=arr[1];
  div=arr[2];
  chr=arr[3];
  var eleLen;
  //alert(newStr);
  for (n=4;n<=arr.length-1;n++){
    if (arr[n].length>0) { 
      wire=arr[n].split('|');
      for (w=0;w<=wire.length-1;w++){
        move=wire[w].split(":");
        if (w>0){newStr=newStr+'|';}
        newStr=newStr+move[0]+':';
        eleLen=0;
        for (i=0;i<=move[1].length-1;i++){
          if(isNaN(move[1].substr(i,1))===true){
            ele=move[1].substr(i,1);
            }
        else if(isNaN(move[1].substr(i,2))===false){
            ele=parseInt(parseInt(move[1].substr(i,2),10)+parseInt(steps,10),10);
            i=i+1;}
        else{
          ele=parseInt(parseInt(move[1].substr(i,1),10)+parseInt(steps,10),10);}
        if (ele<0|ele>=23) {alert('TOO BAD\nYou Ran our of Fretboard!');return;}
        //alert("length ele: "+ ele.toString().length);
        eleLen=parseInt(eleLen+ ele.toString().length,10);
        //alert("length eleLen: "+eleLen);
        if (eleLen>=chr) {
          msg=msg+'- Expanded Tab';
          chr=eleLen+1;}
        newStr=newStr+ele;}
        }
      newStr=newStr+'@';}
      else if(n<arr.length-1){
        newStr=newStr+'@';
      }
    }
  key = transposeNote(key,steps);
  newStr=key+'@'+bars+'@'+div+'@'+chr+'@'+newStr;
  document.getElementById('stringView').value=newStr;
  document.getElementById('editLOOPtab').value=stringToTab(newStr);
  statusMsg('Transposed '+steps+ " Key(s) to "+key+"  "+msg); }

function addBarToTab(){
  var x;
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//update String
  var str=document.getElementById('stringView').value;
  x=str.split('@');
  x=x[2]*x[1];
  for(j=0;j<x;j++){str=str+"@";}
  document.getElementById('stringView').value=str;
  document.getElementById('editLOOPtab').value=stringToTab(str);}
  
function tabResize(){
  //alert(document.getElementById('tabSmall').style.fontSize);
  if (document.getElementById('tabBar').style.height==='15%'){  
    document.getElementById('tabBar').style.height='25%';
    document.getElementById('tabSmall').style.fontSize='3.25vh';}
  else{
    document.getElementById('tabBar').style.height='15%';
    document.getElementById('tabSmall').style.fontSize='1.75vh';}}

function removeBar(){
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//update String
  document.getElementById('editLOOPtab').value=stringToTab(document.getElementById('stringView').value);//update String
  //alert("The Program just re-wrote your tab using the compression code...,plase check for errors");
  var tabArr=document.getElementById('editLOOPtab').value.split('\n');
  var strArr=document.getElementById('stringView').value.split('@');
  var newLen=tabArr[1].length-(strArr[1]*strArr[2]*strArr[3]+1);
  alert(tabArr[1].length+">>"+ newLen);
  for(j=0;j<tabArr.length;j++){
    tabArr[j]=tabArr[j].substr(0,newLen);}
  document.getElementById('editLOOPtab').value=tabArr.join('\n'); }

function expandTab(z){
  var newSpace;
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//update String
  var str=document.getElementById('stringView').value;
  x=str.split('@');
  newSpace=parseInt(x[3],10)+parseInt(z,10);
  x.splice(3,1,newSpace);
  str=x.join('@');
  document.getElementById('stringView').value=str;
  document.getElementById('editLOOPtab').value=stringToTab(str);}

function notify(str){
  NOTIFY="NOTIFY:\n"+(str)+"\n";
  dis('notifyBar','block');}
  
function notifyClear(){  
  alert(NOTIFY);
  NOTIFY="";
  dis('notifyBar','none');}

function infoShow(typ){
  INFOshow=typ;
  var disp;
  var col;
  var bg;
  var str =typ.toUpperCase() + ' INFO...';
  if (typ==='loop') {disp=document.getElementById('editLOOPnote').value;col='white';bg='black';}
  else if (typ==='video'){disp=document.getElementById('editUTnote').value;col='pink';bg='black';}
  else if (typ==='file'){disp=document.getElementById('editCOLnote').value;col='yellow';bg='black';}
  else if (typ==='tab'){
    document.getElementById('infoNote').style.overflowY='hidden';
    disp=stringToTab(LOOPtab);
    col='black';bg='white';
    document.getElementById('infoType').style.color=col;}
  document.getElementById('infoNote').value=disp;
  document.getElementById('infoNote').style.color=col;
  document.getElementById('infoNote').style.backgroundColor=bg;
  document.getElementById('infoType').style.color=col;
  document.getElementById('infoType').innerHTML=str;
  if (col==='black') {document.getElementById('infoType').style.color='white';}}
  
function loopSync(sf,type,val,edit){//sf=start/finish  type=delta/set  edit=true/false
  //Keeps the editLoop, LOOP and loop synchronized
  var n="LOOP"+sf;
  var e='editLOOP'+sf;
  var b="loop"+sf;
  if (type=='delta'){
    window[n]=parseInt(parseInt(window[n],10)+val,10);}
  else{
    window[n]=parseInt(parseInt(val,10),10);}
  document.getElementById(e).value=window[n];
  document.getElementById(b).value=secToMin(window[n]);
  if (edit===true){
    document.getElementById(e).style.color='red';
    document.getElementById(e).style.backgroundColor='yellow';}}

function update(zone){alert('crap');
  var arr;
  if (zone ==='file') { arr=('FILEname;COLnote').split(';');}
  else if (zone ==='video') {arr=('UTID;UTtitle;UTback;UTnote').split(';');}
  else if (zone ==='loop') {arr=('LOOPname;LOOPtab;LOOPnote;LOOPstart;LOOPfinish').split(';');}//alert(LOOPname+'\n'+LOOPnote+'\n'+LOOPtab);
  else{return;}
  //protect(true);
  var j=0;
  while(j<arr.length){
    window[arr[j]]=window['edit'+arr[j]].value;
    document.getElementById('edit'+arr[j]).style.color='black';
    document.getElementById('edit'+arr[j]).style.backgroundColor='lightgreen';
    j=j+1;}}

function roll(){
  statusMsg("Loaded Collection File...")
  //dis('blocker','none');
  DUR=player.getDuration();//why here, whay not at video select? allow more time???
    document.getElementById('slider1').max=DUR;
    document.getElementById('slider1').value=0;
    timeMon(); //start the monitor of time
    if (VIDnew===true) {VIDnew=false;mode('Loading First Loop...');}
    else{mode('Cueing Loop...');}}

//^MONITOR==============================================================
function mode(M){MODEholder=M;}

function timeMon(){ //The timing engine with trigger points and command receptor            
  clearTimeout(TIMEOUTtime);
  MONITORcycles=MONITORcycles+1;
  var d = new Date();
  CLOCKtime = d.getTime();//= new Date().getTime();//(clock time)
  PLAYERtime=parseInt(player.getCurrentTime(),10);// alert(PLAYERtime);
  document.getElementById('loopTime').innerHTML=secToMin(PLAYERtime);
  document.getElementById('slider1').value=PLAYERtime;
  TIMEOUTtime=setTimeout(function(){
    if(1==2){alert('TIME MONITOR FAILURE');}
    else if (CLOCKtime>=TIMER & TIMER!==0){TIMER=0; mode(TIMERaction); TIMERaction=undefined;}
    else if (MODE=='Loading First Loop...'& PLAYERtime>0 ){mode('Cueing Loop...');}
    else if (MODE=='Cueing Loop...'& PLAYERtime===LOOPstart){
      if (LOOPING===false) {mode('Ready...');}
      else{mode('Looping...');}}
    else if (MODE=='Looping...'& PLAYERtime>=LOOPfinish){
     if(LOOPtype=='once'|LOOPtype=='none'){
       mode('Resetting...');}
     else{
       mode('Delay...');}}
    else if (MODE=='Advancing...'& LOOPlast!=LOOP){mode('Cueing Loop...');}
    else if (MODE=='Zeroing Video...'& PLAYERtime===0){mode('Ready...');} 
    else if (MODE=='Resetting...'& PLAYERtime===LOOPstart){mode('Ready...');}   
    if(MODEholder!==undefined){
      MODE=MODEholder;
      MONITORcycles=0;
      if (MODE=='Loading First Loop...'){
        cto();
        player.mute();
        player.playVideo();}
      else if(MODE=='Cueing Loop...'){
        player.unMute();
        player.pauseVideo();
        player.seekTo(LOOPstart); //alert(player.getCurrentTime()) ;
        dis('runImg','none'); }//
      else if (MODE=='Ready...'){
        player.pauseVideo();
        dis('loopStopper','none');
        dis('runImg','none');
        TIMER=0;
        TIMERAction=undefined;
        MODEholder=undefined;
        cto();//??????
        dis('blocker','none');}//dis('footer','block');
      else if (MODE=='Playing...'){
        player.playVideo();
        dis('loopStopper','none');
        dis('runImg','block');
        TIMER=0;
        TIMERAction=undefined;
        cto();}
      else if(MODE=='Looping...'){
        cto();
        player.playVideo();
        dis('runImg','none');
        dis('loopStopper','block');}
      else if (MODE=='Advancing...'){
        loopSelect(parseInt(LOOP,10)+1);
        loopIndex.selectedIndex=LOOP
        }
      else if (MODE=='Pause...'){
        player.pauseVideo();
        dis('loopStopper','none');
        dis('runImg','none');      }  
      else if (MODE=='Resetting...'){
        player.pauseVideo();
        dis('loopStopper','none');
        dis('runImg','none');
        player.seekTo(LOOPstart);}
      else if (MODE=='Zeroing Video...'){
        player.pauseVideo();
        dis('loopStopper','none');
        dis('runImg','none');
        player.seekTo(0);}
      else if(MODE=='Delay...'){
        TIMER=parseInt(document.getElementById('pause').value,10) +parseInt(CLOCKtime,10);
        player.pauseVideo();
        if (LOOPtype=='seq') {
          TIMERaction="Advancing...";}//}
        else if (LOOPtype=='repeat') {
          TIMERaction="Cueing Loop...";}//}
        else{mode('Ready...');}}}
    MODEholder=undefined;
    if(MODElast!=MODE) {statusMsg(MODE);}
    MODElast=MODE;
    timeMon();    
    },50);}

//^CONTROL FUNCTIONS
//function btSpeedSet(){//backtrack Speed
  //var speed=document.querySelector('input[name="bSpeed"]:checked').value;
  //player2.setPlaybackRate(speed);}

//dragElement============================================================
  //dragElement(document.getElementById(("backTrackBar")));//apparenlty you must initiateThis
  dragElement(document.getElementById(("noteBar")));//apparenlty you must initiateThis
  dragElement(document.getElementById(("devBar")));//apparenlty you must initiateThis
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
      document.onmousemove = null;
      }
  }
//End of CORE FOR YOU TUBE API==========================================
//^STRING TYPE FUNCTIONS
function encodeLines(str,splitter){
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

//^NAVIGATION FUNCTIONS
function barSelect(bar,msg){//chooses one of the control bars
  var disName=breakStrAtCaps(bar).join(' ');
  //statusMsg(disName + " Selected...");
  var arrBar="rotateBar,noteBar,helpBar,loopBar,videoBar,fileEditBar,tabBar".split(",");
  var j=0;  var ctrl;
  while (j<arrBar.length){   
    if (msg===undefined) {msg="---";}
    ctrl =arrBar[j];
    if (bar==ctrl){dis(ctrl);}
    else{dis(ctrl,'none');}
    j = j+1;}
  var r= document.getElementById(bar).style.display;
  if (bar!=="none"){
    if (r=='block') {statusMsg((disName+ " Opened...").toUpperCase());}
    else{statusMsg((dispName+ " Closed...").toUpperCase());}    //code
    }
  else{statusMsg("Ready");}}

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

function rotateDegrees(id,deg){
  DEGREES=parseInt(DEGREES+deg,10);
  if (DEGREES<0) {DEGREES=parseInt(360+DEGREES,10);}
  if (DEGREES>=360){DEGREES=parseInt(DEGREES-360,10);}
  document.getElementById(id).style.webkitTransform = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.mozTransform    = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.msTransform     = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.oTransform      = 'rotate('+DEGREES+'deg)';
  document.getElementById(id).style.transform       = 'rotate('+DEGREES+'deg)';
  document.getElementById('arc').innerHTML=DEGREES+"<br>FLIP";}

//^GOING GLOBAL????=====================================================
function selectorBuild(id,arr,sel){//probably going global
  if (sel===undefined|sel===null|sel==='') {sel=0;}
  var i=0;var str='';
  while (i<arr.length){
    str=str+"<option value="+i+">"+arr[i]+"</option>";
    i=i+1;}
  document.getElementById(id).innerHTML=str;
  document.getElementById(id).selectedIndex=sel;
  statusMsg("Selector "+id+" Built, "+sel+" Selected")
  }

//^   ARRAY Functions
function moveArrElement(arr,from,to){//test 1 to 3
  if (to==from) {return;}
  var ele=(window[arr])[from];
  if (from<to) {
    window[arr].splice(to,0,ele);//put from in to
    window[arr].splice(from,1);}//remove the orriginal
  else{
    window[arr].splice(to,0,ele);//put it
    window[arr].splice(from+1,1);}}
  
//NAVIGATION============================================================
function loopStart(type){
  cto();
  LOOPtype=type;
  LOOPING=true;
  if (LOOPtype=='repeat'){document.getElementById('loopStopper').style.left="45%";mode('Cueing Loop...');}
  else if (LOOPtype=='once'){document.getElementById('loopStopper').style.left="55%";mode('Cueing Loop...');}
  else if (LOOPtype=='seq'){document.getElementById('loopStopper').style.left="65%";mode('Cueing Loop...');}
  else if (LOOPtype=='none'){mode('Ready...');}}
  
function loopSetStart(sec){
  var newStart;
  if (sec===undefined) {newStart=parseInt(player.getCurrentTime(),10);}
  else {newStart=parseInt(parseInt(LOOPstart,10)+parseInt(sec,10),10);}
  if (newStart<0|newStart>=DUR-1){newStart=0;}
  LOOPstart=newStart;
  document.getElementById('loopstart').value=secToMin(LOOPstart);
  if (LOOPstart>=LOOPfinish){
    LOOPfinish=LOOPstart+1;
    document.getElementById('loopfinish').value=secToMin(LOOPfinish);
    document.getElementById('editLOOPfinish').value=LOOPfinish;}}

function loopSetFin(delta){
  var newFin=parseInt(DUR,10);
  if(delta===undefined|delta===0) {newFin=parseInt(player.getCurrentTime(),10);}
  else {newFin=parseInt(parseInt(LOOPfinish,10)+parseInt(delta,10),10);}
  if (newFin<=1|newFin>=parseInt(DUR-1,10)){newFin=parseInt(parseInt(LOOPstart,10)+1,10);statusMsg('????');}
  document.getElementById('editLOOPfinish').value=LOOPfinish=newFin;//alert(LOOPfinish)
  document.getElementById('loopfinish').value=secToMin(LOOPfinish);
  if (LOOPstart>=LOOPfinish){LOOPstart=LOOPfinish-1;
  document.getElementById('loopstart').value=secToMin(LOOPstart);}}
  
function sizeFrame(mag){//sizes the video
  MAG=mag*100;
  document.getElementById('player').style.width =MAG+"%";
  document.getElementById('player').style.height =MAG+"%";}

///function cto(){//clears timeouts
 // clearTimeout(TIMEOUTloop);}

//^EDIT=================================================================
//^ GlobalEdit functions
function newFile(){//creates a new file to be saved by the user
  //var id= prompt('Enter the 13 digit uTube ID','nKJWfVHk5FY')
  var a=ARRcollections.length-1
  document.getElementById('colIndex').selectedIndex=a;
  FILEsource='NEW';
  collectionGet(a);
  /*
  statusMsg('New File Template Loading...');
  editStatus('changed','editCOLnote;editFILEname');
  document.getElementById('editCOLnote').value='Rename and edit this! Save it to your Drive after editing it';
  document.getElementById('editFILEname').value='MY NEW FILE';

  editStatus('changed','editUTtitle;editUTID;editUTnote;editUTback');
  document.getElementById('editUTtitle').value='VIDEO TITLE';
  document.getElementById('editUTID').value=id
  document.getElementById('editUTback').value='Back Track ID'
  document.getElementById('editUTnote').value='Back Track Note'
  
  editStatus('changed','editUTtitle;editUTID;editUTnote;editUTback');
  document.getElementById('editUTtitle').value='VIDEO TITLE';
  document.getElementById('editUTID').value=id;
  document.getElementById('editUTback').value='Back Track ID'
  document.getElementById('editUTnote').value='Back Track Note'  
  */
  //dis('blocker','block');
  //FILEsource="NEW";
  //ARRvideos="nveEtVqYyvw#BOGUS VIDEO#PLEASE RENAME AND REPLACE VIDEO#a3HZ8S2H-GQ;1#5#LOOP A#PUT YOUR LOOP NOTE HERE#|----|----|----|".split('\n');
  //mode('Loading...');
  //document.getElementById('fileNameSpecial').innerHTML=FILEname;
  //vis('fileNameSpecial','visible');
  //videoSelectorCreate(0,0);
  //statusMsg(1)
  //dis('blocker','none')
  }





function closeEditBars(){
  var arrBar="fileEditBar,loopBar,videoBar,tabBuilder,".split(",");
  var j=0;  var ctrl;
  while (j<arrBar.length){
    ctrl=arrBar[j];
    dis(ctrl,'none');
    j = j+1;}}
    


function editorRefresh(){//refreshes the editBars as soon as the info is available
  //document.getElementById('editFileName').value=FILEname;
  //document.getElementById('editHeader').innerHTML=COLname;
  //document.getElementById('editHeader').innerHTML="SOURCE: "+FILEsource;
  //document.getElementById('editLoopName').value=LOOPname;
  //document.getElementById('editUTID').value=UTID;
  //document.getElementById('editUTtitle').value=UTtitle;
  //document.getElementById('editUTnote').value=decodeLines(UTnote,'$');
  //document.getElementById('editUTback').value=UTback;
  }  
  
//^     FILE Edit functions
function fileUpdate() {statusMsg('Updating file properties');
  FILEname=editFILEname.value;
  COLnote=encodeLines(document.getElementById('editCOLnote').value,";");
  editStatus('updated','editCOLnote;editFILEname');
  statusMsg('When you SAVE this file it will have the new file note and title');}

//^     LOOP Edit functions
function prepNewLoop(){
  document.getElementById('newLoopPosition').innerHTML= document.getElementById('loops').innerHTML;
   document.getElementById('newLoopPosition').selectedIndex=LOOP;
  document.getElementById('newLoopTitle').value="My New Loop";
  dis('loopBar','block');}

function newLoop(){
ARRloops.splice(LOOP,0,"1#7#NEW LOOP#Added By User$Edit it it#A@4@2@6@@@@@@@@") 
alert(ARRloops.split('/n'))
vidUpdate()
//protect(true);
};

function loopDelete(loop){//Deletes specified loop
  if (ARRloops.length==1){
     alert('Thats your only loop! You change it but not delete it..'); }
  else{
    if (confirm("Do you want to DELETE: "+ARRloops[LOOP].split('#')[2])===false){return;}
    //protect(true);
    ARRloops.splice(loop,1);//remove your loop
    loopsToVid();
    loopSelectorCreate(loop);
    statusMsg('Deleted Loop '+loop+ ' in '+UTtitle);
    barSelect();}
  }

//^     VIDEO Edit functions
function deleteVideo(){//deletes current video
  if (ARRvideos.length==1) {
    alert('You can\'t delete your only video.. Delete the entire file...');
    return;}
  else{
    if (confirm("WARNING!!!\n\nDeleting Video: "+UTtitle+"\nFrom File: "+ FILEname+ "\nwill DELETE ALL its Associated Loops!\n\nContinue?")===true) {
      //protect(true);
      ARRvideos.splice(VID,1);
      var open=0;
      if (VID>1) {open=parseInt(VID-1,10);}
      videoSelectorCreate(open);
      barSelect();
      statusMsg("Deleted Video "+UTtitle);}
    }
  }

  
  

function vidUpdate(){
  var currentVid=VID
  statusMsg('Update Video: '+editUTtitle.value+'   Loop '+LOOP+': '+editLOOPname.value );
  //next 4 steps are if the loop is to move...Do that before moving the video
  //var loopFrom=document.getElementById('loops').selectedIndex;
  //var loopTo=document.getElementById('loopTarget').selectedIndex;
  //var vidFrom=document.getElementById('videos').selectedIndex;
  //var vidTo=document.getElementById('videoTarget').selectedIndex;
  //get the rest of the data
  var str;
  var s=LOOPstart;
  var f=LOOPfinish;
  var n=document.getElementById('editLOOPnote').value;
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//make sure string is up to date
  var t=document.getElementById('stringView').value;
  var nam=document.getElementById('editLOOPname').value;
  var vi=document.getElementById('editUTID').value;//
  var vn=document.getElementById('editUTtitle').value;
  var vb=document.getElementById('editUTback').value;
  var vo=document.getElementById('editUTnote').value;
  statusMsg('Update Data collected');
  //protect(true);
  vo=encodeLines(vo,'$');
  n=encodeLines(n,'$');
  //t=encodeLines(t,'$');  
  clearTimeout(TIMEOUTtime);statusMsg('Cleared TIMEOUTtime');
  str=s+"#"+f+'#'+nam+'#'+n+'#'+t;//loop properties
  ARRloops.splice(LOOP,1,str);//replace the loop with new values
  //moveArrElement('ARRloops',loopFrom,loopTo);
  str = vi+"#"+vn+"#"+vo+"#"+vb+";"+ARRloops.join(";");//append the video info to the  loops
  statusMsg("Replacing Video "+VID+" ("+ARRvideos[VID].length+" char) with " +str.length+" char string...")
  ARRvideos.splice(VID,1,str);statusMsg('A-3');//replace the VID with new values
  ARRvideos.splice(0,0,document.getElementById('editCOLnote').value)
  //moveArrElement('ARRvideos',vidFrom,vidTo);
  //if (vidFrom<vidTo) {VID=parseInt(vidTo-1,10);}else{VID=vidTo;}
  //if (loopFrom<loopTo) {LOOP=parseInt(loopTo-1,10);}else{LOOP=loopTo;}
  var txt= ARRvideos.join('\n');
  buildVideoSelector(txt)
  dis('updateBar','none');
  FILEstate='saved'
  //protect()}

function prepNewVideo(){
  statusMsg('in');
  document.getElementById('newVideoPosition').innerHTML= document.getElementById('videos').innerHTML;
  document.getElementById('newVideoPosition').selectedIndex=VID;
  document.getElementById('newVideoTitle').value="My New Video";
  dis('videoBar','block');}

function newVideo(){statusMsg('vidBar to open');
  var title=document.getElementById('newVideoTitle').value;
  var pos =document.getElementById('newVideoPosition').value;
  var id =document.getElementById('newVideoId').value;
  pos=parseInt(pos,10)+1;
  statusMsg('New Video  #'+pos);
  var str="1#5#LOOP A#Auto Created Loop#-";
  clearTimeout(TIMEOUTtime);
  str = id+"#"+title+"#User Created Loop#;"+str;
  statusMsg(str);
  ARRvideos.splice(pos,0,str);
  statusMsg("Inserted Video: " +title+' as video #'+pos);
  //protect(true);
  videoSelectorCreate(pos,0);
  barSelect();} 

function saveVideoFile(){
  if (confirm('REMEMBER\nCheck that the file was saved!')===true){
    statusMsg('USER was tasked to Save File: '+FILEname);
    //protect(false);
    ARRvideos.splice(0,0,COLnote.split('\n').join(';'));
    FILEstate='saved';
    fileSaveTextAs(FILEname+'.txt',ARRvideos.join('\n'));}}
  


function loadUTID(VID){//loads a specified new utube video
  var str =prompt("Paste your YouTube URL here...", "https://www.youtube.com/watch?v=Fd7BrjdTnrg");
  id= uTubeGetId(str);
  str=id+"#"+prompt("Choose a name for your video?","My New Video");
  str=str+'#1#5#Dummy Loop';
  //protect(true);
  ARRvideos.splice(VID,0,str);//alert(ARRvideos.join("\n"));
  videoSelectorCreate(VID,0);
  barSelect();}

function loopsToVid(){//takes the ARRloops and puts it on the Current Video ARRvid[VID]
  //protect(true);
  var str=UTID+'#'+UTtitle+'#'+UTnote+'#'+UTback+';'+ARRloops.join(';');
  ARRvideos.splice(VID,1,str);}
  
//^DEVELOPER Functions==============================================
function logAction(action){
  ARRlog.splice(0,0,MODE+'-'+CLOCKtime);
  if (ARRlog.length>=31) {ARRlog.splice(31,1);}
  }
function monitorStatus(args) {
  var str="MONITOR STATUS\n";
  str=str+"Last Action: "+MODE;
  str=str+"\nCycles Ago:"+MONITORcycles;
  str=str+"\nPending Event:"+TIMERaction;
  str=str+"\n==============================\n";
  str=str+ARRlog.join('\n');
  alert (str);}

function help(hdr,txt){
  var theData;
  if(hdr===undefined){hdr='HELP SCREEN',txt="Select a Topic from the Left Hand List...";}
  if(txt===undefined){theData=fileDownload3("../help/"+hdr+".txt","document.getElementById('helpBody').innerHTML=text"),"alert('Damn, we Crashed...')"}
  document.getElementById('helpHdr').innerHTML=hdr;
  //document.getElementById('helpBody').innerHTML=theData;
  }

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

//^TAB Functions=======================================================
/*note on format
*/

function tabToString(tab){//add the Key later
  if (tab==='-'|tab===null|tab===' '|tab.length<20){
    return('-')}
  else{
    tab=tab.split("\n").join('$');
    var key='A';
    var count;
    var div ;//(div per count)
    var str;
    var add;
    var x=3;//ignore firs 3chr of tab[0] '*|1'
    while (tab.substr(x,1)==='.'){x=x+1;}//count '|' and '.' until '&' or '2' gives your chr per div
    chr=(x-2); //determine chrs
    var bpb=(tab.split('|')[1].length)/chr; //beats/bar
    var nds =tab.split('|')[1].split('&').length-1; //& per bar
    count=bpb-nds;
    div=bpb/count;
    var bars=tab.split('$')[1].split('|').length-1;
    var ele=(count*div*(bars-1)); //number of elements or clicks
    var loopTab=tab.split("|").join('');//get rid of '|'
    var crap= loopTab.length-1;
    if (loopTab.substr(crap)==='$') {loopTab=loopTab.substr(0,loopTab.length-2);}
    var arrTab= loopTab.split("$");
    //alert("KEY; "+key+"\nCOUNT; "+count+"\nBARS; "+bars+"\nDIV; "+div+"\nCHR; "+chr);
    x=1;//ignore line 1
    //alert("arrTab.length: "+arrTab.length);
    while (x<arrTab.length) {//remove string designation E-A-d etc
      arrTab[x]=arrTab[x].substr(1,arrTab[x].length-1);
      x=x+1;}
    str='$';
    x=0;
    while (x<ele){
      str=str+'$';
      x=x+1;}
      //arrPlay=str.split('$');alert(arrPlay.join('\n'));//this is the Array to Play
    x=1;
    var arrPlay =''.split('|');
    arrPlay.splice(0,1,'');
    while(x<ele){
      arrPlay.splice(0,0,'');
      x=x+1;}
    var y=1;
    while (y<arrTab.length){
      //alert(y +"of"+arrTab.length);
      x=0;
      while (x<ele){//while less that total divisions
        add=arrTab[y].substr(x*chr,chr);
        if(add.substr(0,1)!='-') {
          if (arrPlay[x].length<1){
            add=y+":"+add;}
          else {
            add=arrPlay[x]+"|"+y+":"+add;}
          arrPlay[x]=add;
          }
        x=x+1;}
      y=y+1;}
      str=arrPlay.join('@');
      str=str.split(' ').join('');
      str=key+'@'+count+'@'+div+'@'+chr+'@'+str;
    return(str);} }  

function stringToTab(str){
  var out=('*|,e|,B|,G|,D|,A|,E|').split(',');
  pos=0;//position
  //var lineA="";
  var bar;
  var arr=str.split('@');
  var key=arr[0];//strip the key data points
  var count=arr[1];
  var div = arr[2];
  var chr = arr[3];
  var space="-";
  var play="";
  var clk;
  var dots="";
  var notes;
  for(a=1;a<chr;a++){space=space+" ";dots=dots+".";}//get space
  arr.splice(0,4);//get rid of info string
  bar=count*div;
  var r=1;
  for(j=0;j<arr.length;j++){//build line 1
    out[0]=out[0]+r +dots;
    for(q=1;q<div;q++){
      if (j<arr.length-1){
        out[0]=out[0]+"&" +dots;
        j=j+1;}}
    if(r>=count){r=1;out[0]=out[0]+"|";}else{r=r+1;}}
  for(a=1;a<7;a++){
    for(j=0;j<arr.length;j++){
      play=space;
      if (arr[j]!==undefined & arr[j]!=="") {//valid click
        clk=arr[j].split("|");          //alert (clk);
        for(w=0;w<clk.length;w++){
          notes=clk[w].split(':');
          if (notes[0]==a){
            play=notes[1];
            while(play.length<chr){play=play+" ";}}}}
      out[a]= out[a]+play;
      if((j+1)/bar===parseInt((j+1)/bar,10)){out[a]=out[a]+"|";}}} 
  return (out.join('\n'));}  

function tabCompress(){//add the Key later
  var tab=LOOPtab;
  var key='A';
  var count;
  var div ;//(div per count)
  var str;
  var add;
  var x=3;//ignore firs 3chr of tab[0] '*|1'
  while (tab.substr(x,1)==='.'){x=x+1;}//count '|' and '.' until '&' or '2' gives your chr per div
  chr=(x-2); //determine chrs
  var bpb=(tab.split('|')[1].length)/chr; //beats/bar
  var nds =tab.split('|')[1].split('&').length-1; //& per bar
  count=bpb-nds;
  div=bpb/count;//calculate div
  var bars=tab.split('$')[1].split('|').length-1;
  var ele=(count*div*(bars-1)); //number of elements or clicks
  var loopTab=tab.split("|").join('');//get rid of '|'
  var crap= loopTab.length-1;
  //alert(loopTab.substr(crap));
  if (loopTab.substr(crap)==='$') {loopTab=loopTab.substr(0,loopTab.length-2);}
  var arrTab= loopTab.split("$");
  //alert("KEY; "+key+"\nCOUNT; "+count+"\nBARS; "+bars+"\nDIV; "+div+"\nCHR; "+chr);
  x=1;//ignore line 1
  //alert("arrTab.length: "+arrTab.length);
  while (x<arrTab.length) {//remove string designation E-A-d etc
    arrTab[x]=arrTab[x].substr(1,arrTab[x].length-1);
    x=x+1;}
  str='$';
  x=0;
  while (x<ele){
    str=str+'$';
    x=x+1;}
    //arrPlay=str.split('$');alert(arrPlay.join('\n'));//this is the Array to Play
  x=1;
  var arrPlay =''.split('|');
  arrPlay.splice(0,1,'');
  while(x<ele){
    arrPlay.splice(0,0,'');
    x=x+1;}
  var y=1;
  while (y<arrTab.length){
    //alert(y +"of"+arrTab.length);
    x=0;
    while (x<ele){//while less that total divisions
      add=arrTab[y].substr(x*chr,chr);
      if(add.substr(0,1)!='-') {
        if (arrPlay[x].length<1){
          add=y+":"+add;}
        else {
          add=arrPlay[x]+"|"+y+";"+add;}
        arrPlay[x]=add;}
      x=x+1;}
    y=y+1;}
    str=arrPlay.join('@');
    str=str.split(' ').join('');
    //alert(str);
    str=key+'@'+count+'@'+div+'@'+chr+'@'+str;
    tabDecompress(str);}

function tabDecompress(str){
  var out=('*|,e|,B|,G|,D|,A|,E|').split(',');
  pos=0;//position
  var bar;
  var arr=str.split('@');
  var key=arr[0];//strip the key data points
  var count=arr[1];
  var div = arr[2];
  var chr = arr[3];
  var space="-";
  var play="";
  var clk;
  var notes;
  var barCheck;
  for(a=1;a<chr;a++){space=space+" ";}//get space
  arr.splice(0,4);//get rid of info string
  alert("TAB DECOMPRESS IS DEPRICATED\n"+arr.join('@'));
  bar=count*div;
  alert("Length: "+arr.length);
  var strng="";
  for(a=1;a<7;a++){
    for(j=0;j<arr.length+1;j++){
      play=space;
      if (arr[j]!==undefined & arr[j]!=="") {//valid click
        clk=arr[j].split("|");          //alert (clk);
        for(w=0;w<clk.length;w++){
          notes=clk[w].split(';');
          //alert("PLAY :"+play + "\nPOSITION\nSTRING: "+a+"\nBAR: "+b+"\nCLICK: "+c+"\narr["+pos+"]:"+arr[pos]+"\nnotes[0]:"+notes[0]+"\nnotes[1]:"+notes[1]);
          //alert(a +" " +notes[0]+"  "+notes[1])
          if (notes[0]==a){
            play=notes[1];
            while(play.length<chr){play=play+" ";}}}}
      out[a]= out[a]+play;
      if((j+1)/bar===parseInt((j+1)/bar,10)){out[a]=out[a]+"|";}}} 
  document.getElementById('editLOOPtab').value=out.join('\n');}  
/*
function ZZZaddTabSpace(){
  var n;
  var str=document.getElementById('editLOOPtab').value;
  n=str.replace(/\.\.\.\.\.\.\.\./g,'XXXXXXXXX');
  n=n.replace(/\.\.\.\.\.\.\./g,'XXXXXXXX');
  n=n.replace(/\.\.\.\.\.\./g,'XXXXXXX');
  n=n.replace(/\.\.\.\.\./g,'XXXXXX');
  n=n.replace(/\.\.\.\./g,'XXXXX');
  n=n.replace(/\.\.\./g,'XXXX');
  n=n.replace(/\.\./g,'XXX');
  n=n.replace(/\./g,'XX');
  document.getElementById('editLOOPtab').value=n;
  n=n.replace(/X/g,".");
  //alert('half');
  document.getElementById('editLOOPtab').value=n;
  n=n.replace(/\ \ \ \ \ \ \ \ /g,'XXXXXXXXX');
  n=n.replace(/\ \ \ \ \ \ \ /g,'XXXXXXXX');
  n=n.replace(/\ \ \ \ \ \ /g,'XXXXXXX');
  n=n.replace(/\ \ \ \ \ /g,'XXXXXX');
  n=n.replace(/\ \ \ \ /g,'XXXXX');
  n=n.replace(/\ \ \ /g,'XXXX');
  n=n.replace(/\ \ /g,'XXX');
  n=n.replace(/\ /g,'XX');
  document.getElementById('editLOOPtab').value=n;
  n=n.replace(/X/g,' ' );
  document.getElementById('editLOOPtab').value=n;
  }
*/

function tabNew(){
  var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  var bar=document.getElementById('bars').value;
  var bea=document.getElementById('beat').value;
  var div=document.getElementById('divs').value;
  var spa=document.getElementById('chrs').value;
  var tab=tabSkeleton(bar,bea,div,spa);
  document.getElementById('editLOOPtab').value=tab;}
  
function tabSkeleton(bar,count,div,chr){
  var tab='';
  var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  var lin ="";
  var s=' ';
  var d='';
  var b="|";
  var lin2='*|';
  var s2='.';
  var d2='&';
  var b2 ='|';
  var i=1;
  while (i<chr-1){//create space block
    s=s+' ';
    s2=s2+'.';
    i=i+1;}
  i=1;
  d=s;
  d2=s2;
  while (i<div){ //create div block
    d=s+"-"+d;
    d2=s2+'&'+d2;
    i=i+1;}
  i=count;
  while (i>0){//create beat block
    b='-'+d+b;
    b2=i+d2+b2;
    i=i-1;}
  i=1;
  while (i<=bar){
    lin=lin+b;
    lin2=lin2+b2;
    i=i+1;}
  i=0;
  while (i<6){
    tab=tab+ arrStrings[i]+lin+'\n';
    i=i+1;}
  tab =lin2+'\n'+tab;
  return(tab);}

/*^Notes to Self
Use the following as 'spliters in a file from now on  1=\n 2=; 3=Dont know yet
*/
//^FILE MAP ===========================================================
/*FILE= uTool.txt is a list of file names with no extension The file names become ARRcollections
FILE utool.txt.this is used to select files
    Collection.split(\n)
Characters used as dividers.
level 0 (the whole file

level 1  \n  (first line is a NOTE)
level 2  ;   separates first line into LOOP info{ ;[0]} and videos{;[1>n]}   
level 3  #   separates loop level items
level 4  $   used as a line separator
level 5  :   used in tabs and notes      |
Collection File============================================================       
      [0] =COLnote  (lines split by ; # encoded 'HASHTAG' to prevent split)
      [1]>>[n]= ARRvideos (with COLnote striped the ARRvidos is now just videos)
          ARRvideos is finalize by removing original ARRvideos[0]
          ARRvideos.split[;]
Video File============================================================
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
  >                   [1]LOOPstop  44
  >                   [2]LOOPtitle LOOP A
  >                   [3]LOOPnote  General BS
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


//^LINEAR MAP ===========================================================
UTUBE SECTION---------------------------------------------------;LOOP SECTION 1--------------------------------------------------;LOOP SECTION 2>n
UTID-------#UTtitle------#UTnote------------#UTback-------------;Loop------------------------------------------------------------;
                                            #BTID       |st |stp;st-#stp#title-#note-------$-------#Tab String-------------------;
                                            #           |   |   ;              #           $       #                             ;
AderSEdd13h#Rock and Roll#Lots of rock stuff#2rt78io0plk|340|360;300#330#Lick 1#Play at 1>4$usually#A@4@2@6@1:8b10@@1:8b9@@1:5@@@;


^TRASH===============================================================
function videosLocal(){//processes local video file (used with FileGetLocal)
  var n=document.getElementById('fileInput').value;
  FILEname=leftTo(leftTo(n,"\\",false,false),'.',false,true);
  document.getElementById('fileName').innerHTML=FILEname;
  //protect(false);
  vis('fileName','visible');
  FILEsource='LOCAL';
  LOCAL=true;
  ARRvideos=TEMP.split('\n');
  videoSelectorCreate(0,0);
  }
=======================================================================*/  