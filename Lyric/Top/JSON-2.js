//*GLOBAL VARIABLES HERE!!!!
var JSONfile="";
var OBJtemp;
var OBJtest;

//^COMMON CODE BOOT=============================================================
window.onload = function() {//put first two at the start of your code
    document.getElementById("debugTrigger").focus();
    var agent=(navigator.userAgent.split(')').reverse()[0].match(/(?!Gecko|Version|[A-Za-z]+?Web[Kk]it)[A-Z][a-z]+/g)[0])
    ARRstatusLog=("================BOOTING in "+agent+"==================").split('-');
    statusMsg("PRESS ANY KEY or CLICK THE 'BUG' to monitor the boot...")
    TIMEOUTcrap = setTimeout(function() {
        statusMsg('Booting...')
        boot();
    }, 1500);
}
function boot() {
    statusMsg('Loading javascript!')
    //^START CUSTOM BOOT CODE
    statusMsg('YADA!');
    statusMsg('YADA!');
    statusMsg('YADA!');
    //^COMMON CODE (FINISH BOOT)
    finishBoot()
}
function finishBoot(){    // put at the end End Custom Boot routine
    document.getElementById('msg').style.top='0%';//move the msg to the top
    dis('debugButton','block'); //YADA after development change to none
    statusMsg('READY...')
    dis('splash','none');
}
//^END COMMON CODE & END BOOT====================================================

function JSONget(path) {
    var txt=undefined
    statusMsg("Downloading JSON file "+ path)
    JSONfile=fileDownload(path)
    document.getElementById('demo').value=JSONfile
    OBJtemp= JSON.parse(JSONfile);
    statusMsg("JSON Download successful...")
}

function JSONselector(tree){
    var x,i
    for (i in OBJtemp.file.loops) {
      x +="<option>"+OBJtemp.file.loops[i].name+"</opton>";
    }
    return  x;
}

