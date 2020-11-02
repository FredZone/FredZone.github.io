//Looks guood 05/31/20 10:15am
//*ADD GLOBAL VARIABLES HERE!!!!
var FILEname='Your.json';
var JSONfile;
var JSONobj
var JSONlast;
var ONLINE=false;
var TIMEOUTtemp;
var JSONval;
var JSONstate=1;
var DEMOstate=1;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
//var player; //player must be a div in the form with id 'player')
//function onYouTubeIframeAPIReady() {
  //player = new YT.Player('player', {
   // videoId: 'LcOempNj6_g',
   // events: {
   //   'onReady': onPlayerReady,
  //  'onStateChange': onPlayerStateChange  look into this
   // }
 // });
//}


// 4. The API will call this function when the video player is ready.
//function onPlayerReady(event) {
//  alert(player.getDuration())
//  event.target.playVideo();
//  player.playVideo();
//}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
//var done = false;
//function onPlayerStateChange(event) {
//  if (event.data == YT.PlayerState.PLAYING && !done) {
//      setTimeout(stopVideo, 6000);
//      done = true;
//  }
//}

/*CORE YOU TUBE API ---DONT MESS WITH THIS
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.called by api
//var player;


//^ON VIDEO READY 
//function onPlayerReady(event){
//    statusMsg('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
//   loopsGet(0);
//   }
*/

//REWRITE THE BOOT FUNCTION AS YOU SEE FIT
//^==================================================================
dragElement(document.getElementById("scratchPad"));
dragElement(document.getElementById("htmlPage"));
function boot() {
    statusMsg('Loading javascript...')
    dis('thinking', 'block')
    //^START CUSTOM BOOT CODE (you can break the boot function into muliple functions)
    MSGready = "Still in work..." //YADA
    //statusMsg('INSERT BOOT CODE HERE!'); //YADA
    if (navigator.onLine) {
        ONLINE = true;
        statusMsg("You are online.");
    } else {
        statusMsg("YOU ARE OFF LINE!", 'red');
        ONLINE = false;
    }
    localCodeShow() //prefill this so it doesnt automatically refill while you are working
    dis('thinking', 'none')
    statusMsg('finishing...')
    finishBoot()
}
//^Navigation Code
function h(val) {
    document.getElementById('page').innerHTML = val
    document.getElementById('htmlPage').style.display = 'block'
}
function aboutH(){
    var str='To Call and fill the \'htmlPage\' with \'x\' use the function:<br>h(\'x\')<br>'
    str=str+'<br>The id of this pop-up is \'htmlPage\'; Address it that way in your code...<br>'
    str=str+'The id of the textarea is\'pad\'; Address it that way in your code...'
    popUp(str,'Using the \'htmlPage\'',15)
}

function s(val) {
    document.getElementById('pad').value = val
    document.getElementById('scratchPad').style.display = 'block'
}

function aboutS() {
    var str = 'To Call and fill the \'scratchPad\' screen with \'x\' use the function:<br>s(\'x\')<br>'
    str = str + '<br>The id of this pop-up is \'scratchPad\'; Address it that way in your code...<br>'
    str = str + 'The id of the textarea is\'page\'; Address it that way in your code...'
    popUp(str, 'Using the \'scratchPad\'', 15)
}

function localCodeUpdate(){//should not requery the select box
    var key=document.getElementById('localCode').value;
    var val=document.getElementById('code').value;
    localStorage.setItem(key,val);
    statusMsg('Updated the '+key+' function...','yellow')
}

function localCodeShow(){
    var sel="";
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      sel=sel+"<option value=\'"+localStorage.key( i )+"\'>"+localStorage.key( i )+"</option>";
    }
    document.getElementById('localCode').innerHTML=sel
    statusMsg('Refreshed the code selector...','yellow')
    localCodeGet()
}
function localCodeSave() {
    var sel=""
    nme = prompt('Function Name???', 'crap')
    if (nme == null) {
        statusMsg('Nothing Saved...', 'red')
    } else {
        localStorage.setItem(nme, document.getElementById('code').value);
        statusMsg('Saved the function ' + nme + '...', 'yellow')
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            sel = sel + "<option value=\'" + localStorage.key(i) + "\'>" + localStorage.key(i) + "</option>";
        }
        localCodeRefreshSelect(nme)
    }
}

function localCodeGet() {
    var key=document.getElementById('localCode').value
    document.getElementById('code').value = localStorage.getItem(key)
    statusMsg('Retrieved the '+key+ ' function...','yellow')
}

function localCodeKill(key) {
    if (confirm("Do you want to kill this piece of code:"+key)==true){
        localStorage.removeItem(key)
        localCodeShow()
        statusMsg('Deleting the  '+key+ ' function...','yellow')
    }
}

function localCodeRefreshSelect(key) {//adds new <option> and updates selectBox (does not refresh the code)
    var sel;
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        sel = sel + "<option value=\'" + localStorage.key(i) + "\'>" + localStorage.key(i) + "</option>";
    }
    alert(sel)
    document.getElementById('localCode').innerHTML = sel
    document.getElementById('localCode').value = key
    statusMsg('Refresed Selector at'+key, 'yellow')

}





function getLevel(lev){
    var levStr
    levStr=document.getElementById('demo').value.split('[')[lev]   
    alert(levStr)
}
function logGet(){//peformed after downloading a network file?????
    document.getElementById('demo').value=TEMP;
    JSONfile=document.getElementById('demo').value
    JSONdown=JSONfile;
    //validate()
    JSONobj=JSON.parse(TEMP)
    statusMsg("JSON FILE DOWN LOADED...")
}

function locGet(){//performed after uploading a local file
    JSONfile=TEMP
    document.getElementById("demo").value=TEMP
    JSONobj=JSON.parse(TEMP)
    statusMsg("LOCAL FILE LOADED...")
    //fillVideos()
}

//operations on JSONobj=======================================
function replaceJSONobj(){
   // statusMsg("Unable to update JSONobj...Likely Error in text",'red')
   // statusMsg("ERROR! There is a JSON error in displayed text",'red');
   // document.getElementById('demoX').innerHTML='Text ERROR'
  //  document.getElementById('demoX').style.backgroundColor='red';
    JSONfile=document.getElementById('demo').value
    JSONobj=JSON.parse(document.getElementById('demo').value);
    warn();
    //statusMsg("Gettng Videos...");
    //fillVideos(VID,LOOP);
    //document.getElementById('demoX').innerHTML='VALID TEXT'
    //document.getElementById('demoX').style.backgroundColor='lightgreen';
    //document.getElementById('jsonX').innerHTML='EDITED'
    //document.getElementById('jsonX').style.backgroundColor='yellow';
    statusMsg("Updated JSONobject and JSONfile with your data",'yellow')
}

function restoreJSONobj(){
    statusMsg("Function restoreJSONobj needs work ",'red')   
    x=document.getElementById('demo').value
    JSONobj=document.getElementById('demo').value=JSONlast
    JSONlast=x
    ()
    statusMsg("Restored Previous JSONobject and Saved your text ",'red')    
}
//JSON Operations===================================
function stringify(){
    statusMsg("ERROR! There is a JSON error in displayed text",'red');
    document.getElementById('demoX').innerHTML='Text ERROR'
    document.getElementById('demoX').style.backgroundColor='red';
    JSONval=null;
    JSONval=JSON.parse(document.getElementById('demo').value);
    statusMsg("Your Text Beautified!",'yellow')
    document.getElementById('demoX').innerHTML='VALID TEXT'
    document.getElementById('demoX').style.backgroundColor='lightgreen';
    document.getElementById('demo').value=JSON.stringify(JSONval)
    statusMsg("Your Text Stringified!",'yellow')
}

function beautify() {
    statusMsg("ERROR! There is a JSON error in displayed text",'red');
    document.getElementById('demoX').innerHTML='Text ERROR'
    document.getElementById('demoX').style.backgroundColor='red';
    JSONval=JSON.parse(document.getElementById('demo').value);
    document.getElementById('demo').value=JSON.stringify( JSONval,null,3)
    statusMsg("Your Text Beautified!",'yellow')
    document.getElementById('demoX').innerHTML='VALID TEXT'
    document.getElementById('demoX').style.backgroundColor='lightgreen';
}

function validate(){
    statusMsg("ERROR! There is a JSON error in displayed text",'red');
    document.getElementById('demoX').innerHTML='Text ERROR'
    document.getElementById('demoX').style.backgroundColor='red';
    JSONval=null;
    JSONval=JSON.parse(document.getElementById('demo').value);
    statusMsg("Your Text is valid",'green')
    document.getElementById('demoX').innerHTML='VALID TEXT'
    document.getElementById('demoX').style.backgroundColor='lightgreen';
}

//editor operatons====================================================================
function openEditor() {
    if (document.getElementById('editUtool').style.display == 'block') {
        dis('editUtool', 'none')
    } else {
        updateEditor()
        dis('editUtool', 'block')
    }
}

function updateEditor() {
    //File info
    document.getElementById('titleA').value = JSONobj.file.title;
    document.getElementById('descA').value = JSONobj.file.desc;
    //track info
    document.getElementById('titleB').value = JSONobj.file.tracks[VID].title;
    document.getElementById('utidB').value = JSONobj.file.tracks[VID].utid;
    document.getElementById('backtrackB').value = JSONobj.file.tracks[VID].backtrack;
    document.getElementById('notesB').value = JSONobj.file.tracks[VID].notes;
    //loop info
    document.getElementById('titleC').value = JSONobj.file.tracks[VID].loops[LOOP].title;
    document.getElementById('startC').value = JSONobj.file.tracks[VID].loops[LOOP].start;
    document.getElementById('stopC').value = JSONobj.file.tracks[VID].loops[LOOP].stop;
    document.getElementById('tabC').value = JSONobj.file.tracks[VID].loops[LOOP].tab;
    document.getElementById('descC').value = JSONobj.file.tracks[VID].loops[LOOP].desc;
    document.getElementById('demo').value = JSON.stringify(JSONobj, null, 4) //show the easiest view of JSONobj
    document.getElementById('demo').style.backgroundColor='lightgreen'
    statusMsg("Updated the editor to the current JSONobj")

}

function jsonUpdated(){
    document.getElementById('demo').value=JSON.stringify(JSONobj,null,4)
    dis('warning','block')
    document.getElementById('demo').style.backgroundColor='yellow'
    document.getElementById('demoX').innerHTML='Current'
    document.getElementById('demoX').style.backgroundColor='lightgreen';
    document.getElementById('jsonX').innerHTML='Edited'
    document.getElementById('jsonX').style.backgroundColor='Yellow';
    warn()
}

function warn(){
    dis('warning','block')
    document.getElementById('demo').style.backgroundColor='pink'}
//BOOT function==============================================

function XjsonLoad(path,vid,loop) {//XXXshould go to json.js eventually
path='../Tube/Sandercoe Blues.json'
statusMsg ('Downloading JSON data file: '+path)   
    if(isNaN(vid)){vid=0}
    if(isNaN(loop)){loop=0}
    vid=0;loop=0;
    var content = "Attemping to Download" + path;
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    content = request.responseText;
    if (content.search("404") > -1 | content.length < 1) {
        statusMsg("Possible 404 error indicates Server didn't find: "+path)
    }
    statusMsg("Parsing JSON data file" )
    JSONfile=content;
    JSONobj=JSON.parse(content)
    fillVideos(vid,loop)
}


//End of Boot============================================================================
//UTOOL specific operations (not JSONedit related)
function jsonError(str){
    pos=0
    var arr="x x x x".split(',')
    var msg="Valid JSON string!"
    try{ 
      JSON.parse(str) 
    } catch(e) {
     msg= e.message
      //alert("Caught: " + e.message)
    }
    //arr=msg.split(",")
    arr= (msg.split(' '))
    pos=arr[arr.length-1]
    statusMsg(msg)
    setCaretPosition(document.getElementById('demo'), pos)
}




function xjsonError(str) {
    alert('catching')
    var pos
    var arr
    try {
        JSON.parse(str);
    } catch (e) {
        statusMsg("Caught: " + e.message)
        //arr=e.message.split('/n')
        //pos=arr[arr.length-1]
        //alert(pos)
        //setCaretPosition(document.getElementById('demo'), pos)
       
    }
}

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
}



function nice() {//fakes a JSON.parse of one of any json file but prints if its good or BAD!
    var space = ""
    var ARRcrap
    //Part A; line breaking...
    str = document.getElementById('demo').value
    //Part 1 hierarcy "--[---}---,"
    str = str.replace(/{/g, "\n{");   //break prior {
    str = str.replace(/}/g, "\n}\n"); //break after }
    str = str.replace(/",/g, "\",\n");//break after ",
    str = str.replace(/\[/g, "\n[");  //break before [
    str = str.replace(/]/g, "\n]\n");//break after ]
    for (i = 1; i < 30; i++) {
        str = str.replace(/  /g, " ");//get rid of double spaces (up to 30)
    }
    document.getElementById('demo').value = str
    for (i = 1; i < 5; i++) {
        str = str.replace(/\n\n/g, "\n");//eleiminate doubleline breaks
        str = str.replace(/ \n/g, "");//remove line feed before any comma
        str = str.replace(/}\n,/g, "},");//remove line feed before between } and ,
        str = str.replace(/]\n,/g, "],");
    }
    document.getElementById('demo').value = str
    //Part B indenting
    arrCrap = str.split('\n');
    for (i = 1; i < arrCrap.length; i++) {
        oldSpace = space
        if (arrCrap[i].charAt(0) == "{" || arrCrap[i].charAt(0) == "[" || arrCrap[i].charAt(arrCrap[i].length - 1) == "{" || arrCrap[i].charAt(arrCrap[i].length - 1) == "[") {
            space = space + "    "
            arrCrap[i] = oldSpace + arrCrap[i];
        } else if (arrCrap[i].charAt(0) == "}" || arrCrap[i].charAt(0) == "]") { //   ||  str.charAt(arrCrap[i].length-1)=="}"            || str.charAt(arrCrap[i].length-1)=="]")
            space = space.slice(0, -4);
            arrCrap[i] = space + arrCrap[i];
        } else arrCrap[i] = space + arrCrap[i];
    }
    str = arrCrap.join('\n');
    document.getElementById('demo').value = str
    statusMsg ("Faked a JSON.stringify: abd printed WITH errors....")
}

