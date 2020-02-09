//GLOBAL VARIABLES===============================================
    var PLAYERopened=false;
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
    var TIMEOUTpop;
//Gallery===========================================================
    var PRELOADED=false;
    var PICtime=5
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
    GALLERYstring=fileDownload('Data/galleryString.txt');
    ARRgallery=GALLERYstring.split('\n')
    PICcount = ARRgallery.length
    preLoadPics()
    PIC=0
    tuneSelectorMake();
    document.getElementById('tuneSelect').innerHTML = TUNEselector;
    document.getElementById('tuneSelect').selectedIndex = TRACK;
    document.getElementById("Audio1").volume = 0.033;
    VOL = 0.5;
    ARRcards=fileDownload('Data/cardsString.txt').split('\n');
    dis('hdr','block');
    dis('msg','block');
    dis('viewBox','none');
    dis('playerA','block');
    dis('menu','block');
    //fades('hdr', 0.01, 100, 'msg|menu')    
    config(0);
}
//^AUDIO====================================================================================================================================

function player() {//opens initially opens or closes the player
    if (PLAYERopened == false){
        PLAYERopened =true;
        var str="The player will open at the bottom of the screen...<br><br>"
        str=str+"<img src='Data/playerA.png'style='position;relative;border:groove;width:90%;left:10%;'>"
        str=str+"<br><br>YOUR FIRST SONG SHOULD PLAY WITHIN 5 SECONDS!"
        pop(str, '<X1>AUTOMATICALLY OPENING THE PLAYER...<X1>',5, "toggleListen(),playTrack()")
    } else {
        toggleListen()
    }
}

function toggleListen(){//turns listen box green and shows player A or yellow and Hides A
    if (PLAYERopened==false) {
        pop('darn','player not open',3)
    }else if(LISTEN==true){
        trackPause()
        LISTEN=false
        document.getElementById('listenA').style.backgroundColor='yellow';
        document.getElementById('listenA').style.color='red';
        trackPause()
    }else{
        LISTEN=true
        document.getElementById('listenA').style.backgroundColor='green';
        document.getElementById('listenA').style.color='white';
    }
     config(ID)
}

function listen(id,play){//play by selecting from the playlist etc===============
    document.getElementById('tuneSelect').selectedIndex=id;
    if (PLAYERopened==false) {
        player()
    }else if (LISTEN==false){
        toggleListen()
    }else{
        playTrack()
    }
}

function closePlayer() {
    document.getElementById('playerA').style.display = 'none'
}

function trackPause() {
    document.getElementById('Audio1').pause()
    dis('pauseButton','none')
    dis('playing','none')
}

function trackPlay() {
    document.getElementById('Audio1').play()
    dis('playing','block')
    dis('pauseButton','block')
    document.getElementById("Audio1").onended = function() {
        trackEnd();
    }
}

function trackReset() {
    document.getElementById('Audio1').currentTime = 0
    playTrack()
}

function trackEnd() {
    incTrack(1)
}


function playTrack() {
    if (LISTEN==false) {
        return
    }
    TRACK=document.getElementById('tuneSelect').selectedIndex
    TUNE=document.getElementById('tuneSelect').value
    pop(ARRtunes[TRACK].split('\n').slice(1).join(''),'<X2>'+TUNE.toUpperCase()+'</X2>',15)
    TUNE = document.getElementById('tuneSelect').value;
    document.getElementById("Audio1").onended = function() {
        trackReset();
    }
    document.getElementById('Audio1').src = 'Data/' + TUNE + '.mp3';
    trackPlay()
}

function incTrack(dir) {
    var newNo = parseInt(tuneSelect.selectedIndex + dir, 10)
    if (newNo == ARRtunes.length) {
        newNo = 0
    }
    if (newNo == -1) {
        newNo = ARRtunes.length-1
    }
    document.getElementById('tuneSelect').selectedIndex =TRACK= newNo
    TUNE=document.getElementById('tuneSelect').value
    playTrack()
}


function pop(txt,title,seconds,evil){
    clearTimeout(TIMEOUTpop);
    dis('popper','block')
    if (seconds==undefined) {seconds=10}
    if (title==undefined) {title='POP UP NOTE!'}
    document.getElementById('popText').innerHTML=txt
    document.getElementById('popClose').style.display='block'
    if (evil==undefined) {evil="dis('popper','none')"
    document.getElementById('popText').style.backgroundColor='lightgrey'
    }else{
    document.getElementById('popClose').style.display='none'
    document.getElementById('popText').style.backgroundColor='pink'
    }
    document.getElementById('popTitle').innerHTML=title
    TIMEOUTpop = setTimeout(function() {
    eval(evil)//dis('popper','none');
    },seconds*1000);
}

//^Configure Views=============================================================
function config(id){
    var i;
    cto()
    dis('popper','none')
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
        playCards(0,1);
    } else if (MODE == 'GALLERY') {
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
    //Determine formFactor and font-size
    var aspect = window.innerHeight / window.innerWidth
    var formFactor = 'none'
    var black = 0
    if (aspect > 1.7) {
        black = 100 - 100 * (1.7 / aspect)
        shapeShift('background', '0%', '0%', '0%', black + '%', '-', '-', '-')
        formFactor = 'tall'
    }
    if (aspect > 1&aspect<=1.7) {
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
            shapeShift('menu', '0%', '0%', '78%', '0%', '-', '-', '4vw');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '0%', '7%', '22%', '-', '-', '3.5vw')
            }
        } else if (LISTEN == true) {
            shapeShift('msg', '1%', '1%', '7%', '32%', '-', '-', '4vw');
            shapeShift('menu', '0%', '0%', '68%', '10%', '-', '-', '3vw');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '0%', '7%', '32%', '-', '-', '3.5vw')
            }
        }
        shapeShift('popper', '15%', '15%', '20%', '35%', '-', '-', '3vw')
shapeShift('playerA', '1%', '0%', '90%', '0%', '-', '-', '6vw')
        shapeShift('tuneSelect','0%', '0%', '0%', '0%', '-', '-', '4vw')        
         document.getElementById('tuneSelect').style.maxWidth="50%"
        shapeShift('hdr', '0%', '0%', '0%', '93%', '-', '-', '3.5vw');
        shapeShift(0, '34%', '34%', '0%', '77%', '-', '-', '4vw');
        shapeShift(1, '1%', '67%', '25%', '52%', '_', '_', '4vw');
        shapeShift(2, '1%', '67%', '50%', '27%', '_', '_', '4vw');
        shapeShift(3, '1%', '67%', '75%', '1%', '_', '_', '4vw');
        shapeShift(4, '34%', '34%', '25%', '52%', '-', '_', '4vw');
        shapeShift(5, '34%', '34%', '50%', '27%', '', '_', '4vw');
        shapeShift(6, '34%', '34%', '75%', '1%', '', '_', '4vw');
        shapeShift(7, '67%', '2%', '25%', '52%', '-', '_', '4vw');
        shapeShift('listenA', '67%', '2%', '50%', '27%', '_', '-', '4vw');
        shapeShift('sizeScreen', '-', '2%', '-', '1%', '22%', '-', '2.5vw');
    } else { //WIDE ASPECT
        if (MODE == 'WELCOME') {
            shapeShift('iconA', '1%', '-', '1%', '-', '75%', '-', '-')
            shapeShift('welText', '-', '1%', '1%', '-', '90%', '60%', '4vh')
            shapeShift('cards', '1%', '1%', '90%', '0%', '-', '-', '3vh')
        }
        if (LISTEN == false) {
            shapeShift('msg', '1%', '20%', '7%', '1%', '-', '-', '4.5vh')
            shapeShift('menu', '80%', '0%', '7%', '0%', '-', '-', '3vh');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '20%', '7%', '0%', '-', '-', '3.5vh')
            }
        } else if (LISTEN == true) {
            shapeShift('msg', '1%', '20%', '7%', '10%', '-', '-', '4.5vh')
            
            shapeShift('menu', '80%', '0%', '7%', '0%', '-', '-', '3vh');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '20%', '7%', '10%', '-', '-', '3.5vh')
            }
        }
        shapeShift('popper', '10%', '30%', '25%', '25%', '-', '-', '3vh')
        shapeShift('hdr', '0%', '-', '0%', '-', '7%', '100%', '1vw');
        document.getElementById('tuneSelect').style.maxWidth="50%"
        shapeShift('playerA', '10%', '30%', '90%', '0%', '-', '-', '5vh')
        shapeShift('tuneSelect','0%', '0%', '0%', '0%', '-', '-', '4vh') 
        shapeShift(0, '2%', '2%', '0%', '91%', '-', '-', '3.5vh');
        shapeShift(1, '2%', '2%', '10%', '81%', '-', '-', '3.5vh');
        shapeShift(2, '2%', '2%', '20%', '71%', '-', '-', '3.5vh');
        shapeShift(3, '2%', '2%', '30%', '61%', '-', '-', '3.5vh');
        shapeShift(4, '2%', '2%', '40%', '51%', '-', '-', '3.5vh');
        shapeShift(5, '2%', '2%', '50%', '41%', '-', '-', '3.5vh');
        shapeShift(6, '2%', '2%', '60%', '31%', '-', '-', '3.5vh');
        shapeShift(7, '2%', '2%', '70%', '21%', '-', '-', '3.5vh');
        shapeShift('listenA', '2%', '2%', '80%', '11%', '-', '-', '3.5vh');
        shapeShift('sizeScreen', '-', '2%', '-', '1%', '9%', '-', '2.5vh');
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
}

//^Welcome Functions============================================================
function playCards(id,step) {
    clearTimeout(TIMEOUTcards)
    if (step==1) {//it should be 0 opacity and old Card
        document.getElementById('cards').innerHTML = ARRcards[id];
        fade('cards', 0.02, 50)
        TIMEOUTcards = setTimeout(function() {
            playCards (id,2)
        },7000);
    }
    if (step==2) {
        id = id + 1
        if (id >= ARRcards.length) {
            id = 0;
        }
        fade('cards', -0.02, 50)
        TIMEOUTcards = setTimeout(function() {
            playCards (id,1)
        },3000);
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
function preLoadPics(){
    document.getElementById('picPreload').src='Data/'+ARRgallery[0].split('|')[1]
}

function gallery(n) {
    var path
    document.getElementById('galleryPic').style.display = 'none'//to prevent flicker on change
    if (n == undefined) {n=0}
    if (PIC==ARRgallery.length-2) {
        changeGalleryMode('auto')
        dis('amIcon','none')
    }else{
        dis('amIcon','block')
    }
    if (PIC>=ARRgallery.length-1) {//EOArr
        PIC=-1
    }
    PIC=PIC+n
    path=undefined
    PICpath = "Data/"
    document.getElementById('viewBox').style.display = 'block';
    if (PIC == 0) {
        document.getElementById('picLeft').style.display = 'none'
    } else {
        document.getElementById('picLeft').style.display = 'block'
    }
    if (PIC == ARRgallery.length - 1) {
        document.getElementById('picRight').style.display = 'none'
    } else {
        document.getElementById('picRight').style.display = 'block'
    }
    if (ARRgallery[PIC]==undefined) {
        alert('ERROR in PICTURE COUNT')
    }
    path=PICpath + ARRgallery[PIC].split('|')[1];//get phot info
    document.getElementById('viewBox').style.display = 'block' //hide msg div
    PICaspect = ARRgallery[PIC].split('|')[2] / ARRgallery[PIC].split('|')[3] //=w/h
    PICtime=ARRgallery[PIC].split('|')[4]
    document.getElementById('galleryTxt').innerHTML = ARRgallery[PIC].split('|')[0];
    picAlign();
    document.getElementById('galleryPic').src = path
    document.getElementById('picCount').innerHTML = (PIC+1)  + "/" + PICcount;
    document.getElementById('galleryPic').style.display = 'block'
    if (PRELOADED==false) {//forcing a one time preload of pictures
        if(PIC<ARRgallery.length-1){
        path=PICpath + ARRgallery[PIC+1].split('|')[1];
        document.getElementById('picPreload').src=path
        }else{
            PRELOADED=true
        }
    }
}

function rollPics(){//automatic picture sequence and time
    clearTimeout(TIMEOUTgallery)
    TIMEOUTgallery = setTimeout(function() {
        gallery(1);
        if (PIC==0) {
            changeGalleryMode('man')
            return;
        }
        if (PIC>=PICcount-1){
            PIC=-1
        }
        rollPics()
    },PICtime*1000);
}

function changeGalleryMode(mode){
    if (mode==undefined) {
        if (GALLERYmode=='auto'){
            mode='man'
        }else{mode='auto'}
    }
    GALLERYmode=mode
    if (GALLERYmode=='auto') {
        clearTimeout(TIMEOUTgallery)
        document.getElementById('amIcon').src='Data/resetSpinner.gif';
        rollPics();
    }else{
        clearTimeout(TIMEOUTgallery)
        GALLERYmode='man'
        document.getElementById('amIcon').src='Data/transparent.png';
    }
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

//^Audio=============================================================
function volSet(fact) {
    var v = document.getElementById('Audio1').volume
    v=v*fact
    if (v <= 0.00390625) {
        v = 0.0025;
        dial = 'L';
    }else if (v >= 1){
        v=1;
        dial = 'H'
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


function XXloadTrack(TUNE, info, idx) {
    alert('LOAD TRACK');
    var oldGreen=undefined
    if (TRACKindex!=undefined){
        oldGreen='s'+TRACKindex ;
    }
    var newGreen='s'+idx;
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
    dis('playing','none')
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
    var opac = parseFloat(document.getElementById(id).style.opacity, 10)
    var cur = parseFloat(opac + dir, 10)
    if (cur >= 1 ) {
        clearTimeout(TIMEOUTfade)
        document.getElementById(id).style.opacity = 1
    } else if (cur <= 0) {
        clearTimeout(TIMEOUTfade)
        document.getElementById(id).style.opacity = 0
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
 