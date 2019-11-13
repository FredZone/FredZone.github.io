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
var TITLE = "LICK";
var KEEPER ="A,B,C,D,E,F".split(",");//* Debugging tool accumulate statusMsgs
var WORKbeat="1";//default start
var WORKstring="1";//default start

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
var JAMfile="No Chord Progression Available \nNo Detailed Description\nDefault/120/Just listen and play along";

var EXnum=5;//the ex exercise you are using: ARRex[EXnum]
var ARRex
var ARRjam;
//END OF GLOBAL CONSTANTS======================================================================================================

function jamX(num)
    {
        alert(ARRjam[num]);
        document.getElementById('jamEx').innerHTML="Exercise "+num+"<br>"+ARRjam[num];    
    }

function help(hdr,txt)
    {
        alert(hdr,txt);
        vis('helpDiv','visible');
        document.getElementById('helpIntro').innerHTML=hdr;
        document.getElementById('helpBody').innerHTML=txt;
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


// BOOT ROUTINE============================================================================================================

window.onload = function()
    {   document.getElementById("splash").style.display='none';
        statusMsg('Loading javascript...','black');
        NONE =document.getElementById('none').style.display;//*  create object
        //document.getElementById('fileInput').addEventListener('change', fileRead, false);//fileReadSetup
        //loadServerJamFile(document.getElementById('jamFile').value);
        loadServerJamFiles('Sandercoe Blues');
    };

function loadServerJamFiles(title) //entry with title
    {  
        //alert(title);
        document.getElementById('Audio2').src = "../JAM/"+title+".mp3";///}//as soon as possible
        //document.getElementById("Audio2").load();
        //alert("../JAM/"+title+".mp3");
        var path ="../Jam/" + title + ".txt";  //* get the text file
        //alert("../Jam/" + title + ".txt");
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        JAMfile=content;
        //alert(content)
        var n = content.search("404"); //* look for a 404 error from server
        if (n >-1)
        {  
            statusMsg("NO Text FILE",'red');
            JAMfile="No Chord Progression Available \nNo Detailed Description\nDefault/Just listen and play along";
            ready();
        }
        else
        {
            
            ARRex=content.split("\n");
            document.getElementById('jamProg').innerHTML= ARRex[0];
            document.getElementById('jamDesc').innerHTML= ARRex[1];
            document.getElementById('keyB').innerHTML= "KEY: "+ARRex[2];
            document.getElementById('beatsB').innerHTML= "TEMPO: "+ARRex[3];
            //document.getElementById('jamProg').innerHTML= ARRex[3]; reserved
            FILEname =title;
            exerciseSelector(0);
        }
    }
function exerciseSelector(indx)   //creates the exer selector         
    {
        statusMsg ("Constructing exercise Selector...");
        var i=5;
        var t;
        var str="";
        while (i <ARRex.length)
        {
            t=(ARRex[i].split("/")); //gets title
            str=str+"<option value ="+i+">"+t[0]+"</option>\n";
            i=i+1;
        }
        str= "\n<optgroup>\n"+str;
        str=str +"</optgroup>\n";
        document.getElementById('ex').innerHTML=str;
        exerciseSelect(0);
    }

function exerciseSelect(indx)
    {
        statusMsg ("Selected exercise " +indx);
        EXnum=indx;
        alert (EXnum)
        if (document.getElementById('ex').selectedIndex !==indx){document.getElementById('ex').selectedIndex =indx;}
        if (EXnum===2) {vis('lastLick','hidden');}else{vis('lastLick','visible');}
        if (EXnum>=ARRex.length-1) {vis('nextLick','hidden');}else{vis('nextLick','visible');}
        exerciseAnalize();
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
    exLoad();
    }

function exLoad(indx)
    {
        statusMsg ("Loading Exercise");
        //PLAYctrl ='play';  //need reset routine
        //document.getElementById("bgs2").src="../../icons/transPlayGreen.png";
        
        //STEP=0;
        //WORKbeat =1;
        //document.getElementById('stepWidth').value=STEPwidth;
        //BEAT=0;
        //AR=1;
        ready();
    } 
function ready()
    {
        
        statusMsg ("Ready");
        document.getElementById("splash").style.display='none';
    }
//END OF BOOT===============================================================================================================

function jamPlay()
    {
        CTO();
        var i=(fileFromPath(document.getElementById('jPlay').src));
            alert(i)
            if (i== "transPlayGreen.png")
            {
                document.getElementById("Audio2").play();
                //licksCycle();
                document.getElementById('jPlay').src= "../../icons/resetSpinner.gif";
            }
            else if (i== "resetSpinner.gif")
            {
                document.getElementById("Audio2").load();
                document.getElementById('jPlay').src= "../../icons/transPlayGreen.png";
            }
    }
function exCycle()
    {
        CTO();
        EXtime=document.getElementById('exTime').value;
        TIMEOUTcycle=setTimeout(function()//* reusing TIMEOUTscroll
        {  statusMsg("Cycling Exercise...") ;
           if(INDEXlick>=ARRx.length-1){INDEXlick=-1;}
           exSelect(parseInt(INDEXlick,10)+1);
        },EXtime);//*  30 seconds on each lick, you can stop the sequence
    }

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
        alert(s);
    }

function infoHUH()
    {
    alert('s');
    var myWindow = window.open("", "MsgWindow", "width=500, height=600");
    myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
    }


//common functions=======================================================================================
