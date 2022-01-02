//https://developers.google.com/youtube/iframe_api_reference
//Universal variables
//var MSGlast="???"; //last message
//function test to pass to anoter function 

//LOAD ROUTINE==============================================================================

window.onload = function()
    {
        statusMsg('Loading Javascript....');
        NONE =document.getElementById('none').style.display;//*  create object for dis routine
        MSGlast="Cold Start";
        statusMsg('Forced pause to show Splash Screen');
        TEMP=setTimeout(function(){clearTimeout(TEMP);loadContinue();},2000);//remove after development
    };

function loadContinue()//break in boot for entry by other routines
    {
        document.getElementById("msg").style.top='0%';
        //document.getElementById("msg").style.zIndex=5005;
        document.getElementById("splash").style.display='none';
        statusMsg('Ready...'+ document.getElementById("msg").style.zIndex,'green');    
    }


//=================================================================

