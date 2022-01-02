//https://developers.google.com/youtube/iframe_api_reference
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Universal variables
var ARRloops;
var TITLE='DEFAULT';
var MODE='pause';
var MSGlast="???"; //last message
var IFRAME=1;
var player;
var LOOPING=false;//is it playing loop
var LOOPstart=0;
var LOOPfinish=0;
var LOOPtype='one time';
var LOOPpause=4000;//milliseconds of pause
var LOOPtime=0;//set by the monitor
var TIMEOUTloop;
var TIMEOUTtime;
var VID="SuN1iztGzn0";  //default video
var DUR=0;
var MAG=100;
var UTID;
var PASS;

  function pathProcess()
    {
        str="";
        ARRLoops=path.split(';');
        var a=1;var n=1;
        while(a>ARRloops.length)
        {
            str=str+'<option value='+ARRloops[a]+"#"+ARRloops[a+1]+ ">Loop #"+n+"<option>\n" ;
            a=a+2; n=n+1 ;  
        }
        alert(str);
        loadVideo();
    }

//LOAD ROUTINE==============================================================================

window.onload = function()
    {
        statusMsg('Loading Javascript....');
        MSGlast="...";
        document.getElementById("msg").style.top='0%';
        document.getElementById("splash").style.display='none';
        ARRloops=receiveARR(';');
        if (ARRloops[0]===undefined|ARRloops[0]==='') {ARRLoops=('XIkU8ExZW34#DEFAULT VIDEO;5;10').split(';');}
        loadVideo();
    };

function loadVideo()
    {
        statusMsg('Loading...','yellow');
        vis('blocker','visible');
        LOOPstart=0;LOOPfinish=0;
        if (ARRloops[1]!==undefined) {LOOPstart=a[1];}else{LOOPstart=0;}
        if (ARRloops[2]!==undefined) {LOOPfinish=a[2];}else{LOOPfinish=10;}
        UTID=ARRLoops[0].split('#')[0];
        TITLE=ARRLoops[0].split('#')[1];
        statusMsg("Loading..."+TITLE + " ("+UTID+")",'yellow');
        var str="//www.youtube.com/embed/";
        str=str+UTID+"?enablejsapi=1"; //call the javascript api
        str=str+"&rel=0";//stops utube from showing more pages
        document.getElementById('video').src=str;
        onYouTubePlayerAPIReady();
    }

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady()
    {statusMsg('Initiating Player...','yellow');
      // create the global player from the specific iframe (#video)
      player = new YT.Player('video', {
        events: {
          // call this function when player is ready to use
          'onReady': onPlayerReady
        }
      });
    }


function onPlayerReady(event)
    {
    statusMsg('Finalizing Controls...','yellow');
    //set up the loop
    LOOPING=false;
    setLoop('start',undefined,LOOPstart);
    setLoop('finish',undefined,LOOPfinish);
    LOOPtime=0;
    document.getElementById('loopTime').innerHTML="0:00";
    //set minimal pause
    LOOPpause=document.getElementById('pause').value=2000;
    sizeFrame(1);
    if (TITLE===undefined) {TITLE = 'NAMELESS VIDEO';}
    document.getElementById('mag').value="1";
    document.getElementById('rate').value=1;
    document.getElementById('slider1').max=DUR;
    document.getElementById('slider1').value=0;
statusMsg('mode')   
    mode('pause');
statusMsg('DUR')   
//DUR=player.getDuration();
    statusMsg(TITLE+" Loaded ("+secToMin(DUR)+" Duration)",'green');
statusMsg('Blocker');
document.getElementById('blocker').style.visibility='hidden';
statusMsg('TIMEmon') ; 
    timeMon();//start the monitor of time
    }


function loadLick(str)
    {
        var arr=str.split(";");
        loadVideo(arr[0],arr[1],arr[2]);
    }


function mode(m)
    {
    if (m=='play')
        {
           MODE='play';
           //vis('runImg','visible');
          // document.getElementById('runImg').style='visible';
           //player.playVideo();
           statusMsg("Video Playing...",'lightgreen');
           
        }
    else if (m=='pause')
        {
           MODE='pause';
           //document.getElementById('runImg').style='hidden';
           //vis('runImg','hidden');
          // player.pauseVideo();
           statusMsg("Video Paused...",'lightyellow');
        }
    }
function setLoop(param,inc,secs)
    {       
        var t;
        if (secs!==undefined) {t=secs;}//if seconds are specified
     
        else if (inc===undefined)// if current time is to be used
            {t=player.getCurrentTime();}
        else //if curent parameter is to be incremented
            {
                t=eval("LOOP"+param);
                if (t+inc<DUR & t+inc>0){t=t+inc;}
            }
        document.getElementById('loop'+param).value=secToMin(t);
        this["LOOP"+param] = t;
    }

function loop(tp)
    {//play, pause, clear
        LOOPtype=tp;
        var pos;
        if (tp=='stop'){
            LOOPING=false;
            vis('loopStopper','hidden');
            mode('pause');
        }else {
            if (tp=='one time') {pos='60%';}else{pos='50%';}
            document.getElementById('loopStopper').style.left=pos;
            LOOPING=true;
            vis('loopStopper','visible');
            player.seekTo(LOOPstart);
            player.playVideo();
            mode('play');
        }
        statusMsg('Loop Playing...');
    }
   
function timeMon()
    {   
        TIMEOUTtime=setTimeout(function()
            {
            var newTime = player.getCurrentTime();
            if (newTime+1>DUR & MODE=='play'){mode('pause');}//end of video
            if (LOOPING===true & newTime>=LOOPfinish)//stop loop
                {
                    mode('pause');
                    player.seekTo(LOOPstart);
                    if (LOOPtype=="one time")
                    {
                        vis('loopStopper','visible');
                        LOOPING=false;
                        statusMsg("Video Reset to "+secToMin(LOOPstart));
                        vis('loopStopper','hidden');
                        cto();
                    }
                    else if (LOOPtype=='repeating')
                    {
                    var p= secToMin(parseInt(LOOPpause/1000,10));
                    statusMsg('Loop Paused for '+p+'...');
                    TIMEOUTloop=setTimeout(function(){mode('play');},LOOPpause);
                    }
                }
            if (LOOPtime!=newTime)
                {vis('runImg','visible');vis('buttonPlay','hidden');}
            else
                {vis('runImg','hidden');vis('buttonPlay','visible');}
            LOOPtime=newTime;
            document.getElementById('loopTime').innerHTML=secToMin(LOOPtime);
            document.getElementById('slider1').value=LOOPtime;
            timeMon();    
            },100);  
    }   

function resetFrame()
    {
        MAG=100;
        document.getElementById('video').style.height =MAG+"%";
        document.getElementById('video').style.width =MAG+"%";
        document.getElementById('mag').value ="100%";
    }

function sizeFrame(mag)
    {
    MAG=mag*100;       
    document.getElementById('video').style.width =MAG+"%";
    document.getElementById('video').style.height =MAG+"%";
    }

function resetVideo()
    {   
        cto();
        LOOPING=false;
        LOOPtime=0;
        player.seekTo(0);
        LOOPstart=10;
        LOOPfinish=15;
        player.pauseVideo();
        document.getElementById('runImg').style.visibility ='hidden';
        document.getElementById('loopTime').innerHTML="0:00";
        mode('pause');
        statusMsg("Video Reset");
    }

function vTime(t)
    {player.seekTo(t);}

function setVid(typ,val)
    {
        var t;
        if (typ=='inc')
        {
            mode('pause');
            t=LOOPtime+val;
            if (t >0 | t<DUR){player.seekTo(t);}
        }else if (typ=='go'){    
           t=val; 
           if (t >0 | t<DUR){player.seekTo(t);}
        }
    }

function cto()
    {
         clearTimeout(TIMEOUTloop);
    }

function home(){window.open("index.html");}

function vis(iconID,style)
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
    }
    
function videoPlay()
    {
        LOOPING=false;
        vis('loopStopper','hidden');
        mode('play');
        statusMsg("Video Playing");
    }
function videoPause()   
    {
        LOOPING=false;
        vis('loopStopper','hidden');
        mode('pause');
        statusMsg("Video Paused...",'yellow');
    } 

function videoReset()
    {
        resetVideo();
    }    


//================================================================================

