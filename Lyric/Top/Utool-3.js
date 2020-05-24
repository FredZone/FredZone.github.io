//*ADD GLOBAL VARIABLES HERE!!!!
var ARRcollections;
var FILEname='Your.json';
var FPS=30;//frames per second
var FRAMEtime;
var FRAMES=1;
var UTID
var VID;
var UTtitle;
var COL=0;
var JSONlast;
var LOOPcount=0
var LOOPING=false;
var LOOP;//index of working loop in ARRloops
var LOOPlast;
var LOOPstart=0;//in seconds
var LOOPfinish=0;//in seconds
var LOOPtype;//once or repeat or seq
var LOOPpause=2000;//milliseconds of pause
var LOOPtab=null;//ARRloop[4] where the tab is stored in a string
var LOOPname="Un-named";//ARRloop[2] where the tab is stored in a string
var LOOPnote=null;//ARRloop[3] where the tab is stored in a string
var ONLINE=false;
var PLAYERtime;
var TRACKcount=0;
var TIMEOUTloop;
var TIMEOUTdelay;
var TIMEOUTtime;
var TIMEOUTscroll=false;
var FLAG=null;
var FLAGmode=null;
var TIMEOUTtemp;
var JSONval;
var MON;
var STEPPING;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player; //player must be a div in the form with id 'player')
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'LcOempNj6_g',
    events: {
      'onReady': onPlayerReady,
  //  'onStateChange': onPlayerStateChange  look into this
    }
  });
}
// 4. The API will call this function when the video player is ready.
//function onPlayerReady(event) {
//  alert(player.getDuration())
//  event.target.playVideo();
//  player.playVideo();
//}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false;
//function onPlayerStateChange(event) {
//  if (event.data == YT.PlayerState.PLAYING && !done) {
//      setTimeout(stopVideo, 6000);
//      done = true;
//  }
//}

/*CORE YOU TUBE API ---DONT MESS WITH THIS
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.called by api
//var player;


//^ON VIDEO READY 
//function onPlayerReady(event){
//    statusMsg('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
//   loopsGet(0);
//   }
*/

//REWRITE THE BOOT FUNCTION AS YOU SEE FIT
//^==================================================================
dragElement(document.getElementById("tabs"));
dragElement(document.getElementById("pace"));

function frameNext() {
    var t = player.getCurrentTime();
    statusMsg("FRAME: " + parseInt(t * FPS, 10));
    player.seekTo(t + ((1 * FRAMES) / FPS));
}

function frame() {
    clearTimeout(TIMEOUTscroll)
    if (STEPPING == true) {
        STEPPING = false
        document.getElementById('fpsPlay').innerHTML = "AUTO"
    } else {
        document.getElementById('fpsPlay').innerHTML = "<h0>AUTO</h0>"
        STEPPING = true
        autoStep()
    }
}

function autoStep() { //fake a frame by frame progression
    clearTimeout(TIMEOUTscroll)
        TIMEOUTscroll = setTimeout(function() { //reusing TIMEOUTscroll
            newTime = player.getCurrentTime();
            //var newFrame=parseInt(player.getCurrentTime()*FPS ,10);
            if (FRAMEtime != newTime) {
                FRAMEtime = newTime;
                player.seekTo(newTime + (1 / FPS) * FRAMES);
                statusMsg("FRAME: " + parseInt(player.getCurrentTime() * FPS, 10));
            }
            autoStep();
        }, 100);
    }


function getLevel(lev){
    var levStr
    levStr=document.getElementById('demo').value.split('[')[lev]   
    alert(levStr)
}
function logGet(){//peformed after downloading a network file?????
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

function locGet(){//performed after uploading a local file
    JSONfile=TEMP
    JSONobj=JSON.parse(TEMP)
    statusMsg("LOCAL JSON FILE LOADED...")
    fillVideos()
}


//operations on JSONobj=======================================
function replaceJSONobj(){
    statusMsg("Unable to update JSONobj...Likely Error in text",'red')
    //JSONlast=JSONobj;
    JSONobj=JSON.parse(document.getElementById('demo').value);
    warn();
    statusMsg("Gettng Videos...");
    fillVideos(VID,LOOP);
    statusMsg("Updated JSONobject with your data",'yellow')
}

function restoreJSONobj(){
    statusMsg("Function restoreJSONobj needs work ",'red')   
    x=document.getElementById('demo').value
    JSONobj=document.getElementById('demo').value=JSONlast
    JSONlast=x
    updateEditor()
    statusMsg("Restored Previous JSONobject and Saved your text ",'red')    
}
//Operations on text field===================================
function stringify(){
    statusMsg("ERROR! There is a JSON error in displayed text",'red');
    JSONval=null;
    JSONval=JSON.parse(document.getElementById('demo').value);
    statusMsg('Your displayed text is a valid JSON file','green')
    document.getElementById('demo').value=JSON.stringify(JSONval)
    statusMsg("Your Text Stringified!",'yellow') 
}

function beautify() {
    statusMsg("ERROR! There is a JSON error in displayed text",'red');
    JSONval=JSON.parse(document.getElementById('demo').value);
    document.getElementById('demo').value=JSON.stringify( JSONval,null,3)
    statusMsg("Your Text Beautified!",'yellow') 
}

function validate(){
    statusMsg("ERROR! There is a JSON error in displayed text",'red');
    JSONval=null;
    JSONval=JSON.parse(document.getElementById('demo').value);
    statusMsg('Your displayed text is a valid JSON file','green')
}


//editor operatons====================================================================
function openEditor() {
    if (document.getElementById('editUtool').style.display == 'block') {
        dis('editUtool', 'none')
    } else {
        updateEditor()
        dis('editUtool', 'block')
    }
}

function updateEditor() {
    //File info
    document.getElementById('titleA').value = JSONobj.file.title;
    document.getElementById('descA').innerHTML = JSONobj.file.desc;
    //track info
    document.getElementById('titleB').value = JSONobj.file.tracks[VID].title;
    document.getElementById('utidB').value = JSONobj.file.tracks[VID].utid;
    document.getElementById('notesB').innerHTML = JSONobj.file.tracks[VID].notes;
    //loop info
    document.getElementById('titleC').value = JSONobj.file.tracks[VID].loops[LOOP].title;
    document.getElementById('startC').value = JSONobj.file.tracks[VID].loops[LOOP].start;
    document.getElementById('stopC').value = JSONobj.file.tracks[VID].loops[LOOP].stop;
    document.getElementById('tabC').value = JSONobj.file.tracks[VID].loops[LOOP].tab;
    document.getElementById('descC').innerHTML = JSONobj.file.tracks[VID].loops[LOOP].desc;
    document.getElementById('demo').value = JSON.stringify(JSONobj, null, 4) //show the easiest view of JSONobj
    statusMsg("Updated the editor to the current JSONobj")
}


function updateTabster() {
document.getElementById('stringView').value=JSONobj.file.tracks[VID].loops[LOOP].tab
document.getElementById('editLOOPtab').value=stringToTab(document.getElementById('stringView').value)   
}

function newRate(rate){
    dis('thinking' ,'block');
    player.setPlaybackRate(Number(rate));
    //alert(player.getAvailablePlaybackRates())
    onPlaybackRateChange=dis('thinking' ,'none');   
    
}

function warn(){
    dis('warning','block')
}

//BOOT function==============================================
function boot() {
    statusMsg('Loading javascript...')
    dis('thinking','block')
    //^START CUSTOM BOOT CODE (you can break the boot function into muliple functions)
    MSGready = "WORKING ON THIS SHIT!" //YADA
    //statusMsg('INSERT BOOT CODE HERE!'); //YADA
    if (navigator.onLine) {
        ONLINE = true;
        statusMsg("You are online.");
    } else {
        statusMsg("YOU ARE OFF LINE!", 'red');
        ONLINE = false;
    }
    collectionsGet()
    timeMon()//where to start this????
}

function collectionsGet() { //creates ARRcollections from server or local
    statusMsg("Requesting Collection List'")
    ARRcollections = fileDownload('../Tube/Utool.txt').split("\n");
    selectorBuild('fileIndex', ARRcollections, 0);
    dis('fileIndex', 'block');
    colSelect(0,0,0)
}

function colSelect(col,vid,loop){//creates the ARRcollections select box
    if(isNaN(col)){col=0}
    if(isNaN(vid)){vid=0}
    if(isNaN(loop)){loop=0}
    statusMsg('Collection '+col+ ' selected...'  );
    COL=col;//set the working Collection
    document.getElementById('fileIndex').selectedIndex=COL
    vidsGet(vid,0);}

function vidsGet(vid,loop){//alert('vidsGet('+vid+')');//creates ARRvideos passes default value to selector and default loop
statusMsg('Requesting Collection '+COL);
    if(isNaN(vid)){vid=0}
    if(isNaN(loop)){loop=0}
    if (vid===undefined|vid===''|vid===null){vid=0;}
    FILEname=ARRcollections[COL];
    statusMsg('Getting JSON Collection '+FILEname);
    jsonLoad("../Tube/"+FILEname+".json",vid,loop)
}
function jsonLoad(path,vid,loop) {//XXXshould go to json.js eventually
statusMsg ('Downloading JSON data file: '+path)   
    if(isNaN(vid)){vid=0}
    if(isNaN(loop)){loop=0}
    vid=0;loop=0;
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
    fillVideos(vid,loop)
}

function fillVideos(vid,loop) { //JSONselector(sel,str)
    statusMsg('Cataloging in the Available Videos...'+vid+'>>'+loop)
    var x, val, out;
    if(isNaN(vid)){vid=0}
    if(isNaN(loop)){loop=0}
    out = ""
    for (x in JSONobj.file.tracks) {
        val = JSONobj.file.tracks[x].title
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    TRACKcount=JSONobj.file.tracks.length
    document.getElementById('videos').innerHTML = out
    document.getElementById('videos').selectedIndex=0
    vidSelect(vid,loop)
}

function vidSelect(vid,loop) {
    statusMsg(JSONobj.file.tracks[vid].title+ " video selected.")
    if(isNaN(vid)){vid=0}
    if(isNaN(loop)){loop=0}
    VID = vid;
    VIDnew = true;//????
    LOOPtype = 'none';
    document.getElementById('videos').selectedIndex = vid; //align selector
    UTID = JSONobj.file.tracks[vid].utid;
    UTtitle = JSONobj.file.tracks[vid].title;
    var path = "https://www.youtube.com/embed/" + UTID;
    path = path + "?enablejsapi=1"; //Works but shows ads;SHORTEST WORKING SOLUTION working solution
    document.getElementById('player').src = path;
    if (ONLINE===false) {
        statusMsg("YOU ARE OFFLINE!  YOU TUBE WONT WORK!");
        loopsGet(loop);
    }else{
        statusMsg('Waiting for Video to load...','red');
        dis('thinking','block');
        //loopsGet()
    }
}
//^ON VIDEO READY =====================================================
function onPlayerReady(event){
  statusMsg('VIDEO READY...','blue');
  loopsGet(LOOP);}

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
    document.getElementById('loopStart').value=LOOPstart = JSONobj.file.tracks[VID].loops[LOOP].start; //in seconds
    document.getElementById('loopFinish').value=LOOPfinish = JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds
    LOOPtab=JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds
    LOOPtab=JSONobj.file.tracks[VID].loops[LOOP].tab; //in seconds
    LOOPnote=JSONobj.file.tracks[VID].loops[LOOP].desc; //in seconds
    MSGready=LOOPname+ " Ready...("+ LOOPstart + " --> " + LOOPfinish +" seconds.)"
    if (document.getElementById('editUtool').style.display=='block' ){
        updateEditor()
        MSGready="Editor in use and updated with the current data file"
    }
    if (document.getElementById('tabster').style.display=='block' ){
        updateTabster()
        MSGready="Tabster in use and updated with the current data file"
    }
    changeMode('Paused');
    
    //^COMMON CODE (FINISH BOOT)
    dis('thinking','none')
    finishBoot()
}

//End of Boot============================================================================
//UTOOL specific operations (not JSONedit related)
function changeMode(mode) {
    FLAG = null;
    FLAGmode = null;
    clearTimeout(TIMEOUTloop);
    clearTimeout(TIMEOUTdelay);
    var loopLen = LOOPfinish - LOOPstart * 1000
    var delay = 10000
    statusMsg(mode)
    clearTimeout(TIMEOUTloop);
    if (mode == 'Playing...') {
        player.playVideo()
        dis('runImg', 'block')
    } else if (mode == 'Paused') {
        player.pauseVideo()
        dis('loopStopper', 'none');
        dis('runImg', 'none')
    } else if (mode == 'Reset') {
        dis('runImg', 'none')
        player.pauseVideo()
        player.seekTo(0)
        dis('runImg', 'none')
        dis('loopstopper', 'none')
    } else if (mode == 'Repeating...') {
        player.seekTo(LOOPstart);
        player.playVideo();
        document.getElementById('loopStopper').style.left = "45%";
        dis('loopStopper', 'block');
        FLAG = LOOPfinish;
        FLAGmode = 'Delay...';
    } else if (mode == 'Sequencing Loops...') {
        player.seekTo(LOOPstart);
        document.getElementById('loopStopper').style.left = "65%";
        dis('loopStopper', 'block');
        player.playVideo();
        FLAG = LOOPfinish
        FLAGmode = 'Delaying Sequence...'
    } else if (mode == 'Delaying Sequence...') {
        player.pauseVideo()
        var nextLoop = 0
        if (LOOP < LOOPcount - 1) {
            LOOP = LOOP + 1;
        } else {
            LOOP = 0;
        }
        statusMsg("Loop " + parseInt(LOOP + 1, 10) + " selected...")
        LOOPname = JSONobj.file.tracks[VID].loops[LOOP].title;
        document.getElementById('loopStart').value = LOOPstart = JSONobj.file.tracks[VID].loops[LOOP].start; //in seconds
        document.getElementById('loopFinish').value = LOOPfinish = JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds
        LOOPtab = JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds
        LOOPtab = JSONobj.file.tracks[VID].loops[LOOP].tab; //in seconds
        LOOPnote = JSONobj.file.tracks[VID].loops[LOOP].desc; //in seconds
        player.seekTo(LOOPstart);
        player.pauseVideo()
        dis('runImg', 'none')
        document.getElementById('loops').selectedIndex = LOOP
        TIMEOUTdelay = setTimeout(function() {
            changeMode('Sequencing Loops...');
        }, document.getElementById('delay').value);
    } else if (mode == 'Delay...') {
        player.pauseVideo()
        player.seekTo(LOOPstart)
        player.pauseVideo()
        dis('runImg', 'none')
        TIMEOUTdelay = setTimeout(function() {
            changeMode('Repeating...');
        }, document.getElementById('delay').value);
    } else if (mode == 'Looping...') {
        player.seekTo(LOOPstart);
        player.playVideo();
        document.getElementById('loopStopper').style.left = "55%";
        dis('loopStopper', 'block');
        FLAG = LOOPfinish;
        FLAGmode = 'Loop Ended';
    } else if (mode == 'Loop Ended') {
        player.seekTo(LOOPstart);
        player.pauseVideo();
        dis('loopStopper', 'none');
        dis('runImg', 'none');
    }
}

function loopReset(){
    document.getElementById('loopStart').value=LOOPstart = JSONobj.file.tracks[VID].loops[LOOP].start; //in seconds
    document.getElementById('loopFinish').value=LOOPfinish = JSONobj.file.tracks[VID].loops[LOOP].stop; //in seconds    
}




function loopSet(stst, delta) { //user can edit loop start and stop
    var t;
    if (stst == 'start') {
        if (delta == 0) {
            t = parseInt(player.getCurrentTime(), 10)
        } else {
            t = parseInt(parseInt(LOOPstart, 10) + parseInt(delta, 10), 10)
        }
        LOOPstart = document.getElementById('loopStart').value = t;
    } else {
        if (delta == 0) {
            t = parseInt(player.getCurrentTime(), 10)
        } else {
            t = parseInt(parseInt(LOOPfinish, 10) + parseInt(delta, 10), 10)
        }
        LOOPfinish = document.getElementById('loopFinish').value = t;
    }
}

function timeMon() { //PLAYERtimecurrent loop position  
    TIMEOUTtime = setTimeout(function() {
        clearTimeout(TIMEOUTtime);
        if (player.getCurrentTime()<=MON) {
            dis('runImg','none')
        }else if (player.getCurrentTime()>MON) {
        dis('runImg','block')
        }
        MON=player.getCurrentTime()
        PLAYERtime = parseInt(player.getCurrentTime(), 10);
        document.getElementById('trackTime').innerHTML = PLAYERtime
        if (PLAYERtime >= FLAG & FLAGmode != null) {
            changeMode(FLAGmode)
        }
        timeMon();
    }, 100);
}

function rotatePlayer(deg){
deg=document.getElementById('spinner').value
var str = "rotate("+ deg +"deg)"
    // Code for IE9
    document.getElementById("player").style.msTransform = str;
    // Standard syntax
    document.getElementById("player").style.transform = str;
statusMsg("Rotated "+deg+"%")
}

function levelPlayer(){
    var str="rotate(1deg)"
    document.getElementById("player").style.msTransform = str;
    document.getElementById("player").style.transform=str;
    document.getElementById('spinner').value=1

    statusMsg('Leveled Player...')
    //document.getElementById("player").style.transform="rotate(0deg)"
    document.getElementById('spinner').value=0;
    }
    




function sizeFrame(mag){//sizes the video
  MAG=mag;
  document.getElementById('player').style.width =MAG+"%";
  document.getElementById('player').style.height =MAG+"%";
  statusMsg("Magnified "+MAG+"%")
  }