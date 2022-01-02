//RESERVED VARIABLES
var MSGlast="???"; //last message
var TEMPflag;
var TEMP="Initialized";
var LEV0;//\n
var LEV1;//(';)
var LEV2;//('#)
var LEV3;//('2)
var LEV4;//('|)
var LEV5;//('!)
var LEV6;//('\n)
var LEV7;
var ARRlevels="\n,;,#,@,|,!".split(',');
var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
var TESTstring="_sXXzAAgwpE#Wagon Wheel;5#19#Break, Full Speed#BL-013-01!A!4!Box 1...Played as Am with the root at string 1:Fret 5!Sandercoe Blues!https://www.youtube.com/watch?feature=player_embedded&v=LcOempNj6_gXt=170!A@1!8b10|2!8b10@1!8b9@1!5v@1!5=;21#44#Slowed#CB-A-002!C!8!Chuck Berry Style, Lick ends on the 4th note. Not the first!Johnny B Goode A!https://www.youtube.com/watch?v=WMnx5sL-BQE!B@@@@@@3!5@3!h6@2!5@1!u5|2!u5@1!5|2!5@1!5|2!5@1!u5|2!u5@1!5|2!5@1!5|2!5@1!u5|2!u5@1!5|2!5@1!5|2!5@2!8@2!7@2!5@3!5@3!h6@4!7@4!5@;5#9#Break, Part1;8#12#Break, Part2;5#12#Break, Parts1&2;12#15#Break, Part3;5#15#Break, Parts1>3;15#19#Break, Part4;4#19#Break, Parts 1>4#BL-013-01!A!4!Box 1...Played as Am with the root at string 1:Fret 5!Sandercoe Blues!https://www.youtube.com/watch?feature=player_embedded&v=LcOempNj6_gXt=170!A@1!8b10@1!8b9@1!5v@1!5=";


function getLEV2(str,b0,b1,b2,b3,b4,b5,b6,b7) {
var ans=str;
if (b0!==undefined) {ans=ans.split(ARRlevels[0])[b0];}
if (b1!==undefined) {ans=ans.split(ARRlevels[1])[b1];}
if (b2!==undefined) {ans=ans.split(ARRlevels[2])[b2];}
if (b3!==undefined) {ans=ans.split(ARRlevels[3])[b3];}
if (b4!==undefined) {ans=ans.split(ARRlevels[4])[b4];}
if (b5!==undefined) {ans=ans.split(ARRlevels[5])[b5];}
if (b6!==undefined) {ans=ans.split(ARRlevels[6])[b6];}
if (b7!==undefined) {ans=ans.split(ARRlevels[7])[b7];}
return ans;
}


function getLEV (str,b0,b1,b2,b3,b4,b5,b6,b7) {
var ans=str;
var n=0;
while (n<=7){
    if (eval("b"+n)!==undefined) {ans=ans.split(ARRlevels[n])[eval("b"+n)];}
    n=n+1;
    }
//if (b0!==undefined) {ans=ans.split(ARRlevels[n])[b0];}

return ans;
}




//LOAD ROUTINE========================================================================
window.onload = function()
    {
        statusMsg('Loading Javascript....');
        MSGlast="Cold Start";
        statusMsg('Forced pause to show Splash Screen');
        document.getElementById("msg").style.top='0%';
        document.getElementById("splash").style.display='none';
        statusMsg('USE THIS PROGRAMS DEVELOPMENT ZONE TO MAKE NEW SHIT','green');    
    };
//DEVELOPMENT ZONE===========================================================================================
function showCoords(event) {
    var element = document.getElementById('screen');
    var position = element.getBoundingClientRect();
    var x1 = position.left;
    var y1 = position.top;
    var w=position.width;
    var h=position.height;
    var Yco=(event.clientY-y1);
    var Xco=(event.clientX-x1);
    strWid=h/6;
    frtWid=w/25;
    var string=parseInt(Yco/strWid,10+1);
    var fret=parseInt(Xco/frtWid,10);
    var newLeft=100*frtWid*(fret +0.15)/w+"%";
    var newTop=100*strWid*(string)/h+"%";
    var icon="<img src='../../icons/blackSquare.png' style='position:absolute; height:15%; left:"+newLeft+";top:"+newTop+"';>";
    document.getElementById('tabs').innerHTML=icon,
    document.getElementById("demo").innerHTML ="S:"+string+ " F:"+fret;
    }
    
var rotated = false;

function invert(){
    var div = document.getElementById('screen'),
        deg = rotated ? 0 : 66;

    div.style.webkitTransform = 'rotate('+deg+'deg)'; 
    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
    div.style.msTransform     = 'rotate('+deg+'deg)'; 
    div.style.oTransform      = 'rotate('+deg+'deg)'; 
    div.style.transform       = 'rotate('+deg+'deg)'; 

    rotated = !rotated;
}
    
    
//FILE FUNCTIONS================================================================
function fileProcess(){alert(TEMP);}

function fileGetLocal(process){TEMPflag=process;document.getElementById('fileInput').click();}
    //loads the text file as TEMP then processes TEMP using the function process  i.e eval(process +'(TEMP)')
    //CLEAR TEMPflag ASAP after use...DANGEROUS
    //note 'nested' readSingleFile(e)
    document.getElementById('fileInput').addEventListener('change', readSingleFile, false);
    function readSingleFile(e)
    {statusMsg("Reading file...");
        TEMP=undefined;//clear old TEMP
        var file = e.target.files[0];
        if (!file)
            {
                TEMPflag=undefined;
                statusMsg("Failed to get Local File...",'red');
            }
        var reader = new FileReader();
        reader.onload = function(e)
            {
                TEMP = e.target.result;
                statusMsg("File Retrieved...");
                var str=TEMPflag+"(TEMP)";
                TEMPflag=undefined;
                eval(str);
            };
        reader.readAsText(file);
        }

function fileDownload(path)
    {
        statusMsg('Downloading: '+ path,'yellow');
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var content = request.responseText;
        if (content===undefined |content.search("404")>-1)
            {
                content=undefined;
                statusMsg("NO FILE",'red');
            }
            else {(statusMsg ('File Downloaded'));}
        return content;
    }

function fileSaveAsText(fileName,textToWrite,check)
    {  
        statusMsg("Saving Text File: "+fileName);
        //if (check===undefined) {sm="FILE Download";}else{sm="VERIFY the file date to see if it was saved properly";}
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.innerHTML = "My Hidden Link";
        window.URL = window.URL || window.webkitURL;// allowcode to work in webkit & Gecko based browsers// without the need for a if / else block.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;//when link is clicked call a function to remove it fromthe DOM in case user wants to save a second file.
        downloadLink.style.display = "block";
        document.body.appendChild(downloadLink);
        downloadLink.click();
       // statusMsg("Download Complete...")
        if (check===true)// check to see if file was saved!
            {
                if(confirm("Check to See if File was updated")===true)
                {fileSaveAsText(fileName,textToWrite,undefined);}
                statusMsg(fileName+ ": Proceedure Complete");
            }
            else
            {statusMsg("File Operation Complete...");}
    
    }
    function destroyClickedElement(event) // remove the link from the DOM
        {   
            document.body.removeChild(event.target);
        }


