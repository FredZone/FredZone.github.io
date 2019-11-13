//GLOABAL ARRAYS=================================================================================================
ARRscaleIcons  =("root/Scale2b/scale2/Scale3b/Scale3/Scale4/scale5b/Scale5/Scale6b/Scale6/Scale7b/scale7").split("/");
var ARRlicks="";//the licks (all of them)
var ARRsteps="";//the current lick each element = a STEP
var ARRnotes="";//ARRsteps[i].split('|')  notes in the current step = each element is a single note string
//GLOBAL Constants================================================================================================
var BEAT=0;//the current beat in the bar
var BAR=1;//the current bar of the lick 
var BEATS=4;//beats per bar
var BARS=1;//total BARS
var ROOT='A';//default ROOT for your scale
var LOOP = false;
//GENERAL=========================================================================================================
var STEP = 0;//which step of time Lick is divided into: ARRsteps[0]is the info for the lick, 1>length are beats
var MODE ='tab';//="scaleDiv";
var TITLE = "LICK";//title of Lick
var KEEPER ="A,B,C,D,E,F".split(",");//* Debugging tool accumulate statusMsgs
var WORKbeat="1";//default start
var WORKstring="1";//default start
var INDEXlick=0;//the lick you are using: ARRlicks[INDEXlick]
var EDITED =false;
var FILEname ="UnNamed";
var STEPwidth=6;
var INFO ="NO INFO";
var LINK="";
var BACK="No Track"; //Backing track name 
var BPM=100;
var PAGEwt="";
var DURmp3=0;
var TIMEOUTscroll=1;
var TIMEOUTcycle =15;
var TIMEOUTchangeAlert=0;
//var SCROLLbase; //* Original SCROLLkon used to change scroll speed on the fly
var SCROLLkon=0.01;
var SCROLLpix;//* ScrollPixels from height of document;
var SCROLLstartTime=0;//* when scroll started, used to regulate scroll
var Xpos =0;//* Yposition of the scroll 0 being the top
var Xstart=0;//* where Y is when you start the scroll
var Xend =true;//* end of scroll
var PLAYctrl = "play";
var AUDend =true;
var AUDfail=true;
var Xold=0;
var AND = "A";//the tempo markup 1&2 etc
var SCROLLstop =false;
var NONE; //this is the null display I had to set up to get dis to work
var CYCLE="stop";
var JAMplay = false;
var LICKplay =false;
var LICKtime=30000;//30 seconds
var ARRroots ="";
var WINDht = window.innerHeight;
var WINDwt = window.innerWidth;
var RAT =parseFloat(WINDht/WINDwt);
var TRACKnum="";
var ARRjam;
var LESSONnum=5;//the ex exercise you are using: ARRlesson[EXnum]
var ARRlesson;
var ARRjam;
var LICKfileName='12BarBluesA';
var JAMfileName;
var TRACKcurrent='12BarBluesA';
var JAMlock=false;
var INDEXlesson=0;
var MET=500; //Milliseconds for metronome


var LOOPER=false;
var LOOPtop=0;
var LOOPend=100000;
var LOOPmode='played once';

//END OF GLOBAL CONSTANTS======================================================================================================


function secToMin(sec)//* XXX this sucks
    {
        var m =parseInt((sec/60),10);
        var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
        if (s < 10) {s = ":0" + s;}else{s = ":" + s;}
        return m+s;
    } 

function resetLoop()
    {
        //passCommand('Think');
        //TIMEOUTscroll=setTimeout(function() //reusing TIMEOUTscroll
        //{   statusMsg("Resetting....", 'orange');
           // Ypos = document.getElementById("Tune").scrollTop-5;
            //document.getElementById("Tune").scrollTop=Ypos;// MMM
            //if (Ypos<=LOOPtop)
            //{
             //   document.getElementById("Tune").scrollTop=Ypos=LOOPtop;
                document.getElementById('Audio1').currentTime  =LOOPtop;
                statusMsg("Starting Loop....", 'orange');
                CTO();
                TIMEOUTscroll=setTimeout(function(){trackPlay();},2000);
            //}
            //else
            //{
            //    resetLoop();
            //}
        //},1);
    }

function endLoop()
    {
        //passCommand('Ready');
        CTO();
        statusMsg("Loop Complete...", "orange");
        if (LOOPmode=="repeated")
        {
            //trackPause();
            TIMEOUTscroll=setTimeout(function() {resetLoop();},2000);    
        }
    }

function loopMode()
    {
        if (LOOPmode=='repeated')
        {
            LOOPmode='played once';
            document.getElementById('loopImg').src="../../Icons/transOnePlay.png";
        }else{
            LOOPmode='repeated';
            document.getElementById('loopImg').src="../../Icons/transInfinity.png";        
        }
        loopMsg();
    }

function loopMsg(a)
    {
    var str="Loop Start: " +secToMin(LOOPtop*SCROLLkon/1000)+ "......Loop End: " + secToMin(LOOPend*SCROLLkon/1000)+"......"+ LOOPmode +"!";
    if (a=='true'){alert(str);}else{statusMsg(str,'orange');}
    }
function loopMarkTop()
    {
        LOOPtop= document.getElementById('Audio2').currentTime;
        //alert(LOOPtop);
        document.getElementById('lt').innerHTML= secToMin(LOOPtop);
    }

function loopMarkEnd()
    {
        LOOPend= document.getElementById('Audio2').currentTime;
        secToMin(LOOPend);
        document.getElementById('le').innerHTML= secToMin(LOOPend);
    }









function clickToggle()//toggles click track on neck play
    {
    if (document.getElementById('audioClick').volume===0)
        {
        document.getElementById('audioClick').volume=1;
        document.getElementById('metIcon').src="../../icons/transClick.png";
        }else{
        document.getElementById('audioClick').volume=0;
        document.getElementById('metIcon').src="../../icons/transSilent.png";
        }
    }
//JAM ROUTINES==================================================================================================================
function jLock()//locks the Jam Track (OBSOLETE???)
    {
        if (JAMlock===true)
        {JAMlock=false;document.getElementById('jlock').src="../../Icons/unlock.png";}
        else
        {JAMlock=true;document.getElementById('jlock').src="../../Icons/lock.png";}
    }
function jTrackSet(tName)//for JAM FUNCION (OBSOLETE???)
    {
        if (tName!=TRACKcurrent&JAMlock===false)
           {
               document.getElementById('Audio2').src = "../Licks/"+tName+"/"+tName+".mp3";
               TRACKcurrent=tName;
               //document.getElementById('jTrackName').innerHTML=tName;
           }
    }

function loadServerJamFile(jTitle) //entry with jTitle
    {
        var tempo=120;
        document.getElementById("jamDesc").innerHTML="--";
        document.getElementById("jamProg").innerHTML="--";
        document.getElementById("lesson").innerHTML="--";
        document.getElementById("jamGoal").innerHTML="--";
        document.getElementById('jamLesson').innerHTML= "--";  
        //document.getElementById('jTrackName').innerHTML=jTitle;
        //if (jTitle.substring(0,4)=='Drum'|jTitle.substring(0,4)=='Clic')
        //{
        //    tempo = prompt("Tempo? (60 to 200 in Increments of 10)", 120);
        //    document.getElementById('Audio2').src = "../"+jTitle+"/"+tempo+".mp3";
        //}
        //else
        //{
        //alert("Loading Jam File"+ "../Licks/"+jTitle+"/" + jTitle + ".mp3");
        document.getElementById('Audio2').src = "../Licks/"+jTitle+"/" + jTitle + ".mp3";//}//as soon as possible}
        JAMfileName=jTitle;
        TRACKcurrent=jTitle;
        var path ="../Licks/"+jTitle+"/" + jTitle + ".inf";  //* get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        jFile = request.responseText;
        var n = jFile.search("404"); //* look for a 404 error from server
        if (n >-1)
        {  
            statusMsg("NO INFO FILE",'red');
            jFile="No Chord Progression Available \nNo Detailed Description\nDefault/Just listen and play along";
            ready();
        }
        else
        {
            ARRlesson=jFile.split("\n");
            document.getElementById('jamProg').innerHTML="<X1>PROGRESSION:</X1><X3><pre>"+ ARRlesson[0]+"</pre></X3>";
            document.getElementById('jamDesc').innerHTML= "<X1>DESCRIPTION:</X1><br>"+ ARRlesson[1];
            document.getElementById('jamGoal').innerHTML="<X1>OVERALL GOAL:</X1><br>"+ ARRlesson[9];
            document.getElementById('jamLesson').innerHTML="<X1>LESSON 1:</X1><br>"+ ((ARRlesson[10]).split('/'))[1];
            FILEname =jTitle;
            exerciseSelector(0);
        }
    }
//Info Routines============================================================================================================
function exerciseSelector(i)   //creates the exer selector         
    {
        statusMsg ("Constructing exercise Selector...");
        i=10;
        var t;
        var str="";
        while (i <ARRlesson.length)
        {
            t=(ARRlesson[i].split("/")); //gets title
            str=str+"<option value ="+i+">"+t[0]+"</option>\n";
            i=i+1;
        }
        str= "\n<select onchange='exerciseSelect(this.value)'><optgroup>\n"+str;
        str=str +"</optgroup></select>\n";
        document.getElementById('lesson').innerHTML=str;
    }

function exerciseSelect(indx)
    {
        document.getElementById('jamLesson').innerHTML="<X1>EXERCISE " + parseInt(indx-9,10)+":</X1><br>"+((ARRlesson[indx]).split('/'))[1];
        INDEXlesson = indx;
    }


function lessonSelect(indx)
    {
        statusMsg ("Selected Lesson " +indx);
        INDEXlesson=indx;
        if (document.getElementById('lesson').selectedIndex !==indx){document.getElementById('lick').selectedIndex =indx;}
        if (INDEXlesson>=ARRlesson.length-1) {alert('too long');}
    }

function exerciseAnalize()//indx???can do more later with neck
    {   statusMsg ("Analizing Lesson to Determining Constants..." );
        //info = ARRsteps[0].split(';');
        //TITLE = info[0];ROOT=info[1];BEATS=info[2];INFO = info[3];LINK=info[5];AND=info[6];
        //document.getElementById('Audio1').src = "../Licks/Tracks/"+TITLE+".mp3";//as soon as possible may need 2 sec pause
        //if (INFO ===undefined) {INFO = "Info?";}
        //if ( LINK===undefined|LINK==" "|LINK==="") {vis('link','hidden');}else{vis('link','visible');}
        //if ( AND===undefined) {AND = "A";}
        ///document.getElementById('titl').value=TITLE;
        //document.getElementById('key').value=ROOT;
        //document.getElementById('beats').value=BEATS;
        //document.getElementById('inf').value=INFO;
        //document.getElementById('lnk').value=LINK;
        //document.getElementById('bak').value=BACK;//alert(BACK)
        //document.getElementById('and').value=AND;
        //statusMsg (TITLE +" key:"+ ROOT +"  beats"+ BEATS);
        //statusMsg ("Determining Display Format");
        //var maxChr=2;//minimum allowable
        //var notes="";
        //var m=2;
        //var i=1;
        //var j =0;
        //while (i<ARRsteps.length)//determine maxChr in step width
        /*{   
            if (ARRsteps[i].length>0|ARRsteps[i])
            {
                notes =ARRsteps[i].split("|"); 
            }
            else
            {
                notes="A;A|A;A ".split("|");   
            }
            j=0;
            while (j<notes.length)
            {
                m =notes[j].split(";")[1].length;
                if ( m!== undefined & m > maxChr){maxChr = m;} 
                j=j+1;   
            }
            i=i+1;
        }
    if (maxChr===undefined){maxChr=1;}
    STEPwidth =maxChr +1;
    */
    }
function help(hdr,txt)
    {
        alert(hdr,txt);
        vis('helpDiv','visible');
        document.getElementById('helpIntro').innerHTML=hdr;
        document.getElementById('helpBody').innerHTML=txt;
    }

function infoIcons()
    {
    var str;
    //var str="<!DOCTYPE html><html><head><title>Icon Info</title><style type='text/css'>";
    str="<div font-size:8vh;color:black;font-family:Courrier New;font-weight: bold;text-align:left;vertical-align:middle;border-color:black; border-width:thin; background-color:lightgrey;padding:10px;margin:10px;>";
    str=str+"&nbsp3&nbsp&nbsp&nbsp<img  src='../../icons/fing.png' style='height:8vh;'>&nbsp3&nbsp&nbsp&nbspPress";
    str=str+"<br>&nbsp3c&nbsp&nbsp<img  src='../../icons/Fingcurl.png' style='height:8vh;'>  Curl";
    str=str+"<br>&nbsp3b4&nbsp <img  src='../../icons/fingB1.png' style='height:8vh;'>  Bend 1/2 tone";
    str=str+"<br> 3b5&nbsp <img  src='../../icons/fingB2.png' style='height:8vh;'>Bend 1 tone";
    str=str+"<br> 3b6&nbsp <img  src='../../icons/fingB3.png' style='height:8vh;'>Bend 1&1/2 tone";
    str=str+"<br> 3h&nbsp&nbsp  <img  src='../../icons/fingHammerOn.png' style='height:8vh;'>Hammer On";
    str=str+"<br> 3m&nbsp  <img  src='../../icons/fingMute.png' style='height:8vh;'>Mute";
    str=str+"<br> 3r&nbsp&nbsp  <img  src='../../icons/fingRelease.png' style='height:8vh;'>Release";
    str=str+"<br> 3d&nbsp&nbsp  <img  src='../../icons/fingSlideDown.png' style='height:8vh;'>Slide Down";
    str=str+"<br> 3u&nbsp&nbsp  <img  src='../../icons/fingSlideUp.png' style='height:8vh;'>Slide Up";
    str=str+"<br> 3v&nbsp&nbsp  <img  src='../../icons/fingVibrato.png' style='height:8vh;'>Vibrato";
    str=str+"<br> 3p&nbsp&nbsp  <img  src='../../icons/fingPullOff.png' style='height:8vh;'>Pull Off";
    str=str+"<br> 3=&nbsp&nbsp&nbsp  <img  src='../../icons/fingHold.png' style='height:8vh;'>Hold as played";
    str=str+"<br> 3a&nbsp&nbsp&nbsp  <img  src='../../icons/fingReplay.png' style='height:8vh;'>Pick Again";
    str=str+"</div>";
    return (str);
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

//Recent routines==============================================================================================================

function fileFromPath(path)
    {path = path.split('/');return (path[path.length-1]);}

function fetchHeader(url)
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
             alert(xmlhttp.getAllResponseHeaders());
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

function changesProtect(tf)
    {
        if (tf!==false)
        {
            document.getElementById('sheildSelect').style.visibility="visible";
            document.body.style.background = 'red';
            EDITED = true;
        }
        else
        {
            document.getElementById('sheildSelect').style.visibility="hidden";
            document.body.style.background = 'lightgrey';
            EDITED = false;    
        }
    }

function changesSave()
    {
        alert("WARNING:\n SAVE CHANGES to \n"+ FILEname+"\n before selecting another file!");
        document.getElementById('sheildSelect').style.visibility="hidden";
    }

// BOOT ROUTINE============================================================================================================

window.onload = function()
    {   statusMsg('Loading javascript...','black');
        document.getElementById('audioClick').volume=0;
        document.getElementById("Audio1").volume = 0.5;
        document.getElementById("Audio2").volume = 0.5;
        NONE =document.getElementById('none').style.display;//*  create object
        AND="A";
        document.getElementById("and").selectedIndex= 0;//set the mode selector
        document.getElementById('lickFile').selectedIndex=0;
        document.getElementById('fileInput').addEventListener('change', fileRead, false);//fileReadSetup
        loadServerLickFile('12BarBluesA');
        //adjustElements();//???USE THIS LATER IF THE SIZE OF ICONS BECOMES A PROBLEM
        document.getElementById('lickTime').selectedIndex=0;
        loadServerJamFile("12BarBluesA");
        statusMsg('READY');
        document.getElementById("splash").style.display='none';
    };

function loadServerLickFile(title)
    {  
        changesProtect(false);
        BACK=title;
        CTO();
        var path ="../Licks/" + title + "/" + title + ".txt";  //* get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var n = content.search("404"); //* look for a 404 error from server
        if (n >-1)
        {  
            statusMsg("NO LICK FILE",'red');
        }
        else
        {
            ARRlicks=content.split("\n");
            FILEname =title;
            lickSelector(0);
            lickSelect(0);
        }
    //document.getElementById('jTrackName').innerHTML=title;
    LICKfileName=title;
    loadServerJamFile(title);
    }

function lickSelector(indx)   //creates the lick selector         
    {
        statusMsg ("Constructing Lick Selector...");
        var i=0;
        var t;
        var str="";
        while (i <ARRlicks.length)
        {
            t=(ARRlicks[i].split(";")); //gets title
            str=str+"<option value ="+i+">"+t[0]+"</option>\n";
            i=i+1;
        }
        str= "\n<optgroup>\n"+str;
        str=str +"</optgroup>\n";
        document.getElementById('lick').innerHTML=str;
        document.getElementById('Audio2').src = "../LICK/"+LICKfileName+"/"+LICKfileName+".mp3";///}//as soon as possible   
        TRACKcurrent=BACK;
        lickSelect(indx);
    }

function lickSelect(indx)
    {
        statusMsg ("Selected Lick " +indx);
        INDEXlick=indx;
        if (document.getElementById('lick').selectedIndex !==indx){document.getElementById('lick').selectedIndex =indx;}
        if (INDEXlick===0) {vis('lastLick','hidden');}else{vis('lastLick','visible');}
        if (INDEXlick>=ARRlicks.length-1) {vis('nextLick','hidden');}else{vis('nextLick','visible');}
        document.getElementById("lickCount").innerHTML= "{"+ parseInt(parseInt(INDEXlick,10)+1,10) + "/"+ARRlicks.length+"}";
        ARRsteps=ARRlicks[indx].split("@");
        lickAnalize();
    }

function lickAnalize()//indx???can do more later with neck
    {   statusMsg ("Lick "+INDEXlick+": Analizing to Determining Constants..." );
        info = ARRsteps[0].split(';');
        TITLE = info[0];ROOT=info[1];BEATS=info[2];INFO = info[3];LINK=info[5];AND=info[6];
        document.getElementById('Audio1').src = "../Licks/"+LICKfileName+"/"+TITLE+".mp3";//as soon as possible may need 2 sec pause
        if (INFO ===undefined) {INFO = "Info?";}
        if ( LINK===undefined|LINK==" "|LINK==="") {vis('link','hidden');}else{vis('link','visible');}
        if ( AND===undefined) {AND = "A";}
        document.getElementById('titl').value=TITLE;
        document.getElementById('key').value=ROOT;
        document.getElementById('beats').value=BEATS;
        document.getElementById('inf').value=INFO;
        document.getElementById('lnk').value=LINK;
        document.getElementById('bak').value=BACK;//alert(BACK)
        document.getElementById('and').value=AND;
        statusMsg (TITLE +" key:"+ ROOT +"  beats"+ BEATS);
        statusMsg ("Determining Display Format");
        var maxChr=2;//minimum allowable
        var notes="";
        var m=2;
        var i=1;
        var j =0;
        while (i<ARRsteps.length)//determine maxChr in step width
        {   
            if (ARRsteps[i].length>0|ARRsteps[i])
            {
                notes =ARRsteps[i].split("|"); 
            }
            else
            {
                notes="A;A|A;A ".split("|");   
            }
            j=0;
            while (j<notes.length)
            {
                m =notes[j].split(";")[1].length;
                if ( m!== undefined & m > maxChr){maxChr = m;} 
                j=j+1;   
            }
            i=i+1;
        }
    if (maxChr===undefined){maxChr=1;}
    STEPwidth =maxChr +1;
    statusMsg ("Displaying "+ maxChr+ " spaces per beat for " + DURmp3 +" seconds");
    lickLoad();
    }

function lickLoad(indx)
    {
        PLAYctrl ='play';  //need reset routine
        document.getElementById("bgs2").src="../../icons/transPlayGreen.png";
        statusMsg ("Loading Lick " +INDEXlick+": "+TITLE);
        STEP=0;
        WORKbeat =1;
        document.getElementById('stepWidth').value=STEPwidth;
        BEAT=0;
        BAR=1;
        loadMetro();
    } 

function loadMetro()
    {   statusMsg ("Setting Metronome...");
        var brs;
        var lft;
        var str="";
        var w = " width:" +100/BEATS+"%; "; 
        var i=1;//BEATS===================================================
        while (i<=BEATS)
        {
            lft= "left:"+ (i-1)*(100/BEATS) +"%; ";
            str = str+ "<div id='met"+i+"' style=\"position:absolute;"+ w + lft+ "borderWidth:5px; border-style:outset; z-index:500;background-color:lightgrey\">"+i+"</div>";
            i=i+1;
        }
        document.getElementById('metro').innerHTML=str;
        i=1;//BARS=========================================================
        str="";
        brs= parseInt((ARRsteps.length -1)/BEATS,10);
        if (parseFloat((ARRsteps.length-1)/BEATS,10)>brs){brs=brs+1;}
        w = " width:" +100/brs+"%; ";
        while (i<=brs)
        {
            lft= "left:"+ (i-1)*(100/brs) +"%; ";
            str = str+ "<div id='bar"+i+"' style=\"position:absolute;"+ w + lft+ "borderWidth:5px; border-style: outset; z-index:500;background-color:lightgrey\">"+i+"</div>";
            i=i+1;
        }
        document.getElementById('metro2').innerHTML=str;
        BARS=brs;
        statusMsg("Metronome Set");
        BEAT =0;
        BAR=1;
        metronome();
        lickRender();
    }

function lickRender()
    {
        statusMsg ("Rendering "+TITLE);
        var stp="";// will be  1,&,2,& etc
        var s=1; //string
        var b=1; //beat
        var c=1; //step?????
        var n=0;//notes
        var i;//item
        var txt = ""; //the displayed lines of text: one div per line
        var notes ="";
        var txtNew ="";
        arr="-,e,B,G,D,A,E,<div style='color:red'>*".split(",");
        var ebvis="visible";
        //routine======================================================================================
        //first LINE===================================================================================
        if (AND==='A'){stp="X,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16".split(",");}
        if (AND==='B'){stp="X,1,&,2,&,3,&,4,&,5,&,6,&,7,&,8,&".split(",");}
        if (AND==='C'){stp="X,1,&,&,2,&,&,3,&,&,4,&,&,5,&,&,6,&,&,7,&,&,8,&,&".split(",");}
        if (AND==='D'){stp="X,1,&,&,&,2,&,&,&,3,&,&,&,4,&,&,&,5,&,&,&,6,&,&,&,7,&,8,&,&,&".split(",");}
        txt = txt+"<pre><div style='color:red'> | ";
        while(b < ARRsteps.length)  //build the line of beat numbers====================================  
        {
            txtNew = stp[c]+".";
            while(txtNew.length<STEPwidth){txtNew=txtNew +".";}
            txtNew="<a id ='"+b+"' onclick='workbeatSet("+b+")'>"+ txtNew +"</a>";
            if (parseInt(b/BEATS,10)==parseFloat(b/BEATS,10)) {txtNew=txtNew+"|";c=0;}
            txt = txt+txtNew;
            b = b+1; c = c+1;
        }
        txt = txt+"</div><div>";//First Line Finished
        while (s <= 7)//build each line of notes=========================================================
        {
            //root= rootFirst(s);//used to highlight root not used yet
            //rootB = root +12;//used to highlight root not used yet
            txt=txt+ arr[s]+ "| ";//put the string name in i.e("e|")
            b=1;
            while(b < ARRsteps.length)  //until end of ARRsteps  
            {
                notes = ARRsteps[b].split("|"); //make notes array
                n=0;
                txtNew="";
                while(n<notes.length)//do until all notes are processed
                {
                    i=0;
                    while (i<notes.length)
                    {
                        item = notes[n].split(";");//item[0]=beat, item[1]fret/action
                        if (item[0]==s)//if you are working on the correct string
                        {
                            txtNew=item[1];
                            while(txtNew.length<STEPwidth){txtNew=txtNew +" ";}
                        }
                         i=i+1;
                    }
                    n=n+1;
                }
            var blank ="-";
            if (s==7) {blank ="*";}
            i=1;
            while (i<STEPwidth){blank =blank+" ";i=i+1;}
            if (txtNew==="") {txtNew=blank;}//if no note exists put in blank with spacer(-)
            txtNew="<a id='"+b+"-"+s+"' onclick='noteEdit(this.id)'>"+txtNew+"</a>";
            //==================================
            if (parseInt(b/BEATS,10)==parseFloat(b/BEATS,10)) {txtNew=txtNew+"|";}
            txt=txt +txtNew;
            //==================================
            b=b+1;
            }
            if (s!==7){txt=txt+"\n";}
            s=s+1;
        }
        b=1;//BUILD the bottom line========================================================
        txt = txt+"</div><div style='color:green'> | ";
        while(b < ARRsteps.length)  //step  
        {
            txtNew = b+".";
            while(txtNew.length<STEPwidth){txtNew=txtNew +".";}
            txtNew="<a onclick='alert("+b+")'>"+ txtNew +"</a>";
            if (parseInt(b/BEATS,10)==parseFloat(b/BEATS,10)) {txtNew=txtNew+"|";}
            txt = txt+txtNew;
            b = b+1;
        }
        txt = txt+"</div>";
        statusMsg("Setting up Edit parameters..."); //add the barEdit div and locate it
        eb ="<div id = 'barEdit' style='position: absolute; top:0%; height :100%; background-color:tan; visibility:"+ebvis+";z-index:-10'>"; 
        eb =eb+ "</div>";
        eb=eb+"<input onchange=\"noteUpdate(this.value)\" id =\"cellEdit\" maxlength=\""+STEPwidth+"\"  style=\"position: absolute; background-color:pink; visibility:hidden;font-size: 2vw;\">";
        document.getElementById('screen').innerHTML=txt +eb;
        var X=document.getElementById(WORKbeat).offsetLeft;
        document.getElementById('barEdit').style.left=X+"px";
        document.getElementById('barEdit').style.zIndex=-10;
        document.getElementById('barEdit').style.width=document.getElementById("1").offsetWidth+"px";
        document.getElementById('cellEdit').style.width=document.getElementById("barEdit").offsetWidth+"px";
        document.getElementById('cellEdit').style.height=document.getElementById("1").offsetHeight+"px";
        document.getElementById('keyA').innerHTML="KEY:"+ROOT ;
        document.getElementById('beatsA').innerHTML= "BEATS:"+BEATS;
        statusMsg (INFO);       
    }
//END OF BOOT===============================================================================================================

//CONFIGURE WEB PAGE===============================================================================================================
/*
function adjustElements()
    {
        rat();    
        //autoSize('hme',undefined,undfined,undefined,10);
        //autoSize('buttonJam',undefined,undfined,undefined,10);
        //autoSize('buttonHome',undefined,undfined,undefined,10);
        //autoSize('buttonNeck',undefined,undfined,undefined,10);
        //autoSize(id,fVh,bottom,ht,wt)
    }
*/   
function loop()//sets the neckplay LOOP to infinite or one
    {
        if(LOOP===true)
        {
            LOOP=false;document.getElementById('loopCtrl').src="../../Icons/transOnePlay.png";
        }
        else
        {
            LOOP=true;document.getElementById('loopCtrl').src="../../Icons/transInfinity.png";
        }
    }

function neckPlayToggle(tf)
    {
        if (tf === true)
        {
            stepAdvance(1);neckPlay(STEP);
            document.getElementById('pauseIcon').style.visibility='visible';
        }
        else
        {
            CTO();
            PLAY=false;
            document.getElementById('pauseIcon').style.visibility ='hidden';
        }
    }

function rootFirst(wire)
    {
        var offSetRoot=0;
        if (ROOT=='A') {offSetRoot =7;}
        else if (ROOT=='A#'|ROOT=='Bb') {offSetRoot = 6;}
        else if (ROOT=='B') {offSetRoot = 5;}
        else if (ROOT=='C') {offSetRoot = 4;}
        else if (ROOT=='C#'|ROOT=='Db') {offSetRoot =3;}
        else if (ROOT=='D') {offSetRoot = 2;}
        else if (ROOT=='D#'|ROOT=='Eb') {offSetRoot =1;}
        else if (ROOT=='E') {offSetRoot = 0;}//this is the ROOT at 0
        else if (ROOT=='F') {offSetRoot = 11;}
        else if (ROOT=='F#'|ROOT=='Gb') {offSetRoot =10;}
        else if (ROOT=='G') {offSetRoot = 9;}
        else if (ROOT=='G#'|ROOT=='Ab') {offSetRoot = 8;}
        return(offSetRoot);
    }

function jamPlay()
    {
        CTO();
        var i=(fileFromPath(document.getElementById('jPlay').src));
            if (i== "transPlayGreen.png")
            {
                document.getElementById("Audio2").play();
                licksCycle();
                document.getElementById('jPlay').src= "../../icons/resetSpinner.gif";
            }
            else if (i== "resetSpinner.gif")
            {
                document.getElementById("Audio2").load();
                document.getElementById('jPlay').src= "../../icons/transPlayGreen.png";
            }
    }

function lickToggle()
    {
    if (LICKplay===false)
        {   LICKplay=true;
            document.getElementById('lickTog').src= "../../icons/blackRedLick.png";
            licksCycle();  
        }
        else
        {
            LICKplay=false;
            CTO();
            JAMplay=true;
            document.getElementById('lickTog').src= "../../icons/blacklick.png";
        }
    }

function licksCycle()
    {
        CTO();
        LICKtime=document.getElementById('lickTime').value;
        TIMEOUTcycle=setTimeout(function()//* reusing TIMEOUTscroll
        {  statusMsg("Cycling Lick...") ;
           if(INDEXlick>=ARRlicks.length-1){INDEXlick=-1;}
           
           if (MODE!='jam')
           {
            lickSelect(parseInt(INDEXlick,10)+1);
            lickPlay();
           }
           else
           {
            lessonSelect(parseInt(INDEXlesson,10)+1);
           }
           TIMEOUTchangeAlert=setTimeout(function()//* reusing TIMEOUTscroll
             {
                statusMsg('Auto Advancing Lick...(4 Second Warning!)','yellow');
                },LICKtime-3000);
           licksCycle();
        },LICKtime);//*  30 seconds on each lick, you can stop the sequence
    }

//Play lick in std display===========================================================================================================
function scrollSetup()//* get the song data,song width and screen width,Duration,ScrollConstant Run after you set the content of page
    {
        statusMsg('Setting up scroll...');
        DURmp3=document.getElementById('Audio1').duration;
        WINDwt = window.innerWidth;
        statusMsg(TITLE + ": Scroll Setup...");
        PAGEwt =document.getElementById("screen").scrollWidth;
        document.getElementById('screen').scrollLeft=    0;
        Xstart=0; 
        Xend=false;
        statusMsg(TITLE + ": Scroll Setup2...");
        Xpos = document.getElementById("screen2").scrollLeft;// should get this at Play
        SCROLLpix=parseInt(PAGEwt-WINDwt,10);
        SCROLLkon = DURmp3*1000/SCROLLpix;// microseconds per pixel
        SCROLLbase = SCROLLkon;
        statusMsg(TITLE + " KON(M-S/PIXEL): "+ SCROLLkon + "  Duration:"+DURmp3);
        } 

function scrollEngine()//* the actual scrolling routine keep it simple
    {   //* before it starts SCOLLstartTime,SCROLLkon must be set
        statusMsg('scrolling...');
        nowTime = new Date().getTime(); 
        Xpos = document.getElementById("screen").scrollLeft;
        statusMsg (Xpos);
        
        if(Xend===true) //* didnt move//* move part 3
        {   
           statusMsg('End of Lick');
           endTrack();
           document.getElementById("bgs2").src="../../icons/transResetBlue.png";
           PLAYctrl='reset';
        }         
        else//* STD SCROLL move part 2
        {
            var newPos = parseInt(((nowTime - SCROLLstartTime)/SCROLLkon)+Xstart,10);
            statusMsg(newPos);
            document.getElementById("tab").scrollLeft= newPos;//* MMM
            if (document.getElementById("tab").scrollLeft>= newPos){Xend =true;}
            TIMEOUTscroll = setTimeout(function(){scrollEngine();},SCROLLkon);
        }
    }
//EDIT FUNCTIONS=======================================================================

function editWarning(){if (MODE === 'edit'){alert ("WARNING!!\nYou Have NOT saved your changes...");} }

function noteEdit(id)
    {
        var a =id.split("-");
        bt=a[0];
        st=a[1];
        WORKbeat=bt;
        WORKstring=st;
        document.getElementById('barEdit').style.left=document.getElementById(id).offsetLeft+"px";
        if (MODE=='edit' ) 
        {
            statusMsg("LEFT:"+ document.getElementById(id).offsetLeft+"px" + "\nTOP:"+document.getElementById(id).offsetTop+"px");
            document.getElementById('cellEdit').style.left=document.getElementById(id).offsetLeft+"px";
            document.getElementById('cellEdit').style.top=document.getElementById(id).offsetTop+"px";
            document.getElementById('barButton').style.zIndex=1000;
            vis('cellEdit','visible');
            vis('barButton','visible');
            document.getElementById('cellEdit').focus();
            a=document.getElementById(id).innerHTML;
            a=rTrim(a);
            if (a=="-"|a=="*") {a="";}
            document.getElementById('cellEdit').value=a;
        }
    }

function noteUpdate(fretAction)
    {
        var newNotes="";//build the new element from scratch
        var len=0;
        var beat = WORKbeat;
        if (ARRsteps[beat]!=="")
        {
            var notes=ARRsteps[beat].split('|') ;   
            len= notes.length;
            i=0;
            fretAction=rTrim(fretAction);
            statusMsg(len+ " Existing notes: Action>"+fretAction+"<");
            while (i < len)//build string of reused notes
            {
                if (notes[i].split(";")[0]!==WORKstring)
                {
                    newNotes = newNotes+notes[i] +"|";
                }
                i=i+1;
            }    
        statusMsg("Reused notes; >" +newNotes+"<");
        }
        if (fretAction!=="")
        {
            newNotes = newNotes+(WORKstring+";"+fretAction);    
        }
        else
        {
            newNotes = newNotes.substring(0,newNotes.length-1);
        }
        statusMsg("New Notes; >" +newNotes+"<");
        ARRsteps[beat]=newNotes;
        lickUpdate();
    }

window.onclose =function(){alert('shit');};

//file functions============================================================================================================
function fileReadSetup()               
    {
        document.getElementById('fileInput').addEventListener('change', fileRead, false);
    }

function fileRead(e)
    // The next or similar 2 line must be in the HTML file....
    //<button onclick=onclick="document.getElementById('fileInput').click()">
    //<input onclick = "fileReadSetup()" type="file" id = "fileInput" style = "position:fixed; visibility:hidden; left:0%; height:0%; width:0%; top:0%"> 
    {
        var file = e.target.files[0];
        if (!file){ alert("No Valid File...");return;}//incase no file
        var reader = new FileReader();
        reader.onload = function(e)
        {
            var contents = e.target.result;
            //program specific  steps below....============================================
            FILEname = (file.name.substring(0,(file.name.length)-4));
            while (contents.indexOf("\r") >= 0)//* get rid of linefeeds
            contents = contents.replace("\r", "");
            ARRlicks ="";
            ARRlicks = contents.split("\n");//* make an array of lines
            lickSelector();
            lickLoad(0);
            loadJam();
            alert(1);
            statusMsg ("FILE '"+ FILEname +"' LOADED");
        };
    reader.readAsText(file);
    }

function fileSaveAsTextPS()
    {   /* 
       var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.innerHTML = "My Hidden Link";
        window.URL = window.URL || window.webkitURL;// allowcode to work in webkit & Gecko based browsers// without the need for a if / else block.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;// when link is clicked call a function to remove it from// the DOM in case user wants to save a second file.
        downloadLink.style.display = "block";
        document.body.appendChild(downloadLink);
         
        downloadLink.click();
        */
        //program specific=============================
        document.body.style.background = 'lightgrey';
        statusMsg("Check to see if it was saved!","yellow");
    }

function destroyClickedElement(event){document.body.removeChild(event.target);}// remove the link from the DOM


function fileLickSave()
    {
    var str=ARRlicks.join('\n');
    fileSaveAsText(FILEname+".txt",str);
    }

//lick functions============================================================================================================

function lickUpdate()
    {   
        ARRsteps[0]=TITLE+";"+ROOT+";"+BEATS+";"+(INFO.split("/n")).join(" ")+";"+BACK+";"+LINK+";"+AND;
        ARRlicks[INDEXlick]=ARRsteps.join("@");
        changesProtect();
        lickRender();
    }

function lickDelete()
    {
        var x =TITLE;
        ARRlicks.splice(INDEXlick,1);
        lickSelector();
        ARRsteps="";
        lickSelect(0);
        statusMsg (x + " DELETED!!");
        changesProtect();
        vis('details',false);
    }

function lickDup()
    {
        var x = "COPY-" + TITLE;
        ARRlicks.splice(ARRlicks.length+1,0,"COPY-" + ARRlicks[INDEXlick]);
        lickSelector();
        ARRsteps="";
        lickSelect(ARRlicks.length-1);
        statusMsg (x + " ADDED!!");
        changesProtect();
        vis('details',true);
    }
function lickNew()
    {//ARRsteps[0]=TITLE+";"+ROOT+";"+BEATS+";"+(INFO.split("/n")).join(" ")+";"+BACK+";"+LINK+";"+AND;
        ARRlicks.splice(ARRlicks.length,0,"NEW-LICK;C;4;New;none;none;A;@@@@");
        lickSelector();
        ARRsteps="";
        lickSelect(ARRlicks.length-1);
        statusMsg ("New Lick added!");
        changesProtect();
        vis('details');
        
    }    
//step functions============================================================================================================
    
    function workbeatSet(b)
    {
        WORKbeat=b;
        var X=document.getElementById(WORKbeat).offsetLeft;
        document.getElementById('barEdit').style.left=X+"px";
        document.getElementById('cellEdit').style.visibility='hidden';
    }

    function stepEdit(event)//xx need to understand s
    {   //statusMsg("Selecting Step "+ WORKbeat,1);
        var s=1;
        var i=1;
        var arr;
        var notes;
        var X=document.getElementById(WORKbeat).offsetLeft;
        document.getElementById('barEdit').style.left=X+"px";
        document.getElementById('barEdit').style.zIndex=-10;
        notes=ARRsteps[WORKbeat].split("|");
        while (s<=6)
        {
            i=0;
            while(i<notes.length)
            {
                arr=notes[i].split(';');
                if (arr[0]==s){document.getElementById("s"+s).value=arr[1];}
                i=i+1;
            }
            s=s+1;
        }
    }

function stepDelete()
    {   
        //statusMsg("Deleting Step "+ WORKbeat,1);
        if (WORKbeat===0)
        {
            statusMsg ("You cannot DELETE the HEADER!!!");
        }
        else
        {
            ARRsteps.splice(WORKbeat, 1);
            lickUpdate();
            statusMsg("STEP " +WORKbeat+" DELETED!",'yellow');
        }
    }

function stepInsert()
    {
        statusMsg("INSERTING Step "+ WORKbeat);
        ARRsteps.splice(WORKbeat, 0, "");
        lickUpdate();
        statusMsg("STEP " +WORKbeat+" INSERTED!",'yellow');
    }

function stepDuplicate()
    {
        statusMsg("Duplicating Step "+ WORKbeat);
        str =ARRsteps[WORKbeat];
        ARRsteps.splice(WORKbeat, 0, str);
        lickUpdate();
        statusMsg("DUPLICATE STEP " +WORKbeat+" CREATED!",'yellow');
    }

function stepClear()
    {
        ARRsteps[WORKbeat]="";
        lickUpdate();
        statusMsg("STEP " +WORKbeat+" CLEARED!",'yellow');
    }


//NECK PLAYER FUNCTIONS==========================================================================================
function neckPlay()
    {   
        TIMEOUTscroll=setTimeout(function()//* reusing TIMEOUTscroll
        {  statusMsg("Scrolling Neck") ;
           stepAdvance(1);
           if (BEAT===0){return;}
           document.getElementById('audioClick').play();
           neckPlay();
        },MET);//*  control this to set speed
    }

function closeAud()//* used to indicate audio end (needed to remove listener)
    {
        AUDend=true;
        endTrack();
    }

function endTrack()
    {//* alert("AN: "+ AUTOnext+"  AE: "+AUDend+"   SE: "+Yend);
       // alert(AUDend);
       //alert('Xend ' +Xend);
        if (AUDend===true|AUDfail ===true)
            {   //alert('listener');
                document.getElementById("Audio1").removeEventListener('ended',closeAud);
                //alert('listener Removed');
            }
        if (Xend===true & (AUDend ===true|AUDfail ===true))
            {   
                //alert("end Track");AAA
            }    
    }

function CTO()
    {//* clear all Timouts except blink flash and crap
        clearTimeout (TIMEOUTscroll);
        clearTimeout (TIMEOUTcycle);
        clearTimeout (TIMEOUTchangeAlert);
    }


function playCtrl(act)

    {
       alert('crap');
        PLAYctrl = act;
        alert (PLAYctrl);
        if (PLAYctrl =='reset')
        {
            CTO();
            document.getElementById("bgs2").src="../../icons/transPlayGreen.png";
            //PLAYctrl ='play';  //need reset routine
            trackReset();
        }
        else if (PLAYctrl=='play')
        {   alert('Added');
            document.getElementById("bgs2").src="../../icons/transPauseRed.png";
            lickPlay();
            document.getElementById('Audio1').addEventListener("ended",alert("X"));
            alert('Added');
            PLAYctrl ="pause";
        }
        else if (PLAYctrl=='pause')
        {
            CTO();
            document.getElementById("bgs2").src="../../icons/transResetBlue.png";
            document.getElementById("Audio1").pause();
            PLAYctrl ="reset";
        }
    }

function trackReset()
    {
        CTO();
        if (document.getElementById("Audio1"))
        {
            
            
            
            
            document.getElementById("Audio1").autoplay = false;
            
            if(LOOPER===true)
        {
            document.getElementById('Audio1').currentTime  = parseInt(LOOPtop,10);
            statusMsg("Loop reset to "+ secToMin(parseInt(SCROLLkon*LOOPtop/1000,10)),'orange');
        }
         else   
        {    
            document.getElementById("Audio1").load();
        }
        }
        document.getElementById("screen").scrollLeft=0;
    }

function lickPlay()
    {  
        
       CTO();
        var i=(fileFromPath(document.getElementById('bgs2').src));
            if (i== "transPlayGreen.png")
            {
                document.getElementById("Audio1").play();
                licksCycle();
                document.getElementById('bgs2').src= "../../icons/resetSpinner.gif";
            }
            else if (i== "resetSpinner.gif")
            {
                lickReset();
            } 
        
        
        
        
        
        
        //document.getElementById("Audio1").play();
        //document.getElementById("bgs2").src="../../icons/resetSpinner.gif";
    }

function lickReset()
    {
        //alert("LIK RESE");
        document.getElementById("Audio1").load();
        document.getElementById("bgs2").src="../../icons/transPlayGreen.png";
    }

function scrollTune(pct,step)//* WWWneeds rewriting to new machine to slide fast and to work while not scrolling
    {   //* 25% of screen per second seems appropriate rate
        statusMsg("scrolling");
        var int=12;//* interval may eventally calculate this
        var move=parseInt((pct*WINDwt)/25,10);//* will move 25 steps to move pct int between steps in 1/1000 of a sec
        var plannedSteps =Math.abs(parseInt(pct*100,10));
        alert(plannedSteps);
        statusMsg(WINDwt+'=='+plannedSteps);
        if (step=== undefined){step=1;clearTimeout(TIMEOUTscroll);}else{step = step+1;}
        if (step<plannedSteps)
        TIMEOUTscroll=setTimeout(function()//* reusing TIMEOUTscroll
            {  statusMsg("scrollTuneB") ;
               var x = document.getElementById("screen").scrollLeft;// MMM
               Xpos = x + move;
               document.getElementById("screen").scrollLeft=Xpos;// MMM
               scrollTune(pct,step);
            },int);//*  control this to set speed
            else
            {
                statusMsg("scrollTuneC") ;
                Xstart =Xpos;
                SCROLLstartTime = new Date().getTime();
                scrollEngine();
            }
    }

function scrollRate(factor)
    {
        SCROLLkon = SCROLLkon*factor;
        var a;
        if(SCROLLkon!==SCROLLbase) {a= parseInt(BPM*(SCROLLbase/SCROLLkon),10);}else{a =BPM;}
        document.getElementById('speed').innerHTML =a;
        SCROLLstartTime=new Date().getTime();
        Xstart=Xpos; 
        Xpos = document.getElementById("screen").scrollLeft;
    }


function mode(m)

    {
        MODE=m;
        dis('jamScreen','none');
        stepAdvance(100000);
        neckPlayToggle(false);//xxx??????
        document.getElementById('buttonTab').style.opacity=0.3;
        document.getElementById('buttonNeck').style.opacity=0.3;
        document.getElementById('buttonJam').style.opacity=0.3;
        document.getElementById('buttonEdit').style.opacity=0.3;
        if (m =='tab')
        {   
            jTrackSet(LICKfileName);
            document.getElementById('buttonTab').style.opacity=1;
            dis('tabScreen','block');
            statusMsg ("Tablature Mode","black");
            vis('editor','hidden');
            vis('barButton','hidden');
        }   
        else if (m=='neck') 
        {
            jTrackSet(LICKfileName);
            document.getElementById('buttonNeck').style.opacity=1;
            dis('neckScreen','block');
            dis('tabScreen',NONE);
            statusMsg ("Neck Mode: STEP:"+STEP);
        } 
        else if (m=='jam') 
        {
            jTrackSet(JAMfileName);
            statusMsg ("Jammin!!!");
            document.getElementById('buttonJam').style.opacity=1;
            dis('jamScreen','block');

        }
        else if (m=='edit') 
        {
            jTrackSet(LICKfileName);
            document.getElementById('buttonEdit').style.opacity=1;
            dis('tabScreen','block');
            statusMsg ("Edit Mode!  REMEMBER TO SAVE YOUR WORK!!","yellow");
            vis('editor','visible');
            vis('barButton','visible');
        } 
    }

function statusMsg(msg,bgcolor)//* xxx could trim to 40 chr
    {   
        var i=5;
        var alrt=false;
        var str="DEBUG (last 6 status msgs; last one on Bottom!)\n\n";
        if (bgcolor === undefined){bgcolor = 'black';}
        if (bgcolor==1) {bgcolor = 'red';alrt=true;}
        document.getElementById("msg").style.backgroundColor = bgcolor;
        if (bgcolor == "black"){document.getElementById("msg").style.color = 'white';}
        else if (bgcolor == "red"){document.getElementById("msg").style.color = 'yellow';}
        else{document.getElementById("msg").style.color = 'black';}
        document.getElementById("msg").innerHTML = msg;
        while (i>0){KEEPER[i]=KEEPER[i-1];str=str+"\n"+parseInt(6-i,10)+": "+KEEPER[i];i=i-1;}
        str=str+"\n6: "+ msg;
        KEEPER[0] = msg;
        if (alrt===true){ alert(str);}
        }
function infoTab()
    {
        var s ="TABLATURE CONVENTIONS\n=====================================\nSTANDARD CONVENTIONS(Loosly from Ultimate Guitar)\n----------------------";
        s =s+="\nh - hammer on\np - pull off\nb - bend up i.e(12b14)\nr - release bend\nu - slide up\nd - slide down";
        s =s+"\nv - vibrato (sometimes written as ~)\nt - right hand tap\nx - play 'note' with heavy damping\n* - harmonic ";
        s =s+"\n\nMY PERSONAL CONVENTIONS\n----------------------\n= - hold the note in current state\nm - mute after playing\nc - curl (small bend-release)";
        s= s+"\n\nPicking Conventions\n(Last Letter of the NOTE)\n----------------------\nU:Pick Up\nD: Pick Down\nT: Thumb\nI: Index\nM: Middle\nR: Ring\nL: Little";
    }

function infoHUH()
    {
    alert('s');
    var myWindow = window.open("", "MsgWindow", "width=500, height=600");
    myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
    }

//common functions=======================================================================================
function visXXX(iconID,style)
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
    }

function disXXX(id,disp)
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

function makeScale(str) //visMode can be inVisEdit or visEdit or vis
    {   
        document.getElementById('fbshow').visibilty ='visible';
        var ID ="1-0";//physical note location (string - fret)with 0 being open
        var note =0; //which note of 0-11 in the scale you are working with
        var offSetRoot;//imaginary position of the first root note of the scale left of the nut 
        var offSet; //imaginary position of the first root note of the scale left of the nut 
        var wire =1;// string you are working with
        var fret=0;//where you are on the neck 0 to 24
        var pct = 1;//nominal left% of the icon in HTML
        var wireTop = 8;//nominal top% icon in HTML
        var icon = "transWhiteCircle";
        var thing =""; //html fragment for the icon showing position, icon and action
        statusMsg('starting');//starting the Routine=================================================
        var msg = "ERROR:\n" + str + "\n...does not contain 12 steps!\n defaulting to CHROMATIC Scale";
        if (str.split("-").length != 12) {alert(msg);SCALE="1-1-1-1-1-1-1-1-1-1-1-1";}//error trap
        SCALE=str;//set the scale
        var arrSteps=SCALE.split("-");
        if (ROOT=='A') {offSetRoot =7;}//sthis should be a hash:
        else if (ROOT=='A#'|ROOT=='Bb') {offSetRoot = 6;}
        else if (ROOT=='B') {offSetRoot = 5;}
        else if (ROOT=='C') {offSetRoot = 4;}
        else if (ROOT=='C#'|ROOT=='Db') {offSetRoot =3;}
        else if (ROOT=='D') {offSetRoot = 2;}
        else if (ROOT=='D#'|ROOT=='Eb') {offSetRoot =1;}
        else if (ROOT=='E') {offSetRoot = 0;}//this is the ROOT at 0
        else if (ROOT=='F') {offSetRoot = 11;}
        else if (ROOT=='F#'|ROOT=='Gb') {offSetRoot =10;}
        else if (ROOT=='G') {offSetRoot = 9;}
        else if (ROOT=='G#'|ROOT=='Ab') {offSetRoot = 8;}
        else {alert("ERROR:\n" + ROOT + " cannot be a ROOT note!");}
        while (wire <7)//Loop through each wire========================================================
        {   //set up the individual wire offSet//by my convention wire 1 has no offset
            if (wire==1) {offSet =offSetRoot ;wireTop=2;}
            if (wire ==2) {offSet=(offSetRoot+7);wireTop=19;}
            else if (wire ==3) {offSet=(offSetRoot+15);wireTop=36;}
            else if (wire ==4) {offSet=(offSetRoot+10);wireTop=53;}
            else if (wire ==5) {offSet=(offSetRoot+5);wireTop=71;}
            else if (wire ==6) {offSet =offSetRoot;wireTop=89;} 
            fret =0;
            while (offSet>11) {offSet=offSet-12;}
            note =offSet;
            while (fret<24)//xxxwas 35
            {
                if (note>11) {note =0;}
                ID = wire +"-" + fret;
                pct =1+(fret*4);
                if (arrSteps[note]=='0') {icon ="trans";}else{icon=ARRscaleIcons[note];}
                thing= thing + "\n<img src = '../../icons/"+icon+".png' id ='" + wire +"-" + fret +"' style='position:absolute; left:" +pct+ "%; top:"+wireTop+"%;  width:2%'>";
                fret =fret+1;
                note =note+1;
            }   
            wire = wire +1;
        }
        //document.getElementById('fb').innerHTML ="<img id = 'fretboard' style='position:absolute; top:10%; left:0%; height:80%; width:100%' alt ='Fingerboard' src ='../../icons/fretboardA.png'>";
        document.getElementById('fbshow').innerHTML =thing;
        statusMsg(SCALE);
    }

function dispMode(scale,mode)
    {   //alert(scale)
        makeScale(scale);
        if (mode =='scale')
        {
           document.getElementById('scale').style.opacity=1;
           document.getElementById('chord').style.opacity=0.25;
           document.getElementById("chord").selectedIndex = 0;
        }
        else
        {
          document.getElementById('scale').style.opacity=0.25;
          document.getElementById('chord').style.opacity=1;
          document.getElementById("scale").selectedIndex = 0;
        }
    }

function metronome()
    {   
        var i=1;
        while (i<=BEATS)
        {
            document.getElementById("met"+i).style.backgroundColor='lightgrey';
            i=i+1;
        }
        if(BEAT!==0){document.getElementById("met"+BEAT).style.backgroundColor='gold';}
             
        i=1;
        while (i<=BARS)
        {
            document.getElementById("bar"+i).style.backgroundColor='lightgrey';
            i=i+1;
        }
        //document.getElementById('audioClick').play();
        document.getElementById("bar"+BAR).style.backgroundColor='brown';
        //statusMsg('Displaying BAR: '+ BAR +'  BEAT: '+ BEAT);
    }

function stepAdvance(i)
    {
        statusMsg("Advancing "+i);
        if ((STEP+i)>0 & (STEP+i)<ARRsteps.length & i<10000)//only advance if you are in the 0 to end zone
        {
            STEP =STEP+i;
            BAR=1+ parseInt((STEP-1)/BEATS,10);
            BEAT= (STEP-((BAR-1)*BEATS));
        }
        else 
        {
            if (LOOP===false)
                {
                    neckPlayToggle(false);
                    PLAY = false;
                    STEP=0;
                    WORKstep =ARRsteps[0];
                    document.getElementById('fbplay').innerHTML="";
                    statusMsg('LICK RESET: . . . BAR:' +BAR+ "--- BEAT: 0 " +LOOP,'red');
                    BAR=1;
                    BEAT=0;
                }
            else
                {
                    PLAY = true;
                    STEP=1;
                    WORKstep =ARRsteps[1];
                    document.getElementById('fbplay').innerHTML="";
                    BAR=1;
                    BEAT=1;    
                }
        
        }
        //if (STEP >ARRsteps.length) {STEP =0;}
        stepRender(STEP);
    }
    
function stepRender(STEP)//set WorkGlobals render the string
    {
        statusMsg ("");
        var i="Q,Q,Q,Q,Q".split(","); //icons
        var n="0,0,0,0,0".split(",");  //numbers
        var I=1;  //ICON NUMBER?
        var N=1;  //number NUMBER?
        var l=0;
        var k=0;  //number of charcters in a fret-string description
        var j=0;
        var wireTop;
        var wire;  //guitar string
        var pos ="";//(percent left on img)
        var arr="";//multi use variable
        var icon ="Fing.png";//default icon
        var thing ="";//thing will be the HTML string created for ICONS...clear icons and postions
        document.getElementById('fbplay').innerHTML = "";
        if (STEP===0)//only step 0=========================================================================
        {
            BEAT=0; BAR =1;
            statusMsg("Lick Loaded...");
        }
        else if (ARRsteps[STEP].length===0)//HANDLE NULL STRING==========================================
        {
            statusMsg('SILENT BEAT  STEP:'+STEP);
            thing ="";
        }
        else//split step into substeps and store the string========================
        {

            arrStrings=ARRsteps[STEP].split('|');//statusMsg("Rendering STEP> " + STEP + ":  "+ARRsteps[STEP]);//split into indivual strings
            j=0;
            while(j<arrStrings.length)//While it is less than or = to the number of strings effected==============================================
            {
                i[0] ="Q";i[1] ="Q";i[2] ="Q";i[3] ="Q";i[4] ="Q";
                n[0] =0;n[1] =-1;n[2] =-1;n[3] =-1;n[4] =-1;n[4] =-1;
                N=0,I=0;
                arr=arrStrings[j].split(';');//split into individual string descriptions 
    //take out extra spaces...used for visual spacing in the tab mode============================
                arrStrings[j]=arrStrings[j].replace('  ',' ');
                wire=arr[0];
                dig=arr[1].split(""); //alert (arr[1])
    //see if there is a pick notation============================================
                var pick = dig[dig.length-1];
                if (pick=="I"|pick=="T"|pick=="M"|pick=="R"|pick=="L"|pick=="U"|pick=="D")
                    {
                        i[4]="F"+pick+".png";
                        n[4]=24;
                        dig.splice(dig.length-1,1);//remove pick notation
                    }
                
                k=0;
                N=0,I=0;
                while (k <= dig.length+1 & dig.length>0)//handle each string if it has length
                {
                     if (isNaN(dig[k])===true | dig[k]===" ") //if (this chr is an Icon)
                    {
                        if (dig[k]=='h'){icon="FingHammerOn.png";}
                        else if (dig[k]=='b'){icon="FingB.png";}
                        else if (dig[k]=='p'){icon="FingPullOff.png";}
                        else if (dig[k]=='c'){icon="FingCurl.png";}
                        else if (dig[k]=='v'){icon="FingVibrato.png";}
                        else if (dig[k]=='u'){icon="FingSlideUp.png";}
                        else if (dig[k]=='m'){icon="FingMute.png";}
                        else if (dig[k]=='d'){icon="FingSlideDown.png";}
                        else if (dig[k]=='='){icon="FingHold.png";}
                        else if (dig[k]=='a'){icon="FingReplay.png";}
                        else if (dig[k]=='r'){icon="FingRelease.png";}
                        else if (dig[k]===undefined){icon="Fing.png";}
                        else {icon = "Fing.png";}
                        i[I]=icon; 
                        I=I+1;
                    }
                    else //determine if next id a fret number and if it is check for 2 digit fret number 
                    {
                        if (isNaN(dig[k+1])===false)
                        {
                            pos=parseInt(dig[k]+dig[k+1],10);
                            k=k+1;
                        }
                        else
                        {
                            pos=(dig[k]);
                        }
                        n[N]= pos;
                        N = N+1;
                    }
                    k=k+1;
                }    
                if (wire ==1) {wireTop =0;}//8
                else if (wire ==2) {wireTop =16;}//23
                else if (wire ==3) {wireTop =33;}//38
                else if (wire ==4) {wireTop =50;}//53
                else if (wire ==5) {wireTop =67;}//68
                else if (wire ==6) {wireTop =85;}//83
                //else if (wire ==7) {statusMsg("VV");}//83
                l=0;
                while (l<=4)
                {
                    if (i[l]=="FingB.png")
                    {
                       i[l]="FingB"+parseInt(n[l+1]-n[l],10)+".png";
                       i[l+1]="Q";
                    }
                    else if (i[l]=="FingHammerOn.png")
                    {
                       i[l]=i[l+1];
                       i[l+1]="FingHammerOn.png";
                       l=l+1;
                    }
                    l=l+1;
                }
                l=0;//reuse l
                while (l<=4 & wire<7)
                {
                    if(i[l]!="Q"){thing =thing + "\n<img src='../../Icons/" +i[l]+"' style='position:absolute; left:"+n[l]*4+"%; top:"+wireTop+"%; width:3.5%;height:15%'>";}
                    l=l+1;
                }
                if (wire==7)
                {
                    statusMsg(arrStrings[j]);
                }
                j=j+1;
            }
        }
        setTimeout(function(){document.getElementById('fbplay').innerHTML = thing;},100);
        metronome();
    } 