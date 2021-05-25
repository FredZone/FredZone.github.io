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
    var SETTINGSstring='Settings'
    var MSGspecial=""
    var ICONspecial=undefined
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
    var ID=0;//MODE Index
    var PLAYER=false;
//WELC0ME MODE==========================================================================
    var CARD=0;
    //var STATE=1
//ARRAYS===============================================================================
    var ARRmode='WELCOME,CONTACT,ABOUT,PLAYLIST,SCHEDULE,WHY,BAND,GALLERY,SETTINGS,ADMIN'.split(',')
    var ARRcards;
    var ARRgallery = "0,1,2,3,4,5".split(',');
    var ARRtunes;
//Tune Variables=====================================================
    var PLAYERopened=false;
    var PLAYERtype='A'  
    var LISTEN=false;
    var TUNE=undefined
    var TUNEselector;//A string to paste into the tuneSelect
    var TRACK=0;//from ARRtunes
    var TUNE;
    //var TRACKindex=undefined;//index of the tuneSelector
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
    SETTINGSstring=fileDownload('Data/settingsString.txt');
    PICcount = ARRgallery.length
    preLoadPics()
    PIC=0
    tuneSelectorMake();
    document.getElementById('tuneSelect').innerHTML = TUNEselector;
    //document.getElementById('tuneSelect').selectedIndex = TRACK;
    trackLoad(0,false)
    TUNE=document.getElementById('tuneSelect').value;
    document.getElementById("Audio1").volume = 0.033;
    VOL = 0.5;
    ARRcards=fileDownload('Data/cardsString.txt').split('\n');
    dis('msg','block');
    dis('hdr','block');
    dis('viewBox','none');
    dis('menu','block');
    dis('playerA','block');
    //fades('hdr', 0.08, 100, 'msg|menu')    
    config(0);

    ICONspecial='coronavirus.png'
    MSGspecial="<div style='line-height:180%;'>THE VIRUS HAS FORCED ME TO CANCEL A YEARS WORTH OF SHOWS"    
    MSGspecial=MSGspecial +'<br>WILL HAVE MY FIRST SHOW AT ST CATHERINES ON MAY 25.'  
    MSGspecial=MSGspecial +'<br>HOPEFULLY THIS IS THE START OF SOMETHING MORE NORMAL.'  
    MSGspecial=MSGspecial +'<br>TAKE CARE OF EACH OTHER!'
    MSGspecial=MSGspecial +'<br>Fred Kaparich</div>'
    pop(MSGspecial,'A NOTE ABOUT COVID 19...',15,undefined,'red')
}

//^Configure Views=============================================================


function config(id) {
    var i;
    cto()
    dis('popper', 'none')
    var msg = "NO MESSAGE"
//change buttons and controls    
    if (id == 8) {
        document.getElementById('8').src = 'Data/greenGear.png'
    }
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
    msg = MODE.toUpperCase() + 'string'
    msg = eval(msg)
    document.getElementById('msg').innerHTML = msg;
    if (MODE == 'WELCOME') {
        document.getElementById('cards').innerHTML = ARRcards[CARD]
        playCards();
    }else if (MODE == 'GALLERY') {
        PIC=0;
        changeGalleryMode('man');
        gallery();
        dis('viewBox', 'block');
    }else if (MODE == 'SETTINGS') {
        dis('viewBox', 'none');
        document.getElementById('msg').innerHTML = SETTINGSstring
    }
    if (LISTEN == true) {
        if (PLAYERtype == 'A') {
            dis('playerA', 'block');
            dis('playerB', 'none');
        } else {
            dis('playerA', 'none');
            dis('playerB', 'block');
        }
    } else {
        dis('playerA', 'none');
        dis('playerB', 'none');
    }
    if (MODE != 'GALLERY') {
        dis('viewBox', 'none');
    }
    if (MODE != 'SETTINGS') {
        document.getElementById('8').src = 'Data/yellowGear.png'
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
//TALL==================================
    if (formFactor == 'tall') {
        //l,r,t,b,h,w,f
        if (MODE == 'WELCOME') {
            shapeShift('iconA', '1%', '-', '1%', '-', '-', '24%', '-')
            shapeShift('welText', '20%', '0%', '0%', '15%', '-', '-', '4vw')
            shapeShift('cards', '0%', '0%', '86%', '0%', '-', '-%', '3vw')
        }
        if (LISTEN == false) {
            shapeShift('msg', '1%', '1%', '7%', '22%', '-', '-', '4vw')
            shapeShift('menu', '0%', '0%', '78%', '0%', '-', '-', '4vw');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '0%', '7%', '22%', '-', '-', '3.5vw')
            }
        } else if (LISTEN == true) {
            shapeShift('msg', '1%', '1%', '7%', '32%', '-', '-', '4vw');
            shapeShift('menu', '0%', '0%', '68%', '10%', '-', '-', '2.7vw');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '0%', '7%', '32%', '-', '-', '3.5vw')
            }
        }
        shapeShift('popper', '15%', '15%', '20%', '35%', '-', '-', '3vw')
        shapeShift('playerA', '1%', '0%', '90%', '0%', '-', '-', '6vw')
        shapeShift('playerB', '1%', '0%', '90%', '0%', '-', '-', '6vw')
        
        document.getElementById('tuneSelect').style.fontSize="4vw"
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
        shapeShift('volNo', '0%', '0%', '1%', '1%', '_', '-', '4vw');
        shapeShift('sizeScreen', '-', '2%', '-', '1%', '22%', '-', '2.5vw');
        shapeShift('8', '67%', '-', '-', '1%', '22%', '-', '2.5vw');
//WIDE ASPECT================================================================
    } else { 
        if (MODE == 'WELCOME') {
            shapeShift('iconA', '1%', '-', '1%', '-', '75%', '-', '-')
            shapeShift('welText', '30%', '0%', '0%', '15%', '-', '-', '3vh')
            shapeShift('cards', '0%', '0%', '86%', '0%', '-', '-%', '3vh')
        }
        if (LISTEN == false) {
            shapeShift('msg', '1%', '20%', '7%', '1%', '-', '-', '4.5vh')
            shapeShift('menu', '80%', '0%', '7%', '0%', '-', '-', '3vh');
            if (MODE == 'GALLERY') {
                shapeShift('viewBox', '0%', '20%', '7%', '0%', '-', '-', '3.0vh')
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
        shapeShift('playerA', '10%', '30%', '90%', '0%', '-', '-', '5vh')
        shapeShift('playerB', '10%', '30%', '90%', '0%', '-', '-', '6vw')
        document.getElementById('tuneSelect').style.fontSize="4vh"
        shapeShift(0, '2%', '2%', '0%', '91%', '-', '-', '3.5vh');
        shapeShift(1, '2%', '2%', '10%', '81%', '-', '-', '3.5vh');
        shapeShift(2, '2%', '2%', '20%', '71%', '-', '-', '3.5vh');
        shapeShift(3, '2%', '2%', '30%', '61%', '-', '-', '3.5vh');
        shapeShift(4, '2%', '2%', '40%', '51%', '-', '-', '3.3vh');
        shapeShift(5, '2%', '2%', '50%', '41%', '-', '-', '3.5vh');
        shapeShift(6, '2%', '2%', '60%', '31%', '-', '-', '3.5vh');
        shapeShift(7, '2%', '2%', '70%', '21%', '-', '-', '3.5vh');
        shapeShift('listenA', '2%', '2%', '80%', '11%', '-', '-', '3.5vh');
        shapeShift('volNo', '0%', '0%', '1%', '1%', '_', '-', '4vh');
        shapeShift('sizeScreen', '-', '2%', '-', '1%', '9%', '-', '2.5vh');
        shapeShift('8', '2%', '-', '-', '1%', '9%', '-', '2.5vh');
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

//^AUDIO====================================================================================================================================

function changePlayer(){
    if (PLAYERtype=='A'){
        PLAYERtype='B'
        document.getElementById('playerB').style.display='block'
        document.getElementById('playerA').style.display='none' 
    }else{
        PLAYERtype='A'
        document.getElementById('playerB').style.display='none'
        document.getElementById('playerA').style.display='block'     
    }
}

function togglePlayer(){//turns listen box green and shows player A or yellow and Hides A
    if(LISTEN==true){
        trackPause()
        LISTEN=false
        document.getElementById('listenA').style.backgroundColor='yellow';
        document.getElementById('listenA').style.color='red';
        trackPause()
        config(ID)
    }else{
        LISTEN=true
        document.getElementById('listenA').style.backgroundColor='green';
        document.getElementById('listenA').style.color='white';
        
        config(ID)
        trackLoad(TRACK,true)
        
    }
    


}


function closePlayer() {
    document.getElementById('playerA').style.display = 'none'
    document.getElementById('playerB').style.display = 'none'
}

function trackLoad(track,play) {//LOAD A TRACK
    trackPause()//close any playing track
    if (track==undefined) {
        TRACK=document.getElementById('tuneSelect').selectedIndex
    }else{
        TRACK=track
        document.getElementById('tuneSelect').selectedIndex=TRACK
        }
    TUNE=document.getElementById('tuneSelect').value
    document.getElementById('Audio1').src = 'Data/' + TUNE + '.mp3';
    if (play==true) {
        if (LISTEN==false) {
            togglePlayer()
        }
    trackPlay()
    }
}

function trackPlay() {
    dis('playing','block')
    dis('pauseButton','block')
    if (document.getElementById('Audio1').currentTime<3) {
        pop(ARRtunes[TRACK].split('\n').slice(1).join(''),'<X2>'+TUNE.toUpperCase()+'</X2>',15)
    }
    document.getElementById('Audio1').play()
    document.getElementById("Audio1").onended = function() {
        trackEnd();
    }
}


function trackPause() {
    document.getElementById('Audio1').pause()
    dis('pauseButton','none')
    dis('playing','none')
}

function trackReset() {
    document.getElementById('Audio1').currentTime = 0
    trackLoad(undefined,true)
}

function trackEnd() {
    incTrack(1)
}

function helpPlayer(){
    pop("<img src='Data/playerAhelp.png' style='position:absolute;top:0%;left:0%;width:100%;'>","PLAYER HELP",25,undefined,'black')    
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
    trackLoad(undefined,true)
}


function pop(txt,title,seconds,evil,color){
    clearTimeout(TIMEOUTpop);
    dis('popper','block')
    if (seconds==undefined) {seconds=10}
    if (title==undefined) {title='POP UP NOTE!'}
    document.getElementById('popText').innerHTML=txt
    document.getElementById('popClose').style.display='block'
    if (evil==undefined) {evil="dis('popper','none')"}
    if (color==undefined){color='lightgrey'}
    document.getElementById('popText').style.backgroundColor=color;
    document.getElementById('popTitle').innerHTML=title
    TIMEOUTpop = setTimeout(function() {
    eval(evil)//dis('popper','none');
    },seconds*1000);
}

//^Welcome Functions============================================================
function playCards() {
    clearTimeout(TIMEOUTcards)
    if (MODE!='WELCOME') {
        return
    }
    if (document.getElementById('cards').style.opacity <0.5) {
        document.getElementById('cards').innerHTML = '<X5>'+ARRcards[CARD]+'</X5>';
        fade('cards', 0.16, 50)
        TIMEOUTcards = setTimeout(function() {
            playCards ()
        },7000);
    }else{
        CARD = CARD + 1
        if (CARD >= ARRcards.length) {
            CARD = 0;
        }
        fade('cards', -0.16, 50)
        TIMEOUTcards = setTimeout(function() {
            playCards ()
        },500);
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


function galleryReset(){
GALLERYmode='man';
PIC=0
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
        document.getElementById('picRight').style.display = 'block'
    }else if (PIC == ARRgallery.length - 1) {
        PICtime=2
        document.getElementById('picRight').style.display = 'none'
        document.getElementById('picLeft').style.display = 'none'
        changeGalleryMode('auto')
    }else{
        document.getElementById('picRight').style.display = 'block'
        document.getElementById('picLeft').style.display = 'block'
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
            PICtime=4;
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
            pop("Sorry...<br> Wrong password...","OOPS!",2,undefined,'pink')
        } else {
            LOCKED = false
            document.getElementById('admin').src = 'Data/underConstruction.png'
            document.getElementById('8').style.display='block'
        }
    } else {
       config(9)
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
    //clearTimeout(TIMEOUTcards);
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
 