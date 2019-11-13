//GLOBAL VARIABLES=====================================================================================================
//*FLAGS=================================================================
    var arrSOUNDmodes=("SILENT/nBACK TRACK/nCLICK TRACK/nVOCAL/nDRUM ROCK/nDRUM COUNTRY/nDRUM COUNT").split("/n");
    var AUDfail="false";
    var AUDend="false";
    var BOOT='true';//designates first boot
    var DURsource='Default';//string where the program got the duration
    var SCROLLend=false;//indicates end of scroll
    var NOTESpresent = 'false';//indicates that notes will be available on another page
    var TRANSPOSE =0;//how many 1/2 steps to tranpose
    var PREVtitle;
//*SONG PROPERTIES========================================================
    var TITLEplus ="unknown";//used to pass info from a playlist i.e @Hallelluia/C#/70/BACK TRACK
    var ARTIST ="Unknown";
    var ARRlines="";//Array of lines from text file
    var BEATS=4;//Beats/bar
    var BPM=100;
    var BARS=0;
    var DURtext =0;//duration from the text file
    var DUR =120;//Duration for scrolling and calculating
    var IRB;//the IRB line set during format of the page
    var KEY ="C";
    var KEYbase ="C";//anchor for changeing keys on the fly
    var TITLE="Unknown";//song title being played
    var QUAL ='Raw'; //song quality
    var STYLE ="Unknown";
    var GENRE ="Unknown";
    var HITyear = "Unknown";
    var LONGLINE=40;
    var NOTEtrivia;
    var NOTEtech;
    var NOTElinks;
    var ALT =false;//does alternate song exist
//*Calculated variables====================================================
    var DURcalc=0;//Calculated duration based on Bars/Beats/time signature
    var DURmp3=0;//used on scroll(default =  DURfile, DURcalc, DURmp3, User Input)
//*SCROLLdata==============================================================
    var SCROLLbase; //Original SCROLLkon used to change scroll speed on the fly
    var SCROLLkon=0.01;
    var SCROLLpix;//ScrollPixels from height of document;
    var SCROLLstartTime=0;//when scroll started, used to regulate scroll
    var EYEline = 100; //where you should be looking
    var FLOATht=100;//height of floater in pixels
    var Ypos =0;//Yposition of the scroll 0 being the top
    var Ystart=0;//where Y is when you start the scroll
    var Yend ='false';//end of scroll
    var PRESONGlines =0;//how many lines of text exist before first chord line
    var CHORDlines =0; //how many lines are chord lines
//*Lists 
    var TUNEnum=0;//Tune Number in setlist
//*TIMEOUTS==================================================================
    var TIMEOUTdelay;//trackDelay XXXdelay the start of???
    var TIMEOUTscroll;//timeout function for scrolling
    var TIMEOUTnext; //for next tune
    var TIMEOUTslider;
    var TIMEOUTblink;
    var TIMEOUTcrap;//do not clear this one
//*PLAY MODE presets========================================================
    var SOUNDmodeDefault="SILENT";
    var SOUNDmode="SILENT";
    var AUTOnext = "false";
    var CAPS='true';
    var FULLscreen ='false';
    var POPnotes='false';
    var HILITE='false';
    var LINEnum='false';//show line numbers
    var LINEtime='true';//show min sec instead of line num
    var NOTES='true';
    var SOUND='true';
    var VOLinc=(0.7);//volume increment or decrement
    var VOLexp =2;//exponant applied to VOL
    var VOL=(0.49);//absolute volume (0>1)
//*MISC=========================================================================
    var MSGlast="NO MESSAGE!";
    var SETlist ="X";//Array of songs in setlist
    var SETname="Single Tune";//default in case a list cannot be loaded
    var WINDht;//view window height
    var ARRscale ="A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab".split(",");

//**INWORK FUNCTIONS===========================================================
function cloudPop(txt,fs,clr)
    {
        document.getElementById("cloudwords").innerHTML = txt;
        document.getElementById("cloudwords").style.color=clr;
        document.getElementById("cloudwords").style.fontSize=fs;
        document.getElementById("cloud").style.display='block';
    }

function replaceF(str,was,is)
    {
       if (is===undfined) {is ="";}
       var arrTemp=str.split(was);
       str = arrTemp.join(is);
       return str;
    }

function bogus()//list of chords used. if the std format is followed
    {
        var arrChords = ARRlines;
        var str ="";
        j = 0;
        while (j<arrChords.length)
            {
            if (lineType(arrChords[j])=='chord') {str = str +arrChords[j];}
            j = j+1;
            }
    str=str.replace(/~/g," |");
    arrChords=str.split("*");  str = arrChords.join("");
    arrChords=str.split("||"); str = arrChords.join("@");
    arrChords=str.split("|%"); str = arrChords.join("");
    arrChords=str.split("| ");  str = arrChords.join("");
    arrChords=str.split("@");  str = arrChords.join("|");
    arrChords=str.split("|NC"); str = arrChords.join("");
    str=str.replace(/ /g,"");
    str =str.substr(1);
    arrChords=str.split("|");
    str= unique(arrChords).join(" - ");
    cloudPop(TITLE +"<br>" +  unique(arrChords).length + " CHORDS<BR>"+str,"4vw","red");
    }


function knownSysProbs()
    {
        var prob ="";
        if (navigator.appVersion.indexOf("Mac")!=-1) {prob = 'Player does not work on the Mac OS';}
        else if (screen.height > screen.width){prob = 'USE THE LANDSCAPE MODE!';}
        return prob;
    }
function portraitWarning()
    {   
        if(window.innerHeight>= window.innerWidth)
            {document.getElementById('orient').style.visibility = 'visible';}
        else
            {document.getElementById('orient').style.visibility = 'hidden';}
    }
//**BOOT FUNCTIONS =========================================================//All in sequence with breaks between sub routines

window.onload = function()
    {
        statusMsg("Initiating javascript...");
        NONE =document.getElementById('none').style.display;// create object
        document.getElementById('splash').style.backgroundColor='white';
        PREVtitle ="???";
        //set up sound track selector
        var lst ="<a style='text-align:center; width:28vw'><a style='color:red;'>DEFAULT SOUND TRACK</a><br><select id='soundSelector' style='background-color:white;color:black;font-size:4vh; width:28vw' onchange='setSoundModeDefault(this.value)'><optgroup>";
        j =0;
         while (j < arrSOUNDmodes.length)
            {
                lst =lst +"\n<option>"+ arrSOUNDmodes[j] +"</option>";
                j = j+1;
            }
        lst =lst +"\n</optgroup></Select>";
        document.getElementById("soundBox").innerHTML=lst;       
        var x = (decodeURIComponent(window.location.toString())).split("?"); //see if this is a single song from editor
        if (!x[1]) //normal first time boot, no query string
            {
                BOOT = 'true';
                createSetSelector();//boot to the default list
            }
            else
            {
                BOOT ='edit';
                createARRlines(decodeFredComponent(x[1])); //play the string passed in the query string
            }
    };

function createSetSelector()//B
    {   //creates an option box from the file SetList.txt in the top directory
        statusMsg("Starting Javascript: Loading List of Sets....");
        var path ="SetList.txt";
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var SETS =content.split("\n");
        ihtml ="<a style='text-align:center; width:45vw;color:red'>PLAYLIST:</a><br><select id='Set' style='font-size:4vh' onchange='SETname=(this.value);selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
        j=0;
        while (j < SETS.length)
        {
            if (SETS[j]!=="ALL TUNES") {ihtml =ihtml +"\n<option>"+ SETS[j] +"</option>";}
            j = j+1;
        }
        ihtml =ihtml +"\n</optgroup></Select>";
        document.getElementById("setSelectA").innerHTML=ihtml;    
        selectSet("ALL TUNES");//default is ALL TUNES
    }       

//above section only used during boot program enters below here depending on what nees to be done......................................................................... 
function selectSet(set)//Selects your set by its name
    {   
        statusMsg("Getting " + set +" from the Server");
        SETname = set;
        SETlist = "";
        var request = new XMLHttpRequest();
        path ="../Sets/"+SETname+".txt";
        request.open("GET", path, false);
        request.send(null);
        SETlist = request.responseText.split("\n");
        createSetList();
    }       

function createSetList()//creates the setlist option box and selects tune 0
    {
        statusMsg("Creating " +SETname +" playlist");
        var lst ="<select id='mySet' style='background-color:white;color:black;font-size:4vh; width:50vw' onchange='selectTune(this.value)'><optgroup>";
        j =0;
        while (j < SETlist.length)
        {
            lst =lst +"\n<option>"+ SETlist[j] +"</option>";
            j = j+1;
        }
        lst =lst +"\n</optgroup></Select>";
        document.getElementById("set").innerHTML=lst;
        TUNEnum =0;//nominal tune is 0
        TITLEplus = SETlist[TUNEnum];
        TITLE =TITLEplus;
        selectTune(TITLEplus);
    }
  
function nextTune(newDir)//Entry point if you have selected the next tune in the list by direction 1,0,-1
    {   
        statusMsg("Incrementing tune list " & newDir & " steps..");
        if(SETlist[TUNEnum + newDir])//if next tune exists go to it
        {   
            document.getElementById('ButtonTrack').src="../../icons/blackWhiteSpot.png";
            passCommand('Think');
            TUNEnum =(TUNEnum + newDir);
            TITLEplus = SETlist[TUNEnum];
            document.getElementById("mySet").selectedIndex= TUNEnum;
        }
    selectTune(TITLEplus);
    }

function selectTune(titl)//Entry Point using the TITLE to download tune
    {
        statusMsg ("Selecting "+ titl);
        ALT =false;
        TITLEplus = titl;
        var arrTitle =TITLEplus.split("/");
        if (arrTitle[0].substr(0,1)=="@"){TITLE = arrTitle[0].substr(1);ALT = true;}else{TITLE = arrTitle[0];}
        CTO();
        document.getElementById('trackMsg').innerHTML="...";
        dispInFrame("<!DOCTYPE html><html><head><style>body{padding:0;margin:0}X9{ font-family:Courrier New;font-weight:bold;line-height:100%;text-align:center;color:green;font-size:8vh;line-height:100%;}</style></head><body><center><X9>"+ TITLE+"<br><br>Loading...</X9></center></body></html>");
        if (arrTitle[3]!==undefined & arrTitle[3]!== "")
        {
            SOUNDmode =arrTitle[3];
        }
        else
        {
            SOUNDmode =SOUNDmodeDefault;
        }
        dispInFrame("<!DOCTYPE html><html><head><style>body{padding:0;margin:0}X9{ font-family:Courrier New;font-weight:bold;line-height:100%;text-align:center;color:green;font-size:8vh;line-height:100%;}</style></head><body><center><X9>"+ TITLE+"<br><br>Loading...</X9></center></body></html>");
        TUNEnum = SETlist.indexOf(TITLEplus);//XXX causes problems if tune is in list more than 1 time
        loadServerTitle();
    }

function loadServerTitle()//F
    {
        statusMsg ("Getting " + TITLE + " from Server..." );
        document.getElementById('key').innerHTML="-";
        document.getElementById("title").innerHTML ="PLAYER: " +SETname +": "+TITLE;//put title on tab...
        TRANSPOSE =0;
        CTO();
        ARRlines="";
        SCROLLend ="false";
        var path ="../text/" + TITLE + ".txt";  //get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var n = content.search("404"); //look for a 404 error from server
        if (n >-1)//XXX unverified through all cases of next tune
        {  
            var str = "$\n$<a style='color:red'>\n$       NO LYRIC FILE</b>\n$<a style='color:green'>There may be a backing track!</a>";
            createARRlines(str);
        }
        else
        {
            createARRlines(content);
        }
    }
    
function createARRlines(content) //G
    {//Make ARRlines, from the text file
        statusMsg(TITLE+": Creating Array");
        BARS=0;
        ARRlines ="";
        while (content.indexOf("\r") >= 0)//get rid of linefeeds
        content = content.replace("\r", "");
        ARRlines = content.split("\n");//make an array of lines
        firstLineValues();//pulls first line values or sets defaults
        if (KEY===0 |KEY=="0") {KEY="C";}//zzzdont know where the 0 comes from but trapped here
        KEYbase =KEY;
        var arrTitle =TITLEplus.split("/");
        if (arrTitle[1]!== undefined & arrTitle[1]!== ""){newKey(arrTitle[1]);}
        if (arrTitle[2]!== undefined  & arrTitle[2]!== ""){BPM = arrTitle[2];}
        countBARS();
        loadServerTrack();
    }

function loadServerTrack()//F
    {   document.getElementById('trackIcon').src="";                      
        statusMsg('Loading Sound...');
        document.getElementById("Audio1").style.visibility ="hidden";
        passCommand("Think");
        var newBPM = BPM;
        var icon = "none.png";
        document.getElementById('Audio1').src ="";
        var delay =4000;
        if(SOUNDmode=="SILENT")//========================================================
        {
           document.getElementById('trackMsg').innerHTML="SILENT MODE";
           document.getElementById('ButtonTrack').src="../../Icons/blacktrack.png";
           durCalc();
           return;
        }
        else //tracks with BEAT Preset or Time Signature independent=====================
        {
            statusMsg(TITLE  +": Loading " + SOUNDmode);
            if(SOUNDmode=="BACK TRACK")
            {
                icon ="backtrack.png";
                document.getElementById('Audio1').src = "../Backing/"+TITLE+".mp3";
            }
            else if (SOUNDmode=="VOCAL")
            {
                icon ="vocal.png";
                document.getElementById('Audio1').src = "../VOCAL/"+TITLE+".mp3";
            }
            while (parseFloat(newBPM/5,10)!==parseInt(newBPM/5,10))
            {
                newBPM = parseInt(newBPM,10) +1;
            }
            BPM =newBPM;            
            if(SOUNDmode=="CLICK TRACK")
            {
                icon ="click.png";
                document.getElementById('Audio1').src = "../Click/"+newBPM+".mp3";
            }
            //Beat Dependent tracks (only base 2,4,8,16)so far
            if (BEATS!=2 & BEATS!=4 & BEATS!=8 &BEATS!=16 & icon=='none.png')//kick out if not 4/4 based and no trackPicked
            {
               document.getElementById('trackMsg').innerHTML="<div style='color:red'>NO DRUM TRACKS FOR "+BEATS + "/4 TIME SIGNATURE</div>";
               document.getElementById('ButtonTrack').src="../../Icons/redDrum.png";
               AUDfail ='true';
               durCalc();
               return;
            }//4/4 tracks below here=============================================
            if(SOUNDmode=="DRUM ROCK")
            {
               icon ="rock.png";
               document.getElementById('Audio1').src = "../DrumRock/"+newBPM+".mp3";
            }
            else if(SOUNDmode=="DRUM COUNTRY")
            {
               icon ="country.png";
               document.getElementById('Audio1').src = "../DrumCountry/"+newBPM+".mp3";
              }
            else if(SOUNDmode=="DRUM COUNT")//short 8 count track,
            {
               delay =1000;//shorter track requires less load time
               icon ="count.png";
               document.getElementById('Audio1').src = "../DrumCount/"+newBPM+".mp3";
            }    
            document.getElementById('trackIcon').src="../../Icons/"+icon;
            vis("trackIcon","visible");
            var x = setTimeout(function()//time to get the mp3 [arbitrary]
                {
                    DURmp3=document.getElementById('Audio1').duration;
                    clearTimeout(x);
                    if(SOUND=='true'){document.getElementById("Audio1").volume = VOL;}
                    if (isNaN(DURmp3)===false )//track successfully loaded
                    {
                        document.getElementById("Audio1").style.visibility ="visible";
                        document.getElementById('trackMsg').innerHTML="";
                        vis('trackMsg',"hidden");
                        color ='black'; AUDfail='false';
                    }
                    else//track load unsuccessful
                    {
                        document.getElementById('trackMsg').innerHTML="<div style='color:red'> No " + SOUNDmode + " available at "+BPM+" BPM</div>";
                        color='red';AUDfail ='true';
                        vis('trackMsg',"visible");
                    }
                    document.getElementById('ButtonTrack').src="../../Icons/"+ color+icon;
                    durCalc();
                },delay);//time to load mp3
        }
    }

function durCalc()//H
    {   
        statusMsg(TITLE + "Calculating duration");
        DUR = 0;DURcalc=0;//DURtext=0;
        DURsource="Undefined";
        DURcalc = parseInt(BARS*BEATS*60/BPM,10);//alert(DURcalc);
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

function arrConvert()//J
    {   //Setup to walk thru the ARRLines
        PRESONGlines=0;
        NOTEtech = undefined;
        NOTEtrivia=undefined;
        NOTElinks=undefined;
        IRB = undefined;
        statusMsg( TITLE +': Formatting...');
        var lyricLines = lyricLineCount();//XXX combine with longestLine???
        LONGLINE =longestLine()+1;
        CHORDlines =chordLines();
        PRESONGlines =preLines();
        if (LINEnum =='true'|LINEtime=='true') {LONGLINE=LONGLINE +4;}//adding space
        NOTESpresent ='false';
        var n;
        j =0;
        var htmlString = "";
        var lineNum =1;
        while(j < ARRlines.length)//Walk through the ARRlines to build the htmlStrings  
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
                if (NOTEtrivia===undefined) {NOTEtrivia="";}
                NOTEtrivia =NOTEtrivia +NewLine.substr(2)+"<br><br>" ;NewLine=undefined; NOTESpresent ='true';
            }
            else if (lType== 'noteTech')
            {
                if (NOTEtech===undefined) {NOTEtech="";}
                NOTEtech =NOTEtech +NewLine.substr(3)+"\n" ;NewLine=undefined; NOTESpresent ='true';
            }
            else if  (lType== 'link')
            {
                if (NOTElinks===undefined) {NOTElinks="";}
                
                var arrTemp = NewLine.split("|");
                NOTElinks =NOTElinks +"<a onclick =window.open('"+arrTemp[0]+"')>" + arrTemp[1]+ "</a><br>" ;NewLine=undefined; NOTESpresent ='true';
            }            
            else if (lType =='chord')
            {
                n=0;
                count =0;
                while(n<NewLine.length)
                    {
                        if (NewLine[n]=="|"){count = count +1;}    //counting BARS
                        n =n+1;
                    }
                if (TRANSPOSE !== 0){NewLine = lineTranspose2(NewLine,TRANSPOSE);}
                if (HILITE =='true')
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
                if (LINEnum == 'true'||LINEtime=='true')  {NewLine = "<X6>    </X6>" + NewLine;}  
            }
            else if (lType =='header')
            {
                NewLine= NewLine.substring(1,NewLine.length);//cutoff #
                while (NewLine.length < LONGLINE){NewLine = NewLine +"-";}
                if(HILITE=="true"){NewLine = "<X3>" + NewLine + "</X3>";}
                if (LINEnum == 'true'||LINEtime=='true')  {NewLine = "<X6>    </X6>" + NewLine;}
            }
            else if (lType =='lyric')
            {
                if (CAPS=='true') {NewLine = NewLine.toUpperCase();}                   
                if (HILITE =='true')
                {
                    while (NewLine.length < LONGLINE)
                    {
                        NewLine = NewLine +" ";
                    }
                    NewLine = "<X7>" + NewLine + "</X7>";
                }
                var num;
                if (LINEnum == 'true')
                {    
                        if (lineNum <10) {num ="<X5>"+lineNum + "   </X5>";}
                        else if (lineNum <100) {num ="<X5>"+lineNum + "  </X5>";}
                        else {num =+"<X5>"+lineNum + " </X5>";}
                        NewLine = num + NewLine;
                        lineNum = lineNum+1;
                }
                if (LINEtime == 'true')
                {  
                    NewLine = "<X5>" + secToMin(((lineNum-1)/lyricLines)*DUR,10)+ "</X5>"+NewLine;
                    lineNum = lineNum+1;
                }
            }
            else if (lType =='spacer')
            {
                NewLine= "."+  NewLine.substring(1,NewLine.length);
                while (NewLine.length < LONGLINE)
                    {
                        NewLine = NewLine +" ";
                    }
                    NewLine = "<X7>" + NewLine + "</7>";                    
                if (LINEnum == 'true'||LINEtime=='true')  {NewLine = "<X6>    </X6>" + NewLine;}
            }
            else if (lType =='note')
            {
                if (NOTES =='true')
                {
                    NewLine= NewLine.substring(1,NewLine.length);//cutoff @                                                                                                                                                                                                                     
                    while (NewLine.length < LONGLINE)
                        {
                            NewLine = NewLine +" ";
                        }
                    NewLine = "<X8>" + NewLine + "</X8>";
                    if (LINEnum == 'true'||LINEtime=='true')
                        {
                            NewLine = "<X6>    </X6>" + NewLine;
                        }
                }
                else
                {
                    NewLine = undefined;//suppress the line
                }
            }
            if(NewLine){htmlString = htmlString  +  NewLine + "\n";}            
            j = j+1;     
        }
        htmlString = htmlString + "</pre></body></html>";
        htmlHead = "<!DOCTYPE html><html><head><title>Not Important</title><style>Body{font-size : ";
        var len =3;
        if (LONGLINE<75){len=3.3-(LONGLINE-40)*0.0360;}else{len=2.14-(LONGLINE-75)*0.025;}//emperically derived
        n = len.toString();
        htmlHead = htmlHead + n.substring(0,4);
        htmlHead = htmlHead + "vw; margin :0vh; padding: 0; font-family:Courrier New;font-weight:bold;line-height:100%;text-align:left;background-color:white;}";
        htmlHead = htmlHead + "X2{color:red;} X3{background-color:lightgrey} X4{color:red;background-color:#F4FA58} X5{color:white;background-color:darkgrey} X6{background-color:lightgrey}X7{background-color:white}X8{color:blue;background-color:pink}X9{color:";//green;font-size:8vh;line-height:100%;text-align:center}</style></head><body>"; //XXSet other body format could use CSS </style></head><body><pre>"; //XXSet other body format could use CSS             
        var col="green";
        var tit =TITLE;
        if (ALT ===true) {col = 'red'; tit = TITLE + " (ALTERNATE SONG)";}
        htmlHead = htmlHead + col + ";font-size:8vh;line-height:100%;text-align:center}</style></head><body>";
        htmlString = htmlHead +"<X9><header margin:0; padding:0>"+ tit + "</header></X9><pre>" +htmlString ;//XX
        dispInFrame(htmlString);
        if(NOTEtech!==undefined){NOTEtech ="<pre>TECH NOTES\n"+NOTEtech+"</pre>";}
        if (NOTEtrivia===""|NOTEtrivia===undefined) {vis("ButtonTrivia","hidden");}else{vis("ButtonTrivia","visible");}
        if (NOTEtech===""|NOTEtech===undefined) {vis("ButtonTech","hidden");}else{vis("ButtonTech","visible");}
        if (NOTElinks ===""|NOTElinks===undefined) {vis("ButtonLinks","hidden");}else{vis("ButtonLinks","visible");}
        if (IRB ===""|IRB ===undefined){vis("irbIcon","hidden");}else{vis("irbIcon","visible");}
        scrollSetup();
    }

function scrollSetup()//get the song data,songHeight,iframeHeight,Duration,ScrollConstant Run after you set the content of page
    {   
        statusMsg(TITLE + ": Scroll Setup...");
// initial defs      
        PAGEht =document.getElementById("Tune").contentWindow.document.body.clientHeight;
        WINDht = document.getElementById("Tune").contentWindow.innerHeight;
//set floater        
        EYEline = parseInt((((PRESONGlines/2) +0.6)*(PAGEht/CHORDlines)),10);//empiracle where you should be looking/
        FLOATht=parseInt((WINDht/4),10);
        document.getElementById("floater").style.height =FLOATht+"px";//~1/4 OF THE SCREEN
        document.getElementById("floater").style.top =(EYEline-FLOATht/2)+"px";
//scroll to top      
        document.getElementById('Tune').contentWindow.scrollTo(0,0);
        Ystart=0;//WWW  
        Yend='false';
        Ypos = document.getElementById("Tune").contentWindow.scrollY;//should get this at Play
        SCROLLpix=parseInt(PAGEht,10);//pixels the EYEline will move
        SCROLLkon = DUR*1000/SCROLLpix;//microseconds per pixel
        SCROLLbase = SCROLLkon;
        document.getElementById('speed').innerHTML=BPM;//0 speed
        document.getElementById('key').innerHTML=KEY;//0 speed
        if (SOUNDmode !== "SILENT")
        {
            document.getElementById("volCtrl").style.visibility ='visible';
        }
        else
        {
            document.getElementById("volCtrl").style.visibility ='hidden';
        }

        passCommand("Ready");
        if (SETname =='Single Tune'){document.getElementById("title").innerHTML ="PLAY: " +TITLE;} 
        if (DURsource =="Default"){color ="Yellow";}//DUR =150;was removed
        var mesg ="DURATION: " + secToMin(DUR) + " (from " + DURsource +") [TIME "+BEATS +"/4]  {TUNE " + parseInt( TUNEnum+1 ,10) + " of "+ SETlist.length +"}";
        if (BOOT !== 'false')
        { 
            if (BOOT =='true')
            {   document.getElementById('ButtonHome').src ='../../Icons/blackHome.png';
                document.getElementById('msg2').style.zIndex =2001; color ='yellow';
                BOOT = 'false';
                mesg = "SELECT YOUR DEFAULT SOUND MODE and YOUR PLAYLIST!!!";
                portraitWarning();
                window.addEventListener("orientationchange", function(){TIMEOUTcrap=setTimeout(function(){portraitWarning();},1000);});
                document.getElementById("splash").style.display='none';
            }
            else if (BOOT =='edit')
            {
                document.getElementById("splash").style.display='none';
                document.getElementById('ButtonHome').src ='../../Icons/blackHome.png';
                statusMsg("Song passed from the editor...CONFIGURATION SETTINGS DISABLED",'pink');
                BOOT='false';
            }
        }
        statusMsg(mesg);
        document.getElementById('startIcon').src ="../../icons/play.png";
        document.getElementById('startIcon').style.visibility ='visible';
        if (POPnotes =='true'& NOTEtrivia!==undefined & PREVtitle !==TITLE)
           {
            var arrNote= NOTEtrivia.split("<br><br>");
            cloudPop ("<center>" +TITLE.toUpperCase() +"<br>HIT YEAR " +HITyear +"</center><br>" +arrNote[0].toUpperCase(),'3vw','black');
            }
        PREVtitle=TITLE;
        if (SETlist[TUNEnum +1].substr(0,1)=="@"){flash("Alternate Song--"+ SETlist[TUNEnum +1],8);}        
    }  
//**PLAYER ROUTINES====================================================================================================

function scrollEngine()//the actual scrolling routine keep it simple
    {   //before it starts SCOLLstartTime, EYEline, SCROLLkon must be set ,
        nowTime = new Date().getTime(); 
        Ypos = document.getElementById("Tune").contentWindow.scrollY;
       
        if (EYEline<parseInt((WINDht/2),10))//move part 1
        {
            EYEline= parseInt(EYEline +1,10);
            document.getElementById("floater").style.top =(EYEline-FLOATht/2)+"px";
            SCROLLstartTime=nowTime = new Date().getTime();
        }
        else if(Yend=='true') //didnt move//move part 3
        {   
            EYEline= parseInt(EYEline +1,10);
            document.getElementById("floater").style.top =(EYEline-FLOATht/2)+"px";
        }         
        else//STD SCROLL move part 2
        {
            var newPos = parseInt(((nowTime - SCROLLstartTime)/SCROLLkon)+Ystart,10);
            document.getElementById("Tune").contentWindow.scrollTo(0, newPos);
            if (document.getElementById("Tune").contentWindow.scrollY !== newPos){Yend ='true';}
        }
        if (EYEline<(WINDht+FLOATht/2))
        {
            TIMEOUTscroll = setTimeout(function(){scrollEngine();},SCROLLkon);
        }
        else
        {
            Yend ='true';
            endSong();
        }
    }
function closeSong()//used to indicate audio end (needed to remove listener)
    {
        AUDend='true';
        endSong();
    }

function endSong()
    {//alert("AN: "+ AUTOnext+"  AE: "+AUDend+"   SE: "+Yend);
        if (AUDend=='true'|AUDfail =='true')
            {
                document.getElementById("Audio1").removeEventListener('ended',closeSong);
            }
        if (Yend=='true' & (AUDend =='true'|AUDfail =='true'))
            {   
                document.getElementById("ButtonReset").src = "../../icons/blackResetSTOP.png";
                if ((AUDend =='true'|AUDfail =='true') & Yend=='true')
                {   
                if (AUTOnext =='false')//end
                {
                    statusMsg ('End of Song','red');passCommand('End');
                    document.getElementById("ButtonReset").src = "../../icons/blackResetEnd.png";
                    //if (POPnotes =='true'& NOTEtrivia!==undefined) {notePopUp(NOTEtrivia,'3vw','black');}
                }         
                else//auto next
                {
                    if (TUNEnum!==(SETlist.length-1)) //{document.getElementById("nextIcon").style.visibility = "hidden";}
                    {
                        statusMsg("Auto-Advancing to Next Song....","yellow");
                        passCommand('Think');//???
                        TIMEOUTnext  =setTimeout(function(){nextTune(1);},5000);
                    }
                    else
                    {
                        document.getElementById("ButtonReset").src = "../../icons/blackResetEnd.png";
                        statusMsg("END of Set...","red");
                        passCommand('End');    
                    }
                }
            }    
        }
    }
    
function dispInFrame(htmlString)
        {var ifrm = document.getElementById("Tune");//Write to the frame  
        //xxxdont know what next line is about is about
        ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;//XXX Understand???
        ifrm.document.open();
        ifrm.document.write(htmlString);
        ifrm.document.close();
        }

function notePopUp(str,fs,clr)
    {   document.getElementById('popup').style.display='block';
        document.getElementById('popup').style.color=clr;
        document.getElementById('popup').style.fontSize=fs;
        document.getElementById('popup').innerHTML = str;
    }

function CTO()
    {//clear all Timouts
        clearTimeout (TIMEOUTdelay); 
        clearTimeout (TIMEOUTscroll);
        clearTimeout (TIMEOUTnext);
        clearTimeout (TIMEOUTslider);
    }

function scrollTune(pct)//WWWneeds rewriting to new machine to slide fast and to work while not scrolling
    {
        if (EYEline==parseInt((WINDht/2),10))
        {   
            clearTimeout(TIMEOUTscroll);
            var y = document.getElementById("Tune").contentWindow.scrollY;
            var adj = parseInt(WINDht*pct,10);
            Ypos = y + adj;
            document.getElementById("Tune").contentWindow.scrollTo(0, Ypos); 
            SCROLLstartTime = new Date().getTime();
            Ystart = document.getElementById("Tune").contentWindow.scrollY;
            scrollEngine();
       }    
    }

function passCommand(cmd)
    { //configures the play screen to match the play status(moves, diplays and hides icons )
        if(cmd == "DelayedPlay"| cmd == "Play"| cmd == "Scroll"| cmd == "Ready" | cmd == "Pause"| cmd == "Reset"| cmd == "Think"| cmd == "End")
        {   
            document.getElementById('speed').innerHTML=BPM;SCROLLkon=SCROLLbase;//0 speed
            dis("cloud","none");
            dis("popup","none");
            dis('infoList','none');
            vis("msg2","hidden");
            vis("ButtonTrack","visible");
            vis("ButtonReset","visible");//control bar
            vis("ButtonHome","visible");
            vis("speed","visible");
            vis("ButtonInfo","visible");
            vis("key","visible");
            vis("ButtonTools","visible");
            vis("buttonCover","hidden");
            vis("buttonCover2","hidden");
            vis("nextIcon","hidden");//controls on screen
            vis("lastIcon","hidden");
            vis("playIcon","hidden");
            vis("pauseIcon","hidden");
            vis("trackIcon","hidden");
            vis("resetIcon","hidden");
            vis("startIcon","hidden");
            vis("thinkIcon","hidden");
            vis("statusIcon","hidden");
            vis("floater","hidden");
            vis("countIcon","hidden");
            vis("turtle","hidden");
            vis("rabbit","hidden");
            vis("keyList","hidden");//User lists
            vis("drumList","hidden");
            vis("trackList","hidden");
            vis("tempoList","hidden");
            if(cmd == "DelayedPlay"){//turn on individual icons per cmd
                vis('countIcon', "visible");
                document.getElementById("countIcon").src = "../../icons/321.gif";
                document.getElementById('ButtonReset').src = "../../icons/resetSpinner.gif";
                document.getElementById("floater").style.visibility = "visible";
                document.getElementById("msg2").style.visibility = "visible";
                vis("buttonCover","visible");
                vis("buttonCover2","visible");
            }if(cmd == "Scroll"){
                vis("pauseIcon","visible");
                document.getElementById('ButtonReset').src = "../../icons/resetSpinner.gif";
                document.getElementById("rabbit").style.visibility = "visible";
                document.getElementById("turtle").style.visibility = "visible";    
                document.getElementById("floater").style.visibility = "visible";
                vis("buttonCover","visible");
                vis("buttonCover2","visible");
                vis("speed","visible");
            }if(cmd == "Play"){
                document.getElementById('ButtonReset').src = "../../icons/resetSpinner.gif";
                vis("pauseIcon","visible");
                vis("buttonCover","visible");
                vis("buttonCover2","visible");
                document.getElementById("floater").style.visibility = "visible";
                vis("speed","visible");
            }if(cmd == "Ready"){
                document.getElementById('statusIcon').src = '../../Icons/'+ QUAL+'.png';
                vis('ButtonReset','hidden');
                document.getElementById("startIcon").src="../../icons/play.png";
                document.getElementById("nextIcon").style.visibility = "visible";
                document.getElementById("lastIcon").style.visibility = "visible";
                document.getElementById("statusIcon").style.visibility = "visible";
                vis("ButtonTools","visible");
                document.getElementById("ButtonInfo").style.visibility = "visible";
                document.getElementById("msg2").style.visibility = "visible";
                vis("speed","visible");
            }if(cmd == "End"){
                vis('ButtonReset','hidden');
                document.getElementById("statusIcon").src = "../../icons/outlineHandStop.png";
                if(NOTESpresent=='true'){document.getElementById("ButtonInfo").style.visibility = "visible";}
                vis('statusIcon', 'visible');
                vis('resetIcon', 'visible');
                vis('nextIcon', 'visible');
                vis('lastIcon', 'visible');
                vis("speed","visible");
                document.getElementById("msg2").style.visibility = "visible";
            }if(cmd == "Pause"){
                document.getElementById('ButtonReset').src = "../../icons/resetSpinner.png"; 
                document.getElementById("statusIcon").src = "../../icons/OutlinePause.png";                
                vis("playIcon","visible");
                vis('resetIcon','visible');
                document.getElementById("msg2").style.visibility = "visible";
                document.getElementById("floater").style.visibility = "visible";
                vis("buttonCover","visible");
                vis("buttonCover2","visible");
            }if(cmd == "Reset"){
                document.getElementById("countIcon").src = "../../icons/3.gif";
                document.getElementById("statusIcon").src = "../../icons/outlineThumbsUp.png";                
                document.getElementById("msg2").style.visibility = "visible";
            }if(cmd == "Think"){
                document.getElementById('ButtonReset').src = "../../icons/resetSpinner.png";
                document.getElementById("msg2").style.visibility = "visible";
                vis('ButtonTrack','hidden');
                vis("thinkIcon","visible");
                vis("buttonCover","visible");
                vis("buttonCover2","visible");}
            if (TUNEnum===0) {document.getElementById("lastIcon").style.visibility = "hidden";}
            if (TUNEnum==(SETlist.length-1)) {document.getElementById("nextIcon").style.visibility = "hidden";}
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
        Ystart=Ypos;//WWW  
        Yend='false';
        Ypos = document.getElementById("Tune").contentWindow.scrollY;//should get this at Play
    }

function trackDelay()//WWW
    {   //starts audio and scroll with delay of 3 seconds
        passCommand("DelayedPlay");
        statusMsg("START  SONG  WHEN  THE  SCROLL ROLLS!!",'Yellow');
        TIMEOUTdelay=setTimeout(function()
        {   
            clearTimeout(TIMEOUTdelay);
            passCommand("Play");
            SCROLLstartTime = new Date().getTime();
            trackPlay();
        },3000);
    }
    
function trackPause()
    {   
        CTO();
        if (EYEline>parseInt((WINDht/2),10))//Reset EYEline if its in the final slide down
            {
                EYEline=parseInt((WINDht/2),10);
                document.getElementById("floater").style.top =(EYEline-FLOATht/2)+"px";
            }
        if (SOUNDmode !== 'SILENT'){document.getElementById("Audio1").pause();}
        statusMsg("Paused...","yellow");
        passCommand("Pause");
    }

function trackPlay()
    {
        AUDend ="true";
        passCommand("Play");               
        SCROLLstartTime = new Date().getTime();
            if (SOUNDmode !== 'SILENT')//{document.getElementById("Audio1").play();} 
            {
                AUDend ="false";
                document.getElementById("Audio1").play();
                document.getElementById('Audio1').addEventListener("ended",closeSong);
                endSong();
            }
        
        Ystart = document.getElementById("Tune").contentWindow.scrollY;
        passCommand("Scroll");
        scrollEngine();//scrolls the lyric
    }
    
function trackReset()
    {
        CTO();
        if (document.getElementById("Audio1"))
        {
            document.getElementById("Audio1").autoplay = false;
            document.getElementById("Audio1").load();
            if(SOUND== 'true'){document.getElementById("Audio1").volume =VOL;}
        }
        arrConvert();//XXXwhy???? try just scrolling to the top
    }

function blinker(id,cycles)
    {
        var d = document.getElementById(id) ;
        if (cycles>0)
        {
            TIMEOUTblink=setTimeout(function()
                {   
                    if (d.style.visibility=='hidden'){d.style.visibility='visible';}else{d.style.visibility='hidden';}
                    cycles = cycles -1;
                    blinker(id,cycles);
                },250);
        }else{clearTimeout(TIMEOUTblink);d.style.visibility='visible';}
    }

function unique(/*str[]*/ arr)  //finds unique elements in an array arr
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


function flashBlink(msg,dur,id,blinks){flash(msg,dur);blinker(id,blinks);}

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

//**CONFIG FUNCTIONS===================================================================================================

function slideScreen(dir,slidePos)//works from bottom in %
    {
    var inc; var fin;
    if (slidePos===undefined){slidePos=(document.getElementById('playerCover').style.bottom).replace("%","");}
    if (dir =='up'){inc =+4; fin =100;}else{inc = -4;fin =18;}
    if (slidePos <= 101 |slidePos>=12)
        { TIMEOUTslider=setTimeout( function()
            {
                slidePos=parseInt(slidePos,10)+parseInt(inc,10);
                document.getElementById('playerCover').style.bottom = slidePos+'%';
                if (slidePos < 99 & slidePos>=18)
                    {
                        slideScreen(dir,slidePos);
                    }
                else
                    {
                        clearTimeout(TIMEOUTslider);
                        document.getElementById('playerCover').style.bottom = fin+'%';
                        slidePos =fin;
                    if (fin ==18){dis('tools','block');dis('infoList','none');}
                    }
            },10);
        }
    }

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
        var strt;var fin;var inc; var j = 0;  var lst="";var beats;var beatUp =beats;var beatDown;
        if ((SOUNDmode == "BACK TRACK"|SOUNDmode == "VOCAL")&(isNaN(DURmp3)===false))
        {
            statusMsg("You cannot change the Tempo of an Pre-recorded audio file...",'yellow');
        }
        else if (document.getElementById('tempoList').style.visibility=='visible')
        {
            vis('tempoList','hidden');
        }
        else
        {   
            if (SOUNDmode =='SILENT'|AUDfail=='true'){strt=50;fin=300;inc=5;}
            if (SOUNDmode =='DRUM ROCK'|SOUNDmode =='CLICK TRACK'|SOUNDmode =='DRUM COUNT'){strt=70;fin=220;inc=5;}
            else if (SOUNDmode =='DRUM COUNTRY'){strt=70;fin=220;inc=10;}
            beats =strt;j=0;
            while (beats <BPM){beats = beats +inc;j=j +1;}
            lst= "<a onclick = 'setBPM("+beats+")' style='color:lightgreen'>"+ beats +"</a><br>";           
            j=1;c=1;
            while (c <=10)
                {
                    beatUp =beats + (j*inc); beatDown =beats - (j*inc);
                    if (beatUp <=fin) {lst= "<a onclick = 'setBPM("+beatUp+")'>"+ beatUp +"</a><br>"+lst;c=c+1;}
                    if (beatDown >=strt) {lst= lst+"<a onclick = 'setBPM("+beatDown+")'>"+ beatDown +"</a><br>";c=c+1;}
                    j = j+1;
                }
            document.getElementById('tempoList').innerHTML=lst;
            vis('tempoList','visible');
        }
    }

function newKey(nk)
    {
    var i;
    var j =1;
    vis('keyList','hidden');
    while(ARRscale[j]!==KEYbase){j = j+1;}
    i =j;
    while(ARRscale[j]!==nk){j = j+1;}
    j = j-i;
    KEY =nk;
    TRANSPOSE=j;
    arrConvert();
    document.getElementById('key').innerHTML=nk;
    }

function setBPM(bpm)
    {
        if (SOUNDmode =='SILENT'){BPM = bpm;durCalc();}
         else   {
                BPM =bpm;
                loadServerTrack();
            }
        vis('tempoList','hidden');
    }

function setSoundModeDefault(mode)//used to indicate audio end (needed to remove listener)
    {
        var num = arrSOUNDmodes.indexOf(mode);//alert('NUMBER from Array:' + num);
        document.getElementById("soundSelector").selectedIndex = num;// alert("----");
        SOUNDmodeDefault=SOUNDmode = mode;//alert("DEFAULT SOUND MODE: "+ SOUNDmode);
        if (BOOT =='false'){nextTune(0);}//ZZZcheck to see if you can take it out of the boot stream
    }

function setSoundMode(mode,icon)
    {   vis('trackList','hidden'); vis('drumList','hidden');
        SOUNDmode = mode;
        loadServerTrack();
    }

function setCustom(VAR,val,action)
    {
        if (!val)
            {if (window[VAR]=='true'){window[VAR]='false';}else{window[VAR]='true';}}
        else
            {window[VAR]=val;}
        if (window[VAR]== 'true')
            {document.getElementById("img"+VAR).src ="../../Icons/On.png";}
        else
            {document.getElementById("img"+VAR).src ="../../Icons/OFF.png";}
        if (VAR=='LINEnum'& LINEnum =='true'){window[LINEtime]='false';document.getElementById("imgLINEtime").src ="../../Icons/OFF.png";LINEtime='false';}
        if (VAR=='LINEtime' & LINEtime=='true'){window[LINEnum]='false';document.getElementById("imgLINEnum").src ="../../Icons/OFF.png";LINEnum='false';}
        if (VAR=='FULLscreen'){if(FULLscreen =='true'){launchIntoFullscreen(document.documentElement);}else{exitFullscreen();}}
        if (VAR=='POPnotes'){if(POPnotes =='true'){PREVtitle="unknown";}}
        if (action=='refresh') {arrConvert();}
    }

function launchIntoFullscreen(element)
    {
       if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

function exitFullscreen()
    {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }

function toolMode(tf)
    {
        if (tf=='true')
        {
            slideScreen('down');
            vis('keyList','hidden');vis('tempoList','hidden');vis('trackMsg','hidden');vis('trackList','hidden');vis('drumList','hidden');
            document.getElementById('msg2').style.zIndex=1001;
        }
        else if (tf=='false')
        {
            dis('tools','none');slideScreen('up');document.getElementById('msg2').style.zIndex=985;vis('trackMsg','visible');
            statusMsg("DURATION: " + secToMin(DUR) + " (from " + DURsource +") [TIME "+BEATS +"/4]  {TUNE " + parseInt( TUNEnum+1 ,10) + " of "+ SETlist.length +"}");
        }
    }   

function tgl(vrbl,val)
    {
        if (!val)
        {if (window[vrbl]=='true'){window[vrbl]='false';}else{window[vrbl]='true';}}
        else
        {window[vrbl]=val;}
        if (window[vrbl]== 'true'){document.getElementById("img"+vrbl).src ="../../Icons/On.png";}
        else
        {document.getElementById("img"+vrbl).src ="../../Icons/OFF.png";}
    }

function togl(vrbl)
    {   tgl(vrbl);
        if(vrbl== 'LINEtime' && LINEnum =='true'){tgl('LINEnum','false');}
        else if(vrbl== 'LINEnum' && LINEnum =='true'){tgl('LINEtime','false');}
    }

function volSet2(volDelta)//VolDelta will be -1,0,+1 {-10=off}
    {
        if (volDelta == 10 & SOUND == 'true')
        {
            SOUND ='false';
            document.getElementById("Audio1").volume = 0;
            document.getElementById("soundOO").src ="../../Icons/Off.png";
        }
        else 
        {   
            if (volDelta == 10)
            {
                SOUND = 'true';
                volDelta = 0;
                document.getElementById("soundOO").src ="../../Icons/ON.png";
            }
            var newExp = parseInt(VOLexp +volDelta,10);
            if(newExp < 5  && newExp > -1)//0,1,2,3,4 (4 being the lowest volume)
            {
                VOLexp = newExp;
                VOL = Math.pow(VOLinc,VOLexp);
                var newTop = parseInt(25+(VOLexp*6),10)+"vh";//knob position
                document.getElementById("SK").style.top =newTop ; 
                var uH=parseInt(newExp*7.5,10)+'vh';
                document.getElementById("SUp").style.height =uH;//height of button
            }
        }
    if (SOUND == 'true'){document.getElementById("Audio1").volume = VOL;}
    }

//**GLOBAL FUNCTIONS Used from any screen ===================================================================================================

function fileFromPath(path)
    {path = path.split('/');return (path[path.length-1]);}
    
function statusMsg(msg,bgcolor)//xxx could trim to 40 chr
    {
       // if (bgcolor===undefined) {bgcolor = "white";} //incase you forgot color
        MSGlast = msg;
        if(document.getElementById("msg2").style.zIndex >=4000 ){bgcolor = 'transparent';}
        else if (document.getElementById("msg2").style.zIndex >= 1001){if (bgcolor === undefined) {bgcolor = 'black';}}
        else if (document.getElementById("msg2").style.zIndex < 1001){if (bgcolor === undefined) {bgcolor = 'black';}}
        else if (bgcolor === undefined){bgcolor = 'black';}
        document.getElementById("msg2").style.backgroundColor = bgcolor;
        if (bgcolor == "black"){document.getElementById("msg2").style.color = 'white';}
        else if (bgcolor == "red"){document.getElementById("msg2").style.color = 'yellow';}
        else{document.getElementById("msg2").style.color = 'black';}
        document.getElementById("msg2").innerHTML = msg;
        }

function secToMin(sec)//XXX this sucks
    {   var m =parseInt((sec/60),10);
        var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
        if (s < 10) {s = ":0" + s;}else{s = ":" + s;}
        return m+s;
    } 

function hash(hashString,key,defaultVal)//Gets hash values from string a:b,c:d,e:f,......
   {    var arrHash = (hashString.split(",")); // an array from hashString   
        var i=0;
        while (i < arrHash.length)
        {
            var ele=(arrHash[i].split(":"));//Hash4 an array of the first element of Hash3
            if(ele[0] == key)
            {
                defaultVal = ele[1];
                i = arrHash.length;//kick you out must be a better way
            } 
            i++;
        }
    return defaultVal;
    }

//**TRANSPOSE FUNCTIONS===================================================================================================
  
 function lineTranspose2(line,steps)//transpose entire line and try to keep the absolute chord spacing despite differnces in chr of new chord
    {   
        var lineNew;
        if (steps===0)
        {
            lineNew = line;
        }
        else
        {   //set up constants
            var chordNew ="";
            var chord =""; //where chrs are collected until a space ends the chord
            var adj = 0;  //how the length of the new line compares to old (- shorter  + longer) so spaces can be added (ex 3 would mean new line is 3 chr to long and 3 spaces should be take out asap)
            lineNew= "";
            var n=0;
            while (n < line.length)//step through the line
            {  
                if (line[n]==" ")
                {
                    if (chord.length ===0)//not working a chord so work space
                    {
                        if (adj > 0)
                        {
                            adj = parseInt(adj -1,10);//dont add the space and take adjustment down one...
                        }
                        else
                        {
                            lineNew = lineNew + " ";
                        }
                    }
                    else //closing a chord with the space
                    {
                        chordNew = chordTranspose2(chord,steps);
                        adj = adj + (chordNew.length - chord.length);//set adjustment
                        if (adj < 0)
                        {
                            while(adj < 0)
                            {
                                adj = adj+1;
                                chordNew = chordNew +" ";
                            }
                        }
                        lineNew = lineNew + chordNew  + " ";
                        chord ="";//reset for another chord
                        chordNew ="";
                    }
                }
                else
                {
                    chord = chord + line[n];
                    if (n==line.length-1)//end of the line but no space to change
                    {
                        lineNew = lineNew + chordTranspose2(chord, steps);
                    }
                }
            n=n+1;
            }
        }
    return lineNew;
    }
   
function chordTranspose2(chord,steps)
    {   var chordNew ="";
        if (steps===0)
        {
            chordNew = chord;
        }
        else
        {
            var n=0;
            chord = chord.replace(/A#/g,"Bb");//purge odd chords
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
                    if (n < chord.length-1 &&(chord[n+1]=="#"|chord[n+1]=="b"))//if not at the end of the chord check for next part of note
                    {
                    chordNew = chordNew + noteTranspose2(chord[n]+chord[n+1],steps);
                    advance =2;  //increment the count since you used 2 chrs
                    }
                    else
                    {
                    chordNew = chordNew+ noteTranspose2(chord[n],steps);
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

function noteTranspose2(note,steps)//must be sure to add # or b beforce calling the routine  
    {   var noteNew = "?";
        var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab"; 
        var arrScale=scale.split(",");  //make array
        note = note.replace(/A#/g,"Bb");
        note = note.replace(/B#/g,"C"); 
        note = note.replace(/Cb/g,"B");
        note = note.replace(/Db/g,"C#");
        note = note.replace(/D#/g,"Eb");
        note = note.replace(/Fb/g,"E");
        note = note.replace(/E#/g,"F");
        note = note.replace(/Gb/g,"F#");
        note = note.replace(/G#/g,"Ab");
        for (i = 13; i < 38; i++)// get the position of the first letter starting at 13 and work up
        {
            if (arrScale[i] == note){break;}//get the current note position
        }
        noteNew = arrScale[i+steps];
        return noteNew;
    }
//***NAVIGATION FUNCTIONS ===================================================================================================
function editor(){window.open(encodeURI("editor.html?"+(encodeFredComponent(ARRlines.join("\n")))));}//WORKS ON WICKED GAME

function notes(){window.open(encodeURI("notes.html?"+encodeFredComponent(ARRlines.join("\n"))+"?"+encodeFredComponent(TITLE)));}

function research(){window.open(encodeURI("research.html?"+encodeFredComponent(TITLE)));}   

function playlist(){window.open(encodeURI("playlist.html?"+encodeFredComponent(SETname)+"?"+encodeFredComponent(SETlist.join("\n"))));}

function print(){window.open(encodeURI("print.html?"+encodeFredComponent(TITLE)+"?"+encodeFredComponent(ARRlines.join("\n"))));}

function home(){window.open("index.html");}

function history(){window.open("player.txt");} 

function iRealLink(){window.open(IRB);}

function fileLister(){window.open("FileLister.html");}

//**ANALYSIS FUNCTIONS===================================================================================================
//perform general functions and can be adapted to different screens 
function analizeSong()
    {
        var str = "TITLE: "+ TITLE+ " (SOUND MODE: " + SOUNDmode +")";
        str = str +"\nPLAYLIST: "+ SETname +"\n=================================================================";
        str = str +"\nKEY: "+ KEY + " (Transposed " + TRANSPOSE +")";
        str = str +"\nTIME SIG: "+ BEATS  + "\nBARS: "+ BARS + "\nTEMPO: "+ BPM +" BPM" + "\nQUALITY: "+ QUAL; //+ "\nARTIST: "+ ARTIST;
        str = str +"\nGENRE: "+ GENRE  + "\nSTYLE: "+ STYLE +"\nARTIST: "+ ARTIST;
        str = str +"\nHIT YEAR: "+ HITyear;
        str = str +"\n======================\nDURATION: "+ DUR+ " ("+secToMin(DUR)+ ")\nDUR SOURCE: "+ DURsource; 
        str = str +"\n   DUR CALC: "+ DURcalc + " (" + secToMin(DURcalc)+ ") 100%";
        str = str +"\n   DUR FILE: "+ DURtext + " (" + secToMin(DURtext)+ ")" + parseInt(DURtext*100/DURcalc,10)+"%" ;
        str = str +"\n   DUR MP3: "+ parseInt(DURmp3,10) + " (" + secToMin(DURmp3)+ ")"+ parseInt(DURmp3*100/DURcalc,10)+"%";
        str = str +"\n======================\nTECHNICAL INFO"; 
        str = str +"\n   LONGEST LINE: "+ LONGLINE + " charcters";
        str = str +"\n   PRE-SONG LINES: "+ PRESONGlines + " lines";
        str = str +"\n   CHORD LINES: "+ CHORDlines + " lines";
        str = str +"\n   VIEW WINDOW: "+ WINDht + " pixels (" + parseInt(100*WINDht/SCROLLpix,10)+")%";
        str = str +"\n   DOCUMENT HT: "+ SCROLLpix + " pixels";
        str = str +"\n   SCROLL RATE: "+ parseInt(SCROLLkon,10) + " micro-seconds per pixel";
        str = str +"\n   SCROLL Position" + document.getElementById("Tune").contentWindow.scrollY;
        alert (str);
    }
function countBARS()
    {
        var j =0;BARS=0;
        while(j < ARRlines.length)//go through the 
        {
            var line = ARRlines[j];
            if (lineType(line)=='chord')
            {
                var count = countChr(line,"|");
                BARS = BARS + count;//total the |'s 
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

//**LINE FUNCTIONS=================================can be run on lyric lines

function isHeader(str) //look for header string reguardless of case
    {   var ans = 'false';
        var flag = (str.substring(0,5).toUpperCase());
        if (flag =="VERSE"|flag =="#VERS"|flag =="CHORU"|flag =="#CHOR"|flag =="BREAK"|flag =="#BREA"|flag =="INTRO"|flag =="#INTR"|flag =="OUTRO"|flag =="#OUTR"|flag == "#BRIDG"|flag == "#BRID"|flag == "#TURN "|flag == "#TURN"){ans ='true';}
        return ans;
    }    

function countChr(str,chr){//counts chr in a string
    var i = 0;
    var count =0;
    while (i<str.length)
    {
        if(str[i]==chr){count = count+1;} 
        i = i+1;
    }
    return count;}

//EDIT ZONE ===================================================================================================

function firstLineValues(type)//creates first line defaults then modifies using ARRlines[0]
    {   //Gets the 3 critical fields from a first line hash
        BPM =120; BEATS =4; KEY ="C";//set defaults
        if (lineType(ARRlines[0])=='hash')//if type is array and hash exists
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
            //alert (HITyear)
        }
    }    
    
//**LYRIC COMMON FUNCTIONS==================================================These functions are general utility

function lineType(str)//C
    {   
        var ans ="lyric";
        if ((str.substring (0,7)).toUpperCase()=="IREALB:"){ans = "irealb";}    
        else if (str.substring (0,4)=="http")  {ans = "link";}
        else if (str.substring (0,3)=="@@@")  {ans = "noteTech";} //tech noet
        else if (str.substring (0,2)=="@@")  {ans = "noteTriv";}
        else if (str.substring (0,1)=="@")  {ans = "note";}
        else if (str.substring (0,1)=="#") {ans = "header";}
        else if (str.substring (0,1)=="$") {ans = "spacer";}
        else if (str.search(":")>-1) {ans = "hash";}
        else if (str.indexOf("|") >-1){ans ="chord";}
        return ans;
    }

function encodeFredComponent(str)//encodes problem char (?)
    {
        str=str.split("?");
        str=str.join("QMARK");
        return str;
    }
    
function decodeFredComponent(str)//decodes problem char (?)
    {
        str=str.split("QMARK");
        str=str.join("?");
        return str;
    }

function preLines()//number of lines befor the first chord line
    {   
        var i=0;
        var a =0;
        var ltype ="x";
        while (i < ARRlines.length & ltype !=='chord')
        {
            ltype =lineType(ARRlines[i]);
            if (ltype == "lyric"| ltype == "note"| ltype =="header")
            {
                a = a + 1;
            }
            i = i+1;
        }
    return a;
    }

function chordLines()//Common Lyic
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

function longestLine()//Common Lyic
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