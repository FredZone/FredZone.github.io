
//*ADD GLOBAL VARIABLES HERE!!!!
var ARRcollections;
var FILEname;
var UTID
var VID
var UTtitle
var COL=0

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
var TIMEOUTloop;
var TIMEOUTdelay

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
function boot() {
    statusMsg('Loading javascript...')
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
}

function collectionsGet() { //creates ARRcollections from server or local
    statusMsg("Requesting Collection List'")
    ARRcollections = fileDownload('Utool.txt').split("\n");
    selectorBuild('fileIndex', ARRcollections, 0);
    dis('fileIndex', 'block');
    colSelect(0)
}

function colSelect(col){//creates the ARRcollections select box
    if (col===undefined|col===null|col===''){col=0;}
    statusMsg('Collection '+col+ ' selected...'  );
    COL=col;//set the working Collection
    document.getElementById('fileIndex').selectedIndex=COL
    vidsGet(col);}

function vidsGet(vid){//alert('vidsGet('+vid+')');//creates ARRvideos passes default value to selector and default loop
    statusMsg('Requesting Collection '+COL);
    if (vid===undefined|vid===''|vid===null){vid=0;}
    FILEname=ARRcollections[COL];
    
    //FILEname='Inwork'
    statusMsg('Getting JSON Collection '+FILEname);
    jsonLoad("../Tube/"+FILEname+".json")
}
function jsonLoad(path) {//XXXshould go to json.js eventually
    statusMsg ('Downloading JSON data file: '+path)
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
    fillVideos()
}

function fillVideos() { //JSONselector(sel,str)
    statusMsg('Listing the Available Videos...')
    var x, val, out;
    out = ""
    for (x in JSONobj.file.tracks) {
        val = JSONobj.file.tracks[x].title
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    document.getElementById('videos').innerHTML = out
    document.getElementById('videos').selectedIndex=0
    vidSelect(0)
}

function vidSelect(vid) {
    statusMsg(JSONobj.file.tracks[vid].title+ " video selected.")
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
        loopsGet(0);
    }else{
        statusMsg('Waiting for Video to load...','red')
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
    changeMode('Paused');
    
    //^COMMON CODE (FINISH BOOT)
    
    finishBoot()
}

//============================================================================

function changeMode(mode) {
    clearTimeout(TIMEOUTloop);
    clearTimeout(TIMEOUTdelay);
    var loopLen =LOOPfinish-LOOPstart*1000
    var delay=10000
    statusMsg(mode)
    clearTimeout(TIMEOUTloop);
    if (mode == 'Playing...') {
        player.playVideo()
        dis('runImg', 'block')
    } else if (mode == 'Paused') {
        player.pauseVideo()
        dis('loopStopper','none');
        dis('runImg', 'none')
    } else if (mode == 'Reset') {
        dis('runImg', 'none')
        player.pauseVideo()
        player.seekTo(0)
        dis('runImg', 'none')
        dis('loopstopper', 'none')
    } else if (mode == 'Looping...') {
        document.getElementById('loopStopper').style.left="55%";
        dis('loopStopper','block');
        loopLen =(LOOPfinish-LOOPstart)*1000;
        player.pauseVideo()
        player.seekTo(LOOPstart)
        player.playVideo()
        dis('runImg', 'block')
        TIMEOUTloop = setTimeout(function() {
            //clearTimeout(TIMEOUTloop);
            changeMode('Paused');
            }, loopLen);
    } else if (mode == 'Repeating...') {
        player.seekTo(LOOPstart)
        document.getElementById('loopStopper').style.left="45%";
        player.pauseVideo()
        dis('loopStopper','block');
        loopLen =(LOOPfinish-LOOPstart)*1000;
        dis('runImg', 'block')
        player.playVideo()
        
        TIMEOUTloop = setTimeout(function() {
            //clearTimeout(TIMEOUTloop);
            changeMode('Delay...');
            }, loopLen);
    } else if (mode == 'Delay...') {
        player.pauseVideo()
        player.seekTo(LOOPstart)
        player.pauseVideo()
        dis('runImg', 'none')
        TIMEOUTdelay = setTimeout(function() {
            //clearTimeout(TIMEOUTdelay);
            changeMode('Repeating...');
            }, document.getElementById('delay').value);

    }
}


function loopSet(stst, delta) {
    var t;
    if (stst=='start') {
        if (delta==0) {
            t=parseInt(player.getCurrentTime(),10)
        }else {
            t=parseInt(parseInt(LOOPstart,10)+parseInt(delta,10),10)
        }
        LOOPstart=document.getElementById('loopStart').value = JSONobj.file.tracks[VID].loops[LOOP].start = t;
    }else{
        if (delta==0) {
            t=parseInt(player.getCurrentTime(),10)
        }else {
            t=parseInt(parseInt(LOOPfinish,10)+parseInt(delta,10),10)
        }
        LOOPfinish=document.getElementById('loopFinish').value = JSONobj.file.tracks[VID].loops[LOOP].finish = t;
    }
}




