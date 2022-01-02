//^PROBLEMS;
  /*must KILL looping when switching tracksPut a developers version of statusMsg
    When changing Video go to lick 1 LOOP
    When deleting Loop go to loop 1
    
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
  var FILEupdated=0;
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
  var LOOP=0;//index of working loop in ARRloops
  var LOOPlast;
  var LOOPedit='editUTID;editUTtitle;editUTnote;editUTback'.split(";");
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
  var PLAYERready=false;//make sure video is loaded
  //var SORT=null;
  //var SORTtag;
  var SORTlen;
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
  var VID=0;//the index of the video in ARRvideos
  var VIDedit='editLOOPname;editLOOPstart;editLOOPfinish;editLOOPnote;editLOOPtab;stringView'.split(';');
  var VIDnote;
  var VIDnew;//indicates a neW video selection so 'cue' the video file

//^CORE YOU TUBE API====================================================DONT MESS WITH THIS
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.called by api

function onPlayerReady(event){
  PLAYERready=true;
  statusMsg('--Player Ready--')
  dis('blocker','none');}

function onYouTubeIframeAPIReady() {
  //alert('onYouTubeIframeAPIReady()');
  player = new YT.Player('player',{
    height:  '10%',
    width: '100%',
    events:{
      'onReady': onPlayerReady}
      });}

//^New Functions ====================================================
function saveChanges(op){alert('DEAD')}
function addNewLoop(){}
function anVL(proc,vid,loop){//this is a debug process to see if video and loop match the global variable
  var ln= '===== V/v: ' +VID+'/'+vid+'  L/l: '+LOOP+'/'+loop+'  '+ proc
  return ln;}
function jumpVid(inc){
  var t=player.getCurrentTime();
  var n;
  if (inc>0) {n=parseInt(t+(DUR-t)*inc);}
  else{n=parseInt((1+inc)*t)}
  player.seekTo(n)}
function clearData(arr){
  for(w=0;w<=arr.length-1;w++){document.getElementById(arr[w]).value="";}
  setFileState('changed');}

function setSort(arr,splitter,no,banner,arrName){
  //loopSelect(0)
  statusMsg('Click on an list element to select it...','yellow')
  document.getElementById('sortBanner').innerHTML=banner;
  dis('sorter','block')
  var nme=""; var block=""
  document.getElementById('sortLen').value=arr.length;
  for (w=0;w<document.getElementById('sortLen').value;w++){
    nme=arr[w].split(splitter)[no];
    var id="s"+w;var nid=('n'+w)
    block=block+"<div class='sort' id='"+id+"' onclick=\"tagSort(this.id)\" style=\"top:"+ w*5+"vh;\">"+nme+"</div>"
    block=block+"<div class='sortNo' id='"+nid+"' style=\"top:"+ w*5+"vh;\">"+w+"</div>"
  document.getElementById('sortList').innerHTML=block;}; }

function tagSort(id){
  //alert("TAG "+ id+'\n'+document.getElementById('n'+id).value);
  var chk=""
  for (w=0;w<=document.getElementById('sortLen').value-1;w++){
    chk='s'+w;
  document.getElementById(chk).style.backgroundColor='lightgrey';}
  document.getElementById(id).style.backgroundColor='yellow';
  LOOP=
  document.getElementById('sortTag').value=id.substring(1)
  alert(id)
  loopSelect(id.substring(1),false);}

function sort(dir){
  var temp;var to;var sortTag=document.getElementById('sortTag').value;//alert(sortTag)
      to= (parseInt(sortTag,10) + parseInt(dir,10))
    if(to<0){statusMsg("You tried move off the TOP of the list,'red'");return}
    if(to>SORTlen-1){statusMsg("You tried move off the BOTTOM of the list",'red');return}
    statusMsg("A--Moving item "+ sortTag+ ">>"+dir)
    var x = document.getElementById("s"+sortTag).innerHTML;
    var y = document.getElementById("n"+sortTag).innerHTML;
    document.getElementById("s"+sortTag).innerHTML =document.getElementById("s"+to).innerHTML;
    document.getElementById("n"+sortTag).innerHTML = document.getElementById("n"+to).innerHTML;
    document.getElementById("s"+to).innerHTML=x;
    document.getElementById("n"+to).innerHTML=y;
    sortTag=to;
    tagSort("s"+to)
    statusMsg("Moved item "+ sortTag);}

function sortSave(){
  //for (x=0;x<ARRloops.length;x++){
  //  if (document.getElementById('n'+x).innerHTML==LOOP){LOOP=x;}}//get loop info to correspond
  statusMsg("Saving you're Sort to ");
  var arrTemp=[];
  var arr=ARRloops
  var oldPos;
  for (n=0;n<(arr.length);n++){
    oldPos=document.getElementById('n'+n).innerHTML
    arrTemp.splice(n,0,arr[oldPos]);}       
  alert(n)
  alert(arrTemp.join('\n'))
  ARRloops=arrTemp;
  vidUpdate()}

        












//next 3 functionsshould be obsolete

var move = function(array, element, delta) {
  var index = array.indexOf(element);
  var newIndex = index + delta;
  if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
  var indexes = [index, newIndex].sort((a, b) => a - b);
  //var indexes = [index, newIndex].sort(); //Sort the indixes
  array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
};

var moveUp = function(array, element) {
  move(array, element, -1);
};

var moveDown = function(array, element) {
  move(array, element, 1);
};


function setSortVid(){
  var nme=""; var block=""
  for (w=0;w<=ARRvideos.length-1;w++){
    nme=ARRvideos[w].split('#')[1];
    block=block+"<div class='sort' style=\"top:"+ w*5  +"vh;\">"; 
    if(w>0){block=block+"<img class='sortUp' src='../../icons/transArrowUp.png' onclick=\"insertAndShiftVid(ARRvideos,"+w+","+ parseInt(w-1)+"),setSortVid()\">"};
    if(w<ARRvideos.length-1){block=block+"<img class='sortDn' src='../../icons/transArrowDown.png' onclick=\"insertAndShiftVid(ARRvideos,"+w+","+ parseInt(w+1)+"),setSortVid()\">"};
    block=block+"<div style=\"position:absolute;left:25%\">"+nme+"</div></div>";}
  document.getElementById('sortList').innerHTML=block;
  dis('blocker','none')
  }


function undo(){
  setFileState('undo')
  videoGet(VID,LOOP);}  //if(FILEupdated>0){setFileState('updated');}

function editStatus(state,ids){//updated,new,saved,fresh,changed
  var arr = ids.split(";");
  var col='black'; var bg='white';
  var j=0;
  if (state==='changed'){
    col='red',bg ='yellow';}
  while(j<arr.length){
    document.getElementById(arr[j]).style.color=col;
    document.getElementById(arr[j]).style.backgroundColor=bg;
    j=j+1;}  
  if (state==='changed'){setFileState('changed');};}

function setFileState(state){
  var msg="???"; var wBar ="45%"; wBan="70%"
  if (state==='fresh'){dis('changeBar','none'); vis('saveButton','hidden');  vis('undoButton','hidden'); vis('updateButton','hidden');
    msg="Pristine File Loaded"}
  else if (state==='pristine'){dis('changeBar','none');vis('saveButton','hidden');  vis('undoButton','hidden'); vis('updateButton','hidden');
    msg="Pristine File Loaded"}
  else if (state==='undo') {dis('changeBar','block');vis('saveButton','visible'); vis('undoButton','hidden');vis('updateButton','hidden');
    msg="CHANGE<br>UNDONE<br>SAVE FILE?";
    wBar="15%",wBan="60%";}
  else if (state==='changed') {dis('changeBar','block');vis('saveButton','hidden'); vis('undoButton','visible');vis('updateButton','visible');
    msg="You have made changes to the Working File<br>Update the Working file or Undo the changes<br>Previous Updates Cannot be Undone!";}
  else if (state==='new')     {dis('changeBar','none');vis('saveButton','visible'); vis('undoButton','visible');vis('updateButton','hidden');
    msg="You have started a new Work File, Update and Save";}
  else if (state==='updated') {dis('changeBar','block');vis('saveButton','visible'); vis('undoButton','hidden'); vis('updateButton','hidden');
    msg= "WORKFILE<br>UPDATED<br>SAVE FILE?";
    wBar="15%",wBan="60%";}
  else if (state==='saved')   {dis('changeBar','none'); vis('updateButton','hidden');vis('undoButton','hidden'); vis('saveButton','hidden');
    msg="HOPEFULLY you successfully saved the Working File"}
  FILEstate=state;
  document.getElementById('changeBar').style.width = wBar;
  document.getElementById('changeBanner').style.width = wBan;
  document.getElementById('changeBanner').innerHTML=msg;
  statusMsg("FILE STATE="+FILEstate);}

function vidUpdate(){
  dis('blocker','block');//alert('blocker');
  statusMsg('Update Video: '+editUTtitle.value+'   Loop '+LOOP+': '+editLOOPname.value );
  var str;
  clearTimeout(TIMEOUTtime);
  statusMsg('Evaluating Loop changes...');
//get the loop info
  var ls=LOOPstart;
  var lf=LOOPfinish;
  var ln=document.getElementById('editLOOPnote').value;
  ln=encodeLines(ln,'$');
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//make sure string is up to date
  var ltb=document.getElementById('stringView').value;
  var lt=document.getElementById('editLOOPname').value;
  statusMsg('Formatting Loop...');
  str=ls+"#"+lf+'#'+lt+'#'+ln+'#'+ltb;//loop properties
  ARRloops.splice(LOOP,1,str);//replace the loop with new values
statusMsg('Gathering Video Changes...');
//Get the Video info and encode
  var vi=document.getElementById('editUTID').value;//
  var vt=document.getElementById('editUTtitle').value;
  var vb=document.getElementById('editUTback').value;
  var vn=document.getElementById('editUTnote').value;
  vn=encodeLines(vn,'$');
  //n=encodeLines(n,'$');
  statusMsg('Formatting Video...');
  str = vi+"#"+vt+"#"+vn+"#"+vb+";"+ARRloops.join(";");//append loops to the video info
  statusMsg("Updating video " + VID)
  ARRvideos.splice(VID,1,str);statusMsg('A-3');//replace the VID with new values
  //var txt= encodeLines(document.getElementById('editCOLnote').value,'$');
  //ARRvideos.splice(0,0,txt,'$')
  var txt= ARRvideos.join('\n');
  FILEupdated=FILEupdated +1;
  setFileState('updated');
  txt = document.getElementById('editCOLnote').value+'\n'+txt;
  buildVideoSelector(txt)
  //videoSelectorCreate(VID,LOOP);
  statusMsg("Video "+ VID+ " updated... NOT SAVED!!!")}
  
function saveVideoFile(){
  if (confirm('REMEMBER\nCheck that the file was saved!')===true){
    statusMsg('USER was tasked to Save File: '+FILEname);
    setFileState('saved')
    //protect(false);
    ARRvideos.splice(0,0,COLnote.split('\n').join(';'));
    fileSaveTextAs(FILEname+'.txt',ARRvideos.join('\n'));}}

//^BOOT ================================================================
window.onload = function(){//downloads and creates ARRcollections makes selector and selects default 
  
  WINDht = window.innerHeight;
  WINDwt = window.innerWidth;
  NONE =document.getElementById('none').style.display;//*  create object from Global Routes
  statusMsg("Loading Utool javascript...");
  dis('blocker','block');
  dis('splash','none')
  FILEname="File" ; COLnote='Loading';
  clearTimeout(TIMEOUTtime);
  document.getElementById("msg").style.top='0%';
  MSGlast="...";
  LOOP=0;
  LOOPtype='none';//set Global Variables
  LOOPstart=0;//in seconds
  LOOPfinish=1;//in seconds
  LOOPpause=2000;//milliseconds of pause
  VIDnew=true;
  VID=0;
  if(navigator.onLine) {ONLINE=true;}else{;ONLINE=false;statusMsg("You are OFF LINE.  Use a local server...",'red')}
  collectionListGet();};

function collectionListGet(){//creates ARRcollections from server or local
  statusMsg('Downloading Collection List...UtubeUtool.txt');
  fileDownload3("UtubeUtool.txt","buildColSelector(text)");}
  
function buildColSelector(txt){
  statusMsg("Building Collection Selector")
  txt=txt+"\nNew Collection"
  ARRcollections=txt.split("\n");
  selectorBuild('colIndex',ARRcollections,0);
  collectionGet(0,0,0)};

function collectionGet(col,vid,loop){//creates ARRcollections from server or local
  VID=vid;
  LOOP=loop;
  COL=col;
  statusMsg(anVL('buildColSelector',VID,LOOP))
  dis('blocker','block');
  if (col==ARRcollections.length-1) {
    path="New Collection.txt";
    FILEname="NAME THIS COLLECTION"
    FILEsource="NEW";}
  else{
    FILEname=ARRcollections[col];
    statusMsg('Loading File 2: '+FILEname);
    var path="../uTool/"+ FILEname+".txt";
    FILEsource="WEBSITE";}
  editStatus('fresh','editFILEname;editCOLnote');
  fileDownload4(path,"buildVideoSelector(text)");}  

function localCollection(){//ONLY USED TO MANUALLY GET A COLLECTION
  //statusMsg(anVL('localCollection()',vid,loop))
  FILEsource="LOCAL";
  COL="10000";//strawman for loading a local file
  VID=0;
  LOOP=0;
  fileGetLocal('buildVideoSelector(TEMP)');}

function buildVideoSelector(txt){//pass the entire collection file to this routine
  if (FILEsource==="LOCAL") {//get Local file name
    var str=TEMPlocalFileName;
    FILEname=leftTo(str,".",false,true);
    document.getElementById('localFileName').innerHTML="Local File<br>"+FILEname+".txt";
    dis('localFileName','block');}
  vid= VID;//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX why cant I delete this????????????????????
  statusMsg("Building Video Selector");
  ARRvideos=txt.split("\n");//split your string into the array
  COLnote=ARRvideos[0];//Notes are first line of the file
  document.getElementById('editCOLnote').value=COLnote; //strip the note
  ARRvideos.splice(0,1);//remove note IMPORTANT TO REMEMBER inclued it in the pass from previous routine
  editStatus('fresh','editFILEname;editCOLnote');
  document.getElementById('editFILEname').value=FILEname;
  var str='';
  var arr='';
  for(n=0;n<ARRvideos.length;n++){
    str=str+(ARRvideos[n].split(';')[0]).split('#')[1]+"\n";}
  str=str.substring(0,str.length-1)//strip the last '\n'
  alert(str)
  arr=(str.split('\n'));
  selectorBuild('videoIndex',arr,VID);
  videoGet(VID,LOOP);};

function videoGet(vid,loop){
  VID=vid;LOOP=loop
  dis('blocker','block');
  statusMsg("Loading video "+vid )
  var temp=ARRvideos[VID].split(';')[0];//alert(temp);
  temp=temp.split('#');
  UTID=temp[0];document.getElementById('editUTID').value=UTID;
  UTtitle= temp[1];document.getElementById('editUTtitle').value=UTtitle;
  UTnote=temp[2];document.getElementById('editUTnote').value=decodeLines(UTnote,'$');
  UTback=temp[3];document.getElementById('editUTback').value=UTback;
  dis('videoIndex','block')
  editStatus('fresh','editUTID;editUTtitle;editUTnote;editUTback');
  editStatus('fresh','editFILEname;editCOLnote');//clear edit colors
  var path ="//www.youtube.com/embed/"+UTID;
  path=path+"?enablejsapi=1";//Works but shows ads;SHORTEST WORKING SOLUTION working solution
  path=path+'&rel=0';//tried this
  //path=path+'&ytp-pause-overlay=0';//tried this
  //path=path+'&modestbranding=1';
  //path=path+'&amp;showinfo=0?ecver=2';//tried this
  //path=path+'&showinfo=0?ecver=2';//tried this
  //path=path+"&ytp-scroll-min=0&ytp-pause-overlay=0";
  //alert("PATH\n"+path);
  PLAYERready=false;
  document.getElementById('player').src=path;
  var n=0;
  statusMsg(UTtitle+" > "+UTID+": "+UTnote+" ("+UTback+")")
  loopsGet(VID,LOOP)}
  
function loopsGet(vid,loop){//alert(' loopsGet('+loop')');//creates ARRloops
  //VID=vid;LOOP=loop
  statusMsg('Loading Loops...');
  //statusMsg(anVL('loopsGet',vid,loop))
  var str="";
  ARRloops=ARRvideos[vid].split(';');//zzzzneed to trim it
  ARRloops.splice(0,1);//get rid of UTID and UTtitle
  if (ARRloops.length===0|ARRloops===undefined){//add loop if there are no loops
    LOOP=0;
    str='2#5#Bogus Loop##';
    ARRloops=str.split(';');}
  mode('Loading...');
  loopSelectorCreate(LOOP);} 
  
function loopSelectorCreate(loop){
  alert('loading loop '+loop)
  LOOP=loop;
  statusMsg('Creating Loop Selector...');
  statusMsg(anVL('loopSelectorCreate',vid,loop))
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
  loopSelect(loop,false);}
  
function loopSelect(loop,autoPlay) {//sets the default values of a loop     
  if (PLAYERready===false) {statusMsg('shit')}
  statusMsg('Loop: '+ loop + " AutoPlay: "+autoPlay);
  document.getElementById('loopIndex').selectedIndex=loop;
  statusMsg(anVL('loopSelect()',vid,loop))
  if (autoPlay===false) {LOOPING=false;}
  LOOPlast=LOOP;
  if (loop>=ARRloops.length){//if you pick a number too high
    if (LOOPtype==='seq') {loop=0;}
    else{loop=ARRloops.length-1;}}
  if (loop<=0){loop=0;}//prevents neg loop number
  LOOP=loop;
  LOOPtab=ARRloops[LOOP].split('#')[4];
  LOOPnote=ARRloops[LOOP].split('#')[3];
  if (LOOPnote===undefined) {LOOPnote="-";}
  LOOPname=ARRloops[LOOP].split('#')[2];
  if (LOOPnote===undefined) {LOOPnote="LOOP "+loop;}
  LOOPfinish=ARRloops[LOOP].split('#')[1];
  LOOPstart=ARRloops[LOOP].split('#')[0];
  editStatus('fresh','editLOOPname;editLOOPstart;editLOOPfinish;editLOOPnote;editLOOPtab;stringView');
  document.getElementById('editLOOPname'),value=LOOPname;
  loopSync('start','set',LOOPstart,false);
  loopSync('finish','set',LOOPfinish,false);
  if (LOOPtab.substr(0,1)==="A"){//??????Dont know what this does
    document.getElementById('stringView').value=LOOPtab;
    document.getElementById('tabSmall').value=document.getElementById('editLOOPtab').value=stringToTab(LOOPtab);}
  else if(TABtype==='none'){
    document.getElementById('editLOOPtab').value='-';
    document.getElementById('stringView').value='-';}
  if (LOOPtab.length>2) {vis('buttonTab','visible');}else{vis('buttonTab','hidden');}
  statusMsg("Tab processed...");
  document.getElementById('editLOOPnote').value=decodeLines(LOOPnote,'$');
  document.getElementById('editLOOPname').value=LOOPname;
  //document.getElementById('lNote').innerHTML=LOOPname+' (Loop '+parseInt(LOOP+1,10)+')<br>'+LOOPnote.split('$')[0];
  PLAYERtime=0;//set by the monitor   
  document.getElementById('runImg').style.display='none';
  document.getElementById('loopTime').innerHTML="0:00";
  document.getElementById('mag').value="1";
  document.getElementById('rate').value=1;
  infoShow(INFOshow);
  statusMsg(anVL('DONE',vid,loop));
  timeMon(); 
  statusMsg("Rolling...")
  dis('blocker','none');
  DUR=player.getDuration();//why here, whay not at video select? allow more time???
  document.getElementById('slider1').max=DUR;
  document.getElementById('slider1').value=0;
  if (PLAYERready==false) {mode('Loading First Loop...');}
  else{mode('Cueing Loop...');};}

//^MONITOR==============================================================
function mode(M){  MODEholder=M;}
 
function timeMon(){ //The timing engine with trigger points and command receptor            
  clearTimeout(TIMEOUTtime);
  //MONITORcycles=MONITORcycles+1;//SEEMS USELESS ROUTE IT OUt
  var d = new Date();
  CLOCKtime = d.getTime();//= new Date().getTime();//(clock time)
  PLAYERtime=parseInt(player.getCurrentTime(),10);// alert(PLAYERtime);
  document.getElementById('loopTime').innerHTML=secToMin(PLAYERtime);
  document.getElementById('slider1').value=PLAYERtime;
  TIMEOUTtime=setTimeout(function(){
    if(CLOCKtime===undefined){alert('TIME MONITOR FAILURE');}//MAY BE USELESS
      else if (CLOCKtime>=TIMER & TIMER!==0){TIMER=0; mode(TIMERaction); TIMERaction=undefined;}//Timer Event is Triggered in place of the current MODE
      else if (MODE=='Loading First Loop...' ){statusMsg("B-1");player.pauseVideo();LOOPING=false; player.seekTo(LOOPstart);mode('Cueing Video...');}//Start Loading first Loop
      else if (MODE=='Cueing Video...'& PLAYERtime==LOOPstart& PLAYERready===true){player.playVideo();statusMsg("B-2");mode('Cueing Loop...')}//If mode='Cueing Video...",player is ready and needle is on LOOPstlart cue the loop
      else if (MODE=='Cueing Loop...'& PLAYERtime===LOOPstart & PLAYERready===true){
        if (LOOPING===false) {statusMsg("B-3");mode('Ready...');}
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
          dis('runImg','none'); }
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
          loopIndex.selectedIndex=LOOP}
        else if (MODE=='Pause...'){
          player.pauseVideo();
          dis('loopStopper','none');
          dis('runImg','none');}  
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
            TIMERaction="Advancing...";}
          else if (LOOPtype=='repeat') {
            TIMERaction="Cueing Loop...";}
          else{mode('Ready...');}}}
    MODEholder=undefined;
    if(MODElast!=MODE) {statusMsg(MODE);}
    MODElast=MODE;
    timeMon();    
    },50);}

function transposeNote(note,steps){
  var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab"; 
  var arrScale=scale.split(",");
  var i=12;
  while(arrScale[i]!==note){
    i=i+1;}
  return(arrScale[i+steps]);}

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
    setFileState('changed')
    document.getElementById(e).style.color='red';
    document.getElementById(e).style.backgroundColor='yellow';}}

function update(zone){alert('crap');
  var arr;
  if (zone ==='file') { arr=('FILEname;COLnote').split(';');}
  else if (zone ==='video') {arr=('UTID;UTtitle;UTback;UTnote').split(';');}
  else if (zone ==='loop') {arr=('LOOPname;LOOPtab;LOOPnote;LOOPstart;LOOPfinish').split(';');}//alert(LOOPname+'\n'+LOOPnote+'\n'+LOOPtab);
  else{return;}
  protect(true);
  var j=0;
  while(j<arr.length){
    window[arr[j]]=window['edit'+arr[j]].value;
    document.getElementById('edit'+arr[j]).style.color='black';
    document.getElementById('edit'+arr[j]).style.backgroundColor='lightgreen';
    j=j+1;}}


//^CONTROL FUNCTIONS===============================================

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
    TEMPOtimeLast=TEMPOtime;}}
/*dragElement============================================================
  //dragElement(document.getElementById(("noteBar")));//apparenlty you must initiateThis
  //dragElement(document.getElementById(("devBar")));//apparenlty you must initiateThis
 
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
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    }
}
*/

//^STRING TYPE FUNCTIONS========================================================================
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

function cto(){
  clearTimeout(TIMEOUTscroll);
  clearTimeout(TIMEOUTloop);}
  
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
function selectorBuild(id,arr,sel){//builds a selectore 
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
    document.getElementById('editLOOPfinish').value=LOOPfinish;}
  alert('A');
  FILEstate='changed';}

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


//^EDIT=================================================================
//^ GlobalEdit functions

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

function newFile(){//creates a new file to be saved by the user
  //var id= prompt('Enter the 13 digit uTube ID','nKJWfVHk5FY')
  var a=ARRcollections.length-1
  document.getElementById('colIndex').selectedIndex=a;
  FILEsource='NEW';
  setFileState('new');
  collectionGet(a,0,0);}

//^LOOP Edit functions===============================================================================================

function prepNewLoop(){
  document.getElementById('newLoopPosition').innerHTML= document.getElementById('loops').innerHTML;
   document.getElementById('newLoopPosition').selectedIndex=LOOP;
  document.getElementById('newLoopTitle').value="My New Loop";
  dis('loopBar','block');}

function loopDelete(loop){//Deletes specified loop
  if (ARRloops.length==1){
     alert('Thats your only loop! You change it but not delete it..'); }
  else{
    if (confirm("Do you want to DELETE: "+ARRloops[LOOP].split('#')[2])===false){return;}
    protect(true);
    ARRloops.splice(loop,1);//remove your loop
    loopsToVid();
    loopSelectorCreate(loop-1);
    statusMsg('Deleted Loop '+loop+ ' in '+UTtitle);
       barSelect();}
  }

//^VIDEO Edit functions=========================================================================================================
function deleteVideo(){//deletes current video
  if (ARRvideos.length==1) {
    alert('You can\'t delete your only video.. Delete the entire file...');
    return;}
  else{
    if (confirm("WARNING!!!\n\nDeleting Video: "+UTtitle+"\nFrom File: "+ FILEname+ "\nwill DELETE ALL its Associated Loops!\n\nContinue?")===true) {
      //dis('blocker','block');
      LOOP=0;
      statusMsg('Deleting Video '+VID)
      ARRvideos.splice(VID,1);
      var str=ARRvideos.join('\n')
      str=document.getElementById('editCOLnote').value+"\n"+str;
      setFileState('updated');
      VID=0;
      buildVideoSelector(str);};};}

function newVideo(){
  if (FILEstate=='changed') {statusMsg("Save your changes before adding a new Video",'red');return;}
  statusMsg('Appending new Video');
  var title= prompt("Title of your new Video", "Cat Guitar");
  var id =prompt("uTube ID of your new Video", "kIenOQoK1LY");
  var str=ARRvideos.join('\n');
  str=encodeLines(document.getElementById('editCOLnote').value)+"\n"+str
  str=str+"\n"+id+"#"+title+"#User Created Loop#;1#5#Meow 1#Auto Created Loop#-"
  setFileState('updated');
  VID=ARRvideos.length;
  LOOP=0
  alert("VIDEO: "+VID+" LOOP: "+LOOP+"====="+str)
  buildVideoSelector(str);}

//^LOOP Edit functions=========================================================================================================  

function newLoop(){
  if (FILEstate=='changed') {statusMsg("Save your changes before adding a new Loop",'red');return;}
  statusMsg('New Loop...')
  ARRvideos[VID]=ARRvideos[VID]+";1#7#NEW LOOP#Added By User$Edit it#A@4@2@6@@@@@@@@"; 
  LOOP=ARRloops.length;
  //setFileState('changed')//;LOOP=loop
  loopsGet(VID,LOOP)};  

function deleteLoop(){
  if (ARRloops.length==1) {statusMsg("You cant delete your only loop! Edit it or delete the video.",'red');return;}
  if (confirm("WARNING!!!\n\nDeleting Loop "+(LOOP+1)+"  From Video: "+ UTtitle )===true) {
      statusMsg('Deleting Loop '+(LOOP+1));}
  ARRloops.splice(LOOP,1)//took the loop out
  alert(ARRloops.join('\n'))
  var str= ARRloops.join(';')//Make the string of loops
  str=document.getElementById('editCOLnote').value.split('\n').join('$')+'\n'+ARRvideos[VID].split(';')[0]+";"+str;//add the video info to the string
  alert(str);
  ARRvideos[VID]=str;
  LOOP=0;
  alert(ARRvideos.join('\n'));
  buildVideoSelector(ARRvideos.join('\n'));}

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
  var str=UTID+'#'+UTtitle+'#'+UTnote+'#'+UTback+';'+ARRloops.join(';');
  ARRvideos.splice(VID,1,str);}
  
//^DEVELOPER Functions==============================================

function logAction(action){
  ARRlog.splice(0,0,MODE+'-'+CLOCKtime);
  if (ARRlog.length>=31) {ARRlog.splice(31,1);}
  }

function zzzzzzmonitorStatus(args) {
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
=======================================================================*/  