    var REV ="5.2"//this revision
    var JSname="5-2.js"//java script file
//TO RELEASE Javascript file(ex as rev 7.4)
//  Save this file as this file as "Player7-4.js" and Change first two lines of file as shown below
//  var REV ="7.4"
//  var JSname="Player7-4.js"
    var JSdate;

//* FLAGS  ======================================================================================
    var ALT=false;//^ does alternate song exist
    var AUDfail=false;
    var AUDend=false;
    var BOOT=true;//^ designates first boot
    var NASH= false;//Nashville notation
    var NOTESpresent= false;//^ indicates that notes will be available on another page
    var SCROLLend=false;//^ indicates end of scroll
    var SETnoteViewed=false;
    var Yend=false;//^end of scroll
//*PROGRAM and SONG VARS//===========================================================================
    var ARRtitle;//XXXXXXX
    var ARRsoundModes=("SILENT/nBACK TRACK/nCLICK TRACK/nVOCAL/nDRUM ROCK/nDRUM COUNTRY/nDRUM COUNT").split("/n");
    var DUR=120;//^ Duration for scrolling and calculating
    var DURsource='Default';//^ string where the program got the duration
    var DURcalc=0;//^ Calculated duration based on Bars/Beats/time signature
    var DURmp3=0;//^ used on scroll(default=  DURfile, DURcalc, DURmp3, User Input)
    var KEYlast='C';
    var KEYbase="X";//^ anchor for changeing keys on the fly
    var PREVtitle;//previous Title
    var LINElimit=90
    var LONGLINE=40;
    var MIRROR=0;
    var TRANSPOSE=0;//^ how many 1/2 steps to tranpose
    var SOUNDmodeDefault="SILENT";
    var SOUNDmode="SILENT";
    var SOUNDicon="transSilent.png";
    var TUNEnum=0;//^ Tune Number in setlist
    var VOL=(0.50);//^ absolute volume (0>1)
    var VOLexp=2;//^ exponant applied to VOL
    //var SONGlastCustom=0;//0=Key,1=Tempo,2=Sound used for one time customizing song Key, Tempo, Track
    var WARNING= "No Warnings!"
//* SONG DATA AND PROPERTIES (passed)==================================================
    var RAWtune;//tune as read from file
    var ARTIST="Unknown";
    var ARRlines="";//^ Array of lines from text file
    var BARS=0;
    var BARSperLine;
    var BEATS=4;//^ Beats/bar
    var BPM=100;//Default
    var DURtext=0;//^ duration from the text file
    var GENRE="Unknown";
    var HITyear= "Unknown";
    var IRB;//^ the IRB line set during format of the page
    var KEY="C";//Default
    var QUAL='Raw';//^ song quality
    var STARS=1;
    var STYLE="Unknown";
    var TITLE="Unknown";//^ song title being played
    var TITLEplus="unknown";//^ used to pass info from a playlist i.e @Hallelluia/C#/70/BACK TRACK/starts
    var NOTEset;
    var NOTEtrivia;
    var NOTEtech;
    var NOTElinks;
//* SCROLLdata CONSTANTS   ==============================================================
    var TOPlast;
    var SS=0;//Scroll Stopper...counts cylces of non scroll indicating end of tune
    var FONTSIZE= 2.5;//calculated size for the display 
    var CHORDlines=0;//^ how many lines are chord lines
    var PRESONGlines=0;//^ how many lines of text exist before first chord line
    var SCROLLbase;//^ Original SCROLLkon used to change scroll speed on the fly
    var SCROLLkon=0.01;// microseconds per pixel
    var SCROLLpix;//^ ScrollPixels from height of document;
    var SCROLLstartTime=0;//^ when scroll started, used to regulate scroll
    var Ypos=0;//^ Yposition of the scroll 0 being the top
    var Ystart=0;//^ where Y is when you start the scroll
//* TIMEOUT CONSTANTS=========================================================KKK
    var TIMEOUTblink;//^time for blinking display
    var TIMEOUTcrap;//^ do not clear this one
    var TIMEOUTdelay;//^ trackDelay delay the start of???
    var TIMEOUTfade;//^fade the sound
    var TIMEOUTintro=100;
    var TIMEOUTnext; //^ for next tune
    var TIMEOUTscroll;//^ timeout function for scrolling
    var TIMEOUTmirror;
    var TIMEOUTwait; //Wait after scroll end before showing top Icons title etc
//* CONFIGURATION===================================================KKK
    var AUTOnext= false;
    var BACKdrop=false;
    var BIGchords=false;
    var BIGchordSize=1.00;
    var BREAKlines=false;
    var CAPS=true;
    var CLOCK=false;
    var CLOCKstart=0;
    var CLOCKstop=0;
    var CLICKER=false;//clicks during startup
    var COUNTin=false;//visible countdown during startup    
    var COUNTloops=0;
    var COUNTlimit=1
    var FULLscreen=false;
    var HILITE=false;
    var KARAOKE=false;
    var LEFTborder=false;
    var LINEnum=false;//^ show line numbers
    var LINEtime=false;//^ show min sec instead of line num
    var LINKnotes=false;
    var NOTES=false;
    var POPnotes=false;
    var SHADE=false;//shade the screen
    var SOUND=true;
    var SETnotes=false;
    var TEXT=false;//reduce text size
    var TRIVIAnotes=false;
    var TECHnotes=false;
//* MISC CONSTANTS==========================================
    var ARRscale="A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab".split(",");
    var ARRsongSettings;
    var MSGlast="NO MESSAGE!";
    var RAT=0.7; //^ Ratio WINDht/WINDwt
    var SETlist="X";//^ Array of songs in setlist
    var SETname="Single Tune";//^ default in case a list cannot be loaded
    //var TRACKicon="";
    var WINDht;//px window height
    var WINDwt;//px window width
//*INWORK LOOP VARIABLES===========================================================AAA
    var PAUSEpoint=0;//scrollTop of Tune when the tune stops scrolling
    var LOOPER=false;
    var LOOPtop=0;
    var LOOPend=100000;
    var LOOPmode='played once';
//*REQUIRED TO LOG Status Mssages,See Developer Section
    //var BOOTlog=true
    var DEBUG=true
    var LOG=160;//length of Log
    var ARRstatusLog="<pre><X2>=================DEBUG LOG=================</x2></pre>".split('@');
    var MSGcount=0;//check against LOG
    var STATUSmon=1;//sets the Debug mode, 0=off/1=log while hidden/2=log Real time
//PRESETS
    var PRESETno=0;
    var PRESET="Default";

//*Bogus Functions===========================================================

function presets(){
    if (PRESETno===0) {statusMsg ("Initiating Preset "+PRESET,0)}
    var arrTF="";
    var tORf=true;
    var icon;
    var theVar;
    //                1    2       3           4        5    6     7    8        9      10        11       12        13      14      15         16      17     18
    var arrPresets="CAPS,HILITE,FULLscreen,LEFTborder,CLOCK,TEXT,SHADE,NOTES,SETnotes,POPnotes,TECHnotes,AUTOnext,COUNTin,CLICKER,BREAKlines,BIGchords,LOOPER,LINEtime".split(',');
    if (PRESET==="Default Mode"){arrTF="true,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false".split(',');
        setLineLimit(90)}
    else if (PRESET==="Perform Mode"){arrTF="true,false,true,false,true,false,true,false,true,false,false,true,true,false,true,true,false,false".split(',');
        setLineLimit(50)}
    else if (PRESET==="Practice Mode"){arrTF="true,false,true,false,true,false,false,false,true,false,false,true,true,true,true,true,true,true".split(',');
        setLineLimit(55)}
    theVar=arrPresets[PRESETno]
    if (arrTF[PRESETno]==='true'){tORf=true;}else{tORf=false;}
    statusMsg("---------presets("+PRESETno+") requesting: "+theVar+">>"+tORf+">>"+'preset',0)
    setCustom(theVar,tORf,'presets')}

function sleep(milliseconds) {//stops execution experimental
   var currentTime= new Date().getTime();
   while (currentTime + milliseconds >= new Date().getTime()){}}

function badCode(){alert(parseInt(23/0,10))}//

function bogus() {flash("QUALITY: "+ QUAL,3);blinker("msg",5);}

//*Inwork functions===========================================================
function rollMirror(tf){
    clearTimeout(TIMEOUTmirror);
    if(tf===true){
        if(MIRROR<3){
            document.getElementById('mirror').style.color='black';
            if(MIRROR===1){document.getElementById("mirror").innerHTML=BPM;document.getElementById('mirrorImage').src='../../Icons/transCircleGreen.png';}
            else if(MIRROR===2){document.getElementById("mirror").innerHTML=KEY;document.getElementById('mirrorImage').src='../../Icons/transCircleYellow.png';}
            else {document.getElementById("mirror").innerHTML=STARS;document.getElementById('mirrorImage').src='../../Icons/transCircleStar.png';}
            MIRROR=MIRROR+1}
        else{
            MIRROR=0;
            document.getElementById('mirrorImage').src='../../Icons/'+ARRsongSettings[2];
            document.getElementById('mirror').style.color='transparent';}
        TIMEOUTmirror=setTimeout(function(){rollMirror(true)},2000);}}

function setLineLimit(a){
    if (a===undefined) {LINElimit=LINElimit-5;}
    else{LINElimit=a}
    if(LINElimit<=25) {LINElimit=90;}
    document.getElementById('lineLimit').innerHTML=LINElimit;}

function breakLine(line){
    statusMsg("Formatting Fixed Font: "+line,0)
    var last=0;
    var newLine="";
    var j;
    var end=false;
    var spaces="";
    var lenIn=200;var lenOut=10
    while(lenOut<lenIn){//kill double spaces
        lenIn=line.length
        line=line.split('  ').join(' ')
        lenOut=line.length
        statusMsg(lenIn+">>"+lenOut+"~~"+LINElimit,0)}
    if(line.length<=LINElimit) {newLine=line}
    else{
        j=parseInt(lenOut*0.5,10)-2
        while(line.substring(j-1,j)!==" "){j=j-1;}
        newLine=line.substring(0,j)
        var space=LINElimit-line.substring(j,line.length).length;
        for (k=1;k<space-2;k++) {spaces=spaces+" "}
        newLine=newLine+"<br>"+spaces+line.substring(j,line.length)}
    return(newLine);}
  
function opacSet(id,opac){if(opac===undefined |opac===null|opac>1){opac=1};document.getElementById(id).style.opacity=opac}//set opacity

function statusMonitor(m){//set the statusMonitor function
    var line=""
    if(m===0){
        line="<X2>Debug Log Deactivated==================</X2>";
        dis('statusWindow','none');
        dis('buttonDebug','none');}
    if(m===1){
        dis('statusWindow','none');
        document.getElementById('buttonDebug').src="../../Icons/bug2.gif"
        dis('buttonDebug','block');
        line="<X2>Debug Log Active and Hidden============</X2>";}
    else if(m===2){
        dis('statusWindow','block');
        document.getElementById('buttonDebug').src="../../Icons/buggy.gif"
        dis('buttonDebug','block');
        line="<X2>Debug Log Active and Displayed=========</X2>";}
    STATUSmon=m;
    statusMsg(line,0);}

function monitorWindow(){
    dis('statusWindow');
    if(document.getElementById('statusWindow').style.display==='block') {
        statusMonitor(2);
        document.getElementById('bootText').innerHTML="<pre>"+ARRstatusLog.join('<br>')+"</pre>";}
    else{statusMonitor(1)}}

//*BOOT ROUTINE and BOOT ROUTINE ENTRY ROUTINES===================BBB  All in functions sequence with breaks between sub routines
window.onload= function(){
    //ARRstatusLog="<pre>========================BROWSER LOADING THIS PAGE=================</pre>".split('-');
    STATUSmon=1;
    statusMsg("Loading Javascript...",0 )
    BOOT=true;
    document.getElementById('statusWindow').style.display='none';
    document.getElementById("bootBug2").focus();
    statusMsg("PRESS ANY KEY or CLICK THE 'BUG' to monitor the boot...")
    TIMEOUTcrap= setTimeout(function(){start();},1200);}  

function monitorBoot(){//initiated by the user at boot
    clearTimeout(TIMEOUTcrap);
    statusMonitor(2);
    document.getElementById('bootBug3').focus();
    statusMsg('User intiated boot monitor...',0);
    start();}

function start(){
    clearTimeout(TIMEOUTcrap);
    document.getElementById('bootBug3').focus();
    document.getElementById('bootBug').style.display='none'
    statusMsg("Booting with Javascript...");
    var arr;
    revDates();
    MSGlast="MSG ERROR";
    DEBUG=false;//for the boot DDD
    document.getElementById('revStatus').innerHTML="REV: "+REV;
    NONE=document.getElementById('none').style.display;//^  create object check if its necessary
    ARRsongSettings=('C;92;transSilent.png').split(';');//a starting point for the songSettings indicating Key or BPM
    var lst="<a style='text-align:center; width:28vw'><a style='color:white;'>SOUND MODE</a><br><select id='soundSelector' style='background-color:white;color:black;font-size:2vw; width:28vw' onchange='setSoundModeDefault(this.value)'><optgroup>";
    j=0;
    while (j < ARRsoundModes.length){
        lst=lst +"\n<option>"+ ARRsoundModes[j] +"</option>";
        j= j+1;}
    lst=lst +"\n</optgroup></Select>";
    document.getElementById("soundBox").innerHTML=lst;       
    arr=receiveARR();//get an array if one is sent...
    if(arr===undefined|arr===null|arr===''){ //^ normal first time boot, no query string
        BOOT= true;
        createSetSelector();}//^ boot to the default list
    else{
        BOOT='edit';
        ARRtitle=("INWORK,C,125,SILENT,No Note").split(',');//Bogus title array
        createARRlines(arr);}};

function createSetSelector(){ //alert('SetSelector');  //^creates an option box from the file SetList.txt in the top directory
    statusMsg("Creating Set Selector...");
    var path="SetList.txt";
    var request= new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content= request.responseText;
    var SETS=content.split("\n");
    ihtml="<a style='text-align:center; width:45vw;color:white'>PLAYLIST:</a><br><select id='Set' style='font-size:2vw' onchange='SETname=(this.value);selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
    j=0;
    while (j < SETS.length) {
        if(SETS[j]!=="ALL TUNES") {ihtml=ihtml +"\n<option>"+ SETS[j] +"</option>";}
        j= j+1;}
    ihtml=ihtml +"\n</optgroup></Select>";
    document.getElementById("setSelectA").innerHTML=ihtml;    
    selectSet("ALL TUNES");}//^ default is ALL TUNES

function selectSet(set){ //alert('selectSet('+set+')');  //^ Selects your set by its name
    statusMsg("Selected Set: "+set,"yellow");
    SETname= set;
    SETlist= "";
    var request= new XMLHttpRequest();
    path="../Sets/"+SETname+".txt";
    request.open("GET", path, false);
    request.send(null);
    SETlist= request.responseText.split("\n");
    if(set=="ALL TUNES") {dis('abet','block');}else{dis('abet','none');}
    createSetList();}       

function createSetList(){//alert('createSetList()');//^ creates the setlist option box and selects tune 0
    statusMsg("Formating Playlist and Selecting Default Song...","yellow");
    var a;
    var lst="<X2><optgroup>";
    j=0;
    while (j < SETlist.length){
       a=(SETlist[j].split("|")[0]);
       if(a.substring(0,1)=='@'){a=a.substring(1,a.length);}
        lst=lst +"\n<option value= '"+SETlist[j]+"'>"+a+"</option>";
        j= j+1;}
    lst=lst +"\n</optgroup></X2>";
    document.getElementById("mySet").innerHTML=lst;
    TUNEnum=0;//^ nominal tune is 0
    TITLEplus= SETlist[TUNEnum];
    TITLE=TITLEplus;
    PREVtitle=TITLE;
    selectTune(TITLEplus);}
    
function nextTune(newDir){//alert("nextTune("+newDir+")");//^ Entry point if you have selected the next tune in the list by direction 1,0,-1
    statusMsg("Incrementing tune list " & newDir & " steps..","yellow");
    passCommand("Think");
    barSelect('none');
    if(SETlist[TUNEnum + newDir]){//^ if next tune exists go to it
        TUNEnum=(TUNEnum + newDir);
        TITLEplus= SETlist[TUNEnum];
        document.getElementById("mySet").selectedIndex= TUNEnum;}
    selectTune(TITLEplus);}
    
function openSong(){//alert('openSong()');//opens a song with title, if its on server, not on list============EEE
    var tune= prompt("Please type the exact tune name", TITLE);
    statusMsg("User requested: "+tune+" by exact title... ",0);
    if(tune !== null) {selectTune(tune);}}
    
function selectTune(titl){//alert('selectTune('+titl+')');//^ Entry Point using the TITLE (or extended title) to download tune
    statusMsg("Selected "+titl +"...",'lightgrey');
    barSelect('none')
    TITLEplus= titl;//TITLEplus is formated play info=@TITLE/KEY/BPM/SOUNDmode/NOTEset (@ indicates alternate if its present)
    ARRtitle=TITLEplus.split("|");
    TITLE= ARRtitle[0];
    if(ARRtitle[0].substr(0,1)=="@"){
        ALT= true;
        TITLE= ARRtitle[0].substr(1);ALT= true;}
    else{
        TITLE = ARRtitle[0];
        ALT=false;}
    document.getElementById('myTune').innerHTML=TITLE;//?what is my tune??
    passCommand("Think");
    CTO();
    document.getElementById("content").innerHTML="";
    if(ARRtitle[3]!==undefined & ARRtitle[3]!== ""){
        SOUNDmode =ARRtitle[3];}
    else{
        SOUNDmode =SOUNDmodeDefault;}
    if(ARRtitle[4]!==undefined & ARRtitle[4]!== ""){NOTEset=  ARRtitle[4];}
    TUNEnum=SETlist.indexOf(TITLEplus);//^ XXX causes problems if tune is in list more than 1 time
    loadServerTitle();}

function loadServerTitle(){//alert('loadServerTitle()');
    statusMsg ("Requesting File " + TITLE +"...",'yellow');
    KEYbase="X";
    document.getElementById('key2').innerHTML="-";    
    document.getElementById("title").innerHTML =TITLE;//^ put title on tab...
    TRANSPOSE =0;
    CTO();
    ARRlines="";
    SCROLLend =false;
    var path ="../text/" + TITLE + ".txt";  //^ get the text file
    var request=new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content=request.responseText;
    var n=content.search("404"); //^ look for a 404 error from server
    if(n >-1){//^ XXX unverified through all cases of next tune
        var str="................NO LYRIC FILE............\n..........There may be a backing track!.............";
        createARRlines(str);
        statusMsg("Server Request Denied ...");}
    else{createARRlines(content);}}
    
function createARRlines(content){//^ Make ARRlines, from the text file
    statusMsg("Creating Song Array: "+TITLE,'yellow');
    NOTEset=undefined;
    BARS=0;
    ARRlines ="";
    while (content.indexOf("\r") >= 0)//^ get rid of linefeeds
    content=content.replace("\r", "");
    ARRlines=content.split("\n");//^ make an array of lines
    firstLineValues();//^ pulls first line values or sets defaults
    KEYlast=KEY;
    if(KEYbase=="X"){KEYbase=KEY;}
    NASH=false;
    SETnoteViewed=false;
    if(BOOT!=='edit'){
        if(ARRtitle[1]!== undefined & ARRtitle[1]!== ""){newKey(ARRtitle[1]);}
        if(ARRtitle[2]!== undefined  & ARRtitle[2]!== ""){BPM=ARRtitle[2];}
        if(ARRtitle[3]!== undefined  & ARRtitle[3]!== ""){SOUNDmode=ARRtitle[3];}
        if(ARRtitle[4]!== undefined  & ARRtitle[4]!== ""){NOTEset=ARRtitle[4];}}
    countBARS();
    loadServerTrack();}
    
function loadServerTrack(){//alert('loading Server Track')
    rollMirror(false)
    statusMsg("Loading mp3 track...",0);
    var delay;
    var src;
    delay =1000;
    document.getElementById('mirror').style.color='transparent'
    document.getElementById('mirrorImage').src='../../Icons/resetSpinner.gif';    
    document.getElementById('thinkIcon').src="../../Icons/trans.png"; 
    statusMsg("Cuing " +SOUNDmode +" mode with "+ parseInt(delay/1000,10)+" sec delay..." ,'yellow');
    document.getElementById("Audio1").style.visibility ="hidden";
    passCommand("Think");
    var newBPM=BPM;
    var icon="none.png";
    src ="";
    if(SOUNDmode=="SILENT"){
        document.getElementById('mirrorImage').src=document.getElementById('buttonTrack2').src="../../Icons/transSilent.png";
        icon="transSilent.png"
        document.getElementById('Audio1').src="";
        durCalc();}
    else{ //^ tracks with BEAT Preset or Time Signature independent=====================
        if(SOUNDmode=="BACK TRACK"){
            BPM= hash(ARRlines[0],"BPM",BPM);
            icon ="transBackTrack.png";
            src="../Backing/"+TITLE+".mp3";}
        else if(SOUNDmode=="VOCAL"){
            BPM= hash(ARRlines[0],"BPM",BPM);
            icon ="transVocal.png";
            src="../VOCAL/"+TITLE+".mp3";}
        else{ //dependent on Beat (round up to 5 or 10)
            while (parseFloat(newBPM/5,10)!==parseInt(newBPM/5,10)){
                newBPM=parseInt(newBPM,10) +1;}
            BPM =newBPM;            
            if(SOUNDmode=="CLICK TRACK"){
                icon ="transClick.png";
                src="../Click/"+BPM+".mp3";}
            //^ Beat Dependent tracks (only base 2,4,8,16)so far
            if(BEATS!=2 & BEATS!=4 & BEATS!=8 &BEATS!=16 & icon=='none.png'){// kick out if not 4/4 based and no trackPicked
                document.getElementById('buttonTrack2').src="../../Icons/transTrackNo.png";
                AUDfail =true;
                durCalc();
                return;}//^ 4/4 tracks below here=============================================
            if(SOUNDmode=="DRUM ROCK"){
               icon ="transRock.png";
               src="../DrumRock/"+BPM+".mp3";}
            else if(SOUNDmode=="DRUM COUNTRY"){
               icon ="transCountry.png";
               src="../DrumCountry/"+BPM+".mp3";}
            else if(SOUNDmode=="DRUM COUNT"){//^ short 8 count track,
               delay =2000;//^ shorter track requires less load time
               icon ="transCount.png";
               src="../DrumCount/"+BPM+".mp3";} }
        document.getElementById('thinkIcon').src="../../Icons/"+icon;
        vis("thinkIcon","visible");
        document.getElementById('Audio1').src=src;
        Audio1.preload='auto';//try to cache instead of stream....//Audio1.load();
        var x=setTimeout(function(){//^ time to get the mp3 [arbitrary]
            DURmp3=document.getElementById('Audio1').duration;
            statusMsg("MP3 Duration:"+DURmp3,'green');
            clearTimeout(x);
            if(SOUND===true){document.getElementById("Audio1").volume=VOL;}
            document.getElementById("V").innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
            if(isNaN(DURmp3)===false ){//^ track successfully loaded
                document.getElementById("Audio1").style.visibility ="visible";
                AUDfail=false;}
            else{//^ track load unsuccessful
                color='red';AUDfail =true;
                icon ='transTrackNo.png';
                statusMsg('Backtrack Audio Failed...',0);}
            document.getElementById('mirrorImage').src=document.getElementById('buttonTrack2').src="../../Icons/"+icon;
            document.getElementById('mirror').style.color='transparent';
            ARRsongSettings.splice(2,1,icon);
            document.getElementById('thinkIcon').src="../../Icons/trans.png"; 
            durCalc();},delay); }}//^ time to load mp3

function durCalc(){
    statusMsg("Calculating Duration...","yellow");
    DUR=0;DURcalc=0;//^ DURtext=0;
    DURsource="Undefined";
    DURcalc=parseInt(BARS*BEATS*60/BPM,10);//^ alert(DURcalc);
    if(DURtext >0 ) {DUR=DURtext, DURsource="File";}
    if(DURcalc >0 ) {DUR=DURcalc, DURsource="Calculation";}
    if(SOUNDmode =="BACK TRACK"|SOUNDmode =="VOCAL"){
        if(isNaN(DURmp3)===false){
            DUR=DURmp3;
            DURsource="MP3";}}
    if(DUR===0){DUR="150";DURsource="Default";}
    DUR=parseInt(DUR,10);
    arrConvert();}
    
function arrConvert(){//alert('arrConvert()'); //^ Setup to walk thru the ARRLines
    statusMsg('Formatting Song...',"yellow");
    var img=false;//if true use an image for the song not text
    var htmlString ="";
    var htmlHead ="";
    var lyricLines=lyricLineCount();//^ XXX combine with longestLine???
    var n;
    var j=0;
    var bigFont;
    var NewLine;
    var lType;
    var arrTemp;
    var temp;
    var arr;
    var bars;
    var barLen;
    var num;
    var visLines;
    var os;
    var offset;
    var extraLine=''
    PRESONGlines=0;
    NOTEtech=undefined;//^ consider calculating these to eliminate constants
    NOTEtrivia="NO TRIVIA NOTES";
    NOTElinks=undefined;
    IRB=undefined;
    LONGLINE =longestLine()+1;
    if(LONGLINE==1) {LONGLINE=74;img=true;}//in case there are no lines (indicates image file)
    if(BREAKlines===true){LONGLINE=LINElimit}//if breaking lines is requested
    if(LINEnum ===true|LINEtime===true) {LONGLINE=LONGLINE +4;}//^ adding space
    NOTESpresent =false;
    var lineNum =1;
    var pre=true;//^ flag for PRESONGlines
    if(TEXT===true) {fsize=(165/LONGLINE)}else{fsize=(180/LONGLINE)}
    n=fsize.toString();
    FONTSIZE=n.substring(0,4)+"vw";
    n=(BIGchordSize*fsize).toString();
    bigFont=n.substring(0,4)+"vw";
    while(j < ARRlines.length){//^ Walk through the ARRlines to build the htmlStrings  
        NewLine=ARRlines[j];
        lType=lineType(NewLine);
        if(lType =='irealb'){
            IRB =NewLine;
            NewLine=undefined;}
        else if(lType =='hash'){
            NewLine=undefined;}
        else if(lType== 'noteTriv'){
            if(NOTEtrivia=="NO TRIVIA NOTES") {NOTEtrivia="";}
            NOTEtrivia =NOTEtrivia +NewLine.substr(2)+"<br>" ;NewLine=undefined; NOTESpresent =true;}
        else if(lType== 'noteTech'){
            if(NOTEtech===undefined) {
                NOTEtech=NewLine.substr(3);}
            else{
                NOTEtech =NOTEtech +"\n"+NewLine.substr(3);}
            NewLine=undefined; NOTESpresent =true;}
        else if(lType =='note'){
            if(pre===true){
                PRESONGlines=PRESONGlines +1;
                NewLine= NewLine.substring(1,NewLine.length);//^ cutoff @                                                                                                                                                                                                                     
                while (NewLine.length < LONGLINE){
                    NewLine=NewLine +" ";}
                NewLine="<X2>" + NewLine + "</X2>";
                if(LINEnum ===true||LINEtime===true){
                    NewLine="<X6>    </X6>" + NewLine;}}
                else{
                    if(NOTES!==true){NewLine=undefined;}
                    else{NewLine="<X14>" + NewLine + "</X14>";}}}
        else if (lType== 'link'){
            if(NOTElinks===undefined) {NOTElinks="";}
            arrTemp=NewLine.split("|");
            NOTElinks =NOTElinks +"<u><a onclick =window.open('"+arrTemp[0]+"')>" + arrTemp[1]+ "</a></u><br>" ;
            NewLine=undefined;
            NOTESpresent =true;}            
        else if(lType =='chord'){
            pre=false; //^ stop counting prelines
            n=0;
            count =0;
            while(n<NewLine.length){
                if(NewLine[n]=="|"){count=count +1;}//^ counting BARS
                n =n+1;}
            if(TRANSPOSE !== 0){NewLine=lineTranspose(NewLine,TRANSPOSE);}
            if(HILITE ===true & BIGchords===false){
                while (NewLine.length < LONGLINE){
                    NewLine=NewLine +" ";}
                NewLine="<X4>" + NewLine + "</X4>";}
            else if(BIGchords===true){
                NewLine=NewLine.replace(/\s+/g, '');     
                arr=NewLine.split('|');
                arr.splice(0,1);//get rid of first element
                bars=BARSperLine;//use BARSperLine established at song load
                barLen=parseInt(LONGLINE/(bars*BIGchordSize),10)-1;//determine the length of a bar for big chords
                NewLine="";
                n=0;
                if(arr.length>bars) {barLen=parseInt(barLen*bars/arr.length,10);}//if more than std number of bars
                while(n<arr.length){
                    temp=arr[n];
                    while(temp.length<=barLen){
                        temp=temp.replace(/~/g, " ~");
                        temp=temp+' ';}
                    NewLine=NewLine+"|"+temp;
                    n=n+1;}
                if(HILITE===false) {
                    NewLine ="<X99>" + NewLine + "</X99>";}
                else {
                    NewLine ="<X100>" + NewLine + "</X100>";}}
            else{NewLine ="<X2>" + NewLine + "</X2>";}
            if(LINEnum ===true||LINEtime===true){NewLine="<X6>    </X6>" + NewLine;}  
            if(KARAOKE===true){NewLine=" ";}}
        else if(lType =='header'){   
            if(pre===true){PRESONGlines=PRESONGlines+2;}
            pre=false;
            NewLine= NewLine.substring(1,NewLine.length);//^ cutoff #
            while (NewLine.length < LONGLINE-5){NewLine=NewLine +"-";}
            if(HILITE===true){NewLine="<X3>" + NewLine + "</X3>";}else{NewLine="<X8>" + NewLine + "</X8>";}
            if(LINEnum ===true||LINEtime===true)  {NewLine="<X6>    </X6>" + NewLine;}}
        else if(lType =='lyric'){   
            if(BREAKlines===true){ //break long lyric lines and combine doubles to show bigger text 
                if(j+1<ARRlines.length) {
                    extraLine=ARRlines[j+1];
                    var extraType=lineType(extraLine)
                        if(lineType(extraLine)==='lyric'){//||lineType(ARRlines[j+1])!==undefined||lineType(ARRlines[j+1])!==undefinedlines[j+1];
                            NewLine=NewLine+extraLine;
                            j=j+1;}}  //incase there is a 2nd lyric line
                if(NewLine.length>LONGLINE){
                    if(NewLine.length> parseInt(2*LONGLINE,10)-5){WARNING="LYRIC LINES TOO LONG FOR SELECTED FONT >>> COMPLETE LINES MAY NOT BE DISPLAYED";}
                    NewLine=breakLine(NewLine)}}
            if(CAPS===true) {NewLine=NewLine.toUpperCase();}                   
            if(HILITE ===true){
                while (NewLine.length < LONGLINE){
                    NewLine=NewLine +" ";}
                NewLine="<X7>" + NewLine + "</X7>";}
            if(LINEnum ===true){    
                if(lineNum <10) {num ="<X5>"+lineNum + "   </X5>";}
                else if(lineNum <100) {num ="<X5>"+lineNum + "  </X5>";}
                else {num =+"<X5>"+lineNum + " </X5>";}
                NewLine=num + NewLine;
                lineNum=lineNum+1;}
            if(LINEtime ===true){  
                NewLine="<X5>" + secToMin(((lineNum-1)/lyricLines)*DUR,10)+ "</X5>"+NewLine;
                lineNum=lineNum+1;}}
        else if(lType =='spacer'){
            if(pre===true){PRESONGlines=PRESONGlines +1;}
            NewLine= "."+  NewLine.substring(1,NewLine.length);
            while (NewLine.length < LONGLINE){
                NewLine=NewLine +" ";}
            NewLine="<X7>" + NewLine + "</X7>";                    
            if(LINEnum ===true||LINEtime===true){NewLine="<X6>    </X6>" + NewLine;}}
        if(NewLine){
            if(LEFTborder===true){NewLine="  "+  NewLine;} 
            htmlString=htmlString  +  NewLine + "\n";}            
        j=j+1;}
    var opac=1
    WINDht=window.innerHeight;
    WINDwt=window.innerWidth;
    RAT =parseFloat(WINDht/WINDwt);
    visLines=parseInt((100/fsize)*RAT,10);
    os=parseInt((visLines/2)-PRESONGlines,10);
    offset ="";
    j=0;
    offset ="<br><X4><center>"+TITLE.toUpperCase()+"</center></X4><br>";
    while(j <= os-3){offset=offset+"<br>" ;j=j+1;}
    htmlHead="<!DOCTYPE html><html><head><title id='title'>"+TITLE+"</title><style>\nBody{font-size : ";
    htmlHead=htmlHead +FONTSIZE+ "; color:black; margin :0vh; padding: 0; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:left;background-color:transparent;}";
    htmlHead=htmlHead+"\nX99{color:red;font-size:"+bigFont+";line-height:100%;}\n";
    htmlHead=htmlHead+"\nX100{color:red;background-color:#F4FA58;font-size:"+bigFont+";line-height:100%;}\n</style></head><body>"; 
    if(img===true){//substitute image for text, no text exists....
        htmlString=htmlString+"<img src=\'../Img/"+TITLE+".jpg\' width=\'"+WINDwt*0.98+ "px\'>";}
    htmlString=htmlHead +"<pre>"+ offset +htmlString ;// XX
    offset2 =""; j =1;
    while (j < parseInt(((visLines)/2)-1,10)){offset2=offset2+"<br>";j=j+1;}
    htmlString=htmlString + "<X2><center>......END OF SONG......</center></X2>"+offset2+"</pre></body></html>";
    if(NOTEtech!==undefined){NOTEtech ="<pre>"+NOTEtech+"</pre>";}
    if(NOTEtrivia===""|NOTEtrivia===undefined) {opacSet("ButtonTrivia",0.2)}else{opacSet("ButtonTrivia",1);}
    if(NOTEtech===""|NOTEtech===undefined) {opacSet("ButtonTech",0.2)}else{opacSet("ButtonTech",1);}
    if(NOTElinks===""|NOTElinks===undefined){opacSet("ButtonLinks",0.2)}else{opacSet("ButtonLinks",1);}
    if(IRB ===""|IRB===undefined){opacSet("irbIcon",0.2)}else{opacSet("irbIcon",1);}    
    document.getElementById('content').innerHTML=htmlString;
    if(img===false) {;scrollSetup();}
    else{loadSongImage("../Img/"+TITLE+".jpg");}}

function loadSongImage(path){
    statusMsg('Loading Grapic Song Image...','yellow');
    var img=new Image();
    img.src= path;
    img.addEventListener("load", function(){
        scrollSetup();});}

function scrollSetup(img){//alert('scrollSetup()');//^ get the song data,songHeight,iframeHeight,Duration,ScrollConstant Run after you set the content of page
    statusMsg('Setting Up Scroll...',"yellow");
    var mesg ="";
    var msgColor='grey';
    PAGEht =document.getElementById("content").clientHeight;
    document.getElementById('Tune').scrollTop=0;
    Ystart=0; 
    Yend=false;
    Ypos=document.getElementById("Tune").scrollTop;// should get this at Play
    SCROLLpix=parseInt(PAGEht-(WINDht*0.75),10);
    if(isNaN(DUR)===true){
        msgColor='yellow';
        if(isNaN(DURcalc)===false){DUR=DURcalc;DURsource='Calculation';}
        else if(isNaN(DURtext)===false){DUR=DURtext;DURsource='From File';}
        else {DUR=150;DURsource="Default";}
        mesg="<X8>STREAMING!!</X8> ";}
    SCROLLkon=DUR*1000/SCROLLpix;// microseconds per pixel
    SCROLLbase=SCROLLkon;
    document.getElementById('speed2').innerHTML=BPM;    
    statusMsg('Applying Custom Settings...',"yellow");
    if(SOUNDmode !== "SILENT"){
        vis('volCtrl','visible');}
    else{
        vis('volCtrl','hidden');}
    if(SETname =='Single Tune'){document.getElementById("title").innerHTML =TITLE;} 
    if(DURsource =="Default"){color ="Yellow";}
    mesg=mesg +"DURATION: " + secToMin(DUR) + " (" + DURsource +") [TIME "+BEATS +"/4]  {TUNE " + parseInt( TUNEnum+1 ,10) + " of "+ SETlist.length +"}";
    mesg=mesg+" {"+listChords() +"}";
    if(CLOCK===true) {
        vis("clock","visible");}
    else{
        vis("clock","hidden");}
    if(NOTEset!==undefined & SETnoteViewed===false & SETnotes===true){
        notePopUp(TITLE+'<br>'+(NOTEset.split('@')).join('<br>'),'4vw','lightgray','purple','No Playlist Notes',undefined,'Playlist note...'),'Playlist Notes';}
    else if(POPnotes ===true& PREVtitle !==TITLE){//& NOTEtrivia!==undefined 
        notePopUp(triviaNotes(),'2vw','black','yellow','No Trivia Notes...',0,'No Trivia Notes','Trivia Notes');}
    else if(TECHnotes ===true & PREVtitle !==TITLE & NOTEtech !==undefined){//& NOTEtrivia!==undefined 
        notePopUp(NOTEtech,'4vw','black','pink','No Tech Notes...',0,'Technical Notes');}    
    PREVtitle=TITLE;
    TRANSPOSE=0;
    document.getElementById('key2').innerHTML=KEY;    
    document.getElementById("V").innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
    if(SHADE===true) {vis('shade','visible');}else{vis('shade','hidden');}
    document.getElementById('thinkIcon').src="../../Icons/trans.png";
    LOOPend=SCROLLpix;
    document.getElementById('le').innerHTML=secToMin(DUR);
    LOOPtop= 0;
    document.getElementById('lt').innerHTML="0:00";
    if(ALT===true){
        document.getElementById('altSong').innerHTML=(SETlist[TUNEnum+1].split('|')[0]);}
    passCommand('Ready');
    document.getElementById("splash").style.display='none';
    document.getElementById('msg').style.top ="0%";
    statusMsg('Checking for Boot Mode...','yellow')
    if(BOOT===false){
        statusMsg('Completed Scroll Setup...',0)}
    else if(BOOT===true) {
        dis('configuration','block');
        BOOT=false;
        if(window.innerHeight>= window.innerWidth){alert("Rotate your device...");}
        if(STATUSmon===1){
            mesg="Select your Sound Mode > Select your Playlist > Set your Configuration"
            msgColor='yellow';
            statusMonitor(0);}
        else if((STATUSmon===2)) {
            mesg="Boot Successful, You're in the Debug mode..."
            msgColor='red'
            statusMonitor(1);}
    else if(BOOT =='edit'){
        mesg='SONG PASSED FROM THE EDITOR!!!  REMEMBER TO SAVE IT THERE!!!';msgColor='red'}}
    rollMirror(true);
    if(WARNING!=="No Warnings!") {mesg=WARNING;msgColor='red';WARNING="No Warnings!";}
    statusMsg(mesg,msgColor)}

//*PLAYER ROUTINES====================================================AAA

function trackPrePlay(){
    statusMsg("Pre-Play...",0)
    if(document.getElementById("Tune").scrollTop>1){trackPlay();}else{trackDelay();}}

function scrollEngine(){//^ the actual scrolling routine keep it simple* before it starts SCOLLstartTime,SCROLLkon must be set
    statusMsg('scrollEngine('+Ypos+'>>>'+SS+')',0)
    nowTime=new Date().getTime(); 
    Ypos=document.getElementById("Tune").scrollTop;
    if(Ypos==TOPlast) {SS=SS+1}else{SS=0;TOPlast=Ypos}
    if(Yend===true){ statusMsg("Yend: "+Yend,0);                              
        if(LOOPER===false){endSong();}else{endLoop();}}         
    else{//^ STD SCROLL move part 2
        var newPos=parseInt(((nowTime - SCROLLstartTime)/SCROLLkon)+Ystart,10);
        document.getElementById("Tune").scrollTop= newPos
        if(document.getElementById("Tune").scrollTop !== newPos&SS>5){Yend =true;}
        if(LOOPER===true & document.getElementById("Tune").scrollTop >=LOOPend){Yend =true;}
        TIMEOUTscroll=setTimeout(function(){scrollEngine();},SCROLLkon);}}

function closeSong(){//^ used to indicate audio end (needed to remove listener)
        statusMsg("Closing Song...",0)
        AUDend=true;
        endSong();}

function endSong() {
    statusMsg("Ending Song...", 0)
    var wait;
    if (SOUNDmode == 'BACK TRACK') {
        wait = 5000;
    } else {
        wait = (SCROLLkon * WINDht * 0.4);
    } //wait 60% screen before popping up top icons
    if (AUDend === true | AUDfail === true) {
        document.getElementById("Audio1").removeEventListener('ended', closeSong);
    }
    if (Yend === true & (AUDend === true | AUDfail === true)) {
        statusMsg(parseInt(wait / 1000, 10) + " sec DELAY: (Time to finish...)", 'transparent', true);
        document.getElementById('msg').style.visibility = 'visible';
        if ((AUDend === true | AUDfail === true) & Yend === true) {
            TIMEOUTwait = setTimeout(function() {
                passCommand('End');
                if (AUTOnext === true) {
                    if (TUNEnum !== (SETlist.length - 1)) {
                        var ns = SETlist[TUNEnum + 1];
                        blinker("nextIcon", 25);
                        statusMsg("Auto-Advancing to " + ns + "....", "yellow");
                        passCommand('Think');
                        TIMEOUTnext = setTimeout(function() {
                            nextTune(1);
                        }, 3000);
                    } else {
                        statusMsg("END of Set...", "red");
                        Yend = false;
                        passCommand('End');
                    }
                }
            }, wait);
        }
    }
}
            
function notePopUp(str,fs,clr,bak,def,title,status){//string, font size, color and Default
    document.getElementById('cloudX').style.color=clr;
    document.getElementById('cloudX').style.backgroundColor=bak;
    document.getElementById('cloudX').style.fontSize=fs;
    document.getElementById('cloudX').innerHTML=str;
    document.getElementById('cloudX').scrollTop=0;
    document.getElementById('cloudTitle').innerHTML=title;
    document.getElementById('cloudX').scrollTop=0;
    dis('information','block');
    statusMsg("Pop Up Notes : "+ title,0);}

function CTO(){//^ clear all Timouts except blink
    statusMsg("Clearing 'TIMEOUTS'",0);
    clearTimeout (TIMEOUTdelay); 
    clearTimeout (TIMEOUTscroll);
    clearTimeout (TIMEOUTnext);
    clearTimeout (TIMEOUTfade);
    clearTimeout (TIMEOUTwait);
    clearTimeout (TIMEOUTintro);}
    
function scrollTune(pct,step) {//^ 25% of screen per second seems appropriate rate
    var int=36;//^ interval may eventally calculate this
    var move=parseInt((pct*WINDht)/25,10);//^ will move 25 steps to move pct int between steps in 1/1000 of a sec
    var plannedSteps =Math.abs(parseInt(pct*100,10));
    var y=document.getElementById("Tune").scrollTop;// MMM
    if(step=== undefined){step=1;clearTimeout(TIMEOUTscroll);}else{step=step+1;}
    if(step<plannedSteps&y>0){
        TIMEOUTscroll=setTimeout(function(){//^ reusing TIMEOUTscroll
            document.getElementById("Tune").scrollTop=y+move;
            scrollTune(pct,step);},int);}
    else{//^  control this to set speed
        statusMsg("Scrolled "+ parseInt(pct*100,10)+"% in "+ step +" steps",0)
        clearTimeout(TIMEOUTscroll);
        Ystart =document.getElementById("Tune").scrollTop;
        SCROLLstartTime = new Date().getTime();
        statusMsg("Starting Scroll Engine",0);
        scrollEngine();}}
        
function passCommand(cmd){ //^ configures the play screen to match the play status(moves, displays and hides icons )
    statusMsg("Executing Command: "+cmd,0)
    if(cmd == "DelayedPlay"|cmd == "Scroll"| cmd == "Ready" | cmd == "Pause"| cmd == "Think"| cmd == "End"){
        dis('Audio1','none');
        vis('altSong','hidden');
        dis('bigButtons','none');
        dis('bigPlay','block');
        dis('bigReset','block');
        vis('cntDwn','hidden');
        dis("think","none");
        dis('backDrop','none');
        vis ("fadeIcon", "hidden");
        clearTimeout(TIMEOUTfade);
        vis("msg","hidden");
        vis("lastIcon", "visible");
        vis("nextIcon", "visible");
        if(cmd == "DelayedPlay"){//alert('DelayedPlay');
            vis('cntDwn','visible');
            dis('think', "block");
            document.getElementById('shade').style.visibility ='hidden';
            barSelect("none");
            dis("songIcons","none");
            vis("msg","visible");}
        if(cmd == "Scroll"){//alert('Scroll');
            statusMsg('Scroll',0)
            dis('bigButtons','block');
            dis('bigPlay','none');
            dis('bigReset','none');
            barSelect("none");
            dis("songIcons","none");
            document.getElementById('shade').style.visibility ='hidden';
            if(BACKdrop===true){dis('backDrop','block');}}
        if(cmd == "Ready"){//alert('Ready');
            if(ALT===true){vis('altSong','visible');}
            dis('bigButtons','none');
            dis('bigPlay','block');
            dis('bigReset','block');
            dis("songIcons","block");
            vis("msg","visible");
            dis('Audio1','block');}
            //showSetting();
        if(cmd == "End"){//alert('End');
            dis('bigButtons','none');
            dis('bigPlay','block');
            dis('bigReset','block');
            //vis("speed","visible");
            dis('songIcons','block');
            statusMsg(TITLE + " Has Ended...");
            vis("msg","visible");
            dis('Audio1','block');}
            //showSetting();
        if(cmd == "Pause"){//alert('Pause');
            dis('bigButtons','none');
            dis('bigPlay','block');
            dis('bigReset','block');
            dis('songIcons','block');
            dis('Audio1','block');
            vis("msg","visible");}
        if(cmd == "Think"){//alert('Think');
            document.getElementById("msg").style.visibility = "visible";
            dis("think","block");}
        if(TUNEnum===0) {vis("lastIcon","hidden");}
        if(TUNEnum>=(SETlist.length-1)){vis("nextIcon","hidden");}}
    else{alert(cmd + " is an invalid Command");}}

function scrollRate(factor){
    var oldBPM=BPM;
    if(BPM<350&factor<1|BPM>30&factor>1) {
        //if(BPM<500&factor<1|BPM>30&factor>1) {
        SCROLLkon = SCROLLkon*factor;
        BPM= parseInt(BPM*(SCROLLbase/SCROLLkon),10);
        statusMsg('Changed Scroll Rate by '+factor+ '% from: '+oldBPM+ ' to: '+BPM,0)
        //SONGlastCustom=1;
        showSetting(1);
        SCROLLstartTime=new Date().getTime();
        Ystart=Ypos; 
        Yend=false;
        Ypos = document.getElementById("Tune").scrollTop;}}
    
function trackDelay(){//count in with two bars....
    clearTimeout (TIMEOUTintro);
    document.getElementById('cntDwn').style.color='black';
    document.getElementById('cntDwn').style.visibility='visible';
    statusMsg("START  SONG  WHEN  THE  SCROLL ROLLS!!",'yellow');
    passCommand("DelayedPlay");
    if(COUNTin===false) {trackPlay();}
    if(SOUNDmode=='DRUM COUNT'){
        document.getElementById("Audio1").play();
        TIMEOUTintro=setTimeout(function(){trackPlay()},document.getElementById("Audio1").duration*1000);}   
    else{countIn(0)}}

    
function countIn(step){   
    var int= parseInt(60000/BPM,10);
    if(step>BEATS) {
        clearTimeout (TIMEOUTintro);
        document.getElementById('cntDwn').innerHTML='';
        document.getElementById('cntDwn').style.visibility='hidden';
        if(SOUNDmode=='VOCAL'| SOUNDmode=='BACK TRACK') {trackPlay();}
        else {trackPlay();}
    }else{TIMEOUTintro=setTimeout(function(){
        if(CLICKER===true){document.getElementById('aC').play();}
        step=parseInt(step +1,10);
        document.getElementById('cntDwn').innerHTML=step;
        document.getElementById('cntDwn').style.visibility='visible';
        countIn(step);},int);} }   



function countIn2(int,step,loop){   
    TIMEOUTintro=setTimeout(function()
    {   step=parseInt(step +1,10);
        if (SOUNDmode=='DRUM COUNT') {document.getElementById('cntDwn').style.visibility='hidden'; }//QQQQ
        if (loop==2 & step>BEATS){       
            document.getElementById('cntDwn').innerHTML='';
            document.getElementById('cntDwn').style.visibility='hidden';
            clearTimeout (TIMEOUTintro);
            pause=parseInt(BEATS *60000/BPM,10);
            if (SOUNDmode=='VOCAL'| SOUNDmode=='BACK TRACK') {trackPlay(pause);}else{trackPlay();}}
        else{
            if(CLICKER===true){document.getElementById('aC').play();}
            if (step>BEATS){loop=loop+1;step=1;document.getElementById('cntDwn').style.color='red';}
            document.getElementById('cntDwn').innerHTML=step;
            countIn(int, step, loop);}
        },int);} 





function trackPause(){   
        CTO();
        if(SOUNDmode !== 'SILENT'){document.getElementById("Audio1").pause();PAUSEpoint=document.getElementById("Audio1").currentTime;}
        if(LOOPER!==true|document.getElementById('Tune').scrollTop < LOOPend)
            {statusMsg("Paused...","yellow");}
        else
            {statusMsg("Loop Paused!","yellow");} 
        passCommand("Pause");}
        
function trackPlay(pause){
        if(pause===undefined) {pause=0}
        statusMsg('Playing after '+pause+" pause",0)
        AUDend =true;
        CTO();
        SCROLLstartTime = new Date().getTime();
        if(SOUNDmode !== 'SILENT'&SOUNDmode!=='DRUM COUNT'){
            if(SOUNDmode =='BACK TRACK'|SOUNDmode =='VOCAL') {
                var tunePt= DUR*document.getElementById('Tune').scrollTop/SCROLLpix;
                if(Math.abs(PAUSEpoint-tunePt)>5) {document.getElementById('Audio1').currentTime=parseInt(tunePt,10);}}
            AUDend =false;
            document.getElementById("Audio1").play();
            document.getElementById('Audio1').addEventListener("ended",closeSong);
            statusMsg('trackPlay() ended the song',0)
            endSong();}//why
        Ystart = document.getElementById("Tune").scrollTop;// MMM
        passCommand("Scroll");
        Yend = false;
        document.getElementById('thinkIcon').src="../../Icons/trans.png"; 
        if(pause>0){
            statusMsg('trackPlay recording Start time',0)
            TIMEOUTscroll=setTimeout(function(){
                SCROLLstartTime = new Date().getTime();scrollEngine(); },pause);}
        else{SCROLLstartTime = new Date().getTime();scrollEngine();}}// scrolls the lyric

function trackReset(){   
    CTO();
    ALT=false;
    if(document.getElementById("Audio1")){
        document.getElementById("Audio1").autoplay = false;
        document.getElementById("Audio1").load();
        if(SOUND===true){document.getElementById("Audio1").volume =VOL;}}
    document.getElementById("Tune").scrollTop=LOOPtop;
    if(LOOPER===true) {
        document.getElementById('Audio1').currentTime  = parseInt(SCROLLkon*LOOPtop/1000,10);
        statusMsg("Loop reset to "+ secToMin(parseInt(SCROLLkon*LOOPtop/1000,10)),'orange');}
    else{
        statusMsg(TITLE +' reset...',0);}
    passCommand('Ready');}
        
function fade(dir){
    if(SOUND===true) {
        var fact;
        var vol=document.getElementById("Audio1").volume;
        document.getElementById('V').innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
        if(dir==='x') {if(VOL>0 & vol>0){dir='down';}else {dir ='up';}}
        if(dir=="up" & vol < VOL| dir==="down" & vol>0.01){ 
            vis('fadeIcon','visible');
            TIMEOUTfade=setTimeout(function(){
                if(dir =="down") {fact =0.7;}else{fact =1.3;}
                if(document.getElementById("Audio1").volume === 0){vol =0.005;}
                fact =vol*fact;
                if(fact>1) {fact=1;}
                document.getElementById("Audio1").volume =fact;
                fade(dir);
                document.getElementById('V').innerHTML="<X2>Fade</X2>";},1000);}
        else{vis('fadeIcon','hidden');
            clearTimeout(TIMEOUTfade);
            if(dir == 'down'){document.getElementById("Audio1").volume =0;vol =0;}
            if(dir == 'up') {document.getElementById("Audio1").volume =VOL;vol =VOL;}
            document.getElementById('V').innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";}}}   

function blinker(id,cycles){//1/4 second per blink
    var d = document.getElementById(id) ;
    if(cycles>0){
        if(d.style.visibility=='visible'){d.style.visibility='hidden';}
        else{ d.style.visibility='visible';}    
        TIMEOUTblink=setTimeout(function()
            {clearTimeout(TIMEOUTblink);
            cycles = cycles -1;
            blinker(id,cycles);
            },125);}
    else{clearTimeout(TIMEOUTblink);
        d.style.visibility='visible';}}
                
function unique(/*str[]*/ arr) { //^ finds unique elements in an array arr
     var o={},  
        r=[],  
        n = arr.length,  
        i;  
     for( i=0 ; i<n ; ++i )  
          o[arr[i]] = null;  
     for( i in o )  
          r.push(i);  
     return r;}
    
function flash(msg,dur){
    if(msg !==MSGlast){
        var TIMEOUTflash;var oldMsg = MSGlast;
        if(dur===undefined) {dur =3;}
        dur = parseInt(dur*1000,10);
        statusMsg(msg,'red') ;   
        TIMEOUTflash=setTimeout(function(){statusMsg(oldMsg);},dur); }}
            
//*LOOP functions=======================================================================================
function resetLoop(){
    passCommand('Think');
    TIMEOUTscroll=setTimeout(function(){ //reusing TIMEOUTscroll
        statusMsg("Resetting....", 'orange');
        Ypos = document.getElementById("Tune").scrollTop-(1+parseInt(((LOOPend-LOOPtop)/50),10));
        document.getElementById("Tune").scrollTop=Ypos;// MMM
        if(Ypos<=LOOPtop){
            document.getElementById("Tune").scrollTop=Ypos=LOOPtop;
            document.getElementById('Audio1').currentTime  = parseInt(SCROLLkon*LOOPtop/1000,10);
            statusMsg("Starting Loop....", 'orange');
            CTO();
            TIMEOUTscroll=setTimeout(function(){trackPlay();},2000);}
        else{resetLoop();}
        },1);}
    
function endLoop(){
    passCommand('Ready');
    CTO();
    statusMsg("Loop Complete...", "yellow");
    if(LOOPmode=="repeated"){
        trackPause();
        TIMEOUTscroll=setTimeout(function() {resetLoop();},2000);}}
        
function loopMode(){
    if(LOOPmode=='repeated'){
        LOOPmode='played once';
        document.getElementById('loopImg').src="../../Icons/transOnePlay.png";}
    else{LOOPmode='repeated';
        document.getElementById('loopImg').src="../../Icons/transInfinity.png";}
    loopMsg();}
    
function loopMsg(a){
    var str="Loop Start: " +secToMin(LOOPtop*SCROLLkon/1000)+ "......Loop End: " + secToMin(LOOPend*SCROLLkon/1000)+"......"+ LOOPmode +"!";
    if(a=='true'){alert(str);}else{statusMsg(str,'yellow');}}

function loopMarkTop(){
    LOOPtop= document.getElementById('Tune').scrollTop;
    loopMsg();
    document.getElementById('lt').innerHTML= secToMin(LOOPtop*SCROLLkon/1000);}

function loopMarkEnd(){
    LOOPend= document.getElementById('Tune').scrollTop;
    loopMsg();
    document.getElementById('le').innerHTML= secToMin(LOOPend*SCROLLkon/1000);}    
    
//*CONFIG FUNCTIONS===================================================AAA
    
function showSetting(num) {// alert('showSetting('+num+')')
    statusMsg ("Displaying key, tempo or track type",0)
    //var num=SONGlastCustom;
    var iconString;
    if(num>2){
        document.getElementById('mirror').style.color='transparent';
        document.getElementById('mirrorImage').src= document.getElementById('buttonTrack2').src="../../Icons/"+ARRsongSettings[2];}
    else{
        document.getElementById('mirror').style.color='black';
        document.getElementById('mirrorImage').src='../../Icons/transCircleWhite.png'}
        if(num===0) {document.getElementById('key2').innerHTML=document.getElementById('mirror').innerHTML=KEY}
        else{document.getElementById('speed2').innerHTML=document.getElementById('mirror').innerHTML=BPM;}}
   
function listTempos(){  
    var strt; var fin; var inc; var j = 0;  var lst="";var beats;var beatUp =beats;var beatDown;
    if(SOUNDmode == "BACK TRACK"|SOUNDmode == "VOCAL"){lst ="You cannot change the Tempo of<br>Pre-recorded VOCAL OR BACKING TRACK...";}
    else{
        if(SOUNDmode =='SILENT'|AUDfail===true){strt=50;fin=300;inc=5;}
        else if(SOUNDmode =='DRUM ROCK'|SOUNDmode =='DRUM COUNT'){strt=70;fin=220;inc=5;}
        else if(SOUNDmode =='CLICK TRACK'){strt=70;fin=190;inc=5;}
        else if(SOUNDmode =='DRUM COUNTRY'){strt=70;fin=220;inc=10;}
        else {(alert ("UNKNOWN ERROR SOUND MODE " +SOUNDmode+ " DOES NOT EXIST!"));}
        beats =strt;j=0;
        while (beats <BPM){beats = beats +inc;j=j +1;}
        lst= "<br><a onclick = 'setBPM("+beats+")' style='color:red'>"+ beats +"</a><br>";           
        j=1;
        while (j <=10){
            beatUp =beats + (j*inc); beatDown =beats - (j*inc);
            if(beatUp <=fin) {lst= "<a onclick = 'setBPM("+beatUp+");SONGlastCustom=1;showSetting(1);'> "+ beatUp +"</a>-"+lst;}
            if(beatDown >=strt) {lst= lst+"<a onclick = 'setBPM("+beatDown+");SONGlastCustom=1;showSetting(1);'> "+ beatDown +"</a>-";}
            j = j+1;}}
    document.getElementById('tempo2').innerHTML=lst;}
        
function newKey(nk){//nash means Nashville
    var nk2=nk
    var nash=false;//NASH = false;
    var i;
    var j =0;
    if(KEY=="N") {
        alert("Not Programed to transpose From Nashville Notation\nSimply move to another song and back to clear Nashville Notation!\n SORRY...");return;}
    if(nk2.substring(1,2)=='#') {nk2=nk2.substring(0,1)+'s'}// Replace the # sign 
    if(nk=="N"){
        nash = true;
        nk ="A";}
    while(ARRscale[j]!==KEY){j = j+1;}
    i =j;
    while(ARRscale[i]!==nk){i = i+1;}
    TRANSPOSE =i-j;//calculate the Transpositon
    if(nash!==false) {nk='N';}
    document.getElementById('key2').src='../../Icons/Key'+nk2+'.png'
    ARRsongSettings.splice(0,1,nk);
    KEYlast=KEY;
    KEY=nk;
    //SONGlastCustom=0;
    statusMsg("Transposed to " +KEY,0)
    arrConvert();}
        
function setBPM(bpm){
    if(SOUNDmode =='SILENT'){BPM = bpm;durCalc();}
    else{BPM =bpm;
       showSetting(1);
       loadServerTrack();}
       listTempos()
       statusMsg("Set BPM to " +bpm,0)}
        
function setSoundModeDefault(mode){// used to indicate audio end (needed to remove listener)
    var num = ARRsoundModes.indexOf(mode);
    document.getElementById("soundSelector").selectedIndex = num;
    SOUNDmodeDefault=SOUNDmode = mode;
    if(BOOT ===false){selectTune(TITLEplus);}}// ZZZcheck to see ifyou can take it out of the boot stream

function setSoundMode(mode,icon){
    statusMsg("Sound mode: "+ mode +">>>>"+icon)
    //SONGlastCustom=2;
    ARRsongSettings.splice(2,1,icon);
    showSetting(2);
    SOUNDmode = mode;
    loadServerTrack();}
        
function setCustom(VAR,val,action){
    var icon
    statusMsg("------Custom A: "+VAR+": from "+ window[VAR]+">>"+val+" pending "+action,0)
    if(action==='presets'){
        window[VAR]=val;
        PRESETno=PRESETno+1}
    if(!val & action!='presets'){//set unknowns to true
        if(window[VAR]===true){window[VAR]=false;}else{window[VAR]=true;}}//}
    statusMsg("-----Custom B: "+VAR+": set to "+ window[VAR]+" then "+action,0)
    if(window[VAR]===true)
        {icon="On.png";}
    else
        {icon="OFF.png";}
    document.getElementById("img"+VAR).src ="../../Icons/"+icon;
    statusMsg("----Custom C: "+VAR+": "+ window[VAR]+"and icon:"+ icon+"  pending: "+action,0)
    if(VAR=='BREAKlines') {//works with BIGchords 
         statusMsg("---Custom D: "+VAR+": "+ window[VAR]+"and icon:"+ icon+"  pending: "+action,0)
        if(BREAKlines===true){//turn on BIGchords too
            statusMsg("--setCustom E: "+VAR+": forcing BIG chords to true "+action,0)
            BIGchords=true
            document.getElementById('imgBREAKlines').style.width='16%';
            document.getElementById('imgBREAKlines').src ="../../Icons/ON.png";
            document.getElementById('breakLines').style.width='16%';
            document.getElementById('breakLines').innerHTML='CHR/<br>Line';
            document.getElementById('bcp').innerHTML='Size<br>Chords';
            document.getElementById('bcp').style.width='16%';
            document.getElementById('imgBIGchords').style.width='16%';
            document.getElementById('imgBIGchords').src ="../../Icons/ON.png";}
           // vis('bigChordPct','visible');}
        if(BREAKlines===false){
            document.getElementById('imgBREAKlines').style.width='32%';
            document.getElementById('breakLines').style.width='32%';
            document.getElementById('breakLines').innerHTML='Characters<br>Per Line';}}
    if(VAR =='BIGchords'){
        if(BIGchords===true) {
            //vis('bigChordPct','visible');
            document.getElementById('imgBIGchords').style.width='16%';
            document.getElementById('bcp').innerHTML='Size<br>Chords';
            document.getElementById('imgBIGchords').src ="../../Icons/ON.png";
            document.getElementById('bcp').style.width='16%';}
        else{
            statusMsg("--setCustom E: "+VAR+": forcing BREAKlines to false "+action,0)
            document.getElementById('imgBIGchords').style.width='32%';
            document.getElementById('bcp').innerHTML='Spread & Size<br>Chords';
            document.getElementById('bcp').style.width='32%';
            BREAKlines=false;//only works with chords spread
            document.getElementById('breakLines').innerHTML='Characters<br>Per Line';
            document.getElementById('breakLines').style.width='32%';
            document.getElementById('imgBREAKlines').src ="../../Icons/OFF.png";
            document.getElementById('imgBREAKlines').style.width='32%';}}
    if(VAR=='SETnotes'& SETnotes ===true){
        document.getElementById("imgPOPnotes").src ="../../Icons/OFF.png";POPnotes=false;document.getElementById("imgTECHnotes").src ="../../Icons/OFF.png";TECHnotes=false;}
    if(VAR=='POPnotes' & POPnotes===true){
        document.getElementById("imgSETnotes").src ="../../Icons/OFF.png";SETnotes=false;document.getElementById("imgTECHnotes").src ="../../Icons/OFF.png";TECHnotes=false;}
    if(VAR=='TECHnotes' & TECHnotes===true){
        document.getElementById("imgSETnotes").src ="../../Icons/OFF.png";SETnotes=false;document.getElementById("imgPOPnotes").src ="../../Icons/OFF.png";POPnotes=false;}
    if(VAR=='LINEnum'& LINEnum ===true){
        window[LINEtime]=false;document.getElementById("imgLINEtime").src ="../../Icons/OFF.png";LINEtime=false;}
    if(VAR=='LINEtime' & LINEtime===true){
        window[LINEnum]=false;document.getElementById("imgLINEnum").src ="../../Icons/OFF.png";LINEnum=false;}
    if(VAR=='FULLscreen'){
        if(FULLscreen ===true){
            launchIntoFullscreen(document.documentElement);}
        else{
            exitFullscreen();}}
    if(VAR ==='CLOCK') {//alert('CLOCK')
        if(CLOCK===true) {
            vis("clock","visible");
            startClock();}    
        else{vis("clock","hidden");
            clearTimeout(TIMEOUTclock);}}
    if(VAR =='LOOPER'){
        if(LOOPER===true){document.getElementById('looper').style.visibility='visible';}
        else{document.getElementById('looper').style.visibility='hidden';}}
    if(VAR =='TEXT'){
        if(TEXT===true){document.getElementById("imgTEXT").src ="../../Icons/On.png"}
        else{document.getElementById("imgTEXT").src ="../../Icons/OFF.png"}}
    if(VAR =='CLICKER'){
        if(CLICKER===true){
            document.getElementById("imgCOUNTin").src ="../../Icons/On.png"
            COUNTin=true}}
    if(VAR =='COUNTin'){
        if(COUNTin===false){
            document.getElementById("imgCLICKER").src ="../../Icons/OFF.png"
            CLICKER=false}}        
    //final steps
    if (action==='presets'){
        if (PRESETno>=18){
            PRESETno=0;
            statusMsg("Completed Preset "+PRESET+":"+PRESETno,0);
            arrConvert()}
        else{
            statusMsg("setCustom(): "+VAR+": now: "+ window[VAR]+" icon:"+ icon+"  pending: "+action,0)
            presets()
            }}
    if(action=='refresh')
        {arrConvert();}
    else if(action=='click')
        {document.getElementById('aC').play();}}

function launchIntoFullscreen(element){
    if(element.requestFullscreen) {element.requestFullscreen();}
    else if(element.mozRequestFullScreen) {element.mozRequestFullScreen();}
    else if(element.webkitRequestFullscreen) {element.webkitRequestFullscreen();}
    else if(element.msRequestFullscreen) {element.msRequestFullscreen();} }

function exitFullscreen(){
    if(document.exitFullscreen) {document.exitFullscreen();}
    else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();}
    else if(document.webkitExitFullscreen) {document.webkitExitFullscreen();}
    else if(element.msCancelFullscreen) {document.msCancelFullscreen();}}//this step is BOGUS

function tgl(vrbl,val){
    if(!val){
        if(window[vrbl]===true){window[vrbl]=false;}
        else{window[vrbl]=true;}}
    else{window[vrbl]=val;}
    if(window[vrbl]===true){document.getElementById("img"+vrbl).src ="../../Icons/On.png";}
    else{document.getElementById("img"+vrbl).src ="../../Icons/OFF.png";}}

function togl(vrbl){
    tgl(vrbl);
    if(vrbl== 'LINEtime' && LINEnum ===true){tgl('LINEnum',false);}
    else if(vrbl== 'LINEnum' && LINEnum ===true){tgl('LINEtime',false);}}

function volSet(volDelta){//^ VolDelta will be -1,0,+1 {10=off or On}
    var newExp;
    clearTimeout(TIMEOUTfade);
    vis("fadeIcon","hidden");
    if(volDelta == 10 & SOUND ===true) {
        SOUND =false;
        document.getElementById("Audio1").volume = 0;
        document.getElementById("soundOO").src ="../../Icons/Off.png";
        document.getElementById("V").innerHTML= "<X2>OFF</X>";}
    else{  
        if(volDelta == 10){
            SOUND = true;
            volDelta = 0;
            document.getElementById("soundOO").src ="../../Icons/ON.png";}
        newExp = parseInt(VOLexp +volDelta,10);
        if(newExp < 5  && newExp > -1){//^ 0,1,2,3,4 (4 being the lowest volume)
            VOLexp = newExp;
            VOL = Math.pow(0.71,4-VOLexp);
            var newBottom = parseInt(15+(VOLexp*15),10)+"%";//^ knob position
            document.getElementById("SK").style.bottom  =newBottom ; //alert(VOLexp +" - " +newBottom)
            var uH=parseInt(newExp*15,10)+'%';
            document.getElementById("SUp").style.height =uH;}}//^ height of button
    document.getElementById('V').innerHTML="<X2>"+parseInt(newExp*25,10)+"%</X2>";
    if(SOUND===true){document.getElementById("Audio1").volume = VOL;}
    else{document.getElementById("V").innerHTML= "<X2>OFF</X2>";}}
    
function revDates(){//date of last mod to js file
    var xhReq = new XMLHttpRequest();
    xhReq.open("HEAD", JSname, false);
    xhReq.send(null);
    JSdate = xhReq.getResponseHeader("Last-Modified");
    HTMLdate=document.lastModified;}
    
function revDetails(){statusMsg("REVISION: "+REV+" <> HTML: "+document.lastModified+" <> JavaScript: "+JSdate,'blue');}

function indexLetter(L){
    var n=0;
    document.getElementById('mySet').selectedIndex=n;
    var str=document.getElementById('mySet').value;
    while(str.substring(0,1)!==L){
        document.getElementById('mySet').selectedIndex=n;
        var str=document.getElementById('mySet').value;
        n++;
        str==document.getElementById('mySet').value;
        if(n==document.getElementById('mySet').length-1) {
            statusMsg("No Tunes Starting with "+L,'yellow')
            return}}
    selectTune(document.getElementById('mySet').value)}

function changeBackgroundImage(id, url){
    var urlString = 'url(' + url + ')';
    document.getElementById(id).style.backgroundImage =  urlString;}

function bcPct(size){//BigChordPCT
    var sign="+";
    if(size!==undefined){BIGchordSize=1.00}//default
    else{BIGchordSize=BIGchordSize+0.25;}
    if(BIGchordSize==2.25){BIGchordSize=1;}
    if(BIGchordSize==1.75){BIGchordSize=2;}
    document.getElementById('bigChordPct').innerHTML=BIGchordSize*100 +"%"
    arrConvert();}    
    
//^TRANSPOSE FUNCTIONS====================================================AAA
function lineTranspose(line,steps){//^ transpose entire line and try to keep the absolute chord spacing despite differnces in chr of new chord
    var lineNew;
    if (steps===0){
        lineNew = line;}
    else{   //^ set up constants
        var chordNew ="";
        var chord =""; //^ where chrs are collected until a space ends the chord
        var adj = 0;  //^ how the length of the new line compares to old (- shorter  + longer) so spaces can be added (ex 3 would mean new line is 3 chr to long and 3 spaces should be take out asap)
        lineNew= "";
        var n=0;
        while (n < line.length){//^ step through the line
            if (line[n]==" "){
                if (chord.length ===0){//^ not working a chord so work space
                    if (adj > 0){
                        adj = parseInt(adj -1,10);}
                        //^ dont add the space and take adjustment down one...
                    else{
                        lineNew = lineNew + " ";}}
                else{//^ closing a chord with the space
                    chordNew = chordTranspose(chord,steps);
                    adj = adj + (chordNew.length - chord.length);//^ set adjustment
                    if (adj < 0){
                        while(adj < 0){
                            adj = adj+1;
                            chordNew = chordNew +" ";}}
                    lineNew = lineNew + chordNew  + " ";
                    chord ="";//^ reset for another chord
                    chordNew ="";}}
            else{
                chord = chord + line[n];
                if (n==line.length-1){//^ end of the line but no space to change
                    lineNew = lineNew + chordTranspose(chord, steps);}}
            n=n+1;}}
    return lineNew;}

function chordTranspose(chord,steps){
    var chordNew ="";      
    if (steps===0) {
        chordNew = chord;}
    else{
        var n=0;
        chord = chord.replace(/A#/g,"Bb");//^ purge odd chords
        chord = chord.replace(/B#/g,"C"); 
        chord = chord.replace(/Cb/g,"B");
        chord = chord.replace(/Db/g,"C#");
        chord = chord.replace(/D#/g,"Eb");
        chord = chord.replace(/Fb/g,"E");
        chord = chord.replace(/E#/g,"F");
        chord = chord.replace(/Gb/g,"F#");
        chord = chord.replace(/G#/g,"Ab");
        for (n=0; n < chord.length;){
            var advance =1;
            if (chord[n]=="A"|chord[n]=="B"|chord[n]=="C"|chord[n]=="D"|chord[n]=="E"|chord[n]=="F"|chord[n]=="G"){
                if (n < chord.length-1 &&(chord[n+1]=="#"|chord[n+1]=="b")){//^ if not at the end of the chord check for next part of note
                    chordNew = chordNew + noteTranspose(chord[n]+chord[n+1],steps);
                    advance =2;} //^ increment the count since you used 2 chrs
                else{
                    chordNew = chordNew+ noteTranspose(chord[n],steps);}}
            else{
                chordNew = chordNew+chord[n];}
            n = n+advance;}} 
    return chordNew;}

function noteTranspose(note,steps){//^ must be sure to add # or b beforce calling the routine  
    var noteNew = "?";
    var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab";
    var arrScale=scale.split(",");  //^ make array
    note = note.replace(/A#/g,"Bb");
    note = note.replace(/B#/g,"C"); 
    note = note.replace(/Cb/g,"B");
    note = note.replace(/Db/g,"C#");
    note = note.replace(/D#/g,"Eb");
    note = note.replace(/Fb/g,"E");
    note = note.replace(/E#/g,"F");
    note = note.replace(/Gb/g,"F#");
    note = note.replace(/G#/g,"Ab");
    for (i = 13; i < 38; i++) {//^  get the position of the first letter starting at 13 and work up
        if (arrScale[i] == note){break;}}//^ get the current note position
    noteNew = arrScale[i+steps];
    if (KEY=='N'){
        if (noteNew=='A') {noteNew='1';}
        else if (noteNew=='Bb') {noteNew='2b';}
        else if (noteNew=='B') {noteNew='2';}
        else if (noteNew=='C') {noteNew='3b';}
        else if (noteNew=='C#') {noteNew='3';}
        else if (noteNew=='D') {noteNew='4';}
        else if (noteNew=='Eb') {noteNew='5b';}
        else if (noteNew=='E') {noteNew='5';}
        else if (noteNew=='F') {noteNew='6b';}
        else if (noteNew=='F#') {noteNew='6';}
        else if (noteNew=='G') {noteNew='7b';}
        else if (noteNew=='Ab#') {noteNew='7';}
        else {noteNew='??';}}
    return noteNew;}
//**NAVIGATION FUNCTIONS ===================================================AAA
//function editor(){window.open(encodeURI("editor.html?"+(encodeFredComponent(ARRlines.join("\n")))));}//^ WORKS ON WICKED GAME

function printContent(){
    var x=document.getElementById('content').innerHTML;
    x="<X100>"+TITLE+"<br>"+listChords()+"</X100><br>"+x.replace(/<br>/g, "");
    var win = window.open("", "Title", "toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
    win.document.body.innerHTML = x;}
    
function notes(){
    window.open(encodeURI("notes.html?"+encodeFredComponent(ARRlines.join("\n"))+"?"+encodeFredComponent(TITLE)));}

function home(){window.open("index.html");}

function history(){window.open("player.txt");} 

function iRealLink(){if(confirm('ifthis computer has Ireal Pro installed press OK.\n Otherwise; Cancel this operation to see the Ireal Text file.')==true){window.open(IRB);}}

function fileMaster(){window.open("FileMaster.html");}

//**ANALYSIS FUNCTIONS===================================================AAA
//^ perform general functions and can be adapted to different screens 
function analizeSong(){
    var str = "TITLE: "+ TITLE+ " (SOUND MODE: " + SOUNDmode +")";
    str = str +"<br>PLAYLIST: "+ SETname +"<br>=======================";
    str = str +"<br>KEY: "+ KEYbase + " (Transposed to " + KEY +")";
    str = str +"<br>TIME SIG: "+ BEATS  + "<br>BARS: "+ BARS + "<br>TEMPO: "+ BPM +" BPM" + "<br>QUALITY: "+ QUAL; // + "<br>ARTIST: "+ ARTIST;
    str = str +"<br>GENRE: "+ GENRE  + "<br>STYLE: "+ STYLE +"<br>ARTIST: "+ ARTIST;
    str = str +"<br>HIT YEAR: "+ HITyear;
    str = str +"<br>======================<br>DURATION: "+ DUR+ " ("+secToMin(DUR)+ ")<br>DUR SOURCE: "+ DURsource; 
    str = str +"<br>   DUR CALC: "+ DURcalc + " (" + secToMin(DURcalc)+ ") 100%";
    str = str +"<br>   DUR FILE: "+ DURtext + " (" + secToMin(DURtext)+ ")" + parseInt(DURtext*100/DURcalc,10)+"%" ;
    str = str +"<br>   DUR MP3: "+ parseInt(DURmp3,10) + " (" + secToMin(DURmp3)+ ")"+ parseInt(DURmp3*100/DURcalc,10)+"%";
    str = str +"<br>======================<br>TECHNICAL INFO";
    str = str +"<br>   ASPECT RATIO: "+ parseFloat(1/RAT);
    str = str +"<br>   LONGEST LINE: "+ LONGLINE + " charcters";
    str = str +"<br>   PRE-SONG LINES: "+ PRESONGlines + " lines";
    str = str +"<br>   CHORD LINES: "+ CHORDlines + " lines";
    str = str +"<br>   WINDOW HT: "+ WINDht + "px (" + parseInt(100*WINDht/PAGEht,10)+")%";
    str = str +"<br>   DOCUMENT HT: "+ PAGEht+ "px";
    str = str +"<br>   SCROLL PIX: "+ SCROLLpix+ "px";
    str = str +"<br>   WINDOW WT: "+ WINDwt + "px";
    str = str +"<br>   SCROLL RATE: "+ parseInt(SCROLLkon,10) + " micro-sec/pixel";
    str = str +"<br>   SCROLL POSITION: " + document.getElementById("Tune").scrollTop +"px";
    str = str +"<br>======================<br>CHORDS<br>" + listChords() +"<br>=======================================END=======================================<br>";
    return(str);}

function countBARS(){
    var CHORDlines=0
    var count =0
    var j =0;BARS=0;BARSperLine=0;
    while(j < ARRlines.length){// go through the array 
        var line = ARRlines[j];
        if(lineType(line)=='chord'){
            CHORDlines=CHORDlines+1;
            count=countChr(line,"|");
            count=count-countChr(line,"*")*0.5;//reduce for 1/2 bars
            BARS = BARS + count;}//^ total the |'s 
        j=j+1;}
    if(CHORDlines>0){BARSperLine=BARS/CHORDlines;}
     statusMsg("BARS: "+BARS+"    CHORD LINES: "+CHORDlines+"   BARS/LINE: "+BARSperLine,0)}//get the std number of bars from the first line

function lyricLineCount(){
    var count =0;
    var i=0;
    while (i < ARRlines.length) {
        if(lineType(ARRlines[i])== "lyric"){count =count+1;}
        i = i+1;}    
    return count;}

function getRevisonHistory(){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    path ="player.txt";
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); }

function getHelpFile(){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    path ='HelpText.txt';
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); } 

function getHelpIndex(){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    path ="HelpIndex.html";
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); }

function displayHelp(path){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    document.getElementById('helpText').innerHTML= "<pre>"(request.responseText)+"</pre>"; }

function chordLines(){//^ Common Lyic
    var i=0;
    var a =0;
    while (i < ARRlines.length){
        if(lineType(ARRlines[i]) == "chord"){
            a = a + 1;}
        i = i+1;}    
    return a;}
    
function isHeader(str){ //^ look for header string reguardless of case
    var ans = false;
    var flag = (str.substring(0,5).toUpperCase());
    if(flag =="VERSE"|flag =="#VERS"|flag =="CHORU"|flag =="#CHOR"|flag =="BREAK"|flag =="#BREA"|flag =="INTRO"|flag =="#INTR"|flag =="OUTRO"|flag =="#OUTR"|flag == "#BRIDG"|flag == "#BRID"|flag == "#TURN "|flag == "#TURN"){ans =true;}
    return ans;}

function countChr(str,chr){//^ counts chr in a string
    var i = 0;
    var count =0;
    while (i<str.length){
        if(str[i]==chr){count = count+1;} 
        i = i+1; }
    return count;}
    
function listChords(){//^ list of chords used. if the std format is followed
    var arrChords = ARRlines;
    var str ="";
    j = 0;
    while (j<arrChords.length){
    if(lineType(arrChords[j])=='chord'){
        if(TRANSPOSE !== 0){arrChords[j] = lineTranspose(arrChords[j],TRANSPOSE);}
        str = str +arrChords[j];}
        j = j+1;}
    str=str.replace(/~/g," |");
    arrChords=str.split("*"); str = arrChords.join(""); // kill *
    arrChords=str.split("||");str = arrChords.join("@");
    arrChords=str.split("|%");str = arrChords.join("");
    arrChords=str.split("| ");str = arrChords.join("");
    arrChords=str.split("@");str = arrChords.join("|");
    arrChords=str.split("|NC");str = arrChords.join("");
    arrChords=str.split("^");str = arrChords.join("");
    str=str.replace(/ /g,"");
    str =str.substr(1);
    arrChords=str.split("|");
    str= unique(arrChords).join(" - ");
    return str;}

function firstLineValues(type){//^ creates first line defaults then modifies using ARRlines[0]
    //^ Gets the 3 critical fields from a first line hash
    BPM =120; BEATS =4; KEY ="C";//^ set defaults
    if(lineType(ARRlines[0])=='hash'){//^ if type is array and hash exists
        TITLE = decodeURI(hash(ARRlines[0],"TITLE",TITLE));
        DURtext = hash(ARRlines[0],"DUR","");
        BPM= hash(ARRlines[0],"BPM",BPM);
        BEATS = hash(ARRlines[0],"BEATS",BEATS);
        KEY = hash(ARRlines[0],"KEY",KEY);
        if(KEY===0 |KEY=="0") {KEY="C";}//^ zzzdont know where the 0 comes from but trapped here
        QUAL = hash(ARRlines[0],"QUAL",QUAL);
        if(QUAL !=="Inwork"&QUAL !=="Verified"&QUAL !=="Complete") {QUAL ="Raw";}
        if(QUAL=='Inwork'){STARS=2}if(QUAL=='Preliminary'){STARS=3}else if(QUAL=='Verified'){STARS=4}else if(QUAL=='Complete'){STARS=5}else{STARS=1}
        GENRE  = hash(ARRlines[0],"GENRE","Unknown");
        STYLE = hash(ARRlines[0],"STYLE","Unknown");
        HITyear = hash(ARRlines[0],"HITyear","Unknown");
        ARTIST = hash(ARRlines[0],"ARTIST","Unknown");}}
        
//FILE FUNCTIONS===============================================AAA
function setUpListener(){document.getElementById('fileinput').addEventListener('change', loadFile, false); }//should be renamed here and html

function loadFile(e){//gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
    readSingleFile(e); //gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
    setTimeout(function(){createARRlines(RAWtune);document.getElementById('myTune').innerHTML=TITLE;barSelect();},2000);} 

function readSingleFile(e){
    statusMsg('Reading file','yellow');
    file = e.target.files[0];
    if(!file){ alert("No Valid File...");return;}//incase no file
    var reader = new FileReader();
    reader.onload = function(e){
        RAWtune = e.target.result;//is program specific
        TITLE = (file.name.substring(0,(file.name.length)-4));};
    reader.readAsText(file);}
    
//^LYRIC COMMON FUNCTIONS==================================================These functions are general utility
//APPLICATIONS=======================================================AAA
function barSelect(bar,msg){   
        if(bar=='none'){statusMsg("All toolbars closed",0);}
        //var arrBar="configuration,information,tempo,tool,key-Selection,sound-track,songBar,songBar2".split(",");//cloud,
        var arrBar="configuration,information,tool,songBar2".split(",");//cloud,
        //var arrBar="information,tool,songBar2".split(",");//cloud,
        var j=0;  var ctrl;
        while (j<arrBar.length){   
            if(msg===undefined) {msg="...";}
            ctrl =arrBar[j];
            if(bar==ctrl){dis(ctrl);}
            else{dis(ctrl,'none');}
            j = j+1;}
        var r= document.getElementById(bar).style.display;
        if(bar!=="none"){
            if(r=='block') {statusMsg(("The "+ bar+ " BAR Opened...").toUpperCase());}
            else{statusMsg("The "+ bar+ " toobar was closed...",0);}}
        else{statusMsg("Ready");}}
        
function triviaNotes(){return  "<center>" +TITLE.toUpperCase() +"<br>ARTIST: "+ARTIST+" < > HIT YEAR; " +HITyear +"</center><br>" +NOTEtrivia;}

function playlistNotes(){ return  "<center>" +TITLE.toUpperCase() +"</center>@" +NOTEset;}

function startClock(){
    var today = new Date();
    var h = today.getHours();
    var x ="AM";
    if(h>11) {x="PM";}
    if(h>12) {h=h-12;}
    var m = today.getMinutes();
    if(m < 10) {m = "0" + m;}
    document.getElementById('clock').innerHTML ="<X12>"+h + ":" + m +x+"</X12>";
    TIMEOUTclock=setTimeout(function(){startClock();}, 10000);}
    
function printFormat(){
    var pf='';
    var j=0;
    var end = parseInt(ARRlines.length-1,10);
    while (j<end){
        pf =pf +"\n"+ ARRlines[j];
        j = j+1;}
    return pf;}

function portraitWarning(){if(window.innerHeight>= window.innerWidth){alert("ROTATE YOUR DEVICE...");}}

//*GLOBAL FUNCTIONS Used from any screen ===============================================AAA
function fileFromPath(path){
    path = path.split('/');return (path[path.length-1]);}

   
function statusMsg(msg,bgcolor,marq){// COLOR SCHEME: light grey=normal;red=problem ;yellow-pause or inwork; green=Ready
    if(msg===null||msg==='' || msg===" ") {msg = "ERROR: No Status Message Passed";}
    if(STATUSmon>0) {
        if(ARRstatusLog.length>LOG){ARRstatusLog.pop()}
        if(bgcolor==0){ARRstatusLog.splice(0,0,stdTime("",true)+"   <X8>"+msg+"</X8>");}
        else{ARRstatusLog.splice(0,0,stdTime("",true) +"      <X1>"+msg+"</X1>");}}
    if(STATUSmon>1){    
        document.getElementById('bootText').innerHTML="<pre>"+ARRstatusLog.join('<br>')+"</pre>";}    
    if(bgcolor==0) {return}
    sm2(msg,bgcolor,marq);}    

function sm2(msg,bgcolor,marq){
    var clr="black";
    if(msg===null){msg="*"+MSGlast;}
    else{MSGlast = msg;}
    if(document.getElementById('splash').style.display=="block") {bgcolor = "transparent"}
    else if(bgcolor == "black"|bgcolor == "red"|bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr = 'white';}
    else if(bgcolor == "yellow"){clr = 'red';}
    else{bgcolor = 'lightgrey';}//default
    if(marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";bgcolor='yellow'}
    document.getElementById("msg").style.color = clr;
    document.getElementById("msg").style.backgroundColor = bgcolor;
    document.getElementById("msg").innerHTML = msg;} 

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
            if(document.getElementById(id).style.display == NONE){
                document.getElementById(id).style.display='block';}
            else{document.getElementById(id).style.display=NONE;}}
        else{
            if(disp=='none') {
                document.getElementById(id).style.display = NONE;}
            else{document.getElementById(id).style.display = 'block' ;}}}

function zin(id,zind){document.getElementById(id).style.zIndex = zind;}

function vis(iconID,style){
    if(style===undefined){
        if(document.getElementById(iconID).style.visibility =='visible') {
            style='hidden';}
        else{
            style='visible';}}
    document.getElementById(iconID).style.visibility =style;}
    
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
    //window.open(pageName,encodeURI(encodeFredComponent(pf)));
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
    if((str.substring (0,7)).toUpperCase()=="IREALB:"){ans = "irealb";}    
    else if(str.substring (0,4)=="http")  {ans = "link";}
    else if(str.substring (0,3)=="@@@")  {ans = "noteTech";} 
    else if(str.substring (0,2)=="@@")  {ans = "noteTriv";}
    else if(str.substring (0,1)=="@")  {ans = "note";}
    else if(str.substring (0,1)=="#") {ans = "header";}
    else if(str.substring (0,1)=="$") {ans = "spacer";}
    else if(str.search(":")>-1) {ans = "hash";}
    else if(str.indexOf("|") >-1){ans ="chord";}
    return ans;}
    
function longestLine(){
    var count =0;
    var i=0;
    while (i < ARRlines.length){
        var ltype = lineType(ARRlines[i]);
        //if (ltype == "chord" | ltype == "lyric"| ltype == "note"| ltype =="header"){
        if(ltype == 'lyric'|ltype=='chord'){
            if(ARRlines[i].length > count){count = ARRlines[i].length;}}
        i = i+1;}    
    return count;}
    
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