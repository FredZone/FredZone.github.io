

//FILE ROUTINES=====================================================================================================================
function fileSaveAsText(fileName,textToWrite)
    {  
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.innerHTML = "My Hidden Link";
        window.URL = window.URL || window.webkitURL;// allowcode to work in webkit & Gecko based browsers// without the need for a if / else block.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;//when link is clicked call a function to remove it from// the DOM in case user wants to save a second file.
        downloadLink.style.display = "block";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        //program specific=============================
        fileSaveAsTextPS();

    }

function destroyClickedElement(event)
    {   
        document.body.removeChild(event.target);
    }// remove the link from the DOM
    
function getTextFile(path)
        {
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        return request.responseText;
        }
//Display routines===============================================================================================================

function vis(iconID,style)
    //toggles visibility by id or sets it to 'style' = visible or hidden
    {
        if (style===undefined)
            {
                if (document.getElementById(iconID).style.visibility =='visible') {style='hidden';}else{style='visible';}
            }
        document.getElementById(iconID).style.visibility =style;
    }

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

function rat()
    //WINDht, WINDwt RAT must all be definded in parent js
    //use the RAT on boot and resize elements for different ratios of length to width 
    {
        WINDht = window.innerHeight;
        WINDwt = window.innerWidth;
        RAT =parseFloat(WINDht/WINDwt);
    }

function autoSize(id,fVh,bottom,ht,wt)//* id//* fontsize(vh)//* text Bottom//* ht//*  % done at  1/1 screen RAT
    {
        if(fVh!==undefined){fVh = parseFloat(fVh/RAT)+'vh';document.getElementById(id).style.fontSize=fVh ;}
        if (bottom!==undefined){bottom =parseInt(bottom/RAT,10)+'%';document.getElementById(id).style.bottom=bottom ;}
        if (ht!==undefined){ht =parseInt(ht/RAT,10)+'%';document.getElementById(id).style.height=ht;}
        if (wt!==undefined){wt =parseInt(wt*RAT,10)+'%';document.getElementById(id).style.width=wt;}
    }

//Navigation Routines====================================================================================
function home(){window.open("index.html");}

function rTrim(str)
    {
        var bog = str;
        while (bog.substring(bog.length-1)==" "){bog = bog.substring(0,bog.length-1);}
        return bog;
    }