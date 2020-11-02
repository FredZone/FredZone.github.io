//*ADD GLOBAL VARIABLES HERE!!!!
var ARRcollections;
var ARRvideos;
var COL
var VID;
var UTID
var UTtitle
var BACKTRACK
var TRACKcount
var FILEname
var PATH

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
    videoId: 'nveEtVqYyvw',
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
function info() {
  var txt = 'TITLE: ' + JSONobj.video[VID].title;
  txt = txt + '<br>NOTES: ' + JSONobj.video[VID].notes;
  txt = txt + '<br>KEY: ' + JSONobj.video[VID].key;
  txt = txt + '<br>CLASS: ' + JSONobj.video[VID].class;
  txt = txt + '<br> TEMPO: ' + JSONobj.video[VID].tempo;
  txt = txt + '<br>START: ' + JSONobj.video[VID].start;
  txt = txt + '<br>STOP: ' + JSONobj.video[VID].stop;
  txt = txt + '<br>Chords:<br>' + JSONobj.video[VID].chords;
  popUp(txt, "Track Information", undefined, 'lightgrey');
  //document.getElementById('popper').style.textAlign='left';
}

function chords(){
  var txt =JSONobj.video[VID].chords;
  popUp(txt, "Chord Pattern", undefined, 'lightgrey');
}


//REWRITE THE BOOT FUNCTION AS YOU SEE FIT

function boot() {
    //dis('splash')
    //dis('thinking')
    statusMsg('Loading javascript!');
    MSGready = "Ready" ;//YADA
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
    statusMsg("Requesting Collection List'");
    ARRcollections = fileDownload('Tracks.txt').split("\n");
    selectorBuild('fileIndex', ARRcollections, 0);
    dis('fileIndex', 'block');
    colSelect(0, 0)
}

function colSelect(col, vid) { //creates the ARRcollections select box
    if (isNaN(col)) {
        col = 0;
    }
    if (isNaN(vid)) {
        vid = 0;
    }
    statusMsg('Collection ' + col + ' selected...');
    COL = col; //set the working Collection
    document.getElementById('fileIndex').selectedIndex = COL
    vidsGet(vid, 0);
}

function vidsGet(vid){//alert('vidsGet('+vid+')');//creates ARRvideos passes default value to selector and default loop
    statusMsg('Requesting Collection '+COL);
    if(isNaN(vid)){vid=0}
    if (vid===undefined|vid===''|vid===null){vid=0;}
    FILEname=ARRcollections[COL];
    statusMsg('Getting JSON Collection '+FILEname);
    jsonLoad("../Tracks/"+FILEname+".json",vid);
}
function jsonLoad(path,vid) {//XXXshould go to json.js eventually
    statusMsg ('Downloading JSON data file: '+path)   
    if(isNaN(vid)){vid=0}
    vid=0;
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
    JSONobj=JSON.parse(content);
    fillVideos(vid)
}

function fillVideos(vid) { //JSONselector(sel,str)
    statusMsg('Cataloging in the Available Videos...');
    var x, val, out;
    if(isNaN(vid)){vid=0}
    out = ""
    for (x in JSONobj.video) {
        val = JSONobj.video[x].title;
        out = out + "<option value='" + val + "'>" + val + "</option>"
    }
    TRACKcount=JSONobj.video.length;
    document.getElementById('videos').innerHTML = out;
    document.getElementById('videos').selectedIndex=0;
    vidSelect(vid);
}

function vidSelect(vid) {
    //statusMsg(JSONobj.title+ " video selected.")
    if(isNaN(vid)){vid=0}
    VID = vid;
    VIDnew = true;//????
    document.getElementById('videos').selectedIndex = vid; //align selector
    UTID = JSONobj.video[vid].utid;
    UTtitle = JSONobj.video[vid].title;
    var path = "https://www.youtube.com/embed/" + UTID;
    path = path + "?enablejsapi=1"; //Works but shows ads;SHORTEST WORKING SOLUTION working solution
    document.getElementById('player').src = path;
    PATH=path;
    if (ONLINE===false) {
        statusMsg("YOU ARE OFFLINE!  YOU TUBE WONT WORK!");
    }else{
        statusMsg('Waiting for Video ('+UTID+') to load...','red');
        dis('thinking','block');
        dis('popper','none')
    }
}
//^ON VIDEO READY =====================================================
function onPlayerReady(event){
  if (PATH!=undefined) {
    finishBoot();
  }
}

//^Unique functions==================================================

function crapola() {alert('CRAPOLA')}




