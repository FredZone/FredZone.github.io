//GLOBAL VARIABLES=====================================================================================================
function rev() {return "2.05";}
//FLAGS=================================================================
    var PERFmode="none";//performance Mode
    var AUDend="false";
    var BOOT='true';//designates first boot
    var DURlock ='false';//lock the duration true or false
    var DURsource='Default';//string where the program got the duration
    var DURtext =0;
    var SCROLLend=false;//indicates end of scroll
    var NOTESpresent = 'false';//indicates that notes will be available on another page
    var TRANSPOSE =0;//how many 1/2 steps to tranpose
    var MODE='Default';//play mode
    var PREVtitle;
//SONG PROPERTIES========================================================
    var TITLEplus ="unknown";
    var ARRlines="";//Array of lines from text file
    var BEATS=4;//Beats/bar
    var BPM=100;
    var BARS=0;
    var DURtext =0;
    var DUR =120;//Duration for scrolling and calculating
    var IRB = "";//the IRB line set during format of the page
    var TITLE="Unknown";//song title being played
    var QUAL ='Raw'; //song quality
    var LONGLINE=40;
    var NOTEtrivia;
    var NOTEtech;
    var NOTElinks;
//Calculated variables====================================================
    var DURcalc=0;//Calculated duration based on Bars/Beats/time signature
    var DURmp3=0;//used on scroll(default =  DURfile, DURcalc, DURmp3, User Input)
//SCROLLdata==============================================================
    var SCROLLbase; //Original SCROLLkon used to change scroll speed on the fly
    var SCROLLdelta=0;//for setting speed
    var SCROLLkon=0.01;
    var SCROLLpix;//ScrollPixels from height of document;
    var SCROLLposition=0;//where the scroll is relative to top of page: where you would be reading the lyrics;
    var SCROLLstartTime=0;//when scroll started, used to regulate scroll
    var EYEline = 100; //where you should be looking
    var FLOATht=100;//height of floater in pixels
    var Ypos =0;//Yposition of the scroll 0 being the top
    var Ystart=0;//where Y is when you start the scroll
    var Yend ='false';//end of scroll
    var PRESONGlines =0;//how many lines of text exist before first chord line
    var CHORDlines =0; //how many lines are chord lines
//Lists 
    var TUNEnum=0;//Tune Number in setlist
//TIMEOUTS=================================================================================
    var NEXTdelay =15000;//delay before going to next frame after the scroll ends
    var TIMEOUTdelay;//trackDelay XXXdelay the start of???
    var TIMEOUTscroll;//timeout function for scrolling
    var TIMEOUTsent;//timeout for sentinel
    var TIMEOUTnext; //for next tune
    var TIMEOUTautoPlay;//autoPlay
//PLAY MODE presets==========================================================================
    var AUTOnext = "false";
    var AUTOplay = "false";
    var BACKTRACK='true';
    var CAPS='true';
    var CLICKTRACK='false';
    var FADER ='false';
    var FULLscreen ='false';
    var POPnotes='false';
    var HILITE='false';
    var LINEnum='true';//show line numbers
    var LINEtime='false';//show min sec instead of line num
    var NOTES='true';
    var POINTER='true';//pointer shown during scroll
    var SOUND='true';
    var VOLinc=(0.7);//volume increment or decrement
    var VOLexp =2;//exponant applied to VOL
    var VOL=(0.49);//absolute volume (0>1)
//MISC===============================================================================================
    var AUD;//audio element
    var SETlist ="X";//Array of songs in setlist
    var SETname="Single Tune";//default in case a list cannot be loaded
    var WINDht;//view window height
//INWORK FUNCTIONS==========================================================================================================

function closeSong()//used to indicate audio end (needed to remove listener)
    {
        //alert('song closing');
        AUDend='true';
        endSong();
    }

function endSong()
    {//alert("AN: "+ AUTOnext+"  AE: "+AUDend+"   SE: "+Yend);
        if (AUDend=='true')
            {
                document.getElementById("Audio1").removeEventListener('ended',closeSong);
            }
        if (Yend=='true' & AUDend =='true')
            {
                document.getElementById("ButtonReset").src = "../../icons/blackResetSTOP.png";
                if (AUDend =='true' & Yend=='true')
                {   //alert("AN: "+ AUTOnext+"  AE: "+AUDend+"   SE: "+Yend);
                if (AUTOnext =='false')//end
                {
                    statusMsg ('End of Song','white');passCommand('End');
                    document.getElementById("ButtonReset").src = "../../icons/blackResetEnd.png";
                }         
                else//auto next
                {
                    if (TUNEnum!==(SETlist.length-1)) //{document.getElementById("ButtonNext").style.visibility = "hidden";}
                    {
                        statusMsg("Auto-Advancing to Next Song....","yellow");
                        passCommand('Think');//???
                        TIMEOUTnext  =setTimeout(function(){nextTune(1);},2000);
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

function analizeSong()
    {
        var str = "TITLE: "+ TITLE +"(MODE: " + MODE +")";
        str = str +"\nPLAYLIST: "+ SETname +"\n=================================================================";
        str = str +"\nKEY: "+ KEY + " (Transposed " + TRANSPOSE +")";
        str = str +"\nTIME SIG: "+ BEATS  + "\nBARS: "+ BARS + "\nTEMPO: "+ BPM +" BPM" + "\nQUALITY: "+ QUAL; //+ "\nARTIST: "+ ARTIST;
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

function bogus(){launchIntoFullscreen(document.documentElement);}//XXX seems to require extra function wrapping it

function bogus2(){exitFullscreen();}   

function CTO()
    {//clear all Timouts
        clearTimeout (TIMEOUTdelay); 
        clearTimeout (TIMEOUTscroll);
        clearTimeout (TIMEOUTsent);
        clearTimeout (TIMEOUTnext);
        clearTimeout (TIMEOUTautoPlay);
    }

function scrollTune(pct)//WWWneeds rewriting to new machine
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
function IconStyle(iconID,style){ document.getElementById(iconID).style.visibility =style;}
//BOOT FUNCTIONS =========================================================//All in sequence with breaks between sub routines

window.onload = function()
    {   if(window.innerHeight > window.innerWidth){alert("THIS PLAYER IS BEST VIEWED IN LANDSCAPE MODE!\n(Or it looks like crap...)"); }
        presetSelect("Default");
        SCROLLposition=0;
        PREVtitle ="???";
        document.getElementById("rev1").innerHTML=rev(); 
        var x = (decodeURIComponent(window.location.toString())).split("?"); //works
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
        ihtml ="<F21>PLAYLIST:</F21><select id='Set' style='font-size:4vh' onchange='selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
        j=0;
        while (j < SETS.length)
        {
            if (SETS[j]!=="ALL TUNES") {ihtml =ihtml +"\n<option>"+ SETS[j] +"</option>";}
            j = j+1;
        }
        ihtml =ihtml +"\n</optgroup></Select>";
        document.getElementById("setSelect").innerHTML=ihtml;    
        selectSet("ALL TUNES");//default is ALL TUNES
    }       
//above section only used during boot............................................................................. 
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
    {   statusMsg("Listing tunes from" +SETname);
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
        DURlock ='false';//next tune will set its own duration
        loadServerTitle();
    }
  
function nextTune(newDir)//Entry point if you have selected the next tune in the list by direction 1,0,-1
    {   
        //alert("New Direction:" + newDir + "\nTUNEnum: " +TUNEnum);
        statusMsg("Incrementing tune list " & newDir & " steps..");
        if (newDir===0)//if loading same song lock duration: DURlock
        {
            DURlock ='true';//locks duration and Key
        }
        else
        {
            document.getElementById('keyD').innerHTML =0;
            DURlock ='false';
        }
        if(SETlist[TUNEnum + newDir])//if next tune exists go to it
        {   
            passCommand('Think');
            
           // alert(TUNEnum +" + " +newDir);
            TUNEnum =(TUNEnum + newDir);
            //alert(TUNEnum);
            //var titl = SETlist[TUNEnum];//XXX
            TITLEplus = SETlist[TUNEnum];//XXX
            
            
            //TITLE =SETlist[TUNEnum];
            
            
            
            document.getElementById("mySet").selectedIndex= TUNEnum;
        }
    
   
    selectTune(TITLEplus);
    //selectTune(titl);
    //XXXselectTune(TITLE);
    }

function selectTune(titl)//Entry Point using the TITLE to download tune
    {   //alert(titl)
        var arrTitle =titl.split("/");//XXXX
        //alert(titl);
        PERFmode =arrTitle[1];//XXXX
        if (PERFmode ===undefined) {PERFmode="none";}
        //alert (PERFmode);
        if (PERFmode=='back') {BACKTRACK ='true';CLICKTRACK ='false';}
        else if (PERFmode=='click') {CLICKTRACK ='true';BACKTRACK ='false';}
        else if (PERFmode.substring(1,4)=='drum') {alert(PERFMode.substring(5,8));}
        else if (PERFmode !== 'none'){BACKTRACK ='false';CLICKTRACK ='false';}
        //alert('s');
        dispInFrame("<!DOCTYPE html><html><head><style>body{padding:0;margin:0}X9{ font-family:Courrier New;font-weight:bold;line-height:100%;text-align:center;color:green;font-size:8vh;line-height:100%;}</style></head><body><center><X9>"+ titl+"<br><br>Loading...</X9></center></body></html>");
        CTO();
        if (titl!==PREVtitle) {DURlock='false';}//if tune is changing unlock the duration
        TITLE = arrTitle[0];//XXXX
        //alert (TITLE)
        // TITLE = titl;
        TUNEnum = SETlist.indexOf(TITLE);//XXX causes problems if tune is in list more than 1 time
        loadServerTitle();
    }

function loadServerTitle()//F
    {   //clear out old variables //incase a previous song is scrolling etc
        document.getElementById("title").innerHTML ="PLAYER: " +SETname +": "+TITLE;//put title on tab...
        CTO();
        statusMsg(TITLE + ": Loading song..." );        
        ARRlines="";
        SCROLLend ="false";
        document.getElementById('keyD').value = 0;
        if (DURlock=='false') {TRANSPOSE =0;DUR=0;}
        var path ="../text/" + TITLE + ".txt";  //get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var n = content.search("404"); //look for a 404 error from server
        if (n >-1)//XXX unverified through all cases of next tune
        {   var j=0;
            var str = "$\n$<a style='color:red'>There is no text file for "+TITLE+"</b>\n$<a style='color:green'>But there may be a backing track!</a>";
            while (j<25) { str = str+"\n$";j = j+1;}
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
       // var n=0;
        countBARS();
        loadServerTrack();
    }

function loadServerTrack()//F
    {                           
        statusMsg("Sound track?");
        passCommand("Think");
        if(BACKTRACK=='false'& CLICKTRACK=='false')
        {
            durCalc();
        }
        else
        {  
            statusMsg("Loading audio track...","white");
            if(BACKTRACK=='true')
            {
                //document.getElementById('Audio2').src = "../Backing/"+TITLE+".mp3"
                document.getElementById('Audio1').src = "../Backing/"+TITLE+".mp3";//as soon as possible
            }
            else if(CLICKTRACK=='true')
            {
                var newBPM = BPM;
                while (parseFloat(newBPM/5,10)!==parseInt(newBPM/5,10))
                {
                    newBPM = parseInt(newBPM,10) +1;
                }
                document.getElementById('Audio1').src = "../Click/"+newBPM+".mp3";//as soon as possible    
            }
            statusMsg("Loading Audio Track...","white");
            var x = setTimeout(function()//time to get the mp3 [arbitrary]
                {
                    DURmp3=document.getElementById('Audio1').duration;
                    //DURmp3=document.getElementById('Audio2').duration;
                    //alert(DURmp3)
                    clearTimeout(x);
                    if(SOUND=='true'){document.getElementById("Audio1").volume = VOL;}
                    durCalc();
                },4000);//time to load mp3
        }
    }

function durCalc()//H
    {
        statusMsg(TITLE+": Calculating duration...");
        if (DURlock =="false")
        {
            statusMsg(TITLE + "Calculating duration");
            DUR = 0;DURcalc=0;//DURtext=0;
            DURsource="Undefined";
            DURcalc = parseInt(BARS*BEATS*60/BPM,10);
            if (DURtext >0 ) {DUR = DURtext, DURsource = "File";}
            if (DURcalc >0 ) {DUR = DURcalc, DURsource = "Calculation";}
            if (BACKTRACK=='true'&& DURmp3>5)
            {
                DUR = DURmp3;
                DURsource = "MP3";
            }
            if (DUR===0) {DUR = "150";DURsource = "Default";}
            DUR = parseInt(DUR,10);
            DURlock ="true"; //set until user sets it or next song loads
        }
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
        if (LINEnum =='true') {LONGLINE=LONGLINE +4;}//adding space
        NOTESpresent ='false';//why???XXX
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
                //XXXalert(NewLine);                                                                                                                                                                   
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
        htmlHead = htmlHead + "X2{color:red;} X3{background-color:lightgrey} X4{color:red;background-color:#F4FA58} X5{color:white;background-color:darkgrey} X6{background-color:lightgrey}X7{background-color:white}X8{color:blue;background-color:pink}X9{color:green;font-size:8vh;line-height:100%;text-align:center}</style></head><body>"; //XXSet other body format could use CSS </style></head><body><pre>"; //XXSet other body format could use CSS             
        htmlString = htmlHead +"<X9><header margin:0; padding:0>"+ TITLE + "</header></X9><pre>" +htmlString ;//XX
        dispInFrame(htmlString);
        if(NOTEtech!==undefined){NOTEtech ="<pre>TECH NOTES\n"+NOTEtech+"</pre>";}
        scrollSetup();
    }

function scrollSetup()//get the song data,songHeight,iframeHeight,Duration,ScrollConstant Run after you set the content of page
    {   statusMsg(TITLE + ": Scroll Setup...");
// initial defs      
        PAGEht =document.getElementById("Tune").contentWindow.document.body.clientHeight;
        WINDht = document.getElementById("Tune").contentWindow.innerHeight;
//set floater        
        EYEline = parseInt(1.35*(PAGEht/CHORDlines),10);//empiracle where you should be looking/
        EYEline = parseInt((((PRESONGlines/2) +1)*(PAGEht/CHORDlines)),10);//empiracle where you should be looking/
        //alert(EYEline);
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
//scroll mechanics  Set Up
        NEXTdelay=parseInt(WINDht*DUR*500/PAGEht,10);//??about 1/2 pa
        document.getElementById('speed').innerHTML="";//0 speed
        if (BACKTRACK =='true' | CLICKTRACK=='true')
        {
            document.getElementById("volCtrl").style.visibility ='visible';
        }
        else
        {
            document.getElementById("volCtrl").style.visibility ='hidden';
        }

        //if (POINTER == 'true')
        //{
        //    document.getElementById('pointerUp').style.visibility ='visible';
        //    document.getElementById('pointerDown').style.visibility ='visible';
        //}
        //else
        //{
        //    document.getElementById('pointerUp').style.visibility ='hidden';
        //    document.getElementById('pointerDown').style.visibility ='hidden';
        //}
        passCommand("Ready");
        if (SETname =='Single Tune'){document.getElementById("title").innerHTML ="PLAY: " +TITLE;} 
        var color ="lightgrey";
        if (DURsource =="Default"){color ="Yellow";}//DUR =150;was removed
        if (DURsource =='MP3'& BACKTRACK=='true') {document.getElementById('Audio1').style.visibility ='visible';}else{document.getElementById('Audio1').style.visibility ='hidden';}
        var mesg ="KEY: " +KEY + "  ( DURATION: " + secToMin(DUR) + " from "  +DURsource +") {TUNE " + parseInt( TUNEnum+1 ,10)+ " of "+ SETlist.length + "  LL:" + LONGLINE + "}";
        if (BOOT !== 'false')
        {   
            if (BOOT =='true')
            {
                statusMsg("", "black");
                BOOT = 'false';
            }
            else if (BOOT =='edit')
            {
                statusMsg("Song passed from the editor...CONFIGURATION SETTINGS DISABLED",'pink');
                document.getElementById("ctrlXtra").style.display='none';
                IconStyle('ButtonConfig','hidden');
                BOOT='false';
            }
        document.getElementById("curtain").style.display='none';
        }
        else
        {
            statusMsg(mesg,color);
        }
    document.getElementById("durD").innerHTML= DUR;
    document.getElementById("tit").innerHTML="<F21>CURRENT SONG:</F21> "+TITLE;
    document.getElementById("rev2").innerHTML="<F21>CURRENT REVISION:</F21> "+rev();
    document.getElementById('startIcon').style.visibility ='visible';
    if(AUTOplay=='true'){CTO();TIMEOUTautoPlay=setTimeout(function(){trackDelay();},5000);}//XXXthis could be a autoplay loop out of control starts too often
    if (POPnotes =='true'& NOTEtrivia!==undefined & PREVtitle !==TITLE) {notePopUp(NOTEtrivia,'4vw','black');}
    PREVtitle=TITLE;
//document.getElementById('msg2').style.visibility="visible";
//statusMsg("Ypos:" +Ypos+ "\nEYEline: "+EYEline+"\nSCROLLkon: "+SCROLLkon+"\nWINDht: "+WINDht+"\nYstart: "+Ystart,"white");
    }  
//PLAYER ROUTINES====================================================================================================

function scrollEngine()//the actual scrolling routine keep it simple
    {   //before it starts SCOLLstartTime, EYEline, SCROLLkon must be set ,
        nowTime = new Date().getTime(); 
        Ypos = document.getElementById("Tune").contentWindow.scrollY;
       
        if (EYEline<parseInt((WINDht/2),10))//move part 1
        {
            document.getElementById("pointerUp").style.visibility= 'hidden';
            document.getElementById("pointerDown").style.visibility= 'hidden';
            EYEline= parseInt(EYEline +1,10);
            document.getElementById("floater").style.top =(EYEline-FLOATht/2)+"px";
            SCROLLstartTime=nowTime = new Date().getTime();
        }
        else if(Yend=='true') //didnt move//move part 3
        {   
            document.getElementById("pointerUp").style.visibility= 'hidden';
            document.getElementById("pointerDown").style.visibility= 'hidden';
            EYEline= parseInt(EYEline +1,10);
            document.getElementById("floater").style.top =(EYEline-FLOATht/2)+"px";
        }         
        else//STD SCROLL move part 2
        {
            if (POINTER =='true') {document.getElementById("pointerUp").style.visibility= 'visible';document.getElementById("pointerDown").style.visibility= 'visible';}
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

function passCommand(cmd)
    { //configures the play screen to match the play status(moves, diplays and hides icons )
        if(cmd == "DelayedPlay"| cmd == "Play"| cmd == "Scroll"| cmd == "Ready" | cmd == "Pause"| cmd == "Reset"| cmd == "Think"| cmd == "End")
        {
            IconStyle("ButtonReset","visible");
            document.getElementById("popup").style.display= "none";
            document.getElementById("Info").style.display= "none";
            document.getElementById('speed').innerHTML="";SCROLLkon=SCROLLbase;//0 speed
            document.getElementById("floater").style.visibility = "hidden";
            document.getElementById("statusIcon").style.visibility = "visible";
            IconStyle("startIcon","hidden");
            IconStyle("irbIcon","hidden");
            IconStyle("countIcon","hidden");
            IconStyle("turtle","hidden");
            IconStyle("ButtonLast","hidden");
            IconStyle("ButtonPlay","hidden");
            IconStyle("ButtonPause","hidden");
            IconStyle("ButtonConfig","hidden");                
            IconStyle("ButtonNext","hidden");
            IconStyle("rabbit","hidden");
            IconStyle("msg2","hidden");
            IconStyle("ButtonInfo","hidden");
            if(cmd == "DelayedPlay"){//turn on individual icons per cmd
                document.getElementById('ButtonReset').src = "../../icons/blackResetRun.png";
                document.getElementById("statusIcon").src = "../../icons/GearTrain.gif";
                document.getElementById("floater").style.visibility = "visible";
            }if(cmd == "Scroll"){
                document.getElementById('ButtonReset').src = "../../icons/blackResetRun.gif";
                IconStyle("ButtonPause","visible");
                document.getElementById("ButtonPause").style.visibility = "visible";
                //document.getElementById("ButtonReset").style.visibility = "visible";
                document.getElementById("rabbit").style.visibility = "visible";
                document.getElementById("turtle").style.visibility = "visible";    
                document.getElementById("statusIcon").style.visibility = "hidden";
                document.getElementById("floater").style.visibility = "visible";
            }if(cmd == "Play"){
                document.getElementById('ButtonReset').src = "../../icons/blackResetRun.gif";
                document.getElementById("statusIcon").visibility = 'hidden';
                //document.getElementById("ButtonReset").style.visibility = "visible";
                document.getElementById("ButtonPause").style.visibility = "visible";
                document.getElementById("floater").style.visibility = "visible";
            }if(cmd == "Ready"){
                document.getElementById('ButtonReset').src = "../../icons/blackReset.png";
                document.getElementById("statusIcon").style.visibility = "visible";
                document.getElementById("ButtonPlay").style.visibility = "visible";
                document.getElementById("ButtonNext").style.visibility = "visible";
                document.getElementById("ButtonLast").style.visibility = "visible";
                document.getElementById("ButtonConfig" ).style.visibility = "visible";
                //if(NOTESpresent=='true' & FULLscreen =='false'){document.getElementById("ButtonInfo").style.visibility = "visible";}
                document.getElementById("ButtonInfo").style.visibility = "visible";
                if (NOTEtrivia===undefined) {IconStyle("ButtonTrivia","hidden");}else{IconStyle("ButtonTrivia","visible");}
                if (NOTEtech===undefined) {IconStyle("ButtonTech","hidden");}else{IconStyle("ButtonTech","visible");}
                if (NOTElinks===undefined) {IconStyle("ButtonLinks","hidden");}else{IconStyle("ButtonLinks","visible");}
                if(IRB !==undefined){document.getElementById("irbIcon").style.visibility = "visible";}
                document.getElementById("msg2").style.visibility = "visible";
                document.getElementById('statusIcon').src = '../../Icons/'+ QUAL+'.png';
            }if(cmd == "End"){
                document.getElementById('ButtonReset').src = "../../icons/blackResetEnd.png";   
                document.getElementById("statusIcon").src = "../../icons/outlineHandStop.png";                
                document.getElementById("ButtonNext").style.visibility = "visible";
                document.getElementById("ButtonLast").style.visibility = "visible";
                document.getElementById("ButtonConfig" ).style.visibility = "visible";
                if(NOTESpresent=='true'){document.getElementById("ButtonInfo").style.visibility = "visible";}
                document.getElementById("msg2").style.visibility = "visible";
            }if(cmd == "Pause"){
                document.getElementById('ButtonReset').src = "../../icons/blackResetRun.png"; 
                document.getElementById("statusIcon").src = "../../icons/OutlinePause.png";
                document.getElementById("ButtonPlay").style.visibility = "visible";
                //document.getElementById("ButtonReset").style.visibility = "visible";
                document.getElementById("ButtonNext").style.visibility = "visible";
                document.getElementById("ButtonLast").style.visibility = "visible";                
                document.getElementById("msg2").style.visibility = "visible";
                document.getElementById("floater").style.visibility = "visible";
            }if(cmd == "Reset"){
                document.getElementById("statusIcon").src = "../../icons/outlineThumbsUp.png";                
                document.getElementById("ButtonPlay").style.visibility = "visible";
                document.getElementById("ButtonConfig").style.visibility = "visible";
                document.getElementById("msg2").style.visibility = "visible";
            }if(cmd == "Think"){
                document.getElementById("statusIcon").src = "../../icons/GearTrain.gif";                
                document.getElementById("msg2").style.visibility = "visible";
                }
            if (TUNEnum===0) {document.getElementById("ButtonLast").style.visibility = "hidden";}
            if (TUNEnum==(SETlist.length-1)) {document.getElementById("ButtonNext").style.visibility = "hidden";}
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
        if(SCROLLkon!==SCROLLbase) {a= parseInt(SCROLLbase*100/SCROLLkon,10)+'%';}else{a ="";}
        document.getElementById('speed').innerHTML =a;
        SCROLLstartTime=new Date().getTime();
        Ystart=Ypos;//WWW  
        Yend='false';
        Ypos = document.getElementById("Tune").contentWindow.scrollY;//should get this at Play
    }

function trackDelay()//WWW
    {   //starts audio and scroll with delay of 3 seconds
        passCommand("DelayedPlay");
        document.getElementById("countIcon").src = "../../icons/countdown321.gif";//should be 3 seconds
        document.getElementById("countIcon").style.visibility = "visible";
        if (CLICKTRACK=='true' & FADER=='true') {document.getElementById("Audio1").play();}
        statusMsg("START  SONG  WHEN  THE  COUNTDOWN  IS  FINISHED!!",'Yellow');
        TIMEOUTdelay=setTimeout(function()
        {   
            document.getElementById("countIcon").style.visibility ="hidden";
            document.getElementById("countIcon").src = "../../icons/countdown321.png";
            statusMsg("Starting Audio","Green");
            if(BACKTRACK=='true' ||(CLICKTRACK=='true' & FADER =='false')) {document.getElementById("Audio1").play();}
            if (FADER=='true') {document.getElementById("Audio1").pause();}
            clearTimeout(TIMEOUTdelay);
            passCommand("Play");//XXX
            SCROLLstartTime = new Date().getTime();
            //WWWscrollDelay(); //wait for scroll to hit mid screen
            trackPlay();
        },3000);
    }
    
function trackPause()
    {   //SCROLLposition
        CTO();
        if (BACKTRACK=='true'|CLICKTRACK=='true'){document.getElementById("Audio1").pause();}
        statusMsg("Pause","yellow");
        passCommand("Pause");
    }

function trackPlay()
    {
        AUDend ="true";
        passCommand("Play");               
        SCROLLstartTime = new Date().getTime();
        if (BACKTRACK=='true'|(CLICKTRACK=='true' & FADER=='false'))
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
    {   CTO();
        if (BACKTRACK=='true'|CLICKTRACK=='true')
        {
            document.getElementById("Audio1").autoplay = false;
            document.getElementById("Audio1").load();
            if(SOUND== 'true'){document.getElementById("Audio1").volume =VOL;}
        }
        arrConvert();//XXXwhy???? try just scrolling to the top
    }
//CONFIG FUNCTIONS===================================================================================================

function showXtra(){
    bogus2();//dont know why it cannot be called directly
    document.getElementById('Tune').contentWindow.scrollTo(0,0);
    document.getElementById("msg2").style.visibility ='hidden';
    document.getElementById("ctrlXtra").style.display='block';
    }

function hideXtra(reload)
    {
    if(reload =='true')
        {
        DUR = document.getElementById("durD").innerHTML;
        DURlock ='true';
        nextTune(0);
        } //to reload changes
    if(FULLscreen =='true'){bogus();}else{bogus2();}//if(FULLscreen =='true'){launchIntoFullscreen(document.documentElement);}else{exitFullscreen()();} 
    document.getElementById("ctrlXtra").style.display='none';
    }

function presets(cmd){document.getElementById("presets").style.visibility =cmd;}

function tgl(vrbl,val)
    {   if (!val)
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
        else if(vrbl== 'BACKTRACK' && CLICKTRACK =='true'){tgl('CLICKTRACK','false');tgl('FADER','false');}
        else if(vrbl== 'CLICKTRACK' && BACKTRACK =='true'){tgl('BACKTRACK','false');}
        else if(vrbl== 'FADER' && BACKTRACK =='true'||CLICKTRACK=='false'){tgl('FADER','false');tgl('CLICKTRACK','false');}
        else if(vrbl== 'FADER' && CLICKTRACK=='false'){tgl('FADER');}
    }

function playMode(linenum,linetime,hilite,caps,pointer,backtrack,autonext,popnotes,notes,clicktrack,fader,autoplay,fullscreen,guidelines,x,y)
    {   tgl('LINEnum',linenum);//1
        tgl('LINEtime',linetime);//2
        tgl('HILITE',hilite);//3
        tgl('CAPS',caps);//4
        tgl('POINTER',pointer);//5
        tgl('BACKTRACK',backtrack);//6
        tgl('AUTOnext',autonext);//7
        tgl('POPnotes',popnotes);//8
        tgl('NOTES',notes);//9
        tgl('CLICKTRACK',clicktrack);//10
        tgl('FADER',fader);//11
        tgl('AUTOplay',autoplay);//12
        tgl('FULLscreen',fullscreen);//13
       // tgl('GUIDElines',guidelines);//14
        document.getElementById('ButtonDown').style.bottom =x+"vh";
        document.getElementById('ButtonDown').style.left =y+"vw";
    }

function presetSelect(ps)
    {
       if(ps =='Custom')
        {
            document.getElementById('presets').style.visibility='hidden';
            document.getElementById('presetMsg').innerHTML = "<F21>CURRENT MODE:</F21> CUSTOM";
        }
        else
        {
            MODE = ps;
            document.getElementById('presetSelect').innerHTML ="Return to <br><F21>"+ps +"</F21><br> & Preset Buttons";
            document.getElementById('presetMsg').innerHTML = "<F21>CURRENT MODE:</F21> " + ps;
            document.getElementById('presets').style.visibility='visible';} 
            if (ps =='Basic')//tglAutoNext
                {playMode('false','false','false','false','false','false','false','false','false','false','false','false','false','false',50,0);}
            else if (ps =='Default')
                {playMode('false','true','false','true','true','true','false','false','true','false','false','false','false','true',30,40);} 
            else if (ps =='Perform Silent')
                {playMode('false','false','true','true','true','false','false','false','true','false','false','false','true','false',50,40);} 
            else if (ps =='Perform Accompanied')
                {playMode('false','true','true','true','true','true','false','false','true','false','false','false','true','true',50,20);}
            else if (ps =='Practice Silent')
                {playMode('true','false','true','true','true','false','false','false','true','false','false','false','false','true',30,0);}
            else if (ps =='Practice Accompanied')
                {playMode('false','true','true','true','true','true','false','false','true','false','false','false','false','false',30,20);}
            else if (ps =='Practice Click Track')
                {playMode('true','false','true','true','true','false','false','false','true','true','false','false','false','true',50,60);}
    }

function volSet2(volDelta)//VolDelta will be -1,0,+1 {-10=off}
    {
        if (volDelta == 10 & SOUND == 'true')
        {
            SOUND ='false';
            document.getElementById("Audio1").volume = 0;
            document.getElementById("soundOO").src ="../../Icons/Off.png";//XXX what is this
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
    
function keyDelta(delta)//add 1/2 steps to the key it will be updated when you leave the config screen
    {
        TRANSPOSE =TRANSPOSE + delta;
        DURlock='true';
        document.getElementById("keyD").innerHTML = TRANSPOSE;
    }

function durDelta(delta)//add seconds to the duration
    {
        DUR= parseInt(parseInt(DUR,10)  +  parseInt(delta,10),10);
        document.getElementById("durD").innerHTML = DUR;
        DURsource ='User Input Screen';
        DURlock ='true';
    }

//GLOBAL FUNCTIONS Used from any screen ===================================================================================================

function fileFromPath(path)
    {path = path.split('/');return (path[path.length-1]);}
    
function statusMsg(msg,color)//xxx could trim to 40 chr
    {   if (!color) {color = "white";} //incase you forgot color
        var dog = document.getElementById("msg2");
        dog.innerHTML = msg;
        dog.style.background = color;
        if (color == "black"){dog.style.color = 'white';}else{dog.style.color = 'black';}
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

//TRANSPOSE FUNCTIONS===================================================================================================
  
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
//NAVIGATION FUNCTIONS ===================================================================================================
function editor(){bogus(2);window.open(encodeURI("editor.html?"+(encodeFredComponent(ARRlines.join("\n")))));}//WORKS ON WICKED GAME

function notes(){bogus(2);window.open(encodeURI("notes.html?"+encodeFredComponent(ARRlines.join("\n"))+"?"+encodeFredComponent(TITLE)));}

function research(){window.open(encodeURI("research.html?"+encodeFredComponent(TITLE)));}   

function playlist(){window.open(encodeURI("playlist.html?"+encodeFredComponent(SETname)+"?"+encodeFredComponent(SETlist.join("\n"))));}

//function print(){window.open(encodeURI("print.html?"+encodeFredComponent(TITLE)+"?"+encodeFredComponent(ARRlines.join("\n"))+"?"+ encodeFredComponent(longestLine(ARRlines))));}
function print(){window.open(encodeURI("print.html?"+encodeFredComponent(TITLE)+"?"+encodeFredComponent(ARRlines.join("\n"))));}
function home(){window.open("index.html");}
function history(){window.open("player.txt");} 

function iRealLink(){window.open(IRB);}

function fileLister(){window.open("FileLister.html");}

//ANALYSIS FUNCTIONS===================================================================================================
//perform general functions and can be adapted to different screens 
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

//SINGLE LINE FUNCTIONS===================================================================================================

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
            //DUR = DURtext;  
            BPM= hash(ARRlines[0],"BPM",BPM);
            BEATS = hash(ARRlines[0],"BEATS",BEATS);
            KEY = hash(ARRlines[0],"KEY",KEY);
            QUAL = hash(ARRlines[0],"QUAL",QUAL);
            if (QUAL !=="Inwork"&QUAL !=="Verified"&QUAL !=="Complete") {QUAL ="Raw";}
        }
    }    
    
//LyricCommon Functions==================================================These functions could be easily replaced with the line
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

function preLines()//Common Lyic
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