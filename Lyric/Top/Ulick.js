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
var ARRlog="NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE".split('-');
var CLOCKtime;
var DUR=0;//in seconds
var IFRAME=1;
var LOOPstart=0;//in seconds
var LOOPfinish=0;//in seconds
var LOOPtype;
var LOOPpause=2000;//milliseconds of pause
var PLAYERtime=0;//set by the monitor
var MAG=100;//in percent
var MODE='Paused...';
//var MODEold='Paused...';
var MODEholder;
var MSGlast="???"; //last message
var player;
var TIMEOUTloop;
var TIMEOUTtime;
var TIMEOUTwait;
var UTID;//You Tube Id (8 char?)
var VIDnumber;//pass the video number past an event function
var TIMER;
var TIMERaction;
var MONITORcycles=0;

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
    
function   mode(M){MODEholder=M;}

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
        mode('Loading...');
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
        mode("Loading...");
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
    {
        mode('Loading...');
        // create the global player from the specific iframe (#video)
        player = new YT.Player('video', {
        events: {
          // call this function when player is ready to use
          'onReady': onPlayerReady//,
          //  'onStateChange':onStateChange

        }
      });
    }

function onStateChange(event)
    {if(event.data==5){alert('Cued...');}}


function onPlayerReady(event)

    {
        //player.cueVideoById(UTID);
        mode('Loading...');   
        //MODE=MODEold='Finalizing Controls...';
        DUR=player.getDuration();
        var arr="";
        var str;
        var n=0;
        var z;
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
        str="";
        while( n<ARRloops.length)
        {  
            z=(ARRloops[n].split('#')[2]);
            if (z===undefined) {z='LOOP '+parseInt(1+n,10);}
            str=str+z+':';
            n=n+1;
        }
        str=str.substring(0,str.length-1);//cut off last:
        arr=str.split(":");
        selectorBuild('loops',arr);
        LOOPfinish=ARRloops[0].split('#')[1];
        LOOPstart=ARRloops[0].split('#')[0];
        LOOPpause=document.getElementById('pause').value=2000;
        PLAYERtime=0;//set by the monitor   
        document.getElementById('runImg').style.visibility='hidden';
        document.getElementById('loopstart').value=secToMin(LOOPstart);
        document.getElementById('loopfinish').value=secToMin(LOOPfinish);
        document.getElementById('loopTime').innerHTML="0:00";
        sizeFrame(1);
        document.getElementById('mag').value="1";
        document.getElementById('rate').value=1;
        document.getElementById('slider1').max=DUR;
        document.getElementById('slider1').value=0;
        timeMon(); //start the monitor of time
        mode('Cueing...');
        document.getElementById("msg").style.top='0%';
        document.getElementById("splash").style.display='none';
        }

//Monitor Loop==============================================================================
function timeMon()
    {              
        clearTimeout(TIMEOUTtime);
        MONITORcycles=MONITORcycles+1;
        var d = new Date();
        CLOCKtime = d.getTime();
         //= new Date().getTime();//(clock time)
        PLAYERtime=parseInt(player.getCurrentTime(),10);
        document.getElementById('loopTime').innerHTML=secToMin(PLAYERtime);
        document.getElementById('slider1').value=PLAYERtime;
        TIMEOUTtime=setTimeout(function()
        {   //Triggers
            if(1==2){alert('TIME MONITOR FAILURE');}
            else if (CLOCKtime>=TIMER & TIMER!==0){TIMER=0; mode(TIMERaction); TIMERaction=undefined;}
            else if (MODE=='Cueing...'& PLAYERtime>0){mode('Resetting...');} 
            else if (MODE=='Resetting...'& PLAYERtime===0) {mode('Paused...');}
            else if (MODE=='Finding Loop...'& PLAYERtime==LOOPstart ){mode('Looping...');}
            else if (MODE=='Looping...'& PLAYERtime>=LOOPfinish)
                {
                    if(LOOPtype=='once'){mode('Paused...');}
                    else{mode('Delay...');}
                }            
            //else if (MODE=='Delay...'& CLOCKtime > TIMER){mode('Finding Loop...');} 
            if (MODEholder!==undefined)
            {
               statusMsg('JAVASCRIPT CRASH: '+MSGlast+">>"+MODEholder,'red');
               MODE=MODEholder;
               logAction(MODE);
               MONITORcycles=0;
               MOLDholder=undefined;//single entry point for MODE
               if (MODE=='Loading...')//=================================
                    {
                         vis('blocker','visible');
                    }
               if (MODE=='Paused...')//=================================
                {
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
                }    
                else if(MODE=='Finding Loop...')//======================================================
                {
                    player.pauseVideo();
                    player.seekTo(LOOPstart);
                    vis('buttonPlay','visible');
                    vis('runImg','hidden');
                    vis('loopStopper','visible');
                }
                else if(MODE=='Delay...')//======================================================
                {
                    player.pauseVideo();
                    TIMER=parseInt(document.getElementById('pause').value,10) +parseInt(CLOCKtime,10);
                    //alert(TIMER);
                    TIMERaction="Finding Loop...";
                    vis('buttonPlay','visible');
                    vis('runImg','visible');
                    vis('loopStopper','visible');
                }
            }
            MODEholder=undefined;
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
        mode('Finding Loop...');
    }

function loopSelect()
     {
        var s; var f;
        var loop=ARRloops[document.getElementById('loops').value].split('#');
        s=loop[0];f=loop[1];
        LOOPstart=s;
        document.getElementById('loopstart').value=secToMin(s);
        LOOPfinish=f;
        document.getElementById('loopfinish').value=secToMin(f);
        loopStart('once');
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

