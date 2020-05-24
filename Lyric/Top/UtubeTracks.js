var TIMEOUTbtMon
var OLDdur=100
var BACKTRACKstart=0
var BACKTRACKstop=undefined
var BACKTRACKnumber = 0
var BACKTRACKtitle = "undetermined";
var BACKTRACKid = undefined
var BACKTRACKpath = undefined
var BACKTRACKkey = "undetermined";
var BACKTRACKclass ="undetermined";
var BACKTRACKtempo = 90
var BACKTRACKnotes = "No Notes"
var BACKTRACKdur=undefined
var TEMP
var ARRloops
var NOTEShtml="NO NOTES"
var LOOPING=false
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
  player2 = new YT.Player('player2', {
    events: {
      'onReady': statusMsg('UTUBE API Ready')
    }
  });
}
//Starting the BOOT after Global onload()==================================================================================
function start() {
  statusMsg('Starting of app unique code');
  //Start Custom Boot Routine
  //................................
  //End Custom Boot routine
  dis('splash', 'none');
  document.getElementById('msg').style.top = '0%';
  dis('debugButton', 'block') //after development change to none
  btGetList('Modes')
}

function btGetList(path) { //get the backtrack List
  statusMsg("Requesting File: " + path)
  dis('btPlaying', 'none');
  dis('btLooping', 'none');
  document.getElementById('btIndex').style.display = 'block';
  path = '../Utool/btLists/' + path + '.csv';
  ARRbacktracks = fileDownload(path)
  ARRbacktracks = ARRbacktracks.split('\n');
  ARRbacktracks.splice(0, 1); //Remove Title line
  var arr = "".split(",");
  var arr2 = "".split(",");
  for (j = 0; j < ARRbacktracks.length; j++) {
    arr2 = ARRbacktracks[j].split(',');
    arr.splice(j, 0, arr2[0]);
  }
  selectorBuild('btIndex', arr, 0);
  //document.getElementById('player2').src = "XXX"; //kill current player
  document.getElementById('btIndex').selectedIndex = 0; //select 0
  BOOT = false;
  selectBT(0);
}

function selectBT(num) {
  var arr = ''.split(',')
  OLDdur = parseInt(player2.getDuration())
  statusMsg("Configuring Utube track "+num+" (Old Duration: "+OLDdur+">>>"+BACKTRACKdur+")");
  BACKTRACKnumber = num
  TEMP = ARRbacktracks[BACKTRACKnumber].split(',');
  BACKTRACKtitle = TEMP[0];
  BACKTRACKid = TEMP[1];
  BACKTRACKpath = "https://www.youtube.com/embed/" + BACKTRACKid + "?autoplay=0&enablejsapi=1&rel=0";
  document.getElementById('player2').src = BACKTRACKpath;
  BACKTRACKnumber = num
  BACKTRACKkey = TEMP[2];
  BACKTRACKclass = TEMP[3];
  BACKTRACKtempo = TEMP[4];
  BACKTRACKnotes = TEMP[5];
  if (BACKTRACKnotes==undefined) {
    BACKTRACKnotes = 'NO NOTES'
  }
  if (isNaN(BACKTRACKtempo)) {
    BACKTRACKtempo = '???';
  }
  dis('notesShow', 'block');
  ARRloops = "".split(",")
  ARRloops[0] = "0-10-Bogus" //artificial first article
  arr[0] = 'Full Track'
  for (n = 6; n < TEMP.length; n++) {
    ARRloops[n - 5] = TEMP[n]
    arr[n - 5] = TEMP[n].split('-')[2];
  }
  document.getElementById('info').innerHTML = BACKTRACKnotes;
  selectorBuild('loopIndex', arr, 0);
  if (isNaN(BACKTRACKtempo)) {
    BACKTRACKtempo = '???';
  }
  document.getElementById('tempoGetter').innerHTML = 'TEMPO<br>TOOL';
  getDur();
}

function getDur(num) {//use this until you can figure out how to wait until the new duration is here....
  statusMsg( BACKTRACKtitle  +" Loading...")
  TIMEOUTbtMon = setTimeout(function() {
    clearTimeout(TIMEOUTbtMon);
    BACKTRACKdur = parseInt(player2.getDuration())
    if (OLDdur != BACKTRACKdur) {
      OLDdur = BACKTRACKdur;
      trackConfig();
    } else {
      getDur(num);
    }
  }, 500);
}
  
function trackConfig(num){
  var arr = ''.split(',')
  statusMsg('Configuring Track')
  ARRloops[0] = "0-" + BACKTRACKdur + "-" + BACKTRACKtitle
  loopSelect(0)
}

function loopSelect(num) {
  var stuff = ARRloops[num].split('-')
  statusMsg("Loading SubTrack: " + stuff[2])
  document.getElementById('btGo').innerHTML = BACKTRACKstart = stuff[0]
  document.getElementById('btEnd').innerHTML = BACKTRACKstop = stuff[1]
  player2.seekTo(BACKTRACKstart);
  
  player2.pauseVideo();
  statusMsg(BACKTRACKtitle + " READY! (TRACK " + num + ": READY at " + BACKTRACKstart + "secs)");
}
//START of PLAY ROUTINES====================================================================================
function btReset(){}

function btPlay(looping) {
  var ct=player2.getCurrentTime()
  var typ="PLAYING: ";
  if(looping==true){
    typ="LOOPING: "
    LOOPING = true
    }
  statusMsg(typ+BACKTRACKstart+"-->"+ct+"-->"+BACKTRACKstop)
  if (ct >= BACKTRACKstop) {
    statusMsg("Going back to start of track at " + BACKTRACKstart)
    player2.seekTo(BACKTRACKstart);
  } else if (ct < BACKTRACKstart) {
    player2.seekTo(BACKTRACKstart)
    statusMsg("Going forward to start of track at " + BACKTRACKstart)
  } else {
    statusMsg('Playing from where you are...')
    player2.playVideo();
  }
  if (looping == true) {
    statusMsg('Looping track')
    dis('btPlaying', 'none');
    dis('btLooping', 'block');
     } else {
    statusMsg('Playing track once')
    LOOPING = false
    dis('btPlaying', 'block');
    dis('btLooping', 'none');
  }
  clearTimeout(TIMEOUTbtMon);
  //player2.playVideo();
  btMonitor();
}

  function btMonitor() {
    var ms=1000
    TIMEOUTbtMon = setTimeout(function() {
      clearTimeout(TIMEOUTbtMon);
      if (player2.getCurrentTime() > BACKTRACKstop) {
        statusMsg('Resetting Track...')
        player2.pauseVideo();
        player2.seekTo(BACKTRACKstart)
        if (LOOPING == true) {
          delay(3000)
          statusMsg('Looping Track...')
          
          btPlay(true); //go to start
        } else {
          statusMsg('Track Complete')
          dis('btPlaying', 'none')
          return;
        }
      } else {
        btMonitor();
      }
      document.getElementById('btLoop').innerHTML = parseInt(player2.getCurrentTime(), 10) + "/" + BACKTRACKdur
    }, ms);
  }

  function btStop() {
    clearTimeout(TIMEOUTbtMon);
    LOOPING = false
    player2.pauseVideo();
    dis('btPlaying', 'none');
    dis('btLooping', 'none');
    statusMsg('Stopped Track');
  }



//End of player routines=================================================================================

function backTrackInfo() {
  statusMsg('Processing Back Track Links and Notes')
  var lin="";
  U=(document.URL)
  var arr = BACKTRACKlinks.split('@');
  for (n = 0; n < arr.length; n++) {
    lin=" "+lin+(n+1)+": <a onclick=window.open(\""+arr[n].split('-')[1]+"\")>"+ arr[n].split('-')[0] + "</a><br>"
  }
  return lin
}

function notesUp(){
document.getElementById('info').innerHTML=NOTEShtml
dis('infoBox')
}


function delay(ms) {
  statusMsg("Delay")
  if (ms == 0) {
    return 0 //code
  } else {
    var n = 1;
    var t = new Date().getTime() + ms
    while (new Date().getTime() < t) {
      n = n + 0
    }
    return 0
    statusMsg("#==========Resume...==========")
  }
return 0
}



function setBT(typ) {
  var s = parseInt(player2.getCurrentTime(), 10);
  if (typ == 'start') {
    BACKTRACKstart = s;
    document.getElementById('btGo').innerHTML = s;
  } else {
    BACKTRACKstop = s;
    document.getElementById('btEnd').innerHTML = s;
  }
}

function btReady() {
  dis('btLooping', 'none');
  dis('btPlaying', 'none');
  player2.pauseVideo();
  var dur = parseInt(player2.getDuration(), 10);
  BACKTRACKdur=dur
  clearTimeout(TIMEOUTbtMon);
  if (isNaN(BACKTRACKstart) === true | BACKTRACKstart <= 0) {
    BACKTRACKstart = parseInt(0, 10);
  }
  if (isNaN(BACKTRACKstop) === true | BACKTRACKstop <= 0 | BACKTRACKstop > dur) {
    BACKTRACKstop = dur - 2;
  }
  document.getElementById('btGo').innerHTML = BACKTRACKstart;
  document.getElementById('btEnd').innerHTML = BACKTRACKstop;
  
  
  document.getElementById('btLoop').innerHTML = BACKTRACKstop - BACKTRACKstart + ' sec';
  player2.seekTo(BACKTRACKstart);
  player2.pauseVideo();
  statusMsg(BACKTRACKtitle + ': Ready...');
}

function XXbtClose() {
  dis('backTrackBar', 'none');
  player2.pauseVideo();
  dis('backTrackBar', 'none');
  player2.seekTo(BACKTRACKstart);
  clearTimeout(TIMEOUTbtMon);
  document.getElementById('btLoop').innerHTML = "Stopped";
  dis('btLooping', 'none');
  dis('btPlaying', 'none');
}

function XXXbtStartLoop() {
  document.getElementById('btLoop').innerHTML = "Resetting";
  clearTimeout(TIMEOUTbtMon);
  player2.seekTo(BACKTRACKstart);
  player2.playVideo();
  dis('btLooping', 'block');
  dis('btPlaying', 'none');
  btMonitor();
  statusMsg('Looping '+BACKTRACKtitle+'...');
}

function XXbtStopLoop() {
  clearTimeout(TIMEOUTbtMon);
  player2.pauseVideo();
  document.getElementById('btLoop').innerHTML = "Stopped";
  dis('btPlaying', 'none');
  dis('btLooping', 'none');
  statusMsg('Stopped...');
}

function winOpen(path){
  alert('Opening: ' +path)

    window.open(path,'Your Utube Selection');  
}

function XXloopLoad(start,stop){
  BACKTRACKstart=start
  BACKTRACKstop=stop
  btStartLoop()
  
  
}