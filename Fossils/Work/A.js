//GLOBAL VARIABLES=====================================================================================================
//var J =0;
var DOWNtime=2000;
var SOUND =false;
var PICKno=1;
var TO;
var WINDht;
var WINDwt;
var TOload;
var OSName="Unknown OS";
var NAME;
var LOCKED=true;
//================================================================
/*window.onload = function(){
    WINDht = window.innerHeight;
    WINDwt = window.innerWidth;
    RAT =parseFloat(WINDht/WINDwt);
    pHome();
    alert(document.getElementById('CustomPoster').style.visibility=='hidden');
    if (document.getElementById('CustomPoster').style.visibility=='hidden') {update();}
    };
    */

function getOS(){
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
    }

function customPoster(){
    ARRlines=receiveARR('\n');
    if (ARRlines[0]===undefined) {ARRlines[0]= "  " ;}
    if (ARRlines[1]===undefined) {ARRlines[1]= "  " ;}
    if (ARRlines[2]===undefined) {ARRlines[2]= "  " ;}
    if (ARRlines[3]=='UNUSED') {
        document.getElementById('loc').style.border='none';
        document.getElementById('date').style.border='none';
        }
    document.getElementById('loc').innerHTML=ARRlines[0];
    document.getElementById('date').innerHTML=ARRlines[1]+ '&nbsp;&nbsp;&nbsp;&nbsp;'+ARRlines[2];
    if (ARRlines[4]=='none'){
        document.getElementById('sticker').style.visibility='hidden';
        }
    else{
        document.getElementById('sticker').src=ARRlines[4];
        document.getElementById('sticker').style.visibility='visible';
        }
    window.name="Expired";
    preFlyer();
    }

function preFlyer(){//alert telling how to print the flyer
    var str="FLYER HELP\n";
    str=str+"\n1) Use an standard 8.5x 11 sheet";
    str=str+"\n2) Print in the Portrait Mode";
    str=str+"\n3) Shrink to fit or shrink to fit width";
    str=str+"\n4) Use Minimal margins";
    str=str+"\n5) For a smaller flyer increase the margins";
    alert(str);
    }

function HelpFlyer(){
    var str="FLYER HELP\n";
    str=str+"\n1)Fill in the Location Date and Time";
    str=str+"\n2) You may leave them blank to write in later...";
    str=str+"\n3) Select a color and 'Sticker' if desired...";
    str=str+"\n4) Go to the printer setup...";
    str=str+"\n5) Use an standard 8.5x 11 sheet";
    str=str+"\n6) Print in the Portrait Mode";
    str=str+"\n7) Shrink to fit or shrink to fit width";
    str=str+"\n8) Use Minimal margins";
    str=str+"\n9) For a smaller flyer increase the margins";
    alert(str);
    }

function HelpCard(){
    var str="BUSINESS CARD HELP\nPrint the card set with the following Settings!";
    str=str+"\n1)  Use an standard 8.5x 11 sheet";
    str=str+"\n2)  Print in the Portrait Mode";
    str=str+"\n3)  Shrink to fit or shrink to fit width";
    str=str+"\n4)  Set 0.8 left margin";
    str=str+"\n5)  Set 0.7 right margin";
    str=str+"\n6)  PRINT the front sheet";
    str=str+"\n7)  Flip over the printed sheet and re-insert in printer";
    str=str+"\n8)  PRINT the Back sheet";
    str=str+"\n9)  Cut out cards at the border";
    alert(str);
    }

function updateMenu(id){
    var ARRmenu =("h/c/a/l/u/h2/t1/p/v/g/s/x").split("/");//gallery =/g
    var j=0;
    while(j<ARRmenu.length)
        {
           clearTimeout(TO);
           if (ARRmenu[j]==id) {document.getElementById(ARRmenu[j]).style.color='yellow';}
           else{document.getElementById(ARRmenu[j]).style.color='white';}
           if (id=='g'){document.getElementById('spinG').style.visibility='visible',document.getElementById('pic').style.visibility='visible';}else{document.getElementById('spinG').style.visibility='hidden',document.getElementById('pic').style.visibility='hidden';}
           if (id=='a'){document.getElementById('spinA').style.visibility='visible';}else{document.getElementById('spinA').style.visibility='hidden';}
           j = j+1;
        }
    }

function zoom(id,start,axis,dir,time,fin){
    if ( start==fin)
        {
            clearTimeout(TO2);
            document.getElementById('bground').src= 'sepiaA.jpg';
        }
    else{
        TO2=setTimeout(function()
            {
                start= parseInt(start,10)+parseInt(dir,10);
                document.getElementById(id).style.height =start+'%';
                zoom(id,start,axis,dir,time,fin);
            },time);
        }
    }



function picShow(){
    var str;
    str="url('Gallery/"+J+".jpg')";
    document.getElementById('pic').style.visiblity = 'visible';
    document.getElementById('pic').style.backgroundImage = str;
    document.getElementById('content').style.visibility='hidden';
    document.getElementById('content2').style.visibility='hidden';
    J=J+1;
    if (J>PICcount){J=1;}
    TO = setTimeout(function()
        {
            picShow();
        },5000);
    }     

function pHome(a){
    if (a==1) {
        document.getElementById('index').style.display='block';
        document.getElementById('index2').style.display='none';
        document.getElementById('content').style.visibility='hidden';
        document.getElementById('content2').style.visibility='hidden';
        document.getElementById('spinG').style.visibility='hidden';
        document.getElementById('spinA').style.visibility='hidden';
        document.getElementById('pic').style.visibility='hidden';
        updateMenu('h');
        }else{
        if (a==2){
            if (LOCKED===true){
                if(prompt('PASSWORD?')!=PW) {
                    alert('Sorry...\nWrong Password');
                    return;
                    }
                else{
                LOCKED=false;
                }
            }
            
            dispFile('data/Venues.txt',4,'center','white');
            document.getElementById('index').style.display='none';
            document.getElementById('index2').style.display='block';
            document.getElementById('content').style.visibility='hidden';
            document.getElementById('content2').style.visibility='hidden';
            document.getElementById('spinG').style.visibility='hidden';
            document.getElementById('spinA').style.visibility='hidden';
            document.getElementById('pic').style.visibility='hidden';
            updateMenu('v');
            dispFile('data/Venues.txt',4,'center','white');
            }
        }
    }

function show(nme){
    document.getElementById('pic').style.src ="../PICS/"+nme;
    }

function dispFile(path,fnt,left,color){
    clearTimeout(TO);
    var str = readFile(path);
    disp(str,fnt,left,color);
    }
 function playTrack(){
    if (SOUND=== true){SOUND=false;}else{SOUND=true;}
    if (SOUND===true){audio.play();}else{audio.pause();}
    if (SOUND===false) {document.getElementById('spkr').src="transPlayGreen.png";}else{document.getElementById('spkr').src="transPauseRed.png";}
    }

 function disp(str,fnt,just,color){
        clearTimeout(TO);
        document.getElementById("content").scrollTop=0;
        document.getElementById("content").innerHTML=str;
        document.getElementById('content').style.fontSize=fnt+"vw";
        document.getElementById('content').style.textAlign =just;
        document.getElementById('content').style.color =color;
        document.getElementById("content").style.visibility ='visible';
        document.getElementById("content2").style.visibility ='visible';
    }

function readFile(path){
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var content = request.responseText;
    var n = content.search("404"); //* look for a 404 error from server
    if (n >-1)//* XXX unverified through all cases of next tune
        {  
            content="Sorry...Some kind of error";
        }
    return(content);
    }

function loadNewTrack(path,name){
    DOWNtime=2000;
    path='Tracks\\'+path;
    if (OSName=='MacOS') {  //MacOS
        document.getElementById('macSong').style.visibility='visible';
        document.getElementById('macSong').src=path;
    }else{
        document.getElementById('song').style.visibility='visible',
        loadServerTrack(path,name,1);
        }
    }

function loadServerTrack(path,name,n){//F
    clearTimeout(TOload);
    if(n==1)
        {
        document.getElementById('audio').src = path;
        document.getElementById('pl').innerHTML='Loading ('+ n*2 + ' sec)';
        document.getElementById("audio").style.visibility ="visible";
        }
    var rs =0;
    TOload = setTimeout(function()
        {
            rs= document.getElementById('audio').readyState;
            if (rs>=3 )//track successfully loaded
                {
                    AUDfail=false;
                    document.getElementById('pl').innerHTML=name;
                    document.getElementById("audio").play();
                }
                else if (n==7)
                {
                    document.getElementById('pl').innerHTML='Audio Failed!';
                    return;
                }
                else
                {
                   n=n+1;
                   document.getElementById('pl').innerHTML='Extending Download to '+n*2 +' secs';
                   loadServerTrack(path,name,n);
                }
        },2000);//time to load mp3
    }

function pg(name){window.open(name);}

function autoSize(id,fVh,bottom,ht){//id//fontsize(vh)//text Bottom//ht// % done at  1/1 screen RAT
    if(fVh!==undefined){fVh = parseFloat(fVh/RAT)+'vh';document.getElementById(id).style.fontSize=fVh ;}
    if (bottom!==undefined){bottom =parseInt(bottom/RAT,10)+'%';document.getElementById(id).style.bottom=bottom ;}
    if (ht!==undefined){ht =parseInt(ht/RAT,10)+'%';document.getElementById(id).style.height=ht;}
    }

function receiveARR(divider)  {
    //decode the passed string and split into an array at the 'divider'(put this in receiving page)
    //null divider for string not to be split into arr
    return decodeURIComponent(decodeFredComponent(window.name)).split(divider);
    }

function  passARR(pageName,arr,divider,leadingElements){
    //take data, array or string and pass to another page
    //if its an array it you must use a divider (i.e. '\n')
    var pf;
    if(Array.isArray(arr)===true){pf=arr.join(divider);}else{pf=arr;}
    if (leadingElements!==null){pf=leadingElements+divider+pf;}
    window.open(pageName,encodeURI(encodeFredComponent(pf)));
    }
    
function encodeFredComponent(str){//* encodes problem char (?,@)
    str=str.split("?");
    str=str.join("QMARK");
    str=str.split("@");
    str=str.join("AMARK");
    return str;
    }
    
function decodeFredComponent(str){//* decodes problem char (?,@)
    str=str.split("QMARK");
    str=str.join("?");
    str=str.split("AMARK");
    str=str.join("@");
    return str;
    }
    
function crap(){
    clearTimeout(TO);
    var str = readFile('poster.txt');
    document.getElementById('content').innerHTML=str;
    document.getElementById('content').style.visibility='visible';
    }
    
function printPoster(){
    var str=document.getElementById('pLoc').value+"\n"+document.getElementById('pDate').value +"\n"+document.getElementById('pTime').value+"\nUNUSED\n"+document.getElementById('sign').value;
    passARR('poster.html',str,'/n',null);
    }