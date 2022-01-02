//0   1   2   3   4   5   6   7
//tno,tit,lnk,key,chd,clr,bpm,spt

var SONGsite ="stop.html";
MODE='stop';
var KEY;
var TRACKname;
var YTID;
var LINK;
var PROG;
var HDR;
var ARRtracks;
var ARRsortA;
var ARRsortB;
var SCREEN=1;
var SCREENmax=1;
var MSGlast;
var TRACKno;
var TIMERstart=0;
var COLORS="Blues:lightblue,Rock:yellow,Country:tan,Boogie:lightgreen,Doo Wop:magenta,Psychedelic:coral,Misc:green,Folk:gold,Jazz:pink";

window.onload = function()
    {
        //document.getElementById('msg').style.top="2%";
        statusMsg("Loading Java Script");
        createTrackArray();
        sortArr(ARRtracks,4);
        document.getElementById("sort").selectedIndex = 0;
        screenSweep(1);
        var str=ARRtracks[0];
        TRACKno=0;
        var a=str.split(",");
        iTrack(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
        document.getElementById('msg').style.top="2%";
        document.getElementById("splash").style.display='none';
        
    };    

function createTrackArray()
    {   //* creates an option box from the file SetList.txt in the top directory
        statusMsg("Compiling Track List...");
        var path ="UtubeList.txt";
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        statusMsg("Compiling ARRAY...");
        ARRtracks =content.split("\n");
        statusMsg("ARRAY compiled");
        SCREENmax= ((ARRtracks.length-1)/24);
        if (SCREENmax>parseInt(SCREENmax,10)) {SCREENmax=parseInt(SCREENmax,10)+1;}
    }     

function screenSweep(i)
{
    statusMsg("Formating Screen...PAGE: "+i);
    var but=parseInt(1,10);
    var props;
    var k="?"; var t="?";
    var n=parseInt((i-1),10);
    n=parseInt(24*n,10);
    n=parseInt(n,10)+1;
    stpr =parseInt(n,10)+24;
    statusMsg("Track:"+ n +"  Current Button:b"+ but +"  last Track:"+ stpr);
    while (n<stpr)
    {   
        document.getElementById('b'+but).style.borderColor='white';
        statusMsg("Track:"+ n);// +"  Current Button:b"+ but +"  last Track:"+ stpr +"  Track Title:" +props[0]);
        if (ARRtracks[n]===undefined)
        {
            document.getElementById('b'+but).innerHTML="--";
            document.getElementById('b'+but).style.backgroundColor='lightgrey';
        }
        else
        {
        props=ARRtracks[n].split(',');
            //0   1   2   3   4   5   6 
       //tno,tit,lnk,key,chd,gen,bpm,spt
            k='?';
            t='?';
            g="?";
            if (props[5].length>=1){t=(props[5]);}
            if (props[2].length>=1){k=(props[2]);}
            if (props[4].length>=1){g=(props[4]);}
            document.getElementById('b'+but).innerHTML=g+": "+props[0]+"<br>"+k +" @ " + t ;
            document.getElementById('b'+but).style.backgroundColor=hash(COLORS,props[4],'white');
        }
    but=parseInt(but+1,10);
    n=parseInt(n+1,10);
    statusMsg ("track:"+n +  " Button:b"+but);
    }
document.getElementById('pgno').innerHTML="PAGE: "+SCREEN;
statusMsg ("Select a track....");
}

function screenDelta(d)
    {
    var strt=1;
    if (SCREEN+d<=SCREENmax)
        {
            SCREEN=SCREEN+d;
            if (parseInt(SCREEN+d,10)< 1 ){SCREEN=1;strt=1;}
            else {strt=(1+((SCREEN-1)*24));}
            //document.getElementById('pgno').innerHTML="PAGE: "+SCREEN;
            screenSweep(SCREEN);
        }
    }

function list()
    {
    var i=1;
    var id='b13';
    var pl="TNkUUDmhGPQ,vc7NQ3KttLI,BBW6KkmDF74,p_db4OXYJVw,kT42dIifKZM,IVf7LnIv1Gg,BJ-JFsP0BEk";
    SONGsite ="https://www.youtube.com/embed/XXXX?autoplay=1&loop=1&playlist="+pl; 
    document.getElementById('player').src= "https://www.youtube.com/embed/XXXX?autoplay=1&loop=1&playlist="+pl; 
        //document.getElementById('hdr').innerHTML="<pre>TRACKS PENDING APPROVAL...</pre>";
        document.getElementById('prog').innerHTML="<pre>KEY, PROGRESSION etc not shown here....</pre>";
        document.getElementById('mode').src='../../Icons/transPlayGreen.png';
        document.getElementById('mode').visibility='visible';
        MODE='stop';
        while (i<25)
        {
            var idX= 'b'+i;
            if (idX==id)
                {
                    document.getElementById(idX).style.borderColor='red';
                    document.getElementById(idX).style.color='white';
                    document.getElementById(idX).style.backgroundColor='grey';
                }
                else
                {
                    document.getElementById(idX).style.borderColor='white';
                    document.getElementById(idX).style.backgroundColor='lightgrey';
                    document.getElementById(idX).style.color='black';
                }
            i=i+1;
        }    
    }

function iTrack(hdr,ytid,key,info,gnr,id,sec)
    {
        YTID=ytid;
        HDR=hdr;
        var pathFull=ytid;
        document.getElementById('player').src='stop.html';
        document.getElementById('mode').src='../../Icons/transPlayGreen.png';  
        document.getElementById('mode').style.visibility='visible';
        //document.getElementById('buttonChord').src='../../icons/Key'+key+'.png'; 
        if(sec!==undefined)
            {
            pathFull=ytid+"?start="+sec;
            SONGsite= "https://www.youtube.com/embed/"+pathFull+"&autoplay=1&loop=1&playlist="+ytid;
            }
        else
            {
            SONGsite= "https://www.youtube.com/embed/"+pathFull+"?autoplay=1&loop=1&playlist="+ytid;
            
            }
        if (hdr.length<=2) {hdr="BLANK TRACK";key=TRACKno;info="No Info";}
        
        
        statusMsg(hdr +": "+key + " {"+gnr+"}") ; //alert(1);
        document.getElementById('chords').innerHTML="<pre>"+info+"</pre>";
    }


function modeChange()
    {
    if (SONGsite==="")
        {
            statusMsg ("Select a Valid Track...");
        }
    else if (MODE=='play')
        {
        MODE='stop';
        document.getElementById('mode').src="../../Icons/transPlayGreen.png";
        document.getElementById('player').src='stop.html';
        document.getElementById ('player').style.visibility='hidden';
        }
    else if (MODE=='stop')
        {
        MODE='play';
        document.getElementById('mode').src="../../Icons/transPauseRed.png";
        document.getElementById('player').src=SONGsite;
        document.getElementById ('player').style.visibility='visible';
        }
    }

function home(){window.open("index.html");}

function vis(iconID,style)
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
    }


function loadTrack(i)//i = button number  //b is the track number
    {   statusMsg("Loading Track: "+i);
        var a;
        var x=1;
        i=parseInt(i,10);
        var b=9999;
        while (x<25)
            {
            document.getElementById('b'+x).style.borderColor='white';
            x=x+1;
            }
        document.getElementById('b'+i).style.borderColor='red';
        b=parseInt(((SCREEN-1)*24)+i,10);
        TRACKno=b;
        //alert(b)
        var str=ARRtracks[b];
        //alert (str)
        if (str===undefined)
        {
        statusMsg('No Track','yellow');
        SONGsite="";
            //iTrack(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
           //loadEdit("?","?","?","?","?","?","?","?");
        document.getElementById('tit').value="?";
        document.getElementById('lnk').value="?";
        document.getElementById('key').value="?";
        document.getElementById('chd').value="?";
        document.getElementById('bpm').value="?";
        document.getElementById('spt').value="?";
        document.getElementById('gen').value="Misc";
        }
        else
        {
            a = str.split(',');
            statusMsg(a[1]);
            //  0   1    2    3    4    5     6    7
                  //tit, lnk, key, chd, clr,  bpm, spt
            iTrack(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
            //modeChange();
        }
    }
function loadEdit()
    {  
        document.getElementById('lineBuilder').style.visibility='visible';
        document.getElementById('tno').value=TRACKno;
        var a=ARRtracks[TRACKno].split(',');
        //0   1   2   3   4   5   6  
        //tit,lnk,key,chd,gnr,bpm,spt

        document.getElementById('tit').value=a[0];
        document.getElementById('lnk').value=a[1];
        document.getElementById('key').value=a[2];
        document.getElementById('chd').value=a[3];
        document.getElementById('bpm').value=a[5];
        document.getElementById('spt').value=a[6];
        document.getElementById('gen').value=a[4];
    }

function BPMtool()
    {    
        if (TIMERstart < 0) {TIMERstart = 0;}
        if (TIMERstart === 0)
        {
            TIMERstart = new Date().getTime();
            document.getElementById("butBpmTool").innerHTML= "Running..."; 
        }
        else
        {
            var finishTime = new Date().getTime();
            var beats = 4;
            var bpm = parseInt(beats * 4 * 60000/(finishTime-TIMERstart),10);   
            document.getElementById("butBpmTool").innerHTML= "BPM: " + bpm; 
            TIMERstart =0;
        }
    }

function statusMsg(msg,bgcolor,marq)//* xxx could trim to 40 chr
    { //grey-normal;red-attention Required ;yellow-normal pause or inwork
        if(msg===null){msg=MSGlast;}
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
    
function saveTextAsFile(fileName,textToWrite)
    {   // grab the content of the form field and place it into a text area
                
            //var textToWrite = document.getElementById(textAreaID).value;
            var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
            //var fileNameToSaveAs = fileName;
            var downloadLink = document.createElement("a");
            //downloadLink.download = fileNameToSaveAs;
            downloadLink.download = fileName;
            downloadLink.innerHTML = "My Hidden Link";
            window.URL = window.URL || window.webkitURL;// allowcode to work in webkit & Gecko based browsers// without the need for a if / else block.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;// when link is clicked call a function to remove it from// the DOM in case user wants to save a second file.
            downloadLink.style.display = "block";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.style.backgroundColor = "lightgrey"; 
            //EDITbaseLine = document.getElementById("rawTune").value;
        //}
    }
function destroyClickedElement(event){document.body.removeChild(event.target);}// remove the link from the DOM



function  updateTrack()
    {
        var tr=document.getElementById('tit').value +","+
        document.getElementById('lnk').value +","+
        document.getElementById('key').value +","+
        document.getElementById('chd').value +","+
        document.getElementById('gen').value +","+
        document.getElementById('bpm').value +","+
        document.getElementById('spt').value;
        ARRtracks[TRACKno]=tr;
        document.body.style.backgroundColor = "pink";
        screenSweep(SCREEN);
        statusMsg("REMEMBER TO SAVE YOUR CHANGES TO THE PERMANENT FILE!","red");
    }
    
    function sortArr(arr,cell)
    {
        //alert("ARRtracks: "+ arr.length);
        var rows=arr.length-1;
        var lineZero=arr[0];
        var sNo;
        i=1;
        var str=arr[i].split(',')[cell]+","+i;
        i=i+1;
        while(i <=rows)
        {   str=str+"\n"+(arr[i].split(',')[cell] +","+i);
            i=i+1;
        }
        //alert(str);//==============================================
        ARRsortA=str.split('\n');
        //alert("ARRsortA: "+ ARRsortA.length);
        ARRsortB=ARRsortA.sort(); 
        //alert("ARRsortB: "+ ARRsortB.length);
        //alert(ARRsortB.join("\n"));
        
        str=lineZero;// alert(str);alert(ARRsortB.length);
        i=0;
        while(i <ARRsortB.length)
        {
            sNo = ARRsortB[i].split(',')[1];   
            str=str+'\n'+arr[sNo];
            i=i+1;
        }
        //alert(str);
        ARRtracks=str.split('\n');
        //alert("ARRtracks: "+ ARRtracks.length);
        screenSweep(1);
        statusMsg('Select a Track');
    }
    
    function hash(str,key,defaultVal)//Gets hash values from string a:b,c:d,e:f,......xxx untested
   {    var arrHash = (str.split(",")); //split the array into hash pairs(aaa:bbbb)
        var i=0;
        while (i < arrHash.length)//find the first hash pair where aaa matches the key
        {
            var ele=(arrHash[i].split(":"));//element is a string of 

            if(ele[0] == key)
            {
                return  ele[1];
            } 
            i++;
        }
        return defaultVal;
    }
    
    function deleteTrack(tn)
    {
        var msg=HDR+" deleted!";
        if (tn===0)
        {
            msg=("You cant Delete the Home Track...Select a different track...");
        }
        else
        {
           ARRtracks.splice(tn,1);    
        }
        document.getElementById('lineBuilder').style.visibility ='hidden';
        screenSweep(SCREEN);
        statusMsg(msg);
    }