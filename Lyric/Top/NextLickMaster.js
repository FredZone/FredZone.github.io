//Global Variables============================================================================================
var ARRscaleIcons="";//used only in setting background XXXwhy global
//GLOABAL ARRAYS================================================================================================
// ARR dividers.....ARRLicks(\n)==ArrLick(@)==ARRsteps($)==ARRnotes(|)[0]
//var ARRlicksBU;
var ARRlicks="";//the licks (all of them)
    var LICKno =0;//the lick you are using: ARRlicks[LICKno]
var ARRsteps="";//the current lick each element = a STEP
    var STEP = 1;//which step of time Lick is divided into: ARRsteps[0]is the info for the lick, 1>lenght are beats
var WORKstep="";//immediate copy of ARRlick[STEP] when it is defined
var ARRnotes="";//ARRsteps[i].split('$')[0].split('|')  notes in the current step = each element is a single note ARRnotes=WORKstep.split('$')[0].split('/')
//var ARRpicks="";//ARRsteps[i].split('$')[0].split('|')  wires in the current step = each element is a single wire ARRpicks=WORKstep.split('$')[1].split('/')
//var ARRrh="x,?,?,?,?,?,?".split(',');
//Constants================================================================================================

var NOTES="";//note string for current step
//var PICKS="";//pick string for current step
var WIRE="";//guitar string
var MODE='play';
//var WORKpos="";
var BEAT;//the current beat in the bar
var BAR;//the current bar of the lick 
var BEATS=4;//beats per bar
var BARS=1;//total BARS
var SPEED = 1;
var PLAY =true; //if true continue to next note
var SCALE ="0-0-0-0-0-0-0-0-0-0-0-0";
var SCALEname = "CHROMATIC";//default scale name
var ROOT='A';//default ROOT for your scale
var REPEAT =false;//repeat lick when playing NOT USED YED
var FILE= "ZZZZZ";
var TIMEbit =500;//default milliseconds per beat
//GENERAL========================
var TIMEOUTscroll;
var MODE;//="scaleDiv";
var TITLE = "UnNamed LICK";
var KEEPER ="A,B,C,D,E,F".split(",");//* Debugging tool accumulate statusMsgs
var TEMP="";
var INDEXlick=0;
var EDITED =false;
//var NOTEdefault="FP-I";
//var PICKdefault="PD-P";
var FILEname =  "UnNamed";

window.onload = function()
    {
        statusMsg("Loading page...");
        ARRscaleIcons  =("root/Scale2b/scale2/Scale3b/Scale3/Scale4/scale5b/Scale5/Scale6b/Scale6/Scale7b/scale7").split("/");
        NONE =document.getElementById('none').style.display;//for dis()function
        document.getElementById('fb').innerHTML ="<img id = 'fretboard' style='position:absolute; top:10%; left:0%; height:80%; width:100%' alt ='Fingerboard' src ='../../icons/fretboardA.png'>";
        document.getElementById("mode").selectedIndex= 0;//set the mode selector
        document.getElementById("chord").selectedIndex= 0;//set the mode selector
        document.getElementById("scale").selectedIndex= 0;//set the mode selector
        neckSet(2);
        document.getElementById('neck').value=2;
        //defaultLicks();//create ARRlicks
        lickDefaults();
        lickSelector();
        lickLoad(0);
        document.getElementById("splash").style.display='none';
    };







function render(STEP)//set WorkGlobals render the string
    {
        var str =""
        //alert (ARRsteps[STEP])
        //alert("Rendering;" + STEP);
        var i=0;//note in str (0=first note)
        var wireTop;
        var wire;
        var pos ="";//(percent left on img)
        var arr="";//multi use variable
        var thing ="";//clear icons and postions
        //CLEAR EXISTING GLOBALS==============================================
        //NOTES ="";
        ARRnotes="";
        document.getElementById('fbplay').innerHTML = " ";//CLEAR THE LEFT HAND FINGERING...
        str=ARRsteps[STEP];
        //alert("XX" + str);
        if (str.length===0)//HANDLE NULL STRING==========================================
        {
            statusMsg('SILENT BEAT (SPACE HOLDER...)');
        }
        else if (STEP===0)
        {
            statusMsg("Set...ready");
        }
        else//initialize, split, and store the string========================
        {
            ARRnotes=str.split('|');//get each note
            //alert("XX" + str);
            i=0;
            while(i<=ARRnotes.length-1)//FORMAT the NOTES HTML===============================================
            {
                arr=ARRnotes[i].split(';');
                wire=arr[0];
                var fretInfo=arr[1];
                dig=fretInfo.split("");
                //alert(dig.length+" <> "+ fretInfo);
                if (wire!=7)
                {  
                    i=0;
                    while (i < dig.length)
                    {
                        //alert("Digit: "+ i)
                        if (isNaN(dig[i])===false)
                        {
                            if (isNaN(dig[i+1])===false)
                                {
                                                                       
                                    
                                    pos=parseInt(dig[i]+dig[i+1],10);
                                    //alert (pos);
                                    i=i+1;
                                }
                            else
                                {
                                    pos=(dig[i]);
                                }
                            //alert("fret "+ pos);
                            if (wire ==1) {wireTop =4;}//8
                            else if (wire ==2) {wireTop =19;}//23
                            else if (wire ==3) {wireTop =34;}//38
                            else if (wire ==4) {wireTop =49;}//53
                            else if (wire ==5) {wireTop =64;}//68
                            else if (wire ==6) {wireTop =79;}//83
                            pos = ((pos)*4);
                            //alert("position: "+pos);
                            thing =thing + "\n<img src='../../icons/transCircleWhite.png' style='position:absolute; left:"+pos+"%; top:"+wireTop+"%; width:4%;height:20%'>";
                        }
                        i=i+1;
                    }
                }
                
            }
        }
        document.getElementById('fbplay').innerHTML = thing;
    }




function lickDefaults()
    {
        statusMsg ("Setting Default Licks...");
        var str = "BL-013-01;A;4;Justin Sandercoe Lick;A Maj Blues.mp3;https://www.youtube.com/watch?v=LcOempNj6_g@1;8b10@1;8b9@1;5v@1;~";
        str=str+"\nBL-013-02;A;4;Justin Sandercoe Lick;A Maj Blues.mp3;https://www.youtube.com/watch?v=LcOempNj6_g@2;7b8@2;5v@2;~@2;~";
        str=str+"\nBL-013-03;A;4;Justin Sandercoe Lick;A Maj Blues.mp3;https://www.youtube.com/watch?v=LcOempNj6_g@@3;7b9@2;5@1;5@2;8b10@2;~@@";
        str=str+"\nBL-013-04;A;4;Justin Sandercoe Lick;A Maj Blues.mp3;https://www.youtube.com/watch?v=LcOempNj6_g@2;8b10@1;5@2;8p5@2;8b10";
        str=str+"\nBL-013-05;C;4;Justin Sandercoe Lick;A Maj Blues.mp3;https://www.youtube.com/watch?v=LcOempNj6_g@1;5@2;8p5@3;7|2;  5@3;5b6@4;7";
        str=str+"\nCI-001;G;4;????;;https://www.youtube.com/watch?v=ZYVRvpoPMSw@4;   12@3;12|2;12@3;14|2;13@2;13b14|3;14b15@2;13b14|3;14b15@3;~~~~|2;~~~~@3;~~~~|2;~~~~@2;13b14|3;14b15@2;13b14|3;14b15@2;r12v|3;r12v@";
        str=str+"\nSTEEL-001;A;4;inwork;;https://www.youtube.com/watch?v=hmpeb6SQ0OE@2;8|3;7b9|1;8@1;8|2;8|3;7b9@@1;8|2;8|3;7b9@1;8|2;8|3;9r7@3;5|4;  7@3;5 7@";
        str=str+"\nBlank;C;4@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
        ARRlicks=str.split("\n");
        }


function lickSelector()            
    {   statusMsg ("Constructing Lick Selector...");
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
        statusMsg ("Constructed Lick Selector...");
    }


function loadLick(indx)
    {
        statusMsg ("Loading Lick...");
        ARRsteps=ARRlicks[indx].split("@");
        info = ARRsteps[0].split('/');
        TITLE = info[0];ROOT=info[1];BEATS=info[2];
        document.getElementById("beats").value=BEATS;
        document.getElementById('key').value = ROOT;
        document.getElementById('stepNo').value=STEP;
        BAR=1;
        BEAT=0;
        STEP=0;
        WORKstep=ARRsteps[0];
        //render(WORKstep);
        document.getElementById('step').value=WORKstep;
        PLAY =true;
        INDEXlick=indx;
        loadMetro();
        document.getElementById('Audio1').src = "../Licks/Tracks/"+TITLE+".mp3";//as soon as possible
    }

function lickLoad(indx)
    {
        statusMsg ("Loading Lick " +indx);
        INDEXlick=indx;
        ARRsteps=ARRlicks[indx].split("@");
        info = ARRsteps[0].split(';');
        TITLE = info[0];ROOT=info[1];BEATS=info[2];
        document.getElementById('key').value=ROOT;
        document.getElementById('beats').value=BEATS;
        document.getElementById('stepNo').value=STEP;
        BAR=1;
        BEAT=0;
        STEP=0;
        WORKstep=ARRsteps[0];
        statusMsg (TITLE +" "+ ROOT +"  "+ BEATS);
        WORKbeat =1;
        //lickRender();
        statusMsg("Lick Loaded");
        loadMetro();
        document.getElementById('Audio1').src = "../Licks/Tracks/"+TITLE+".mp3";//as soon as possible
    }    

function loadMetro()
    {   statusMsg ("Setting Metronome...",1);
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
        metronome();
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
        document.getElementById("bar"+BAR).style.backgroundColor='brown';
    
    statusMsg('Metronome Loaded');
    }


function advanceStep(i)
    {
        statusMsg("Advancing "+i);
        if ((STEP+i)>0 & (STEP+i)<ARRsteps.length & i<10000)//only advance if you are in the 0 to end zone
        {
            STEP =STEP+i;
            BAR=1+ parseInt((STEP-1)/BEATS,10);
            BEAT= (STEP-((BAR-1)*BEATS));
            statusMsg("BAR: " + BAR +"--- BEAT: "+BEAT,'green');
            }
        else 
        {
            
            alert('RESET');
            STEP=0;
            WORKstep =ARRsteps[0];
            var j=1;
            clearTimeout(TIMEOUTscroll);
            PLAY = false;
            document.getElementById('fbplay').innerHTML="";
            while (j<6)
            {
                backImage("s"+j,"TR.png");
                document.getElementById("s"+j).innerHTML="-";
                j= j+1;    
            }
            statusMsg('LICK RESET: . . . BAR:' +BAR+ "--- BEAT: 0",'red');
            BAR=1;
            BEAT=0;
        }
    if (STEP >ARRsteps.length) {STEP =0;}
    metronome();
    render(STEP);
    }

function editWarning(){if (EDITED === true){alert ("WARNING!!\nYou Have NOT saved your changes...");} }

function noteDefaultSet()
    {
        NOTEdefault= document.getElementById('lhIcon').value +"-"+  document.getElementById('lhText').value ;
    }
function neckSet(pct)
    {
        document.getElementById('rh').style.right=(0.94*pct)+"%";
        document.getElementById('rhblock').style.width=(0.94*pct)+"%";
    }

function XXXnewNoteSettings(pair)
{
    if (pair===undefined) {pair=NOTEdefault;}
    var icon = pair.split('-')[0];
    var txt=pair.split('-')[1];
    backImage('noteNew',icon);
    document.getElementById('lhIcon').value =pair.split('-')[0];
    document.getElementById('noteNew').innerHTML=(txt);
    document.getElementById('lhText').value =pair.split('-')[1];
}

function XXXnoteDefault(pair)
    {
        if (pair===undefined) {pair=NOTEdefault;}
        var icon = pair.split('-')[0];
        var txt=pair.split('-')[1];
        backImage('noteNew',icon);
        document.getElementById('lhIcon').value =pair.split('-')[0];
        document.getElementById('noteNew').innerHTML=(txt);
        document.getElementById('lhText').value =pair.split('-')[1];
    }
    
function XXXpickDefaultSet()
    {
        PICKdefault= document.getElementById('rhIcon').value +"-"+  document.getElementById('rhText').value ;
    }

function XXXpickDefault()
    {
        var icon = PICKdefault.split('-')[0];
        var txt=PICKdefault.split('-')[1];
        backImage('pickNew',icon);
        document.getElementById('pickNew').innerHTML=(txt);
    }

function fileReadSetup()               
    {
        document.getElementById('fileinput').addEventListener('change', fileRead, false);
    }

function fileRead(e)
        // The next or similar 2 line must be in the HTML file....
        //<button onclick=onclick="document.getElementById('fileinput').click()">
        //<input onclick = "fileReadSetup()" type="file" id = "fileinput" style = "position:fixed; visibility:hidden; left:0%; height:0%; width:0%; top:0%"> 
        {
        var file = e.target.files[0];
        if (!file){ alert("No Valid File...");return;}//incase no file
        var reader = new FileReader();
        reader.onload = function(e)
        {
           
            var contents = e.target.result;
            //Next steps for specific program....
            FILEname = (file.name.substring(0,(file.name.length)-4));
            //while (contents.indexOf("\r") >= 0)
            //{contents = contents.replace("\r", "");}

            while (contents.indexOf("\r") >= 0)//* get rid of linefeeds
            contents = contents.replace("\r", "");
            ARRlicks ="";
            ARRlicks = contents.split("\n");//* make an array of lines
            lickSelector();
            statusMsg ("FILE '"+ FILEname +"' LOADED");
        };
    reader.readAsText(file);
    }

function XXXlickRename()
    {
        var i=INDEXlick;
        var newt;
        var a = ARRsteps[0].split('/');
        newt = prompt("New Name for '"+ a[0] +"'",a[0]);
        a[0]=newt;
        ARRsteps[0]=a.join('/');
        WORKstep =ARRsteps[0];
        ARRlicks[INDEXlick]=ARRsteps.join('@');
        lickSelector();
        document.getElementById("lick").selectedIndex= i;//set the mode selector
        statusMsg("Lick now named '" + newt +"'");
    }

function XXXlickDelete()
    {
        var x =TITLE;
        ARRlicks.splice(INDEXlick,1);
        lickSelector();
        ARRsteps="";
        loadLick(0);
        statusMsg (x + " DELETED!!");
    }

function XXXlickDup()
    {
        var x = "COPY of " + TITLE;
        ARRlicks.splice(0,0,"COPY of " + ARRlicks[INDEXlick]);
        lickSelector();
        ARRsteps="";
        loadLick(0);
        statusMsg (x + " ADDED!!");
    }
function XXXbogus()
    {
        var newt = prompt("Name for the new lick?","NEW LICK");
        ARRlicks.splice(0,0,newt +"/C/4@@@");
        lickSelector();
        ARRsteps="";
        loadLick(0);
        statusMsg ("New lick '" + newt+ "' added!!");
    }    
    
// ====Boot Routine=============================================================================

window.onclose =function(){alert('shit');};


//UTILITIES=====================================================================================

function XXXsf(event) //returns string and fret
    {  
        var cX = event.clientX;
        var cY = event.clientY;
        var f=(parseInt(cX/document.getElementById('screen').clientWidth*25,10));
        var w=(parseInt(cY/document.getElementById('screen').clientHeight*6,10)-1);
        newNote(w+"-"+f);
    }

function XXXsaveLickFile()
    {
    var str=ARRlicks.join('\n');
    saveTextAsFile(FILEname+".txt",str);
    }

function updateRoot(r)
    {
    ROOT = r;
    if (MODE == 'edit')
        {
            a=TITLE +('/') + ROOT +('/') +BEATS;
            if(STEP===0)
            {
                WORKstep=a;                   
                document.getElementById('step').value = a;
            }
            ARRsteps[0]=TITLE +('/') + ROOT +('/') +BEATS;
        }    
    }
function updateTitle(t)
    {
    if (MODE == 'edit')
        {
            TITLE = t;
            a=TITLE +('/') + ROOT +('/') +BEATS;
            if(STEP===0)
            {
                WORKstep=a;                   
                document.getElementById('step').value = a;
            }
            ARRsteps[0]=TITLE +('/') + ROOT +('/') +BEATS;
        }    
    }

function updateBeats(b)
    {
        var a ="";
        BEATS=b;
        if (MODE == 'edit')
        {
            a=TITLE +('/') + ROOT +('/') +BEATS;
            if(STEP===0)
            {
                WORKstep=a;                   
                document.getElementById('step').value = a;
            }
            ARRsteps[0]=TITLE +('/') + ROOT +('/') +BEATS;
        }
        loadMetro();
    }

function saveTextAsFile(fileName,textToWrite)
    {  
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
    }

function destroyClickedElement(event){document.body.removeChild(event.target);}// remove the link from the DOM

//EDIT functions=================================================================================

//CONFIGURATION STUFF
function loadLickFile()
    {
        alert('LoadLickFile()');
        var file = document.getElementById('lickFile').value;
        //prompt("Please type the exact file name", FILE);
        //if (file === null){file="Default";}
        statusMsg ("Getting " + file + " from Server..." );
        var path ="../Licks/" + file + ".txt";  //* get the text file
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        var n = content.search("404"); //* look for a 404 error from server
        if (n >-1)
            {
                alert("No file named "+ file);
            }
        else
        {
            ARRlicks ="";
            while (content.indexOf("\r") >= 0)//* get rid of linefeeds
            content = content.replace("\r", "");
            ARRlicks = content.split("\n");//* make an array of lines
            lickSelector();
        }    
    }

//EDIT CONTROLS AND FUNCTIONS====================================================================================================
function stepInsert(step,str)
    {   if (str===undefined){str="$";}
        if (step===undefined) {step=STEP;}
        ARRsteps.splice(STEP+1, 0, str);
        loadMetro();
        advanceStep(1);
        statusMsg("STEP ADDED!! . . BAR: " + BAR +"--- BEAT: "+BEAT,'yellow');
    }

function stepDelete(step)
    {
        if (step===undefined) {step=STEP;}
        if (STEP===0)
        {
            statusMsg ("You cannot DELETE the HEADER!!!");
        }
        else
        {
        ARRsteps.splice(STEP, 1);
        loadMetro();
        advanceStep(0);
        statusMsg("Previous Step Deleted!!  . . BAR: " + BAR +"--- BEAT: "+BEAT,'yellow');
        }
    }

function stepDuplicate(step)
    {
        str =WORKstep;
        ARRsteps.splice(STEP+1, 0, str);
        loadMetro();
        advanceStep(1);
        statusMsg("Previous Step Duplicated!! . . BAR: " + BAR +"--- BEAT: "+BEAT,'yellow');
    }

function stepClear()
    {
        if (STEP===0)
        {
            statusMsg ("You cannot Clear the HEADER!!!");
        }
        else
        {
            WORKstep="$";
            ARRsteps[STEP]="$";
            advanceStep(0);
            loadMetro();
            statusMsg("Step Cleared!! . . BAR: " + BAR +"--- BEAT: "+BEAT,'yellow');
        }
    }

function updateHeader()
    {
        if (MODE=='edit')
        {
         alert('editing header');   
        }
    }

function newPick(w)
    {
    if (STEP!==0)//do nothing if you are on step0
        {   
            WIRE=w;
            var tp=((w-1)*13.7)+6;
            document.getElementById('pickEditor').style.top= (tp-8)+"%";
            vis('pickEditor','visible');
            document.getElementById('pickNew').style.top= (5 +(15*(w-1)))+"%";
            pickDefault();
            vis('pickNew','visible');
        }
    }
    
function newNote(wf)
    {
    if (STEP!==0)//do nothing if you are on step0
        {   
            var a ="";
            var i=0;
            var pair =NOTEdefault;
            while (i<ARRnotes.length)//FIND EXISTING NOTE
                {
                    a= ARRnotes[i].split('/');
                    if(a[0]==wf)
                        {
                            pair =a[1]+"-"+a[2];
                        }
                    i=i+1;
                }
            var pos = wf.split("-");
            var w =pos[0];
            var f=parseInt(parseInt(pos[1],10)+1,10);
            var rt=(25-f)*4;
            var brt = rt;
            var tp=((w-1)*13.7)+6;
            if (rt<40) {brt = rt+4;}else{brt=rt-20;}
            document.getElementById('noteEditor').style.right =(brt)+"%";
            document.getElementById('noteEditor').style.top= (tp-8)+"%";
            vis('noteEditor','visible');
            document.getElementById('noteNew').style.right= rt+"%";
            document.getElementById('noteNew').style.top= tp+"%";
            newNoteSettings(pair);
            //noteDefault(pair);
            vis('noteNew','visible');
            WORKpos=wf;
        }
    }

/*function showNoteXXXX()
    {
        arr = str.split('/');
        document.getElementById('nextFIcon').src ="../../Icons/fingering/"+arr[1]+".png";
        document.getElementById('lhIcon').value =arr[1];
        document.getElementById('nextFText').innerHTML=arr[2];
        document.getElementById('lhText').value =arr[2];
        document.getElementById('nextSIcon').src ="../../Icons/fingering/"+arr[3]+".png";
        document.getElementById('rhIcon').value =arr[3];
        document.getElementById('nextSText').innerHTML=arr[4];
        document.getElementById('rhFing').value =arr[4];   
    }*/

function  newFIcon(id){ var src = "../../icons/fingering/"+id+".png"; document.getElementById('nextFIcon').src=src;}
    
function  newSIcon(id){var src = "../../icons/fingering/"+id+".png"; document.getElementById('nextSIcon').src=src;}

function XXXclearNote(wf)
    {
        i=0;
        while (i <ARRnotes.length)
        {
            if (ARRnotes[i].split('/')[0]==wf)
            {
                ARRnotes.splice(i,1);
                
            }
        i=i+1;
        }    
        NOTES = ARRnotes.join('|');
        vis('noteEditor','hidden');
        vis('noteNew','hidden');
        render(NOTES+"$"+PICKS);
    }
    
    function XXXclearPick(w)
    {
        i=0;
        while (i <ARRpicks.length)
        {
            if (ARRpicks[i].split('/')[0]==w)
            {
                ARRpicks.splice(i,1);
            }
        i=i+1;
        }    
        PICKS = ARRpicks.join('|');
        vis('pickEditor','hidden');
        vis('pickNew','hidden');
        render(NOTES+"$"+PICKS);
    }

function XXXsaveNote()
    {   
        var nn = WORKpos+"/"+document.getElementById('lhIcon').value+"/"+document.getElementById('lhText').value;
        var i=0;
        var a =NOTES.split('|');
        while (i<a.length)
        {
            if(a[i].split('/')[0]==WORKpos)
            {
             a.splice(i,1);
             NOTES = a.join('|');
            }
         i = i+1;
        }
        if (NOTES.length>1){NOTES=NOTES+"|"+ nn;}else {NOTES =nn;}
        vis('noteEditor','hidden');
        vis('noteNew','hidden');
        render (NOTES +"$"+PICKS);
    }

function XXXsavePick()
    {
        var i=0;
        var np=document.getElementById('rhIcon').value+"/"+document.getElementById('rhText').value;
        var picks="";
        var arr=PICKS.split('|');
        while(i <arr.length)
        {
            if (arr[i].split('/')[0]!=WIRE){picks = picks +arr[i] +"|";}
            i=i+1;
        }
        picks = picks + WIRE+"/"+np;
        alert("NEW PICKS: "+ picks);
        vis('pickEditor','hidden');
        vis('pickNew','hidden');
        render (NOTES +"$"+picks);
    }
//PLAYER FUNCTIONS==========================================================================================

function playLick()//lick is already loaded as ARRsteps (Lick split by @ into (inc:noteString) which is acted uupon here)
    {   //document.getElementById("runIcon").="../../icons/resetSpinner.gif";
        if (PLAY ===true)
        {
            TIMEOUTscroll = setTimeout(function()
            {
                advanceStep(+1);
                playLick();
            },TIMEbit*SPEED);
        }
    }
    
function play_beep()
    {   //var snd = new Audio("http://www.externalharddrive.com/waves/computer/hello.wav");
        var snd = new Audio("../Click/click.wav");
        snd.play();
        return false;
    }


//Configuration functions=======================================================================

function mode(m)
    {
        MODE=m;
        if (m =='edit')
        {
            statusMsg ("Edit Mode");
            document.body.style.background = 'red';
            document.getElementById('fbgrid').style.zIndex=400;
            vis('create','visible');
        }   
        else if (m=='play') 
        {
            statusMsg ("Play Mode");
            document.body.style.background = 'lightgrey';
            document.getElementById('fbgrid').style.zIndex=100;
            vis('create','hidden');
        }       
    }


function setSpeed(delta)
{   
    if ((SPEED*delta)<=4 & (SPEED*delta)>=0.25){SPEED = SPEED*delta;}
    statusMsg("SPEED: "+ (1/SPEED)*100+"%");
}

function dispMode(scale,mode)
    {
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

function makeScale(str) //visMode can be inVisEdit or visEdit or vis
    {   
        statusMsg(SCALE);
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
            if (wire==1) {offSet =offSetRoot ;wireTop=9;}
            if (wire ==2) {offSet=(offSetRoot+7);wireTop=23;}
            else if (wire ==3) {offSet=(offSetRoot+15);wireTop=38;}
            else if (wire ==4) {offSet=(offSetRoot+10);wireTop=52;}
            else if (wire ==5) {offSet=(offSetRoot+5);wireTop=66;}
            else if (wire ==6) {offSet =offSetRoot;wireTop=80;} 
            fret =0;
            while (offSet>11) {offSet=offSet-12;}
            note =offSet;
            while (fret<25)
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
        document.getElementById('fb').innerHTML ="<img id = 'fretboard' style='position:absolute; top:10%; left:0%; height:80%; width:100%' alt ='Fingerboard' src ='../../icons/fretboardA.png'>";
        document.getElementById('fbshow').innerHTML =thing;
        statusMsg(SCALE);
    }

//semi common functions=======================================================================================

function backImage(id,icon)
    {document.getElementById(id).style.backgroundImage="url('../../icons/fingering/"+icon+".png')";}

function statusMsg(msg,bgcolor)//* xxx could trim to 40 chr
    {   var i=5;
    
        var alrt=false;
        var str="DEBUG (last 6 steps; oldest on top)\n\n";
        
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

//common functions=======================================================================================
function vis(iconID,style)
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
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

function home(){window.open("index.html");}
