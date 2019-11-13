//Variables============================================================
var ARRrestore;
var ARRvideos="";//format[0]=UTID#TITLE [1...]loopStart#LoopFinish#LoopTitle
var ARRcollections="";
var ARRloops="";
var ARRlog="NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE-NONE".split('-');
BOOT=0;
var CLOCKtime;
var COL;
var CUE;
var DUR=0;//in seconds
var EDITEDvideo=false;
var IFRAME=1;
var Iheight;
var Iwidth;
var LOOP;
var LOOPstart=0;//in seconds
var LOOPfinish=0;//in seconds
var LOOPnumber;
var LOOPtype;
var LOOPpause=2000;//milliseconds of pause
var PLAYERtime=0;//set by the monitor
var MAG=100;//in percent
var MODE='Paused...';
var MODEholder;
var player;
var TIMEOUTloop;
var TIMEOUTtime;
var TIMEOUTwait;
var UTID='_sXXzAAgwpE';//You Tube Id (8 char?)
var UTtitle;// You Tube Title
var TIMER;
var TIMERaction;
var VID;
var VIDEO;//?????
var MONITORcycles=0;


//CORE FOR YOU TUBE API===========================================================
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.called by api
      //var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          //position:absolute,
          height:  '100%',
          width: '100%',
          videoId: '_sXXzAAgwpE',
          events: {
            'onReady': onPlayerReady
          }
        });
      }     
//NEW FUNCTIONS=================
function xxxloopEdit(){
   // protect(true);
    var v=document.getElementById('videos').selectedIndex;
    var l=document.getElementById('loops').selectedIndex;
    var arr=ARRloops[l];
    alert(arr);
    alert("Loop Number: "+l+"\n"+ARRloops[l]);//+"\n"+arr[0].value+'#'+arr[1].value+'#'+arr[2].value);
    alert("Video NUMBER: "+v+"\n"+ARRvideos[v]);
    
    var titl =prompt("Rename the Loop?","XXX?") ;
    var edLoop=arr[0]+'#'+arr[1]+'#'+titl;
    alert(edLoop);
    ARRloops[l]=edLoop;
    loopARRtoVid();
    selectorBuild('loops',arr,i-1);
    }

//LOAD/BOOT ROUTINE==============================================================================
function onPlayerReady(event){//alert('Player Ready, getting Loop:'+LOOP);
    //loopsGet(0);
    //}
    if (BOOT===0){
    BOOT=1;
//window.onload = function(){//alert('window.onload') ; //downloads and creates ARRcollections makes selector and selects default 
    NONE =document.getElementById('none').style.display;//*  create object
    vis('fileIndex','hidden');vis('videos','hidden');vis('loops','hidden');dis('footer','none');
    clearTimeout(TIMEOUTtime);
    document.getElementById("msg").style.top='0%';
    document.getElementById("splash").style.display='none';
    statusMsg("Loading javascript...");
    MSGlast="...";
    collectionsGet();
     }
    }//;




function collectionsGet(){//alert('collectionsGet()') ;//creates ARRcollections
    ARRcollections=fileDownload('UtubeUtool.txt').split("\n");
    selectorBuild('fileIndex',ARRcollections,0);
    vis('fileIndex','visible');
    colSelect(0);
    }
function colSelect(col){//alert('colSelect()');//creates the ARRcollections select box
    if (col===undefined|col===null|col===''){col=0;}
    COL=col;
    ARRrestore="none;none;none;none;none;".split(';');//blank restore
    dis('videos','none');
    dis('loops','none');
    dis('footer','none');
    vidsGet(0,0);
    }
function vidsGet(vid,loop){//alert('vidsGet(vid,loop)');//creates ARRvideos passes  default value to selector and default loop
    if (vid===undefined|vid===null|vid===''){vid=0;}
    //VID=vid;
    var path="../Utool/"+ARRcollections[COL]+".txt";
    ARRvideos=fileDownload(path).split('\n');
    videoSelectorCreate(vid,loop);
    }
function videoSelectorCreate(vid,loop){//alert('videoSelectorCreate(vid,loop)');//creates video selector and selects video vid and passes loop j
    if (vid===undefined|vid===null|vid===''){vid=0;}
    //SELvid=vid;
    var arr;
    var str="";
    var n=0;
    vis("videos","visible");vis('loops','hidden');dis('footer','none');
    while(n<ARRvideos.length)
    {
        str=str+(ARRvideos[n].split(';')[0]).split('#')[1]+"\n";
        n=n+1;
    }
    arr=str.split('\n');
    selectorBuild('videos',arr,vid);
    vis('videos','visible');
    vis("videos","visible");vis('loops','visible');dis('footer','none');
    dis('loops','none');
    dis('videos','block');
    vidSelect(vid,loop);
}


function vidSelect(vid,loop){//alert('Selecting video; ' +vid+ " & loop:"+loop);
    if (vid===undefined|vid===null|vid===''){vid=0;}
    VID=vid;
    vis("videos","visible");vis('loops','visible');dis('footer','none');
    var temp=ARRvideos[vid].split(';')[0];//alert(temp);
    temp=temp.split('#');
    UTID=temp[0];// alert (UTID);
    UTtitle= temp[1];//alert (UTtitle);
    //player.loadVideoById({'videoId': UTID});
    CUE=false;
  //*
    var path ="//www.youtube.com/embed/"+UTID;
    path=path+"?enablejsapi=1"; //call the javascript api
    path=path+"&rel=0";//stops utube from showing more pages
    document.getElementById('player').src=path;
    //alert(path);
    player.cueVideoByUrl({mediaContentUrl:String,
    startSeconds:0,
    endSeconds:1,
    suggestedQuality:path});
  //*/
dis('footer','none');
alert('hid');
    loopsGet(0);
  // var path ="//www.youtube.com/embed/"+UTID;
  // path=path+"?enablejsapi=1"; //call the javascript api
   //path=path+"&rel=0";//stops utube from showing more pages
   //document.getElementById('video').src=path;

  
}
//function onPlayerReady(event){//alert('Player Ready, getting Loop:'+LOOP);
    //loopsGet(0);
    //}
function loopsGet(loop){//alert(' loopsGet(0)');//creates ARRloops
        var str;
        dis('footer','none');
        str="";
        ARRloops="".split(',');
        ARRloops=ARRvideos[VID].split(';');//zzzzneed to trim it
        ARRloops.splice(0,1);//get rid of UTID and UTtitle
        if (ARRloops.length===0|ARRloops===undefined)
        {//put in 4 loops if there are no loops
            var q=parseInt(DUR/4,10);
            str='0#'+q+';'+q+'#'+q*2+';'+2*q+'#'+3*q+';'+3*q+'#'+parseInt(DUR,10);
            ARRloops=str.split(';');
        }
    loopSelectorCreate(loop);
    }
function loopSelectorCreate(loop){ //alert('loopSelectorCreate(loop)');
        var str='';//cant be undefined
        var n=0;
        var arr;
        var z;
        while( n<ARRloops.length)
        {  
            z=(ARRloops[n].split('#')[2]);
            if (z===undefined) {z='LOOP '+parseInt(1+n,10);}
            str=str+z+':';
            n=n+1;
        }
//alert('Loop Selector\n'+str);
        str=str.substring(0,str.length-1);//cut off last':'
        arr=str.split(":");
//      alert(arr.join('\n'));
        selectorBuild('loops',arr,loop);
        document.getElementById('loops').selectedIndex=loop;
        vis('loops','visible');//;dis('footer','none');
        if (loop===undefined) {loop=0;}
        dis('loops','block');
        loopSelect(loop);
    }
function loopSelect(loop) {//alert('loopSelect(loop)');//sets the default values of a loop     
        DUR=player.getDuration();
        LOOPfinish=ARRloops[loop].split('#')[1];
        LOOPstart=ARRloops[loop].split('#')[0];
        LOOPpause=document.getElementById('pause').value=2000;
        LOOPnumber=loop;
        PLAYERtime=0;//set by the monitor   
        document.getElementById('runImg').style.visibility='hidden';
        document.getElementById('loopstart').value=secToMin(LOOPstart);
        document.getElementById('loopfinish').value=secToMin(LOOPfinish);
        document.getElementById('loopTime').innerHTML="0:00";
        document.getElementById('mag').value="1";
        document.getElementById('rate').value=1;
        dis('footer','none');
        final();
    }
function  final(){//alert(' final()');
        document.getElementById('slider1').max=DUR;
    document.getElementById('slider1').value=0;
    timeMon(); //start the monitor of time
    if(CUE===true){mode('Cueing...');CUE=false;}else{mode('Paused...');}
    

    
    ;
 }
//Monitor Loop==============================================================================
function   mode(M){MODEholder=M;}
function timeMon(){ //The timing engine with trigger points and command receptions             
        clearTimeout(TIMEOUTtime);
        MONITORcycles=MONITORcycles+1;
        var d = new Date();
        CLOCKtime = d.getTime();//= new Date().getTime();//(clock time)
        PLAYERtime=parseInt(player.getCurrentTime(),10);
        document.getElementById('loopTime').innerHTML=secToMin(PLAYERtime);
        document.getElementById('slider1').value=PLAYERtime;
        TIMEOUTtime=setTimeout(function()
        {   //Triggers
            if(1==2){alert('TIME MONITOR FAILURE');}
            else if (CLOCKtime>=TIMER & TIMER!==0){TIMER=0; mode(TIMERaction); TIMERaction=undefined;}
            else if (MODE=='Cueing...'& PLAYERtime>0){mode('Resetting...');}//dis('footer','none');} 
            //else if (MODE=='Resetting...'& PLAYERtime===0) {mode('Paused...');dis('footer','block');}
            else if (MODE=='Resetting...'& PLAYERtime===0) {mode('Ready...');dis('footer','none');}
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
                         dis('footer','none');
                    }
               if (MODE=='Paused...')//=================================
                {
                    player.pauseVideo();
                    vis('buttonPlay','visible');
                    vis('runImg','hidden');
                    vis('loopStopper','hidden');
                    dis('footer','block');
                }
                else if (MODE=='Ready...')//=================================
                {
                    player.pauseVideo();
                    vis('buttonPlay','visible');
                    vis('runImg','hidden');
                    vis('loopStopper','hidden');
                    dis('footer','block');
                }
                 else if(MODE=='Playing...')//=================================
                {
                    player.playVideo();
                    vis('buttonPlay','hidden');
                    vis('runImg','visible');
                    vis('loopStopper','hidden');
                }
                
              else if(MODE=='Cueing...')//=================================
                {
                    player.playVideo();
                    vis('buttonPlay','hidden');
                    vis('runImg','visible');
                    vis('loopStopper','hidden');
                    dis('footer','none');
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
                    dis('footer','none');
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
//GOING GLOBAL????====================================================================
function selectorBuild(id,arr,sel){//probably going global
    if (sel===undefined|sel===null|sel==='') {sel=0;}
    var i=0;var str='';
    while (i<arr.length)
        {
            str=str+"<option value="+i+">"+arr[i]+"</option>";
            i=i+1;    
        }
    document.getElementById(id).innerHTML=str;
    document.getElementById(id).selectedIndex=sel; 
    } 
function xxxloopDelay(){//obsolete may be used globally some time
        TIMEOUTwait=setTimeout(function(){MODE='Looping...';clearTimeout(TIMEOUTwait);},document.getElementById('pause').value); 
    }
function loopStart(type){
    LOOPtype=type; 
    if (LOOPtype=='repeat'){document.getElementById('loopStopper').style.left="50%";}
    else if (LOOPtype=='once'){document.getElementById('loopStopper').style.left="60%";}
    mode('Finding Loop...');
    }
function xxxxloopSelect2(){
        var s; var f;
        LOOPnumber=document.getElementById('loops').value;
        var loop=ARRloops[LOOPnumber].split('#');
        s=loop[0];f=loop[1];
        LOOPstart=s;
        document.getElementById('loopstart').value=secToMin(s);
        LOOPfinish=f;
        document.getElementById('loopfinish').value=secToMin(f);
        loopStart('once');
     }
function loopSetStart(sec){
    var newStart;
    if (sec===undefined) {newStart=parseInt(player.getCurrentTime(),10);}
    else {newStart=parseInt(parseInt(LOOPstart,10)+parseInt(sec,10),10);}
    if (newStart<0|newStart>=DUR-1){newStart=0;}
    LOOPstart=newStart;
    document.getElementById('loopstart').value=secToMin(LOOPstart);
    if (LOOPstart>=LOOPfinish){LOOPfinish=LOOPstart+1;document.getElementById('loopfinish').value=secToMin(LOOPfinish);} 
    }
function loopSetFin(delta){
  //alert(delta);
  var newFin=parseInt(DUR,10);
  //alert('1+\nLOOPfinish: '+LOOPfinish+'\ndelta: '+delta+'\nnewFin: '+newFin);
  if(delta===undefined|delta===0) {newFin=parseInt(player.getCurrentTime(),10);}
  else {newFin=parseInt(parseInt(LOOPfinish,10)+parseInt(delta,10),10);}
  //alert('2+\nLOOPfinish: '+LOOPfinish+'\ndelta: '+delta+'\nnewFin: '+newFin);
    if (newFin<=1|newFin>=parseInt(DUR-1,10)){newFin=parseInt(parseInt(LOOPstart,10)+1,10);statusMsg('????');}
    LOOPfinish=newFin;//alert(LOOPfinish)
    document.getElementById('loopfinish').value=secToMin(LOOPfinish);
    //alert('3+\nLOOPfinish: '+LOOPfinish+'\ndelta: '+delta+'\nnewFin: '+newFin);
    if (LOOPstart>=LOOPfinish){LOOPstart=LOOPfinish-1;document.getElementById('loopstart').value=secToMin(LOOPstart);} 
  }
function xxxprocessVideoString(){
    var i =VIDnumber;
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
    }
function xxxloopSelector(i){//builds and installs the 'loops' select box
    var arr; var str="LOOP 1";
    var a=(document.getElementById('videos').value);
    ARRloops=ARRvideos[a].split(';');
    ARRloops.splice(1,1);
    while( i<ARRloops.length)
    {
        str=str+':LOOP '+parseInt(+i+1,10);
        i=i+1;
    }
    arr=str.split(':');
    selectorBuild('loops',arr,i);
    }
function sizeFrame(mag){//sizes the video
    MAG=mag*100;

    document.getElementById('idiv').style.width =MAG+"%";
    document.getElementById('idiv').style.height =MAG+"%";
    //var clientHeight = document.getElementById('myDiv').clientHeight;
    //var clientHeight = document.getElementById('myDiv').clientHeight;
    //Iheight = document.getElementById('idiv').clientHeight;
    //Iwidth= document.getElementById('idiv').clientWidth;
   // alert(Iheight +'\n'+(Iheight/2)*(mag-1));
   // document.getElementById('idiv').scrollTop=(Iheight/2)*(mag-1);
   // document.getElementById('idiv').scrollLeft=(Iwidth/2)*(mag-1);
    }
function cto(){//clears timeouts
    clearTimeout(TIMEOUTloop);
    }
 //Edit functions====================================
function vidsRestore(){//Restores video before last change
//alert(ARRrestore[0]);
        if (ARRrestore[0]!=='none'){
            ARRvideos=ARRrestore[0].split('\n');
            ARRrestore.splice(0,1);
            ARRrestore.splice(-1,0, 'none');
            videoSelectorCreate(0,0);
            alert('Last edit restored...');
            }
        else{alert('Sorry, no more restorable images...');}
    }
function saveVideoFile(){
    fileSaveTextAs('crapola.txt',ARRvideos.join('\n'));
    protect(false);
    }
function videosLocal(){//processes local video file (used with FileGetLocal)
    ARRrestore="none;none;none;none;none;".split(';');//blank restore
    protect(true);
    ARRvideos=TEMP.split('\n');
    videoSelectorCreate(0,0);
   
    }
function protect(a){//hides the collection selector and stores up to 5 changes
    if (a===true) {
        EDITEDvideo=true;
//alert (ARRrestore.length+"\n"+ARRrestore.join('\n\n'));
         ARRrestore.splice(0,0, ARRvideos.join('\n'));
//alert(ARRrestore[0])
         if (ARRrestore.length>5) {
             ARRrestore.splice(5,1);
         }
        vis('fileIndex','hidden');
        document.getElementById('hdr').style.backgroundColor='red';}
    else{
        EDITEDvideo=false;
        vis('fileIndex','visible');
        document.getElementById('hdr').style.backgroundColor='orange';}
    }
function deleteVideo(vid){//deletes current video
   
    if (vid===undefined|vid===''|vid===null) {vid=0;}
    if (ARRvideos.length==1) {
        alert('You can\'t delete your only video.. Just delete the entire collection');
        final();
        }
    else{
        protect(true);
        //var a= document.getElementById('videos').value;
        ARRvideos.splice(vid,1);
        if (ARRvideos.length==1){a=0;}
        if (vid==ARRvideos.length-1){a=vid-1;}
        videoSelectorCreate(a,0);    
        }
    }
function loadUTID(){//loads a specified utube video
        var str =prompt("Paste your YouTube URL here...", "https://www.youtube.com/watch?v=Fd7BrjdTnrg");
        id= uTubeGetId(str);
        str=id+"#"+prompt("Choose a name for your video?","My Video");
        protect(true);
        ARRvideos.splice(0,0,str);
        str="";
        vis('fileIndex','hidden');vis('saveVids','visible');vis('getVids','visible');
        
        videoSelectorCreate(0,ARRvideos.length-1);
        }
function loopDelete(loop,vid){//Deletes specified loop
    if (vid===undefined|vid===''|vid===null) {vid=VID;}
    if (ARRloops.length==1){
       alert('Thats your only loop! You change it but not delete it..');
    }
    else{
        protect(true);
        ARRloops.splice(loop,1);//remove your loop
        loopsToVids(VID,loop);
        loopSelectorCreate(loop);
        }
    }
function xxxxtransferLoopsToVideo(vid){//after you mod ARRloops use this to force the change into the ARRvideos
        var vidData=ARRvideos[vid].split(';')[0].split('#');
        var str=vidData[0]+'#'+vidData[1]+";"+ARRloops.join(';');
//alert("Video \n"+ str);
        ARRvideos.splice(vid,1,str);
//alert('Vid updated');
    }
function loopsToVids(vid,loop){
            protect(true);
            ARRvideos[document.getElementById('videos').selectedIndex]=UTID+'#'+UTtitle+';'+ARRloops.join(';');
            if (loop>0) {loop=loop-1;}
            }
function loopUpdate(loop,vid){//updates current loop to specified parameters
    var action;
    var arr;
    if (vid===undefined|vid===null|vid==='') {vid=VID;}
    var currentTitle=ARRloops[loop].split('#')[2];
    action=confirm('Change loop #'+loop+' of video #'+vid+' to\nStart at:\n '+ secToMin(LOOPstart)+'\nFinish at:\n'+ secToMin(LOOPfinish));
    if (action===true){
      protect(true);
        ARRloops.splice(loop,1,LOOPstart+"#"+LOOPfinish +'#'+ currentTitle);
        loopSelectorCreate(loop);
      }
    arr=ARRloops[loop].split('#');
    action=prompt("Rename Current Loop?\n"+currentTitle,currentTitle);    
    if (action===null|action===currentTitle){return;}
    else{
      protect(true);
      ARRloops.splice(loop,1,arr[0]+"#"+arr[1] +'#'+ action);
      loopSelectorCreate(loop);
      }
    loopsToVids(vid,loop);
  }
function loopCapture(){//captures current loop
    protect(true);
    clearTimeout(TIMEOUTtime);
    var str;
    var loopNum=document.getElementById('videos').selectedIndex;
    //alert("0) ARRvideos:\n"+ARRvideos.join('\n'));
    //alert("1) Selected Video\n"+loopNum);
    str=UTID+"#"+UTtitle+";"+ARRloops.join(";")+";"+LOOPstart+"#"+LOOPfinish +'#'+ window.prompt("Name of Lick?","Unknown Lick");
    //ARRvideos.splice(loopNum,1,str);
    //alert("1.5) ARRvideos:\n"+ARRvideos.join('\n'));
    loopsToVids(VID,loop);
    videoSelectorCreate(loopNum,3);
    }   
//developer Functions=====================
function xxxloopARRtoVid(){
    var loopNum=document.getElementById('videos').selectedIndex;
    alert("0) ARRvideos:\n"+ARRvideos.join('\n'));
    alert("1) Selected Video\n"+loopNum);
    str=UTID+"#"+UTtitle+";"+ARRloops.join(";")+";"+LOOPstart+"#"+LOOPfinish +'#'+ window.prompt("Name of Lick?","Unknown Lick");
    ARRvideos.splice(loopNum,1,str);
    }
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