    var REV ="Beta"//this revision
    var JSname="NextPlayer.js"//java script file
//TO RELEASE Javascript file(ex as rev 7.4)
//  Save this file as this file as "Player7-4.js" and Change first two lines of file as shown below
//  var REV ="7.4"
//  var JSname="Player7-4.js"
    var JSdate;
//areas for work tqagged with ???
//* FLAGS  ======================================================================================
    var ALT=false;//^ does alternate song exist
    var AUDfail=false;
    var AUDend=false;
    var BOOT=true;//^ designates first boot
    var NASH= false;//Nashville notation
    var NOTESpresent= false;//^ indicates that notes will be available on another page
    var SCROLLend=false;//^ indicates end of scroll
    var SETnoteViewed=false;//used to keep not from poping up AWK
    //var Yend=false;//^end of scroll
//*PROGRAM and SONG VARS//===========================================================================
    var ARRtitle;//XXXXXXX
    var ARRsoundModes=("SILENT/nBACK TRACK/nCLICK TRACK/nVOCAL/nDRUM ROCK/nDRUM COUNTRY/nDRUM COUNT").split("/n");
    var DUR=120;//^ Duration for scrolling and calculating
    var DURsource='Default';//^ string where the program got the duration
    var DURcalc=0;//^ Calculated duration based on Bars/Beats/time signature
    var DURmp3=0;//^ used on scroll(default=  DURfile, DURcalc, DURmp3, User Input)
    var KEYlast='C';
    var KEYbase="X";//^ anchor for changeing keys on the fly
    var PREVtitle;//previous Title
    var LINElimit=90
    var LONGLINE=40;
    var MIRROR=0;
    var TRANSPOSE=0;//^ how many 1/2 steps to tranpose
    var SOUNDmodeDefault="SILENT";
    var SOUNDmode="SILENT";
    var SOUNDicon="transSilent.png";
    var TUNEnum=0;//^ Tune Number in setlist
    var VOL=(0.50);//^ absolute volume (0>1)
    var VOLexp=2;//^ exponant applied to VOL
    //var SONGlastCustom=0;//0=Key,1=Tempo,2=Sound used for one time customizing song Key, Tempo, Track
    var WARNING= "No Warnings!"
//* SONG DATA AND PROPERTIES (passed)==================================================
    var RAWtune;//tune as read from file
    var ARTIST="Unknown";
    var ARRlines="";//^ Array of lines from text file
    var BARS=0;
    var BARSperLine;
    var BEATS=4;//^ Beats/bar
    var BPM=100;//Default
    var DURtext=0;//^ duration from the text file
    var GENRE="Unknown";
    var HITyear= "Unknown";
    var IRB;//^ the IRB line set during format of the page
    var KEY="C";//Default
    var MEASURES=0//BEATS*FULL BARS + BEATS/2* HALF BARS
    var QUAL='Raw';//^ song quality
    var STARS=1;
    var STYLE="Unknown";
    var TITLE="Unknown";//^ song title being played
    var TITLEplus="unknown";//^ used to pass info from a playlist i.e @Hallelluia/C#/70/BACK TRACK/starts
    var NOTEset;
    var NOTEtrivia;
    var NOTEtech;
    var NOTElinks;
    var SONGicon="transSilent.png"
//* SCROLLdata CONSTANTS   ==============================================================
    var TOPlast;
    var SS=0;//Scroll Stopper...counts cylces of non scroll indicating end of tune
    var AS=0//audio stopper
    var FONTSIZE= 2.5;//calculated size for the display 
    var CHORDlines=0;//^ how many lines are chord lines
    var PRESONGlines=0;//^ how many lines of text exist before first chord line
    var SCROLLbase;//^ Original SCROLLkon used to change scroll speed on the fly
    var SCROLLkon=0.01;// microseconds per pixel
    var SCROLLpix;//^ ScrollPixels from height of document;
    var SCROLLstartTime=0;//^ when scroll started, used to regulate scroll
    var Ypos=0;//^ Yposition of the scroll 0 being the top
    var Ystart=0;//^ where Y is when you start the scroll
//* TIMEOUT CONSTANTS=========================================================
    var TIMEOUTblink;//^time for blinking display
    var TIMEOUTcrap;//^ do not clear this one
    var TIMEOUTdelay;//^ trackDelay delay the start of???
    var TIMEOUTfade;//^fade the sound
    var TIMEOUTintro=100;
    var TIMEOUTnext; //^ for next tune
    var TIMEOUTscroll;//^ timeout function for scrolling
    var TIMEOUTmirror;
    var TIMEOUTwait; //Wait after scroll end before showing top Icons title etc
//* CONFIGURATION===================================================
    //               0        1          2        3     4    5     6     7         8        9        10        11       12       13      14       15      16    
    var ARRpresets="CAPS,FULLscreen,LEFTborder,CLOCK,TEXT,SHADE,NOTES,SETnotes,POPnotes,TECHnotes,AUTOnext,COUNTin,CLICKER,BREAKlines,BIGchords,LOOPER,BARsync".split(',');
    //var ARRpresets="CAPS,FULLscreen,LEFTborder".split(',');
    var AUTOnext= false;
    var BACKdrop=false;
    var BARsync=false
    var BIGchords=false;
    var BIGchordSize=1.00;
    var BREAKlines=false;
    var CAPS=true;//
    var CLOCK=false;
    var CLOCKstart=0;
    var CLOCKstop=0;
    var CLICKER=false;//clicks during startup
    var COUNTin=false;//visible countdown during startup    
    var COUNTloops=0;
    var COUNTlimit=1
    var FULLscreen=false;
    var LEFTborder=false;
    var LINEnum=false;//^ show line numbers
    var LINEtime=false;//^ show min sec instead of line num
    var LINKnotes=false;
    var NOTES=false;
    var POPnotes=false;
    var SHADE=false;//shade the screen
    var SOUND=true;
    var SETnotes=false;
    var TEXT=false;//reduce text size
    var TRIVIAnotes=false;
    var TECHnotes=false;
//* MISC CONSTANTS==========================================
    var ARRscale="A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab".split(",");
    var ARRsongSettings;
    var MSGlast="NO MESSAGE!";
    var RAT=0.7; //^ Ratio WINDht/WINDwt
    var SETlist="X";//^ Array of songs in setlist
    var SETname="Single Tune";//^ default in case a list cannot be loaded
    var WINDht;//px window height
    var WINDwt;//px window width
//*INWORK LOOP VARIABLES===========================================================
    //var PAUSEpoint=0;//scrollTop of Tune when the tune stops scrolling
    var LOOPER=false;
    var LOOPon=false;
    var LOOPtop=0;
    var LOOPend=100000;
    var LOOPmode='played once';
    var ENDscroll=false;
    var ENDaudio=false
//PRESETS
    var ARRtf="true,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false".split(',');
    var PRESETno=-1;
    var PRESET="Default Mode";
    var BAR=0
    var BARShalf;
    var BARalign=0
    var BARSTOP=0
    var ARRbars =''.split(',');
    var ARRpx=''.split(','); 
//*DEVELOPER CONSTANTS (REQUIRED TO LOG Status Mssages,See Developer functions)
    var LOG=640;//length of Log
    var ARRstatusLog="<pre><X2>=================DEBUG LOG=================</x2></pre>".split('@');
    var MSGcount=0;//check against LOG
    var STATUSmon=1;//sets the Debug mode, 0=off/1=log while hidden/2=log Real time
   
//*BOOT ROUTINE and BOOT ROUTINE ENTRY ROUTINES=================== All in functions sequence with breaks between sub routines
window.onload = function() {
    document.getElementById('statusWindow').style.display = 'none';
    ARRstatusLog = "<pre>========================BROWSER LOADING THIS PAGE=================</pre>".split('-');
    STATUSmon = 1;
    statusMsg("PRESS ANY KEY or CLICK THE 'BUG' to monitor the boot...")
    BOOT = true;
    document.getElementById("debugTrigger").focus();
    TIMEOUTcrap = setTimeout(function() {
        start();
    }, 1500);
}

function monitorBoot() { //initiated by the user at boot
    clearTimeout(TIMEOUTcrap);
    statusMonitor(2);
    statusMsg('User intiated boot monitor...');
    start();
}

function start() {
    var arr;
    j = 0;
    clearTimeout(TIMEOUTcrap);
    document.getElementById('dubugSafety').focus();
    statusMsg("Loading Javascript...");
    revDates();
    MSGlast = "MSG ERROR";
    document.getElementById('revStatus').innerHTML = "REV: " + REV;
    NONE = document.getElementById('none').style.display; //^  create object check if its necessary
    var lst = "<a style='text-align:center; width:100%'><a style='color:white;'>SOUND MODE</a><br><select id='soundSelector' style='background-color:white;color:black;font-size:2vw; width:100%' onchange='setSoundModeDefault(this.value)'><optgroup>";
    while (j < ARRsoundModes.length) {
        lst = lst + "\n<option>" + ARRsoundModes[j] + "</option>";
        j++;
    }
    lst = lst + "\n</optgroup></Select>";
    document.getElementById("soundBox").innerHTML = lst;
    arr = receiveARR(); //get an array if one is sent...*possible global
    if (arr === undefined | arr === null | arr === '') { //^ normal first time boot, no query string
        BOOT = true;
        createSetSelector();
    } //^ boot to the default list
    else {
        BOOT = 'edit';
        ARRtitle = ("INWORK,C,125,SILENT,No Note").split(','); //Bogus title array
        createARRlines(arr);
    }
}

function createSetSelector() { //alert('SetSelector');  //^creates an option box from the file SetList.txt in the top directory
    statusMsg("Creating Set Selector...");
    var request = new XMLHttpRequest();
    request.open("GET", "SetList.txt", false);
    request.send(null);
    var content = request.responseText;
    var SETS = content.split("\n");
    var ihtml = "<a style='text-align:center; width:45vw;color:white'>PLAYLIST:</a><br><select id='Set' style='font-size:2vw' onchange='SETname=(this.value);selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
    j = 0;
    while (j < SETS.length) {
        if (SETS[j] !== "ALL TUNES") {
            ihtml = ihtml + "\n<option>" + SETS[j] + "</option>";
        }
        j = j + 1;
    }
    ihtml = ihtml + "\n</optgroup></Select>";
    document.getElementById("setSelectA").innerHTML = ihtml;
    selectSet("ALL TUNES");
} //^ default is ALL TUNES

function selectSet(set) { //alert('selectSet('+set+')');  //^ Selects your set by its name
    var request = new XMLHttpRequest();
    var path = "../Sets/" + set + ".txt";
    statusMsg("Selected Playlist: " + set, "yellow");
    SETname = set;
    SETlist = "";
    request.open("GET", path, false);
    request.send(null);
    SETlist = request.responseText.split("\n");
    if (set == "ALL TUNES") {
        dis('abet', 'block');
    } else {
        dis('abet', 'none');
    }
    createSetList();
}

function createSetList() { //alert('createSetList()');//^ creates the setlist option box and selects tune 0
    var a;
    var lst = "<X2><optgroup>";
    statusMsg("Formating Playlist and Selecting Default Song...", "yellow");
    j = 0;
    while (j < SETlist.length) {
        a = (SETlist[j].split("|")[0]);
        if (a.substring(0, 1) == '@') {
            a = a.substring(1, a.length);
        }
        lst = lst + "\n<option value= '" + SETlist[j] + "'>" + a + "</option>";
        j++;
    }
    lst = lst + "\n</optgroup></X2>";
    document.getElementById("mySet").innerHTML = lst;
    TUNEnum = 0; //^ nominal tune is 0
    TITLEplus = SETlist[TUNEnum];
    TITLE = TITLEplus;
    PREVtitle = TITLE;
    selectTune(TITLEplus);
}

function nextTune(newDir) { //alert("nextTune("+newDir+")");//^ Entry point if you have selected the next tune in the list by direction 1,0,-1
    statusMsg("Incrementing tune list " & newDir & " steps..", "yellow");
    screenFormat("Think", "transSubtract.png");
    barSelect('none');
    if (SETlist[TUNEnum + newDir]) { //^ if next tune exists go to it
        TUNEnum = (TUNEnum + newDir);
        TITLEplus = SETlist[TUNEnum];
        document.getElementById("mySet").selectedIndex = TUNEnum;
    }
    selectTune(TITLEplus);
}

function openSong() { //alert('openSong()');//opens a song with title, if its on server, not on list============EEE
    var tune = prompt("Please type the exact tune name", TITLE);
    statusMsg("User requested: " + tune + " by exact title... ", 0);
    if (tune !== null) {
        selectTune(tune);
    }
}

function selectTune(titl) { //alert('selectTune('+titl+')');//^ Entry Point using the TITLE (or extended title) to download tune
    //statusMsg("<X2>########################################################################<X2>",0)//
    statusMsg(titl + ": selected ...", 'lightgrey');
    barSelect('none')
    TITLEplus = titl; //TITLEplus is formated play info=@TITLE/KEY/BPM/SOUNDmode/NOTEset (@ indicates alternate if its present)
    ARRtitle = TITLEplus.split("|");
    TITLE = ARRtitle[0];
    if (ARRtitle[0].substr(0, 1) == "@") {
        ALT = true;
        TITLE = ARRtitle[0].substr(1);
        ALT = true;
    } else {
        TITLE = ARRtitle[0];
        ALT = false;
    }
    document.getElementById('myTune').innerHTML = TITLE; //?what is my tune??
    CTO();
    document.getElementById("content").innerHTML = "";
    if (ARRtitle[3] !== undefined & ARRtitle[3] !== "") {
        SOUNDmode = ARRtitle[3];
    } else {
        SOUNDmode = SOUNDmodeDefault;
    }
    if (ARRtitle[4] !== undefined & ARRtitle[4] !== "") {
        NOTEset = ARRtitle[4];
    }
    TUNEnum = SETlist.indexOf(TITLEplus); //^ XXX causes problems if tune is in list more than 1 time
    loadServerTitle();
}

function loadServerTitle() { //alert('loadServerTitle()');
    var path = "../text/" + TITLE + ".txt"; //^ get the text file
    var request = new XMLHttpRequest();
    statusMsg("Downloading " + TITLE + "...", 'yellow');
    KEYbase = "X";
    document.getElementById('key2').innerHTML = "-";
    document.getElementById("title").innerHTML = TITLE; //^ put title on tab...
    TRANSPOSE = 0;
    CTO();
    ARRlines = "";
//SCROLLend = false;
    screenFormat("Think", "transArrowDown");
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    var n = content.search("404");
    if (n > 0) { //^ XXX unverified through all cases of next tune
        var content = "<center><X2>.......................Request Denied..........................</X2>\n\nNO FILE TITLED \'" + TITLE + "\'\n404 ERROR returned by Server\n(There may be a backing track!)</center>";
        statusMsg("Request for " + TITLE + " Denied!...", 0);
    }
    createARRlines(content);
}

function createARRlines(content) { //^ Make ARRlines, from the text file
    statusMsg("Creating Song Array and Extracting Constants from Song File: " + TITLE, 'yellow');
    NOTEset = undefined;
    ARRlines = "";
    while (content.indexOf("\r") >= 0) { //^ get rid of linefeeds
        content = content.replace("\r", "");
    }
    ARRlines = content.split("\n"); //^ make an array of lines
    firstLineValues(); //^ pulls first line values or sets defaults
    KEYlast = KEY;
    if (KEYbase == "X") {
        KEYbase = KEY;
    }
    NASH = false;
    SETnoteViewed = false;
    if (BOOT !== 'edit') {
        if (ARRtitle[1] !== undefined & ARRtitle[1] !== "") {
            newKey(ARRtitle[1]);
        }
        if (ARRtitle[2] !== undefined & ARRtitle[2] !== "") {
            BPM = ARRtitle[2];
        }
        if (ARRtitle[3] !== undefined & ARRtitle[3] !== "") {
            SOUNDmode = ARRtitle[3];
        }
        if (ARRtitle[4] !== undefined & ARRtitle[4] !== "") {
            NOTEset = ARRtitle[4];
        }
    }
    loadServerTrack();
}

function loadServerTrack() { //afrom 5.2
    rollMirror(false)
    statusMsg("Loading mp3 track...", 0);
    var delay = 1000;
    var src = '';
    var icon = SOUNDicon = "transSilent.png";
    document.getElementById('mirror').style.color = 'transparent'
    document.getElementById('mirrorImage').src = '../../Icons/' + SOUNDicon;
    statusMsg("Cuing " + SOUNDmode + " mode with " + parseInt(delay / 1000, 10) + " sec delay...", 'yellow');
    document.getElementById("Audio1").style.display = "none";
    var newBPM = BPM;
    if (SOUNDmode == "SILENT") {
        document.getElementById('mirrorImage').src = document.getElementById('buttonTrack2').src = "../../Icons/transSilent.png";
        icon = "transSilent.png"
        document.getElementById('Audio1').src = "";
        durCalc();
    } else { //^ tracks with BEAT Preset or Time Signature independent=====================
        if (SOUNDmode == "BACK TRACK") {
            BPM = hash(ARRlines[0], "BPM", BPM);
            icon = "transBackTrack.png";
            src = "../Backing/" + TITLE + ".mp3";
        } else if (SOUNDmode == "VOCAL") {
            BPM = hash(ARRlines[0], "BPM", BPM);
            icon = "transVocal.png";
            src = "../VOCAL/" + TITLE + ".mp3";
        } else { //dependent on Beat (round up to 5 or 10)
            while (parseFloat(newBPM / 5, 10) !== parseInt(newBPM / 5, 10)) {
                newBPM = parseInt(newBPM, 10) + 1;
            }
            BPM = newBPM;
            if (SOUNDmode == "CLICK TRACK") {
                icon = "transClick.png";
                src = "../Click/" + BPM + ".mp3";
            }
            //^ Beat Dependent tracks (only base 2,4,8,16)so far
            if (BEATS != 2 & BEATS != 4 & BEATS != 8 & BEATS != 16 & icon == 'none.png') { // kick out if not 4/4 based and no trackPicked
                icon = "transTrackNo.png";
                document.getElementById('buttonTrack2').src = "../../Icons/transTrackNo.png";
                AUDfail = true;
                durCalc();
                return;
            } //^ 4/4 tracks below here=============================================
            if (SOUNDmode == "DRUM ROCK") {
                icon = "transRock.png";
                src = "../DrumRock/" + BPM + ".mp3";
            } else if (SOUNDmode == "DRUM COUNTRY") {
                icon = "transCountry.png";
                src = "../DrumCountry/" + BPM + ".mp3";
            } else if (SOUNDmode == "DRUM COUNT") { //^ short 8 count track,
                delay = 500; //^ shorter track requires less load time
                icon = "transCount.png";
                src = "../DrumCount/" + BPM + ".mp3";
            }
        }
        SOUNDicon = icon;
        screenFormat("Think", SOUNDicon);
        document.getElementById('Audio1').src = src;
        Audio1.preload = 'auto'; //try to cache instead of stream....//Audio1.load();
        var x = setTimeout(function() { //^ time to get the mp3 [arbitrary]
            DURmp3 = document.getElementById('Audio1').duration;
            statusMsg("MP3 Duration:" + DURmp3, 'green');
            clearTimeout(x);
            if (SOUND === true) {
                document.getElementById("Audio1").volume = VOL;
            }
            document.getElementById("V").innerHTML = "<X2>" + parseInt(VOL * 100, 10) + "%</X2>";
            if (isNaN(DURmp3) === false) { //^ track successfully loaded
                document.getElementById("Audio1").style.visibility = "visible";
                AUDfail = false;
            } else { //^ track load unsuccessful
                DURmp3 = 0 //scroller
                color = 'red';
                AUDfail = true;
                SOUNDicon = 'transTrackNo.png';
                statusMsg('Backtrack Audio Failed...', 0);
            }
            document.getElementById('mirrorImage').src = document.getElementById('buttonTrack2').src = "../../Icons/" + SOUNDicon
            durCalc();
        }, delay); //^ time to load mp3
    }
}

function durCalc() {
    statusMsg("Calculating Song Duration...", "yellow");
    DUR = DURcalc = 0; //^ DURtext=0;
    DURsource = "Undefined";
    countBARS();
    DURcalc = parseInt(MEASURES * BEATS * 60 / BPM, 10); //^ alert(DURcalc);
    if (DURtext > 0) {
        DUR = DURtext, DURsource = "File";
    }
    if (DURcalc > 0) {
        DUR = DURcalc, DURsource = "Calculation";
    }
    if (SOUNDmode == "BACK TRACK" | SOUNDmode == "VOCAL") {
        if (isNaN(DURmp3) === false) {
            DUR = DURmp3;
            DURsource = "MP3";
        }
    }
    if (DUR === 0) {
        DUR = "150";
        DURsource = "Default";
    }
    DUR = parseInt(DUR, 10);
    arrConvert();
}

function arrConvert() { //alert('arrConvert()'); //^ Setup to walk thru the ARRLines
    statusMsg('Formatting Song and applying custom settings');
    var count = 0; //count bars
    var img = false; //if true use an image for the song not text
    var htmlString = "";
    var htmlHead = "";
    var lyricLines = lyricLineCount(); //^ XXX combine with longestLine???
    var n;
    var m //message builder
    var j = 0;
    var bigFont;
    var NewLine;
    var lType;
    var arrTemp;
    var temp;
    var arr;
    var bars;
    var barLen;
    var num;
    var visLines;
    var os;
    var offset;
    var extraLine = ''
    PRESONGlines = 0;
    NOTEtech = undefined; //^ consider calculating these to eliminate constants
    NOTEtrivia = "NO TRIVIA NOTES";
    NOTElinks = undefined;
    IRB = undefined;
    LONGLINE = longestLine() + 1;
    if (LONGLINE == 1) {
        LONGLINE = 74;
        img = true;
    } //in case there are no lines (indicates image file)
    if (BREAKlines === true) {
        LONGLINE = LINElimit
    } //if breaking lines is requested
    if (LINEnum === true | LINEtime === true) {
        LONGLINE = LONGLINE + 4;
    } //^ adding space
    NOTESpresent = false;
    var lineNum = 1;
    var pre = true; //^ flag for PRESONGlines
    if (TEXT === true) {
        m="/Small Text"
        fsize = (165 / LONGLINE)
    } else {
        fsize = (180 / LONGLINE)
    }
    n = fsize.toString();
    FONTSIZE = n.substring(0, 4) + "vw";
    n = (BIGchordSize * fsize).toString();
    bigFont = n.substring(0, 4) + "vw";
    var bars = 0;
    barCount=0
    statusMsg("Line)Type/Actions================================", 0)
    while (j < ARRlines.length) { //^ Walk through the ARRlines to build the htmlStrings  
        NewLine = ARRlines[j];
        lType = lineType(NewLine);
        m = j + ") " + lType;
        if (lType == 'irealb') {
            IRB = NewLine;
            NewLine = undefined;
        } else if (lType == 'hash') {
            NewLine = undefined;
        } else if (lType == 'noteTriv') {
            if (NOTEtrivia == "NO TRIVIA NOTES") {
                NOTEtrivia = "";
            }
            NOTEtrivia = NOTEtrivia + NewLine.substr(2) + "<br>";
            NewLine = undefined;
            NOTESpresent = true;
        } else if (lType == 'noteTech') {
            if (NOTEtech === undefined) {
                NOTEtech = NewLine.substr(3);
            } else {
                NOTEtech = NOTEtech + "\n" + NewLine.substr(3);
            }
            NewLine = undefined;
            NOTESpresent = true;
        } else if (lType == 'note') {
            if (pre === true) {
                PRESONGlines++;
                NewLine = NewLine.substring(1, NewLine.length); //^ cutoff @                                                                                                                                                                                                                     
                while (NewLine.length < LONGLINE) {
                    NewLine = NewLine + " ";
                }
                NewLine = "<X2>" + NewLine + "</X2>";
                if (LINEnum === true || LINEtime === true) {
                    NewLine = "<X6>    </X6>" + NewLine;
                }
            } else {
                if (NOTES !== true) {
                    NewLine = undefined;
                } else {
                    NewLine = "<X14>" + NewLine + "</X14>";
                }
            }
        } else if (lType == 'link') {
            if (NOTElinks === undefined) {
                NOTElinks = "";
            }
            arrTemp = NewLine.split("|");
            NOTElinks = NOTElinks + "<u><a onclick =window.open('" + arrTemp[0] + "')>" + arrTemp[1] + "</a></u><br>";
            NewLine = undefined;
            NOTESpresent = true;
        }
        //-----------------------------------------------  TOP  OF CHORD        
        else if (lType == 'chord') {
            m = "<x2>" + m
            pre = false; //^ stop counting prelines
            if (TRANSPOSE !== 0) {
                NewLine = lineTranspose(NewLine, TRANSPOSE);
                m = m + "/Transpose(" + TRANSPOSE + ")"
            } else if (BIGchords === true) {
                m=m+"/Big Chords("+BIGchordSize*100+"%)"
                NewLine = NewLine.replace(/\s+/g, ''); //remove spaces    
                arr = NewLine.split('|'); //split line into arr
                arr.splice(0, 1); //get rid of element in front of the first bar
                bars = BARSperLine; //use BARSperLine established at song load
                barLen = parseInt(LONGLINE / (bars * BIGchordSize), 10) - 1; //determine the length of a bar for big chords
                NewLine = "";
                n = 0;
                if (arr.length > bars) {
                    barLen = parseInt(barLen * bars / arr.length, 10);
                } //if more than std number of bars
                while (n < arr.length) {
                    temp = arr[n];
                    while (temp.length <= barLen) {
                        temp = temp.replace(/~/g, " ~");
                        temp = temp + ' ';
                    }
                    NewLine = NewLine + "|" + temp;
                    n = n + 1;
                }
            }
            if (BARsync === true) {
                m=m+"/BarSync("
                var barLine = "";
                n = 0;
                var htm = false;
                var firstChord = true
                while (n < NewLine.length) {
                    if (NewLine[n] == "|") {
                        if (firstChord === true) {
                            barLine = barLine + "<a id=\'b" + barCount + "\' style=\"backgroundColor:transparent;\">|"
                            firstChord = false
                        } else {
                            barLine = barLine + "</a><a id=\'b" + barCount + "\' style=\"backgroundColor:transparent;\">|"
                        }
                        barCount++
                    } else {
                        barLine = barLine + NewLine[n]
                    }
                n++;
                }
                while (barLine.length < LONGLINE) {
                    barLine = barLine + " ";
                }
                barLine = barLine + "               </a>"
                NewLine = barLine
                m = m + barCount + " Bars)</X2>"
            }
            
            NewLine = "<X100>" + NewLine + "</X100>"
        }
        //-------------------------------------------- 
        else if (lType == 'header') {
            m = "<x0>" + m + "========================================</X0>"
            if (pre === true) {
                PRESONGlines = PRESONGlines + 2;
            }
            pre = false;
            NewLine = NewLine.substring(1, NewLine.length); //^ cutoff #
            while (NewLine.length < LONGLINE - 5) {
                NewLine = NewLine + "-";
            }
            //if(HILITE===true){NewLine="<X3>" + NewLine + "</X3>";}else{NewLine="<X8>" + NewLine + "</X8>";}
            if (LINEnum === true || LINEtime === true) {
                NewLine = "<X6>    </X6>" + NewLine;
            }
        } else if (lType == 'lyric') {
            m = "<X1>" + m;
            if (BREAKlines === true) { //break long lyric lines and combine doubles to show bigger text 
                if (j + 1 < ARRlines.length) {
                    extraLine = ARRlines[j + 1];
                    var extraType = lineType(extraLine)
                    if (lineType(extraLine) === 'lyric') { //||lineType(ARRlines[j+1])!==undefined||lineType(ARRlines[j+1])!==undefinedlines[j+1];
                        NewLine = NewLine + extraLine;
                        j++;
                    }
                } //incase there is a 2nd lyric line
                if (NewLine.length > LONGLINE) {
                    if (NewLine.length > parseInt(2 * LONGLINE, 10) - 5) {
                        WARNING = "LYRIC LINES TOO LONG FOR SELECTED FONT >>> COMPLETE LINES MAY NOT BE DISPLAYED";
                    }
                    NewLine = breakLine(NewLine);
                    m=m+ "Split/"
                
                }
                
            }
            if (CAPS === true) {
                NewLine = NewLine.toUpperCase();
                m = m + "/Capitalized";
            }
            //if(HILITE ===true){
            //    while (NewLine.length < LONGLINE){
            //        NewLine=NewLine +" ";}
            //    NewLine="<X7>" + NewLine + "</X7>";}
            if (LINEnum === true) {
                if (lineNum < 10) {
                    num = "<X5>" + lineNum + "   </X5>";
                } else if (lineNum < 100) {
                    num = "<X5>" + lineNum + "  </X5>";
                } else {
                    num = +"<X5>" + lineNum + " </X5>";
                }
                NewLine = num + NewLine;
                lineNum++;
            }
            if (LINEtime === true) {
                NewLine = "<X5>" + secToMin(((lineNum - 1) / lyricLines) * DUR, 10) + "</X5>" + NewLine;
                lineNum++;
            }
            m = m + "</X1>"
        } else if (lType == 'spacer') {
            if (pre === true) {
                PRESONGlines = PRESONGlines + 1;
                m="/preSong"
            }
            NewLine = "." + NewLine.substring(1, NewLine.length);
            while (NewLine.length < LONGLINE) {
                NewLine = NewLine + " ";
            }
            NewLine = "<X7>" + NewLine + "</X7>";
            if (LINEnum === true || LINEtime === true) {
                NewLine = "<X6>    </X6>" + NewLine;
            }
        }
        if (NewLine) {
            if (LEFTborder === true) {
                NewLine = "  " + NewLine;
                m=m+"/Left-Space"
            }
            htmlString = htmlString + NewLine + "\n";
        }
        statusMsg(m, 0)
        j++;
    }
    var opac = 1
    WINDht = window.innerHeight;
    WINDwt = window.innerWidth;
    RAT = parseFloat(WINDht / WINDwt);
    visLines = parseInt((100 / fsize) * RAT, 10);
    os = parseInt((visLines / 2) - PRESONGlines, 10);
    offset = "";
    j = 0;
    offset = "<br><X4><center>" + TITLE.toUpperCase() + "</center></X4><br>";
    while (j <= os - 3) {
        offset = offset + "<br>";
        j++;
    }
    //build your Tune header in html
    htmlHead = "<!DOCTYPE html><html><head><title id='title'>" + TITLE + "</title><style>\nBody{font-size : ";
    htmlHead = htmlHead + FONTSIZE + "; color:black; margin :0vh; padding: 0; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:left;background-color:transparent;}";
    htmlHead = htmlHead + "\nX99{color:red;font-size:" + bigFont + ";line-height:100%;}\n";
    htmlHead = htmlHead + "\nX100{color:red;font-size:" + bigFont + ";line-height:100%;}\n</style></head><body>";
    if (img === true) { //substitute image for text, no text exists....
        htmlString = htmlString + "<img src=\'../Img/" + TITLE + ".jpg\' width=\'" + WINDwt * 0.98 + "px\'>";
    }
    htmlString = htmlHead + "<pre>" + offset + htmlString; // XX
    offset2 = "";
    j = 1;
    while (j < parseInt(((visLines) / 2) - 1, 10)) {
        offset2 = offset2 + "<br>";
        j++;
    }
    htmlString = htmlString + "<X2><center>=====    END    =====</center></X2><br>" + offset2 + "</pre></body></html>";
    statusMsg("Line)Type/Actions================================", 0);
    if (NOTEtech !== undefined) {
        NOTEtech = "<pre>" + NOTEtech + "</pre>";
    }
    if (NOTEtrivia === "" | NOTEtrivia === undefined) {
        opacSet("ButtonTrivia", 0.2)
    } else {
        opacSet("ButtonTrivia", 1);
    }
    if (NOTEtech === "" | NOTEtech === undefined) {
        opacSet("ButtonTech", 0.2)
    } else {
        opacSet("ButtonTech", 1);
    }
    if (NOTElinks === "" | NOTElinks === undefined) {
        opacSet("ButtonLinks", 0.2)
    } else {
        opacSet("ButtonLinks", 1);
    }
    if (IRB === "" | IRB === undefined) {
        opacSet("irbIcon", 0.2)
    } else {
        opacSet("irbIcon", 1);
    }
    document.getElementById('content').innerHTML = htmlString;
    if (img === false) {;
        scrollSetup();
    } else {
        loadSongImage("../Img/" + TITLE + ".jpg");
    }
}

function loadSongImage(path) {
    statusMsg('Loading Grapic Song Image...', 'yellow');
    var img = new Image();
    img.src = path;
    img.addEventListener("load", function() {
        scrollSetup();
    });
}

function scrollSetup(img) { //alert('scrollSetup()');//^ get the song data,songHeight,iframeHeight,Duration,ScrollConstant Run after you set the content of page
    statusMsg('Setting Up Scroll...', "yellow");
    var mesg = "";
    //var msgColor = 'grey';
    //scroll data==================================================================
    PAGEht = document.getElementById("content").clientHeight;
    document.getElementById('Tune').scrollTop = 0;
    Ystart = 0;
//Yend = false;
    Ypos = document.getElementById("Tune").scrollTop; // should get this at Play
    SCROLLpix = parseInt(PAGEht - (WINDht), 10);
    if (isNaN(DUR) === true) {
        msgColor = 'yellow';
        if (isNaN(DURcalc) === false) {
            DUR = DURcalc;
            DURsource = 'Calculation';
        } else if (isNaN(DURtext) === false) {
            DUR = DURtext;
            DURsource = 'From File';
        } else {
            DUR = 150;
            DURsource = "Default";
        }
        mesg = "<X8>Audio available...</X8> ";
    }
    SCROLLkon = DUR * 1000 / SCROLLpix; // microseconds per pixel
    SCROLLbase = SCROLLkon;
    document.getElementById('speed2').innerHTML = BPM;
    //applying user settings=====================================================================================
    statusMsg('Applying Custom Settings...', "yellow");
    if (SOUNDmode !== "SILENT") {
        vis('volCtrl', 'visible');
    } else {
        vis('volCtrl', 'hidden');
    }
    if (SETname == 'Single Tune') {
        document.getElementById("title").innerHTML = TITLE;
    }
    if (DURsource == "Default") {
        color = "Yellow";
    }
    mesg = mesg + "DURATION: " + secToMin(DUR) + " (" + DURsource + ") [TIME " + BEATS + "/4]  {TUNE " + parseInt(TUNEnum + 1, 10) + " of " + SETlist.length + "}";
    mesg = mesg + " {" + listChords() + "}";
    if (CLOCK === true) {
        vis("clock", "visible");
    } else {
        vis("clock", "hidden");
    }
    if (NOTEset !== undefined & SETnoteViewed === false & SETnotes === true) {
        notePopUp(TITLE + '<br>' + (NOTEset.split('@')).join('<br>'), '4vw', 'lightgray', 'purple', 'No Playlist Notes', undefined, 'Playlist note...'), 'Playlist Notes';
    } else if (POPnotes === true & PREVtitle !== TITLE) { //& NOTEtrivia!==undefined 
        notePopUp(triviaNotes(), '2vw', 'black', 'yellow', 'No Trivia Notes...', 0, 'No Trivia Notes', 'Trivia Notes');
    } else if (TECHnotes === true & PREVtitle !== TITLE & NOTEtech !== undefined) { //& NOTEtrivia!==undefined 
        notePopUp(NOTEtech, '4vw', 'black', 'pink', 'No Tech Notes...', 0, 'Technical Notes');
    }
    PREVtitle = TITLE;
    TRANSPOSE = 0;
    document.getElementById('key2').innerHTML = KEY;
    document.getElementById("V").innerHTML = "<X2>" + parseInt(VOL * 100, 10) + "%</X2>";
    if (SHADE === true) {
        vis('shade', 'visible');
    } else {
        vis('shade', 'hidden');
    }
    document.getElementById('thinkIcon').src = "../../Icons/trans.png";
    LOOPend = SCROLLpix;
    document.getElementById('le').innerHTML = parseInt(DUR,10)+ " sec";
    LOOPtop = 0;
    document.getElementById('lt').innerHTML = "0 sec";
    if (ALT === true) {
        document.getElementById('altSong').innerHTML = (SETlist[TUNEnum + 1].split('|')[0]);
    }
    screenFormat('Ready');
    document.getElementById("splash").style.display = 'none';
    document.getElementById('msg').style.top = "0%";
    if (BOOT === true) {
        dis('configuration', 'block');
        BOOT = false;
        if (window.innerHeight >= window.innerWidth) {
            alert("Rotate your device...");
        }
        if (STATUSmon === 1) {
            mesg = "Select your Sound Mode > Select your Playlist > Set your Configuration"
            msgColor = 'yellow';
            statusMonitor(0);
        } else if ((STATUSmon === 2)) {
            mesg = "Boot Successful, You're in the Debug mode..."
            msgColor = 'red'
            //statusMonitor(1)
            ;
        }
        if (BOOT == 'edit') {
            mesg = 'SONG PASSED FROM THE EDITOR!!!  REMEMBER TO SAVE IT THERE!!!';
            msgColor = 'red'
        }
    }
    rollMirror(true);
    if (WARNING !== "No Warnings!") {
        mesg = WARNING;
        msgColor = 'red';
        WARNING = "No Warnings!";
    }
    BAR = -1
    BARSTOP = ARRbars[0]
    ENDscroll = false;
    ENDaudio = false; //scroller
    statusMsg(mesg, msgColor)
}
//*PLAYER ROUTINES====================================================

function scrollEngine() { //^ the actual scrolling routine keep it simple* before it starts SCOLLstartTime,SCROLLkon must be set
    var newPos;
    if (ENDaudio === true & ENDscroll === true) {
        endSong();
    }
    if (ENDscroll === true) {
        if (DURmp3 === 0 | isNaN(document.getElementById('Audio1').duration) === true | document.getElementById('Audio1').currentTime >= document.getElementById('Audio1').duration) {
            ENDaudio = true
            statusMsg("Audio-" + DURmp3 + "-" + document.getElementById('Audio1').duration + "-" + document.getElementById('Audio1').duration + " finished or inactive", 0)
        }
    }
    if (Ypos === document.getElementById("Tune").scrollTop) {
        SS++
    }
    if (BARsync === true) {
        if (Ypos <= 1) { //hilite first bar
            document.getElementById('b0').style.backgroundColor = 'yellow'
        } else if (Ypos / SCROLLpix * DUR > BARSTOP & BAR < ARRbars.length) {
            statusMsg("<X0>BAR:" + BAR + " ended (" + BARSTOP + " sec of " + DUR + " sec)</X0>", 0)
            BAR = BAR + 1;
            BARSTOP = ARRbars[BAR] / MEASURES * DUR;
            document.getElementById('b' + BAR).style.backgroundColor = 'yellow'
            document.getElementById('b' + parseInt(BAR - 1, 10)).style.backgroundColor = 'transparent'
        }
    }
    if (SS > 5 | document.getElementById('Tune').scrollTop > LOOPend - 1) {
        ENDscroll = true;
        statusMsg('Scroll Complete....', 0)
        Audio1.pause()
        ENDaudio = true;
    } else {
        SS = 0;
    }
    nowTime = new Date().getTime();
    newPos = parseInt(((nowTime - SCROLLstartTime) / SCROLLkon) + Ystart, 10);
    document.getElementById("Tune").scrollTop = newPos
    Ypos = document.getElementById("Tune").scrollTop;
    statusMsg("> " + parseInt(Ypos, 10) + ' px', 0) //BAR:' + BAR, 0)
    TIMEOUTscroll = setTimeout(function() {
        scrollEngine();
    }, SCROLLkon);
}



function endSong() {
    //check for a loop    
    if (LOOPER === true & LOOPon === true) {
        resetLoop();
    } else {
        statusMsg(TITLE + " ended...", 'yellow');
        CTO()
        Audio1.pause(); //stop the audio
        var dur = document.getElementById('Audio1').duration;
        var Ypos = document.getElementById('Tune').scrollTop;
        var now = document.getElementById('Audio1').currentTime;
        statusMsg('Scroll:' + parseInt(Ypos * 100 / SCROLLpix, 10) + '%  Time:' + parseInt(100 * now / dur, 10) + "%", 0);
        //screenFormat('End')
        var wait;
        if (SOUNDmode === 'BACK TRACK' | SOUNDmode === 'VOCAL') {
            wait = 2000;
        } else {
            wait = (SCROLLkon * WINDht * 0.2);
        }
        statusMsg(parseInt(wait / 1000, 10) + " sec DELAY: (Time to finish...)", 'yellow');
        document.getElementById('msg').style.display = 'block';
        TIMEOUTwait = setTimeout(function() {
            screenFormat('End');
            if (AUTOnext === true) {
                dis('msg', 'block')
                statusMsg("Auto-Advancing to Next Song...", "yellow");
                if (TUNEnum !== (SETlist.length - 1)) {
                    var ns = SETlist[TUNEnum + 1];
                    blinker("nextIcon", 25);
                    screenFormat('Think', 'transArrowRight.png');
                    dis('msg', 'block')
                    TIMEOUTnext = setTimeout(function() {
                        nextTune(1);
                    }, 3000);
                } else {
                    statusMsg("END of Set...", "red");
                    //Yend =false;
                    screenFormat('End');
                }
            } else {
                statusMsg(TITLE + '<i> has Ended</i>', 'yellow')
            }
        }, wait);
    }
}

function resetLoop() {
    statusMsg("Resetting Loop...", 'orange');
    screenFormat('Think');
    document.getElementById('Tune').scrollTop = LOOPtop;
    trackReset()
    if (LOOPtype === 'repeated') {
        statusMsg('Repeating Loop...')
        screenFormat('Think','raw.png');
        TIMEOUTscroll = setTimeout(function() { //reusing TIMEOUTscroll
            trackPlay()
        }, 2000);
    }

}




function notePopUp(str,fs,clr,bak,def,title,status){//string, font size, color and Default
    document.getElementById('cloudX').style.color=clr;
    document.getElementById('cloudX').style.backgroundColor=bak;
    document.getElementById('cloudX').style.fontSize=fs;
    document.getElementById('cloudX').innerHTML=str;
    document.getElementById('cloudX').scrollTop=0;
    document.getElementById('cloudTitle').innerHTML=title;
    document.getElementById('cloudX').scrollTop=0;
    dis('information','block');
    statusMsg("Pop Up Notes : "+ title,0);}

function CTO(){//^ clear all Timouts except blink
    statusMsg("Clearing 'TIMEOUTS'",0);
    clearTimeout (TIMEOUTdelay); 
    clearTimeout (TIMEOUTscroll);
    clearTimeout (TIMEOUTnext);
    clearTimeout (TIMEOUTfade);
    clearTimeout (TIMEOUTwait);
    clearTimeout (TIMEOUTintro);}
    
function scrollTune(pct,step) {//^ 25% of screen per second seems appropriate rate
    var int=36;//^ interval may eventally calculate this
    var move=parseInt((pct*WINDht)/25,10);//^ will move 25 steps to move pct int between steps in 1/1000 of a sec
    var plannedSteps =Math.abs(parseInt(pct*100,10));
    var y=document.getElementById("Tune").scrollTop;// MMM
    if(step=== undefined){step=1;clearTimeout(TIMEOUTscroll);}else{step=step+1;}
    if(step<plannedSteps&y>0){
        TIMEOUTscroll=setTimeout(function(){//^ reusing TIMEOUTscroll
            document.getElementById("Tune").scrollTop=y+move;
            scrollTune(pct,step);},int);}
    else{//^  control this to set speed
        statusMsg("Scrolled "+ parseInt(pct*100,10)+"% in "+ step +" steps",0)
        clearTimeout(TIMEOUTscroll);
        Ystart =document.getElementById("Tune").scrollTop;
        SCROLLstartTime = new Date().getTime();
        statusMsg("Starting Scroll Engine",0);
        scrollEngine();}}
        
function screenFormat(cmd,varA) { //^ configures the play screen to match the play status(moves, displays and hides icons )
    statusMsg("Display Format: " + cmd, 0)
    if (cmd == "DelayedPlay" | cmd == "Scroll" | cmd == "Ready" | cmd == "Pause" | cmd == "Think" | cmd == "End") {
        clearTimeout(TIMEOUTfade);
        dis('Audio1', 'none');
        dis('bigPause', 'none');
        dis('bigButtons', 'none');
        dis('bigPlay', 'block');
        dis("think", "none");
        dis('backDrop', 'none');
        dis('altSong', 'none');
        dis("msg", "none");
        dis("lastIcon", "block");
        dis("nextIcon", "block");
        vis('cntDwn', 'hidden');
        vis("fadeIcon", "hidden");
        if (cmd == "DelayedPlay") { //alert('DelayedPlay');
            vis('cntDwn', 'visible');
            dis('think', 'block');
            document.getElementById('shade').style.visibility = 'hidden';
            barSelect("none");
            dis("songIcons", "none");
            dis("msg", "block");
        }
        if (cmd == "Scroll") { //alert('Scroll');
            if(BARsync===false){dis('bigButtons', 'block');
            }else{dis('bigButtons', 'none')}
            dis('bigPause','block')
            dis('bigPlay', 'none');
            dis('bigReset', 'none');
            barSelect("none");
            dis("songIcons", "none");
            document.getElementById('shade').style.visibility = 'hidden';
            if (BACKdrop === true) {
                dis('backDrop', 'block');
            }
        }
        if (cmd === "Ready") { //alert('Ready');
            if (ALT === true) {
                dis('altSong', 'block');
            }
            dis('bigButtons', 'none');
            dis('bigPlay', 'block');
            dis('bigReset', 'block');
            dis("songIcons", "block");
            dis("msg", "block");
            dis('Audio1', 'block');
        }
        if (cmd === "End") { //alert('End');
            dis('bigButtons', 'none');
            dis('bigPlay', 'block');
            dis('bigReset', 'block');
            dis('songIcons', 'block');
            dis("msg", "block");
            dis('Audio1', 'block');
        }
        if (cmd === "Pause") { //alert('Pause');
            dis('bigButtons', 'none');
            dis('bigPlay', 'block');
            dis('bigReset', 'block');
            dis('songIcons', 'block');
            dis('Audio1', 'block');
            dis("msg", "block");
        }
        if (cmd === "Think") {
            dis('msg','block')
            if (varA===undefined) {
                varA='trans.png'
            }
            document.getElementById('thinkIcon').src="../../Icons/"+varA;
            dis('think', 'block');
        }
        if (TUNEnum === 0) {
            dis("lastIcon", "none");
        }
        if (TUNEnum > (SETlist.length -2)) {
            dis("nextIcon", "none");
        }
    } else {
        alert(cmd + " is an invalid Command");
    }
}

function scrollRate(factor){
    var oldBPM=BPM;
    if(BPM<350&factor<1|BPM>30&factor>1) {
        //if(BPM<500&factor<1|BPM>30&factor>1) {
        SCROLLkon = SCROLLkon*factor;
        BPM= parseInt(BPM*(SCROLLbase/SCROLLkon),10);
        statusMsg('Changed Scroll Rate by '+factor+ '% from: '+oldBPM+ ' to: '+BPM,0)
        //SONGlastCustom=1;
        showSetting(1);
        SCROLLstartTime=new Date().getTime();
        Ystart=Ypos; 
        //Yend=false;
        Ypos = document.getElementById("Tune").scrollTop;}}
    
function trackDelay(){//count in with two bars....
    clearTimeout (TIMEOUTintro);
    document.getElementById('cntDwn').style.color='black';
    document.getElementById('cntDwn').style.visibility='visible';
    statusMsg("START  SONG  WHEN  THE  SCROLL ROLLS!!",'yellow');
    screenFormat("DelayedPlay");
    if(COUNTin===false) {trackPlay();}
    if(SOUNDmode=='DRUM COUNT'){
        document.getElementById("Audio1").play();
        TIMEOUTintro=setTimeout(function(){trackPlay()},document.getElementById("Audio1").duration*1000);}   
    else{countIn(0)}}

function countIn(step){   
    var int= parseInt(60000/BPM,10);
    if(step>BEATS) {
        clearTimeout (TIMEOUTintro);
        document.getElementById('cntDwn').innerHTML='';
        document.getElementById('cntDwn').style.visibility='hidden';
        if(SOUNDmode=='VOCAL'| SOUNDmode=='BACK TRACK') {trackPlay();}
        else {trackPlay();}
    }else{TIMEOUTintro=setTimeout(function(){
        if(CLICKER===true){document.getElementById('aC').play();}
        step=parseInt(step +1,10);
        document.getElementById('cntDwn').innerHTML=step;
        document.getElementById('cntDwn').style.visibility='visible';
        countIn(step);},int);} }   

function trackPause(){   
        CTO();
        if (BARsync===true) {barsClear()}
        if(SOUNDmode !== 'SILENT'){document.getElementById("Audio1").pause();}//;PAUSEpoint=document.getElementById("Audio1").currentTime;}
        if(LOOPER!==true|document.getElementById('Tune').scrollTop < LOOPend)
            {statusMsg("Paused...","yellow");}
        else
            {statusMsg("Loop Paused!","yellow");} 
        screenFormat("Pause");}
        

function trackPlay() { //pause options...undefined
    statusMsg("trackPlay: " + SOUNDmode,0)
    ENDscroll = false
    Audio1.pause()//just in case
    CTO();
    if (BARsync===true) {
        findBar();
    }else{
        trackAlign('Screen')
    }
    screenFormat("Scroll");
    Ystart = document.getElementById("Tune").scrollTop;
    SCROLLstartTime = new Date().getTime();
    if (document.getElementById("Audio1").duration>3){document.getElementById("Audio1").play();}
    statusMsg('Playing in ' + SOUNDmode + ' Mode...',0)
    scrollEngine();
}
function findBar() {
    var i = 0;
    pos = document.getElementById('Tune').scrollTop
    if (pos < ARRbars[0] * SCROLLpix / MEASURES) {
        newPos = 0
    } else {
        while (pos < ARRbars[i] * SCROLLpix / MEASURES) {
            newPos = ARRbars[i] * SCROLLpix / MEASURES
            i++
        }
    }
    statusMsg(pos+'>'+newPos + '  px starts the bar...'+i, 0)
    document.getElementById('Tune').scrollTop = newPos
    if (SOUNDmode === 'SILENT' | SOUNDmode === 'BACK TRACK' | SOUNDmode === 'VOCAL') {
        trackAlign('Screen');
    } else {
        trackAlign('Free');
    }
    BAR = i;
    BARSTOP = ARRbars[i] / MEASURES * DUR;
    document.getElementById('b' + BAR).style.backgroundColor = 'yellow'
    statusMsg("<X2>findBar()=BAR:" + i + " BARSTOP: " + BARSTOP + "</X2>", 0)
}

function trackAlign(to) {
    //statusMsg('Aligning to '+to+'=======================================', 0)
    var pct;
    var trackPos;
    var scrollPos;
    if (to === 'Scroll') {
        statusMsg('DURmp3 ' + DURmp3, 0);
        pct = parseFloat(document.getElementById('Tune').scrollTop / SCROLLpix, 10)
        trackPos = parseFloat(pct * DURmp3, 10)
        statusMsg('trackPos ' + trackPos, 0);
        document.getElementById('Audio1').currentTime = trackPos;
        statusMsg('Audio aligned to SCROLL '+scrollPct+"%", 0);        
    } else if (to === 'Audio') {
        pct = parseFloat(document.getElementById('Audio1').currentTime / DURmp3, 10)
        scrollPos = parseFloat(pct * SCROLLpix, 10)
        document.getElementById('Tune').scrollTop = scrollPos;
        statusMsg('Scroll aligned to Audio at '+pct+'%', 0);
    } else if (to === 'Screen') {
        pct = document.getElementById('Tune').scrollTop / SCROLLpix
        document.getElementById('Audio1').currentTime = parseFloat(pct * DURmp3, 10)
        statusMsg('Scroll and Audio aligned to SCREEN at '+pct+'% /'+parseFloat(pct * DURmp3, 10)+'sec', 0);
    }else if (to === 'Free') {
        pct = document.getElementById('Tune').scrollTop / SCROLLpix
        document.getElementById('Audio1').currentTime = 0
        statusMsg('Scroll and Audio aligned to SCREEN at '+pct+'%', 0);
    }
}


//screenFormat("Scroll")
            

function countIn2(step){   
    var int= parseInt(60000/BPM,10);
    if(step>BEATS) {
        clearTimeout (TIMEOUTintro);
        document.getElementById('cntDwn').innerHTML='';
        document.getElementById('cntDwn').style.visibility='hidden';
        if(SOUNDmode=='VOCAL'| SOUNDmode=='BACK TRACK') {trackPlay();}
        else {trackPlay();}
    }else{TIMEOUTintro=setTimeout(function(){
        if(CLICKER===true){document.getElementById('aC').play();}
        step=parseInt(step +1,10);
        document.getElementById('cntDwn').innerHTML=step;
        document.getElementById('cntDwn').style.visibility='visible';
        countIn(step);},int);} } 


function trackReset() {
    statusMsg("Resetting track...", 0)
    document.getElementById('Tune').scrollTop = LOOPtop;
    statusMsg("TOP: " + LOOPtop, 0)
    if (LOOPER === false | (LOOPER === true & LOOPon === false)) {
        LOOPtop = 0;
        LOOPend = SKROLLpix;
        statusMsg('Standard Loop>>Entire Song...')
        document.getElementById('lt').innerHTML = "0 sec";
        document.getElementById('le').innerHTML = parseInt(DUR, 10) + " sec";
    }
    statusMsg(TITLE + " reset...")
    if (document.getElementById("Audio1")) {
        document.getElementById("Audio1").autoplay = false;
        document.getElementById("Audio1").currentTime = LOOPtop * DUR / SCROLLpix
    }
    ENDaudio = ENDscroll = false;
    ALT = false;
    if (SOUND === true) {
        document.getElementById("Audio1").volume = VOL;
    }
    BAR = 0;
    if (BARsync === true) {
        barsClear(); //probably align track if barsync on
    }
    statusMsg("Reset complete", 0);
    screenFormat('Ready')
    CTO();
    statusMsg(LOOPon+" "+LOOPmode)
    if (LOOPon===true & LOOPmode==='repeated') {
        statusMsg('Auto Looping...')
        screenFormat('Think','trans.png')
        setTimeout(function() {
            trackPlay();
        }, 2000);
    }
}

function fadeAudio() {
    var newVol = 0.75 * document.getElementById("Audio1").volume
    statusMsg('Fading Audio> ' + newVol * 100 + '%', 0)
    document.getElementById("Audio1").volume = newVol;
    if (newVol <= 0.01) {
        clearTimeout(TIMEOUTfade)
        document.getElementById("Audio1").pause();
        ENDaudio = true;
        document.getElementById("Audio1").volume = VOL;
        statusMsg('<X2>Audio Paused and Volume reset to '+VOL*100+'%</X2>',0);
    } else {
        document.getElementById("Audio1").volume = newVol
        setTimeout(function() {
            fadeAudio();
        }, 200);
    }
}

function fade(dir){
    if(SOUND===true) {
        var fact;
        var vol=document.getElementById("Audio1").volume;
        document.getElementById('V').innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
        if(dir==='x') {if(VOL>0 & vol>0){dir='down';}else {dir ='up';}}
        if(dir=="up" & vol < VOL| dir==="down" & vol>0.01){ 
            vis('fadeIcon','visible');
            TIMEOUTfade=setTimeout(function(){
                if(dir =="down") {fact =0.7;}else{fact =1.3;}
                if(document.getElementById("Audio1").volume === 0){vol =0.005;}
                fact =vol*fact;
                if(fact>1) {fact=1;}
                document.getElementById("Audio1").volume =fact;
                fade(dir);
                document.getElementById('V').innerHTML="<X2>Fade</X2>";},1000);}
        else{vis('fadeIcon','visible');
            clearTimeout(TIMEOUTfade);
            if(dir == 'down'){document.getElementById("Audio1").volume =0;vol =0;}
            if(dir == 'up') {document.getElementById("Audio1").volume =VOL;vol =VOL;}
            document.getElementById('V').innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";}}}   

function blinker(id,cycles){//1/4 second per blink
    var d = document.getElementById(id) ;
    if(cycles>0){
        if(d.style.visibility=='visible'){d.style.visibility='hidden';}
        else{ d.style.visibility='visible';}    
        TIMEOUTblink=setTimeout(function()
            {clearTimeout(TIMEOUTblink);
            cycles = cycles -1;
            blinker(id,cycles);
            },125);}
    else{clearTimeout(TIMEOUTblink);
        d.style.visibility='visible';}}
                
function unique(/*str[]*/ arr) { //^ finds unique elements in an array arr
     var o={},  
        r=[],  
        n = arr.length,  
        i;  
     for( i=0 ; i<n ; ++i )  
          o[arr[i]] = null;  
     for( i in o )  
          r.push(i);  
     return r;}
    
function flash(msg,dur){
    if(msg !==MSGlast){
        var TIMEOUTflash;var oldMsg = MSGlast;
        if(dur===undefined) {dur =3;}
        dur = parseInt(dur*1000,10);
        statusMsg(msg,'red') ;   
        TIMEOUTflash=setTimeout(function(){statusMsg(oldMsg);},dur); }}
            
//*LOOP functions=======================================================================================

    
function endLoop(){
    screenFormat('Ready');
    CTO();
    statusMsg("Loop Complete...", "yellow");
    if(LOOPmode=="repeated"){
        trackPause();
        TIMEOUTscroll=setTimeout(function() {resetLoop();},2000);}}
        
function loopMode(){
    if(LOOPmode=='repeated'){
        LOOPmode='played once';
        document.getElementById('loopImg').src="../../Icons/transOnePlay.png";}
    else{LOOPmode='repeated';
        document.getElementById('loopImg').src="../../Icons/transInfinity.png";}
    loopMsg();}
    
function loopMsg(a){
    var str="Loop Start: " +secToMin(LOOPtop*SCROLLkon/1000)+ "......Loop End: " + secToMin(LOOPend*SCROLLkon/1000)+"......"+ LOOPmode +"!";
    if(a=='true'){alert(str);}else{statusMsg(str,'yellow');}}

function loopMarkTop(){
    LOOPtop = document.getElementById('Tune').scrollTop;
    statusMsg("LOOP TOP;" +LOOPtop,0)
    document.getElementById('lt').innerHTML=parseInt(LOOPtop*DUR/SCROLLpix,10)+" sec"
    }

function loopMarkEnd(){
    LOOPend = document.getElementById('Tune').scrollTop;
    statusMsg("LOOP END;" +LOOPend,0)
    document.getElementById('le').innerHTML=parseInt(LOOPend*DUR/SCROLLpix,10)+" sec"
    }
function loopOn() {
    if (LOOPon===true){
        LOOPon=false
        document.getElementById('playLoop').style.backgroundImage = "url('../../Icons/off.png')";
        //document.getElementById('playLoop').style.background-image:url="../../Icons/off.png"
        dis('loopBlock','none');
    }else{
        LOOPon=true;
        dis('loopBlock','block');
        document.getElementById('playLoop').style.backgroundImage = "url('../../Icons/on.png')";
    }
    LOOPtop=0;
    LOOPend=SCROLLpix;
    document.getElementById('lt').innerHTML="0 sec";
    document.getElementById('le').innerHTML=parseInt(DUR,10)+" sec";
}

//*CONFIG FUNCTIONS===================================================
function showSetting(num) {// alert('showSetting('+num+')')
    statusMsg ("Displaying key, tempo or track type",0)
    var iconString;
    if(num>2){
        document.getElementById('mirror').style.color='transparent';
        document.getElementById('mirrorImage').src= document.getElementById('buttonTrack2').src="../../Icons/"+SOUNDicon;}
    else{
        document.getElementById('mirror').style.color='black';
        document.getElementById('mirrorImage').src='../../Icons/transCircleWhite.png'}
        if(num===0) {document.getElementById('key2').innerHTML=document.getElementById('mirror').innerHTML=KEY}
        else{document.getElementById('speed2').innerHTML=document.getElementById('mirror').innerHTML=BPM;}}
   
function listTempos(){  
    var strt; var fin; var inc; var j = 0;  var lst="";var beats;var beatUp =beats;var beatDown;
    if(SOUNDmode == "BACK TRACK"|SOUNDmode == "VOCAL"){lst ="You cannot change the Tempo of<br>Pre-recorded VOCAL OR BACKING TRACK...";}
    else{
        if(SOUNDmode =='SILENT'|AUDfail===true){strt=50;fin=300;inc=5;}
        else if(SOUNDmode =='DRUM ROCK'|SOUNDmode =='DRUM COUNT'){strt=70;fin=220;inc=5;}
        else if(SOUNDmode =='CLICK TRACK'){strt=70;fin=190;inc=5;}
        else if(SOUNDmode =='DRUM COUNTRY'){strt=70;fin=220;inc=10;}
        else {(alert ("UNKNOWN ERROR SOUND MODE " +SOUNDmode+ " DOES NOT EXIST!"));}
        beats =strt;j=0;
        while (beats <BPM){beats = beats +inc;j++;}
        lst= "<br><a onclick = 'setBPM("+beats+")' style='color:red'>"+ beats +"</a><br>";           
        j=1;
        while (j <=10){
            beatUp =beats + (j*inc); beatDown =beats - (j*inc);
            if(beatUp <=fin) {lst= "<a onclick = 'setBPM("+beatUp+");SONGlastCustom=1;showSetting(1);'> "+ beatUp +"</a>-"+lst;}
            if(beatDown >=strt) {lst= lst+"<a onclick = 'setBPM("+beatDown+");SONGlastCustom=1;showSetting(1);'> "+ beatDown +"</a>-";}
            j = j+1;}}
    document.getElementById('tempo2').innerHTML=lst;}
        
function newKey(nk){//nash means Nashville
    var nk2=nk
    var nash=false;//NASH = false;
    var i;
    var j =0;
    if(KEY=="N") {
        alert("Not Programed to transpose From Nashville Notation\nSimply move to another song and back to clear Nashville Notation!\n SORRY...");return;}
    if(nk2.substring(1,2)=='#') {nk2=nk2.substring(0,1)+'s'}// Replace the # sign 
    if(nk=="N"){
        nash = true;
        nk ="A";}
    while(ARRscale[j]!==KEY){j++;}
    i =j;
    while(ARRscale[i]!==nk){i++;}
    TRANSPOSE =i-j;//calculate the Transpositon
    if(nash!==false) {nk='N';}
    document.getElementById('key2').src='../../Icons/Key'+nk2+'.png'
    KEYlast=KEY;
    KEY=nk;
    //SONGlastCustom=0;
    statusMsg("Transposed to " +KEY,0)
    arrConvert();}
        
function setBPM(bpm){
    if(SOUNDmode =='SILENT'){BPM = bpm;durCalc();}
    else{BPM =bpm;
       showSetting(1);
       loadServerTrack();}
       listTempos()
       statusMsg("Set BPM to " +bpm,0)}
        
function setSoundModeDefault(mode){// used to indicate audio end (needed to remove listener)
    var num = ARRsoundModes.indexOf(mode);
    document.getElementById("soundSelector").selectedIndex = num;
    SOUNDmodeDefault=SOUNDmode = mode;
    if(BOOT ===false){selectTune(TITLEplus);}}// ZZZcheck to see ifyou can take it out of the boot stream

function setSoundMode(mode,icon){
    statusMsg("Sound mode: "+ mode +">>>>"+SOUNDicon)
    showSetting(2);
    SOUNDmode = mode;
    loadServerTrack();}
        
function presets(action) {
    //               0        1          2        3     4    5     6     7         8        9        10        11       12       13      14       15      16    
    //  ARRpresets="CAPS,FULLscreen,LEFTborder,CLOCK,TEXT,SHADE,NOTES,SETnotes,POPnotes,TECHnotes,AUTOnext,COUNTin,CLICKER,BREAKlines,BIGchords,LOOPER,BARsync".split(',');
    if (action==='presets2'){
        statusMsg('<X2>Wraping up '+PRESET + "...</X2>", 0)
    }
    if (PRESET === "Default Mode") {
        ARRtf = "true,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false".split(',');
        if (action === 'presets2') {
            setLineLimit(80)
            selectSet("ALL TUNES")
        }
    } else if (PRESET === "Perform Mode") {
        ARRtf = "false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false".split(',');
        if (action === 'presets2') {
            setLineLimit(50)
            selectSet("Fred on his own")
        }
    } else if (PRESET === "Practice Mode") {
        ARRtf = "false,true,false,true,false,false,false,true,false,false,true,true,true,true,true,true,false".split(',');
        if (action === 'presets2') {
            setLineLimit(55)
            selectSet("ALL TUNES")
        }
    } else if (PRESET === "Developer Mode") {
        ARRtf = "true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true".split(',');
        if (action === 'presets2') {
            selectSet("Test")
            statusMonitor(2);
            setLineLimit(20);
            document.getElementById('soundSelector').selectedIndex = 1;
            setSoundModeDefault(document.getElementById('soundSelector').value);
            document.getElementById('mySet').selectedIndex = 0;
            selectTune('Abilene')
        }
    }
    PRESETno = 0;
    if (action==='presets'){
        statusMsg('<X2>'+PRESET + " selected by the user...\n----------------------------------------</X2>", 0)
        setCustom('-', '-', 'presets')
    }
    else if (action==='presets2'){
        statusMsg('<X2>---------------------------------------------\n'+PRESET + " Configuration is Set...</X2>", 0)
    }
}

function setCustom(VAR, val, action) {
    var msg;
    var icon;
    if (action === undefined | action === null | action === '' | action === ' ') { //clean up undefined
        action = 'ERROR';
        statusMsg("ERROR...Process Program Terminated")
        return;
    } else if (action === 'presets') {
        VAR = ARRpresets[PRESETno];
        if (ARRtf[PRESETno] === 'true' | ARRtf[PRESETno] === true) {
            val = true;
        } else {
            val = false;
        }
      //statusMsg(PRESET + '[' + parseInt(PRESETno + 1, 10) + "] of " + ARRpresets.length + "          " + VAR + " to " + val, 0);
    statusMsg("    "+ VAR + " to " + val+'  '+ parseInt(PRESETno + 1, 10) + " of " + ARRpresets.length, 0);
    } else if (action === 'refresh') { //reflex change
        if (window[VAR] === true) {
            val = false;
        } else if (window[VAR] === false) {
            val = true;
        }
        statusMsg("Reflex Change of " + VAR + " to " + val + "\n======================================", 0);
    }
    if (val === true) {
        icon = "ON.png";
    } else {
        icon = "OFF.png"
    }
    window[VAR] = val;
    document.getElementById("img" + VAR).src = "../../Icons/" + icon;
    if (action === 'presets2') {
        alert(2)
        return
    };
    if (VAR == 'BREAKlines') { //works with BIGchords 
        //statusMsg(VAR + ": " + window[VAR] + "and icon:" + icon + "  pending: " + action, 0)
        if (BREAKlines === true) { //turn on BIGchords too
            statusMsg(VAR + ": forcing BIG chords to true " + action, 0)
            BIGchords = true
            document.getElementById('imgBREAKlines').style.width = '16%';
            document.getElementById('imgBREAKlines').src = "../../Icons/ON.png";
            document.getElementById('breakLines').style.width = '16%';
            document.getElementById('breakLines').innerHTML = 'CHR/<br>Line';
            document.getElementById('bcp').innerHTML = 'Size<br>Chords';
            document.getElementById('bcp').style.width = '16%';
            document.getElementById('imgBIGchords').style.width = '16%';
            document.getElementById('imgBIGchords').src = "../../Icons/ON.png";
        }
        vis('bigChordPct', 'visible');
    }
    if (BREAKlines === false) {
        document.getElementById('imgBREAKlines').style.width = '32%';
        document.getElementById('breakLines').style.width = '32%';
        document.getElementById('breakLines').innerHTML = 'Characters<br>Per Line';
    }
    if (VAR == 'BIGchords') {
        if (BIGchords === true) {
            document.getElementById('imgBIGchords').style.width = '16%';
            document.getElementById('bcp').innerHTML = 'Size<br>Chords';
            document.getElementById('imgBIGchords').src = "../../Icons/ON.png";
            document.getElementById('bcp').style.width = '16%';
        } else {
            statusMsg("--Custom E: " + VAR + ": forcing BREAKlines to false " + action, 0)
            document.getElementById('imgBIGchords').style.width = '32%';
            document.getElementById('bcp').innerHTML = 'Spread & Size<br>Chords';
            document.getElementById('bcp').style.width = '32%';
            BREAKlines = false; //only works with chords spread
            document.getElementById('breakLines').innerHTML = 'Characters<br>Per Line';
            document.getElementById('breakLines').style.width = '32%';
            document.getElementById('imgBREAKlines').src = "../../Icons/OFF.png";
            document.getElementById('imgBREAKlines').style.width = '32%';
        }
    }
    if (VAR == 'SETnotes' & SETnotes === true) {
        document.getElementById("imgPOPnotes").src = "../../Icons/OFF.png";
        POPnotes = false;
        document.getElementById("imgTECHnotes").src = "../../Icons/OFF.png";
        TECHnotes = false;
    }
    if (VAR == 'POPnotes' & POPnotes === true) {
        document.getElementById("imgSETnotes").src = "../../Icons/OFF.png";
        SETnotes = false;
        document.getElementById("imgTECHnotes").src = "../../Icons/OFF.png";
        TECHnotes = false;
    }
    if (VAR == 'TECHnotes' & TECHnotes === true) {
        document.getElementById("imgSETnotes").src = "../../Icons/OFF.png";
        SETnotes = false;
        document.getElementById("imgPOPnotes").src = "../../Icons/OFF.png";
        POPnotes = false;
    }
    if (VAR == 'LINEnum' & LINEnum === true) {
        window[LINEtime] = false;
        document.getElementById("imgLINEtime").src = "../../Icons/OFF.png";
        LINEtime = false;
    }
    if (VAR == 'LINEtime' & LINEtime === true) {
        window[LINEnum] = false;
        document.getElementById("imgLINEnum").src = "../../Icons/OFF.png";
        LINEnum = false;
    }
    if (VAR == 'FULLscreen') {
        if (FULLscreen === true) {
            launchIntoFullscreen(document.documentElement);
        } else {
            exitFullscreen();
        }
    }
    if (VAR === 'CLOCK') { //alert('CLOCK')
        if (action === 'presets') {
            CLOCK = false;
            statusMsg('<X2>CLOCK IS FALSE due to code problem</X2>')
        } else {
            if (CLOCK === true) { //out of auto loop until I figure something more elegant???
                statusMsg('problem', 0);
                clockRun();
            } else {
                clearTimeout(TIMEOUTclock);
                dis('clock', 'none');
            }
        }
    }
    if (VAR == 'LOOPER') {
        if (LOOPER === true) {
            document.getElementById('looper').style.display = 'block';
        } else {
            document.getElementById('looper').style.display = 'hidden';
        }
    }
    if (VAR == 'TEXT') {
        if (TEXT === true) {
            document.getElementById("imgTEXT").src = "../../Icons/On.png"
        } else {
            document.getElementById("imgTEXT").src = "../../Icons/OFF.png"
        }
    }
    if (VAR == 'CLICKER') {
        if (CLICKER === true) {
            document.getElementById("imgCOUNTin").src = "../../Icons/On.png"
            COUNTin = true
        }
    }
    if (VAR == 'COUNTin') {
        if (COUNTin === false) {
            document.getElementById("imgCLICKER").src = "../../Icons/OFF.png"
            CLICKER = false
        }
    }
    if (action === 'presets') {
        //statusMsg("A-4  PRESET: " + PRESET + " [" + PRESETno + "]  Updated... ", 0)
        if (PRESETno >= parseInt(ARRpresets.length - 1, 10)) {
            presets('presets2')
        } else {
            PRESETno = PRESETno + 1;
            //statusMsg(PRESET + "-" + PRESETno + ' next')
            //return;
            setCustom('', '', 'presets')
        }
    } else if (action === 'refresh') {
        arrConvert();
    } else if (action === 'click') {
        document.getElementById('aC').play();
    } else {
        statusMsg('A-6' + "OUT")
    }
}

function launchIntoFullscreen(element){
    if(element.requestFullscreen) {element.requestFullscreen();}
    else if(element.mozRequestFullScreen) {element.mozRequestFullScreen();}
    else if(element.webkitRequestFullscreen) {element.webkitRequestFullscreen();}
    else if(element.msRequestFullscreen) {element.msRequestFullscreen();} }

function exitFullscreen(){
    if(document.exitFullscreen) {document.exitFullscreen();}
    else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();}
    else if(document.webkitExitFullscreen) {document.webkitExitFullscreen();}
    else if(element.msCancelFullscreen) {document.msCancelFullscreen();}}//this step is BOGUS

function tgl(vrbl,val){
    if(!val){
        if(window[vrbl]===true){window[vrbl]=false;}
        else{window[vrbl]=true;}}
    else{window[vrbl]=val;}
    if(window[vrbl]===true){document.getElementById("img"+vrbl).src ="../../Icons/On.png";}
    else{document.getElementById("img"+vrbl).src ="../../Icons/OFF.png";}}

function togl(vrbl){
    tgl(vrbl);
    if(vrbl== 'LINEtime' && LINEnum ===true){tgl('LINEnum',false);}
    else if(vrbl== 'LINEnum' && LINEnum ===true){tgl('LINEtime',false);}}

function volSet(volDelta){//^ VolDelta will be -1,0,+1 {10=off or On}
    var newExp;
    clearTimeout(TIMEOUTfade);
    vis("fadeIcon","visible");
    if(volDelta == 10 & SOUND ===true) {
        SOUND =false;
        document.getElementById("Audio1").volume = 0;
        document.getElementById("soundOO").src ="../../Icons/Off.png";
        document.getElementById("V").innerHTML= "<X2>OFF</X>";}
    else{  
        if(volDelta == 10){
            SOUND = true;
            volDelta = 0;
            document.getElementById("soundOO").src ="../../Icons/ON.png";}
        newExp = parseInt(VOLexp +volDelta,10);
        if(newExp < 5  && newExp > -1){//^ 0,1,2,3,4 (4 being the lowest volume)
            VOLexp = newExp;
            VOL = Math.pow(0.71,4-VOLexp);
            var newBottom = parseInt(15+(VOLexp*15),10)+"%";//^ knob position
            document.getElementById("SK").style.bottom  =newBottom ; //alert(VOLexp +" - " +newBottom)
            var uH=parseInt(newExp*15,10)+'%';
            document.getElementById("SUp").style.height =uH;}}//^ height of button
    document.getElementById('V').innerHTML="<X2>"+parseInt(newExp*25,10)+"%</X2>";
    if(SOUND===true){document.getElementById("Audio1").volume = VOL;}
    else{document.getElementById("V").innerHTML= "<X2>OFF</X2>";}}
    
function revDates(){//date of last mod to js file
    var xhReq = new XMLHttpRequest();
    xhReq.open("HEAD", JSname, false);
    xhReq.send(null);
    JSdate = xhReq.getResponseHeader("Last-Modified");
    HTMLdate=document.lastModified;}
    
function revDetails(){statusMsg("REVISION: "+REV+" <> HTML: "+document.lastModified+" <> JavaScript: "+JSdate,'blue');}

function indexLetter(L){
    var n=0;
    document.getElementById('mySet').selectedIndex=n;
    var str=document.getElementById('mySet').value;
    while(str.substring(0,1)!==L){
        document.getElementById('mySet').selectedIndex=n;
        var str=document.getElementById('mySet').value;
        n++;
        str==document.getElementById('mySet').value;
        if(n==document.getElementById('mySet').length-1) {
            statusMsg("No Tunes Starting with "+L,'yellow')
            return}}
    selectTune(document.getElementById('mySet').value)}

function changeBackgroundImage(id, url){
    var urlString = 'url(' + url + ')';
    document.getElementById(id).style.backgroundImage =  urlString;}

function bcPct(size){//BigChordPCT
    var sign="+";
    if(size!==undefined){BIGchordSize=1.00}//default
    else{BIGchordSize=BIGchordSize+0.25;}
    if(BIGchordSize==2.25){BIGchordSize=1;}
    if(BIGchordSize==1.75){BIGchordSize=2;}
    document.getElementById('bigChordPct').innerHTML=BIGchordSize*100 +"%"
    arrConvert();}    
    
//^TRANSPOSE FUNCTIONS====================================================AAA
function lineTranspose(line,steps){//^ transpose entire line and try to keep the absolute chord spacing despite differnces in chr of new chord
    var lineNew;
    if (steps===0){
        lineNew = line;}
    else{   //^ set up constants
        var chordNew ="";
        var chord =""; //^ where chrs are collected until a space ends the chord
        var adj = 0;  //^ how the length of the new line compares to old (- shorter  + longer) so spaces can be added (ex 3 would mean new line is 3 chr to long and 3 spaces should be take out asap)
        lineNew= "";
        var n=0;
        while (n < line.length){//^ step through the line
            if (line[n]==" "){
                if (chord.length ===0){//^ not working a chord so work space
                    if (adj > 0){
                        adj = parseInt(adj -1,10);}
                        //^ dont add the space and take adjustment down one...
                    else{
                        lineNew = lineNew + " ";}}
                else{//^ closing a chord with the space
                    chordNew = chordTranspose(chord,steps);
                    adj = adj + (chordNew.length - chord.length);//^ set adjustment
                    if (adj < 0){
                        while(adj < 0){
                            adj = adj+1;
                            chordNew = chordNew +" ";}}
                    lineNew = lineNew + chordNew  + " ";
                    chord ="";//^ reset for another chord
                    chordNew ="";}}
            else{
                chord = chord + line[n];
                if (n==line.length-1){//^ end of the line but no space to change
                    lineNew = lineNew + chordTranspose(chord, steps);}}
            n=n+1;}}
    return lineNew;}

function chordTranspose(chord,steps){
    var chordNew ="";      
    if (steps===0) {
        chordNew = chord;}
    else{
        var n=0;
        chord = chord.replace(/A#/g,"Bb");//^ purge odd chords
        chord = chord.replace(/B#/g,"C"); 
        chord = chord.replace(/Cb/g,"B");
        chord = chord.replace(/Db/g,"C#");
        chord = chord.replace(/D#/g,"Eb");
        chord = chord.replace(/Fb/g,"E");
        chord = chord.replace(/E#/g,"F");
        chord = chord.replace(/Gb/g,"F#");
        chord = chord.replace(/G#/g,"Ab");
        for (n=0; n < chord.length;){
            var advance =1;
            if (chord[n]=="A"|chord[n]=="B"|chord[n]=="C"|chord[n]=="D"|chord[n]=="E"|chord[n]=="F"|chord[n]=="G"){
                if (n < chord.length-1 &&(chord[n+1]=="#"|chord[n+1]=="b")){//^ if not at the end of the chord check for next part of note
                    chordNew = chordNew + noteTranspose(chord[n]+chord[n+1],steps);
                    advance =2;} //^ increment the count since you used 2 chrs
                else{
                    chordNew = chordNew+ noteTranspose(chord[n],steps);}}
            else{
                chordNew = chordNew+chord[n];}
            n = n+advance;}} 
    return chordNew;}

function noteTranspose(note,steps){//^ must be sure to add # or b beforce calling the routine  
    var noteNew = "?";
    var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab";
    var arrScale=scale.split(",");  //^ make array
    note = note.replace(/A#/g,"Bb");
    note = note.replace(/B#/g,"C"); 
    note = note.replace(/Cb/g,"B");
    note = note.replace(/Db/g,"C#");
    note = note.replace(/D#/g,"Eb");
    note = note.replace(/Fb/g,"E");
    note = note.replace(/E#/g,"F");
    note = note.replace(/Gb/g,"F#");
    note = note.replace(/G#/g,"Ab");
    for (i = 13; i < 38; i++) {//^  get the position of the first letter starting at 13 and work up
        if (arrScale[i] == note){break;}}//^ get the current note position
    noteNew = arrScale[i+steps];
    if (KEY=='N'){
        if (noteNew=='A') {noteNew='1';}
        else if (noteNew=='Bb') {noteNew='2b';}
        else if (noteNew=='B') {noteNew='2';}
        else if (noteNew=='C') {noteNew='3b';}
        else if (noteNew=='C#') {noteNew='3';}
        else if (noteNew=='D') {noteNew='4';}
        else if (noteNew=='Eb') {noteNew='5b';}
        else if (noteNew=='E') {noteNew='5';}
        else if (noteNew=='F') {noteNew='6b';}
        else if (noteNew=='F#') {noteNew='6';}
        else if (noteNew=='G') {noteNew='7b';}
        else if (noteNew=='Ab#') {noteNew='7';}
        else {noteNew='??';}}
    return noteNew;}

//**NAVIGATION FUNCTIONS ===========================================
//function editor(){window.open(encodeURI("editor.html?"+(encodeFredComponent(ARRlines.join("\n")))));}//^ WORKS ON WICKED GAME

function printContent(){
    var x=document.getElementById('content').innerHTML;
    x="<X100>"+TITLE+"<br>"+listChords()+"</X100><br>"+x.replace(/<br>/g, "");
    var win = window.open("", "Title", "toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
    win.document.body.innerHTML = x;}
    
function notes(){
    window.open(encodeURI("notes.html?"+encodeFredComponent(ARRlines.join("\n"))+"?"+encodeFredComponent(TITLE)));}

function home(){window.open("index.html");}

function history(){window.open("player.txt");} 

function iRealLink(){if(confirm('ifthis computer has Ireal Pro installed press OK.\n Otherwise; Cancel this operation to see the Ireal Text file.')==true){window.open(IRB);}}

function fileMaster(){window.open("FileMaster.html");}

//**ANALYSIS FUNCTIONS==================================================
//^ perform general functions and can be adapted to different screens 
function analizeSong(){
    var str = "TITLE: "+ TITLE+ " (SOUND MODE: " + SOUNDmode +")";
    str = str +"<br>PLAYLIST: "+ SETname +"<br>=======================";
    str = str +"<br>KEY: "+ KEYbase + " (Transposed to " + KEY +")";
    str = str +"<br>TIME SIG: "+ BEATS  + "<br>MEASURES : "+ MEASURES +"<br>BARS: "+ BARS +" (half Bars:"+BARShalf+")<br>TEMPO: "+ BPM +" BPM" + "<br>QUALITY: "+ QUAL; // + "<br>ARTIST: "+ ARTIST;
    str = str +"<br>GENRE: "+ GENRE  + "<br>STYLE: "+ STYLE +"<br>ARTIST: "+ ARTIST;
    str = str +"<br>HIT YEAR: "+ HITyear;
    str = str +"<br>======================<br>DURATION: "+ DUR+ " ("+secToMin(DUR)+ ")<br>DUR SOURCE: "+ DURsource; 
    str = str +"<br>   DUR CALC: "+ DURcalc + " (" + secToMin(DURcalc)+ ") 100%";
    str = str +"<br>   DUR FILE: "+ DURtext + " (" + secToMin(DURtext)+ ")" + parseInt(DURtext*100/DURcalc,10)+"%" ;
    str = str +"<br>   DUR MP3: "+ parseInt(DURmp3,10) + " (" + secToMin(DURmp3)+ ")"+ parseInt(DURmp3*100/DURcalc,10)+"%";
    str = str +"<br>======================<br>TECHNICAL INFO";
    str = str +"<br>   ASPECT RATIO: "+ parseFloat(1/RAT);
    str = str +"<br>   LONGEST LINE: "+ LONGLINE + " charcters";
    str = str +"<br>   PRE-SONG LINES: "+ PRESONGlines + " lines";
    str = str +"<br>   CHORD LINES: "+ CHORDlines + " lines";
    str = str +"<br>   WINDOW HT: "+ WINDht + "px (" + parseInt(100*WINDht/PAGEht,10)+")%";
    str = str +"<br>   DOCUMENT HT: "+ PAGEht+ "px";
    str = str +"<br>   SCROLL PIX: "+ SCROLLpix+ "px";
    str = str +"<br>   TUNE SCROLL PIX: " +document.getElementById('Tune').scrollHeight + "px"
    str = str +"<br>   CONTENT SCROLL PIX: " +document.getElementById('content').scrollHeight + "px"
    str = str +"<br>   WINDOW WIDTH: "+ WINDwt + "px";
    
    str = str +"<br>   SCROLL RATE: "+ parseInt(SCROLLkon,10) + " micro-sec/pixel";
    
    
    str = str +"<br>   SCROLL POSITION: " + document.getElementById("Tune").scrollTop +"px";
    str = str +"<br>======================<br>CHORDS<br>" + listChords() +"<br>=======================================END=======================================<br>";
    return(str);}

function lyricLineCount(){
    var count =0;
    var i=0;
    while (i < ARRlines.length) {
        if(lineType(ARRlines[i])== "lyric"){count++;}
        i++;}    
    return count;}

function getRevisonHistory(){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    path ="player.txt";
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); }

function getHelpFile(){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    path ='HelpText.txt';
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); } 

function getHelpIndex(){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    path ="HelpIndex.html";
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); }

function displayHelp(path){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    document.getElementById('helpText').innerHTML= "<pre>"(request.responseText)+"</pre>"; }

function chordLines(){//^ Common Lyic
    var i=0;
    var a =0;
    while (i < ARRlines.length){
        if(lineType(ARRlines[i]) == "chord"){
            a = a + 1;}
        i++;}    
    return a;}
    
function isHeader(str){ //^ look for header string reguardless of case
    var ans = false;
    var flag = (str.substring(0,5).toUpperCase());
    if(flag =="VERSE"|flag =="#VERS"|flag =="CHORU"|flag =="#CHOR"|flag =="BREAK"|flag =="#BREA"|flag =="INTRO"|flag =="#INTR"|flag =="OUTRO"|flag =="#OUTR"|flag == "#BRIDG"|flag == "#BRID"|flag == "#TURN "|flag == "#TURN"){ans =true;}
    return ans;}

function countChr(str,chr){//^ counts chr in a string
    var i = 0;
    var count =0;
    while (i<str.length){
        if(str[i]==chr){count++;} 
        i++}
    return count;}
    
function listChords(){//^ list of chords used. if the std format is followed
    var arrChords = ARRlines;
    var str ="";
    j = 0;
    while (j<arrChords.length){
    if(lineType(arrChords[j])=='chord'){
        if(TRANSPOSE !== 0){arrChords[j] = lineTranspose(arrChords[j],TRANSPOSE);}
        str = str +arrChords[j];}
        j++;}
    str=str.replace(/~/g," |");
    arrChords=str.split("*"); str = arrChords.join(""); // kill *
    arrChords=str.split("||");str = arrChords.join("@");
    arrChords=str.split("|%");str = arrChords.join("");
    arrChords=str.split("| ");str = arrChords.join("");
    arrChords=str.split("@");str = arrChords.join("|");
    arrChords=str.split("|NC");str = arrChords.join("");
    arrChords=str.split("^");str = arrChords.join("");
    str=str.replace(/ /g,"");
    str =str.substr(1);
    arrChords=str.split("|");
    str= unique(arrChords).join(" - ");
    return str;}

function firstLineValues(type){//^ creates first line defaults then modifies using ARRlines[0]
    //^ Gets the 3 critical fields from a first line hash
    BPM =120; BEATS =4; KEY ="C";//^ set defaults
    if(lineType(ARRlines[0])=='hash'){//^ if type is array and hash exists
        TITLE = decodeURI(hash(ARRlines[0],"TITLE",TITLE));
        DURtext = hash(ARRlines[0],"DUR","");
        BPM= hash(ARRlines[0],"BPM",BPM);
        BEATS = hash(ARRlines[0],"BEATS",BEATS);
        KEY = hash(ARRlines[0],"KEY",KEY);
        if(KEY===0 |KEY=="0") {KEY="C";}//^ zzzdont know where the 0 comes from but trapped here
        QUAL = hash(ARRlines[0],"QUAL",QUAL);
        if(QUAL !=="Inwork"&QUAL !=="Verified"&QUAL !=="Complete") {QUAL ="Raw";}
        if(QUAL=='Inwork'){STARS=2}if(QUAL=='Preliminary'){STARS=3}else if(QUAL=='Verified'){STARS=4}else if(QUAL=='Complete'){STARS=5}else{STARS=1}
        GENRE  = hash(ARRlines[0],"GENRE","Unknown");
        STYLE = hash(ARRlines[0],"STYLE","Unknown");
        HITyear = hash(ARRlines[0],"HITyear","Unknown");
        ARTIST = hash(ARRlines[0],"ARTIST","Unknown");}}
        
//FILE FUNCTIONS===============================================AAA
function setUpListener(){document.getElementById('fileinput').addEventListener('change', loadFile, false); }//should be renamed here and html

function loadFile(e){//gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
    readSingleFile(e); //gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
    setTimeout(function(){createARRlines(RAWtune);document.getElementById('myTune').innerHTML=TITLE;barSelect();},2000);} 

function readSingleFile(e){
    statusMsg('Reading file','yellow');
    file = e.target.files[0];
    if(!file){ alert("No Valid File...");return;}//incase no file
    var reader = new FileReader();
    reader.onload = function(e){
        RAWtune = e.target.result;//is program specific
        TITLE = (file.name.substring(0,(file.name.length)-4));};
    reader.readAsText(file);}
    
//^LYRIC COMMON FUNCTIONS==================================================These functions are general utility
//APPLICATIONS=======================================================AAA
function barSelect(bar){   
    if(bar=='none'){statusMsg("All toolbars closed");}
    var arrBar="configuration,information,tool,songBar2".split(",");//cloud,
    var j=0;
    while (j<arrBar.length){   
        if(bar==arrBar[j]& document.getElementById(arrBar[j]).style.display==='none'){
            dis(arrBar[j],'block');
            statusMsg("The "+ bar.toUpperCase()+ " BAR Opened...")
        }else{
        dis(arrBar[j],'none');    
        }
        j++;
    }    
}
  
function triviaNotes(){return  "<center>" +TITLE.toUpperCase() +"<br>ARTIST: "+ARTIST+" < > HIT YEAR; " +HITyear +"</center><br>" +NOTEtrivia;}

function playlistNotes(){ return  "<center>" +TITLE.toUpperCase() +"</center>@" +NOTEset;}

function clockRun() {
    if (CLOCK === true) {
        dis('clock', 'block')
        var today = new Date();
        var h = today.getHours();
        var x = "AM";
        if (h > 11) {
            x = "PM";
        }
        if (h > 12) {
            h = h - 12;
        }
        var m = today.getMinutes();
        if (m < 10) {
            m = "0" + m;
        }
        document.getElementById('clock').innerHTML = "<X12>" + h + ":" + m + x + "</X12>";
        TIMEOUTclock = setTimeout(function() {
            clockRun();
        }, 10000);
    } else {
        clearTimeout(TIMEOUTclock);
        dis('clock','none');
    }
}

function printFormat(){
    var pf='';
    var j=0;
    var end = parseInt(ARRlines.length-1,10);
    while (j<end){
        pf =pf +"\n"+ ARRlines[j];
        j++;}
    return pf;}

function portraitWarning(){if(window.innerHeight>= window.innerWidth){alert("ROTATE YOUR DEVICE...");}}

//*GLOBAL FUNCTIONS Used from any screen ===============================================AAA
function fileFromPath(path){
    path = path.split('/');return (path[path.length-1]);}

   
function statusMsg(msg,bgcolor,marq){// COLOR SCHEME: light grey=normal;red=problem ;yellow-pause or inwork; green=Ready
    if(msg===null||msg==='' || msg===" ") {msg = "ERROR: No Status Message Passed";}
    if(STATUSmon>0) {
        if(ARRstatusLog.length>LOG){ARRstatusLog.pop()}
        if(bgcolor==0){ARRstatusLog.splice(0,0,stdTime("",true)+"       <X8>"+msg+"</X8>");}
        else{ARRstatusLog.splice(0,0,stdTime("",true) +"  <X1>"+msg+"</X1>");}}
    if(STATUSmon>1){    
        document.getElementById('bootText').innerHTML="<pre>"+ARRstatusLog.join('<br>')+"</pre>";}    
    if(bgcolor==0) {return}
    sm2(msg,bgcolor,marq);}    

function sm2(msg,bgcolor,marq){
    var clr="black";
    if(msg===null){msg="*"+MSGlast;}
    else{MSGlast = msg;}
    if(document.getElementById('splash').style.display=="block") {bgcolor = "transparent"}
    else if(bgcolor == "black"|bgcolor == "red"|bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr = 'white';}
    else if(bgcolor == "yellow"){clr = 'red';}
    else{bgcolor = 'lightgrey';}//default
    if(marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";bgcolor='yellow'}
    document.getElementById("msg").style.color = clr;
    document.getElementById("msg").style.backgroundColor = bgcolor;
    document.getElementById("msg").innerHTML = msg;} 

function secToMin(sec){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ XXX this sucks
    var m =parseInt((sec/60),10);
    var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
    if(s < 10) {s = ":0" + s;}else{s = ":" + s;}
    return m+s;} 

function hash(hashString,key,defaultVal){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ Gets hash values from string a:b,c:d,e:f,......
    var arrHash = (hashString.split(",")); //^  an array from hashString   
    var i=0;
    while (i < arrHash.length){
        var ele=(arrHash[i].split(":"));//^ Hash4 an array of the first element of Hash3
        if(ele[0] == key){
            defaultVal = ele[1];
            i = arrHash.length;} //^ kick you out must be a better way
        i++;}
    return defaultVal;}

function dis(id,disp){
    if(disp===undefined){
            if(document.getElementById(id).style.display == NONE){
                document.getElementById(id).style.display='block';}
            else{document.getElementById(id).style.display=NONE;}}
        else{
            if(disp=='none') {
                document.getElementById(id).style.display = NONE;}
            else{document.getElementById(id).style.display = 'block' ;}}}

function zin(id,zind){document.getElementById(id).style.zIndex = zind;}

function vis(iconID,style){
    if(style===undefined){
        if(document.getElementById(iconID).style.visibility =='visible') {
            style='hidden';}
        else{
            style='visible';}}
    document.getElementById(iconID).style.visibility =style;}
    
function receiveARR(divider,keepName) {//decode array (or string) and leading elements (put in receiving page)
    var oldName=window.name;
    var data;
    if(divider===undefined)//recieve a string
        {data=decodeURIComponent(decodeFredComponent(window.name));}
    else//receive and array
        {data=decodeURIComponent(decodeFredComponent(window.name)).split(divider);}
    if(keepName===true|keepName===undefined|keepName===''){window.name=oldName;}
    return  data;}

function passARR(pageName,arr,divider,leadingElements){//take data, array or string and pass to another page//if its an array it you must use a divider (i.e. '\n')
    var pf;
    if(Array.isArray(arr)===true){pf=arr.join(divider);}else{pf=arr;}
    if(leadingElements!==null){pf=leadingElements+divider+pf;}
    //window.open(pageName,encodeURI(encodeFredComponent(pf)));
    window.open(pageName,encodeURI(encodeFredComponent(pf)),"toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
    dis('prntType','none')}

function encodeFredComponent(str){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ encodes problem char (?,@)
    str=str.split("?");
    str=str.join("QMARK");
    str=str.split("@");
    str=str.join("AMARK");
    return str;}

function decodeFredComponent(str){ //grey-normal;red-attention Required ;yellow-normal pause or inwork//^ decodes problem char (?,@)
    str=str.split("QMARK");
    str=str.join("?");
    str=str.split("AMARK");
    str=str.join("@");
    return str;}
    
function lineType(str){   
    var ans ="lyric";
    if((str.substring (0,7)).toUpperCase()=="IREALB:"){ans = "irealb";}    
    else if(str.substring (0,4)=="http")  {ans = "link";}
    else if(str.substring (0,3)=="@@@")  {ans = "noteTech";} 
    else if(str.substring (0,2)=="@@")  {ans = "noteTriv";}
    else if(str.substring (0,1)=="@")  {ans = "note";}
    else if(str.substring (0,1)=="#") {ans = "header";}
    else if(str.substring (0,1)=="$") {ans = "spacer";}
    else if(str.search(":")>-1) {ans = "hash";}
    else if(str.indexOf("|") >-1){ans ="chord";}
    return ans;}
    
function longestLine(){
    var count =0;
    var i=0;
    while (i < ARRlines.length){
        var ltype = lineType(ARRlines[i]);
        //if (ltype == "chord" | ltype == "lyric"| ltype == "note"| ltype =="header"){
        if(ltype == 'lyric'|ltype=='chord'){
            if(ARRlines[i].length > count){count = ARRlines[i].length;}}
        i++;}    
    return count;}
    
function stdTime(androidTime,sec){//returns hh:mm:ss with AM or PM
    var s=0;
    var h=0;
    var m=0;
    var x ="AM";
    var st;
    if(androidTime===null|androidTime===undefined|androidTime===""|androidTime===" ") {
        var today = new Date();
        h=today.getHours();
        m=today.getMinutes();
        s=today.getSeconds();}
    else{
         return androidTime;}
    if(h>11) {x="PM";}
    if(h>12) {h=h-12;}
    if(m < 10) {m = "0" + m;}
    if(sec===true){//if you want seconds
        if(s < 10) {s = "0" + s;}
        m=m+":"+s;}
    st=(h + ":" + m+x);
    return st;}


function barsClear() {
    for (i = 0; i < ARRbars.length; i++) {
        var bar = 'b' + i;
        document.getElementById(bar).style.backgroundColor = 'transparent';
    }
    statusMsg("ALL BARS: " + BARS + " cleared..", 0)
}

//*DEVELOPER FUNCTIONS ===================================================================
function statusMonitor(m) { //set the statusMonitor function
    var line = ""
    if (m === 0) {
        line = "<X2>Debug Log Deactivated==================</X2>";
        document.getElementById('imgDebug').src="../../Icons/off.png"
        dis('statusWindow', 'none');
        dis('bug', 'none');
    }
    if (m === 1) {
        dis('statusWindow', 'none');
        document.getElementById('imgDebug').src="../../Icons/bugButton.jpg"
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Hidden============</X2>";
    } else if (m === 2) {
        document.getElementById('imgDebug').src="../../Icons/bugButton.jpg"
        dis('statusWindow', 'block');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Displayed=========</X2>";
    }
    STATUSmon = m;
    statusMsg(line, 0);
}
function monitorWindow() {
    dis('statusWindow');
    if (document.getElementById('statusWindow').style.display === 'block') {
        statusMonitor(2);
        document.getElementById('bootText').innerHTML = "<pre>" + ARRstatusLog.join('<br>') + "</pre>";
    } else {
        statusMonitor(1)
    }
}
function setMonitor() {
    if (STATUSmon === 0) {
        statusMonitor(2)
    } else {
        statusMonitor(0)
    }
}
function debugResize() {
    arr = ("20%,40%,60%,80%,20%").split(',');
    for (n = 0; n < 5; n++) {
        if (document.getElementById('statusWindow').style.width <= arr[n]) {
            document.getElementById('statusWindow').style.width = arr[n + 1];
            document.getElementById('bug').style.left = arr[n + 1]
            n = 5
        }
    }
}

function bugButton(but) {
    var output = ""
    if (but === 'Scroll') {
        output = 'BPM: ' + BPM + '  BARS:' + ARRbars.length + ' (' + BARShalf + ' half bars)\nMEASURES: ' + MEASURES + ' at ' + BEATS + ' beats per Measure = ' + BEATS * MEASURES;
        output = output + ' Total Beats\nDUR: ' + DUR + ' seconds  Duration Source: ' + DURsource + '\n'
        output = output + 'Scroll Time: ' + parseInt(1000000 * document.getElementById('Tune').scrollTop / SCROLLpix, 10) / 10000
        output = output + '%  Scroll Top: ' + document.getElementById('Tune').scrollTop + ' of ' + SCROLLpix + '\n'
        output = output + 'Track  Time: ' + parseInt(1000000 * document.getElementById('Audio1').currentTime / DURmp3, 10) / 10000 + '%  Current Seconds: ' + document.getElementById('Audio1').currentTime + ' of ' + document.getElementById('Audio1').duration + ' '
    }
    if (but === 'ARRbars') {
        output = ARRbars.join(',');
    }
    output = but + "----------\n" + output+"\n"+but + "^^^^^^^^^^^^^^\n"
    document.getElementById('devText').innerHTML=output;dis('devText','block');
}
//*BOGUS FUNCTIONS===========================================================
function sleep(mSec) {//stops execution experimental
    statusMsg('<X2>SLEEPING for '+mSec + 'milliseconds</X2>')
    var currentTime= new Date().getTime();
    while (currentTime + mSec >= new Date().getTime()){}}

function badCode(){alert(parseInt(23/0,10))}//

function bogus() {flash("QUALITY: "+ QUAL,3);blinker("msg",5);}

//*INWORK FUNCTIONS===========================================================
function countBARS(){
    ARRbars.length=0;
    BARS=0;
    BARShalf=0;
    BARSperLine=0;
    CHORDlines=0;
    var count=0;
    var typ;
    var sum=0
    var j =0;var k=0//ARRbars="".split(',')
    while(j<ARRlines.length){// go through the array 
        var line = ARRlines[j];
        if(lineType(line)=='chord'){
            CHORDlines=CHORDlines+1;
            for(k=0;k<line.length;k++){
                if(line.charAt(k)==="|") {
                    typ=1
                    if (line.charAt(k+1)==="*"){
                        typ =0.5;
                        BARShalf=BARShalf+1}
                    sum=sum+typ;
                    ARRbars.push(sum)
                    BARS=BARS+1;}}}
        j=j+1;}
    MEASURES=(BARS-BARShalf*0.5)
    if(CHORDlines>0){BARSperLine=BARS/CHORDlines;}
    statusMsg("MEASURES: "+MEASURES+" / BARS:"+BARS+" (Full:"+parseInt(BARS-BARShalf)+" & HALF:"+BARShalf+") CHORD LINES: "+CHORDlines+"   BARS/LINE: "+BARSperLine,0)}//get the std number of bars from the first line}


function rollMirror(tf){
    clearTimeout(TIMEOUTmirror);
    if(tf===true){
        if(MIRROR<3){
            document.getElementById('mirror').style.color='black';
            if(MIRROR===1){document.getElementById("mirror").innerHTML=BPM;document.getElementById('mirrorImage').src='../../Icons/transCircleGreen.png';}
            else if(MIRROR===2){document.getElementById("mirror").innerHTML=KEY;document.getElementById('mirrorImage').src='../../Icons/transCircleYellow.png';}
            else {document.getElementById("mirror").innerHTML=STARS;document.getElementById('mirrorImage').src='../../Icons/transCircleStar.png';}
            MIRROR++}
        else{
            MIRROR=0;
            document.getElementById('mirrorImage').src='../../Icons/'+SOUNDicon;
            document.getElementById('mirror').style.color='transparent';}
        TIMEOUTmirror=setTimeout(function(){rollMirror(true)},1000);}}

function setLineLimit(a){
    if (a===undefined) {LINElimit=LINElimit-5;}
    else{LINElimit=a}
    if(LINElimit<=25) {LINElimit=90;}
    document.getElementById('lineLimit').innerHTML=LINElimit;}

function breakLine(line) {
    //statusMsg("Formatting Fixed Font: " + line, 0)
    var last = 0;
    var newLine = "";
    var j;
    var end = false;
    var spaces = "";
    var lenIn = 200;
    var lenOut = 10
    while (lenOut < lenIn) { //kill double spaces
        lenIn = line.length
        line = line.split('  ').join(' ')
        lenOut = line.length
        //statusMsg(lenIn + ">>" + lenOut + "~~" + LINElimit, 0)
    }
    if (line.length <= LINElimit) {
        newLine = line
    } else {
        j = parseInt(lenOut * 0.5, 10) - 2
        while (line.substring(j - 1, j) !== " ") {
            j = j - 1;
        }
        newLine = line.substring(0, j)
        var space = LINElimit - line.substring(j, line.length).length;
        for (k = 1; k < space - 2; k++) {
            spaces = spaces + " "
        }
        newLine = newLine + "<br>" + spaces + line.substring(j, line.length)
    }
    return (newLine);
}
  
function opacSet(id,opac){if(opac===undefined |opac===null|opac>1){opac=1};document.getElementById(id).style.opacity=opac}//set opacity


