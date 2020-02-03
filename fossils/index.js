//GLOBAL VARIABLES===============================================
    var FULLscreen=false;
    var LOCKED=true;
//Strings===============================================
    var WELCOMEstring;
    var BANDstring;
    var ABOUTstring;
    var SCHEDULEstring;
    var PLAYLISTstring;
    var WHYstring;
    var LISTENstring;
    var ADMINstring;
    var GAllERYstring="This is the Photo Gallery..."
    var TEMPstring = null;
    var HELPstring = "Looking for help...tough";
    var TESTstring = 'This is the test string. And it looks like this... Here is A Break<br>Title<br>';
//Timeouts=========================================================
    var TIMEOUTfade;
    var TIMEOUTgallery;
    var TIMEOUTcards;
//Gallery===========================================================
    var PICcount=9;
    var PIC=0;
    var PICpath;
    var PICaspect;
    var GALLERYmode='man';   
//CONFIGURATION===========================================================
    var MODE='WELCOME';
    var ID=0;
    var PLAYER=false;
//WELC0ME MODE==========================================================================
    var CARD=0;
    var STATE=1
//ARRAYS===============================================================================
    var ARRmode='WELCOME,CONTACT,ABOUT,PLAYLIST,SCHEDULE,WHY,BAND,GALLERY,ADMIN'.split(',')
    var ARRcards;
    var ARRgallery = "0,1,2,3,4,5".split(',');
    var ARRtunes;
//Tune Variables
    var LISTEN=false;
    var TUNE=undefined
    var TUNEselector;//A string to paste into the tuneSelect
    var TRACK=0;//from ARRtunes
    var TUNE='PICK ONE...';//Title of the Tune
    var TRACKindex=undefined;//index of the tuneSelector
    var VOL=0.5;
    var LOOPtype='all';

//^BOOT=============================================================
window.onload = function() {
    BANDstring = fileDownload('Data/bandString.txt');
    ABOUTstring = fileDownload('Data/aboutString.txt');
    SCHEDULEstring = fileDownload('Data/scheduleString.txt');
    PLAYLISTstring = fileDownload('Data/playlistString.txt');
    WHYstring = fileDownload('Data/whyString.txt');
    WELCOMEstring = fileDownload('Data/welcomeString.txt');
    CONTACTstring = fileDownload('Data/contactString.txt');
    ARRtunes = fileDownload('Data/listenArray.txt').split('|');
    GALLERYstring=fileDownload('Data/galleryString.txt')
    tuneSelectorMake()
    document.getElementById('tuneSelect').innerHTML = TUNEselector
    document.getElementById('tuneSelect').selectedIndex = TRACK;
    document.getElementById("Audio1").volume = 0.033
    VOL = 0.5
    ARRcards=fileDownload('Data/cardsString.txt').split('\n');
    dis('hdr','block')
    dis('msg','block')
    dis('viewBox','none')
    dis('playerA','block')
    dis('menu','block')// fades('hdr', 0.01, 1, 'msg|menu')    
    config(0);
}

function toggleListen(){
    if(LISTEN==true){
        document.getElementById('listenA').style.backgroundColor='yellow'
        LISTEN=false
    }else{
        LISTEN=true
        document.getElementById('listenA').style.backgroundColor='green'
    }
    config(ID)
}

function listen(id,play){
        document.getElementById('tuneSelect').selectedIndex=id;
        TUNE=document.getElementById('tuneSelect').value;
        playTrack()
    }

function pop(txt){
    dis('popper','block')
    document.getElementById('popText').innerHTML=txt
}

//^Configure Views=============================================================
//function config(msg, id, mode)
function config(id){
    var i;
    cto()
    var msg="NO MSESSAGE"
    for (i = 0; i <= 7; i++) { //set the menu
        if (id == i) {
            document.getElementById(i).style.color = 'white';
            document.getElementById(i).style.backgroundColor = 'green';
        } else {
            document.getElementById(i).style.color = 'red';
            document.getElementById(i).style.backgroundColor = 'yellow';
        }
    }
    ID = id
    MODE = ARRmode[id]
    msg=MODE.toUpperCase()+'string'
    msg= eval(msg)
    document.getElementById('msg').innerHTML = msg;
//end of input menu   
    if (MODE == 'WELCOME') {
        dis('viewBox', 'none');
        document.getElementById('cards').innerHTML = ARRcards[0]
        playCards();
    } else if (MODE == 'GALLERY') {
        loadGallery();
        changeGalleryMode('man');
        gallery();
        dis('viewBox', 'block');
    } else {
        dis('viewBox', 'none');
    }
    if (LISTEN==true) {
        dis('playerA', 'block');
    }else{
        dis('playerA','none');
    }
    realign()
}

function realign() { //TALL ASPECT  (this order left-right-top-bottom-height-width-font)
    //Determine formFactor and background
    var aspect = window.innerHeight / window.innerWidth
    var formFactor = 'none'
    var black = 0
    if (aspect > 1.8) {
        black = 100 - 100 * (1.8 / aspect)
        shapeShift('background', '0%', '0%', '0%', black + '%', '-', '-', '-')
        formFactor = 'tall'
    }
    if (aspect > 1&aspect<=1.8) {
        shapeShift('background', '0%', '0%', '0%', '0%', '-', '-', '-')
        formFactor = 'tall'
    }
    if (aspect > 0.5&aspect<=1) {
        shapeShift('background', '0%', '0%', '0%', '0%', '-', '-', '-')
        formFactor = 'short'
    }
    if (aspect <=0.5) {
        black = 100 - 100 * (aspect /0.5 )
        shapeShift('background', '0%', black+'%', '0%', '0%', '-', '-', '-')
        formFactor = 'short'
    }
    if (formFactor == 'tall') {
        //l,r,t,b,h,w,f
        if (MODE == 'WELCOME') {
            shapeShift('iconA', '1%', '-', '1%', '-', '-', '24%', '-')
            shapeShift('welText', '-', '1%', '1%', '-', '89%', '74%', '4vw')
            shapeShift('cards', '1%', '-', '90%', '0%', '-', '98%', '3vw')
        }
        if (LISTEN == false) {
            shapeShift('msg', '1%', '1%', '7%', '22%', '-', '-', '4vw')
            //shapeShift('popper', '1vw', '1vw', '25vw', '23vh', '-', '-', '5vw')
            shapeShift('menu', '1%', '1%', '78%', '0%', '-', '-', '4vw');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '0%', '7%', '22%', '-', '-', '2.5vw')
            }
        } else if (LISTEN == true) {
            shapeShift('msg', '1%', '1%', '7%', '32%', '-', '-', '4vw');
            //shapeShift('popper', '1vw', '1vw', '25vw', '23vh', '-', '-', '3vh')
            shapeShift('menu', '1%', '1%', '68%', '10%', '-', '-', '3vw');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '0%', '7%', '32%', '-', '-', '2.5vw')
            }
        }
        shapeShift('popper', '10%', '10%', '25%', '25%', '-', '-', '3vw')
        shapeShift('playerA', '0%', '0%', '90%', '0%', '-', '-', '2vh')
        shapeShift('tuneSelect', '0%', '-', '0%', '55%', '-', '100%', '4vw')
        shapeShift('playButtons', '0%', '0%', '45%', '0%', '-', '-', '4vw')
        shapeShift('hdr', '0%', '0%', '0%', '93%', '-', '-', '3.5vw');
        //shapeShift('floater', '-', '0%', '0%', '-', '10vw', '-', '7vw');
        shapeShift(0, '34%', '34%', '0%', '77%', '-', '-', '4vw');
        shapeShift(1, '1%', '68%', '25%', '52%', '_', '_', '4vw');
        shapeShift(2, '1%', '68%', '50%', '27%', '_', '_', '4vw');
        shapeShift(3, '1%', '68%', '75%', '2%', '_', '_', '4vw');
        shapeShift(4, '34%', '34%', '25%', '52%', '-', '_', '4vw');
        shapeShift(5, '34%', '34%', '50%', '27%', '', '_', '4vw');
        shapeShift(6, '34%', '34%', '75%', '2%', '', '_', '4vw');
        shapeShift(7, '67%', '2%', '25%', '52%', '-', '_', '4vw');
        shapeShift('listenA', '67%', '2%', '50%', '27%', '_', '-', '4vw');
        shapeShift('sizeScreen', '-', '2%', '-', '2%', '22%', '-', '2.5vw');
} else { //WIDE ASPECT
        //pop('short');
        if (MODE == 'WELCOME') {
            shapeShift('iconA', '1%', '-', '1%', '-', '75%', '-', '-')
            shapeShift('welText', '-', '1%', '1%', '-', '90%', '60%', '4vh')
            shapeShift('cards', '1%', '1%', '90%', '0%', '-', '-', '3vh')
        }
        if (LISTEN == false) {
            shapeShift('msg', '1%', '20%', '7%', '1%', '-', '-', '4.5vh')
            //shapeShift('popper', '1vw', '1vw', '25vw', '23vh', '-', '-', '3vh')
            shapeShift('menu', '80%', '0%', '7%', '0%', '-', '-', '3vh');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '20%', '7%', '0%', '-', '-', '2.5vh')
            }
        } else if (LISTEN == true) {
            shapeShift('msg', '1%', '20%', '7%', '10%', '-', '-', '4.5vh')
            
            shapeShift('menu', '80%', '0%', '7%', '0%', '-', '-', '3vh');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '20%', '7%', '10%', '-', '-', '2.5vh')
            }
        }
        shapeShift('popper', '10%', '10%', '25%', '25%', '-', '-', '3vh')
        shapeShift('tuneSelect', '0%', '-', '0%', '60%', '-', '100%', '2.5vh')
        shapeShift('playButtons', '0%', '0%', '40%', '0vw', '-', '-', '4vh')
        shapeShift('hdr', '0%', '-', '0%', '-', '7%', '100%', '1vw');
        //shapeShift('floater', '-', '0%', '0%', '-', '7vw', '-', '3vw');
        shapeShift('playerA', '1%', '20%', '90%', '0%', '-', '-', '2vh')
        shapeShift(0, '2%', '2%', '0%', '91%', '-', '-', '3.5vh');
        shapeShift(1, '2%', '2%', '10%', '81%', '-', '-', '3.5vh');
        shapeShift(2, '2%', '2%', '20%', '71%', '-', '-', '3.5vh');
        shapeShift(3, '2%', '2%', '30%', '61%', '-', '-', '3.5vh');
        shapeShift(4, '2%', '2%', '40%', '51%', '-', '-', '3.5vh');
        shapeShift(5, '2%', '2%', '50%', '41%', '-', '-', '3.5vh');
        shapeShift(6, '2%', '2%', '60%', '31%', '-', '-', '3.5vh');
        shapeShift(7, '2%', '2%', '70%', '21%', '-', '-', '3.5vh');
        shapeShift('listenA', '2%', '2%', '80%', '11%', '-', '-', '3.5vh');
        shapeShift('sizeScreen', '-', '1%', '-', '1%', '8%', '-', '2.5vh');
    }
    if (MODE == 'GALLERY') {
        picAlign()
    }
}


function shapeShift(id, lf, rt, tp, bm, ht, wt, fs) {
    if (lf != '-') {
        document.getElementById(id).style.left = lf;
    } else {
        document.getElementById(id).style.left = '';
    }
    if (rt !== '-') {
        document.getElementById(id).style.right = rt;
    } else {
        document.getElementById(id).style.right = '';
    }
    if (tp !== '-') {
        document.getElementById(id).style.top = tp;
    } else {
        document.getElementById(id).style.top = '';
    }
    if (bm !== '-') {
        document.getElementById(id).style.bottom = bm;
    } else {
        document.getElementById(id).style.bottom = '';
    }
    if (ht !== '-') {
        document.getElementById(id).style.height = ht;
    } else {
        document.getElementById(id).style.height = '';
    }
    if (wt !== '-') {
        document.getElementById(id).style.width = wt;
    } else {
        document.getElementById(id).style.width = '';
    }
    if (fs !== '-') {
        document.getElementById(id).style.fontSize = fs;
    } else {
        document.getElementById(id).style.fontSize = '';
    }

    //*developer lines
    //document.getElementById('8').style.display='block';


}


//^Welcome Functions============================================================

function playCards(state) {
    clearTimeout(TIMEOUTcards)
    clearTimeout(TIMEOUTfade)
    if (document.getElementById('cards').style.display=='block') {//fade out
            CARD = CARD + 1
            if (CARD >= ARRcards.length) {
                CARD = 0;
            }
            fade('cards', -0.02, 50) //fade out
            TIMEOUTcards = setTimeout(function() {
            playCards()
        }, 2000);
    } else {//change card and fade in
        document.getElementById('cards').innerHTML = ARRcards[CARD];
        document.getElementById('cards').style.opacity=0
        document.getElementById('cards').style.display='block'
        fade('cards', +0.02, 50)
        TIMEOUTcards = setTimeout(function() {
            playCards()
        },7000);
    }
}

function tuneSelectorMake(){
   var str='';
   for (n=0;n<ARRtunes.length;n++){
    str=str+"<option>"+ARRtunes[n].split('\n')[0]+"</option>\n"
   }
    TUNEselector=str
}




//^Gallery=============================================================
function loadGallery() {
    ARRgallery = "0,1,2,3,4,5,6,7,8".split(',')
    ARRgallery[0] = "<a onclick='changeGalleryMode()'><X10>Auto</X10></a> for the 60 second Fred and the Fossils Story<br>Or set your pace with the<a onclick='gallery(+1)'> <img src='Data/transRight.png'style='height:25%'> arrows.|sepia.png|947|897";;
    ARRgallery[1] = "<X5>1968</X5> My First Band,'JAM'; Twin Bridges Montana? Left to Right... Chuck, Bill, yours truly and Jay.|firstBand.jpg|1219|810";
    ARRgallery[2] = "<X5>1969</X5> Playing bass at a Montana State University Spring Event|bass.png|1316|1940";
    ARRgallery[3] = "<X5>1969 > 2010</X5> I occasionally played with friends and family.|backyard.png|465|661";
    ARRgallery[4] = "<X5>2010 > 2016</X5> Ron (on right) got me back into performing (After a 40 year hiatus)|ron.jpg|1051|788";
    ARRgallery[5] = "<X5>2016 > 2019</X5> Played with my buddy, Pat, until he passed away... (Here at a Newcomers Christmas Party)|pat.jpg|1051|855";
    ARRgallery[6] = "<X5>2019 > Now</X5> I play Solo at St Catherine's and Wesley Woods Senior Care facilities in Waco Texas|fred.jpg|1641|3919";
    ARRgallery[7] = "My 'virtual' BACKUP BAND consists of computer generated tracks and electronic harmony.|theFossils.png|1209|1007";
    ARRgallery[8] = "Additionally, I play with my friends, Stan, Bill, John, Sally for the fun of it...|barn.jpg|2754|1660";
    ARRgallery[9] = "RESET or Choose something from the Menu|thatsAllFolks.png|581|575";
    PICcount = ARRgallery.length
    PIC=0
}
 
function gallery(n) {
    dis('am','block')
    dis('rg','none')
    if (n == undefined) {n=0}
    PIC=PIC+n
    var path=undefined
    document.getElementById('galleryPic').style.display = 'block'
    PICpath = "Data/"
    document.getElementById('viewBox').style.display = 'block';
    if (PIC == 0) {
        document.getElementById('picLeft').style.display = 'none'
    } else {
        document.getElementById('picLeft').style.display = 'block'
    }
    if (PIC == ARRgallery.length - 1) {
        document.getElementById('picRight').style.display = 'none'
        changeGalleryMode('man')
        dis('am','none')
        dis('rg','block')
    } else {
        document.getElementById('picRight').style.display = 'block'
    }
    path=PICpath + ARRgallery[PIC].split('|')[1];
    document.getElementById('viewBox').style.display = 'block' //hide msg div
    PICaspect = ARRgallery[PIC].split('|')[2] / ARRgallery[PIC].split('|')[3] //=w/h
    document.getElementById('galleryTxt').innerHTML = ARRgallery[PIC].split('|')[0];
    picAlign();
    document.getElementById('galleryPic').src = path
    document.getElementById('picCount').innerHTML = (PIC+1)  + "/" + PICcount;
}

function picAlign(path) {
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
}

//^GALLERY" Functions
function rollPics(){
    clearTimeout(TIMEOUTgallery)
    TIMEOUTgallery = setTimeout(function() {
        gallery(1);
        if (PIC==PICcount-1){
            changeGalleryMode('man')
            return
        }
        rollPics()
    },6000);
}

function changeGalleryMode(x){ 
    if (PIC==PICcount-1) {
        x='man'
        }
    if (x==undefined) {
        if (GALLERYmode=='auto'){
            x='man'
        }else{x='auto'}
    }
    GALLERYmode=x
    if (GALLERYmode=='auto') {
        gallery(1)
        clearTimeout(TIMEOUTgallery)
        document.getElementById('amIcon').src='Data/resetSpinner.gif';
        rollPics();
    }else{
        clearTimeout(TIMEOUTgallery)
        GALLERYmode='man'
        document.getElementById('amIcon').src='Data/transparent.png';
    }
}

//^Audio=============================================================






function volSet(fact) {
    var v = document.getElementById('Audio1').volume
    
    
    v=v*fact
    if (v <= 0.00390625) {
        v = 0.0025;
        dial = 1;
    }else if (v >= 1){
        v=1;
        dial = 10
    }else{
        if (v >= .5) {
            dial = 9
        } else if (v >=0.25) {
            dial = 8
        } else if (v >=0.125) {
            dial = 7
        } else if (v >=0.0625) {
            dial = 6
        } else if (v >=0.03125) {
            dial = 5
        } else if (v >=0.015625) {
            dial = 4
        } else if (v >=0.0078125) {
            dial = 3
        } else if (v >=0.00390625) {
            dial = 2

        }
    }
    VOL=v
    document.getElementById('Audio1').volume = v
    document.getElementById('volNo').innerHTML=dial
    document.getElementById('volUpButton').style.opacity=dial/10
    document.getElementById('volDownButton').style.opacity=1-dial/11
}


function loadTrack(TUNE, info, idx) {
    var oldGreen=undefined
    if (TRACKindex!=undefined){
        oldGreen='s'+TRACKindex ;
    }
    var newGreen='s'+idx;
    //clear any green
    if (TUNE == undefined) {
        TUNE = TUNE
    } else {
        TUNE = TUNE
    }
    //set the selector...
    document.getElementById('tuneSelect').selectedValue = TUNE
    TRACKindex = document.getElementById('tuneSelect').selectedIndex
if (idx!=undefined)TRACKindex = idx
    if (info == true) {
        document.getElementById('msg').innerHTML = ARRtunes[TUNE]
        document.getElementById('msg').innerHTML = ARRtunes[TRACKindex]
    }
    document.getElementById('Audio1').src = 'Data/' + TUNE + '.mp3';
    document.getElementById("Audio1").onended = function() {
        trackReset();
    }
    if(oldGreen!=undefined){ document.getElementById(oldGreen).style.backgroundColor = 'lightgrey'}
    document.getElementById(newGreen).style.backgroundColor = 'green'
    dis('pauseButton','none')
    dis('pauseButtonA','none')
    dis('playing','none')
}  


function closePlayer() {
    document.getElementById('playerA').style.display = 'none'
}

function trackPause() {
    if (document.getElementById('Audio1').currentTime == document.getElementById('Audio1').duration) {
        trackReset()
    }
    document.getElementById('Audio1').pause()
    dis('pauseButton','none')
    dis('pauseButtonA','none')
    dis('playing','none')
}

function trackPlay() {
    dis('playing','block')
    //volSet(0)
    document.getElementById('Audio1').play()
    dis('pauseButton','block')
    dis('pauseButtonA','block')
    dis('playButton','block')
    document.getElementById("Audio1").onended = function() {
        trackEnd();
    }
}

function trackReset() {
    document.getElementById('Audio1').onended = null
    document.getElementById('Audio1').pause()
    document.getElementById('Audio1').currentTime = 0
    dis('pauseButton','none')
    dis('pauseButtonA','none')
    dis('playing','none')
}

function trackEnd() {
    incTrack(1)
    dis('playing','none')
    //trackPlay(); if you want to make it loop work here
}


function playTrack() {
    TRACK=document.getElementById('tuneSelect').selectedIndex
    TUNE=document.getElementById('tuneSelect').value
    pop(ARRtunes[TRACK])
    if (TRACK==0) {
    document.getElementById('Audio1').src = null;
    return
    }
    TUNE = document.getElementById('tuneSelect').value;
    document.getElementById("Audio1").onended = function() {
        trackReset();
    }
    document.getElementById('Audio1').src = 'Data/' + TUNE + '.mp3';
    trackPlay()
}

function incTrack(dir) {
    var newNo = parseInt(tuneSelect.selectedIndex + dir, 10)
    if (newNo == 7) {
        newNo = 0
    }
    if (newNo == -1) {
        newNo = 6
    }
    document.getElementById('tuneSelect').selectedIndex =TRACK= newNo
    TUNE=document.getElementById('tuneSelect').value
    playTrack()
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
        var f = prompt('The LISTEN function has been activated/n use your password for admin access... ADMINISTRATORS PASSWORD?');
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
       //document.getElementById(8).style.display='block'
       //alert(ADMINstring)
       config(8)
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
    clearTimeout(TIMEOUTcards);
}

function fade(id, dir, ms) {
    var crp = parseFloat(document.getElementById(id).style.opacity, 10)
    var cur = parseFloat(crp + dir, 10)
    //return
    //if (cur >= 1 | cur < 0) {
    if (cur == 1 ) {
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
 