<!DOCTYPE html>
<head>
<link rel="icon" href="Data/iconFav.png" type="image/png">
<meta name="viewport" content="width=320, initial-scale=1, maximum-scale=1, user-scalable=0"/> <!-- prevents zooming on mobile devices....number-based width or "device-width"-->
<title id = 'title'>FOSSILS</title>
    <style type="text/css">
        Body
            {
                color:white;
                line-height:110%;
                font-size:1.2vw;
                font-family:Courrier New;
                font-weight: bold;
                text-align:center;
                vertical-align:middle;
                padding:0px;
                margin:0px;
                
            }
        X1{color:red;}
        X2{color:white;}
        X3{color:blue;}
        X4{line-height:100%;color:yellow;}
        X5{line-height:150%;color:green;}
    </style>
    </head>

<body onresize="realign()">

<!--MAIN SCREEN --> 
<div id='background' style="position:fixed;display:block ;background-image:url('Data/parchmentA.jpg'); background-size:100% 100%;line-height:100%; font-size:2.5vw; left:0%; top:0%; right:0%; bottom:0%; z-index:1000;">
    <div id='floater' style="position:fixed;display:block;background-color:transparent;right:0%; top:0%; height:15vw; width:13vw;border:none;z-index:2000">
        <img title='Stop the Track' id='pauseButton' src='Data/yellowPause.png' onclick="trackPause()" style="position:absolute;display:none;right:0%; top:0%; height:100%;z-index:110">
        <img title='Administrators Screen (password Required!)' id='admin' src='Data/transparent.png' onclick="admin()" style="position:absolute;display:block;right:0%; top:0%; height:100%;z-index:90">
    </div>

<!--HDR-->    
    <div id='hdr' style="position:absolute;display:none;left:0%;right:0%;top:0%;bottom:0%;z-index:300;">
        <img  src="Data/fatf.png" style="position:absolute;display:block;left:20%;height:100%;width:60%">
    </div>    

    <audio id="Audio1" controls="true" preload="metadata" source src='none' type='audio/mpeg' style="position:absolute; display:block; background-color:transparent;left:5%; bottom:0%; height:10%; width:90%;z-index:400; " >
        -/-
    </audio>

<!--Player //style="position:absolute; display:none; border:groove; right:0%; top:0vw; height:11vw;width:49vw;background-color:black;z-index:4000">-->
    <div id='playerA' style="position:absolute; display:block; border:none; left:0vw; top:0vw; height:0vw;background-color:black;z-index:4000">
    <img id='playButtonA' onclick="trackPlay()" src='Data/yellowPlay.png' style='position:absolute;right:0vw;top:0vw;height:7vw;'>
    <img  onclick="incTrack(1)" src='Data/yellowNextTune.png' style='position:absolute;right:8vw;top:0vw;height:7vw;'>
    <img  onclick="trackReset(-1)" src='Data/yellowRewind.png' style='position:absolute;right:16vw;top:0vw;height:7vw;'>  
    <img  onclick="incTrack(-1)" src='Data/yellowLastTune.png' style='position:absolute;right:24vw;top:0vw;height:7vw;'>
        
    <img  onclick="closePlayer()" src='Data/yellowclose.png' style='position:absolute;left:0vw;top:0vw;height:7vw;'>    
    <select id='tuneSelect' onchange='playTrack(this.value,this.selectedIndex)' style="position:absolute; font-size:2.5vw; background-color:white; color:black;left:0%; bottom:0%; height:3vw; width:100%;">
            <option>Abilene</option>
            <option>Sea Of Heartbreak</option>
            <option>Pancho And Lefty</option>
            <option>The Cape</option>
            <option>When The Roses Bloom Again</option>
            <option>Jamaica Farewell</option>
            <option>Teach Your Children</option>
    </select>
</div>


<!--MSG-->
    <div id='msg'style="position:absolute; opacity:0;color:black; font-family:Courrier New; font-weight:bold; border:none;display:block; line-height:130%; overflow-y:scroll; font-size:3vw; text-align:center; left:0%; right:0%; top:0%; bottom:0%; z-index:50;overflow-y:auto;word-break: keep-all">
        MESSAGE APPEARS HERE...
    </div>    

<!--ICON A-->    
    <!--<img id='iconA' title='Clicking me always brings you home!' src='Data/player.png' onclick="realign(),msg(WELCOMEstring,0)" style="position:absolute;display:none;opacity:0; left:0%;height:0%;top:0%; z-index:500">
   -->
<!--MENU-->      
    <div id='menu' style="position:absolute;text-align:center;display:block;opacity:0; line-height:130%;border:none; font-size:2.5vw; left:0%;right:0%;top:0%;bottom:0%; overflow-x:hidden";>
        <div id='0'onclick="msg(WELCOMEstring,this.id)"style="position:absolute;"> HOME</div>
        <div id='1'onclick="msg(CONTACTstring,this.id)"style="position:absolute;"> CONTACT</div>
        <div id='2'onclick="msg(ABOUTstring,this.id)"style="position:absolute;"> ABOUT ME</div>
        <div id='3'onclick="msg(PLAYLISTstring,this.id)"style="position:absolute;"> PLAYLIST</div>
        <div id='4'onclick="msg(SCHEDULEstring,this.id)"style="position:absolute;"> SCHEDULE</div>            
        <div id='5'onclick="msg(WHYstring,this.id)"style="position:absolute; border:none;"> GHOST BAND</div>
        <div id='6'onclick="msg(BANDstring,this.id)"style="position:absolute; border:none;"> GADGETS</div>
        <div id='7'onclick="msg('LISTEN',this.id),listen()" style="position:absolute;display:block; border:none;"> LISTEN</div>
        <div id='8'onclick="msg('GALLERY',this.id),PIC=0;gallery(0)" style="position:absolute;display:block;border:none;"> GALLERY</div>
        <img id='sizeScreen' title='Toggle Full Screen!'onclick="fullScreen()" src="Data/yellowEnterFullScreen.png" style="position:fixed;right:0%;bottom:0%;height:8%">
    </div>

<!--VIEW BOX-->      
    <div id='viewBox'style="position:absolute;display:none;font-size:3vw;background-color:black;border-color:black;overflow:hidden;left:0vw;right:0vw; top:0vw; bottom:0vw; z-index:450;">
        <div id ='picFrame' style='position:absolute;display:block;border:none;left:0%; top:0%; height:85%; width:100%;'>
            <img id='galleryPic' style='position:absolute;display:block;left:0%;height:100%;width:100%;bottom:0%'>
        </div>                                                                                                                                                                                
        <div id='picCount'style="position:absolute;line-height:50%;background-color:black;display:block;font-size:10vh;opacity:1;;font-weight:bold;font-size:4vh; left:1%;top:1%;">1/7</div>
        <div id='picLeft' onclick="gallery(-1)" style="position:absolute;line-height:50%;color:red;background-color:yellow;display:none;font-size:10vh;opacity:1;display:none;font-weight:bold;font-size:8vh; left:1%;top:47%;"><</div>
        <div id='picRight' onclick="gallery(+1)"style="position:absolute;line-height:50%;color:red;background-color:yellow;display:none;font-size:10vh;opacity:1;display:none;font-weight:bold;font-size:8vh;right:1%;top:47%;">></div>
        <div id='galleryTxt' onclick="aspect()" style='position:absolute;color:white; line-height:150%;border:none;left:0%; top:85%;left:10%;height:10%;width:80%;'>
           Text Should Appear Here...
        </div>
    </div>
</div>

<script language:javascript>
//GLOBAL VARIABLES===============================================
var FULLscreen=false
var LOCKED=true;
var WELCOMEstring;
var BANDstring;
var ABOUTstring;
var SCHEDULEstring;
var PLAYLISTstring;
var WHYstring;
var LISTEN=false;
var LISTENstring;
var LISTENarray
var ADMINstring;
var TEMPstring = null;
var HELPstring = "Looking for help...tough";
var TESTstring = 'This is the test string. And it looks like this... Here is A Break<br>Title<br>';
var TIMEOUTfade
var TIMEOUTgallery;
var TRACK=0
var PICcount=7;
var PIC=1
var PICpath
var PICaspect
var MODE='STD'
var ARRgallery = "0,1,2,3,4,5".split(',')
var VOL=0.5
var LOOPtype='all'

/*z-index  map============================================
 Base0
 menu    50
 msg     50 
 contact 100
 admin   200
 Boot    300
 Icons   400
 viewBox 500
 */


function XloopSet(type) {
    LOOPtype=type
    if (LOOPtype=='once') {
        document.getElementById('playlistButton').src='Data/yellowPlaylist.png'
        document.getElementById('repeatButton').src='Data/yellowRepeat.png'
        document.getElementById('onceButton').src='Data/greenOnce.png'
    }else if (LOOPtype=='loop') {
        document.getElementById('playlistButton').src='Data/yellowPlaylist.png'
        document.getElementById('repeatButton').src='Data/greenRepeat.png'
        document.getElementById('onceButton').src='Data/yellowOnce.png'
    }else if (LOOPtype=='all') {
        document.getElementById('playlistButton').src='Data/greenPlaylist.png'
        document.getElementById('repeatButton').src='Data/yellowRepeat.png'
        document.getElementById('onceButton').src='Data/yellowOnce.png'
    }
}


function XvolSet(dir){
    //alert(document.getElementById("Audio1").volume)
    VOL=VOL*dir
    if (VOL>=1) {
        VOL=1
    }else if(VOL<0.015625) {
        VOL=0.015625
    }
    if (VOL==1) {document.getElementById("volNo").innerHTML='MAX'
    }else if (VOL==0.5) {document.getElementById("volNo").innerHTML='5'
    }else if (VOL==0.25) {document.getElementById("volNo").innerHTML='4'
    }else if (VOL==0.125) {document.getElementById("volNo").innerHTML='3'
    }else if (VOL==0.625) {document.getElementById("volNo").innerHTML='2'
    }else if (VOL==0.03125) {document.getElementById("volNo").innerHTML='1'
    }else if (VOL==0.015625) {document.getElementById("volNo").innerHTML='min'
    }
    document.getElementById("Audio1").volume=VOL
}


function listen(){
    document.getElementById('playerA').style.display='block';
    MODE='LISTEN';
    realign();
}

//BOOT=============================================================
window.onload = function() {
    BANDstring = fileDownload('Data/bandString.txt');
    ABOUTstring = fileDownload('Data/aboutString.txt');
    SCHEDULEstring = fileDownload('Data/scheduleString.txt');
    PLAYLISTstring = fileDownload('Data/playlistString.txt');
    WHYstring = fileDownload('Data/whyString.txt');
    WELCOMEstring = fileDownload('Data/welcomeString.txt');
    //LISTENstring = fileDownload('Data/listenString.txt');
    CONTACTstring = fileDownload('Data/contactString.txt');
    LISTENarray = fileDownload('Data/listenArray.txt').split('|');
    msg(WELCOMEstring, 0);
    realign();
    loadGallery(0);
    document.getElementById('hdr').style.opacity = 0
    document.getElementById('hdr').style.display = 'block'
    LOCKED = true //lock design area
    document.getElementById('Audio1').src ='Data/Abilene.mp3';
    fades('hdr', 0.01, 1, 'msg|menu')
    document.getElementById("Audio1").volume=0.5
    VOL=0.5
}


function closePlayer(){
document.getElementById('playerA').style.display='none'
document.getElementById('pauseButton').style.display='none'    
    
}

function XjuggleA(){
    var hW =window.innerHeight;
    var hf=document.getElementById('playCtrl').clientHeight
    var tf=document.getElementById('playCtrl').offsetTop
    var hH=document.getElementById('hdr').clientHeight
    var hT=document.getElementById('tuneSelect').clientHeight
    var tA=document.getElementById('myTable').offsetTop
    var hA=document.getElementById('myTable').clientHeight
    var tB=document.getElementById('Audio1').offsetTop
    var t=parseInt(100*(hT +hA)/hf)+'%';
    document.getElementById('songData').style.top=t
}

//AUDIO=============================================================
function trackPause(){
    if (document.getElementById('Audio1').currentTime==document.getElementById('Audio1').duration) {
        trackReset()
    }
    document.getElementById('Audio1').pause()  
    document.getElementById('pauseButton').style.display='none'
    document.getElementById('playerA').style.display='block'
}

function trackPlay(){
    document.getElementById("Audio1").onended = function() {
        trackEnd();
        }
    document.getElementById('Audio1').play()  
    document.getElementById('pauseButton').style.display='block'
    document.getElementById('playerA').style.display='none'
}

function trackReset(){
    document.getElementById('Audio1').onended = null
    document.getElementById('Audio1').pause()
    document.getElementById('Audio1').currentTime=0
}

function XtrackGoToEnd(){
   //document.getElementById('Audio1').onended = null
   //document.getElementById('Audio1').pause()
   //document.getElementById('Audio1').currentTime=document.getElementById('Audio1').duration; 
    //document.getElementById('play1').style.display='block'
    //document.getElementById('pause1').style.display='none'
    //document.getElementById('playButton').style.display='block'
    //document.getElementById('pauseButton').style.display='none'
}

function trackEnd(){
        incTrack(1)
        trackPlay();
    }


function playTrack(track,num) {
    TRACK = track;
    document.getElementById("Audio1").onended = function() {
        trackReset();
        }
    document.getElementById('Audio1').src = 'Data/'+TRACK+'.mp3';
    trackPlay()
    if (MODE=='LISTEN'){document.getElementById('songData').innerHTML=LISTENarray[num+1]}
}

function incTrack(dir){
    var newNo=parseInt(tuneSelect.selectedIndex+dir,10)
    if (newNo==7) {newNo=0}
    if (newNo==-1) {newNo=6}
    document.getElementById('tuneSelect').selectedIndex=newNo
    TRACK=tuneSelect.value
    document.getElementById('Audio1').src = 'Data/'+TRACK+'.mp3';
    //if (MODE=='LISTEN'){msg(LISTENarray[newNo])}
}

function msg(str, id) {
    MODE = 'STD';
    var i;
    cto()
    document.getElementById('msg').innerHTML = str;
    document.getElementById('msg').style.display = 'block';
    document.getElementById('viewBox').style.display = 'none';
    for (i = 0; i <= 8; i++) {
        if (id == i) {
            document.getElementById(i).style.color = 'white';
            document.getElementById(i).style.backgroundColor = 'green';
        } else {
            document.getElementById(i).style.color = 'red';
            document.getElementById(i).style.backgroundColor = 'yellow';
        }
    }
    if (id == 8) {
        MODE = "GALLERY"
        document.getElementById('viewBox').style.display = 'block'
    }
    if (id == 7) {
        MODE = "LISTEN"
        //document.getElementById('playCtrl').style.display = 'block'
    }
    realign()
}






function realign() { //TALL ASPECT  (this order left-right-top-bottom-height-width-font)
    document.getElementById('msg').style.border = "none";
    document.getElementById('menu').style.border = "none";
    if (window.innerHeight / window.innerWidth > 0.8) { //TALL
        //l,r,t,b,h,w,f
        shapeShift('hdr', '0%', '-', '0%', '-', '10vw', '100%', '3.5vw');
        shapeShift('msg', '1vw', '1vw', '20vw', '28vh', '-', '-', '3vh')
        //<div id='playerA' style="position:absolute; display:none; border:groove; right:0%; top:0vw; height:11vw;width:49vw;background-color:black;z-index:4000">
        shapeShift('playerA', '1v', '-', '10vw', '-', '10vw', '49vw', '3vh')
        shapeShift('viewBox', '0%', '0%', '5', '28%', '-', '-', '3vw');
        shapeShift('floater', '-%', '0%', '0%', '-', '9vw', '-', '3vw');
        shapeShift('menu', '1vw', '1vw', '72vh', '1vw', '-', '-', '3vw');
        shapeShift(0, '34%', '-', '0%', '-', '4vw', '32%', '4vw');
        shapeShift(1, '1%', '-', '25%', '-', '4vw', '32%', '4vw');
        shapeShift(2, '1%', '-', '50%', '-', '4vw', '32%', '4vw');
        shapeShift(3, '1%', '-', '75%', '-', '4vw', '32%', '4vw');
        shapeShift(4, '34%', '-', '25%', '-', '4vw', '32%', '4vw');
        shapeShift(5, '34%', '-', '50%', '-', '4vw', '32%', '4vw');
        shapeShift(6, '34%', '-', '75%', '-', '4vw', '32%', '4vw');
        shapeShift(7, '67%', '-', '25%', '-', '4vw', '32%', '4vw');
        shapeShift(8, '67%', '-', '50%', '-', '4vw', '32%', '4vw');
        shapeShift('sizeScreen', '-', '1%', '94%', '-', '5%', '-', '2.5vw');
        //shapeShift(10, '67%', '-', '75%', '-', '25%', '25%', '4vw');
    } else { //WIDE ASPECT
        shapeShift('hdr', '0%', '-', '0%', '-', '7vw', '100%', '3.5vw');
        shapeShift('msg', '1%', '20%', '7vw', '1%', '-', '-', '2vw');
        shapeShift('playerA',  '1%', '20%', '7vw', '-', '-', '-', '2vw');
        shapeShift('viewBox', '-', '20%', '-', '0%', '-', '-', '2.5vw');
        shapeShift('floater', '-%', '0%', '0%', '-', '6vw', '-', '3vw');
        shapeShift('menu', '80vw', '1vw', '7vw', '1vw', '-', '-', '1.6vw');
        shapeShift(0, '2%', '-', '0%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(1, '2%', '-', '10%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(2, '2%', '-', '20%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(3, '2%', '-', '30%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(4, '2%', '-', '40%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(5, '2%', '-', '50%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(6, '2%', '-', '60%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(7, '2%', '-', '70%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift(8, '2%', '-', '80%', '-', '2.5vw', '100%', '2.5vw');
        shapeShift('sizeScreen', '-', '1%', '91%', '-', '8%', '-', '2.5vw');
        
        

        
        
        
        
        //shapeShift(10, '0%', '-', '90%', '-', '10%', '60%', '2.5vw');
        //if (MODE == 'STD') {
         //   shapeShift('iconA', '0%', '-',  '2%',   '-', '20vw', '-','-' )
        //    shapeShift('iconA', '0%' , '-', '12vw', '-', '12vw', '-', '-')
        //} else {
        //    shapeShift('iconA', '0%', '-', '2%', '-', '-', '6vw', '-')
        //}
    }
    //juggleA()

    picAlign()
}

function shapeShift(id, lf, rt, tp, bm, ht, wt, fs) {
    if (lf != '-') {
        document.getElementById(id).style.left = lf;
    }else{
        document.getElementById(id).style.left = undefined;
    }
    if (rt !== '-') {
        document.getElementById(id).style.right = rt;
    }else{
        document.getElementById(id).style.right = undefined;
    }
    if (tp !== '-') {
        document.getElementById(id).style.top = tp;
    }else{
        document.getElementById(id).style.top = undefined;
    }
    if (bm !== '-') {
        document.getElementById(id).style.bottom = bm;
    }
    if (ht !== '-') {
        document.getElementById(id).style.height = ht;
    }
    if (wt !== '-') {
        document.getElementById(id).style.width = wt;
    }
    if (fs !== '-') {
        document.getElementById(id).style.fontSize = fs;
    }
}

function loadGallery() {
    ARRgallery = "0,1,2,3,4,5,6".split(',')
    ARRgallery[0] = "1968? Chuck, Bill, yours truly and Jay. Playing as 'JAM' in Butte Montana|firstBand.jpg|1219|810";
    ARRgallery[1] = "Me, 50 years ago playing bass at a Montana State University Spring Event...|bass.png|1316|1940";
    ARRgallery[2] = "Thats Ron (on the right), who got me back into playing guitar after a 45 year hiatus...|ron.jpg|1051|788";
    ARRgallery[3] = "At a Newcomers Christmas party with my buddy, Pat, who passed away in November of 2019|pat.jpg|1051|855";
    ARRgallery[4] = "My friends, Stan, Bill, John, Sally and I playing for the fun of it...|barn.jpg|2754|1660";
    ARRgallery[5] = "At St Catherine's, one of my current monthly gigs...|fred.jpg|1641|3919";
    ARRgallery[6] = "How I imagine my 'virtual' backup band...|folkBand.png|581|575";
    PICcount = ARRgallery.length
}

function fades(id, dir, ms, ids) {
    document.getElementById(id).style.display = 'block' //secure starting point
    if (document.getElementById(id).style.opacity == NaN) {
        alert("UNDEFINED Opacity for " + id)
    }
    var arr;
    var cur = parseFloat(parseFloat(document.getElementById(id).style.opacity, 10) + dir, 10)
    if (cur >= 1 | cur <= 0) {
        clearTimeout(TIMEOUTfade)
        document.getElementById(id).style.display = 'block'
        if (cur > 0.6) document.getElementById(id).style.opacity = 1;
        if (cur < 0.4) document.getElementById(id).style.opacity = 0;
        arr = ids.split('|')
        id = arr[0]
        arr.shift()
        ids = arr.join('|')
        if (id == null | id == undefined | id == '' | id == ' ') {
            return;
        } else {
            fades(id, dir, ms, ids)
        }
    } else {
        TIMEOUTfade = setTimeout(function() {
            document.getElementById(id).style.opacity = cur;
            fades(id, dir, ms, ids)
        }, ms);
    }
}
//CONFIG FUNCTIONS===========================================================

function gallery(n) {
    if (n == undefined) {
        n = 0
    }
    document.getElementById('galleryPic').style.display = 'none'
    //document.getElementById('playCtrl').style.display = 'none'
    //document.getElementById('iconA').style.width = '8vw';
    PIC = PIC + n;
    PICpath = "Data/"
    MODE = 'GALLERY'
    document.getElementById('viewBox').style.display = 'block';
    if (PIC == 0) {
        document.getElementById('picLeft').style.display = 'none'
    } else {
        document.getElementById('picLeft').style.display = 'block'
        //document.getElementById('iconA').style.top = '2%'
    }
    
    
    if (PIC == ARRgallery.length - 1) {
        document.getElementById('picRight').style.display = 'none'
    } else {
        document.getElementById('picRight').style.display = 'block'
    }

    document.getElementById('galleryPic').src = PICpath + ARRgallery[PIC].split('|')[1]
    document.getElementById('viewBox').style.display = 'block' //hide msg div
    document.getElementById('msg').style.display = 'none' //hide msg div
    PICaspect = ARRgallery[PIC].split('|')[2] / ARRgallery[PIC].split('|')[3] //=w/h
    document.getElementById('galleryTxt').innerHTML = ARRgallery[PIC].split('|')[0];
    picAlign();
    document.getElementById('picCount').innerHTML = parseInt(PIC + 1, 10) + "/" + PICcount;
}

function picAlign() {
    var frameAspect = document.getElementById('picFrame').clientWidth / document.getElementById('picFrame').clientHeight
    var factor = PICaspect / frameAspect
    if (factor < 1) {
        document.getElementById('galleryPic').style.height = "100%"
        document.getElementById('galleryPic').style.width = factor * 100 + "%"
        document.getElementById('galleryPic').style.left = 50 * (1 - factor) + "%"
        document.getElementById('galleryPic').style.bottom = "0%"
    } else {
        document.getElementById('galleryPic').style.width = "100%"
        document.getElementById('galleryPic').style.height = 1 / factor * 100 + "%"
        document.getElementById('galleryPic').style.left = "0%"
        document.getElementById('galleryPic').style.bottom = 50 * (1 - (1 / factor)) + "%"
    }
    document.getElementById('galleryPic').style.display = 'block'
}

function admin() {
    if (LOCKED == true) {
        var f = prompt('ADMINISTRATORS PASSWORD?');
        if (f == null) {
            return;
        }
        ADMINstring = fileDownload("Data/" + f + ".txt");
        if (ADMINstring.substring(0, 3) == '404') {
            alert("Sorry...\n Wrong password...")
        } else {
            LOCKED = false
            document.getElementById('admin').src = 'Data/underConstruction.png'
        }
    } else {
        msg(ADMINstring)
    }
}

function fullScreen() {
    if (FULLscreen == false) {
        launchIntoFullscreen(document.documentElement);
        document.getElementById('sizeScreen').src = 'Data/yellowExitFullScreen.png';
        FULLscreen = true
    } else {
        exitFullscreen();
        FULLscreen = false
        document.getElementById('sizeScreen').src = 'Data/yellowEnterFullScreen.png';
    }
}

function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (element.msCancelFullscreen) {
        document.msCancelFullscreen();
    }
} //this step is BOGUS

//UTILITY FUNCTIONS===========================================================================

function aspect() {
    if (LOCKED == false) {
        var w = document.getElementById('galleryPic').naturalWidth
        var h = document.getElementById('galleryPic').naturalHeight
        var a = w / h
        alert("Picture Aspect Information:+\n  Width: " + w + "px\n  Height: " + h + "px\n  Aspect Ratio: " + a)
    }
}

function cto() {
    clearTimeout(TIMEOUTgallery);
}

function fade(id, dir, ms) {
    var crp = parseFloat(document.getElementById(id).style.opacity, 10)
    var cur = parseFloat(crp + dir, 10)
    if (cur >= 1 | cur < 0) {
        clearTimeout(TIMEOUTfade)
        document.getElementById(id).style.display = 'block'
    } else if (cur == 0) {
        clearTimeout(TIMEOUTfade)
        document.getElementById(id).style.display = 'none'
    } else {
        TIMEOUTfade = setTimeout(function() {
            document.getElementById(id).style.opacity = cur;
            fade(id, dir, ms)
        }, ms);
    }
}

function switchTrack(path) {
    var done = 1;
    var hint = "Switched Tracks..."
    document.getElementById('hint').innerHTML = "Changing Tracks..." + CAL
    SWITCHtune = Audio1.currentTime
    SWITCHtime = new Date().getTime();
    //document.getElementById('hint').innerHTML=base
    Audio1.src = path;
    type = "audio/mpeg"
    Audio1.currentTime = SWITCHtune + 0.2
    Audio1.play();
    CHECKtune = Audio1.currentTime
    CHECKtime = new Date().getTime();
    setTimeout(function() {
        hint = "Switched at Tune time:" + SWITCHtune;
        hint = hint + "---Checked at Tune Time:" + CHECKtune;
        hint = hint + "---DELTA:" + parseFloat(CHECKtune - SWITCHtune);
        hint = hint + "<br>Switched at Real Time" + SWITCHtime;
        hint = hint + "---Checked at Real Time" + CHECKtime;
        hint = hint + "---DELTA:" + parseFloat(CHECKtime - SWITCHtime, 10);
        document.getElementById('hint').innerHTML = hint
    }, 1000);
    document.getElementById('hint').innerHTML = hint
}

function fileDownload(path) {
    var content = "Attemping to Download" + path;
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    content = request.responseText;
    if (content.search("404") > -1 | content.length < 1) {
        content = '404 Error' + content
    }
    return content; //could be undfined or null, not tested for
}


function dis(id, disp) {
    if (disp === undefined) {
        if (document.getElementById(id).style.display == 'none') {
            document.getElementById(id).style.display = 'block';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    } else {
        if (disp == 'none') {
            document.getElementById(id).style.display = 'none';
        } else {
            document.getElementById(id).style.display = 'block';
        }
    }
}
</script>
</body>
</html>
<!--Play Ctrl

    <div id='playCtrl' style="position:absolute;display:none;border:groove;left:0%;right:0%;top:0%;bottom:0%; background-color:transparent;z-index:4000">
        
        

 <!--       
        <select id='tuneSelectA' onchange='playTrack(this.value,this.selectedIndex)' style="position:absolute; font-size:3vh; background-color:white; color:black;left:0%; top:0%; height:4vh; width:100%;">
                <option>Abilene</option>
                <option>Sea Of Heartbreak</option>
                <option>Pancho And Lefty</option>
                <option>The Cape</option>
                <option>When The Roses Bloom Again</option>
                <option>Jamaica Farewell</option>
                <option>Teach Your Children</option>
        </select>
-->
        
        
<!--         
        <div id="myTable" style='position:absolute;background-color:yellow;color:red;border:none;left:0.5%;top:4vh;width:99%'>

        <div style='height:12vw; border:none;background-color:transparent;font-size:3vw;line-height:150%'>
            
          
            <div onclick="loopSet('all')" style='position:absolute;left:0%;top:0;height:100%;width:8vw'>
                <img title='Play the Entire List...' id='playlistButton' src='Data/yellowPlaylist.png' style='position:absolute;height:7vw;left:0%' name="playlistButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    All
                </div>
            </div>

            <div onclick="loopSet('loop')" style='position:absolute;left:10%;top:0;height:100%;width:8vw'>
                <img title='Repeat the Song...' id='repeatButton' src='Data/yellowRepeat.png' style='position:absolute;height:7vw;left:0%' name="repeatButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    Loop
                </div>
            </div>

            <div onclick="loopSet('once')" style='position:absolute;left:20%;top:0;height:100%;width:8vw'>
                <img title='Play the Tune Once...' id='onceButton' src='Data/greenOnce.png' style='position:absolute;height:7vw;left:0%' name="onceButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    Once
                </div>
            </div>

            <div onclick="volSet(0.5)" style='position:absolute;left:30%;top:0;height:100%;width:8vw'>
                <img title='Quieter...' id='volDownButton' src='Data/yellowVolDown.png' style='position:absolute;height:7vw;left:0%' name="volDownButton">

                <div style='position:absolute;text-align:right;left:0%;bottom:0%;width:100%;'>
                    VOL.
                </div>
            </div>

            <div onclick="volSet(2)" style='position:absolute;left:40%;top:0;height:100%;width:8vw'>
                <img title='LOUDER' id='volUpButton' src='Data/yellowVolUp.png' style='position:absolute;height:7vw;left:0%' name="volUpButton">

                <div id='volNo' style='position:absolute;text-align:left;left:0%;bottom:0%;width:100%;'>
                    5
                </div>
            </div>

            <div onclick='incTrack(-1)' style='position:absolute;left:50%;top:0;height:100%;width:8vw'>
                <img title='Previous Tune' id='lastTuneButton' src='Data/yellowLastTune.png' style='position:absolute;height:7vw;left:0%' name="lastTuneButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    BACK
                </div>
            </div>

            <div onclick="trackReset()" style='position:absolute;left:60%;top:0;height:100%;width:8vw'>
                <img title='Rewind this Song' id='rewindButton' src='Data/yellowRewind.png' style='position:absolute;height:7vw;left:0%' name="rewindButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    Rewind
                </div>
            </div>

            <div onclick="trackGoToEnd()" style='position:absolute;left:70%;top:0;height:100%;width:8vw'>
                <img title='Got to the End of this Song' id='endButton' src='Data/yellowEnd.png' style='position:absolute;height:7vw;left:0%' name="endButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    End
                </div>
            </div>

            <div onclick='incTrack(1)' style='position:absolute;left:80%;top:0;height:100%;width:8vw'>
                <img title='Next Tune' id='nextTuneButton' src='Data/yellowNextTune.png' style='position:absolute;height:7vw;left:0%' name="nextTuneButton">

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    NEXT
                </div>
            </div>

            <div id='playButton' onclick="trackPlay()" style='position:absolute;left:90%;top:0;height:100%;width:8vw;display:block;'>
                <img title='Play the Tune' src='Data/yellowPlay.png' style='position:absolute;height:7vw;left:0%'>

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    PLAY
                </div>
            </div>

            <div id='pauseButton' onclick="trackPause()" style='position:absolute;left:90%;top:0;height:100%;width:8vw;display:none;z-index:5'>
                <img title='Play the Tune' src='Data/yellowPause.png' style='position:absolute;height:7vw;left:0%'>

                <div style='position:absolute;text-align:center;left:0%;bottom:0%;width:100%;'>
                    STOP!
                </div>
            </div>
             
        </div>
     
    </div>    
--> 

<!--
    <div id='songData' style='position:absolute; background-color:transparent;color:black; line-height:150%; left:0%; bottom:10%; width:100%;overflow:auto;'>
        Use LIST then Select a Tune HERE...<br>
        Use INFO to see some song facts HERE.
    </div>

</div>   
 --> 