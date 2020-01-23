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
var TRACK='Abilene'
var PICcount=7;
var PIC=0
var PICpath
var PICaspect
var MODE='STD'
var ARRgallery = "0,1,2,3,4,5".split(',')
var VOL=0.5
var LOOPtype='all'

//^BOOT=============================================================
window.onload = function() {
    BANDstring = fileDownload('Data/bandString.txt');
    ABOUTstring = fileDownload('Data/aboutString.txt');
    SCHEDULEstring = fileDownload('Data/scheduleString.txt');
    PLAYLISTstring = fileDownload('Data/playlistString.txt');
    WHYstring = fileDownload('Data/whyString.txt');
    WELCOMEstring = fileDownload('Data/welcomeString.txt');
    CONTACTstring = fileDownload('Data/contactString.txt');
    LISTENarray = fileDownload('Data/listenArray.txt').split('|');
    loadGallery();
    document.getElementById('Audio1').src = 'Data/Abilene.mp3';
    document.getElementById("Audio1").volume = 0.5
    VOL = 0.5
    config(WELCOMEstring, 0);
    dis('hdr','block')
    dis('msg','block')
    dis('playerA','none')
    dis('menu','block')// fades('hdr', 0.01, 1, 'msg|menu')
}
//^Configure Views=============================================================
function config(msg, id) {
var i;
cto()
document.getElementById('msg').innerHTML = msg;
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
        MODE = "GALLERY";
        dis('viewBox','block')
        gallery()
    }else if(id == 7) {
        MODE = "LISTEN"
        listen()
        realign()
    } else {
        MODE = 'STD';
        realign()
    }
}

function realign() { //TALL ASPECT  (this order left-right-top-bottom-height-width-font)
    if (window.innerHeight / window.innerWidth > 0.8) { //TALL
        //l,r,t,b,h,w,f
        if (MODE == 'LISTEN') {
            dis('playerA', 'block')
            dis('viewBox', 'none')
            shapeShift('playerA', '1vw', '1vw', '10vw', '-', '12vw', '-', '2vh')
            shapeShift('msg', '1vw', '1vw', '22vw', '28vh', '-', '-', '3vh')
        } else if (MODE == 'GALLERY') {
            dis('viewBox', 'block')
            dis('playerA', 'none')
        } else {
            shapeShift('msg', '1vw', '1vw', '10vw', '28vh', '-', '-', '3vh')
            dis('viewBox', 'none')
            dis('playerA', 'none')
        }
        shapeShift('hdr', '0%', '-', '0%', '-', '10vw', '100%', '3.5vw');
        shapeShift('viewBox', '0%', '0%', '5', '28%', '-', '-', '3vw');
        shapeShift('floater', '-', '0%', '0%', '-', '7vw', '-', '7vw');
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
    } else { //WIDE ASPECT
        if (MODE == 'LISTEN') {
            dis('playerA', 'block')
            dis('viewBox', 'none')
            shapeShift('playerA', '1vw', '20vw', '7vw', '-', '12vw', '-', '2vh')
            shapeShift('msg', '1vw', '20vw', '19vw', '1vh', '-', '-', '3vh')
        } else if (MODE == 'GALLERY') {
            dis('viewBox', 'block')
            dis('playerA', 'none')
        } else {
            shapeShift('msg', '1vw', '20vw', '7vw', '1vh', '-', '-', '3vh')
            dis('viewBox', 'none')
            dis('playerA', 'none')
        }
        shapeShift('hdr', '0%', '-', '0%', '-', '7vw', '100%', '3.5vw');
        shapeShift('viewBox', '-', '20%', '-', '0%', '-', '-', '2.5vw');
        shapeShift('floater', '-', '0%', '0%', '-', '6vw', '-', '3vw');
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
    }
    picAlign()
}

function shapeShift(id, lf, rt, tp, bm, ht, wt, fs) {
    if (lf != '-') {
        document.getElementById(id).style.left = lf;
    } else {
        document.getElementById(id).style.left = undefined;
    }
    if (rt !== '-') {
        document.getElementById(id).style.right = rt;
    } else {
        document.getElementById(id).style.right = undefined;
    }
    if (tp !== '-') {
        document.getElementById(id).style.top = tp;
    } else {
        document.getElementById(id).style.top = undefined;
    }
    if (bm !== '-') {
        document.getElementById(id).style.bottom = bm;
    } else {
        document.getElementById(id).style.bottom = undefined;
    }
    if (ht !== '-') {
        document.getElementById(id).style.height = ht;
    } else {
        document.getElementById(id).style.height = undefined;
    }
    if (wt !== '-') {
        document.getElementById(id).style.width = wt;
    } else {
        document.getElementById(id).style.width = undefined;
    }
    if (fs !== '-') {
        document.getElementById(id).style.fontSize = fs;
    } else {
        document.getElementById(id).style.fontSize = undefined;
    }
}
//^Gallery=============================================================
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
    PIC=0
}

function gallery(n) {
    if (n == undefined) {n=0}
    PIC=PIC+n
    document.getElementById('galleryPic').style.display = 'block'
    PICpath = "Data/"
    document.getElementById('viewBox').style.display = 'block';
    if (PIC == 0) {
        //alert ('FIRST PIC')
        document.getElementById('picLeft').style.display = 'none'
    } else {
        document.getElementById('picLeft').style.display = 'block'
    }
    if (PIC == ARRgallery.length - 1) {
        document.getElementById('picRight').style.display = 'none'
    } else {
        document.getElementById('picRight').style.display = 'block'
    }
    document.getElementById('galleryPic').src = PICpath + ARRgallery[PIC].split('|')[1]
    document.getElementById('viewBox').style.display = 'block' //hide msg div
    PICaspect = ARRgallery[PIC].split('|')[2] / ARRgallery[PIC].split('|')[3] //=w/h
    document.getElementById('galleryTxt').innerHTML = ARRgallery[PIC].split('|')[0];
    picAlign();
    document.getElementById('picCount').innerHTML = (PIC+1)  + "/" + PICcount;
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

//^Audio=============================================================

function listen() {
    loadTrack(TRACK,true)
}

function loadTrack(track, info) {
    var num = undefined;
    if (track == undefined) {
        track = TRACK
    } else {
        TRACK = track
    }
    document.getElementById('tuneSelect').selectedValue = TRACK
    num = document.getElementById('tuneSelect').selectedIndex

    if (info == true) {
        document.getElementById('msg').innerHTML = LISTENarray[num]
    }

    document.getElementById('Audio1').src = 'Data/' + TRACK + '.mp3';
    document.getElementById("Audio1").onended = function() {
        trackReset();
    }
    dis('pauseButton','none')
    dis('pauseButtonA','none')
}  


function closePlayer() {
    document.getElementById('playerA').style.display = 'none'
}


function trackPause() {
    if (document.getElementById('Audio1').currentTime == document.getElementById('Audio1').duration) {
        trackReset()
    }
    document.getElementById('Audio1').pause()
    document.getElementById('pauseButton').style.display = 'none'
    document.getElementById('pauseButtonA').style.display = 'none'
}

function trackPlay() {
    document.getElementById("Audio1").onended = function() {
        trackEnd();
    }
    document.getElementById('Audio1').play()
    document.getElementById('pauseButtonA').style.display = 'block'
    document.getElementById('pauseButton').style.display = 'block'
    document.getElementById('playButton').style.display = 'block'
}

function trackReset() {
    document.getElementById('Audio1').onended = null
    document.getElementById('Audio1').pause()
    document.getElementById('Audio1').currentTime = 0
    dis('pauseButton','none')
    dis('pauseButtonA','none')
}

function trackEnd() {
    incTrack(1)
    //trackPlay();
}

function playTrack(track, num) {
    TRACK = track;
    document.getElementById("Audio1").onended = function() {
        trackReset();
    }
    document.getElementById('Audio1').src = 'Data/' + TRACK + '.mp3';
    trackPlay()
    if (MODE == 'LISTEN') {
        document.getElementById('msg').innerHTML = LISTENarray[num]
    }
}

function incTrack(dir) {
    var newNo = parseInt(tuneSelect.selectedIndex + dir, 10)
    if (newNo == 7) {
        newNo = 0
    }
    if (newNo == -1) {
        newNo = 6
    }
    document.getElementById('tuneSelect').selectedIndex = newNo
    TRACK = tuneSelect.value
    document.getElementById('Audio1').src = 'Data/' + TRACK + '.mp3';
    if (MODE == 'LISTEN') {
        document.getElementById('msg').innerHTML = LISTENarray[newNo]
    }
    dis('pauseButton','none')
    dis('pauseButtonA','none')
}

//^MISC============================================================
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
        config(ADMINstring)
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
}

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
 