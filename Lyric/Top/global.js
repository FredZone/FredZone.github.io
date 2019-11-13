
var MSGlast= "Last message (incase you want to pull it back)"; //see statusMs()
var ARRunique=('dog,dog,cat,cat,cat,cat,cat,cat').split(',');//see unique
//1================================================================================================
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
//2================================================================================================    
function secToMin(sec)//XXX this sucks
    {   var m =parseInt((sec/60),10);
        var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
        if (s < 10) {s = ":0" + s;}else{s = ":" + s;}
        return m+s;
    }
//3================================================================================================    
function statusMsg(msg,bgcolor,marq)//* xxx could trim to 40 chr
    {
        MSGlast = msg;//save for other routines....
        if(document.getElementById("msg").style.zIndex >=4000 ){bgcolor = 'transparent';}
        else if (document.getElementById("msg").style.zIndex >= 1001){if (bgcolor === undefined) {bgcolor = 'black';}}
        else if (document.getElementById("msg").style.zIndex < 1001){if (bgcolor === undefined) {bgcolor = 'black';}}
        else if (bgcolor === undefined){bgcolor = 'black';}
        document.getElementById("msg").style.backgroundColor = bgcolor;
        if (bgcolor == "black"){document.getElementById("msg").style.color = 'white';}
        else if (bgcolor == "red"){document.getElementById("msg").style.color = 'yellow';}
        else if (bgcolor == "yellow"){document.getElementById("msg").style.color = 'red';}
        else if (bgcolor == "green"|bgcolor == "blue"){document.getElementById("msg").style.color = 'white';}
        else{document.getElementById("msg").style.color = 'black';}
        if (marq===true){msg= "<marquee><mark>"+msg+"</mark></marquee>";}
        document.getElementById("msg").innerHTML = msg;
        }
//4================================================================================================        
    function unique(/*str[]*/ arr)  //* finds unique elements in an array arr
    {
     var o={};  
        var  r=[];  
        var  n = arr.length;
        var i;
     for( i=0 ; i<n ; ++i )  
          o[arr[i]] = null;  
     for( i in o )  
          r.push(i);  
     return r;
    }   
//6================================================================================================
function loadFile(e)
        {   alert(1)
            readSingleFile(e); //gets the file//does not update the player until you go there --needs some time so I gave it 2 seconds;
            //setTimeout(function(){createARRlines(RAWtune);document.getElementById('myTune').innerHTML=TITLE;dis('tool','none');},2000);
        }


function fileReadSetup()               
    {
        document.getElementById('fileInput').addEventListener('change', fileRead, false);
    }
//7================================================================================================
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
//8===================================================================================
function vis(iconID,style)
    //toggles visibility by id or sets it to 'style' = visible or hidden
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
    }
//9===================================================================================
function dis(id,disp)
    //toggles display by id or sets it to 'style' block or none (requires this line in the html page)
    //requires variable: var NONE;
    //requires this line in the window.onload: NONE =document.getElementById('none').style.display;
    //requires this line in the html file: <a id="none" style=" display:none; visibility:hidden"></a>    
    {
        if (disp===undefined)
        {
            if (document.getElementById(id).style.display == NONE)
            {document.getElementById(id).style.display='block';}else{document.getElementById(id).style.display=NONE;}
        }
        else
        {
            if (disp=='none') {document.getElementById(id).style.display = NONE;}else{document.getElementById(id).style.display = 'block' ;}
        }
    }
//10===================================================================================
function rat()
    //WINDht, WINDwt RAT must all be definded in parent js
    //use the RAT on boot and resize elements for different ratios of length to width 
    {
        WINDht = window.innerHeight;
        WINDwt = window.innerWidth;
        RAT =parseFloat(WINDht/WINDwt);
    }
//11===================================================================================
function autoSize(id,fVh,bottom,ht,wt)//* id//* fontsize(vh)//* text Bottom//* ht//*  % done at  1/1 screen RAT
    {
        if(fVh!==undefined){fVh = parseFloat(fVh/RAT)+'vh';document.getElementById(id).style.fontSize=fVh ;}
        if (bottom!==undefined){bottom =parseInt(bottom/RAT,10)+'%';document.getElementById(id).style.bottom=bottom ;}
        if (ht!==undefined){ht =parseInt(ht/RAT,10)+'%';document.getElementById(id).style.height=ht;}
        if (wt!==undefined){wt =parseInt(wt*RAT,10)+'%';document.getElementById(id).style.width=wt;}
    }

//12===================================================================================
function home(){window.open("index.html");}
//13===================================================================================
function rTrim(str)
    {
        var bog = str;
        while (bog.substring(bog.length-1)==" "){bog = bog.substring(0,bog.length-1);}
        return bog;
    }