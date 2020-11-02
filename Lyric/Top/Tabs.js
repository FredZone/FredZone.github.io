//added 'NO TAB' display for null or empty tabs
function tabGlossary(){
  var str="GLOSSARY:<br>0-24 Fret number" 
  return str
}

function saveTab(tab) {
  document.getElementById('stringView').value= tabToString(document.getElementById('editLOOPtab').value)
  JSONobj.file.tracks[VID].loops[LOOP].tab=tabToString(document.getElementById('editLOOPtab').value)
  loopsGet()
}

function viewTab() {
    dis('tabs')
    if (document.getElementById('tabs').style.display=='block'){
      var tab=stringToTab(JSONobj.file.tracks[VID].loops[LOOP].tab)
      if (tab==undefined||tab.length<22) {
        tab="NO TAB"
      }
      document.getElementById('tabBox').innerHTML =tab
    }
}

function tabToString(tab){//add the Key later
  if (tab==='-'|tab===null|tab===' '|tab.length<20){
    return('-')}
  else{
    tab=tab.split("\n").join('$');
    var key='A';
    var count;
    var div ;//(div per count)
    var str;
    var add;
    var x=3;//ignore firs 3chr of tab[0] '*|1'
    while (tab.substr(x,1)==='.'){x=x+1;}//count '|' and '.' until '&' or '2' gives your chr per div
    chr=(x-2); //determine chrs
    var bpb=(tab.split('|')[1].length)/chr; //beats/bar
    var nds =tab.split('|')[1].split('&').length-1; //& per bar
    count=bpb-nds;
    div=bpb/count;
    var bars=tab.split('$')[1].split('|').length-1;
    var ele=(count*div*(bars-1)); //number of elements or clicks
    var loopTab=tab.split("|").join('');//get rid of '|'
    var crap= loopTab.length-1;
    if (loopTab.substr(crap)==='$') {loopTab=loopTab.substr(0,loopTab.length-2);}
    var arrTab= loopTab.split("$");
    //alert("KEY; "+key+"\nCOUNT; "+count+"\nBARS; "+bars+"\nDIV; "+div+"\nCHR; "+chr);
    x=1;//ignore line 1
    //alert("arrTab.length: "+arrTab.length);
    while (x<arrTab.length) {//remove string designation E-A-d etc
      arrTab[x]=arrTab[x].substr(1,arrTab[x].length-1);
      x=x+1;}
    str='$';
    x=0;
    while (x<ele){
      str=str+'$';
      x=x+1;}
      //arrPlay=str.split('$');alert(arrPlay.join('\n'));//this is the Array to Play
    x=1;
    var arrPlay =''.split('|');
    arrPlay.splice(0,1,'');
    while(x<ele){
      arrPlay.splice(0,0,'');
      x=x+1;}
    var y=1;
    while (y<arrTab.length){
      //alert(y +"of"+arrTab.length);
      x=0;
      while (x<ele){//while less that total divisions
        add=arrTab[y].substr(x*chr,chr);
        if(add.substr(0,1)!='-') {
          if (arrPlay[x].length<1){
            add=y+":"+add;}
          else {
            add=arrPlay[x]+"|"+y+":"+add;}
          arrPlay[x]=add;
          }
        x=x+1;}
      y=y+1;}
      str=arrPlay.join('@');
      str=str.split(' ').join('');
      str=key+'@'+count+'@'+div+'@'+chr+'@'+str;
    return(str);} }  

function stringToTab(str) {
  var out = ('*|,e|,B|,G|,D|,A|,E|').split(',');
  pos = 0; //position
  //var lineA="";
  var bar;
  var arr = str.split('@');
  var key = arr[0]; //strip the key data points
  var count = arr[1];
  var div = arr[2];
  var chr = arr[3];
  var space = "-";
  var play = "";
  var clk;
  var dots = "";
  var notes;
  var r = 1;
  for (a = 1; a < chr; a++) {
    space = space + " ";
    dots = dots + ".";
  }
  //get space
  dotz = dots.substring(0, dots.length - 1)
  arr.splice(0, 4); //get rid of info string
  bar = count * div; //
  //alert("bar: "+bar+"\ncount: "+count+"\ndiv: "+div+"\nchr: "+chr+"\ndots\n"+dots+"\ndotz\n"+dotz)
  for (j = 0; j < arr.length; j++) { //build line 1
    statusMsg(r)  
    if (r > 9) {
      out[0] = out[0] + r + dotz;
    } else {
      out[0] = out[0] + r + dots;
    }
    for (q = 1; q < div; q++) {
      if (j < arr.length - 1) {
        out[0] = out[0] + "&" + dots;
        j = j + 1;
      }
    }
    if (r >= count) {
      r = 1;
      out[0] = out[0] + "|";
    } else {
      r = r + 1;
    }
  }
  //====================================================
  for (a = 1; a < 7; a++) {
    for (j = 0; j < arr.length; j++) {
      play = space;
      if (arr[j] !== undefined & arr[j] !== "") { //valid click
        clk = arr[j].split("|"); //alert (clk);
        for (w = 0; w < clk.length; w++) {
          notes = clk[w].split(':');
          if (notes[0] == a) {
            play = notes[1];
            while (play.length < chr) {
              play = play + " ";
            }
          }
        }
      }
      out[a] = out[a] + play;
      if ((j + 1) / bar === parseInt((j + 1) / bar, 10)) {
        out[a] = out[a] + "|";
      }
    }
  }
  return (out.join('\n'));
}

function tabCompress(){//add the Key later
  var tab=LOOPtab;
  var key='A';
  var count;
  var div ;//(div per count)
  var str;
  var add;
  var x=3;//ignore firs 3chr of tab[0] '*|1'
  while (tab.substr(x,1)==='.'){x=x+1;}//count '|' and '.' until '&' or '2' gives your chr per div
  chr=(x-2); //determine chrs
  var bpb=(tab.split('|')[1].length)/chr; //beats/bar
  var nds =tab.split('|')[1].split('&').length-1; //& per bar
  count=bpb-nds;
  div=bpb/count;//calculate div
  var bars=tab.split('$')[1].split('|').length-1;
  var ele=(count*div*(bars-1)); //number of elements or clicks
  var loopTab=tab.split("|").join('');//get rid of '|'
  var crap= loopTab.length-1;
  //alert(loopTab.substr(crap));
  if (loopTab.substr(crap)==='$') {loopTab=loopTab.substr(0,loopTab.length-2);}
  var arrTab= loopTab.split("$");
  //alert("KEY; "+key+"\nCOUNT; "+count+"\nBARS; "+bars+"\nDIV; "+div+"\nCHR; "+chr);
  x=1;//ignore line 1
  //alert("arrTab.length: "+arrTab.length);
  while (x<arrTab.length) {//remove string designation E-A-d etc
    arrTab[x]=arrTab[x].substr(1,arrTab[x].length-1);
    x=x+1;}
  str='$';
  x=0;
  while (x<ele){
    str=str+'$';
    x=x+1;}
    //arrPlay=str.split('$');alert(arrPlay.join('\n'));//this is the Array to Play
  x=1;
  var arrPlay =''.split('|');
  arrPlay.splice(0,1,'');
  while(x<ele){
    arrPlay.splice(0,0,'');
    x=x+1;}
  var y=1;
  while (y<arrTab.length){
    //alert(y +"of"+arrTab.length);
    x=0;
    while (x<ele){//while less that total divisions
      add=arrTab[y].substr(x*chr,chr);
      if(add.substr(0,1)!='-') {
        if (arrPlay[x].length<1){
          add=y+":"+add;}
        else {
          add=arrPlay[x]+"|"+y+";"+add;}
        arrPlay[x]=add;}
      x=x+1;}
    y=y+1;}
    str=arrPlay.join('@');
    str=str.split(' ').join('');
    //alert(str);
    str=key+'@'+count+'@'+div+'@'+chr+'@'+str;
    tabDecompress(str);}

function tabDecompress(str) {
  var out = ('*|,e|,B|,G|,D|,A|,E|').split(',');
  pos = 0; //position
  var bar;
  var arr = str.split('@');
  var key = arr[0]; //strip the key data points
  var count = arr[1];
  var div = arr[2];
  var chr = arr[3];
  var space = "-";
  var play = "";
  var clk;
  var notes;
  var barCheck;
  for (a = 1; a < chr; a++) {
    space = space + " ";
  } //get space
  arr.splice(0, 4); //get rid of info string
  alert("TAB DECOMPRESS IS DEPRICATED\n" + arr.join('@'));
  bar = count * div;
  alert("Length: " + arr.length);
  var strng = "";
  for (a = 1; a < 7; a++) {
    for (j = 0; j < arr.length + 1; j++) {
      play = space;
      if (arr[j] !== undefined & arr[j] !== "") { //valid click
        clk = arr[j].split("|"); //alert (clk);
        for (w = 0; w < clk.length; w++) {
          notes = clk[w].split(';');
          //alert("PLAY :"+play + "\nPOSITION\nSTRING: "+a+"\nBAR: "+b+"\nCLICK: "+c+"\narr["+pos+"]:"+arr[pos]+"\nnotes[0]:"+notes[0]+"\nnotes[1]:"+notes[1]);
          //alert(a +" " +notes[0]+"  "+notes[1])
          if (notes[0] == a) {
            play = notes[1];
            while (play.length < chr) {
              play = play + " ";
            }
          }
        }
      }
      out[a] = out[a] + play;
      if ((j + 1) / bar === parseInt((j + 1) / bar, 10)) {
        out[a] = out[a] + "|";
      }
    }
  }
    document.getElementById('editLOOPtab').value = out.join('\n');
}

function xtabNew(){
  var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  var bar=document.getElementById('bars').value;
  var bea=document.getElementById('beat').value;
  var div=document.getElementById('divs').value;
  var spa=document.getElementById('chrs').value;
  var tab=tabSkeleton(bar,bea,div,spa);
  document.getElementById('editLOOPtab').value=tab;}
  
function tabNew(){
  //var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  //  var key = arr[0]; //strip the key data points
  //var count = arr[1];
  //var div = arr[2];
  //var chr = arr[3];
  alert('go')
  var str=""
  var bars=document.getElementById('bars').value;
  var beat=document.getElementById('beat').value;
  var div=document.getElementById('divs').value;
  var chr=document.getElementById('chrs').value;
  //var tab=tabSkeleton(bar,bea,div,spa);
  for (i=0;i<(beat*bars*div)-1;i++){
    str=str+"@"
    }
    str="A@"+beat+"@"+div+"@"+chr+"@"+str
  alert(str)
  document.getElementById('stringView').value=str
  stringToTab(str)
  document.getElementById('editLOOPtab').value=stringToTab(str)
  }





function tabSkeleton(bar,count,div,chr){
  var tab='';
  var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  var lin ="";
  var s=' ';
  var d='';
  var b="|";
  var lin2='*|';
  var s2='.';
  var d2='&';
  var b2 ='|';
  var i=1;
  while (i<chr-1){//create space block
    s=s+' ';
    s2=s2+'.';
    i=i+1;}
  i=1;
  d=s;
  d2=s2;
  while (i<div){ //create div block
    d=s+"-"+d;
    d2=s2+'&'+d2;
    i=i+1;}
  i=count;
  while (i>0){//create beat block
    b='-'+d+b;
    b2=i+d2+b2;
    i=i-1;}
  i=1;
  while (i<=bar){
    lin=lin+b;
    lin2=lin2+b2;
    i=i+1;}
  i=0;
  while (i<6){
    tab=tab+ arrStrings[i]+lin+'\n';
    i=i+1;}
  tab =lin2+'\n'+tab;
  return(tab);}

//========================
function transposeTab(tabStr,steps){
  var msg="";
  var ele;
  var newStr='';
  var key;
  var bars;
  var div;
  var chr;
  var arr;//divide by '@'
  var wire; //inc.split('|')
  var move; //wire.split(':')[1]
  arr=tabStr.split('@');
  //alert(arr[4]);
  key=arr[0];
  bars=arr[1];
  div=arr[2];
  chr=arr[3];
  var eleLen;
  //alert(newStr);
  for (n=4;n<=arr.length-1;n++){
    if (arr[n].length>0) { 
      wire=arr[n].split('|');
      for (w=0;w<=wire.length-1;w++){
        move=wire[w].split(":");
        if (w>0){newStr=newStr+'|';}
        newStr=newStr+move[0]+':';
        eleLen=0;
        for (i=0;i<=move[1].length-1;i++){
          if(isNaN(move[1].substr(i,1))===true){
            ele=move[1].substr(i,1);
            }
        else if(isNaN(move[1].substr(i,2))===false){
            ele=parseInt(parseInt(move[1].substr(i,2),10)+parseInt(steps,10),10);
            i=i+1;}
        else{
          ele=parseInt(parseInt(move[1].substr(i,1),10)+parseInt(steps,10),10);}
        if (ele<0|ele>=23) {alert('TOO BAD\nYou Ran our of Fretboard!');return;}
        //alert("length ele: "+ ele.toString().length);
        eleLen=parseInt(eleLen+ ele.toString().length,10);
        //alert("length eleLen: "+eleLen);
        if (eleLen>=chr) {
          msg=msg+'- Expanded Tab';
          chr=eleLen+1;}
        newStr=newStr+ele;}
        }
      newStr=newStr+'@';}
      else if(n<arr.length-1){
        newStr=newStr+'@';
      }
    }
  key = transposeNote(key,steps);
  newStr=key+'@'+bars+'@'+div+'@'+chr+'@'+newStr;
  document.getElementById('stringView').value=newStr;
  document.getElementById('editLOOPtab').value=stringToTab(newStr);
  statusMsg('Transposed '+steps+ " Key(s) to "+key+"  "+msg); }

function addBarToTab(){
  var x;
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//update String
  var str=document.getElementById('stringView').value;
  x=str.split('@');
  x=x[2]*x[1];
  for(j=0;j<x;j++){str=str+"@";}
  document.getElementById('stringView').value=str;
  document.getElementById('editLOOPtab').value=stringToTab(str);}
  
function tabResize(){
  //alert(document.getElementById('tabSmall').style.fontSize);
  if (document.getElementById('tabBar').style.height==='15%'){  
    document.getElementById('tabBar').style.height='25%';
    document.getElementById('tabSmall').style.fontSize='3.25vh';}
  else{
    document.getElementById('tabBar').style.height='15%';
    document.getElementById('tabSmall').style.fontSize='1.75vh';}}

function removeBar(){
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//update String
  document.getElementById('editLOOPtab').value=stringToTab(document.getElementById('stringView').value);//update String
  //alert("The Program just re-wrote your tab using the compression code...,plase check for errors");
  var tabArr=document.getElementById('editLOOPtab').value.split('\n');
  var strArr=document.getElementById('stringView').value.split('@');
  var newLen=tabArr[1].length-(strArr[1]*strArr[2]*strArr[3]+1);
  alert(tabArr[1].length+">>"+ newLen);
  for(j=0;j<tabArr.length;j++){
    tabArr[j]=tabArr[j].substr(0,newLen);}
  document.getElementById('editLOOPtab').value=tabArr.join('\n'); }

function expandTab(z){
  var newSpace;
  document.getElementById('stringView').value=tabToString(document.getElementById('editLOOPtab').value);//update String
  var str=document.getElementById('stringView').value;
  x=str.split('@');
  newSpace=parseInt(x[3],10)+parseInt(z,10);
  x.splice(3,1,newSpace);
  str=x.join('@');
  document.getElementById('stringView').value=str;
  document.getElementById('editLOOPtab').value=stringToTab(str);}

