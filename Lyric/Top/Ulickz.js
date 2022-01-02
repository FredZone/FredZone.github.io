//https://developers.google.com/youtube/iframe_api_reference
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Universal variables
var ARRvideos="";//[0]=UTID#TITEL [1...]loopStart#LoopFinish
var ARRcollections="";
var ARRloops="";
var DUR=0;//in seconds
var IFRAME=1;
var LOOPstart=0;//in seconds
var LOOPfinish=0;//in seconds
var LOOPtype;
var LOOPpause=2000;//milliseconds of pause
var LOOPtime=0;//set by the monitor
var MAG=100;//in percent
var MODE='Paused...';
var MODEold='Paused...';
var MODEholder=undefined
var MSGlast="???"; //last message
var player;
var TIMEOUTloop;
var TIMEOUTtime;
var TIMEOUTwait;
var UTID;//You Tube Id (8 char?)
var VIDnumber;//pass the video number past an event function

function loadUTID()
    {
        var str =prompt("Paste your YouTube URL here...", "https://www.youtube.com/watch?v=Fd7BrjdTnrg");
        var arr;
        id= uTubeGetId(str);
        str=id+"#"+prompt("Choose a name for your video?","My Video");//+";0#10;30#40";
        ARRvideos.splice(0,0,str);
        var n=0;
        str="";
        while(n<ARRvideos.length)
        {
            str=str+(ARRvideos[n].split(';')[0]).split('#')[1]+"\n";
            n=n+1;
        }
        arr=str.split('\n');
        selectorBuild('videos',arr);
        EDITED=true;
        loadVideo(0);
    }
    
function   mode(M){MODEholder=M}

//LOAD ROUTINE==============================================================================
//window.onbeforeunload = function(){alert('shit');};

window.onload = function()
    {
    vis ('blocker','visible');
    document.getElementById("msg").style.top='0%';
    document.getElementById("splash").style.display='none';
    statusMsg("Loading javascript...");
    TITLE='BOOTING';
    MSGlast="...";
    statusMsg('Downloading Default Lesson Files');
    ARRcollections=fileDownload('UtubeUtool.txt').split("\n");
    selectorBuild('fileIndex',ARRcollections);
    getVideoList(0);
    };

function getVideoList(i)
    {
        MODE='Loading...';
        statusMsg('Downloading Default Video List');
        var arr;
        var str="";
        var n=0;
        var path="../Utool/"+ARRcollections[i]+".txt";
        ARRvideos=fileDownload(path).split('\n');
        while(n<ARRvideos.length)
        {
            str=str+(ARRvideos[n].split(';')[0]).split('#')[1]+"\n";
            n=n+1;
        }
        arr=str.split('\n');
        selectorBuild('videos',arr);
        loadVideo(0);
    }

function loadVideo(i) //loads video  & creates ARRloops
    {
        MODE="Loading...";
        //vis ('blocker','visible');
        //if(i==NaN){alert(i);}
        UTID=ARRvideos[i].split('#')[0];
        document.getElementById('idiv').innerHTML="<iframe  id='video' style='position:absolute;left:0%;top:0%;width:100%;height:100%;'></iframe>";
        document.getElementById('video').contentWindow.document.write("<html><body>...LOADING</body></html>");
        statusMsg("Loading..."+UTID,'yellow');
        var path ="//www.youtube.com/embed/"+UTID;
        path=path+"?enablejsapi=1"; //call the javascript api
        path=path+"&rel=0";//stops utube from showing more pages
        document.getElementById('video').src=path;
        VIDnumber=i;
        onYouTubePlayerAPIReady();
    }


function onYouTubePlayerAPIReady()// this function gets called when API is ready to use
    {MODE='Loading...';
        //MODE=MODEold='Initiating Player...';
        //statusMsg('Initiating Player...','yellow');
        // create the global player from the specific iframe (#video)
        player = new YT.Player('video', {
        events: {
          // call this function when player is ready to use
          'onReady': onPlayerReady//,
        }
      });
    }

function onPlayerReady(event)
    {    MODE='Loading...';   
        //MODE=MODEold='Finalizing Controls...';
        DUR=player.getDuration();
        var arr="";
        var str;
        var n=1;
        var i=VIDnumber;
        VIDEOtitle=ARRvideos[i].split(';')[0].split('#')[1];
        ARRloops="".split(',');
        ARRloops=ARRvideos[i].split(';');//zzzzneed to trim it
        ARRloops.splice(0,1);
        if (ARRloops.length===0|ARRloops===undefined)
        {//put in 4 loops if there are no loops
            var q=parseInt(DUR/4,10);
            str='0#'+q+';'+q+'#'+q*2+';'+2*q+'#'+3*q+';'+3*q+'#'+parseInt(DUR,10);
            ARRloops=str.split(';');
        }
        str="LOOP 0";
        while( n<ARRloops.length)
        {
            str=str+':LOOP '+parseInt(+n,10);
            n=n+1;
        }
        arr=str.split(":");
        selectorBuild('loops',arr);
        LOOPfinish=ARRloops[0].split('#')[1];
        LOOPstart=ARRloops[0].split('#')[0];
        LOOPpause=2000;//milliseconds of pause
        LOOPtime=0;//set by the monitor   
        document.getElementById('runImg').style.visibility='hidden';
        document.getElementById('loopstart').value=secToMin(LOOPstart);
        document.getElementById('loopfinish').value=secToMin(LOOPfinish);
        LOOPtime=0;
        document.getElementById('loopTime').innerHTML="0:00";
        LOOPpause=document.getElementById('pause').value=2000;
        sizeFrame(1);
        document.getElementById('mag').value="1";
        document.getElementById('rate').value=1;
        document.getElementById('slider1').max=DUR;
        document.getElementById('slider1').value=0;
        timeMon(); //start the monitor of time
        MODE='Cueing...';
        document.getElementById("msg").style.top='0%';
        document.getElementById("splash").style.display='none';
        }

//Monitor Loop==============================================================================

function timeMon()
    {   
        clearTimeout(TIMEOUTtime);
        LOOPtime=parseInt(player.getCurrentTime(),10);//get the new Time
        document.getElementById('loopTime').innerHTML=secToMin(LOOPtime);
        document.getElementById('slider1').value=LOOPtime;
        TIMEOUTtime=setTimeout(function()
        {   //Time Triggers
            if (MODE=='Finding Loop...'& LOOPtime==LOOPstart) {mode('Looping...');}
            else if (MODE=='Resetting...'& LOOPtime===0) {mode('Paused...');}
            else if (MODE=='Looping...'& LOOPtime>=LOOPfinish & LOOPtype=='once') {mode('Paused...');}
            else if (MODE=='Looping...'& LOOPtime>=LOOPfinish & LOOPtype=='repeat') {mode('Finding Loop...');}
            else if (MODE=='Finding Loop...'& LOOPtime==LOOPstart & LOOPtype=='repeat'){loopDelay();mode('Delay...');}   
            else if (MODE=='Cueing...'& LOOPtime>0){vis('blocker','visible');mode('Resetting...');} 
            if (MODEholder!==undefined)
            {
               MODE=MODEholder;MOLDholder=undefined;}//single entry point for MODE
               if (MODE=='Loading...')//=================================
               {
                    vis('blocker','visible');
               }
               if (MODE=='Paused...')//=================================
               {
                    clearTimeout(TIMEOUTwait);
                    player.pauseVideo();
                    vis('buttonPlay','visible');
                    vis('runImg','hidden');
                    vis('loopStopper','hidden');
                    vis('blocker','hidden');
               }
                else if(MODE=='Playing...'|MODE=='Cueing...')//=================================
               {
                    player.playVideo();
                    vis('buttonPlay','hidden');
                    vis('runImg','visible');
                    vis('loopStopper','hidden');
               }
                else if(MODE=='Looping...')//=================================
               {
                    player.playVideo();
                    vis('buttonPlay','hidden');
                    vis('runImg','visible');
                    vis('loopStopper','visible');
               }               
                else if(MODE=='Resetting...')//======================================================
               {
                    player.pauseVideo();
                    player.seekTo(0.0);
                    vis('buttonPlay','visible');
                    vis('runImg','hidden');
                    //MODEold=MODE= "Video Loaded: "+VIDEOtitle+"("+secToMin(DUR)+" Duration)";
                    MODE="Resetting...";
                }    
                else if(MODE=='Finding Loop...')//======================================================
                {
                    player.pauseVideo();
                    vis('buttonPlay','hidden');
                    vis('runImg','hidden');
                    vis('loopStopper','visible');
                    player.seekTo(LOOPstart);
                }else{MODE ="D"}
        }
        statusMsg(MODE);
        timeMon(); 
        },50);
    }   
//MISC====================================================================
function selectorBuild(id,arr)//probably going global
{
    var i=0;var str='';
    while (i<arr.length)
        {
            str=str+"<option value="+i+">"+arr[i]+"</option>";
            i=i+1;    
        }
    document.getElementById(id).innerHTML=str;
    document.getElementById(id).selectedIndex=0; 
} 

function loopDelay()
    {
        TIMEOUTwait=setTimeout(function(){MODE='Looping...';clearTimeout(TIMEOUTwait);},document.getElementById('pause').value); 
    }

function loopStart(type)
    {   LOOPtype=type; 
        if (LOOPtype=='repeat'){document.getElementById('loopStopper').style.left="50%";}
        else if (LOOPtype=='once'){document.getElementById('loopStopper').style.left="60%";}
        vis ('loopStopper','visible');
        player.seekTo(LOOPstart);
        mode('Finding Loop...');
    }

function loopSelect()
     {
        var s; var f;
        var loop=ARRloops[document.getElementById('loops').value].split('#');
        s=loop[0];f=loop[1];
        //alert (loop+"\n"+s+">>"+f);
        LOOPstart=s;
        document.getElementById('loopstart').value=secToMin(s);
        LOOPfinish=f;
        document.getElementById('loopfinish').value=secToMin(f);
        loopStart('once');
        // alert(LOOPstart+">"+LOOPfinish)
     }

function loopSetStart(sec)
    {
        var ns;
        if (sec===undefined) {ns=parseInt(player.getCurrentTime(),10);}
        else {ns=parseInt(parseInt(LOOPstart,10)+parseInt(sec,10),10);}
        if (ns<0){ns=0;}
        LOOPstart=ns;
        document.getElementById('loopstart').value=secToMin(LOOPstart);
        if (LOOPstart>=LOOPfinish){loopSetFinish(parseInt(LOOPstart-LOOPfinish+5,10));} 
    }

function loopSetFinish(sec)
    {
        var ns;
        if (sec===undefined) {ns=parseInt(player.getCurrentTime(),10);}
        else {ns=parseInt(parseInt(LOOPfinish,10)+parseInt(sec,10),10);}
        if (ns>parseInt(DUR,10)) {ns=parseInt(DUR-2,10);} // latest Logical
        if (ns<LOOPstart){ns=parseInt(LOOPstart+2,10);}
        LOOPfinish=ns;
        document.getElementById('loopfinish').value=secToMin(LOOPfinish);
         if (LOOPstart>=LOOPfinish){loopSetstart(parseInt(LOOPfinish-LOOPstart-5,10));} 
    }

function loopCapture()
    {
    MODEold=MODE=("SNAPSHOT  (;"+LOOPstart+"#"+LOOPfinish+")");
    document.getElementById('pad').value=";"+LOOPstart+"#"+LOOPfinish;
    }

function loopSelector()//builds and installs the 'loops' select box
    {
        var arr; var str="LOOP 1";
        var a=(document.getElementById('videos').value);
        ARRloops=ARRvideos[a].split(';');
        ARRloops.splice(1,1);
        var i=1;
        while( i<ARRloops.length)
        {
            str=str+':LOOP '+parseInt(+i+1,10);
            i=i+1;
        }
        arr=str.split(':');
        selectorBuild('loops',arr);
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


function cto()
    {
         clearTimeout(TIMEOUTloop);
    }

//================================================================================

