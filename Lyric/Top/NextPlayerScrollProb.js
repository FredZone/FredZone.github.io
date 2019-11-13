//ROADSIGNS   AAA=functions   BBB=boot routine  KKK=Constants
//* GLOBAL CONTSTANTS================================================KKK
var SETnote;
var SETnoteViewed=false;
var ARRtitle;
//* FLAG  CONSTANTS=================================================KKK
    var ALT =false;//* does alternate song exist
    var RAWtune;
    var arrSOUNDmodes=("SILENT/nBACK TRACK/nCLICK TRACK/nVOCAL/nDRUM ROCK/nDRUM COUNTRY/nDRUM COUNT").split("/n");
    var AUDfail=false;
    var AUDend=false;
    var BOOT=true;//* designates first boot
    var DURsource='Default';//* string where the program got the duration
    var SCROLLend=false;//* indicates end of scroll
    var NOTESpresent = false;//* indicates that notes will be available on another page
    var TRANSPOSE =0;//* how many 1/2 steps to tranpose
    var PREVtitle;//previous Title
//* SONG CONSTANTS==================================================KKK
    var ARTIST ="Unknown";
    var ARRlines="";//* Array of lines from text file
    var BARS=0;
    var BEATS=4;//* Beats/bar
    var BPM=100;
    var DURtext=0;//* duration from the text file
    var DUR =120;//* Duration for scrolling and calculating
    var GENRE ="Unknown";
    var HITyear = "Unknown";
    var IRB;//* the IRB line set during format of the page
    var KEY ="C";
    var KEYlast='C';
    var KEYbase ="X";//* anchor for changeing keys on the fly
    var LONGLINE=40;
    var NOTEtrivia;
    var NOTEtech;
    var NOTElinks;
    var QUAL ='Raw';//* song quality
    var STYLE ="Unknown";
    var TITLE="Unknown";//* song title being played
    var TITLEplus ="unknown";//* used to pass info from a playlist i.e @Hallelluia/C#/70/BACK TRACK/starts
//* CALCULATED   CONSTANTS=============================================KKK
    var DURcalc=0;//* Calculated duration based on Bars/Beats/time signature
    var DURmp3=0;//* used on scroll(default =  DURfile, DURcalc, DURmp3, User Input)
//* SCROLLdata CONSTANTS   ========================================KKK
    var CHORDlines =0;//* how many lines are chord lines
    var PRESONGlines =0;//* how many lines of text exist before first chord line
    var SCROLLbase;//* Original SCROLLkon used to change scroll speed on the fly
    var SCROLLkon=0.01;
    var SCROLLpix;//* ScrollPixels from height of document;
    var SCROLLstartTime=0;//* when scroll started, used to regulate scroll
    var Ypos =0;//* Yposition of the scroll 0 being the top
    var Ystart=0;//* where Y is when you start the scroll
    var Yend =false;//* end of scroll
//* Lists 
    var TUNEnum=0;//* Tune Number in setlist
//* TIMEOUT CONSTANTS=========================================================KKK
    var TIMEOUTblink;
    var TIMEOUTcrap;//* do not clear this one
    var TIMEOUTdelay;//* trackDelay XXXdelay the start of???
    var TIMEOUTfade;
    var TIMEOUTnext; //* for next tune
    var TIMEOUTpop; //how long the popup remains visisble
    var TIMEOUTscroll;//* timeout function for scrolling
    var TIMEOUTwait; //Wait after scroll end before showing top Icons title etc
    var TIMEOUTslider;
//* PLAY CONSTANTS===================================================KKK
    var AUTOnext = false;
    var BACKdrop=false;
    var CAPS=true;
    var CLOCK=false;
    var FULLscreen =false;
    var HILITE=false;
    var KARAOKE=false;
    var LEFTborder =false;
    var LINEnum=false;//* show line numbers
    var LINEtime=false;//* show min sec instead of line num
    var NOTES=false;
    var POPnotes=false;
    var SHADE=false;
    var SOUND=true;
    var SOUNDmodeDefault="SILENT";
    var SOUNDmode="SILENT";
    var VOL=(0.50);//* absolute volume (0>1)
    var VOLexp =2;//* exponant applied to VOL
    var VOLinc=(0.71);//* volume increment or decrement
//* MISC CONSTANTS==========================================KKK
    var ARRscale ="A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab".split(",");
    var NASH = false;//Nashville notation
    var MSGlast="NO MESSAGE!";
    var MSGheld="NO MESSAGE!";//XXX
    var RAT =0.7; //* Ratio WINDht/WINDwt
    var SETlist ="X";//* Array of songs in setlist
    var SETname="Single Tune";//* default in case a list cannot be loaded
    var WINDht;//* view window height
    var WINDwt;
//*INWORK FUNCTIONS===========================================================AAA



function bogus() {flash("QUALITY: "+ QUAL,3);blinker("msg",5);}

//*BOOT ROUTINE and BOOT ROUTINE ENTRY ROUTINES===================BBB  All in functions sequence with breaks between sub routines

window.onload = function()
    {
        statusMsg("Initiating javascript...",'green');
        NONE =document.getElementById('none').style.display;//*  create object
        //* set up sound track selector//XXXcould be hard code in html page
        var lst ="<a style='text-align:center; width:28vw'><a style='color:white;'>DEFAULT SOUND MODE</a><br><select id='soundSelector' style='background-color:white;color:black;font-size:2vw; width:28vw' onchange='setSoundModeDefault(this.value)'><optgroup>";
        j =0;
         while (j < arrSOUNDmodes.length)
            {
                lst =lst +"\n<option>"+ arrSOUNDmodes[j] +"</option>";
                j = j+1;
            }
        lst =lst +"\n</optgroup></Select>";
        document.getElementById("soundBox").innerHTML=lst;       
        var x = (decodeURIComponent(window.location.toString())).split("?"); //* see if this is a single song from editor
        if (!x[1]) //* normal first time boot, no query string
            {
                BOOT = true;
                createSetSelector();//* boot to the default list
            }
            else
            {
                BOOT ='edit';
                ARRtitle=("INWORK,C,125,SILENT,No Note").split(',');//Bogus title array
                createARRlines(decodeFredComponent(x[1]));
            }
    };

function createSetSelector()//* B
    {   //* creates an option box from the file SetList.txt in the top directory
        statusMsg("Starting Javascript: Loading List of Sets....");
        var path ="SetList.txt";
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var SETS =content.split("\n");
        ihtml ="<a style='text-align:center; width:45vw;color:white'>PLAYLIST:</a><br><select id='Set' style='font-size:2vw' onchange='SETname=(this.value);selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
        j=0;
        while (j < SETS.length)
        {
            if (SETS[j]!=="ALL TUNES") {ihtml =ihtml +"\n<option>"+ SETS[j] +"</option>";}
            j = j+1;
        }
        ihtml =ihtml +"\n</optgroup></Select>";
        document.getElementById("setSelectA").innerHTML=ihtml;    
        selectSet("ALL TUNES");//* default is ALL TUNES
    }       
//* above section only used during boot program enters below here depending on what needs to be done......................................................................... 

function selectSet(set)//* Selects your set by its name
    {   
        statusMsg("Loading " + set,"yellow");
        SETname = set;
        SETlist = "";
        var request = new XMLHttpRequest();
        path ="../Sets/"+SETname+".txt";
        request.open("GET", path, false);
        request.send(null);
        SETlist = request.responseText.split("\n");
        createSetList();
    }       

function createSetList()//* creates the setlist option box and selects tune 0
    {
        statusMsg("Creating " +SETname +" playlist","yellow");
        var a;
        var lst ="<X2><optgroup>";
        j =0;
        while (j < SETlist.length)
        {
            a=(SETlist[j].split("/")[0]);
            lst =lst +"\n<option value= '"+SETlist[j]+"'>"+((SETlist[j]).split('|'))[0]+"</option>";
            j = j+1;
        }
        lst =lst +"\n</optgroup></X2>";
        document.getElementById("mySet").innerHTML=lst;
        TUNEnum =0;//* nominal tune is 0
        TITLEplus = SETlist[TUNEnum];
        TITLE =TITLEplus;
        PREVtitle=TITLE;
        selectTune(TITLEplus);
    }
  
function nextTune(newDir)//* Entry point if you have selected the next tune in the list by direction 1,0,-1
    {   passCommand("Think");
        barSelect('none');
        statusMsg("Incrementing tune list " & newDir & " steps..","yellow");
        if(SETlist[TUNEnum + newDir])//* if next tune exists go to it
        {   
            TUNEnum =(TUNEnum + newDir);
            TITLEplus = SETlist[TUNEnum];
            document.getElementById("mySet").selectedIndex= TUNEnum;
        }
    selectTune(TITLEplus);
    }

function openSong()//opens a song with title, if its on server, not on list============EEE
    {
        var tune = prompt("Please type the exact tune name", TITLE);
        if (tune !== null) {selectTune(tune);}
    }

function selectTune(titl)//* Entry Point using the TITLE (or extended title) to download tune
    {
       statusMsg("Downloading " + titl,'yellow');
        document.getElementById('myTune').innerHTML=((titl.split("|")[0]));
        passCommand("Think");
        ALT =false;
        TITLEplus = titl;
        //TITLEplus is formated play info=@TITLE/KEY/BPM/SOUNDmode/SETnote (@ indicates alternate if its present not used)
        ARRtitle =TITLEplus.split("|");
        if (ARRtitle[0].substr(0,1)=="@"){TITLE = ARRtitle[0].substr(1);ALT = true;}else{TITLE = ARRtitle[0];}//alternate tune
        CTO();
        document.getElementById("content").innerHTML="";
        if (ARRtitle[3]!==undefined & ARRtitle[3]!== "")
        {
            SOUNDmode =ARRtitle[3];
        }
        else
        {
            SOUNDmode =SOUNDmodeDefault;
        }
        if (ARRtitle[4]!==undefined & ARRtitle[4]!== ""){SETnote=  ARRtitle[4];}
        TUNEnum = SETlist.indexOf(TITLEplus);//* XXX causes problems if tune is in list more than 1 time
        loadServerTitle();
    }

function loadServerTitle()//* F
    {  
        KEYbase="X";
        statusMsg ("Loading " + TITLE +"...",'yellow');
        document.getElementById('key').innerHTML="-";
        document.getElementById("title").innerHTML =TITLE;//* put title on tab...
        TRANSPOSE =0;
        CTO();
        ARRlines="";
        SCROLLend =false;
        var path ="../text/" + TITLE + ".txt";  //* get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var n = content.search("404"); //* look for a 404 error from server
        if (n >-1)//* XXX unverified through all cases of next tune
        {  
            var str = "................NO LYRIC FILE............\n..........There may be a backing track!.............";
            createARRlines(str);
        }
        else
        {
            createARRlines(content);
        }
    }
    
function createARRlines(content) //* G
    {//* Make ARRlines, from the text file
        statusMsg(TITLE+": Creating Array",'yellow');
        SETnote=undefined;
        BARS=0;
        ARRlines ="";
        while (content.indexOf("\r") >= 0)//* get rid of linefeeds
        content = content.replace("\r", "");
        ARRlines = content.split("\n");//* make an array of lines
        firstLineValues();//* pulls first line values or sets defaults
        if (KEY===0 |KEY=="0") {KEY="C";}//* zzzdont know where the 0 comes from but trapped here
        KEYlast=KEY;
        if (KEYbase=="X"){KEYbase=KEY;}
        NASH=false;
        SETnoteViewed=false;
        if (BOOT!=='edit')
        {
            if (ARRtitle[1]!== undefined & ARRtitle[1]!== ""){newKey(ARRtitle[1]);}
            if (ARRtitle[2]!== undefined  & ARRtitle[2]!== ""){BPM = ARRtitle[2];}
            if (ARRtitle[3]!== undefined  & ARRtitle[3]!== ""){SOUNDmode = ARRtitle[3];}
            if (ARRtitle[4]!== undefined  & ARRtitle[4]!== ""){SETnote = ARRtitle[4];}
        }
        countBARS();
        loadServerTrack();
    }

function loadServerTrack()//* F
    {                        
        document.getElementById('thinkIcon').src="../../Icons/trans.png"; 
        statusMsg("CUING " +SOUNDmode,'yellow');
        document.getElementById("Audio1").style.visibility ="hidden";
        passCommand("Think");
        var newBPM = BPM;
        var icon = "none.png";
        document.getElementById('Audio1').src ="";
        var delay =4000;//shorter creates problem
        if(SOUNDmode=="SILENT")
        {
           document.getElementById('buttonTrack').src="../../Icons/transSilent.png";
           durCalc();
           return;
        }
        else //* tracks with BEAT Preset or Time Signature independent=====================
        {
            if(SOUNDmode=="BACK TRACK")
            {
                icon ="transBackTrack.png";
                document.getElementById('Audio1').src = "../Backing/"+TITLE+".mp3";
            }
            else if (SOUNDmode=="VOCAL")
            {
                icon ="transVocal.png";
                document.getElementById('Audio1').src = "../VOCAL/"+TITLE+".mp3";
            }
            while (parseFloat(newBPM/5,10)!==parseInt(newBPM/5,10))
            {
                newBPM = parseInt(newBPM,10) +1;
            }
            BPM =newBPM;            
            if(SOUNDmode=="CLICK TRACK")
            {
                icon ="transClick.png";
                document.getElementById('Audio1').src = "../Click/"+newBPM+".mp3";
            }
            //* Beat Dependent tracks (only base 2,4,8,16)so far
            if (BEATS!=2 & BEATS!=4 & BEATS!=8 &BEATS!=16 & icon=='none.png')// kick out if not 4/4 based and no trackPicked
            {
                document.getElementById('buttonTrack').src="../../Icons/transTrackNo.png";
                AUDfail =true;
                durCalc();
                return;
            }//* 4/4 tracks below here=============================================
            if(SOUNDmode=="DRUM ROCK")
            {
               icon ="transRock.png";
               document.getElementById('Audio1').src = "../DrumRock/"+newBPM+".mp3";
            }
            else if(SOUNDmode=="DRUM COUNTRY")
            {
               icon ="transCountry.png";
               document.getElementById('Audio1').src = "../DrumCountry/"+newBPM+".mp3";
              }
            else if(SOUNDmode=="DRUM COUNT")//* short 8 count track,
            {
               delay =1000;//* shorter track requires less load time
               icon ="transCount.png";
               document.getElementById('Audio1').src = "../DrumCount/"+newBPM+".mp3";
            }    
            document.getElementById('thinkIcon').src="../../Icons/"+icon;
            vis("thinkIcon","visible");
            var x = setTimeout(function()//* time to get the mp3 [arbitrary]
                {
                    DURmp3=document.getElementById('Audio1').duration;
                    clearTimeout(x);
                    if(SOUND===true){document.getElementById("Audio1").volume = VOL;}
                    document.getElementById("V").innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
                    if (isNaN(DURmp3)===false )//* track successfully loaded
                    {
                        document.getElementById("Audio1").style.visibility ="visible";
                        AUDfail=false;
                    }
                    else//* track load unsuccessful
                    {
                        color='red';AUDfail =true;
                        icon ='transTrackNo.png';
                        blinker('buttonTrack',30);
                        //statusMsg("No Audio Track Available",'red');
                    }
                    document.getElementById('buttonTrack').src="../../Icons/"+icon;
                    durCalc();
                    document.getElementById('thinkIcon').src="../../Icons/trans.png"; 
                },delay);//* time to load mp3
        }
    }

function durCalc()//* H
    {   
        statusMsg("Calculating duration","yellow");
        DUR = 0;DURcalc=0;//* DURtext=0;
        DURsource="Undefined";
        DURcalc = parseInt(BARS*BEATS*60/BPM,10);//* alert(DURcalc);
        if (DURtext >0 ) {DUR = DURtext, DURsource = "File";}
        if (DURcalc >0 ) {DUR = DURcalc, DURsource = "Calculation";}
        if (SOUNDmode =="BACK TRACK"|SOUNDmode =="VOCAL")
        {
            if (isNaN(DURmp3)===false)
            {
                DUR = DURmp3;
                DURsource = "MP3";
            }
        }
        if (DUR===0) {DUR = "150";DURsource = "Default";}
        DUR = parseInt(DUR,10);
        arrConvert();
    }

function arrConvert()//* J
    {   //* Setup to walk thru the ARRLines
        statusMsg( TITLE +': Formatting...',"yellow");
        
        var htmlString ="";
        var htmlHead ="";
        PRESONGlines=0;
        NOTEtech = undefined;//* consider calculating these to eliminate constants
        NOTEtrivia="NO TRIVIA NOTES";
        NOTElinks=undefined;
        IRB = undefined;
        var lyricLines = lyricLineCount();//* XXX combine with longestLine???
        LONGLINE =longestLine()+1;
        CHORDlines =chordLines();
        if (LINEnum ===true|LINEtime===true) {LONGLINE=LONGLINE +4;}//* adding space
        NOTESpresent =false;
        var n;
        j =0;
        var lineNum =1;
        var pre=true;//* flag for PRESONGlines
        PRESONGlines =0; //*No title
        while(j < ARRlines.length)//* Walk through the ARRlines to build the htmlStrings  
        {
            var NewLine = ARRlines[j];
            var lType = lineType(NewLine);
            if (lType =='irealb')
            {
                IRB =NewLine;
                NewLine=undefined;
            }
            else if (lType =='hash')
            {
                NewLine=undefined;
            }
            else if (lType== 'noteTriv')
            {
                if (NOTEtrivia=="NO TRIVIA NOTES") {NOTEtrivia="";}
                NOTEtrivia =NOTEtrivia +NewLine.substr(2)+"<br>" ;NewLine=undefined; NOTESpresent =true;
            }
            else if (lType== 'noteTech')
            {
                if (NOTEtech===undefined) {NOTEtech="";}
                NOTEtech =NOTEtech +NewLine.substr(3)+"\n" ;NewLine=undefined; NOTESpresent =true;
            }
            else if  (lType== 'link')
            {
                if (NOTElinks===undefined) {NOTElinks="";}
                var arrTemp = NewLine.split("|");
                NOTElinks =NOTElinks +"<u><a onclick =window.open('"+arrTemp[0]+"')>" + arrTemp[1]+ "</a></u><br>" ;NewLine=undefined; NOTESpresent =true;
            }            
            else if (lType =='chord')
            {
                pre=false; //* stop counting prelines
                n=0;
                count =0;
                while(n<NewLine.length)
                    {
                        if (NewLine[n]=="|"){count = count +1;}    //* counting BARS
                        n =n+1;
                    }
                if (TRANSPOSE !== 0){NewLine = lineTranspose(NewLine,TRANSPOSE);}
                if (HILITE ===true)
                {
                    while (NewLine.length < LONGLINE)
                    {
                        NewLine = NewLine +" ";
                    }
                    NewLine = "<X4>" + NewLine + "</X4>";
                }
                else
                {
                    NewLine = "<X2>" + NewLine + "</X2>";
                }
                if (LINEnum ===true||LINEtime===true)  {NewLine = "<X6>    </X6>" + NewLine;}  
                if (KARAOKE===true){NewLine=" ";}
            }
            else if (lType =='header')
            {
                if (pre===true){PRESONGlines=PRESONGlines +1;}
                NewLine= NewLine.substring(1,NewLine.length);//* cutoff #
                while (NewLine.length < LONGLINE){NewLine = NewLine +"-";}
                if(HILITE===true){NewLine = "<X3>" + NewLine + "</X3>";}else{NewLine = "<X8>" + NewLine + "</X8>";}
                if (LINEnum ===true||LINEtime===true)  {NewLine = "<X6>    </X6>" + NewLine;}
            }
            else if (lType =='lyric')
            {   
                if (CAPS===true) {NewLine = NewLine.toUpperCase();}                   
                if (HILITE ===true)
                {
                    while (NewLine.length < LONGLINE)
                    {
                        NewLine = NewLine +" ";
                    }
                    NewLine = "<X7>" + NewLine + "</X7>";
                }
                var num;
                if (LINEnum ===true)
                {    
                        if (lineNum <10) {num ="<X5>"+lineNum + "   </X5>";}
                        else if (lineNum <100) {num ="<X5>"+lineNum + "  </X5>";}
                        else {num =+"<X5>"+lineNum + " </X5>";}
                        NewLine = num + NewLine;
                        lineNum = lineNum+1;
                }
                if (LINEtime ===true)
                {  
                    NewLine = "<X5>" + secToMin(((lineNum-1)/lyricLines)*DUR,10)+ "</X5>"+NewLine;
                    lineNum = lineNum+1;
                }
            }
            else if (lType =='spacer')
            {   if (pre===true){PRESONGlines=PRESONGlines +1;}
                NewLine= "."+  NewLine.substring(1,NewLine.length);
                while (NewLine.length < LONGLINE)
                    {
                        NewLine = NewLine +" ";
                    }
                    NewLine = "<X7>" + NewLine + "</X7>";                    
                if (LINEnum ===true||LINEtime===true)  {NewLine = "<X6>    </X6>" + NewLine;}
            }
            else if (lType =='note')
            {
                if (NOTES ===true)
                {   
                    if (pre===true){PRESONGlines=PRESONGlines +1;}
                    NewLine= NewLine.substring(1,NewLine.length);//* cutoff @                                                                                                                                                                                                                     
                    while (NewLine.length < LONGLINE)
                        {
                            NewLine = NewLine +" ";
                        }
                    NewLine = "<X2>" + NewLine + "</X2>";
                    if (LINEnum ===true||LINEtime===true)
                        {
                            NewLine = "<X6>    </X6>" + NewLine;
                        }
                }
                else
                {
                    NewLine = undefined;//* suppress the line
                }
            }
            if(NewLine)
            {
                if(LEFTborder===true){NewLine="  "+  NewLine;} 
                htmlString = htmlString  +  NewLine + "\n";
            }            
            j = j+1;     
        }
        var fsize =3;
        if (LONGLINE<75){fsize=3.3-(LONGLINE-40)*0.0360;}else{fsize=2.14-(LONGLINE-75)*0.025;}//* emperically derived        
        WINDht = window.innerHeight;
        WINDwt = window.innerWidth;
        RAT =parseFloat(WINDht/WINDwt);
        var visLines=parseInt((100/fsize)*RAT,10);
        var os = parseInt((visLines/2)-PRESONGlines,10);
        var offset ="";
        var j=0;
        while(j < os)
        {offset = offset+"<br>" ;j = j+1;}
        n = fsize.toString();
        htmlHead = "<!DOCTYPE html><html><head><title id='title'>"+TITLE+"</title><style>Body{font-size : ";
        htmlHead = htmlHead + n.substring(0,4);
        htmlHead = htmlHead + "vw; ";
        htmlHead = htmlHead + "color:black; margin :0vh; padding: 0; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:left;background-color:transparent;}";
        var col="green";// XX
        var tit =TITLE;
        if (ALT ===true) {col = 'red'; tit = TITLE + " (ALTERNATE SONG)";}
        htmlHead = htmlHead + col + ";font-size:8vh;line-height:100%;text-align:center}</style></head><body>";
        htmlString=htmlHead +"<pre>"+ offset +htmlString ;// XX
        offset2 =""; j =1;
        while (j < parseInt(visLines/2,10)){offset2 = offset2+"<br>";j = j+1;}
        htmlString = htmlString + "<X2><center>......END OF SONG......</center></X2>"+offset2+"</pre></body></html>";
        if(NOTEtech!==undefined){NOTEtech ="<pre>TECH NOTES\n"+NOTEtech+"</pre>";}
        if (NOTEtrivia===""|NOTEtrivia===undefined) {vis("ButtonTrivia","hidden");}else{vis("ButtonTrivia","visible");}
        if (NOTEtech===""|NOTEtech===undefined) {vis("ButtonTech","hidden");}else{vis("ButtonTech","visible");}
        if (NOTElinks ===""|NOTElinks===undefined) {vis("ButtonLinks","hidden");}else{vis("ButtonLinks","visible");}
        if (IRB ===""|IRB ===undefined){vis("irbIcon","hidden");}else{vis("irbIcon","visible");}
        if (SETnote ===""|SETnote ===undefined){vis("ButtonPlaylist","hidden");}else{vis("ButtonPlaylist","visible");}
        document.getElementById('content').innerHTML=htmlString;
        scrollSetup();
    }

function scrollSetup()//* get the song data,songHeight,iframeHeight,Duration,ScrollConstant Run after you set the content of page
    {   
        statusMsg(TITLE + ": Scroll Setup...","yellow");
        PAGEht =document.getElementById("content").clientHeight;
        document.getElementById('Tune').scrollTop=0;
        Ystart=0; 
        Yend=false;
        Ypos = document.getElementById("Tune").scrollTop;// should get this at Play
        SCROLLpix=parseInt(PAGEht-(WINDht*0.75),10);
        SCROLLkon = DUR*1000/SCROLLpix;// microseconds per pixel
        SCROLLbase = SCROLLkon;
        document.getElementById('speed').innerHTML=BPM;
        if (SOUNDmode !== "SILENT")
        {
            document.getElementById("volCtrl").style.visibility ='visible';
        }
        else
        {
            document.getElementById("volCtrl").style.visibility ='hidden';
        }
        passCommand("Ready");
        if (SETname =='Single Tune'){document.getElementById("title").innerHTML =TITLE;} 
        if (DURsource =="Default"){color ="Yellow";}
        var mesg ="DURATION: " + secToMin(DUR) + " (" + DURsource +") [TIME "+BEATS +"/4]  {TUNE " + parseInt( TUNEnum+1 ,10) + " of "+ SETlist.length +"}";
        mesg =mesg+" {"+listChords() +"}";
        if (BOOT !== false)
        { 
            if (BOOT ===true)
            {   
                barSelect('configuration');
            }
            else if (BOOT =='edit')
            {
                mesg = "EDITED SONG...PLEASE MANGAGE FROM EDITOR";
            }
            document.getElementById('msg').style.zIndex =2001; color ='yellow';
            document.getElementById('msg').style.top ="0%"; color ='yellow';
            blinker("toolsIcon",15);
            document.getElementById("splash").style.display='none';
            if(window.innerHeight>= window.innerWidth){alert("Rotate your device...");}
        }
        if (CLOCK===true) {vis("clock","visible");}else {vis("clock","hidden");}
        if (POPnotes ===true& PREVtitle !==TITLE)//& NOTEtrivia!==undefined 
            {
                barSelect('information',"Pop-up Trivia");//pops up the trivia
            }
        if (SETnote!==undefined & SETnoteViewed===false & NOTES===true)
        {
            notePopUp(TITLE+'<br>'+(SETnote.split('@')).join('<br>'),'4vw','lightgray','purple','No Playlist Notes',undefined,'Playlist note...');
        }
        PREVtitle=TITLE;
        TRANSPOSE=0;
        document.getElementById('key').innerHTML=KEY;
        document.getElementById("V").innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
        //* (1-id, 2-fontsize(vh), 3-Bottom(%), 4-height(%), 5-width(%)) % done at  1/1 screen RAT
        autoSize("mySet",2,4,undefined,undefined);
        autoSize("key",4.5,2.5,undefined,undefined);
        autoSize("speed",3.5,2.5,undefined,undefined);
        autoSize("songIcons",undefined,undefined,8,undefined);
        autoSize("key-Selection",undefined,undefined,10,undefined);
        autoSize("tempo",undefined,undefined,undefined,undefined);
        autoSize("information",undefined,undefined,8,undefined);
        autoSize("tool",undefined,undefined,10,undefined);
        autoSize("sound-track",undefined,8,35,undefined);
        autoSize("drumBar",undefined,36,7,undefined);
        autoSize("think",undefined,undefined,20,undefined);
        if (SHADE===true) {vis('shade','visible');}else{vis('shade','hidden');}
        if(BOOT===true)
        {
            statusMsg("Select your Sound Mode....Select your Playlist.....Set your Configuration",'Yellow',true);
        }
        else
        {
            statusMsg(mesg);
        }
        BOOT = false;
        document.getElementById('thinkIcon').src="../../Icons/trans.png";
    }  

//*PLAYER ROUTINES====================================================AAA
//takes a 1 to 1 screen and corrects the width or height per the aspect ratio, just enter the value to be recalculated

function trackPrePlay(){if (document.getElementById("Tune").scrollTop>1){trackPlay();}else{trackDelay();}}

function autoSize(id,fVh,bottom,ht,wt)//* id//* fontsize(vh)//* text Bottom//* ht//*  % done at  1/1 screen RAT
    {
        if(fVh!==undefined){fVh = parseFloat(fVh/RAT)+'vh';document.getElementById(id).style.fontSize=fVh ;}
        if (bottom!==undefined){bottom =parseInt(bottom/RAT,10)+'%';document.getElementById(id).style.bottom=bottom ;}
        if (ht!==undefined){ht =parseInt(ht/RAT,10)+'%';document.getElementById(id).style.height=ht;}
        if (wt!==undefined){wt =parseInt(wt*RAT,10)+'%';document.getElementById(id).style.width=wt;}
    }

function scrollEngine()//* the actual scrolling routine keep it simple
    {   //* before it starts SCOLLstartTime,SCROLLkon must be set
        nowTime = new Date().getTime(); 
        Ypos = document.getElementById("Tune").scrollTop;
        if(Yend===true) //* didnt move//* move part 3
        {   
           endSong();
        }         
        else//* STD SCROLL move part 2
        {
            var newPos = parseInt(((nowTime - SCROLLstartTime)/SCROLLkon)+Ystart,10);
            document.getElementById("Tune").scrollTop= newPos;//* MMM
            if (document.getElementById("Tune").scrollTop !== newPos){Yend =true;}
            TIMEOUTscroll = setTimeout(function(){scrollEngine();},SCROLLkon);
        }
    }

function closeSong()//* used to indicate audio end (needed to remove listener)
    {
        AUDend=true;
        endSong();
    }

function endSong()
    {
        var wait;
        if (SOUNDmode=='BACK TRACK')
        {wait=5000;}
        else
        {wait= (SCROLLkon*WINDht*0.6);}//wait 60% screen before popping up top icons
        if (AUDend===true|AUDfail ===true)
        {
            document.getElementById("Audio1").removeEventListener('ended',closeSong);
        }
        if (Yend===true & (AUDend ===true|AUDfail ===true))
        {
            statusMsg(parseInt(wait/1000,10) + " sec DELAY: (Time to finish...)",'transparent',true);
            document.getElementById('msg').style.visibility = 'visible';
            if ((AUDend ===true|AUDfail ===true) & Yend===true)
            {   
                TIMEOUTwait=setTimeout(function()
                {
                    passCommand('End');
                    if (AUTOnext ===true)
                    {
                        if (TUNEnum!==(SETlist.length-1))
                        {
                            var ns = SETlist[TUNEnum+1];
                            blinker("nextIcon",25);
                            statusMsg("Auto-Advancing to " + ns +"....","yellow");
                            passCommand('Think');
                            TIMEOUTnext  =setTimeout(function(){nextTune(1);},3000);
                        }
                        else
                        {
                            statusMsg("END of Set...","red");
                            Yend =false;
                            passCommand('End');
                        }
                    }
                },wait);
            }    
        }
    }

function notePopUp(str,fs,clr,bak,def,time,status)//string, font size, color and Default
    {
        vis("autoClose","hidden");
        document.getElementById('cloud2').style.color=clr;
        document.getElementById('cloud2').style.backgroundColor=bak;
        document.getElementById('cloud2').style.fontSize=fs;
        document.getElementById('cloud2').innerHTML = str;
        document.getElementById('cloud2').scrollTop=0;
        statusMsg(status);
    }

function CTO()
    {//* clear all Timouts except blink flash
        clearTimeout (TIMEOUTdelay); 
        clearTimeout (TIMEOUTscroll);
        clearTimeout (TIMEOUTnext);
        clearTimeout (TIMEOUTfade);
        clearTimeout (TIMEOUTpop);
        clearTimeout (TIMEOUTwait);
    }

function scrollTune(pct,step)
    {   //* 25% of screen per second seems appropriate rate
        var int=36;//* interval may eventally calculate this
        var move=parseInt((pct*WINDht)/25,10);//* will move 25 steps to move pct int between steps in 1/1000 of a sec
        var plannedSteps =Math.abs(parseInt(pct*100,10));
        if (step=== undefined){step=1;clearTimeout(TIMEOUTscroll);}else{step = step+1;}
        if (step<plannedSteps)
        TIMEOUTscroll=setTimeout(function()//* reusing TIMEOUTscroll
            {  
               var y = document.getElementById("Tune").scrollTop;// MMM
               Ypos = y + move;
               document.getElementById("Tune").scrollTop=Ypos;// MMM
               scrollTune(pct,step);
            },int);//*  control this to set speed
            else
            {
                Ystart =Ypos;
                SCROLLstartTime = new Date().getTime();
                scrollEngine();
            }
    }

function passCommand(cmd)
    { //* configures the play screen to match the play status(moves, diplays and hides icons )
        if(cmd == "DelayedPlay"|cmd == "Scroll"| cmd == "Ready" | cmd == "Pause"| cmd == "Think"| cmd == "End")
        {
            dis("think","none");
            dis('backDrop','none');
            document.getElementById('speed').innerHTML=BPM;SCROLLkon=SCROLLbase;
            dis("playIcons", "none");
            vis ("fadeIcon", "hidden");
            clearTimeout(TIMEOUTfade);
            volSet(0);
            vis ("floater", "hidden");
            vis("resetIcon","visible");
            vis("playIcon","visible");
            vis("pauseIcon","hidden");
            vis("speedCover", "hidden");
            vis("msg","hidden");
            vis("lastIcon", "visible");
            vis("nextIcon", "visible");
            vis("waitIcon","hidden");
            if(cmd == "DelayedPlay"){
                document.getElementById("thinkIcon").src= "../../icons/transCountdown.gif";
                dis('think', "block");
                document.getElementById('shade').style.visibility ='hidden';
                barSelect("none");
                dis("songIcons","none");
                vis("speedCover", "visible");
                vis("floater", "visible");
                vis("msg","visible");
                vis("playIcon","hidden");
                vis("pauseIcon","visible") ;
                vis("waitIcon","visible");
            }if(cmd == "Scroll"){
                barSelect("none");
                dis("songIcons","none");
                vis("speedCover", "visible");
                vis("floater", "visible");
                dis("playIcons", "block");
                vis("playIcon","hidden");
                vis("pauseIcon","visible") ;
                vis("waitIcon","visible");
                document.getElementById('shade').style.visibility ='hidden';
                if(BACKdrop===true){dis('backDrop','block');}
            }if(cmd == "Ready"){
                dis("songIcons","block");
                document.getElementById('statusIcon').src = '../../Icons/'+ QUAL+'.png';
                vis("msg","visible");
            }if(cmd == "End"){
                if(NOTESpresent===true){document.getElementById("ButtonInfo").style.visibility = "visible";}
                vis("speed","visible");
                dis('songIcons','block');
                statusMsg(TITLE + " Has Ended...");
                vis("waitIcon","hidden");
                vis("msg","visible");
            }if(cmd == "Pause"){
                dis('songIcons','block');
                vis("msg","visible");
                vis("waitIcon","hidden");
            }if(cmd == "Think"){
                document.getElementById("msg").style.visibility = "visible";
                dis("think","block");
                vis("playIcon","hidden");
                vis("pauseIcon","hidden");
                vis("resetIcon","hidden");
               }
            if (TUNEnum===0) {vis("lastIcon","hidden");}
            if (TUNEnum==(SETlist.length-1)){vis("nextIcon","hidden");}
       }
        else
        {
            alert(cmd + " is an invalid Command");
        }
    }

function scrollRate(factor)
    {
        SCROLLkon = SCROLLkon*factor;
        var a;
        if(SCROLLkon!==SCROLLbase) {a= parseInt(BPM*(SCROLLbase/SCROLLkon),10);}else{a =BPM;}
        document.getElementById('speed').innerHTML =a;
        SCROLLstartTime=new Date().getTime();
        Ystart=Ypos; 
        Yend=false;
        Ypos = document.getElementById("Tune").scrollTop;
    }

function trackDelay()
    {   // starts audio and scroll with delay of 3 seconds
        passCommand("DelayedPlay");
        statusMsg("START  SONG  WHEN  THE  SCROLL ROLLS!!",'yellow');
        TIMEOUTdelay=setTimeout(function()
        {   
            clearTimeout(TIMEOUTdelay);
            trackPlay();
        },3000);
    }
    
function trackPause()
    {   
        CTO();
        if (SOUNDmode !== 'SILENT'){document.getElementById("Audio1").pause();}
        statusMsg("Paused...","red");
        passCommand("Pause");
    }

function trackPlay()
    {
        AUDend =true;
        passCommand("Scroll");               
        SCROLLstartTime = new Date().getTime();
        if (SOUNDmode !== 'SILENT')// {document.getElementById("Audio1").play();} 
        {
            AUDend =false;
            document.getElementById("Audio1").play();
            document.getElementById('Audio1').addEventListener("ended",closeSong);
            endSong();
        }
        Ystart = document.getElementById("Tune").scrollTop;// MMM
        passCommand("Scroll");
        Yend = false;
        document.getElementById('thinkIcon').src="../../Icons/trans.png"; 
        scrollEngine();// scrolls the lyric
    }
    
function trackReset()
    {   
        CTO();
        if (document.getElementById("Audio1"))
        {
            document.getElementById("Audio1").autoplay = false;
            document.getElementById("Audio1").load();
            if(SOUND===true){document.getElementById("Audio1").volume =VOL;}
        }
        document.getElementById("Tune").scrollTop=0;
        passCommand('Ready');
        statusMsg(TITLE +' reset...');
    }
    
function  fade(dir)
    {
        if (SOUND===true)
        {
            var fact;
            var vol=document.getElementById("Audio1").volume;
            document.getElementById('V').innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
            if (dir==='x') {if (VOL>0 & vol>0){dir='down';}else {dir ='up';}}
            if (dir=="up" & vol < VOL| dir==="down" & vol>0.01)
            { 
                vis('fadeIcon','visible');
                TIMEOUTfade=setTimeout(function()
                {
                    if (dir =="down") {fact =0.7;}else{fact =1.3;}
                    if (document.getElementById("Audio1").volume === 0){vol =0.005;}
                    fact =vol*fact;
                    if (fact>1) {fact=1;}
                    document.getElementById("Audio1").volume =fact;
                    fade(dir);
                    document.getElementById('V').innerHTML="<X2>Fade</X2>";
                },1000);
            }
            else
            {   vis('fadeIcon','hidden');
                clearTimeout(TIMEOUTfade);
                if (dir == 'down'){document.getElementById("Audio1").volume =0;vol =0;}
                if (dir == 'up') {document.getElementById("Audio1").volume =VOL;vol =VOL;}
                document.getElementById('V').innerHTML="<X2>"+parseInt(VOL*100,10)+"%</X2>";
            }
        }
    }   
    

function blinker(id,cycles)//1/4 second per blink
    {
        var d = document.getElementById(id) ;
        if (cycles>0)
            {
            if (d.style.visibility=='visible')
                {
                    d.style.visibility='hidden';
                }
                else
                {
                    d.style.visibility='visible';
                }    
                TIMEOUTblink=setTimeout(function()
                    {   clearTimeout(TIMEOUTblink);
                        cycles = cycles -1;
                        blinker(id,cycles);
                    },125);
            }
         else
        {
            clearTimeout(TIMEOUTblink);
            d.style.visibility='visible';
        }
    }

function unique(/*str[]*/ arr)  //* finds unique elements in an array arr
{  
     var o={},  
          r=[],  
          n = arr.length,  
          i;  
     for( i=0 ; i<n ; ++i )  
          o[arr[i]] = null;  
     for( i in o )  
          r.push(i);  
     return r;  
}  

function flash(msg,dur)
    {
    if (msg !==MSGlast)
        {
            var TIMEOUTflash;var oldMsg = MSGlast;
            if (dur===undefined) {dur =3;}
            dur = parseInt(dur*1000,10);
            statusMsg(msg,'red') ;   
            TIMEOUTflash=setTimeout(function(){statusMsg(oldMsg);},dur);
        }
    }

//*CONFIG FUNCTIONS===================================================AAA

function dis(id,disp)
    {   if (disp===undefined)
        {
            if (document.getElementById(id).style.display == NONE)
            {document.getElementById(id).style.display='block';}else{document.getElementById(id).style.display=NONE;}
        }
        else
        {
            if (disp=='none') {document.getElementById(id).style.display = NONE;}else{document.getElementById(id).style.display = 'block' ;}
        }
    }

function vis(iconID,style)
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
    }

function listTempos()
    {  
        var strt; var fin; var inc; var j = 0;  var lst="";var beats;var beatUp =beats;var beatDown;
        if ((SOUNDmode == "BACK TRACK"|SOUNDmode == "VOCAL")&(isNaN(DURmp3)===false))
        {
            statusMsg("You cannot change the Tempo of an Pre-recorded audio file...",'red');
            lst ="None";
        }
        else
        {   
            if (SOUNDmode =='SILENT'|AUDfail===true){strt=50;fin=300;inc=5;}
            if (SOUNDmode =='DRUM ROCK'|SOUNDmode =='CLICK TRACK'|SOUNDmode =='DRUM COUNT'){strt=70;fin=220;inc=5;}
            else if (SOUNDmode =='DRUM COUNTRY'){strt=70;fin=220;inc=10;}
            beats =strt;j=0;
            while (beats <BPM){beats = beats +inc;j=j +1;}
            lst= "<br><a onclick = 'setBPM("+beats+")' style='color:red'>"+ beats +"</a><br>";           
            j=1;
            while (j <=10)
            {
                beatUp =beats + (j*inc); beatDown =beats - (j*inc);
                if (beatUp <=fin) {lst= "<a onclick = 'setBPM("+beatUp+")'> "+ beatUp +"</a>-"+lst;}
                if (beatDown >=strt) {lst= lst+"<a onclick = 'setBPM("+beatDown+")'> "+ beatDown +"</a>-";}
                j = j+1;
            }
        }
        document.getElementById('tempo').innerHTML=lst;
    }

function newKey(nk)
    {   
        if (KEY=="N") {alert("Not Programed to transpose From Nashville Notation\nSimply move to another song and back to clear Nashville Notation!\n SORRY...");barSelect('key-Selection'); dis('key-Selector','none');return;}
        var nash=false;//NASH = false;
        var i;
        var j =0;
        if (nk=="N")
            {
                nash = true;
                nk ="A";
            }
        dis('key-Selection','none');
        while(ARRscale[j]!==KEY){j = j+1;}
        i =j;
        while(ARRscale[i]!==nk){i = i+1;}
        j =i-j;
        if (nash!==false) {nk='N';}
        document.getElementById('key').innerHTML=nk;
        TRANSPOSE=j; 
        KEYlast=KEY;
        KEY=nk;
        arrConvert();
    }

function setBPM(bpm)
    {
        if (SOUNDmode =='SILENT'){BPM = bpm;durCalc();}
        else
        {
            BPM =bpm;
        }
        dis('tempo','none');
    }

function setSoundModeDefault(mode)// used to indicate audio end (needed to remove listener)
    {
        var num = arrSOUNDmodes.indexOf(mode);
        document.getElementById("soundSelector").selectedIndex = num;
        SOUNDmodeDefault=SOUNDmode = mode;
        if (BOOT ===false){selectTune(TITLEplus);}// ZZZcheck to see if you can take it out of the boot stream
    }

function setSoundMode(mode,icon)
    {   dis('sound-track','none'); dis('drumBar','none');
        SOUNDmode = mode;
        loadServerTrack();
    }

function setCustom(VAR,val,action)
    {
        if (!val)
            {if (window[VAR]===true){window[VAR]=false;}else{window[VAR]=true;}}
        else
            {window[VAR]=val;}
        if (window[VAR]===true)
            {document.getElementById("img"+VAR).src ="../../Icons/On.png";}
        else
            {document.getElementById("img"+VAR).src ="../../Icons/OFF.png";}
        if (VAR=='LINEnum'& LINEnum ===true){window[LINEtime]=false;document.getElementById("imgLINEtime").src ="../../Icons/OFF.png";LINEtime=false;}
        if (VAR=='LINEtime' & LINEtime===true){window[LINEnum]=false;document.getElementById("imgLINEnum").src ="../../Icons/OFF.png";LINEnum=false;}
        if (VAR=='FULLscreen'){if(FULLscreen ===true){launchIntoFullscreen(document.documentElement);}else{exitFullscreen();}}
        if (action=='refresh') {arrConvert();}
        if (VAR ==='CLOCK') {if (CLOCK===true) {startClock();}else{clearTimeout(TIMEOUTclock);}
        }
    }

function launchIntoFullscreen(element)
    {
       if(element.requestFullscreen) {element.requestFullscreen();}
       else if(element.mozRequestFullScreen) {element.mozRequestFullScreen();}
       else if(element.webkitRequestFullscreen) {element.webkitRequestFullscreen();}
       else if(element.msRequestFullscreen) {element.msRequestFullscreen();}
    }

function exitFullscreen()
    {
      if(document.exitFullscreen) {document.exitFullscreen();}
      else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();}
      else if(document.webkitExitFullscreen) {document.webkitExitFullscreen();}
      else if(element.msCancelFullscreen) {document.msCancelFullscreen();}//this step is BOGUS
    }

function tgl(vrbl,val)
    {
        if (!val)
        {if (window[vrbl]===true){window[vrbl]=false;}else{window[vrbl]=true;}}
        else
        {window[vrbl]=val;}
        if (window[vrbl]===true){document.getElementById("img"+vrbl).src ="../../Icons/On.png";}
        else
        {document.getElementById("img"+vrbl).src ="../../Icons/OFF.png";}
    }

function togl(vrbl)
    {   tgl(vrbl);
        if(vrbl== 'LINEtime' && LINEnum ===true){tgl('LINEnum',false);}
        else if(vrbl== 'LINEnum' && LINEnum ===true){tgl('LINEtime',false);}
    }

function volSet(volDelta)//* VolDelta will be -1,0,+1 {10=off or On}
    {
        var newExp;
        clearTimeout(TIMEOUTfade);
        vis("fadeIcon","hidden");
        if (volDelta == 10 & SOUND ===true)
        {
            SOUND =false;
            document.getElementById("Audio1").volume = 0;
            document.getElementById("soundOO").src ="../../Icons/Off.png";
            document.getElementById("V").innerHTML= "<X2>OFF</X>";
        }
        else 
        {   
            if (volDelta == 10)
            {
                SOUND = true;
                volDelta = 0;
                document.getElementById("soundOO").src ="../../Icons/ON.png";
            }
            newExp = parseInt(VOLexp +volDelta,10);
            if(newExp < 5  && newExp > -1)//* 0,1,2,3,4 (4 being the lowest volume)
            {
                VOLexp = newExp;
                VOL = Math.pow(VOLinc,VOLexp);
                var newBottom = parseInt(15+(VOLexp*15),10)+"%";//* knob position
                document.getElementById("SK").style.bottom  =newBottom ; //alert(VOLexp +" - " +newBottom)
                var uH=parseInt(newExp*15,10)+'%';
                document.getElementById("SUp").style.height =uH;//* height of button
            }
        }
    document.getElementById('V').innerHTML="<X2>"+parseInt(newExp*25,10)+"%</X2>";
    if(SOUND===true){document.getElementById("Audio1").volume = VOL;}else{document.getElementById("V").innerHTML= "<X2>OFF</X2>";}
    }

//*GLOBAL FUNCTIONS Used from any screen ===============================================AAA

function fileFromPath(path)
    {path = path.split('/');return (path[path.length-1]);}
    
function statusMsg(msg,bgcolor,marq)//* xxx could trim to 40 chr
    { //grey-normal;red-attention Required ;yellow-normal pause or inwork
        MSGlast = msg;
        var clr;
        if(document.getElementById("msg").style.zIndex >=4000){bgcolor = 'transparent';clr='red';}//for splash screen
        else if (bgcolor === undefined){bgcolor = 'grey';}//default
        document.getElementById("msg").style.backgroundColor = bgcolor;
        if (bgcolor == "black"|bgcolor == "red"){clr = 'white';}
        else if (bgcolor == "yellow"){clr = 'red';}
        else if (bgcolor == "green"|bgcolor == "blue"|bgcolor=='grey'){clr='white';}
        else{clr='black';}
        document.getElementById("msg").style.color = clr;
        if (marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";}
        document.getElementById("msg").innerHTML = msg;
        }

function secToMin(sec)//* XXX this sucks
    {   var m =parseInt((sec/60),10);
        var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
        if (s < 10) {s = ":0" + s;}else{s = ":" + s;}
        return m+s;
    } 

function hash(hashString,key,defaultVal)//* Gets hash values from string a:b,c:d,e:f,......
   {    var arrHash = (hashString.split(",")); //*  an array from hashString   
        var i=0;
        while (i < arrHash.length)
        {
            var ele=(arrHash[i].split(":"));//* Hash4 an array of the first element of Hash3
            if(ele[0] == key)
            {
                defaultVal = ele[1];
                i = arrHash.length;//* kick you out must be a better way
            } 
            i++;
        }
    return defaultVal;
    }

//*TRANSPOSE FUNCTIONS====================================================AAA
 function lineTranspose(line,steps)//* transpose entire line and try to keep the absolute chord spacing despite differnces in chr of new chord
    {   
        var lineNew;
        if (steps===0)
        {
            lineNew = line;
        }
        else
        {   //* set up constants
            var chordNew ="";
            var chord =""; //* where chrs are collected until a space ends the chord
            var adj = 0;  //* how the length of the new line compares to old (- shorter  + longer) so spaces can be added (ex 3 would mean new line is 3 chr to long and 3 spaces should be take out asap)
            lineNew= "";
            var n=0;
            while (n < line.length)//* step through the line
            {  
                if (line[n]==" ")
                {
                    if (chord.length ===0)//* not working a chord so work space
                    {
                        if (adj > 0)
                        {
                            adj = parseInt(adj -1,10);//* dont add the space and take adjustment down one...
                        }
                        else
                        {
                            lineNew = lineNew + " ";
                        }
                    }
                    else //* closing a chord with the space
                    {
                        chordNew = chordTranspose(chord,steps);
                        adj = adj + (chordNew.length - chord.length);//* set adjustment
                        if (adj < 0)
                        {
                            while(adj < 0)
                            {
                                adj = adj+1;
                                chordNew = chordNew +" ";
                            }
                        }
                        lineNew = lineNew + chordNew  + " ";
                        chord ="";//* reset for another chord
                        chordNew ="";
                    }
                }
                else
                {
                    chord = chord + line[n];
                    if (n==line.length-1)//* end of the line but no space to change
                    {
                        lineNew = lineNew + chordTranspose(chord, steps);
                    }
                }
            n=n+1;
            }
        }
    return lineNew;
    }
   
function chordTranspose(chord,steps)
    {   var chordNew ="";
        if (steps===0)
        {
            chordNew = chord;
        }
        else
        {
            var n=0;
            chord = chord.replace(/A#/g,"Bb");//* purge odd chords
            chord = chord.replace(/B#/g,"C"); 
            chord = chord.replace(/Cb/g,"B");
            chord = chord.replace(/Db/g,"C#");
            chord = chord.replace(/D#/g,"Eb");
            chord = chord.replace(/Fb/g,"E");
            chord = chord.replace(/E#/g,"F");
            chord = chord.replace(/Gb/g,"F#");
            chord = chord.replace(/G#/g,"Ab");
            for (n=0; n < chord.length;)
            {
                var advance =1;
                if (chord[n]=="A"|chord[n]=="B"|chord[n]=="C"|chord[n]=="D"|chord[n]=="E"|chord[n]=="F"|chord[n]=="G")
                {
                    if (n < chord.length-1 &&(chord[n+1]=="#"|chord[n+1]=="b"))//* if not at the end of the chord check for next part of note
                    {
                    chordNew = chordNew + noteTranspose(chord[n]+chord[n+1],steps);
                    advance =2;  //* increment the count since you used 2 chrs
                    }
                    else
                    {
                    chordNew = chordNew+ noteTranspose(chord[n],steps);
                    }
                }
                else
                {
                     chordNew = chordNew+chord[n];
                }
            n = n+advance;
            }
        } 
        return chordNew;
    } 

function noteTranspose(note,steps)//* must be sure to add # or b beforce calling the routine  
    {
        var noteNew = "?";
        var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab";
        var arrScale=scale.split(",");  //* make array
        note = note.replace(/A#/g,"Bb");
        note = note.replace(/B#/g,"C"); 
        note = note.replace(/Cb/g,"B");
        note = note.replace(/Db/g,"C#");
        note = note.replace(/D#/g,"Eb");
        note = note.replace(/Fb/g,"E");
        note = note.replace(/E#/g,"F");
        note = note.replace(/Gb/g,"F#");
        note = note.replace(/G#/g,"Ab");
        for (i = 13; i < 38; i++)//*  get the position of the first letter starting at 13 and work up
            {
               if (arrScale[i] == note){break;}//* get the current note position
            }
        noteNew = arrScale[i+steps];
        if (KEY=='N')
        {
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
            else {noteNew='??';}
        }
        return noteNew;
    }
 
//**NAVIGATION FUNCTIONS ===================================================AAA
function editor(){window.open(encodeURI("editor.html?"+(encodeFredComponent(ARRlines.join("\n")))));}//* WORKS ON WICKED GAME

function notes(){window.open(encodeURI("notes.html?"+encodeFredComponent(ARRlines.join("\n"))+"?"+encodeFredComponent(TITLE)));}

function research(){window.open(encodeURI("research.html?"+encodeFredComponent(TITLE)));}   

function playlist(){window.open(encodeURI("playlist.html?"+encodeFredComponent(SETname)+"?"+encodeFredComponent(SETlist.join("\n"))));}

function print(){window.open(encodeURI("print.html?"+encodeFredComponent(TITLE)+"?"+encodeFredComponent(printFormat()))); }

function home(){window.open("index.html");}

function history(){window.open("player.txt");} 

function iRealLink(){window.open(IRB);}

function fileMaster(){window.open("FileMaster.html");}

//**ANALYSIS FUNCTIONS===================================================AAA
//* perform general functions and can be adapted to different screens 
function analizeSong()
    {
        var str = "TITLE: "+ TITLE+ " (SOUND MODE: " + SOUNDmode +")";
        str = str +"<br>PLAYLIST: "+ SETname +"<br>=======================";
        str = str +"<br>KEY: "+ KEYbase + " (Transposed to " + KEY +")";
        str = str +"<br>TIME SIG: "+ BEATS  + "<br>BARS: "+ BARS + "<br>TEMPO: "+ BPM +" BPM" + "<br>QUALITY: "+ QUAL; // + "<br>ARTIST: "+ ARTIST;
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
        str = str +"<br>   WINDOW WT: "+ WINDwt + "px";
        str = str +"<br>   SCROLL RATE: "+ parseInt(SCROLLkon,10) + " micro-sec/pixel";
        str = str +"<br>   SCROLL POSITION: " + document.getElementById("Tune").scrollTop +"px";
        str = str +"<br>======================<br>CHORDS<br>" + listChords() +"<br>=======================================END=======================================<br>";
        return(str);
    }
function countBARS()
    {
        var j =0;BARS=0;
        while(j < ARRlines.length)// go through the array 
        {
            var line = ARRlines[j];
            if (lineType(line)=='chord')
            {
                var count = countChr(line,"|");
                BARS = BARS + count;//* total the |'s 
            }
            j=j+1;
        }
    }

function lyricLineCount()
    {   var count =0;
        var i=0;
        while (i < ARRlines.length)
        {
            if (lineType(ARRlines[i])== "lyric"){count =count+1;}
            i = i+1;
        }    
        return count;
    }
function getRevisonHistory()//* Selects your set by its name
    {   
        var request = new XMLHttpRequest();
        path ="player.txt";
        request.open("GET", path, false);
        request.send(null);
        return(request.responseText);
    }  

function lineType(str)
    {   
        var ans ="lyric";
        if ((str.substring (0,7)).toUpperCase()=="IREALB:"){ans = "irealb";}    
        else if (str.substring (0,4)=="http")  {ans = "link";}
        else if (str.substring (0,3)=="@@@")  {ans = "noteTech";} 
        else if (str.substring (0,2)=="@@")  {ans = "noteTriv";}
        else if (str.substring (0,1)=="@")  {ans = "note";}
        else if (str.substring (0,1)=="#") {ans = "header";}
        else if (str.substring (0,1)=="$") {ans = "spacer";}
        else if (str.search(":")>-1) {ans = "hash";}
        else if (str.indexOf("|") >-1){ans ="chord";}
        return ans;
    }
function chordLines()//* Common Lyic
    {   
        var i=0;
        var a =0;
        while (i < ARRlines.length)
        {
            if (lineType(ARRlines[i]) == "chord")
            {
                a = a + 1;
            }
            i = i+1;
        }    
        return a;
    }

function longestLine()//* Common Lyic
    {   var count =0;
        var i=0;
        while (i < ARRlines.length)
        {
            var ltype = lineType(ARRlines[i]);
            if (ltype == "chord" | ltype == "lyric"| ltype == "note"| ltype =="header")
            {
                if (ARRlines[i].length > count){count = ARRlines[i].length;}
            }
            i = i+1;
        }    
        return count;
    }

function isHeader(str) //* look for header string reguardless of case
    {   var ans = false;
        var flag = (str.substring(0,5).toUpperCase());
        if (flag =="VERSE"|flag =="#VERS"|flag =="CHORU"|flag =="#CHOR"|flag =="BREAK"|flag =="#BREA"|flag =="INTRO"|flag =="#INTR"|flag =="OUTRO"|flag =="#OUTR"|flag == "#BRIDG"|flag == "#BRID"|flag == "#TURN "|flag == "#TURN"){ans =true;}
        return ans;
    }    

function countChr(str,chr)
    {//* counts chr in a string
        var i = 0;
        var count =0;
        while (i<str.length)
        {
            if(str[i]==chr){count = count+1;} 
            i = i+1;
        }
        return count;
    }

function listChords()//* list of chords used. if the std format is followed
    {
        var arrChords = ARRlines;
        var str ="";
        j = 0;
        while (j<arrChords.length)
        {
        if (lineType(arrChords[j])=='chord')
            {
                if (TRANSPOSE !== 0){arrChords[j] = lineTranspose(arrChords[j],TRANSPOSE);}
                str = str +arrChords[j];}
                j = j+1;
            }
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
        return str;
    }

function firstLineValues(type)//* creates first line defaults then modifies using ARRlines[0]
    {   //* Gets the 3 critical fields from a first line hash
        BPM =120; BEATS =4; KEY ="C";//* set defaults
        if (lineType(ARRlines[0])=='hash')//* if type is array and hash exists
        {   TITLE = decodeURI(hash(ARRlines[0],"TITLE",TITLE));
            DURtext = hash(ARRlines[0],"DUR","");
            BPM= hash(ARRlines[0],"BPM",BPM);
            BEATS = hash(ARRlines[0],"BEATS",BEATS);
            KEY = hash(ARRlines[0],"KEY",KEY);
            QUAL = hash(ARRlines[0],"QUAL",QUAL);
            if (QUAL !=="Inwork"&QUAL !=="Verified"&QUAL !=="Complete") {QUAL ="Raw";}
            GENRE  = hash(ARRlines[0],"GENRE","Unknown");
            STYLE = hash(ARRlines[0],"STYLE","Unknown");
            HITyear = hash(ARRlines[0],"HITyear","Unknown");
            ARTIST = hash(ARRlines[0],"ARTIST","Unknown");
        }
    } 
//FILE FUNCTIONS===============================================AAA

function setUpListener(){document.getElementById('fileinput').addEventListener('change', loadFile, false); }//should be renamed here and html

function loadFile(e){readSingleFile(e);} //gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;

function readSingleFile(e)
    {
        statusMsg('Reading file','yellow');
        file = e.target.files[0];
        if (!file){ alert("No Valid File...");return;}//incase no file
        var reader = new FileReader();
        reader.onload = function(e)
            {
            //RAWtune = e.target.result;//is program specific
            TITLE = (file.name.substring(0,(file.name.length)-4));
            //alert(e.target.result)
            };
        reader.readAsText(file);
    }


//* EDIT ZONE ===================================================AAA

   
    
//*LYRIC COMMON FUNCTIONS==================================================These functions are general utility

function encodeFredComponent(str)//* encodes problem char (?)
    {
        str=str.split("?");
        str=str.join("QMARK");
        return str;
    }
    
function decodeFredComponent(str)//* decodes problem char (?)
    {
        str=str.split("QMARK");
        str=str.join("?");
        return str;
    }
//APPLICATIONS=======================================================AAA

function barSelect(bar,msg) 
    {   
        statusMsg(bar + " selected...");
        var arrBar="configuration,information,tempo,tool,key-Selection,sound-track,drumBar".split(",");
        var j=0;  var ctrl;
        while (j<arrBar.length)
        {   
            if (msg===undefined) {msg="---";}
            ctrl =arrBar[j];
            if (bar==ctrl)
            {
                dis(ctrl);
                if (bar=="information"){notePopUp(triviaNotes(),'2vw','black','yellow','No Trivia Notes...',0,'Trivia Notes');}
            }
            else
            {
                dis(ctrl,'none');
            }
            j = j+1;
        }
    var r= document.getElementById(bar).style.display;
    if (bar!=="none")
        {
            if (r=='block') {statusMsg((bar+ " BAR Opened...").toUpperCase());}
            else{statusMsg((bar+ " BAR CLOSED...").toUpperCase());}    //code
        }
        else{statusMsg("Ready");}
    }

function triviaNotes(){return  "<center>" +TITLE.toUpperCase() +"<br>ARTIST: "+ARTIST+" < > HIT YEAR; " +HITyear +"</center><br>" +NOTEtrivia;}

function playlistNotes(){return  "<center>" +TITLE.toUpperCase() +"</center>@" +SETnote;}

function startClock()//for the clock
    {
        var today = new Date();
        var h = today.getHours();
        var x ="AM";
        if (h>11) {x="PM";}
        if (h>12) {h=h-12;}
        var m = today.getMinutes();
        if (m < 10) {m = "0" + m;}
        document.getElementById('clock').innerHTML ="<X13>"+h + ":" + m +x+"</X13>";
        TIMEOUTclock=setTimeout(function(){startClock();}, 10000);
    }

function printFormat()
    {
        var pf='';
        var j=0;
        var end = parseInt(ARRlines.length-1,10);
        while (j<end)
        {
            pf =pf +"\n"+ ARRlines[j];
            j = j+1;
        }
        return pf;
    }

function portraitWarning(){if(window.innerHeight>= window.innerWidth){alert("ROTATE YOUR DEVICE...");}}