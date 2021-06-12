//CODING TAGS
//.@ DEAD/OBSOLETE....Delete when safe
//.$ Under Development (see SHIT)================
//.## MAJOR SECTION==============================
//.#      Subsection=============================
//.? WTF=========================================
//^  Trailing note (AFTER text)==================

/*  TO RELEASE THIS AS THE NEXT STABLE REVISION
      1: DO NOT CHANGE THIS FILE UNTIL THE LAST STEP!
      2: Copy the old NextPlayer.js and NextPlayer.html into a directory "NP-?" where ? is the current Revision (ie "NP-7)for BACK-UP and history's sake
      3: MAKE A COPIES OF THIS FILE(NextPlayerX.js) AND NextPlayerX.html that replace the old NextPlayer.js and NextPlayer.html 
      4: Make the changes in lines marked $$$$ to the NextPlayer files
      5: Test the new NextPlayer files
      6  FINALLY Change the revision of NextPlayerX to the new rev (i.e. "var REV ="8.0")
*/
//.## GLOBAL VARs
//.#      FLAGS
    var ALT=false;//^ alternate song
    var AUDfail=false;
    var AUDend=false;
    var BOOT=true;//^ used to do setup on boot
    var NASH=false;//Nashville notation????incomplete...
    var SETnoteViewed=false;//used to keep not from popping up AWK
//.#      PROGRAM and SONG VARS
    var ARRtitle;
    var ARRsoundModes=("SILENT/nBACK TRACK/nCLICK TRACK/nDRUM ROCK/nDRUM COUNTRY").split("/n");
    var DUR=120;//^ Duration for scrolling and calculating
    var DURsource='Default';//^ string where the program got the duration
    var DURcalc=0;//^ Calculated duration based on Bars/Beats/time signature
    var DURmp3=0;//^ used on scroll(default=  DURfile, DURcalc, DURmp3, User Input)
    var KEYlast='C';
    var KEYbase="X";//^ anchor for changeing keys on the fly
    var PREVtitle;//previous Title
    var LINElimit=90//^most charcters per line
    var LONGLINE=50;
    var MIRROR=0;
    var TRANSPOSE=0;//^ how many 1/2 steps to tranpose
    var SOUNDmodeDefault="SILENT";
    var SOUNDmode="SILENT";
    var SOUNDicon="transSilent.png";
    var TUNEnum=0;//^ Tune Number in setlist
    var TUNElast=0//^last tune
    var VOLdefault=(0.50);//^ absolute volume (0>1)
    var VOL=null
    var WARNING= "No Warnings!"
    var SONGsource="select"
//.#      SONG DATA AND PROPERTIES (passed)
    var RAWtune;//tune as read from file
    var ARTIST="Unknown";
    var ARRlines="";//^ Array of lines from text file
    var BARS=0;
    var BARSperLine;
    var BEATS=4;//^ Beats/bar
    var BPMfile=10
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
    var TITLEplus="Unknown";//^ used to pass info from a playlist i.e @Hallelluia/C#/70/BACK TRACK/starts
    var NOTEset;
    var NOTEtrivia;
    var NOTEtech;
    var NOTElinks;
//.#      SCROLLdata CONSTANTS
    var TOPlast;
    var SS=0;//Scroll Stopper...counts cylces of non scroll indicating end of tune
    var FONTSIZE= 2.5;//calculated size for the display 
    var CHORDlines=0;//^ how many lines are chord lines
    var PRESONGlines=0;//^ how many lines of text exist before first chord line
    var SCROLLbase;//^ Original SCROLLkon used to change scroll speed on the fly
    var SCROLLkon=0.01;// microseconds per pixel
    var SCROLLpix;//^ ScrollPixels from height of document;
    var POStrack=0//^ ScrollPixels from height of document;
    var POSscreen=0;//^ ScrollPixels from height of document;
    var SCROLLstartTime=0;//^ when scroll started, used to regulate scroll
    var Ypos=0;//^ Yposition of the scroll 0 being the top
    var Ystart=0;//^ where Y is when you start the scroll
    //var Xstart=0;//^ where Y is when you start the scroll
    var PAGEht;
    var TABwt;
//.#      TIMEOUT CONSTANTS
    var TIMEOUTblink;//^time for blinking display
    var TIMEOUTcrap;//^ do not clear this one
    var TIMEOUTdelay;//^ trackDelay delay the start of???
    var TIMEOUTfade;//^fade the sound
    var TIMEOUTnext; //^ for next tune
    var TIMEOUTscroll;//^ timeout for scrolling
    var TIMEOUTmirror;
    var TIMEOUTmet;
    var TIMEOUTwait; //Wait after scroll end before showing top Icons title etc
//.#      CONFIGURATION CONSTANTS
      //^             0        1          2        3   4    5     6     7         8        9         10        11      12         13       14     15     16  
    var ARRpresets="CAPS,FULLscreen,LEFTborder,CLOCK,TEXT,SHADE,NOTES,SETnotes,POPnotes,TECHnotes,LIVEnotes,COUNTin,BREAKlines,BIGchords,LOOPER,METRO,BARsync".split(',');
    var BACKdrop=false;
    var BARsync=false
    var BIGchords=true;
    var BIGchordSize=1.00;
    var BREAKlines=true;
    var COUNTin=false;
    var CAPS=true;
    var CLOCK=false;
    var CLOCKstart=0;
    var CLOCKstop=0;
    var ENDpause=false;

    var FULLscreen=false;
    var LEFTborder=false;
    var LINEnum=false;//^ show line numbers
    var LINEtime=false;//^ show min sec instead of line num
    var LINKnotes=false;
    var LIVEnotes=false;
    var NOTES=false;
    var POPnotes=false;
    var SHADE=false;//shade the screen
    var SOUND=true;
    var SETnotes=false;
    var TEXT=false;//reduce text size
    var TRIVIAnotes=false;
    var TECHnotes=false;
//.#      MISC CONSTANTS
    var ARRscale="A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab".split(",");
    var ARRsongSettings;
    var MSGlast="No Message...";
    var RAT=0.7; //^ Ratio WINDht/WINDwt
    var PLAYlist="X";//^ Array of songs in setlist
    var SETname="Single Tune";//^ default in case a list cannot be loaded
    var WINDht;//px window height
    var WINDwt;//px window width
//.#      LOOP VARIABLES
    var METRO=false;//metronome
    var MET;//METRO count
    var METRObpm;
    var METRObeats;
    var LOOPER=false;
    var LOOPon=false;
    var LOOPtop=0;
    var LOOPtopBU=0;
    var LOOPend=100000;
    var LOOPendBU=100000;
    var LOOPmode='repeated';
    var ENDscroll=false;
    var ENDaudio=false
//.#      PRESETS
    var ARRtf="true,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false".split(',');
    var PRESETno=0;
    var PRESET="Default Mode";
    var PRESETlock=false //force break in presets
    var BAR=0
    var BARShalf;
    var BARalign=0
    var BARSTOP=0
    var ARRbars =''.split(',');
    var ARRpx=''.split(','); 
//.#      STATUS LOG
    var LOG=640;//length of Log
    var ARRstatusLog="<pre><X2>=================DEBUG LOG=================</x2></pre>".split('@');
    var STATUSmode=1;//^sets the Debug mode, 0: do not Log / 1: log while hidden /2: log while visilble
//.#      TEMPO CONSTANTS 
    var TEMPO;
    var TEMPOstart=0;
    var TEMPOcount=0;
    var TEMPOtime=0;
    var TEMPOtimeLast=0;
//.#      MAP  CONSTANTS 
    var MAP=''.split(',');
    var MAPoffset=0;
//.#      MAIL  CONSTANTS 
   //var MAIL="";
   var BACKTRACK; //to try backtracks  
//.#      LOCAL STORGE CONSTANTS 
   var LOCALkey="TBD"
   var LOCALvalue="TBD"
//.#      SHIT CONSTANTS Permanent feature 
   var SHIT= false



//.## LOCAL STORAGE otherwise superfluous
function loadLocal(key){
   dis('localAction','block')
   refreshLocal()
}

function deleteLocal(){
   statusMsg("Deleted "+document.getElementById('keyLocal').value,0 )
   localStorage.removeItem(document.getElementById('keyLocal').value);
   statusMsg("Deleted Local Storage: "+LOCALkey,0 )
   refreshLocal()
}

function refreshLocal(idx) {
   dis('localAction','block')
   var str = ""
   for (i = 0; i < localStorage.length; i++) {
      str = str + "<option>" + localStorage.key(i) + "</option>"
      }
   str = str + "</select>"
   document.getElementById('selectLocal').innerHTML = str
   document.getElementById('selectLocal').selectedIndex=idx
   LOCALkey= document.getElementById('selectLocal').value
   document.getElementById('keyLocal').value=LOCALkey
   LOCALvalue= localStorage.getItem(LOCALkey);
   document.getElementById('keyLocal').value=LOCALkey
   document.getElementById('valueLocal').value= LOCALvalue
   document.getElementById('localAction').style.backgroundColor='lightgrey';
}

function saveLocal(){
   var update=document.getElementById('valueLocal').value
   //alert(document.getElementById('keyLocal').value +" > "+document.getElementById('valueLocal').value)
   
   localStorage.setItem(document.getElementById('keyLocal').value , update )
   statusMsg("Saved Local Storage: "+LOCALkey,0 )
   document.getElementById('localAction').style.backgroundColor='lightgrey';
   refreshLocal()
}

function dateLocal(){        
   var date = new Date();
   document.getElementById('localAction').style.backgroundColor='pink';
   document.getElementById('valueLocal').value=date;
}
 
function newLocal(){        
        var date = new Date();
        document.getElementById('localAction').style.backgroundColor='pink';
        document.getElementById('valueLocal').value="????";
        document.getElementById('keyLocal').value="????";
}

function listLocal() {
   var str = ""
   for (i = 0; i < localStorage.length; i++) {
      str = str +parseInt(i+1,10)+": " +localStorage.key(i) + " / "+localStorage.getItem(localStorage.key(i))+"<br>"
      }
    document.getElementById('cloudTitle').innerHTML="LOCAL STORAGE LIST:"
   document.getElementById('cloudX').innerHTML=str
   dis('cloud','block')
}


//.## MAIL

//.## MISC CRAP NOT LOCATED LOGICALLY
//window.onbeforeunload = function(e) {
   //if (localStorage.getItem('mail').length>5) {
   //   alert('YOU HAVE UNSENT MAIL')
 //     return 'UNSENT MAIL ';
 //  }else{return(null)}
//}



function mailTo(mode) {
   var entry = "";
   var stored = "";
   var val = ""
   msg = "Accessing mailer..."
   if (mode == 'open') {
      val = localStorage.getItem('mail')
      document.getElementById('mailerBody').value = val
      dis('mailer', 'block')
      msg = "Mailer opened..."
   }else if (mode == 'save') {
      val = document.getElementById('mailerBody').value
      if (val == null || val == '' || val == undefined||val.length<=2) {
         alert( "Mail is blank, Cannot save that...");
         document.getElementById('mailerBody').value = ""
         localStorage.setItem('mail','')
      msg('Cant save empty draft of mail...')
      } else {
         document.getElementById('msg').style.width = "96%";
         localStorage.setItem('mail', val);
         msg='Mail Draft saved...'
      }
   }else if (mode == 'close') {
      dis('mailer', 'none');
      msg = 'Mail closed...';
   } else if (mode == 'title') {
      entry = TITLE + ":";
   } else if (mode == 'info') {
      var pct = document.getElementById("Tune").scrollTop / SCROLLpix;
      var time = parseInt(pct * DUR, 10);
      entry = TITLE + ": [" + time + " seconds {" + parseInt(pct * 100, 10) + "%}]  (" + SETname + ")";
   } else if (mode == 'key') {
      entry = TITLE + ": Key(Base)=" + KEYbase + ": now =" + KEY;
   } else if (mode == 'tempo') {
      entry = TITLE + ": Tempo now " + BPM;
   } else if (mode == 'set') {
      entry = TITLE + ": Set=" + SETname;
   } else if (mode == 'hilite') {
      entry = TITLE + ":\nSelected Text----------------------------------\n" + getSelectionText() + "\n----------------------------------------------";
   } else if (mode == 'restore') {
      entry = localStorage.getItem('sentMail')
   
   
   }else if (mode == 'delete') {
      if (confirm('PERMANENTLY delete Your eMail draft') === true) {
         document.getElementById('mailerBody').value = ""
         localStorage.setItem('mail',"");
         msg = "eMail Deleted."
         document.getElementById('msg').style.width = "100%";
      } else {
         msg = "eMail retained."
      }
   }else if (mode == 'send') {
      localStorage.setItem('sentMail', document.getElementById('mailerBody').value);
      window.open("mailto:fkaparich@gmail.com?subject=From PERFORMER MAIL&body=.............Start of Mail..................%0A" + localStorage.getItem('mail').replace(/\n/g, '%0A') + "..................End of Mail..................");
      localStorage.setItem('mail', "");
      document.getElementById('mailerBody').value="";
      dis('mailer', 'none');
      document.getElementById('msg').style.width = '100%';
      msg = "SEND THE MAIL (Mailer has been cleared!)";
   }
   if (entry != "") {
      localStorage.setItem('mail',localStorage.getItem('mail')+entry+"\n" );
      document.getElementById('mailerBody').value = localStorage.getItem('mail')
      msg = "Email: "+mode
   }
   statusMsg(msg, "yellow")
}

//.## MISC
function getSelectionText() {// Gets higlighted section class?
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function rTrim(str){
   while (str.substring(str.length-1)==" "){str = str.substring(0,str.length-1);}
   return str;
}

function iconize(icon,fontsize){// put an icon.png in text line
   if (icon==''|icon==undefined) {icon='transRedCircle'}
   if (fontsize==''|fontsize==undefined) {fontsize=FONTSIZE}
   return  "<img src=\'../../Icons/"+icon+".png\' alt =\'?\' style=\'position:absolute;width:"+FONTSIZE+"\'>"
}

//.?
function localFile(desc, loc, web) {
   var a = '<!DOCTYPE html><head></head><body>'
   var x = window.open("", "", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + parseInt(WINDwt / 2, 10) + ", height=" + parseInt(WINDht / 3, 10));
   a = a + '<b>' + desc + '</b>';
   a = a + "<br><br><a href=\'" + web + "\'>INTERNET LINK (Click Here...)</a>";
   a = a + '<br><br>To View the Local File, (If it is on your on YOUR Machine)...<br>--PASTE the string below into Address Bar...'
   a = a + "<br>--<a href=\'" + loc + "\'>" + loc + "<br>"
   a = a + "</body></html>";
   x.document.write(a)
   x.document.close
}


//.## BACTRACK FUNCTIONS
function btInst() {
    var a = "BACKTRACK INSTRUCTIONS\n";
    a = a + "1) Select a song in with Backtrack in \'Backtrack Mode\'...\n";
    a = a + "2) The Default measurement is automatic...\n";
    a = a + "3) Analyize the 'Map' and look at the Quality (Color Coded: Excellent,Good,Marginal,Sucks) \n";
    a = a + "4) Verify average Tempo in C by Taking 3 measurements of Tempo (start,middle,end) and make sure it is logged correcly\n";
    a = a + "5) Put your best measurement in the yellow input box and re-evaluate\n";
    a = a + "6) To Get an acceptable reading change the length of the MP3 or put the correct number of bars in the song text\n";
    a = a + "7) Be sure to add any intro bars to the start of the song and the correct number of hold bars at the end ";
    alert(a)
}

function btAnal() {
    var deltaDur
    var bars
    var ans
    deltaDur = document.getElementById('btMdur').innerHTML - MEASURES * BEATS * 60 / document.getElementById('btTempo').value
    bars = document.getElementById('btMdur').innerHTML * document.getElementById('btTempo').value / (BEATS * 60);
    ans = "<pre>Measured tempo and backtrack duration indicate:" + bars + " MEASURES\n=================\n"
    ans = ans + "Your file has " + MEASURES + " MEASURES\n=================\n"
    ans = ans + "MP3 duration is off by " + deltaDur + " seconds\n=================\n"
    ans = ans + "OR by " + parseFloat(MEASURES - bars, 10) + " Measures</pre>"
    document.getElementById('eval').innerHTML = ans;
}

function d(id) {//shortcut for a common piece of code
   return (document.getElementById(id))
} 

function songMap() {
    countBARS();
    d('map').innerHTML = '<pre>' + MAP.join('-') + '</pre>';
    var barZero = 0;
    var barLen = SCROLLpix / MEASURES;
    var fact = parseFloat(barZero / BAR, 10);
    var pct = parseFloat(barZero * 100 / BAR, 10);
    var tempoMp3;
    var col = 'white';
    var bgc = 'black';
    var qual="None";
    var err;
    //File
    d('btTitle').innerHTML = TITLE;
    d('btFbpm').innerHTML = BPMfile;
    d('btFbars').innerHTML = BARS;
    d('btFmeas').innerHTML = MEASURES;
    d('btFdur').innerHTML = MEASURES * BEATS * 60 / BPMfile;
    //Measures and MP3
    d('btMbpm').innerHTML = (BEATS*MEASURES*60)/Audio1.duration
    d('btMmeas').innerHTML =MEASURES
    d('btMdur').innerHTML =Audio1.duration
    //TEMPO and MP3
    d('btTdur').innerHTML = Audio1.duration;
    d('btTmeas').innerHTML = (d('btTempo').value*Audio1.duration)/(BEATS*60)
    //TEMPO and MP3
    d('btRbpm').innerHTML = d('btMbpm').innerHTML -d('btTempo').value;
    d('btRmeas').innerHTML = d('btMmeas').innerHTML-d('btTmeas').innerHTML;
    d('btRdur').innerHTML = ((MEASURES * BEATS * 60) / BPMfile)-Audio1.duration
    err=Math.abs(d('btRmeas').innerHTML)
    if ( err<=0.5/BEATS) {
        bgc = 'gold';
        col='black' 
        qual="Excellent: ";
    }else if ( err<=1/BEATS) {
        bgc = 'green';
        qual="Good: ";
    }else if (err<=2/BEATS) {
        bgc = 'yellow';
        col='black';        
        qual="Marginal: "; 
    }else{bgc = 'red';
    qual="Timing Sucks: "}
    qual=qual+" Off by "+parseInt(err*BEATS*1000,10)/1000+ " beats over the Entire Song"
    d('trackQual').style.backgroundColor = bgc;
    d('trackQual').style.color = col;
    d('trackQual').innerHTML = qual;
}

//.## BOOT ROUTINE BOOT and embedded functions:   All in functions sequence with breaks between sub routines
window.onload = function() {
   var agent = (navigator.userAgent.split(')').reverse()[0].match(/(?!Gecko|Version|[A-Za-z]+?Web[Kk]it)[A-Z][a-z]+/g)[0])
   ARRstatusLog = ("================BOOTING in " + agent + "==================").split('-');
   statusMsg("PRESS ANY KEY or CLICK THE 'BUG' to monitor the boot...")
   document.getElementById("debugTrigger").focus();
   TIMEOUTcrap = setTimeout(function() {
      start();
   }, 1500);
}

function monitorBoot() { //initiated by the user at boot
    clearTimeout(TIMEOUTcrap);
    statusMonitor(2);
    statusMsg('Debug Mode; Initiated by User');
    start();
}

function start() {
    statusMsg("Initiating Javascript...");
    var arr;
    j = 0;
    clearTimeout(TIMEOUTcrap);
    document.getElementById('dubugSafety').focus();
    var lst = "<a style='text-align:center; width:100%'><a style='color:white;'>SOUND MODE</a><br><select id='soundSelector' style='background-color:white;color:black;font-size:2vw; width:100%' onchange='setSoundModeDefault(this.value)'>";
    while (j < ARRsoundModes.length) {
        lst = lst + "\n<option>" + ARRsoundModes[j] + "</option>";
        j++;
    }
    lst = lst + "\n</Select>";
    document.getElementById("soundBox").innerHTML = lst;
    arr = receiveARR(); //get an array if one is sent...*possible global
    if (arr ===undefined | arr ===null | arr ===''|arr.length<10) { //^ normal first time boot, no query string
        BOOT = true;
        statusMsg("No valid array passed to boot routine",0)
        createSetSelector();
    } 
    else {
      statusMsg("Song Recieved from the editor",0)
        BOOT = 'edit';
        ARRtitle = ("Passed From Editor").split(','); //Bogus title array
        createARRlines(arr);
    }
}

//.## SELECTORS
function createSetSelector() { //^creates an option box from the file SetList.txt in the top directory
    statusMsg("Creating Set Selector...");
    var content=getTextFile("SetList.txt")
    var sets = content.split("\n");
    var ihtml = "<a style='text-align:center; width:45vw;color:white'>PLAYLIST:</a><br><select id='Set' style='font-size:2vw' onchange='SETname=(this.value);selectPlaylist(this.value)'><option selected>ALL TUNES</option>";
    j = 0;
    while (j < sets.length) {
        if (sets[j].substr(0, 9)!= "ALL TUNES") {
            ihtml = ihtml + "\n<option>" + sets[j] + "</option>";
        }
        j = j + 1;
    }
    ihtml = ihtml + "\n</Select>";
    document.getElementById("setSelectA").innerHTML = ihtml;
    //if(PRESETlock!=true){selectPlaylist("ALL TUNES");} //^ default  USELESS???
    selectPlaylist("ALL TUNES");
}

function selectPlaylist(set) { //^ Selects your set by its name
    statusMsg('Selecting Playlist '+set,0);
    var content=getTextFile("../Sets/" + set + ".txt")
    SETname = set;
    PLAYlist = "";
    PLAYlist = content.split("\n");
    if (set == "ALL TUNES") {
        dis('abet', 'block');
    } else {
        dis('abet', 'none');
    }
    TUNEnum = 0
    createPlayListSelector();//the ARRAY of songs in the set should be playlist
}

function createPlayListSelector() {//^ creates the setlist option box and selects tune 0
   statusMsg('Creating PlayList Selectors ' + SETname, 0);
   statusMsg("Formating Small Playlist and Selecting Default Song...", "yellow");
/*$   if (BIGselect == true) {
      statusMsg("Formating BIG Playlist and Selecting Default Song:" + TUNEnum, "yellow");
      var i = 0;
      str = "<div id='BB'>"
      statusMsg(PLAYlist.length)
      while (i < PLAYlist.length) {
         str = str + "<div id='BS" + i + "' onclick=\"selectTuneNo(\'" + i + "\')\" style='position:relative;border:solid;height:5vh;line-height:110%;width:100%;overflow:hidden;font-size:4vh;'>" + (i + 1) + ":  " + PLAYlist[i].split('|')[0] + "</div>";
         i = i + 1;
      }
      str = str + "</div>"
      document.getElementById('BS').innerHTML = str
      document.getElementById("BS" + TUNEnum).style.color = 'red'
      document.getElementById('BSbutton').style.display = 'block'
   } else {
      document.getElementById('BSbutton').style.display = 'none'
   }
*/   
   var a;
   var lst = "";
   j = 0;
   while (j < PLAYlist.length) {
      a = (PLAYlist[j].split("|")[0]);
      if (a.substring(0, 1) == '@') {
         a = a.substring(1, a.length);
      }
      lst = lst + "\n<option value= '" + PLAYlist[j] + "'>" + a + "</option>";
      j++;
   }
   lst = lst + "\n";
   document.getElementById("mySet").innerHTML = lst;
   document.getElementById("mySet").selectedValue = TUNEnum;
   TITLEplus = PLAYlist[TUNEnum];
   PREVtitle = TITLEplus; //?.
   selectTune(TITLEplus);
}

 function selectTuneNo(i){
 statusMsg('Selecting tune by number: '+i) 
      if (i < 0 || i >= PLAYlist.length) {
         statusMsg("No Tune","red")
         return
      } 
 document.getElementById('mySet').selectedIndex=i
 var titl=PLAYlist[i]
 selectTune(titl)
 }


//.## GET SONG (by title etc)
function openSong() { //opens a song with title, if its on server, not on list
    statusMsg("Request Tune by exact Title... ", 0);
      SONGsource="request"
      dis('nextIcon','none')
      dis('nextIcon','none')
      selectTune(prompt("Please type the exact tune name", TITLE));

}

function selectTune(titl){
   /*TITLEplus is formated play info=@TITLE|KEY|BPM|SOUNDmode|NOTEset|volume (@ indicates alternate if its present)*/ 
  TITLEplus = titl;
  ARRtitle = titl.split("|");
   if (ARRtitle[0].substr(0, 1) !== "@") {
      TITLE = ARRtitle[0];
      ALT = false;
   } else {
      ALT = true;
      TITLE = ARRtitle[0].substr(1);
   }TITLE=TITLE.replace(/(\r\n|\n|\r)/gm,"");//strip all line feeds
   statusMsg("Selected: "+TITLE)
   TUNEnum= PLAYlist.indexOf(TITLEplus);
   dis('backtracker', 'none'); //SIMPLIFY
   document.getElementById("mySet").selectedIndex=TUNEnum;//set the std selector
   document.getElementById('myTune').innerHTML = TITLE; //?. What is my tune??
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
   if (ARRtitle[5] !== undefined & ARRtitle[5] !== "") {
      VOL = ARRtitle[5];
   } else {
      VOL = VOLdefault;
   }
   if (PRESETlock != true) {
      loadServerTitle();
   }
}

//.#      LOAD FROM SERVER
function loadServerTitle() {
   statusMsg("Loading Song by"+TITLE);
   KEYbase = "X";
   document.getElementById('key2').innerHTML = "-";
   document.getElementById("title").innerHTML = TITLE; //^ put title on tab...
   TRANSPOSE = 0;
   CTO();
   ARRlines = "";
   screenFormat("Think", "transArrowDown.png");
   var content=getTextFile( "../Text/" + TITLE + ".txt")
   var n = content.search("404");
    if (n > 0) { //^ XXX unverified through all cases of next tune
        if (TITLE=="NOTE") {
            arr=TITLEplus.split('|')
            content="<div style='text-align:left;color:black;'><br><br><br>NOTES: "+SETname+"<br>========================";
            for (n=1;n<arr.length;n++){
                content=content+"<br> "+n+") "+arr[n]
            }
            content=content+"</div>"
            document.getElementById('content').innerHTML=content
        }else{
            content = "<!DOCTYPE html><head>NO FILE</head><body><center><X2><br><br>Request Denied<br>NO FILE TITLED<br>\'" + TITLE + "\'<br>404 ERROR returned by Server</X2></center></body></html>";
            statusMsg("Request for " + TITLE + " Denied!...", 0);
        }
        DUR = 5
        DURsource = "MP3"
        document.getElementById('Audio1').src = "../Backing/Sound A.mp3"
        document.getElementById('content').innerHTML=content;
        statusMsg("Song Unavailable...Printing Note or 404",0)
        scrollSetup();
    } else if (PRESETlock != true) {
        BACKTRACK=TITLE;//zzz
        //document.getElementById('btName').value=BACKTRACK
        createARRlines(content);
    }
}
//.## PROCESS STD TEXT FILE

function createARRlines(content) { //^ Make ARRlines, from the text file
    statusMsg("Processing Song file: " + TITLE);
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
    if (BOOT !== 'edit') {
        if (ARRtitle[1] !== undefined & ARRtitle[1] !== "") {
            newKey(ARRtitle[1]);
        }
        if (ARRtitle[2] !== undefined & ARRtitle[2] !== "") {
            BPMfile=BPM = ARRtitle[2];
            
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

//.## LOAD BACKTRACK
function loadServerTrack() { //afrom 5.2
    rollMirror(false)
    var delay = 1000;
    var src = '';
    var icon = SOUNDicon = "transSilent.png";
    document.getElementById('mirror').style.color = 'transparent'
    document.getElementById('mirrorImage').src = '../../Icons/' + SOUNDicon;
    document.getElementById("Audio1").style.display = "none";
    var newBPM =BPM;
    if (SOUNDmode == "SILENT") {
        statusMsg(SOUNDmode + ": " + parseInt(delay / 1000, 10) + " sec delay...",0);
        document.getElementById('mirrorImage').src = document.getElementById('buttonTrack2').src = "../../Icons/transSilent.png";
        icon = "transSilent.png"
        document.getElementById('Audio1').src = "";
        durCalc();
    } else { //^ tracks with BEAT Preset or Time Signature independent
        statusMsg("Loading " + SOUNDmode + " track with " + parseInt(delay / 1000, 10) + " sec delay...");
        if (SOUNDmode == "BACK TRACK") {
            BPMfile=BPM = hash(ARRlines[0], "BPM", BPM);
            icon = "transBackTrack.png";
            src = "../Backing/" + BACKTRACK + ".mp3";//zzz
            document.getElementById('trackName').innerHTML=BACKTRACK + ".mp3"
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
            } //^ 4/4 tracks below here====================
            if (SOUNDmode == "DRUM ROCK") {
                icon = "transRock.png";
                src = "../DrumRock/" + BPM + ".mp3";
            } else if (SOUNDmode == "DRUM COUNTRY") {
                icon = "transCountry.png";
                src = "../DrumCountry/" + BPM + ".mp3";
            }
        }
        SOUNDicon = icon;
        screenFormat("Think", SOUNDicon);
        document.getElementById('Audio1').src = src;
        Audio1.preload = 'auto'; //try to cache instead of stream....//Audio1.load();
        var x = setTimeout(function() { //^ time to get the mp3 [arbitrary]
            clearTimeout(x);
            DURmp3 = document.getElementById('Audio1').duration;
            statusMsg("MP3 Duration:" + DURmp3,0);
            if (SOUND === true) {
                document.getElementById("Audio1").volume = VOL;
                document.getElementById("V").innerHTML = parseInt(VOL * 100, 10) + "%";
            }
            if (isNaN(DURmp3) === false) { //^ track successfully loaded
                document.getElementById("Audio1").style.visibility = "visible";
                AUDfail = false;
            } else { //^ track load unsuccessful
                DURmp3 = 0 //scroller
                AUDfail = true;
                SOUNDicon = 'transTrackNo.png';
                statusMsg('Sound Track Failed...', 0);
            }
            document.getElementById('mirrorImage').src = document.getElementById('buttonTrack2').src = "../../Icons/" + SOUNDicon
            durCalc();
        }, delay); //^ time to load mp3
    }
}
//.#    DURATION CALCULATION
function durCalc() {
    statusMsg("Determining Song Duration...BPM>" +BPM, "yellow");
    DURcalc=0
    DURmp3=0
    DUR = 150;
    countBARS();
    DURsource = "Est";
    if (isNaN(DURtext)>0) {
        DUR = DURtext
        DURsource = "File";
    }
    if (MEASURES>5 & BEATS>=1 & BPM >20) {
        DURcalc = parseInt(MEASURES * BEATS * 60 / BPM, 10); //^ alert(DURcalc);
        if (DURcalc >1) {
            DURsource = "Calc: "+BPM+"bpm@"+BARS+"Bars"
            DUR = DURcalc
        }
        if ((SOUNDmode === "BACK TRACK") & document.getElementById('Audio1').duration > 20) {
            DURmp3 = Audio1.duration;
            DUR=DURmp3
            BPM = BARS * BEATS * 60 / DUR
            DURsource = "MP3";
        }
    }
    DUR = parseInt(DUR, 10);
    if (PRESETlock != true) {
        statusMsg("Array Conversion Triggered by Duration Calculation",0)
        arrConvert();
    }
}
//.## CONVERT TEXT ARRAY TO HTML
function arrConvert() { //^ Setup to walk thru the ARRLines
   statusMsg('Converting Array to HTML using custom settings...');
   CTO();
   var icon = 'blackNotePad';
   WARNING = "No Warnings!"
   var flag = "??"
   var count = 0; //count bars
   var img = false; //if true use an image for the song not text
   var htmlString = "";
   var htmlHead = "";
   var lyricLines = lyricLineCount(); //^ XXX combine with longestLine???
   var n;
   var m //message builder
   var j = 0;
   var bigFont;
   var newLine;
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
   var preSong = true;
   var tabCount = 0
   var tabString
   PRESONGlines = 0;
   NOTEtech = undefined; //^ consider calculating these to eliminate constants
   NOTEtrivia = "NO TRIVIA NOTES";
   NOTElinks = undefined;
   IRB = undefined;
   screenFormat('Think', 'danger.png')
   LONGLINE = longestLine() + 1;
   if (LONGLINE == 1) {
      LONGLINE = 74;
      img = true;
   } //in case there are no lines (indicates image file)
      LONGLINE = LINElimit
   if (LINEnum === true | LINEtime === true) {
      LONGLINE = LONGLINE + 4;
   } //^ adding space
   var lineNum = 1;
   if (TEXT === true) {
      m = "/Small Text"
      fsize = (165 / LONGLINE)
   } else {
      fsize = (180 / LONGLINE)
   }
   n = fsize.toString();
   FONTSIZE = n.substring(0, 4) + "vw";
   n = (BIGchordSize * fsize).toString();
   bigFont = n.substring(0, 4) + "vw";
   var bars = 0;
   barCount = 0
//$   opacSet("buttonTabs", 0.2)
   statusMsg("#) Type/Action================================", 0)//?.
   while (j < ARRlines.length) { //^ Walk through the ARRlines to build the htmlStrings  
      newLine = rTrim(ARRlines[j]);
      lType = lineType(newLine);
      m = j + ") " + lType;
      if (lType == 'irealb') {
         IRB = newLine;
         newLine = undefined;
         m = m + " hidden"
         newLine = undefined;
      } else if (lType == 'hash') {
         newLine = undefined;
      } else if (lType == 'noteLive') {
         if (LIVEnotes == false) {
            newLine = undefined;
         } else
            newLine = newLine.substring(2, newLine.length);
      } else if (lType == 'noteTriv') {
         if (NOTEtrivia == "NO TRIVIA NOTES") {
            NOTEtrivia = "";
         }
         NOTEtrivia = NOTEtrivia + newLine.substr(2) + "<br>";
         newLine = undefined;
      } else if (lType == 'tab') { 
         alert(TITLE+' file line '+j+ ' contains a tab, It should be removed')
      } else if (lType == 'noteTech') {
         if (NOTEtech === undefined) {
            NOTEtech = newLine.substr(3);
         } else {
            NOTEtech = NOTEtech + "\n" + newLine.substr(3);
         }
         newLine = undefined;
      } else if (lType == 'link') {
         if (NOTElinks === undefined) {
            NOTElinks = "";
         }
         arrTemp = newLine.split("|");
         NOTElinks = NOTElinks + "<u><a onclick =window.open('" + arrTemp[0] + "')>" + arrTemp[1] + "</a></u><br>";
         newLine = undefined;
      } else if (lType == 'note') {
         if (NOTES !== true) {
            newLine = undefined;
         } else {
            newLine = iconize('transRedCircle') + "  <X1>" + newLine.substr(1, newLine.length) + "</X1>"
         }
      }else if (lType == 'chord') {
            m = "<x2>" + m
            preSong = false; //^ stop counting prelines
            if (TRANSPOSE !== 0) {
               newLine = lineTranspose(newLine, TRANSPOSE);
               m = m + "/Transpose(" + TRANSPOSE + ")"
            } else if (BIGchords === true) {
               //?. below this???      
               m = m + "/Big Chords(" + BIGchordSize * 100 + "%)"
               newLine = newLine.replace(/\s+/g, ''); //remove spaces    
               arr = newLine.split('|'); //split line into arr
               arr.splice(0, 1); //get rid of element in front of the first bar
               bars = BARSperLine; //use BARSperLine established at song load
               barLen = parseInt(LONGLINE / (bars * BIGchordSize), 10) - 1; //determine the length of a bar for big chords
               newLine = "";
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
                  newLine = newLine + "|" + temp;
                  n = n + 1;
               }
            }
        /// }
         if (BARsync === true) {
            m = m + "/BarSync("
            var barLine = "";
            n = 0;
            var htm = false;
            var firstChord = true
            while (n < newLine.length) {
               if (newLine[n] == "|") {
                  if (firstChord === true) {
                     barLine = barLine + "<a id=\'b" + barCount + "\' style=\"backgroundColor:transparent;\">|"
                     firstChord = false
                  } else {
                     barLine = barLine + "</a><a id=\'b" + barCount + "\' style=\"backgroundColor:transparent;\">|"
                  }
                  barCount++
               } else {
                  barLine = barLine + newLine[n]
               }
               n++;
            }
            while (barLine.length < LONGLINE) {
               barLine = barLine + " ";
            }
            barLine = barLine + "               </a>"
            newLine = barLine
            m = m + barCount + " Bars)</X2>"
         }
         if (LIVEnotes === true) {
            newLine = newLine.replace(/#-->/g, "</X16>")
            newLine = newLine.replace(/<!--#/g, "<X16>")
         } //make them visible
         newLine = "<X100>" + newLine + "</X100>"
      
      } else if (lType == 'header') {
         m = "<X8>" + m + "========================================</X8>"
         newLine = newLine.replace(/-/g, '=')
         newLine = newLine.substring(1, newLine.length); //^ cutoff #
         while (newLine.length < LONGLINE - 5) {
            newLine = newLine + "=";
         }
         if (LINEnum === true || LINEtime === true) {
            newLine = "<X6>    </X6>" + newLine;
         }
         newLine = "<X8>" + newLine + "</X8>"
      } else if (lType == 'lyric') {
         m = "<X1>" + m;
         if (j + 1 < ARRlines.length) {
            extraLine = ARRlines[j + 1];
            var extraType = lineType(extraLine)
            if (lineType(extraLine) === 'lyric') { //||lineType(ARRlines[j+1])!==undefined||lineType(ARRlines[j+1])!==undefinedlines[j+1];
               newLine = newLine + extraLine;
               j = j + 1;
            }
         } //incase there is a 2nd lyric line
         if (newLine.length > LONGLINE) {
            if (newLine.length > parseInt(2 * LONGLINE, 10) - 5) {
               WARNING = "LYRIC LINES TOO LONG FOR SELECTED FONT >>> COMPLETE LINES MAY NOT BE DISPLAYED";
            }
            newLine = breakLine(newLine)
            m = m + "/Split"
         }
         if (CAPS === true) {
            newLine = newLine.toUpperCase();
            m = m + "/Capitalized";
         }
         if (LINEnum === true) {
            if (lineNum < 10) {
               num = "<X5>" + lineNum + "   </X5>";
            } else if (lineNum < 100) {
               num = "<X5>" + lineNum + "  </X5>";
            } else {
               num = +"<X5>" + lineNum + " </X5>";
            }
            newLine = num + newLine;
            lineNum++;
         }
         if (LINEtime === true) {
            newLine = "<X5>" + secToMin(((lineNum - 1) / lyricLines) * DUR, 10) + "</X5>" + newLine;
            lineNum++;
         }
         if (LINEnum === true) {
            if (lineNum < 10) {
               num = "<X5>" + lineNum + "   </X5>";
            } else if (lineNum < 100) {
               num = "<X5>" + lineNum + "  </X5>";
            } else {
               num = +"<X5>" + lineNum + " </X5>";
            }
            newLine = num + newLine;
            lineNum++;
         }
         if (LIVEnotes === true) {
            newLine = newLine.replace(/XX>/g, "X16>") //make them visible
            newLine = newLine.replace(/#-->/g, "</X16>") //make them visible//OBSOLETE
            newLine = newLine.replace(/<!--#/g, "<X16>") //make them visible//OBSOLETE
         }
         m = m + "</X1>"
      } else if (lType == 'spacer') {
         newLine = "." + newLine.substring(1, newLine.length);
         while (newLine.length < LONGLINE) {
            newLine = newLine + " ";
         }
         newLine = "<X7>" + newLine + "</X7>";
         if (LINEnum === true || LINEtime === true) {
            newLine = "<X6>    </X6>" + newLine;
         }
      }
      if (newLine) {
         if (LEFTborder === true) {
            newLine = "  " + newLine;
            m = m + "/Left-Space"
         }
         htmlString = htmlString + newLine + "\n";
      }
      if (preSong === true & newLine != undefined) {
         PRESONGlines++;
         m = m + "/preSong"
      }
      statusMsg(m, 0)
      j++;
   }
   var opac = 1;
   WINDht = window.innerHeight;
   WINDwt = window.innerWidth;
   RAT = parseFloat(WINDht / WINDwt);
   visLines = parseInt((100 / fsize) * RAT, 10);
   os = parseInt((visLines / 2) - (PRESONGlines), 10); // - 2;
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
   while (j < parseInt(((visLines) / 2), 10)) {
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
   if (SOUNDmode != "BACK TRACK" | isNaN(Audio1.duration) === true) {
      opacSet("ButtonBT", 0.2)
   } else {
      opacSet("ButtonBT", 1);
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
//.## IMAGE SONG (Not Text)
function loadSongImage(path) {
    statusMsg('Loading Grapic Song Image...');
    var img = new Image();
    img.src = path;
    img.addEventListener("load", function() {
        scrollSetup();
    });
}

//.## SCROLL SETUP
function scrollSetup(img) { //^ get the song data,songHeight,iframeHeight,Duration,ScrollConstant Run after you set the content of page
   statusMsg('Setting Up Scroll...', 'red');
   var mesg = "No Scroll Mesage"
   statusMsg(mesg, 0);
   PAGEht = document.getElementById("content").clientHeight;
   document.getElementById('Tune').scrollTop = 0;
   Ystart = 0;
   Ypos = document.getElementById("Tune").scrollTop; // should get this at Play
   SCROLLpix = parseInt(PAGEht - (WINDht), 10);
   if (isNaN(DUR) === true) {
      msgColor = 'yellow';
      if (isNaN(DURcalc) === false) {
         DUR = DURcalc;
         DURsource = 'Bars & Beats';
      } else if (isNaN(DURtext) === false) {
         DUR = DURtext;
         DURsource = 'From File';
      } else {
         DUR = 150;
         DURsource = "Wild Guess";
      }
      statusMsg("Audio available", 'green')
   }
   SCROLLkon = DUR * 1000 / SCROLLpix; // microseconds per pixel
   SCROLLbase = SCROLLkon;
   document.getElementById('speed2').innerHTML = parseInt(BPM)
   mesg = songSum()
   //.## APPLY USER SETTINGS
   statusMsg("Applying User's Screen Configuration...", 0);
   if (SOUNDmode !== "SILENT" || METRO == true) {
      dis('volCtrl', 'block');
   } else {
      dis('volCtrl', 'none');
   }
   if (SETname == 'Single Tune') {
      document.getElementById("title").innerHTML = TITLE;
   }
   if (DURsource == "Default") {
      color = "Yellow";
   }
   if (CLOCK === true) {
      dis("clock", "block");
   } else {
      dis("clock", "none");
   }
   if (NOTEset !== undefined & SETnoteViewed === false & SETnotes === true) { //(str,fs,clr,bak,def,title,status)
      notePopUp(NOTEset.split('@').join('<br>'), '2vw', 'black', 'white', 'No Playlist Notes', 'Playlist Notes', 'Playlist note...'), 'Playlist Notes';
      SETnoteViewed === true
   } else if (POPnotes === true & PREVtitle !== TITLE) { //& NOTEtrivia!==undefined 
      notePopUp(triviaNotes(), '2vw', 'black', 'yellow', 'No Trivia Notes...', 0, 'No Trivia Notes', 'Trivia Notes');
   } else if (TECHnotes === true & PREVtitle !== TITLE & NOTEtech !== undefined) { //& NOTEtrivia!==undefined 
      notePopUp(NOTEtech, '4vw', 'black', 'pink', 'No Tech Notes...', 0, 'Technical Notes');
   }
   PREVtitle = TITLE;
   TRANSPOSE = 0;
   document.getElementById('key2').innerHTML = KEY;
   if (SHADE === true) {
      vis('shade', 'visible');
   } else {
      vis('shade', 'hidden');
   }
   document.getElementById('thinkIcon').src = "../../Icons/trans.png";
   LOOPend = SCROLLpix;
   document.getElementById('le').innerHTML = parseInt(DUR, 10) + "<br>End";
   LOOPtop = 0;
   document.getElementById('lt').innerHTML = "0<br>Top";
   if (ALT === true) {
      document.getElementById('altSong').innerHTML = (PLAYlist[TUNEnum + 1].split('|')[0]);
   }
   //.## WRAP UP THE BOOT
   statusMsg("Wrapping up the song load...")
   statusMsg("Program Last Used on: " + localStorage.getItem('NPboot'), 0)
   var d = new Date();
   var result = d.toLocaleString();
   localStorage.setItem('NPboot', result);
   screenFormat('Ready');
   document.getElementById("splash").style.display = 'none';
   document.getElementById('msg').style.top = "0%";
   msgColor = 'yellow'
   if (BOOT === true) {
      if (localStorage.getItem('mail') != null) {
         if (localStorage.getItem('mail').length > 1) {
            document.getElementById('msg').style.width = "96%";
            statusMsg("Unsent Mail...")
         }
      }
      dis('configuration', 'block');
      clockRun()
      BOOT = false;
      if (window.innerHeight >= window.innerWidth) {
         alert("Rotate your device...Landscape works best...");
      }
      if (STATUSmode === 1) {
         mesg = "Select Sound Mode > Select Playlist > Set Configuration..."
         msgColor = 'yellow';
         statusMonitor(0);
      } else if ((STATUSmode === 2)) {
         mesg = "Boot Successful, You're in the Debug mode..."
         msgColor = 'red';
      }
      if (BOOT == 'edit') {
         mesg = 'SONG PASSED FROM THE EDITOR!!!  REMEMBER TO SAVE IT THERE!!!';
         document.getElementById("myTune").innerHTML = "SONG PASSED FROM EDITOR";
         msgColor = 'red'
      }
   }
   rollMirror(true);
   if (QUAL != 'Complete' & SOUNDmode === 'BACK TRACK') {
      WARNING = "THE QUALITY OF THE FILE INDICATES IT MAY NOT SYNC TO THE BACK TRACK";
   }
   if (WARNING !== "No Warnings!") {
      mesg = WARNING;
      msgColor = 'red';
   }
   METRObpm = BPM
   METRObeats = BEATS
   if (BPM > 150) {
      if (BEATS == 2 || BEATS == 4 || BEATS == 8 || BEATS == 10 || BEATS == 12 || BEATS == 16) {
         METRObpm = parseInt(BPM / 2);
         METRObeats = parseInt(BEATS / 2, 10);
      } else if (BEATS == 6) {
         METRObpm = parseInt(BPM / 3)
         METRObeats = 2
      } else {
         METRObpm = parseInt(BPM / BEATS)
         METRObeats = 1
      }
   }
   MET = parseInt(60000 / METRObpm, 10)
   BAR = -1
   BARSTOP = ARRbars[0]
   ENDscroll = false;
   ENDaudio = false; //scroller
   if (TITLE == "NOTE") {
      dis('bigButtons', 'none');
      dis('bigPause', 'none');
      dis('bigPlay', 'none')
   }
   if (SONGsource != 'select') {
      dis('nextIcon', 'none')
      dis('lastIcon', 'none')
   }
   if (localStorage.getItem('developer') == 'true') {
      dis('developer', true)
   };

   statusMsg(mesg, msgColor)
}

//.## PLAYER ROUTINES
//.#      SCROLL ENGINE
function scrollEngine() { //^ the actual scrolling routine keep it simple* before it starts SCOLLstartTime,SCROLLkon must be set
   var newPos;
   clearTimeout(TIMEOUTscroll) //stop scroll engine
   if (ENDscroll === true) {
      statusMsg('Scroll ended...', 0)
      endSong();
   } else {
      if (Ypos === document.getElementById("Tune").scrollTop) { //check for stalled scroll
         SS++
      } else {
         SS = 0
      }
      if (document.getElementById('Audio1').currentTime >= document.getElementById('Audio1').duration | document.getElementById('Audio1').duration <= 20) { //check For Audio end
         ENDaudio = true
         statusMsg("Audio-" + DURmp3 + "-" + document.getElementById('Audio1').duration + "-" + document.getElementById('Audio1').duration + " finished or inactive", 0)
      }
      Ypos = document.getElementById("Tune").scrollTop;
      if (BARsync === true) {
         if (Ypos <= 1) { //hilite first bar
            document.getElementById('b0').style.backgroundColor = 'yellow'
         }
         if (Ypos / SCROLLpix * DUR > BARSTOP & BAR < ARRbars.length) {
            statusMsg("<X1>BAR:" + BAR + " ended (" + BARSTOP + " sec of " + DUR + " sec)</X1>", 0)
            BAR = BAR + 1;
            if (BAR === ARRbars.length) {
               ENDscroll = true
            } else {
               BARSTOP = ARRbars[BAR] / MEASURES * DUR;
               document.getElementById('b' + BAR).style.backgroundColor = 'yellow'
               document.getElementById('b' + parseInt(BAR - 1, 10)).style.backgroundColor = 'transparent'
            }
      //$ if (METRO === true) {
      //$         metro(0);
      //$     }
            document.getElementById('b' + parseInt(BAR - 1, 10)).style.backgroundColor = 'transparent'
         }
      }
      if (SS > 5 | document.getElementById('Tune').scrollTop > LOOPend - 1) {
         ENDscroll = true;
         statusMsg('Scroll Complete', 0)
      } else if (LOOPER === true) {
         if (LOOPon === true) {
            if (document.getElementById('Tune').scrollTop >= LOOPend) {
               statusMsg('LOOP END...', 0)
               resetLoop();
            }
         } else { //kill the loop
            LOOPtop = 0
            LOOPend = SCROLLpix;
            ENDscroll = false
            statusMsg('LOOP ignored...', 0)
         }
      }
      nowTime = new Date().getTime();
      newPos = parseInt(((nowTime - SCROLLstartTime) / SCROLLkon) + Ystart, 10);
      document.getElementById("Tune").scrollTop = newPos
      statusMsg('> ' + parseInt(Ypos, 10) + ' px: ' + SS, 0)
      TIMEOUTscroll = setTimeout(function() {
         scrollEngine();
      }, SCROLLkon);
   }
}
//.#      END SONG
function endSong() {
   clearTimeout('TIMEOUTfade')
   if (BARsync === true) {
      barsClear()
   }
   if (LOOPER === true) {
      if (LOOPon === true) {
         statusMsg('Calling LOOP Reset at' + document.getElementById('Tune').scrollTop, 0)
         resetLoop();
      }
   } else {
      CTO()
      Audio1.pause(); //stop the audio
      var dur = document.getElementById('Audio1').duration;
      Ypos = document.getElementById('Tune').scrollTop;
      var now = document.getElementById('Audio1').currentTime;
      statusMsg('Scroll:' + parseInt(Ypos * 100 / SCROLLpix, 10) + '%  Time:' + parseInt(100 * now / dur, 10) + "%", 0);
      if (ENDpause == true & SOUNDmode == 'SILENT') {
         var crap = (WINDht / SCROLLkon) * 500
         statusMsg('Pause for scroll catchup...', 'none')
         screenFormat('Think', 'trans.png');
         dis("msg", "none")
         TIMEOUTcrap = setTimeout(function() {;
            screenFormat('End');
            statusMsg('SONG ENDED', 'yellow')
         }, crap);
      } else {
         screenFormat('End')
         statusMsg('SONG ENDED', 'yellow')
      }
   }
}

//.## MISC STUFF

function printDiv(divName) {
   var printContents = document.getElementById('print').innerHTML;    
   var originalContents = document.body.innerHTML;      
   document.body.innerHTML = printContents;
   document.body.style.textAlign = 'left';
   window.print();     
   document.body.innerHTML = originalContents;
   }









function notePopUp(str, fs, clr, bak, def, title, status) { //string, font size, color and Default
   document.getElementById('cloudX').style.color = clr;
   document.getElementById('cloudX').style.backgroundColor = bak;
   document.getElementById('cloudX').style.fontSize = fs;
   document.getElementById('cloudX').innerHTML = str;
   document.getElementById('cloudX').scrollTop = 0;
   document.getElementById('cloudTitle').innerHTML = title;
   document.getElementById('cloudX').scrollTop = 0;
   dis('cloud', 'block');
   dis('tool', 'none')
   statusMsg("Pop Up Notes : " + title, 0);
}

function CTO() { //^ clear all Timouts except blink
   statusMsg("Clearing 'TIMEOUTS'", 0);
   clearTimeout(TIMEOUTmet);
   clearTimeout(TIMEOUTdelay);
   clearTimeout(TIMEOUTscroll);
   clearTimeout(TIMEOUTnext);
   clearTimeout(TIMEOUTfade);
   clearTimeout(TIMEOUTwait);
   //clearTimeout(TIMEOUTmail);
}

function scrollTune(pct, step) { //^ 25% of screen per second seems appropriate rate
   var int = 36; //^ interval may eventally calculate this
   var move = parseInt((pct * WINDht) / 25, 10); //^ will move 25 steps to move pct int between steps in 1/1000 of a sec
   var plannedSteps = Math.abs(parseInt(pct * 100, 10));
   var y = document.getElementById("Tune").scrollTop; // MMM
   if (step === undefined) {
      step = 1;
      clearTimeout(TIMEOUTscroll);
   } else {
      step = step + 1;
   }
   if (step < plannedSteps & y > 0) {
      TIMEOUTscroll = setTimeout(function() { //^ reusing TIMEOUTscroll
         document.getElementById("Tune").scrollTop = y + move;
         scrollTune(pct, step);
      }, int);
   } else { //^  control this to set speed
      statusMsg("Scrolled " + parseInt(pct * 100, 10) + "% in " + step + " steps", 0)
      clearTimeout(TIMEOUTscroll);
      Ystart = document.getElementById("Tune").scrollTop;
      //Xstart =document.getElementById("tabBox").scrollLeft; for TABS
      SCROLLstartTime = new Date().getTime();
      statusMsg("Starting Scroll Engine", 0);
      scrollEngine();
   }
}

function screenFormat(cmd, varA) { //^ configures the play screen to match the play status(moves, displays and hides icons )
   statusMsg("Display Format: " + cmd + "(" + varA + ")", 0)
   if (cmd == "Scroll" | cmd == "Ready" | cmd == "Pause" | cmd == "Think" | cmd == "End") {
      clearTimeout(TIMEOUTfade);
      dis('metronome', 'none')
      dis('Audio1', 'block');
      dis('bigPause', 'none');
      dis('bigButtons', 'none');
      dis('bigPlay', 'block');
      dis("think", "none");
      dis('backDrop', 'none');
      dis('altSong', 'none');
      dis("msg", "none");
      dis("lastIcon", "block");
      dis("nextIcon", "block");
      //vis('cntDwn', 'hidden'); USELESS
      if (cmd == "Scroll") {
         if (BARsync === false) {
            dis('bigButtons', 'block');
         } else {
            dis('bigButtons', 'none')
            //$if (METRO === true) {
            //$   dis('metronome', 'block')
            //$}
         }
         dis('bigPause', 'block')
         dis('bigPlay', 'none');
         dis('bigReset', 'none');
         barSelect("none");
         dis("songIcons", "none");
         document.getElementById('shade').style.visibility = 'hidden';
         if (BACKdrop === true) {
            dis('backDrop', 'block');
         }
      }
      if (cmd === "Ready") {
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
      if (cmd === "End") {
         dis('bigButtons', 'none');
         dis('bigPlay', 'block');
         dis('bigReset', 'block');
         dis('songIcons', 'block');
         dis("msg", "block");
         dis('Audio1', 'block');
      }
      if (cmd === "Pause") {
         dis('bigButtons', 'none');
         dis('bigPlay', 'block');
         dis('bigReset', 'block');
         dis('songIcons', 'block');
         dis('Audio1', 'block');
         dis("msg", "block");
      }
      if (cmd === "Think") {
         dis('msg', 'block')
         if (varA === undefined) {
            varA = 'trans.png'
         }
         document.getElementById('thinkIcon').src = "../../Icons/" + varA;
         dis('think', 'block');
      }
      if (TUNEnum === 0) {
         dis("lastIcon", "none");
      }
      if (TUNEnum > (PLAYlist.length - 2)) {
         dis("nextIcon", "none");
      }
   } else {
      alert(cmd + " is an invalid Command");
   }
}
//.## SONG CONTROL
function scrollRate(factor) {
    var oldBPM = BPM;
    if (BPM < 350 & factor < 1 | BPM > 30 & factor > 1) {
        SCROLLkon = SCROLLkon * factor;
        BPM = BPM /factor;
        statusMsg("Scroll Rate changed from " + oldBPM +" to "+BPM ,0)
        showSetting(1);
        SCROLLstartTime = new Date().getTime();
        Ystart = Ypos;
        Ypos = document.getElementById("Tune").scrollTop;
    }
}

function trackPause() {
   CTO();
   if (BARsync === true) {
      barsClear()
   }
   document.getElementById('metronome').innerHTML = "-"
   if (SOUNDmode !== 'SILENT') {
      document.getElementById("Audio1").pause();
   } //;PAUSEpoint=document.getElementById("Audio1").currentTime;}
   if (LOOPER !== true | document.getElementById('Tune').scrollTop < LOOPend) {
      statusMsg("Paused...", "yellow");
   } else {
      statusMsg("Loop Paused!", "yellow");
   }
   screenFormat("Pause");
}

//.## PLAY TRACK
function trackPlay() { //pause options...undefined
   Audio1.pause() //just in case
   ENDscroll = false
   CTO();
   clearTimeout(TIMEOUTwait)
   if (SOUNDmode === 'SILENT' | SOUNDmode === 'BACK TRACK') {
      if (BARsync === false) {
         trackAlign('Screen');
      } else {
         trackAlign('Bar')
      }
   } else if (SOUNDmode === 'CLICK TRACK' | SOUNDmode === 'DRUM COUNTRY' | SOUNDmode === 'DRUM ROCK') {
      if (BARsync === true) {
         trackAlign('Free Bar');
      } else {
         trackAlign('Free')
      }
   }
   document.getElementById('Audio1').currentTime = POStrack
   Ystart = document.getElementById('Tune').scrollTop = POSscreen
   screenFormat("Scroll");
   //@ = document.getElementById("tabBox").scrollLeft;
   //$if (METRO === true & BAR === 0) {
   //$   metro(0)
   //$}
   statusMsg("PLAY STEP 2: " + document.getElementById("Audio1").currentTime + ' secs >>>' + POStrack, 0);
   SCROLLstartTime = new Date().getTime();
   document.getElementById("Audio1").play();
   scrollEngine();
}

function trackAlign(to) {
   Audio1.pause() //just in case
   POStrack = document.getElementById('Audio1').currentTime;
   POSscreen = document.getElementById('Tune').scrollTop;
   var pct;
   msg = "Track alignment Error"
   if (to === 'Screen') {
      pct = POSscreen / SCROLLpix
      POStrack = pct * DURmp3;
      msg = 'Aligned to Screen at ' + pct * 100 + "%";
   } else if (to === 'Audio') {
      pct = POStrack / DURmp3
      POSscreen = parseFloat(pct * SCROLLpix, 10)
      msg = 'Aligned to Audio at ' + pct * 100 + '%';
   } else if (to === 'Bar') {
      var pos = 0;
      i = 0;
      while (pos < document.getElementById('Tune').scrollTop) {
         pos = ARRbars[i] * SCROLLpix / MEASURES;
         i++;
      }
      if (i > 1) {
         i = i - 1
      }
      BAR = i;
      BARSTOP = ARRbars[i] / MEASURES * DUR;
      scrollPos = pos
      pct = document.getElementById('Tune').scrollTop / SCROLLpix
      POStrack = parseFloat(pct * DUR, 10);
      msg = 'Aligned to start of BAR ' + BAR;
   } else if (to === 'Free Bar') {
      var pos = 0;
      i = 0;
      while (pos < document.getElementById('Tune').scrollTop) {
         pos = ARRbars[i] * SCROLLpix / MEASURES;
         i++;
      }
      BAR = i;
      BARSTOP = ARRbars[i] / MEASURES * DUR;
      POSscreen = pos
      pct = POSscreen / SCROLLpix
      POStrack = 0;
      msg = 'Free Start of Audio at BAR ' + BAR;
   } else if (to === 'Free') {
      POStrack = 0;
      msg = 'Free Start of Audio';
   }
   document.getElementById('Audio1').currentTime = POStrack
   document.getElementById('Tune').scrollTop = POSscreen;
   statusMsg(msg + '<br>\n' + POStrack + "secs @ " + POSscreen + " Pixels", 0);
}

function findBar() {
   var pos = 0;
   i = 0;
   while (pos < document.getElementById('Tune').scrollTop) {
      pos = ARRbars[i] * SCROLLpix / MEASURES;
      i++;
   }
   document.getElementById('Tune').scrollTop = pos
   if (SOUNDmode === 'SILENT' | SOUNDmode === 'BACK TRACK') {
      trackAlign('Screen');
   } else {
      trackAlign('Free');
   }
   if (i > 1) {
      i = i - 1
   }
   BAR = i;
   BARSTOP = ARRbars[i] / MEASURES * DUR;
   document.getElementById('b' + BAR).style.backgroundColor = 'yellow'
   statusMsg("<X2>findBar()=BAR:" + i + " BARSTOP: " + BARSTOP + "</X2>", 0)
}

function trackReset() {
   Audio1.pause();
   statusMsg('PAUSED')
   if (LOOPER === false | LOOPon === false) {
      statusMsg('Resetting Song...', 0)
      LOOPtop = 0;
      LOOPend = SCROLLpix;
      document.getElementById('lt').innerHTML = "0<br>Top";
      document.getElementById('le').innerHTML = parseInt(DUR, 10) + "<br>End";
   }
   document.getElementById('Tune').scrollTop = LOOPtop;
   statusMsg('Loop/Track set to ' + LOOPtop + 'px')
   if (document.getElementById("Audio1")) {
      document.getElementById("Audio1").autoplay = false;
      document.getElementById("Audio1").currentTime = LOOPtop * DUR / SCROLLpix
   }
   ENDaudio = ENDscroll = false;
   ALT = false;
   if (SOUND === true) {
      document.getElementById("Audio1").volume = VOLdefault;
   }
   BAR = 0;
   if (BARsync === true) {
      barsClear(); //probably align track if barsync on
   }
   CTO();
   statusMsg(TITLE + ' reset...', 'yellow');
   screenFormat('Ready')
   if (LOOPon === true & LOOPmode === 'repeated') {
      var ld = document.getElementById('ld').innerHTML.split('<br>')[0]
      statusMsg(ld + ' second Auto Loop Delay...')
      screenFormat('Think', 'trans.png')
      setTimeout(function() {
         trackPlay();
      }, ld * 1000);
   }
}

function fadeOut(time, inc) {
   var newVol
   if (inc == undefined) {
      //if((document.getElementById("Audio1").duration*1000)-getElementById("Audio1").currrentTime>20000){alert(document.getElementById("Audio1").currrentTime);return}
      inc = document.getElementById("Audio1").volume / (time * BEATS)
      time = parseInt(60000 / BPM, 10)
   }
   newVol = document.getElementById("Audio1").volume - inc
   document.getElementById("Audio1").volume = newVol
   clearTimeout(TIMEOUTfade)
   if (newVol <= 0.00) {
      document.getElementById("Audio1").pause();
      ENDaudio = true;
      document.getElementById("Audio1").volume = VOL;
      document.getElementById('V').innerHTML = parseInt(VOL * 100, 10) + '%'
      statusMsg('Passing to endSong <X2>Audio Paused and Volume reset to ' + VOL * 100 + '%</X2>', 0);
      endSong();
   } else {
      document.getElementById('V').innerHTML = parseInt(newVol * 100, 10) + '%'
      TIMEOUTfade = setTimeout(function() {
         fadeOut(time, inc);
      }, time);
   }
}

function fade(dir) {
   if (SOUND === true) {
      var fact;
      //.?===================
   //@   var VOL = document.getElementById("Audio1").volume;
      VOL = document.getElementById("Audio1").volume;
      document.getElementById('V').innerHTML = "<X2>" + parseInt(VOL * 100, 10) + "%</X2>";
      if (dir === 'x') {
         if (VOL > 0) {
            dir = 'down';
         } else {
            dir = 'up';
         }
      }
      if (dir == "up" & VOLdefault < VOL | dir === "down" & VOL > 0.01) {
         TIMEOUTfade = setTimeout(function() {
            if (dir == "down") {
               fact = 0.7;
            } else {
               fact = 1.3;
            }
            if (document.getElementById("Audio1").volume === 0) {
               VOL = 0.005;
            }
            fact = VOL * fact;
            if (fact > 1) {
               fact = 1;
            }
            document.getElementById("Audio1").volume = fact;
            fade(dir);
            document.getElementById('V').innerHTML = "<X2>Fade</X2>";
         }, 1000);
      } else {
         clearTimeout(TIMEOUTfade);
         if (dir == 'down') {
            document.getElementById("Audio1").volume = 0;
            VOL = 0;
         }
         if (dir == 'up') {
            document.getElementById("Audio1").volume = VOL;
            VOL = VOLdefault;
         }
         document.getElementById('V').innerHTML = "<X2>" + parseInt(VOL * 100, 10) + "%</X2>";
      }
   }
}

//.##    UNCLASSIFIED???
function unique( /*str[]*/ arr) { //^ finds unique elements in an array arr
   var o = {},
      r = [],
      n = arr.length,
      i;
   for (i = 0; i < n; ++i)
      o[arr[i]] = null;
   for (i in o)
      r.push(i);
   return r;
}



//.## LOOP FUNCTIONS
function endLoop() {
   screenFormat('Ready');
   CTO();
   statusMsg("Loop Complete...", "yellow");
   if (LOOPmode == "repeated") {
      trackPause();
      statusMsg(document.getElementById('ld').innerHTML + "second delay...")
      TIMEOUTscroll = setTimeout(function() {
         resetLoop();
      }, document.getElementById('ld').innerHTML * 1000);
   }
}

function loopMode() {
   if (LOOPmode == 'repeated') {
      LOOPmode = 'played once';
      document.getElementById('loopImg').src = "../../Icons/transOnePlay.png";
   } else {
      LOOPmode = 'repeated';
      document.getElementById('loopImg').src = "../../Icons/transInfinity.png";
   }
   loopMsg();
}

function loopMsg(a) {
   var str = "Loop Start: " + secToMin(LOOPtop * SCROLLkon / 1000) + "......Loop End: " + secToMin(LOOPend * SCROLLkon / 1000) + "......" + LOOPmode + "!";
   if (a == 'true') {
      alert(str);
   } else {
      statusMsg(str, 'yellow');
   }
}

function loopMark(typ) {
   var a = document.getElementById('Tune').scrollTop;
   var sec = parseInt(a * DUR / SCROLLpix, 10)
   if (typ == 'start') {
      LOOPtopBU = LOOPtop = a
      msg = 'Loop set to Start at ' + sec + 'seconds'
      document.getElementById('lt').innerHTML = sec + '<br>Top'
   } else {
      LOOPendBU = LOOPend = a
      msg = 'Loop set to Finish at ' + sec + ' seconds'
      document.getElementById('le').innerHTML = sec + '<br>End'
   }
   statusMsg(msg, 'yellow')
}

function loopOn() {
   if (LOOPon === true) {
      LOOPon = false
      document.getElementById("playLoop").style.backgroundImage = "url('../../Icons/off.png')"
      dis('loopBlock', 'none');
   } else {
      LOOPon = true;
      dis('loopBlock', 'block');
      LOOPend = LOOPendBU //restore points
      LOOPtop = LOOPtopBU
      document.getElementById("playLoop").style.backgroundImage = "url('../../Icons/on.png')"
   }
}

function loopClear() {
   LOOPtop = 0;
   LOOPend = SCROLLpix;
   document.getElementById('lt').innerHTML = "0<br>Top";
   document.getElementById('le').innerHTML = parseInt(DUR, 10) + "<br>End";
   statusMsg("Loop Set to Entire Song...", 'yellow')
}

function loopDelay(ld) {
   ld = ld.split("<br>")[0]
   if (ld < 20) {
      ld = parseInt(ld * 2, 10);
   } else {
      ld = 2;
   }
   document.getElementById('ld').innerHTML = ld + '<br>Delay'
}

function resetLoop(step, px) {
   Audio1.pause()
   clearTimeout(TIMEOUTscroll);
   var steps = 30
   if (step === undefined) {
      step = 0;
      screenFormat('Think');
      px = parseFloat((LOOPtop - LOOPend) / steps, 10)
      statusMsg("Resetting Loop ", 'orange');
   }
   step = step + 1;
   if (step < steps) {
      TIMEOUTscroll = setTimeout(function() { //^ reusing TIMEOUTscroll
         document.getElementById("Tune").scrollTop = document.getElementById("Tune").scrollTop + px;
         resetLoop(step, px)
      }, 50);
   } else {
      trackReset();
   }
}

//.## CONFIG FUNCTIONS
function showSetting(num) { // alert('showSetting('+num+')')
   statusMsg("Displaying key, tempo or track type", 0)
   var iconString;
   if (num > 2) {
      document.getElementById('mirror').style.color = 'transparent';
      document.getElementById('mirrorImage').src = document.getElementById('buttonTrack2').src = "../../Icons/" + SOUNDicon;
   } else {
      document.getElementById('mirror').style.color = 'black';
      document.getElementById('mirrorImage').src = '../../Icons/transCircleWhite.png'
   }
   if (num === 0) {
      document.getElementById('key2').innerHTML = document.getElementById('mirror').innerHTML = KEY
   } else {
      document.getElementById('speed2').innerHTML = document.getElementById('mirror').innerHTML = BPM;
   }
}

function listTempos() {
   var strt;
   var fin;
   var inc;
   var j = 0;
   var lst = "";
   var beats;
   var beatUp = beats;
   var beatDown;
   if (SOUNDmode == "BACK TRACK") {
      lst = "TEMPO SET BY THE BACKING TRACK<br>" + BPM + "<br>IT CANNOT BE CHANGED";
   } else {
      if (SOUNDmode == 'SILENT' | AUDfail === true) {
         strt = 50;
         fin = 300;
         inc = 5;
      } else if (SOUNDmode == 'DRUM ROCK') {
         strt = 70;
         fin = 220;
         inc = 5;
      } else if (SOUNDmode == 'CLICK TRACK') {
         strt = 70;
         fin = 190;
         inc = 5;
      } else if (SOUNDmode == 'DRUM COUNTRY') {
         strt = 70;
         fin = 220;
         inc = 10;
      } else {
         (alert("UNKNOWN ERROR SOUND MODE " + SOUNDmode + " DOES NOT EXIST!"));
      }
      beats = strt;
      j = 0;
      while (beats < BPM) {
         beats = beats + inc;
         j++;
      }
      lst = "<br><a onclick = 'setBPM(" + beats + ")' style='color:red'>" + beats + "</a><br>";
      j = 1;
      while (j <= 10) {
         beatUp = beats + (j * inc);
         beatDown = beats - (j * inc);
         if (beatUp <= fin) {
            lst = "<a onclick = 'setBPM(" + beatUp + ");SONGlastCustom=1;showSetting(1);'> " + beatUp + "</a>-" + lst;
         }
         if (beatDown >= strt) {
            lst = lst + "<a onclick = 'setBPM(" + beatDown + ");SONGlastCustom=1;showSetting(1);'> " + beatDown + "</a>-";
         }
         j = j + 1;
      }
   }
   document.getElementById('tempo2').innerHTML = lst;
}

function newKey(nk) { //nash means Nashville
   var nk2 = nk
   var nash = false; //NASH = false;
   var i;
   var j = 0;
   if (KEY == "N") {
      alert("Not Programed to transpose From Nashville Notation\nSimply move to another song and back to clear Nashville Notation!\n SORRY...");
      return;
   }
   if (nk2.substring(1, 2) == '#') {
      nk2 = nk2.substring(0, 1) + 's'
   } // Replace the # sign 
   if (nk == "N") {
      nash = true;
      nk = "A";
   }
   while (ARRscale[j] !== KEY) {
      j++;
   }
   i = j;
   while (ARRscale[i] !== nk) {
      i++;
   }
   TRANSPOSE = i - j; //calculate the Transpositon
   if (nash !== false) {
      nk = 'N';
   }
   document.getElementById('key2').src = '../../Icons/key' + nk2 + '.png'
   KEYlast = KEY;
   KEY = nk;
   //SONGlastCustom=0; USELESS
   statusMsg("Transposed to " + KEY + 'and arrConvert()initiated', 0)
   arrConvert();
}

function setBPM(bpm) {
   if (SOUNDmode == 'SILENT') {
      BPM = bpm;
      durCalc();
   } else {
      BPM = bpm;
      showSetting(1);
      loadServerTrack();
   }
   listTempos()
   statusMsg("Set BPM to " + bpm, 0)
}
function setSoundModeDefault(mode) { // used to indicate audio end (needed to remove listener)
   var num = ARRsoundModes.indexOf(mode);
   document.getElementById("soundSelector").selectedIndex = num;
   SOUNDmodeDefault = SOUNDmode = mode;
   if (BOOT === false) {
      selectTune(TITLEplus);
   }
} // ZZZcheck to see ifyou can take it out of the boot stream

function setSoundMode(mode, icon) {
   statusMsg("Sound mode: " + mode + ">>>>" + SOUNDicon)
   showSetting(2);
   SOUNDmode = mode;
   loadServerTrack();
}
//.## PRESETS
function presets(action) {
   // 0        1          2        3   4    5     6     7         8        9         10        11      12         13       14     15     16  
   //ARRpresets="CAPS,FULLscreen,LEFTborder,CLOCK,TEXT,SHADE,NOTES,SETnotes,POPnotes,TECHnotes,LIVEnotes,COUNTin,BREAKlines,BIGchords,LOOPER,METRO,BARsync".split(',');
   statusMsg("Initiating preset: " + PRESET + ": " + PRESETno, 0)
   PRESETno = 0
   if (PRESET === "Default Mode") {
      if (action == 'presets') {
         ARRtf = "true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false".split(',');
         setCustom(ARRpresets[PRESETno], ARRtf[PRESETno], 'presets')
      } else if (action == 'wrap') {
      document.getElementById('soundSelector').selectedIndex = 0;
      setSoundModeDefault(document.getElementById('soundSelector').value);
      selectPlaylist('ALL TUNES')
      document.getElementById('Set').value = 'ALL TUNES';
      }
   } else if (PRESET === "Perform Mode") {
      if (action == 'presets') {
         //                 0        1          2        3   4    5     6     7         8        9         10        11      12         13       14     15     16  
         //var ARRpresets="CAPS,FULLscreen,LEFTborder,CLOCK,TEXT,SHADE,NOTES,SETnotes,POPnotes,TECHnotes,LIVEnotes,unUsed,BREAKlines,BIGchords,LOOPER,unUsed,BARsync".split(',');
         ARRtf = "true,true,false,true,false,false,true,true,false,false,true,true,true,true,false,false,true".split(',');
         setCustom(ARRpresets[PRESETno], ARRtf[PRESETno], 'presets')
      } else if (action == 'wrap') {
         document.getElementById('soundSelector').selectedIndex = 2; //back Track
         setSoundModeDefault(document.getElementById('soundSelector').value);
         selectPlaylist('A-Fred Solo')
         document.getElementById('Set').value = 'Fred Solo A';
      }
   } else if (PRESET === "Practice Mode") {
      if (action == 'presets') {
         ARRtf = "true,false,false,true,false,false,true,false,false,false,false,true,true,true,true,true,true,false".split(',');
         setCustom(ARRpresets[PRESETno], ARRtf[PRESETno], 'presets')
      } else if (action == 'wrap') {
          alert('WRAP ' +PRESET)
         document.getElementById('soundSelector').selectedIndex = 0;
         setSoundModeDefault(document.getElementById('soundSelector').value);
         selectPlaylist('Breen')
         document.getElementById('Set').value = 'Breen';
      }
   } else if (PRESET === "Developer Mode") {
      if (action == 'presets') {
         ARRtf = "true,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true".split(',');
         setCustom(ARRpresets[PRESETno], ARRtf[PRESETno], 'presets')
      } else if (action == 'wrap') {
          alert('WRAP ' +PRESET)
         document.getElementById('soundSelector').selectedIndex =3;
         setSoundModeDefault(document.getElementById('soundSelector').value);
         selectPlaylist('Fred Inwork')
         document.getElementById('Set').value = 'Fred Inwork';
      }
      PRESETno = 0;
      statusMsg('<X2>' + PRESET + " selected by the user...\n----------------------------------------</X2>", 0)
      barSelect();
   }
}

function setCustom(VAR, val, action) {
   AC = false;
   //statusMsg(VAR + "-" + val + "-" + action)
   var msg;
   var ico
   var icon;
   var img
   if (action != 'toggle' & action !== 'presets') {
      alert("ERROR\nUnknown preset action: " + action)
      return
   }
   if (action === 'toggle') { //single change not using ARRtf
      statusMsg(VAR + "-" + val + "-" + action)
      if (VAR!=BREAKlines||VAR!=BIGchords){  
      if (window[VAR] === true) {
         window[VAR] = false;
         icon = "off.png";
      } else {
         window[VAR] = true;
         icon = "on.png";
         }
      }
      AC = true;
      document.getElementById("img" + VAR).src = "../../Icons/" + icon;
      statusMsg("User Toggled: " + VAR + "to " + window[VAR], 0);
   } else if (action == 'presets') {
      AC = true;
      VAR = ARRpresets[PRESETno];
      val = ARRtf[PRESETno]
      if (val === 'true') {
         val = true
      } else {
         val = false
      }
      ico = 'img' + ARRpresets[PRESETno]
      //ico = ARRimg[PRESETno]
      statusMsg(PRESETno + ": " + VAR + "=" + val + "-" + action)
      if (val === true) {
         icon = "on.png";
         window[VAR] = true;
      } else if (val === false) {
         icon = "off.png";
         window[VAR] = false;
      }
      document.getElementById(ico).src = "../../Icons/" + icon;
      statusMsg(PRESET + ">" + VAR + ">" + ico + ">" + icon + ">" + val)
   } else if (action == 'wrap') {
      arrConvert()
   }
   if (VAR == 'BREAKlines') { //works with BIGchords
      if (LINElimit > 35) {
         LINElimit = parseInt(LINElimit - 5, 0);
         document.getElementById('imgBREAKlines').src = "../../Icons/on.png"
      } else {
         LINElimit = 90;
         document.getElementById('imgBREAKlines').src = "../../Icons/off.png"
      }
      document.getElementById('breakLines').innerHTML = "CHAR<br>" + LINElimit + "/ln";
      AC = true;
   }
   if (VAR == 'BIGchords') {
      BIGchordSize = BIGchordSize + 0.25;
      if (BIGchordSize > 2.2) {
         (BIGchordSize = 1.00)
      }
      if (BIGchordSize == 1) {
         document.getElementById('imgBIGchords').src = "../../Icons/off.png"
      } else {
         document.getElementById('imgBIGchords').src = "../../Icons/on.png"
      }
      document.getElementById('bcp').innerHTML = "Chord<br>" + parseInt(BIGchordSize * 100) + "%"
      AC = true;
   }
   if (VAR == 'SETnotes' & SETnotes === true) {
      document.getElementById("imgPOPnotes").src = "../../Icons/off.png";
      POPnotes = false;
      document.getElementById("imgTECHnotes").src = "../../Icons/off.png";
      TECHnotes = false;
      AC = false;
   }
   if (VAR == 'POPnotes' & POPnotes === true) {
      document.getElementById("imgSETnotes").src = "../../Icons/off.png";
      SETnotes = false;
      document.getElementById("imgTECHnotes").src = "../../Icons/off.png";
      TECHnotes = false;
      AC = false
   }
   if (VAR == 'TECHnotes' & TECHnotes === true) {
      document.getElementById("imgSETnotes").src = "../../Icons/off.png";
      SETnotes = false;
      document.getElementById("imgPOPnotes").src = "../../Icons/off.png";
      POPnotes = false;
      AC = false
   }
   if (VAR == 'LINEnum' & LINEnum === true) {
      window[LINEtime] = false;
      document.getElementById("imgLINEtime").src = "../../Icons/off.png";
      LINEtime = false;
      AC = true
   }
   if (VAR == 'LINEtime' & LINEtime === true) {
      window[LINEnum] = false;
      document.getElementById("imgLINEnum").src = "../../Icons/off.png";
      LINEnum = false;
      AC = true
   }
   if (VAR == 'FULLscreen') {
      if (FULLscreen === true) {
         launchIntoFullscreen(document.documentElement);
      } else {
         exitFullscreen();
      }
   }
   if (VAR == 'LOOPER') {
      if (LOOPER === true) {
         document.getElementById('looper').style.display = 'block';
      } else {
         document.getElementById('looper').style.display = 'none';
      }
   }
   if (VAR == 'TEXT') {
      if (TEXT === true) {
         document.getElementById("imgTEXT").src = "../../Icons/on.png"
      } else {
         document.getElementById("imgTEXT").src = "../../Icons/off.png"
      }
   }
   //$if (VAR == 'METRO') {
   //$   if (METRO === true) {
   //$      document.getElementById('imgBARsync').src = '../../Icons/on.png';
   //$      aB.play();
   //$      aC.play();
   //$     BARsync = true;
   //$  }
   //$}
   if (VAR == 'BARsync') {
      if (BARsync === false) {
         document.getElementById('imgMETRO').src = '../../Icons/off.png';
         METRO = false;
      }
   }
   if (action === 'toggle') {
      if (AC === true | AC == 'true') {
         statusMsg("Toggle required array converstion")
         arrConvert();
      }
   } else if (action === 'presets') { //this is the return point to prevent excessive arrConverstions
      if (PRESETno > 15) {
         statusMsg("<X2>arrConvert Triggered Preset ALL...</X2>", 0)
         presets('wrap')
      } else {
         PRESETno = PRESETno + 1;
         setCustom('', '', 'presets')
      }
   }
}

//.## MISC FUNCTIONS
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

   function tgl(vrbl, val) {
      if (!val) {
         if (window[vrbl] === true) {
            window[vrbl] = false;
         } else {
            window[vrbl] = true;
         }
      } else {
         window[vrbl] = val;
      }
      if (window[vrbl] === true) {
         document.getElementById("img" + vrbl).src = "../../Icons/on.png";
      } else {
         document.getElementById("img" + vrbl).src = "../../Icons/off.png";
      }
   }

   function togl(vrbl) {
      tgl(vrbl);
      if (vrbl == 'LINEtime' && LINEnum === true) {
         tgl('LINEnum', false);
      } else if (vrbl == 'LINEnum' && LINEnum === true) {
         tgl('LINEtime', false);
      }
   }

   function volOnOff() {
      if (SOUND === false) {
         SOUND = true;
         document.getElementById("soundOO").style.backgroundImage = "url('../../Icons/on.png')"
         document.getElementById("Audio1").volume = VOLdefault;
         dis('vCont', 'block')
      } else {
         SOUND = false
         document.getElementById("soundOO").style.backgroundImage = "url('../../Icons/off.png')"
         document.getElementById("Audio1").volume = 0;
         dis('vCont', 'none')
      }
   }

   function volSet(volDelta) {
      var temp;
      if (isNaN(volDelta) === true) {
         VOL = VOLdefault;
      } else if (volDelta < 1 & volDelta > -1) {
         VOL = parseFloat(VOL + volDelta, 10);
         if (VOL >= 1) {
            VOL = 1;
         }
         if (VOL <= 0) {
            VOL = 0;
         }
         VOLdefault = VOL;
      } else if (volDelta > 1 & volDelta <= 100) {
         VOL = parseInt(volDelta, 10) / 100;
      } else {
         VOL = 0;
      }
      document.getElementById('V').innerHTML = parseInt(100 * VOL, 10) + '%';
      document.getElementById("Audio1").volume = document.getElementById("aB").volume = document.getElementById("aC").volume = VOL
   }
//@
   function XXXrevDates() { //date of last mods
      var xhReq = new XMLHttpRequest();
      xhReq.open("HEAD", JSname, false);
      xhReq.send(null);
      return 'HTML: '+document.lastModified+ '  <>  JAVASCRIPT: ' +new Date(xhReq.getResponseHeader("Last-Modified")).toLocaleString();
   }

   function indx(L) {//for sheach by first letter
      var n = 0;
      document.getElementById('mySet').selectedIndex = n;
      var str = document.getElementById('mySet').value;
      while (str.substring(0, 1) !== L) {
         document.getElementById('mySet').selectedIndex = n;
         var str = document.getElementById('mySet').value;
         n++;
         str == document.getElementById('mySet').value;
         if (n == document.getElementById('mySet').length - 1) {
            statusMsg("No Tunes Starting with " + L, 'yellow')
            return
         }
      }
      selectTuneNo(n)
   }

   function changeBackgroundImage(id, url) {
      var urlString = 'url(' + url + ')';
      document.getElementById(id).style.backgroundImage = urlString;
   }
//@
function bcPct() { //BigChordPCT
alert('shit\n bcPCT is apparently dead this is a trip wire')
      }
//.## TRANSPOSE FUNCTIONS
function lineTranspose(line, steps) { //^ transpose entire line and try to keep the absolute chord spacing despite differnces in chr of new chord
   var lineNew;
   if (steps === 0) {
      lineNew = line;
   } else { //^ set up constants
      var chordNew = "";
      var chord = ""; //^ where chrs are collected until a space ends the chord
      var adj = 0; //^ how the length of the new line compares to old (- shorter  + longer) so spaces can be added (ex 3 would mean new line is 3 chr to long and 3 spaces should be take out asap)
      lineNew = "";
      var n = 0;
      while (n < line.length) { //^ step through the line
         if (line[n] == " ") {
            if (chord.length === 0) { //^ not working a chord so work space
               if (adj > 0) {
                  adj = parseInt(adj - 1, 10);
               }
               //^ dont add the space and take adjustment down one...
               else {
                  lineNew = lineNew + " ";
               }
            } else { //^ closing a chord with the space
               chordNew = chordTranspose(chord, steps);
               adj = adj + (chordNew.length - chord.length); //^ set adjustment
               if (adj < 0) {
                  while (adj < 0) {
                     adj = adj + 1;
                     chordNew = chordNew + " ";
                  }
               }
               lineNew = lineNew + chordNew + " ";
               chord = ""; //^ reset for another chord
               chordNew = "";
            }
         } else {
            chord = chord + line[n];
            if (n == line.length - 1) { //^ end of the line but no space to change
               lineNew = lineNew + chordTranspose(chord, steps);
            }
         }
         n = n + 1;
      }
   }
   return lineNew;
}

function chordTranspose(chord, steps) {
   var chordNew = "";
   if (steps === 0) {
      chordNew = chord;
   } else {
      var n = 0;
      chord = chord.replace(/A#/g, "Bb"); //^ purge odd chords
      chord = chord.replace(/B#/g, "C");
      chord = chord.replace(/Cb/g, "B");
      chord = chord.replace(/Db/g, "C#");
      chord = chord.replace(/D#/g, "Eb");
      chord = chord.replace(/Fb/g, "E");
      chord = chord.replace(/E#/g, "F");
      chord = chord.replace(/Gb/g, "F#");
      chord = chord.replace(/G#/g, "Ab");
      for (n = 0; n < chord.length;) {
         var advance = 1;
         if (chord[n] == "A" | chord[n] == "B" | chord[n] == "C" | chord[n] == "D" | chord[n] == "E" | chord[n] == "F" | chord[n] == "G") {
            if (n < chord.length - 1 && (chord[n + 1] == "#" | chord[n + 1] == "b")) { //^ if not at the end of the chord check for next part of note
               chordNew = chordNew + noteTranspose(chord[n] + chord[n + 1], steps);
               advance = 2;
            } //^ increment the count since you used 2 chrs
            else {
               chordNew = chordNew + noteTranspose(chord[n], steps);
            }
         } else {
            chordNew = chordNew + chord[n];
         }
         n = n + advance;
      }
   }
   return chordNew;
}

function noteTranspose(note, steps) { //^ must be sure to add # or b beforce calling the routine  
   var noteNew = "?";
   var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab";
   var arrScale = scale.split(","); //^ make array
   note = note.replace(/A#/g, "Bb");
   note = note.replace(/B#/g, "C");
   note = note.replace(/Cb/g, "B");
   note = note.replace(/Db/g, "C#");
   note = note.replace(/D#/g, "Eb");
   note = note.replace(/Fb/g, "E");
   note = note.replace(/E#/g, "F");
   note = note.replace(/Gb/g, "F#");
   note = note.replace(/G#/g, "Ab");
   for (i = 13; i < 38; i++) { //^  get the position of the first letter starting at 13 and work up
      if (arrScale[i] == note) {
         break;
      }
   } //^ get the current note position
   noteNew = arrScale[i + steps];
   if (KEY == 'N') {
      if (noteNew == 'A') {
         noteNew = '1';
      } else if (noteNew == 'Bb') {
         noteNew = '2b';
      } else if (noteNew == 'B') {
         noteNew = '2';
      } else if (noteNew == 'C') {
         noteNew = '3b';
      } else if (noteNew == 'C#') {
         noteNew = '3';
      } else if (noteNew == 'D') {
         noteNew = '4';
      } else if (noteNew == 'Eb') {
         noteNew = '5b';
      } else if (noteNew == 'E') {
         noteNew = '5';
      } else if (noteNew == 'F') {
         noteNew = '6b';
      } else if (noteNew == 'F#') {
         noteNew = '6';
      } else if (noteNew == 'G') {
         noteNew = '7b';
      } else if (noteNew == 'Ab#') {
         noteNew = '7';
      } else {
         noteNew = '??';
      }
   }
   return noteNew;
}

//.## NAVIGATION FUNCTIONS
//.?function editor(){window.open(encodeURI("editor.html?"+(encodeFredComponent(ARRlines.join("\n")))));}//^ WORKS ON WICKED GAME

function delay(ms) {
    statusMsg("#####################################################", 0)
    var n = 1;
    var t = new Date().getTime() + ms
    while (new Date().getTime() < t) {
        n = n + 0
    }
    statusMsg("#==========" + ms + "ms PAUSE==========", 0)
}

function printContent(){
    var x=document.getElementById('content').innerHTML;
    x="<X100>"+TITLE+"<br>"+listChords()+"</X100><br>"+x.replace(/<br>/g, "");
    var win = window.open("", "Title", "toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
    win.document.body.innerHTML = x;}
    
function notes(){
    window.open(encodeURI("notes.html?"+encodeFredComponent(ARRlines.join("\n"))+"?"+encodeFredComponent(TITLE)));}

function home(){window.open("index.html");}

function history(){window.open("player.txt");} 

function iRealLink(){if(confirm('If this computer has Ireal Pro installed press OK.\n Otherwise; Cancel this operation to see the Ireal Text file.')==true){window.open(IRB);}}

function fileMaster(){window.open("FileMaster.html");}

//.## ANALYSIS FUNCTIONS
// perform general functions and can be adapted to different screens 

function songSum(){
    var mesg = "<X1>" + parseInt(TUNEnum + 1, 10)+ "/" + parseInt(PLAYlist.length,10);
    mesg = mesg +"</X1> <X8>|</X8>"+ secToMin(DUR) + " (" + DURsource + ") <X8>|</X8> <X1>Sig: "+ BEATS + "/4 </X1>";
    mesg = mesg + "<X8>|</X8> {" + listChords() + "}";
    return mesg;}

function analizeSong(){
    var x
    var y
    var x=parseFloat(DURmp3-DURcalc,0)
    if (x>0) {y="2"}else{y="1"}
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
    str = str +"<br>======================<br>MP3 vs SCROLL Discrepancy";
    str = str +"<br>Assumes you have verified both Tempos...";
    str = str +"<br>   DUR MP3: "+ DURmp3 + " sec ("+DURmp3/BARS+" sec/Bar)";
    str = str +"<br>   .......: "+ 60*BARS*BEATS/DURmp3 +" BPM"
    str = str +"<br>Red indicates Time missing from the File";
    str = str +"<br>Green indicates time missing from the Audio";
    str = str +"<br><X"+y+">   Rqd BEATS:"+parseFloat(BPM*(DURmp3-DURcalc)/60,0);
    str = str +"<br>   Rqd BARS:"+parseFloat(BPM*(DURmp3-DURcalc)/(BEATS*60),0)+"<br></X"+y+">";
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

function getTempo() { //used on BackTrack
    var d = new Date();
    TEMPOtime = d.getTime();
    if (TEMPOtime - TEMPOtimeLast > 2000) { //reset if over 2 sec
        TEMPO = 1000;
        TEMPOcount = 0;
        TEMPOtimeLast = TEMPOtime;
        TEMPOstart = TEMPOtime;
        document.getElementById('tempoGetter').innerHTML = 'TEMPO TOOL';
    } else {
        TEMPOtime = d.getTime();
        TEMPOcount = TEMPOcount + 1;
        var t = (TEMPOtime - TEMPOstart) / 60000;
        TEMPO = parseInt(TEMPOcount*10 / t, 10)/10;
        document.getElementById('tempoGetter').innerHTML = TEMPO + " bpm:  (" + parseInt(t * 60, 10) + " sec Sample)"
        document.getElementById('btTempo').value=TEMPO;
        TEMPOtimeLast = TEMPOtime;
    }
}

function lyricLineCount(){
    var count =0;
    var i=0;
    while (i < ARRlines.length) {
        if(lineType(ARRlines[i])== "lyric"){count++;}
        i++;}    
    return count;}



function getTextFileFetch(path) {
   fetch(path)
  .then(response => response.text())
  .then((data) => {
    console.log(data)
  })
   }



function getTextFile(path){//^ Selects your set by its name
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    return(request.responseText); }

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
        
//.## FILE FUNCTIONS
function setUpListener(){document.getElementById('fileinput').addEventListener('change', loadFile, false); }//should be renamed here and html

function loadFile(e){//gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
    SONGsource="request"
    readSingleFile(e); //gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
    setTimeout(function(){createARRlines(RAWtune);document.getElementById('myTune').innerHTML=TITLE;barSelect();},2000);
} 

function readSingleFile(e){
    statusMsg('Reading file...');
    file = e.target.files[0];
    if(!file){ alert("No Valid File...");return;}//incase no file
    var reader = new FileReader();
    reader.onload = function(e){
        RAWtune = e.target.result;//is program specific
        TITLE = (file.name.substring(0,(file.name.length)-4));};
    reader.readAsText(file);}
    
//.## LYRIC COMMON FUNCTIONS  These functions are general utility
function barSelect(bar) {
    var arrBar = "configuration,tool,songbar,cloud".split(","); //,information,
    var j = 0;
    var flg = false
    if (bar == 'none') {
        flg = false;
    }
    while (j < arrBar.length) {
        if (bar == arrBar[j] & document.getElementById(arrBar[j]).style.display === 'none') {
            dis(arrBar[j], 'block');
            flg = true
            statusMsg(bar.toUpperCase() + " BAR Opened...", 'yellow')
        } else {
            dis(arrBar[j], 'none');
        }
        j++;
    }
    if (flg === false) {
        statusMsg("All TOOLBARS CLOSED...", 'yellow')
    }
}
  
function triviaNotes(){return  "<center>" +TITLE.toUpperCase() +"<br>ARTIST: "+ARTIST+" < > HIT YEAR; " +HITyear +"</center><br>" +NOTEtrivia;}

function playlistNotes(){ return  NOTEset;}

function clockRun(){
var d = new Date();
    var t = d.toLocaleString();
    var ap=t.split(' ')[2]
    t= (t.split(',')[1])
    t=t.substring(0,t.length-6)
    document.getElementById('clock').innerHTML=t+" "+ap
    TIMEOUTclock = setTimeout(function() {
        clockRun();
    }, 30000);
}

function printFormat(){
    var pf='';
    var j=0;
    var end = parseInt(ARRlines.length-1,10);
    while (j<end){
        pf =pf +"\n"+ ARRlines[j];
        j++;}
    return pf;}

//.## GLOBAL FUNCTIONS Used from any screen
function fileFromPath(path){
    path = path.split('/');return (path[path.length-1]);}


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
            if(document.getElementById(id).style.display == 'none'){
                document.getElementById(id).style.display='block';}
            else{document.getElementById(id).style.display='none';}}
        else{
            if(disp=='none') {
                document.getElementById(id).style.display = 'none';}
            else{document.getElementById(id).style.display = 'block' ;}}}

function vis(ID,style){
    if(style===undefined){
        if(document.getElementById(ID).style.visibility =='visible') {
            style='hidden';}
        else{
            style='visible';}}
    document.getElementById(ID).style.visibility =style;}
    
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
    var t ="lyric";
    if(str.substring (0,7).toUpperCase()=="IREALB:"){t = "irealb";}    
    else if(str.substring (0,4).toUpperCase()=="TAB:"){t = "tab";}    
    else if(str.substring (0,4)=="http"){t = "link";}
    else if(str.substring (0,3)=="@@@"){t = "noteTech";} 
    else if(str.substring (0,2)=="@@"){t = "noteTriv";}
    else if(str.substring (0,1)=="@"){t = "note";}
    else if(str.substring (0,1)=="#"){t = "header";}
    else if(str.substring (0,2)=="$$"){t = "noteLive";}
    else if(str.substring (0,1)=="$"){t = "spacer";}
    else if(str.search(":")>-1){t = "hash";}
    else if(str.indexOf("|") >-1){t ="chord";}
    return t;}
    
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

//.## STATUS FUNCTIONS
function statusMsg(msg,bgcolor,marq){// COLOR SCHEME: light grey=normal;red=problem ;yellow-pause or inwork; green=Ready
    if(msg===null||msg==='' || msg===" "||msg==undefined) {msg = "ERROR: No Status Message Passed";}
    if(STATUSmode>0) {//Log it
        if(ARRstatusLog.length>LOG){ARRstatusLog.pop()}
        if(bgcolor==0){ARRstatusLog.splice(0,0,stdTime("",true)+"       <X8>"+msg+"</X8>");}
        else{ARRstatusLog.splice(0,0,stdTime("",true) +"  <X1>"+msg+"</X1>");}}
    if(STATUSmode>1){    
        document.getElementById('bootText').innerHTML="<pre>"+ARRstatusLog.join('<br>')+"</pre>";}    
    if(bgcolor==0) {return}
    if(bgcolor==1) {alert("STATUS MSG\n"+msg);return}
    sm2(msg,bgcolor,marq);}    

function sm2(msg,bgcolor,marq){//^POST the msg
    var clr="black";
    if(msg===null){msg="*"+MSGlast;}
    else{MSGlast = msg;}
    if(document.getElementById('splash').style.display=="block") {bgcolor = "transparent"}
    else if(bgcolor == "black"|bgcolor == "red"|bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr = 'white';}
    else if(bgcolor == "yellow"|bgcolor == "transparent"){clr = 'green';}
    else if(bgcolor == "none"|bgcolor == "transparent"){clr = "transparent";}
    else{bgcolor = 'lightgrey';}//default
    if(marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";bgcolor='yellow'}
    document.getElementById("msg").style.color = clr;
    document.getElementById("msg").style.backgroundColor = bgcolor;
    document.getElementById("msg").innerHTML = msg;} 

function statusMonitor(m) { //set the statusMonitor function
    var line = ""
    if (m === 0) {
        line = "<X2>Debug Log Deactivated</X2>";
        dis('statusWindow', 'none');
        dis('bug', 'none');
    }else if (m === 1) {
        dis('statusWindow', 'none');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Hidden</X2>";
    } else {
        m=2
        dis('statusWindow', 'block');
        dis('bug', 'block');
        line = "<X2>Debug Log Active and Displayed</X2>";
    }
    STATUSmode = m;
    statusMsg(line, "yellow");
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
    if (STATUSmode === 0) {
        statusMonitor(2)
    } else {
        statusMonitor(0)
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


//.## DEVLOPER FUNCTIONS
function badCode(){alert(parseInt(23/0,10))}//

function devShrink() {
   if (document.getElementById('developer').style.width == "3vw") {
      document.getElementById('developer').style.height = "7vw"
      document.getElementById('developer').style.width = "24vw"
      document.getElementById('devShrink').style.top = "0vw"
      document.getElementById('devShrink').style.height = "1vw"
      document.getElementById('devShrink').innerHTML = "HIDE"
   } else {
      document.getElementById('developer').style.height = "3vw"
      document.getElementById('developer').style.width = "3vw"
      document.getElementById('devShrink').style.top = "1vw"
      document.getElementById('devShrink').style.height = "2vw"
      document.getElementById('devShrink').innerHTML = "SHOW"
   }
}
//.#    SHIT (DO NOT DELETE)
//CREATE the if/else for SHIT to use or bypass sections completely
function toggleShit(){
   //hide from the public: look for 'SHIT' to find the changes
      if(SHIT==true ) {
      SHIT=false;
      document.getElementById('tShit').src="../../Icons/NS.png";
      }else{
      SHIT=true;
      document.getElementById('tShit').src="../../Icons/DS.png";   
      statusMsg("You're in DEEP SHIT!")
   }
   arrConvert()//set this depending on where you want to go back to
}

//.## DRAGABLE DIV :
dragElement(document.getElementById("backtracker"));
dragElement(document.getElementById("statusWindow"));
dragElement(document.getElementById("cloud"));
dragElement(document.getElementById("mailer"));
dragElement(document.getElementById("localAction"));
dragElement(document.getElementById("developer"));

function dragElement(elmnt) {
   //left some touch commands in to work later
   var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
   if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
   } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
      elmnt.ontouchstart = dragMouseDown;
   }

   function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      document.onmousemove = elementDrag;
      document.ontouchmove = elementDrag;
   }

   function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
   }

   function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
   }
}
//.## BOGUS FUNCTIONS

function bogus() { //modify during development
   flash("BOGUS BLINKER AND FLASH DEMO!" ,4);
   blinker("ButtonHome", 24);
}

function sleep(mSec) {//stops execution experimental for m milleseconds
    statusMsg('<X2>SLEEPING for '+mSec + 'milliseconds</X2>')
    var currentTime= new Date().getTime();
    while (currentTime + mSec >= new Date().getTime()){}}

function flash(msg, dur) {
   if (msg !== MSGlast) {
      //.?
      var TIMEOUTflash;
      var oldMsg = MSGlast;
      if (dur === undefined) {
         dur = 3;
      }
      dur = parseInt(dur * 1000, 10);
      statusMsg(msg, 'red');
      TIMEOUTflash = setTimeout(function() {
         statusMsg(oldMsg);
      }, dur);
   }
}

function blinker(id, cycles) { //1/4 second per blink
   var d = document.getElementById(id);
   if (cycles > 0) {
      if (d.style.visibility == 'visible') {
         d.style.visibility = 'hidden';
      } else {
         d.style.visibility = 'visible';
      }
      TIMEOUTblink = setTimeout(function() {
         clearTimeout(TIMEOUTblink);
         cycles = cycles - 1;
         blinker(id, cycles);
      }, 125);
   } else {
      clearTimeout(TIMEOUTblink);
      d.style.visibility = 'visible';
   }
}

function countBARS() { //counts bars to sync with bars in backtrack
   MAP = "".split(',')
   ARRbars.length = 0;
   BARS = 0;
   BARShalf = 0;
   BARSperLine = 0;
   CHORDlines = 0;
   var count = 0;
   var mapBars = parseInt(MAPoffset, 10);
   var typ;
   var sum = 0
   var j = 0;
   var k = 0 //ARRbars="".split(',')
   while (j < ARRlines.length) { // go through the array 
      var line = ARRlines[j];
      if (lineType(line) === 'header') {
         MAP.push(line)
      }
      if (lineType(line) == 'chord') {
         CHORDlines = CHORDlines + 1;
         for (k = 0; k < line.length; k++) {
            if (line.charAt(k) === "|") {
               typ = 1
               mapBars = parseInt(mapBars + 1, 10)
               if (line.charAt(k + 1) === "*") {
                  typ = 0.5;
                  BARShalf = BARShalf + 1
                  //mapBars=parseInt(mapBars+1,10)
               }
               sum = sum + typ;
               //if(mapBars>0){MAP.push(mapBars)}
               ARRbars.push(sum)
               BARS = BARS + 1;
               if (mapBars > 0) {
                  MAP.push(mapBars)
               }
            }
         }
      }
      if (lineType(line) === 'chord' | lineType(line) === 'header') {
         MAP.push('\n')
      }
      j = j + 1;
   }
   MEASURES = (BARS - BARShalf * 0.5)
   if (CHORDlines > 0) {
      BARSperLine = BARS / CHORDlines;
   }
   statusMsg("MEASURES: " + MEASURES + " / BARS:" + BARS + " (Full:" + parseInt(BARS - BARShalf) + " & HALF:" + BARShalf + ") CHORD LINES: " + CHORDlines + "   BARS/LINE: " + BARSperLine, 0)
} //get the std number of bars from the first line}

function rollMirror(tf) {
   clearTimeout(TIMEOUTmirror);
   if (tf === true) {
      if (MIRROR < 3) {
         document.getElementById('mirror').style.color = 'black';
         if (MIRROR === 1) {
            document.getElementById("mirror").innerHTML = parseInt(parseFloat(BPM, 10) + 0.49, 10);
            document.getElementById('mirrorImage').src = '../../Icons/transCircleGreen.png';
         } //?.
         else if (MIRROR === 2) {
            document.getElementById("mirror").innerHTML = KEY;
            document.getElementById('mirrorImage').src = '../../Icons/transCircleYellow.png';
         } else {
            document.getElementById("mirror").innerHTML = STARS;
            document.getElementById('mirrorImage').src = '../../Icons/transCircleStar.png';
         }
         MIRROR++
      } else {
         MIRROR = 0;
         document.getElementById('mirrorImage').src = '../../Icons/' + SOUNDicon;
         document.getElementById('mirror').style.color = 'transparent';
      }
      TIMEOUTmirror = setTimeout(function() {
         rollMirror(true)
      }, 1000);
   }
}

function breakLine(line) {
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

//.? probably belongs in a visual category 
function opacSet(id, opac) {
   if (opac === undefined | opac === null | opac > 1) {
      opac = 1
   };
   document.getElementById(id).style.opacity = opac
} 