//GLOBAL VARIABLES================================================================
//First Line Variables============================================================
//Defaults are Set here...
var CHORDstring="";

var BARS =0;
var BARSperLine=4;
var BEATS=4;//Beats/bar
var BPM=100;
var DUR=180;//Duration for scrolling and calculating
var TEMPO=120;
var TIMEsig="4/4";
var TITLE="Unknown";//song title being played
var QUALITY='Unknown';//
var ARTIST='Unknown'
var CONDITION='RAW'
var HITyear="Unknown"
//other GLOBALS======================================================================
ARRkeys=("A;3,Bb;-2,B;5,C;0,C#;-5,D;2,Eb;-3,E;4,F;-1,F#;6,G;1,Ab;-4").split(',')
var AUD;//audio element
var ARRlines="";//Array of lines from text file
var ARRnew="";//Array of used to replace ARRlines
var ARRchords="";//used in tranferring chords
var ARRnotes ="";//used in tranferring chords
var CHORDlines;
var CHORDcount;
var DURcalc=0;//Calculated duration based on Bars/Beats/time signature
var DURmp3=0;//used on scroll(default = DURmp3, DURcalc, DURfile, DURinput)
var TIMEOUTeditWarn;
var EDITwarning ='false';//lock out normal functions while editing
var EDITbaseLine;//copy of the file before editing...
var FLAG;//used in chord transfer
var LINEcount=0;
var LONGLINE=0;
var LONGLYRIC=0
var NONE =document.getElementById('none').style.display;
var TIMERstart =0;// used on o tool
var TRANSPOSE =0;//how many 1/2 steps to tranpose
var TEMPOstart=0;
var TEMPOcount=0;
var TEMPOtime=0;
var TEMPOtimeLast=0;
//for XML=========================================== 
var FIFTH =0;//key (how many sharps or flats)
var CHORDlast="C"//incase a % or blank is used in as a chord
var DIVISIONS=480;//number of divisions in a MUSICxml files measure (divisible by, 3,4....16)
var ARRmeasures=('Ab,A,A#,Abm,Am,A#m,A7,A6,Am7,Am6,Adim,Asus,Aaug').split(',');//major,sharps-flats, minor
var TEST ="No Debug Executed Yet...";
var ARRvalidChords="6,7,aug,dim,Maj6,Maj7,m,m6,m7,sus,sus4".split(',')
var BARlyric='';
//*INWORK FUNCTIONS==========================================================================================================
var BARS=0;
var BARShalf=0;
var BARSperLine=0;
var CHORDlines=0;
var ARRbars =''.split(',');
var CHORDERhelp="Go To ChordU and copy the chord Chart\nPaste it into the editor\nfill in the first line (i.e. title etc)\nSave the file\nsame the Utube version of the song as MP3\nUse Audacity to process the audio (clip at ends)ste"

function makeChordStringX(){
var strA= document.getElementById('rawTune').value
var strB=strA.replace(/\n/g,"z")//make it a string
//document.getElementById('rawTune').value="1} strB:\n"+strB;
var strC=strB.replace(/zzzzzz/g,"qqqq")
strC=strC.replace(/zzzzz/g,"qqqq")
strC=strC.replace(/zzzz/g,"qqqq")
strC=strC.replace(/zzz/g,"qq")
strC=strC.replace(/zz/g,"qq")
strC=strC.replace(/q/g," ")
document.getElementById('rawTune').value="strB:\n"+strB+"\nstrC:\n"+strC;
}

function makeChordString() {
  var trigger = 0
  var Q = ""
  var strD = ""
  var waiting = ""
  var strA = document.getElementById('rawTune').value
  var strB = strA.replace(/\n/g, "z") //make it a string
  document.getElementById('rawTune').value = "strB:\n" + strB
  var strC = strB.replace(/zzzzzz/g, "qqqq")
  document.getElementById('rawTune').value = "strB:\n" + strB
  strC = strC.replace(/zzzzz/g, "qqqq")
  strC = strC.replace(/zzzz/g, "qqqq")
  strC = strC.replace(/zzz/g, "qq")
  strC = strC.replace(/zz/g, "qq")
  document.getElementById('rawTune').value = document.getElementById('rawTune').value + "strC:\n\n" + strC
  for (j = 0; j < strC.length; j++) {
    if (strC[j] != "q") {
      if (Q.length == 0)
        waiting = waiting + strC[j]
      else if (Q.length >= 4) {
        strD = strD + "|" + waiting + Q
        waiting = strC[j]
        Q = "";
      } else if (Q.length >0&Q.length <4) {
        strD = strD + "|*" + waiting + Q
        waiting = strC[j]
        Q = "";
      }
    } else {
      Q = Q + "q"
    }
  }
 
 strD=strD.replace(/q/g," ")
 document.getElementById('rawTune').value = document.getElementById('rawTune').value + "\n\nstrD:\n" + strD
}


function abcConvert(){
 upDateArray(); 
 document.getElementById('replaceIn').value='chord';
          ARRlines=insert(ARRlines,"-");
          ARRlines.pop;
          ARRlines.push("----------------Bogus Text Line------------------");
          upDateWorkSpace();
  StepThroughArray("rTrim");
  StepThroughArray("replace","| \"","|");
  StepThroughArray("replace","\""," ");
  StepThroughArray('addPartBars')
  StepThroughArray("stripLastBar");
  StepThroughArray('spreadChords');

}

function insert(items, separator) { //USELESS
  const result = items.reduce(
    (res, el) => [...res, el, separator], [separator]);
  return result;
} 


function mode(args) {
  dis('tabster','none');
  dis('xmlTop','none');
  dis('xmlExport','none');
  if (args==='edit') {
    statusMsg('Standard Edit Mode')
  }else if (args==='xml') {
    statusMsg('XML Mode');
    createXML();
    dis('xmlTop','block');
    dis('xmlExport','block');
  }else if(args==='tab'){
    statusMsg('TAB Mode');
    dis('tabster','block');
  }else{
    alert("ERROR");}

}
function showTab(){dis('tabster')}

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

function stringToTab(str){
  var out=('*|,e|,B|,G|,D|,A|,E|').split(',');
  pos=0;//position
  //var lineA="";
  var bar;
  var arr=str.split('@');
  var key=arr[0];//strip the key data points
  var count=arr[1];
  var div = arr[2];
  var chr = arr[3];
  var space="-";
  var play="";
  var clk;
  var dots="";
  var notes;
  //alert(str)
  for(a=1;a<chr;a++){space=space+" ";dots=dots+".";}//get space
  arr.splice(0,4);//get rid of info string
  bar=count*div;
  var r=1;
  for(j=0;j<arr.length;j++){//build line 1
    out[0]=out[0]+r +dots;
    for(q=1;q<div;q++){
      if (j<arr.length-1){
        out[0]=out[0]+"&" +dots;
        j=j+1;}}
    if(r>=count){r=1;out[0]=out[0]+"|";}else{r=r+1;}}
  for(a=1;a<7;a++){
    for(j=0;j<arr.length;j++){
      play=space;
      if (arr[j]!==undefined & arr[j]!=="") {//valid click
        clk=arr[j].split("|");          //alert (clk);
        for(w=0;w<clk.length;w++){
          notes=clk[w].split(':');
          if (notes[0]==a){
            play=notes[1];
            while(play.length<chr){play=play+" ";}}}}
      out[a]= out[a]+play;
      if((j+1)/bar===parseInt((j+1)/bar,10)){out[a]=out[a]+"|";}}} 
  return (out.join('\n'));}  

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

function tabDecompress(str){
  var out=('*|,e|,B|,G|,D|,A|,E|').split(',');
  pos=0;//position
  var bar;
  var arr=str.split('@');
  var key=arr[0];//strip the key data points
  var count=arr[1];
  var div = arr[2];
  var chr = arr[3];
  var space="-";
  var play="";
  var clk;
  var notes;
  var barCheck;
  for(a=1;a<chr;a++){space=space+" ";}//get space
  arr.splice(0,4);//get rid of info string
  alert("TAB DECOMPRESS IS DEPRICATED\n"+arr.join('@'));
  bar=count*div;
  alert("Length: "+arr.length);
  var strng="";
  for(a=1;a<7;a++){
    for(j=0;j<arr.length+1;j++){
      play=space;
      if (arr[j]!==undefined & arr[j]!=="") {//valid click
        clk=arr[j].split("|");          //alert (clk);
        for(w=0;w<clk.length;w++){
          notes=clk[w].split(';');
          //alert("PLAY :"+play + "\nPOSITION\nSTRING: "+a+"\nBAR: "+b+"\nCLICK: "+c+"\narr["+pos+"]:"+arr[pos]+"\nnotes[0]:"+notes[0]+"\nnotes[1]:"+notes[1]);
          //alert(a +" " +notes[0]+"  "+notes[1])
          if (notes[0]==a){
            play=notes[1];
            while(play.length<chr){play=play+" ";}}}}
      out[a]= out[a]+play;
      if((j+1)/bar===parseInt((j+1)/bar,10)){out[a]=out[a]+"|";}}} 
  document.getElementById('editLOOPtab').value=out.join('\n');}  

function tabNew(){
  var arrStrings='e|,B|,G|,D|,A|,E|'.split(',');
  var bar=document.getElementById('bars').value;
  var bea=document.getElementById('beat').value;
  var div=document.getElementById('divs').value;
  var spa=document.getElementById('chrs').value;
  var tab=tabSkeleton(bar,bea,div,spa);
  document.getElementById('editLOOPtab').value=tab;}
  
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

/*function notify(str){
  NOTIFY="NOTIFY:\n"+(str)+"\n";
  dis('notifyBar','block');}
  
function notifyClear(){  
  alert(NOTIFY);
  NOTIFY="";
  dis('notifyBar','none');}
*/

function saveTab(){
  prompt("Save the Tab to your file at BAR ",0)
}


//valid xml chord forms
function chordCheck(chord){
for (j=0;j<arrValidChords.length;j++){
  if (chrd==arrValidChords[j]) 
    {alert(arrValidChords[j]+" VALID!")
    return(str);}
  alert(arrValidChords[j]+" INVALID!")}}
  
function fifthsGet(key){//use the circle of fifths to determine the key by the number of #(1) or b's(-1)
  var f=0
  var j;
  for (j=0;j<12;j++){
    if (ARRkeys[j].split(';')[0]==key) {f=ARRkeys[j].split(';')[1]}}
  return(f)}

function arrMeasures(){//create an array of measures containing chords with no spaces  //used to create MUSICxml files
  var j;
  var str=""
  for (j=1;j<ARRlines.length;j++){
    if (lineType(ARRlines[j])=='chord') {
      str=str+(ARRlines[j].replace(/\s/g, ''))}}
    //if (lineType(ARRlines[j])=='header'){//trying to get the headers
    //  str=str+"|"+ARRlines[j].substring(0,12)}}
  str=str.split('|').join(",")
  ARRmeasures=str.split(',');
  ARRmeasures.splice(0,1);//alert(ARRmeasures)
  }//get rid of first element

function outBIAB(txt,meas){ //works with txt and measure number to create a <measure in MusicXML>
  var j;
  var text=""
  var temp='C';
  var out;
  var kind='';
  var alter='';//move from the key (used for # & b)
  var x;
  var os=1
  var offset// Calculated from MusicXML
var xmlDur=document.getElementById('xmlDuration').value
  out="\n\t<measure number=\""+parseInt(meas+1)+"\">"   //\n\t<harmony>\n\t\t"
  if(meas==0){
    out= out+"\n\t\t<sound tempo=\""+BPM+"\"/>"
    out=out+"\n\t\t<attributes>"
    out=out+"\n\t\t\t<divisions>120</divisions>"
    out=out+"\n\t\t\t<key>\n\t\t\t\t<fifths>"+fifthsGet(KEY)+"</fifths>"
    out=out+"\n\t\t\t\t<mode>major</mode>"//could go for minor key here but would need to fix player
    out=out+"\n\t\t\t\t</key>"
    out=out+"\n\t\t\t<time>"
    out=out+"\n\t\t\t\t<beats>"+BEATS+"</beats>"
    out=out+"\n\t\t\t\t<beat-type>4</beat-type>"
    out=out+"\n\t\t\t\t</time>"
    out=out+"\n\t\t\t<staves>2</staves>"
    out=out+"\n\t\t\t<clef number=\"1\">"
    out=out+"\n\t\t\t\t<sign>G</sign>"
    out=out+"\n\t\t\t\t<line>2</line>"
    out=out+"\n\t\t\t\t</clef>"
    out=out+"\n\t\t\t<clef number=\"2\">"
    out=out+"\n\t\t\t\t<sign>F</sign>"
    out=out+"\n\t\t\t\t<line>4</line>"
    out=out+"\n\t\t\t\t</clef>"
    out=out+"\n\t\t\t</attributes>"
    out=out+"\n\t\t<forward>"
    out=out+"\n\t\t\t<duration>"+xmlDur+"</duration>"
    out=out+"\n\t\t\t</forward>"}
  var arrDivs=txt.split("~")
  var os=parseInt(DIVISIONS/arrDivs.length);//alert(os)
  for(j=0;j<arrDivs.length;j++){
    offset="\n\t\t<offset>"+parseInt(os*j)+"</offset>"
    if (j==0) {offset="";}
    temp=arrDivs[j];
    if (temp===null|temp===''|temp===undefined|temp==="%") {temp =CHORDlast}
    CHORDlast=temp;
  //handle the bass in work
    var bassline='';//alert(bassline);
    var bass=temp.split('/');//[1];alert(bass);
    var alt=undefined;
    temp=bass[0];//strip the chord from the bass  
    if(bass[1]!==undefined) {
      bassline="\t\t\t<bass>\n\t\t\t\t<bass-step>"+bass[1].substring(0,1)+"</bass-step>"
      if (bass[1].length===2){
        alt=bass[1].substring(1)
        if(alt==='#'){alt=1}
        if(alt==='b'){alt=-1}
        if (alt===1|alt===-1){bassline=bassline+"\n\t\t\t\t<bass-alter>"+alt+"</bass-alter>"}}
      bassline=bassline+"\n\t\t\t\t</bass>"}
    //Get the root,(first chr)=============================================================
    root=temp.substring(0,1)
    alter=''; kind='';
    var rootStep='\n\t\t\t\t<root-step>'+root+"</root-step>";//alert(rootStep)
    if (temp.length==1){
      kind='major'}
    else{
      temp=temp.substring(1);//Strip the root check for alter (i.e. # or b)=================
      if (temp.substring(0,1)=='b') {alter=-1;}
      if (temp.substring(0,1)=='#') {alter=1}
      if (alter!==''){
        alter="\n\t\t\t\t<root-alter>"+alter+"</root-alter>";//alert(alter);
        temp=temp.substring(1);}//Strip the alter
      if (temp.length==1){  
        if (temp=='m') {kind='minor';}
        else if (temp=='6'){kind='major-sixth';}
        else if (temp=='7'){kind='dominant'}
        else if (temp=='2'){kind='suspended-second'}
        else{kind='unknown';}}
      else if (temp.length==2){
        if (temp=='m6') {kind='minor-sixth'}
        else if (temp=='m7') {kind='minor-seventh'}
        else {kind='unknown'}}
      else if (temp.length==3){
        if (temp=='dim') {kind='diminished-seventh'}
        else if (temp=='sus') {kind='suspended-fourth'}
        else if (temp=='aug') {kind='augmented'}
        else {kind="???"}}
      else if (temp.length==4){
        if (temp=='maj7') {kind="major-seventh"}//somehow this misses XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        if (temp=='sus2') {temp=2;kind="suspended-second"}
        if (temp=='sus4') {temp='sus';kind='suspended-fourth'}
        //if (temp=='7sus') {kind="seventh-suspended-fourth"}
        else {kind='unknown'}}
      else if (temp.length==5){
        if (temp=='7sus4') {kind="seventh suspended-fourth"}
        else {kind='unknown'}}
      else {kind="???"}}
    if (kind=='major') {temp="-"}
    TEST=TEST + meas +"      "+root +"    "+temp+"     " +kind+"\n"
    if (kind =='major') {kind ="\n\t\t\t<kind>major</kind>"} 
    else if (kind!='') {kind="\n\t\t\t<kind text=\""+temp+"\">"+kind+"</kind>"}          //{kind="\n\t\t\t\t<kind text=\""+temp+"\">"+kind+"</kind>"}}
    

//var bassline="XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
/* */ 
 if (bassline.length>0){kind=kind+"\n"+bassline;}
 
    
    out=out+"\n\t\t<harmony>\n\t\t\t<root>"+rootStep+alter+"\n\t\t\t\t</root>"+kind+offset+"\n\t\t\t</harmony>"}
  out=out+"\n\t\t</measure>" 
  return(out);}

function createXML(){
  arrMeasures();//creates ARRmeasures
  
  var j=0;
  //prep=================================================================
  var str="<?xml version=\"1.0\" encoding=\"UTF-8\"?><!--Test for blanks  -->"
  str= str+"\n<!DOCTYPE score-partwise PUBLIC \"-//Recordare//DTD MusicXML 3.0 Partwise//EN\""
  str= str+"\n\"http://www.musicxml.org/dtds/partwise.dtd\">"
  str= str+"\n<score-partwise version='3.0'>"
  str= str+"\n<work>\n\t<work-title>"+TITLE+"</work-title>\n\t</work>"
  str= str+"\n<identification>"
  str= str+"\n\t<encoding>"
  str= str+"\n\t\t<encoding-date>2019-01-06</encoding-date>"
  str= str+"\n\t\t<software>FredCode</software>"
  str= str+"\n\t\t<encoding-description>For Band-in-a-Box for Windows / MusicXML 3.0</encoding-description>"
  str= str+"\n\t\t</encoding>"
  str= str+"\n\t</identification>"
  //part list...
  str= str+"\n<part-list>\n\t<score-part id=\"P1\">\n\t\t<part-name>Guitar</part-name>\n\t\t</score-part>\n\t</part-list>\n<part id=\"P1\">"
  TEST="Measure >  Root  >  Desc >   Text\n"
  for (j=0;j<ARRmeasures.length;j++){
      str= str+outBIAB(ARRmeasures[j],j)}
  str= str+"\n\t\t</part>\n\t</score-partwise>"
//clear null&blank lines====================
  var crap="";
  var arrTemp=str.split('/n');
  crap="";
  str=""
  for(j=0;j<arrTemp.length;j++){
  if (arrTemp[j].length>0) {crap=crap+arrTemp[j]+'/n'}
    crap=crap.substr(0,crap.length-2)}
  document.getElementById('xml').value=crap;}

function showXLM(){
  createXML()
  dis('xmlTop')
  dis('xmlTools',document.getElementById('xmlTop').style.display.value)}
 
function extractChords(){
  var op=document.getElementById('open').value;
  var cl=document.getElementById('close').value;
  var arrTemp = document.getElementById("rawTune").value.split("\n");
  var arr="".split(',')
  var j=0;
  var k=0;
  var chr=""
  var chordLine="";
  var lyricLine="";
  var sw="L";
  var workLine=""
  while (j<arrTemp.length){
  workLine=arrTemp[j];
    chordLine="";
    lyricLine="";
    k=0;
      while(k<workLine.length){
        chr=workLine.substring(k ,k+1);
        if (chr==op) {sw="C";}
        else if (chr==cl) {sw="L";chordLine=chordLine+"   "}
        else if (sw=="C") {chordLine=chordLine+chr}
        else if (sw=="L") {lyricLine=lyricLine+chr;}
        k=k+1}
      if (chordLine.length>0) {arr.push(chordLine);}
      if (lyricLine.length>0) {arr.push(lyricLine);}
    j=j+1}
  //alert(arr)
  document.getElementById("rawTune").value = arr.join("\n");}

function directCopy(str){//Copy to Clipboard...based on https://stackoverflow.com/a/12693636
    statusMsg('Copy to Clipboard',0)
    document.oncopy = function(event) {
        event.clipboardData.setData("Text", str);
        event.preventDefault();};
    document.execCommand("Copy");
    document.oncopy = undefined;}
    
function getTempo(){
  var d = new Date();
  TEMPOtime=d.getTime();
  if (TEMPOtime -TEMPOtimeLast>2000){//reset if over 2 sec
    TEMPO=1000; TEMPOcount=0;
    TEMPOtimeLast=TEMPOtime;
    TEMPOstart= TEMPOtime;
    document.getElementById('tempoGetter').innerHTML='TEMPO TOOL';}
  else{  
    TEMPOtime=d.getTime();
    TEMPOcount=TEMPOcount+1;
    var t=(TEMPOtime-TEMPOstart)/60000;
    TEMPO=parseInt(TEMPOcount/t,10);
    document.getElementById('tempoGetter').innerHTML=TEMPO+" bpm:  (" +parseInt(t*60,10)+"sec Sample)";//}
    TEMPOtimeLast=TEMPOtime;} }

function XXXXX(){alert(TEMP);}

function textbox(){
  var ctl = document.getElementById('rawTune');
  var startPos = ctl.selectionStart;
  var endPos = ctl.selectionEnd;
  alert(startPos + ", " + endPos);}

function typeInTextarea(el, newText){
  el=document.getElementById('rawTune');
  var start = el.selectionStart;
  var end = el.selectionEnd;
  var text = el.value;
  var before = text.substring(0, start);
  var after  = text.substring(end, text.length);
  el.value = (before + newText + after);
  el.selectionStart = el.selectionEnd = start + newText.length;
  el.focus();}

function formatStrat(){
    var str="@@@<x9>"+document.getElementById('nme').value+"</x9><x4>"+document.getElementById('pedal').value+"</x4><x14>"+document.getElementById('switch').value+"</x14><x11>"+document.getElementById('vol').value+"</x11><x12> "+document.getElementById('ta').value+" "+document.getElementById('tb').value+"</x12>";
    document.getElementById('stctrl').value =str;
    document.getElementById('strpic').innerHTML =str;}

function stratCtrls(){   
  var str ;
  var j=1;
  var ten="<option value=' 1'>1</option><option value=' 2'>2</option><option value=' 3'>3</option><option value=' 4'>4";
          ten =ten+"</option><option value=' 5'>5</option><option value=' 6'>6</option><option value=' 7'>7</option><option value=' 8'>8";
          ten =ten+"</option><option value=' 9'>9</option></option><option value='10'>10</option>";
  str="<pre><form onChange='formatStrat()'>STRATOCASTER CONTROLS...<br>";
  str=str+"<br>     NAME <input id ='nme' style='width:10vw';><br>";
  str=str+"   PEDAL  <select id ='pedal' onChange='(alert (document.getElementById(1).value))' style= 'width:3vw'>";
      while (j<40) {str=str+"<option value='"+j+"'>"+j+"</option>";j=j+1;}
      str = str+"</select>";
  str=str+"<br>   SWITCH <select id ='switch' onChange='(alert (document.getElementById(1).value))' style= 'width:7vw'>";
          str=str+"<option value='oooox'>1 oooox</option>";
          str=str+"<option value='oooxo'>2 oooxo</option>";
          str=str+"<option value='ooxoo'>3 ooxoo</option>";
          str=str+"<option value='oxooo'>4 oxooo</option>";
          str=str+"<option value='xoooo'>5 xoooo</option>";
      str = str+"</select>";
  str=str+"<br>   VOLUME <select id ='vol' onChange='(alert (document.getElementById(1).value))' style= 'width:7vw'>";
      str = str+ten;
      str = str+"</select>";
  str=str+"<br>   TONE A <select id ='tb' onChange='(alert (document.getElementById(1).value))' style= 'width:7vw'>";
      str = str+ten;
      str = str+"</select>";
  str=str+"<br>   TONE B <select id ='ta' onChange='(alert (document.getElementById(1).value))' style= 'width:7vw'>";
      str = str+ten;
      str = str+"</select>";
  str=str+"<br> <input id ='stctrl' style='width:50vw';><br>";    
  str=str+"</form>";
  str=str+"<br>Paste string below into your text, it will appear as a technical note";
  str=str+"<div id='strpic'>String appears here....</div>";
  str=str+"</pre>";
  document.getElementById('floater').innerHTML=str;
  dis('floater');}

//* COMMON FUNCTIONS==============================================================
function dis(id,disp){//alert(disp)
    if (disp===undefined){
            if (document.getElementById(id).style.display == NONE){
                document.getElementById(id).style.display='block';}
            else{document.getElementById(id).style.display=NONE;}}
        else{
            if (disp=='none') {
                document.getElementById(id).style.display = NONE;}
            else{document.getElementById(id).style.display = 'block' ;}}}

function decodeFredComponent(str){//alert("D")//decodes problem char (?,@)
  str=str.split("QMARK");
  str=str.join("?");
  str=str.split("AMARK");
  str=str.join("@");        
  return str;} 

function receiveARR(divider){//decode array and leading elements (put in receiving page)
    return decodeURIComponent(decodeFredComponent(window.name)).split(divider);}  

function restoreBackup(){
  if(confirm("RESTORE THE DOCUMENT TO THE LAST SAVE ATTEMPT?")===true){
    document.getElementById("rawTune").value =EDITbaseLine;}}
    
//*BOOT FUNCTIONS ===================================================================================================
//All in sequence with breaks between sub routines

function listOfTunes(){//Get a list of ALL TUNES to select from
   TUNElist = "";
   var request = new XMLHttpRequest();
   path ="../Sets/ALL TUNES.txt";
   request.open("GET", path, false);
   request.send(null);
   var content = request.responseText;
   TUNElist = content.split("\n");
   var lst ="<select id='mySet' onchange='addTune(this.value)' style='width:30vw'><br>optgroup>";
   j =0;
   while (j < TUNElist.length){ 
     lst =lst +"\n<option>"+ TUNElist[j] +"</option>";
     j = j+1;}
   lst =lst +"\n</optgroup></Select>";
   document.getElementById("tuneList").innerHTML=lst;} //makes the tune list should be named tune or selected tune

function addTune(title){
  var path ="../text/" + title + ".txt";  //^ get the text file
  var request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  TEMP = request.responseText;
  createARRlines()}

window.onload = function(){
  listOfTunes();
  statusMsg("Initiating javascript...",'yellow');
  selectorFromArray(ARRvalidChords,'goodChords');
    document.getElementById("rawTune").value ="?"; //"Paste tune, compose one or, load one from your computer...";
    //NONE =document.getElementById('none').style.display;//^  create object check if its necessary
    var osName="Unknown OS";//check OS
    if (navigator.appVersion.indexOf("Win")!=-1) osName="Windows";
    else if (navigator.appVersion.indexOf("Mac")!=-1) osName="MacOS";
    else if (navigator.appVersion.indexOf("X11")!=-1) osName="UNIX";
    else if (navigator.appVersion.indexOf("Linux")!=-1) osName="Android/Linux";
    if (osName != "Windows") {alert("Editor has not been successfully tested on "+osName +"\n===================\n Your system is \n"+navigator.appVersion );}
    var x = (decodeURIComponent(window.location.toString())).split("?"); //works
    statusMsg('checking for a passed song...');
    TEMP=receiveARR();
    if (TEMP ===""|TEMP===undefined){
      statusMsg('Select select a local file or paste in text','yellow');}
    else{   
      statusMsg("Text Loaded...");
      createARRlines();}};
          
function createARRlines(){//Make ARRlines, from the text file,update the edit screen  //G
  statusMsg("Creating an Array for "+ TITLE);
  ARRlines ="";
  while (TEMP.indexOf("\r") >= 0)//get rid of linefeeds
  TEMP = TEMP.replace("\r", "");
  ARRlines = TEMP.split("\n");//make an array of lines
  document.getElementById("rawTune").value = ARRlines.join("\n");
  firstLineGlobal('txt');} //sets up control values and set the TITLE

function firstLineGlobal(type){//upadates 1st line in 3 places based on which one you specify as source...txt,arr,con,pre (Text, Array,Controls or Preliminary)
  //set up a default
  statusMsg ("Establishing Song's Default Properties...");
  var t =TITLE;
  var d =150;
  var bp=120;
  var b =4;
  var k ="C";
  var q ="Raw";
  var a ="Unknown";
  var g ="Unknown";
  var s ="Unknown";
  var y ="Unknown";
  var line ="";
  var arrTemp ="";
  //probably never uses the array since it was only used during to export
  if (type == 'arr' &&  lineType(ARRlines[0])=='hash'){//if type is array and hash exists
    statusMsg("Evaluating Array...");
    t = toTitleCase(hash(ARRlines[0],"TITLE",t));
    d = hash(ARRlines[0],"DUR",d);
    bp= hash(ARRlines[0],"BPM",bp);
    b = hash(ARRlines[0],"BEATS",b);
    k = hash(ARRlines[0],"KEY",k);
    q = toTitleCase(hash(ARRlines[0],"QUAL",q));
    a = toTitleCase(hash(ARRlines[0],"ARTIST",a));
    s = hash(ARRlines[0],"STYLE",s);
    g = hash(ARRlines[0],"GENRE",g);
    y= hash(ARRlines[0],"HITyear",y);}
  else if (type =="txt"){//read first line if its a hash use it
    statusMsg("Evaluating raw text...");
    arrTemp = "";
    arrTemp = document.getElementById("rawTune").value.split("\n");
    line =(arrTemp[0]);//XXX
    if (lineType(line) =='hash'){
      t= toTitleCase(hash(line,"TITLE",t)); 
      d= hash(line,"DUR",d);
      bp=hash(line,"BPM",bp);
      b= hash(line,"BEATS",b);
      k= toTitleCase(hash(line,"KEY",k));
      q=toTitleCase(hash(line,"QUAL",q));
      a=toTitleCase(hash(line,"ARTIST",a));
      g=hash(line,"GENRE",g);
      s= hash(line,"STYLE",s);               
      y= hash(line,"HITyear",y); 
      arrTemp ="";}}       
  else if (type =="con"){   
    t=toTitleCase(document.getElementById("Title").value);
    d=document.getElementById("duration").value;
    bp=document.getElementById("Tempo").value;
    b=document.getElementById("sigOpt").value;
    k=document.getElementById("Key").value;
    q=toTitleCase(document.getElementById("Qual").value);
    a=toTitleCase(document.getElementById("Artist").value) ;
    g=(document.getElementById("Genre").value) ;
    s=(document.getElementById("Style").value) ;
    y=(document.getElementById("year").value) ;}
    statusMsg("Evaluating controls...");
  //part 2 update the controls, array and text
  lineUp= "TITLE:"+ t + ",DUR:"+ d +",BPM:"+ bp +",BEATS:" + b + ",KEY:" + k + ",QUAL:" + q + ",ARTIST:" + a  + ",GENRE:" + g + ",STYLE:" + s + ",HITyear:" + y;
  TITLE = t;//set the title
  BEATS=b;
  BPM=bp;
  KEY=k;
  document.getElementById("title").innerHTML =TITLE;
  //update the controls
  statusMsg("Updating controls...");
  document.getElementById("Title").value=t;
  document.getElementById("duration").value=d;
  document.getElementById("Tempo").value=bp;
  document.getElementById("sigOpt").value=b;
  document.getElementById("Key").value=k;
  document.getElementById("Qual").value=q;
  document.getElementById("Artist").value=a;
  document.getElementById("Genre").value=g;
  document.getElementById("Style").value=s;
  document.getElementById("year").value=y;
  //update Array
  statusMsg("Updating Array...");
  if (ARRlines ==="") {ARRlines ="X\n".split("\n");}//put in a bogus line for a blank text field
  if (lineType(ARRlines[0]) =='hash'){ARRlines[0]=lineUp;}
  else{ ARRlines.unshift(lineUp);}
  //Update the rawTune first line only
  statusMsg("Updating Text...");
  arrTemp = "";
  arrTemp = document.getElementById("rawTune").value.split("\n");
  line = arrTemp[0];
  if (lineType(line) =='hash'){arrTemp[0]=lineUp;}
  else{ arrTemp.unshift(lineUp);}
  document.getElementById("rawTune").value = arrTemp.join("\n");
  arrTemp ="";
  //Update the rawTune first line only
  statusMsg("Song Properties Established");
  //alert(1);
  if(type!=="con"){finale();}}
  
 
function finale(){
  var content = document.getElementById('rawTune').value;
  statusMsg("Counting Bars...");
  countBARS()
  statusMsg(TITLE +": Loaded...");
  loadMP3();
  updateDur();
  chordList();
  EDITbaseLine = document.getElementById("rawTune").value;
  EDITwarning ='false';
  sentinel();
  statusMsg( "Edit Ready...");}

//*Misc Functions
function sentinel(){  //watch for change in rawTune //true false T & F
  if (EDITbaseLine!==document.getElementById('rawTune').value){
    EDITwarning='true';
    document.getElementById("iconSave").src ='../../Icons/redSave.png';
    document.getElementById("iconRestore").style.display = 'block';}
  else{
    EDITwarning='false';
    document.getElementById("iconSave").src ='../../Icons/blackSave.png';
    document.getElementById("iconRestore").style.display = 'none';}
  TIMEOUTsent=setTimeout(function(){sentinel();},5000);}  

function loadMP3(){
  document.getElementById('Audio1').src = "../Backing/"+TITLE+".mp3";//as soon as possible
  statusMsg(TITLE + ": Loading audio");
  var x = setTimeout(function(){//time to get the mp3 [arbitrary]
    DURmp3=document.getElementById('Audio1').duration;
    clearTimeout(x);
    },1000);//time to load mp3
  statusMsg("Edit Ready...");}

//FILE FUNCTIONS===================================================================================================

function setUpListener(){ document.getElementById('fileinput').addEventListener('change', loadFile, false); }

function loadFile(e){
  readSingleFile(e); //gets the file//does not update the player until you go there
  createARRlines(document.getElementById("rawTune").value);}//setTimeout(function(){firstLineGlobal("txt");},1000);//too fast and it gets missed...

function readSingleFile(e){
  statusMsg('Reading file');
  var file = e.target.files[0];
  if (!file){ alert("No Valid File...");return;}//incase no file
  var reader = new FileReader();
  reader.onload = function(e){
    document.getElementById("rawTune").value = e.target.result;//is program specific
    TITLE = (file.name.substring(0,(file.name.length)-4));
    //setTimeout(function(){firstLineGlobal("txt");},1000);//too fast and it gets missed...
    createARRlines(document.getElementById("rawTune").value);};
  reader.readAsText(file);}

function saveTextAsFile(fileName,textAreaID){   // grab the content of the form field and place it into a text area
  
  
  var textToWrite = document.getElementById(textAreaID).value;
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
  EDITbaseLine = document.getElementById("rawTune").value;}

function destroyClickedElement(event){document.body.removeChild(event.target);}// remove the link from the DOM

//*MORE misc=======================================================================
function tgl(vrbl,val){
  if (!val){
    if (window[vrbl]=='true'){window[vrbl]='false';}
    else{window[vrbl]='true';}}
  else{
    window[vrbl]=val;}
  if (window[vrbl]== 'true'){document.getElementById("img"+vrbl).src ="../../Icons/toggleOn.png";}
  else{
    document.getElementById("img"+vrbl).src ="../../Icons/toggleOFF.png";}}

//*GLOBAL FUNCTIONS Used from any screen ===================================================================================================
function fileFromPath(path) {path = path.split('/');return (path[path.length-1]);}
    
function xxxstatusMsg(msg,color){ //xxx get from player
    if (!color) {color ='white';}
    var dog = document.getElementById("msg2");
    dog.innerHTML = msg;
    dog.style.background = color;}    

function secToMin(sec){
  var m =parseInt((sec/60),10);
  var s =parseInt(parseFloat((sec/60)-parseInt(sec/60,10))*60,10);
  if (s < 10) {s = ":0" + s;}
  else{s = ":" + s;}
  return m+s;} 

function hash(hashString,key,defaultVal){//Gets hash values from string a:b,c:d,e:f,......
  var arrHash = (hashString.split(",")); // an array from hashString   
  var i=0;
  while (i < arrHash.length){
    var ele=(arrHash[i].split(":"));//Hash4 an array of the first element of Hash3
    if(ele[0] == key){
        defaultVal = ele[1];
        i = arrHash.length;} //kick you out must be a better way
    i++;}
  return defaultVal;}

//TRANSPOSE FUNCTIONS===================================================================================================
  
 function lineTranspose2(line,steps)//transpose entire line and try to keep the absolute chord spacing despite differnces in chr of new chord
    {   
        var lineNew;
        if (steps===0)
        {
            lineNew = line;
        }
        else
        {   //set up constants
            var chordNew ="";
            var chord =""; //where chrs are collected until a space ends the chord
            var adj = 0;  //how the length of the new line compares to old (- shorter  + longer) so spaces can be added (ex 3 would mean new line is 3 chr to long and 3 spaces should be take out asap)
            lineNew= "";
            var n=0;
            while (n < line.length)//step through the lineki
            {  
                if (line[n]==" ")
                {
                    if (chord.length ===0)//not working a chord so work space
                    {
                        if (adj > 0)
                        {
                            adj = parseInt(adj -1,10);//dont add the space and take adjustment down one...
                        }
                        else
                        {
                            lineNew = lineNew + " ";
                        }
                    }
                    else //closing a chord with the space
                    {
                        chordNew = chordTranspose2(chord,steps);
                        adj = adj + (chordNew.length - chord.length);//set adjustment
                        if (adj < 0)
                        {
                            while(adj < 0)
                            {
                                adj = adj+1;
                                chordNew = chordNew +" ";
                            }
                        }
                        lineNew = lineNew + chordNew  + " ";
                        chord ="";//reset for another chord
                        chordNew ="";
                    }
                }
                else
                {
                    chord = chord + line[n];
                    if (n==line.length-1)//end of the line but no space to change
                    {
                        lineNew = lineNew + chordTranspose2(chord, steps);
                    }
                }
            n=n+1;
            }
        }
    return lineNew;
    }
   
function chordTranspose2(chord,steps)
    {   var chordNew ="";
        if (steps===0)
        {
            chordNew = chord;
        }
        else
        {
            var n=0;
            chord = chord.replace(/A#/g,"Bb");//purge odd chords
            chord = chord.replace(/B#/g,"C"); 
            chord = chord.replace(/Cb/g,"B");
            chord = chord.replace(/Db/g,"C#");
            chord = chord.replace(/D#/g,"Eb");
            chord = chord.replace(/Fb/g,"E");
            chord = chord.replace(/E#/g,"F");
            chord = chord.replace(/Gb/g,"F#");
            chord = chord.replace(/G#/g,"Ab");
            for (n=0; n < chord.length;)
            {
                var advance =1;
                if (chord[n]=="A"|chord[n]=="B"|chord[n]=="C"|chord[n]=="D"|chord[n]=="E"|chord[n]=="F"|chord[n]=="G")
                {
                    if (n < chord.length-1 &&(chord[n+1]=="#"|chord[n+1]=="b"))//if not at the end of the chord check for next part of note
                    {
                    chordNew = chordNew + noteTranspose2(chord[n]+chord[n+1],steps);
                    advance =2;  //increment the count since you used 2 chrs
                    }
                    else
                    {
                    chordNew = chordNew+ noteTranspose2(chord[n],steps);
                    }
                }
                else
                {
                     chordNew = chordNew+chord[n];
                }
            n = n+advance;
            }
        } 
        return chordNew;
    } 

function noteTranspose2(note,steps)//must be sure to add # or b beforce calling the routine  
    {   var noteNew = "?";
        var scale = "A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab,A,Bb,B,C,C#,D,Eb,E,F,F#,G,Ab"; 
        var arrScale=scale.split(",");  //make array
        note = note.replace(/A#/g,"Bb");
        note = note.replace(/B#/g,"C"); 
        note = note.replace(/Cb/g,"B");
        note = note.replace(/Db/g,"C#");
        note = note.replace(/D#/g,"Eb");
        note = note.replace(/Fb/g,"E");
        note = note.replace(/E#/g,"F");
        note = note.replace(/Gb/g,"F#");
        note = note.replace(/G#/g,"Ab");
        // get the position of the first letter starting at 13 and work up
        for (i = 13; i < 38; i++)
        {
            if (arrScale[i] == note){break;}//get the current note position
        }
        noteNew = arrScale[i+steps];
        return noteNew;
    }
//NAVIGATION FUNCTIONS ===================================================================================================

function research(){window.open(encodeURI("research.html?"+encodeFredComponent(TITLE)));}

function  passARR(pageName,arr,divider,leadingElements){
  //take data, array or string and pass to another page
  //if its an array it you must use a divider (i.e. '\n')
  //Add any other elements
  var pf;
  if(Array.isArray(arr)===true){pf=arr.join(divider);}else{pf=arr;}
  if (leadingElements!==null){pf=leadingElements+divider+pf;}
  window.open(pageName,encodeURI(encodeFredComponent(pf)));}

function home(){window.open("index.html");}

function send(){
  alert ("does not work yet...");//var link = "mailto:fkaparich@gmail.com?subject="+TITLE+"&body="+document.getElementById('rawTune').value; target="_top";
  var link = "mailto:fkaparich@gmail.com?subject="+TITLE+"&body="+ARRlines.join('\n'); target="_top";
  alert(link);
  window.location.href = link;}
  
function multiFunc(){
  var ico = fileFromPath(document.getElementById('statusIcon').src);
  if (ico =="blue_print.png"){
    var head ="<!DOCTYPE html><html><head><title>"+TITLE.toUpperCase()+" {Print}</title><style>Body{font-size : 3.4vw; margin :0vh; padding: 0; font-family:Lucida Console;font-weight:bold;line-height:100%;text-align:Left;background-color:white;}X2{color:red;} X3{background-color:lightgrey} X4{color:red} X5{color:white;background-color:darkgrey} X6{background-color:lightgrey}X7{background-color:white}</style></head>";
    var iframe = document.getElementById("Tune");
    var iframe_contents = iframe.contentDocument.body.outerHTML;
    var newWindow = window.open(scrollbars=1);
    newWindow .document.open();
    newWindow .document.write(head+"<center>"+TITLE.toUpperCase() +"</center>"+iframe_contents);
    newWindow .document.close();
    newWindow.print();}}

function clearScreen(){
  var a =window.location.href.split('?');
  document.getElementById('iconClear').style.visibility ="hidden";
  statusMsg( 'Clearing Screen...');
  window.location = a[0];}

//ANALYSIS FUNCTIONS===================================================================================================
//perform general functions and can be adapted to different screens 
function lyricLineCount()
    {   var count =0;
        var i=0;
        while (i < ARRlines.length)
        {
            if (lineType(ARRlines[i])== "lyric"){count =count+1;}
            i = i+1;
        }    
        return count;
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
            var beats = document.getElementById("sigOpt").value;
            var bpm = parseInt(beats * 4 * 60000/(finishTime-TIMERstart),10);   
            document.getElementById("butBpmTool").innerHTML= "BPM: " + bpm; 
            TIMERstart =0;
        }
    }

//SINGLE LINE FUNCTIONS===================================================================================================
function rTrim(str) {
  while (str.substring(str.length - 1) == " ") {
    str = str.substring(0, str.length - 1);
  }
  return str;
}
    
function lTrim(str) {
  while (str.substring(0, 1) == " ") {
    str = str.substring(1, str.length);
  }
  return str;
}

function isHeader(str) //look for header string reguardless of case
{
  var ans = 'false';
  var flag = (str.substring(0, 5).toUpperCase());
  if (flag == "VERSE" | flag == "#VERS" | flag == "CHORU" | flag == "#CHOR" | flag == "BREAK" | flag == "#BREA" | flag == "INTRO" | flag == "#INTR" | flag == "OUTRO" | flag == "#OUTR" | flag == "#BRIDG" | flag == "#BRID" | flag == "#TURN " | flag == "#TURN"| flag == "INTER " | flag == "#INTE") {
    ans = 'true';
  }
  return ans;
}  

function chordMaybe(str)
    { //looks for 50% open space to see if its a chord line (true or false) and line less than 4 chr long
        ans = 'false';
        var key =str.substring(0,1);
        if (key !=="#"& key !=="$"& key !=="@"){
            if (parseFloat(str.length/countChr(str," "))<2) {ans ='true';}
            if (str.length<4) {ans ='true';}}
        return ans;}

function countChr(str,chr){//counts chr in a line
    var i = 0;
    var count =0;
    while (i<str.length)
    {
        if(str[i]==chr){count = count+1;} 
        i = i+1;
    }
    return count;}

//EDIT ZONE ===================================================================================================

function countBars(){
    var j =0;BARS=0;BARSperLine=0;
    while(j < ARRlines.length){// go through the array 
        var line = ARRlines[j];
        if (lineType(line)=='chord'){   
            var count = countChr(line,"|");
            if (BARS===0) {BARSperLine=count;}//get the std number of bars from the first line
            BARS = BARS + count;}//^ total the |'s 
        j=j+1;}}


function StepThroughArray(funk, v1, v2) { //built 10 or more edit functions into a single skeleton here
  //note all work is done in the ARRAY line by line then the display is updated...
  //v1 AND v2 are just there to pass variables
  //alert(funk);
  var tab = 0
  var arr = "";
  var temp = "";
  var newLine = "";
  var barLen = 1;
  countBars()
  longestLine()
  longestLyric()
  FLAG = ""; //used to transfer chords
  var linesChanged = 0; //count of the lines changed
  ARRchords = []; //new array to accumulate chords
  ARRnew = []; //new array to accumulate rebuild of entire arr lines
  var flagARRnew = 'false'; //so you know you built a new array
  var str;
  var j = 0;
  var t = 0;
  var c = 1;
  upDateArray(); //set ARRlines to match rawTune
  while (j < ARRlines.length) {
    t = 0;
    str = ARRlines[j];
    str=rTrim(str)
    var lType = lineType(str);
    var oldLine = str; //to compare at the end to log a line change

    if (funk == "usePct" && lType == 'chord') { //clean up the bars
      ARRlines[j] = XXXX(str);
    }
    
    if (funk == "cleanBars" && lType == 'chord') { //clean up the bars
      ARRlines[j] = cleanBars(str);
    }else if (funk == "stripLastBar" && lType == 'chord') {
      if (str.substring(str.length-1)=='|') {ARRlines[j] =str.substring(0,str.length-1) }
    }else if (funk == "replace" && lType == document.getElementById('replaceIn').value) { //replace v1 with v2
      var crap = str.split(v1);
      ARRlines[j] = crap.join(v2);
    } else if (funk == "replaceTabs") { //delete Tabs
      ARRlines[j] = str.replace(/\t/g, '   ');
    } //replace with 3 spaces
    else if (funk == "addPartBars" && lType == 'chord') {
      ARRlines[j] = addPartBars(str);
    } else if (funk == "transpose" && lType == 'chord') { //transpose
      ARRlines[j] = lineTranspose2(str, v1);
    } else if (funk == "findChords" && chordMaybe(str) == "true") { //find Chords and bar them
      ARRlines[j] = addBars(str);
    } else if (funk == "deleteBlanks") { //delete blank lines
      flagARRnew = 'true';
      if (ARRlines[j].length > 0) {
        ARRnew.push(ARRlines[j]);
      }
    } else if (funk == "addHeaders") { //breaK AT BLANKS
      if (ARRlines[j].substring(0, 5) == '=====') {
        ARRlines[j] = "VERSE CHORUS BREAK INTERLUDE INTRO OUTRO================================="
      }
    } else if (funk == "tagHeader") { //tag headers # and format
      ARRlines[j] = TagHeader(str);
    } else if (funk == "numberHeaders" && str.substring(0, v1.length) == v1) { //tag headers # and format  
      var newLine = v1 + " " + c + " ";
      while (newLine.length < 41) {
        newLine = newLine + "-";
      }
      ARRlines[j] = newLine;
      c = c + 1;
    } else if (funk == "addBars" && lType == 'chord') { //alert (v1); return
      temp = ARRlines[j].match(/\|/g).length; //alert (temp); return
      str = ARRlines[j];
      for (t = 0; t < v1 - temp; t++) {
        str = str + "  |"
      }
      ARRlines[j] = str
    } else if (funk == "chordTransfer") { //alert (v1);
      chordTransfer(ARRlines[j], v1);
      flagARRnew = 'true';
    } else if (funk == "rTrim") {
      ARRlines[j] = rTrim(ARRlines[j]);
    } else if (funk == "lTrim") {
      ARRlines[j] = lTrim(ARRlines[j]);
    } else if (funk == "titleCase" && lType == 'lyric') {
      ARRlines[j] = toTitleCase(str);
    } else if (funk == "sentCase" && lType == 'lyric') {
      ARRlines[j] = toSentenceCase(str);
    } else if (funk == "clearJunk" && lType !== 'link' && lType !== 'irealb') { //? etc
      ARRlines[j] = (str.split("?")).join(" ");
    } else if (funk == "shrinkText" && lType == 'lyric') {
      ARRlines[j] = (str.split("  ")).join(" ");
    } else if (funk == "spreadText" && lType == 'lyric') {
      temp = ARRlines[j].split(" ").join("  ");
      if (temp.length < LONGLYRIC) {
        ARRlines[j] = temp

    
 //-$   
     } else if (funk == "stringIt") {alert("this function is dead")}
     /*-@ if (j>1) {
        if (ARRlines[j].length==0) {
          CHORDstring=CHORDstring+" ";
        }else{
        CHORDstring=CHORDstring+ARRlines[j]
        }
      }*/
    
    
    } else if (funk == "addChords" && lType == "chord") {
      //alert(ARRlines[j])
      return
    } else if (funk == "spreadChords" && lType == "chord") {
      newLine = ARRlines[j].replace(/\s+/g, '');
      arr = newLine.split('|');
      arr.splice(0, 1); //get rid of first element
      bars = BARSperLine; //use BARSperLine established earlier
      barLen = parseInt(LONGLYRIC / (BARSperLine + 0.25), 10); //determine the length of a bar for big chords
      newLine = "";
      n = 0;
      if (arr.length > bars) {
        barLen = parseInt(barLen * bars / arr.length, 10);
      } //if more than std number of bars
      while (n < arr.length) {
        temp = arr[n];
        while (temp.length <= barLen) {
          temp = temp.replace(/~/g, " ~");
          temp = temp + ' ';
        }
        newLine = newLine + "|" + temp;
        ARRlines[j] = newLine;
        n = n + 1;
      }
    }
    if (lType == 'tab') {
      tab = tab + 1
    };
    j = j + 1;
  }
  if (oldLine !== ARRlines[j]) {
    linesChanged = linesChanged + 1;
  } //accumulate changes  
  if (flagARRnew == 'true') { //if you created a new array...replace ARRlines
    linesChanged = ARRlines.length - ARRnew.length;
    ARRlines = ARRnew;
  }
  var crap = ""
  if (tab > 0) {
    for (k = 1; k <= tab; k++) {
      crap = crap + '<option value=' + k + '>TAB ' + k + '</option>';
    }
    document.getElementById('tabSelect').innerHTML = crap
  }
    if (funk=='stringIt') {
   
   document.getElementById("rawTune").value =CHORDstring
  
  
  }else{
  
  upDateWorkSpace(); //Since work was done on Array change the rawTune to match the array
  }
  statusMsg("Changed " + linesChanged + " of " + j + "  lines.", "yellow");
}

function xcountBARS() {
  var j = 0;
  BARS = 0;
  BARSperLine = 0;
  while (j < ARRlines.length) { // go through the array 
    var line = ARRlines[j];
    if (lineType(line) == 'chord') {
      var count = countChr(line, "|");
      if (BARS === 0) {
        BARSperLine = count;
      } //get the std number of bars from the first line
      BARS = BARS + count;
    } //^ total the |'s 
    j = j + 1;
  }
}

function openTab(num) {
  //alert(num);
  var ans
  var n = 1;
  var i = 0;
  while (i < ARRlines.length) {
    if (lineType(ARRlines[i]) === 'tab') {
      //alert("TAB:"+n+" looking for "+ num)
      if (n === parseInt(num,10)) {
        ans = i
      // alert("Ans:"+ans)
      }
      n = n + 1;
    }
    i++;
  }
  document.getElementById('stringView').value= ARRlines[ans];

}

function countBARS(){
    ARRbars.length=0;
    BARS=0;
    BARShalf=0;
    BARSperLine=0;
    var CHORDlines=0;
    var count=0;
    var typ;
    var sum=0
    var j =0;var k=0//ARRbars="".split(',')
    while(j<ARRlines.length){// go through the array 
        var line = ARRlines[j];
        if(lineType(line)=='chord'){
            CHORDlines=CHORDlines+1;
            for(k=0;k<line.length;k++ ){
                if(line.charAt(k)==="|") {
                    typ=1
                    if (line.charAt(k+1)==="*"){
                        typ =0.5;
                        BARShalf=BARShalf+1}
                    sum=sum+typ;
                    ARRbars.push(sum)
                    BARS=BARS+1;}}}
        j=j+1;}
    MEASURES=(BARS-BARShalf*0.5)
    if(CHORDlines>0){BARSperLine=BARS/CHORDlines;}}

function chordTransfer(str,type){   //works in concert with the main skeleton...
  if (str.substring(0,type.length+4)== "#"+type+" 1 "){   //will only run on first encounter with the '#type 1'
      FLAG= "getChords";//pick up next chord line
      ARRnew.push(str);}
  else if(FLAG == 'getChords' && str.substring(0,1)!== "#" ) {   // pick up of chords from type and set flag to 'giveChords'
      ARRnew.push(str);
      if (lineType(str)=='chord' && FLAG == "getChords"){   
          ARRchords.push(str);}}
          
  else if (str.substring(0,1)== "#"){   
      FLAG = 'none';
      if (str.substring(0,type.length+1)== "#"+type)
      {    
          FLAG = "giveChords";
          FLAG2=0;
      }
      ARRnew.push(str);
  }
  else if(FLAG == 'giveChords')
  {  //if you are giving chords put them between lyrics and skip any chord lines  
      if(lineType(str)=='lyric')
      {
          ARRnew.push(ARRchords[FLAG2]);
          ARRnew.push(str);
          FLAG2 = FLAG2 +1;
          if (FLAG2==ARRchords.length) {FLAG ='none';FLAG2 =0;}
      }
  }    
  else
  {
      ARRnew.push(str);
  }
}



function upDateWorkSpace()//XXX may use firstLineGlobal etc to clean this up
    {//(Use after every update to the array to update edit screen display)
        statusMsg ("Updating workspace...", 'white');
        document.getElementById("rawTune").value = ARRlines.join("\n");
    }
   
function upDateArray(){   //Make an array,ARRlines, of the text file from the rawTune textarea
  var content = document.getElementById("rawTune").value;
  while (content.indexOf("\r") >= 0)
  content = content.replace("\r", "");
  ARRlines = content.split("\n");}//make an array of lines
    

function updateDur(){
  statusMsg("Calculating duration");
  //BARS=0;
  //var n =0;
  //var content = document.getElementById('rawTune').value;
  //while(n<content.length)
  //{if (content[n]=="|"){BARS = BARS +1;}    
  //n =n+1;}
  countBARS()
  DURcalc = parseInt(MEASURES*BEATS*60/BPM,10);
  document.getElementById("duration").value= DURcalc ;
  statusMsg("Lookin for Audio (may not exist");
  DURmp3 =parseInt(document.getElementById('Audio1').duration,10);
  document.getElementById('audDur').value =  DURmp3;
  statusMsg("Duration Calculated" +DURcalc + " seconds");}


function TagHeader(str)//-5 VERSE,INTRO,OUTRO,BREAK,-6 CHORUS,
    {   var tag ="X";
        var fiver = str.substring(0,5).toUpperCase();
        if (fiver == "VERSE"|fiver == "#VERS"){tag = "#VERSE";}
        else if (fiver == "INTRO"|fiver == "#INTR"){tag = "#INTRO";}   
        else if (fiver == "OUTRO"|fiver == "#OUTR"){tag = "#OUTRO";}
        else if (fiver == "BREAK"|fiver == "#BREA"){tag = "#BREAK";}
        else if (fiver == "CHORU"|fiver == "#CHOR"){tag = "#CHORUS";}
        else if (fiver == "BRIDG"|fiver == "#BRID"){tag = "#BRIDGE";}
        else if (fiver == "TURN "|fiver == "#TURN"){tag = "#TURN AROUND";}
        else if (fiver == "INTER"|fiver == "#INTE"){tag = "#INTERLUDE";}
        if (tag!=="X")
            {
                str =  tag + " ";
                while(str.length<41)
                {    
                str = str + "-";
                }
            }
         return str;
    }


function XXcountBARS()
    {
        var j =0;BARS=0;
        while(j < ARRlines.length)//go through the 
        {
            var line = ARRlines[j];
            if (lineType(line)=='chord')
            {
                var count = countChr(line,"|");
                BARS = BARS + count;//total the |'s 
            }
            j=j+1;
        }
    }

 function cleanBars (str)
    {   var x=1;
        while (x < 10)
        {
            str = str.replace("| ", "|%");
            x = x+1;
        }
        if (str.substring(str.length-1)=="|")
        {
            str = str +"%";
        }
        return str;
    } 
   
 

    function XXXX(str) {
      str=str+" "
      var news = ""
      var curr = "";
      var last = "Z";
      var line = "";
      inwk = false
      for (j = 0; j < str.length; j++) {
        if (inwk == true) {
          if (str[j] != " ") {
            curr = curr + str[j];
          } else {
            if (curr == last) {
              news = news + "% ";
            } else {
              news = news + curr + " ";
              last = curr;
            }
            inwk=false;
            curr = "";
          }
        } else {
          if (str[j] == '|') {
            inwk = true
            }
          news = news + str[j];
        }
      }  
      return news
    }

 function addBars (str)
    {   str =" " + str;
        str = str.replace(/ A/g,"|A"); 
        str = str.replace(/ B/g, "|B"); 
        str = str.replace(/ C/g, "|C");
        str = str.replace(/ D/g, "|D");
        str = str.replace(/ E/g, "|E");
        str = str.replace(/ F/g, "|F");
        str = str.replace(/ G/g, "|G"); 
        if (str[0]==" "){str = str.substr(1);}
        return str ;
    }

 function addPartBars (str)
    {   str =" " + str;
        str = str.replace(/ A/g,"~A"); 
        str = str.replace(/ B/g,"~B"); 
        str = str.replace(/ C/g,"~C");
        str = str.replace(/ D/g,"~D");
        str = str.replace(/ E/g,"~E");
        str = str.replace(/ F/g,"~F");
        str = str.replace(/ G/g,"~G"); 
        if (str[0]==" "){str = str.substr(1);}
        return str ;
    }

function toSentenceCase(str)
    {   temp_arr = str.split('\n');
        for (i = 0; i < temp_arr.length; i++)
        {
            temp_arr[i]=temp_arr[i].trim();
            temp_arr[i] = temp_arr[i].charAt(0).toUpperCase() + temp_arr[i].substr(1).toLowerCase();
        }
        str=temp_arr.join('\n');
        str = str.replace(/i /g,"I ");//capitalize I, I'
        str = str.replace(/i'/g,"I'");
        return str;
    } 

function toTitleCase(str)
    {   str = str.toLowerCase();
        return str.replace(/\b\w/g, function (txt) {return txt.toUpperCase(); });
    }

//HELP ZONE  ===================================================================================================
function hlert(key){
var a; 
if (key =='Find Chords Button'){
  a= "Tries to determine which lines are chord lines and tags all Chords with a | indicating a full bar";
  a = a+"\n\n CAUTION:\n It will tag ALL chords as full bars since it cant distinguish partial bars until the partial bar is proceeded by a tilde '~'";}
else if (key =='Clean Up Open Bars'){
  a= "Adds the '%' sign to all open bars '|' indicating a repeated chord";
  a = a+"\n\n This convention was copied from the iRealb program "; }
else if (key =='Tag Partial Bars'){
  a= "Adds the '~' sign to all open chords indicating a that the chord is less than a full bar\n";
  a = a+"\n It is not a standard convention but prevents you from accidentally or programatically marking it as a full bar";
  a = a+"\n\n This iRealb convention of using a / for beats was easy to confuse with the bass note of a chord ";}
else if (key =='Chord Transfer'){
  a= "This allows you to take the chords in VERSE 1, CHORUS 1 or BREAK 1 and tranfer them to all like, numbered Sections. \n";
  a = a+"\n For Example all the Chords from VERSE 1 would be transfered to VERSE 2, VERSE 3 ...";
  a = a+"\n It is meant to be used after you have Tagged and numbered each section using buttons 5 & 6 ";
  a = a+"\n You do NOT need to put in blank chord lines the program will insert them between lyric lines but you must have a lyric lines";
  a = a+"\n\n CAUTION: Be sure to have the same number of lines in each subsequent section";}
else if (key =='Replace'){
  a= "This allows you to replace characters or strings with something else. \n";
  a = a+"\n Place the charcters you want to replace in one box and what you want it to become in the other... ";
  a = a+"\n The arrows indicate which value will replace the other, allowing you to reverse an opertion";}
else if (key =='Tag Headers'){
  a="The First Step is to break the song up into parts"
  a = a+"\n Intro,Verse,Chorus,Break,Interlude,Outro"
  a = a+"\n The program then formats 'Verse', 'Chorus' etc and formats them to '#VERSE -------' etc. \n";
  a = a+"\n Do this to clean up the Headers before numbering them ";}
else if (key =='Number Headers'){
  a= "Sequenctially number the sections labeled #VERSE , #CHORUS, and #BREAK' etc. \n";
  a = a+"\n Do this prior to transferring chords or saving the song ";}
else if (key =='Delete Blank Lines'){
  a= "Deletes all blank lines\n";
  a = a+"\n Just easier than doing it manually ";}
  else if (key =='Sentence Case'){
  a= "Changes to Sentence Case\n";
  a = a+"\n Not very smart so just use it once becuase it will miss names, etc that should be capitalized ";}
else if (key =='Trim Trailing Spaces'){
  a= "Trims the empty spaces from the end of each line\n";
  a = a+"\n Works on Chords Lyrics Headers etc... ";}
else if (key =='Replace Tabs'){
  a= "Changes {TAB} to five (5) empty spaces";
  a = a+"\n Its almost impossible to line up Lyrics and Chords using Tabs ";}
else if (key =='Tempo Tool'){
  a= "Use this to determing the bpm( beats per minute) of a tune";
  a = a+"\n1) Set the time signature correctly (3/4, 4/4 , 6/8 etc)";
  a = a+"\n2) Then, while a tune is running press the button on count one of 4 bars..";
  a = a+"\n3) The buttom will show 'Running'";
  a = a+"\n4) When you get to count one of the 5th Bar press the button again";
  a = a+"\n5) The button will show the tempo in bpm";}
else if (key =='Remove Junk'){
  a= "Use this to delete problem characters..from Text lines and headers, not chords";
  a = a+"\n1) Currently removes only:  ?  ";}
else{
  a='No Help Available';}
  alert(key.toUpperCase()+'\n\n'+a);}
//from CommonLyric.js==============================================================================
//=================================================================================================    
function lineType(str){ //returns the type of line from the text file...  
  var ans ="lyric";
  if ((str.substring (0,7)).toUpperCase()=="IREALB:"){ans = "irealb";}
  else if (str.substring (0,4)=='TAB:'){ans="tab";}
  else if (str.substring (0,4)=="http"){ans = "link";}
  else if (str.substring (0,3)=="@@@"){ans = "noteTech";}
  else if (str.substring (0,2)=="@@"){ans = "noteTriv";}
  else if (str.substring (0,1)=="@"){ans = "note";}
  else if (str.substring (0,1)=="#"){ans = "header";}
  else if (str.substring (0,1)=="$"){ans = "spacer";}
  else if (str.search(":")>-1) {ans="hash";}
  else if (str.indexOf("|")>-1){ans="chord";}
  
  return ans;}
    
function longestLine(){//Common Lyic
  LONGLINE =0;
  var i=0;
  while (i < ARRlines.length){
    var ltype = lineType(ARRlines[i]);
    if (ltype == "chord" | ltype == "lyric"| ltype == "note"){
      if (ARRlines[i].length > LONGLINE){LONGLINE = ARRlines[i].length;}}
    i = i+1;} }   

function longestLyric(){//Common Lyic
  LONGLYRIC =0;
  var i=0;
  while (i < ARRlines.length){
    var ltype = lineType(ARRlines[i]);
    if (ltype == "lyric"){
      if (ARRlines[i].length >LONGLYRIC){LONGLYRIC = ARRlines[i].length;}}
    i = i+1;} }       

function createSetSelector(){ //alert ('Lyric Common function');//creates an option box for the file SetList.txt in the top directory
  statusMsg("Starting Javascript: Loading List of Sets....");
  var path ="SetList.txt";
  var request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  var content = request.responseText;
  var SETS =content.split("\n");
  ihtml ="SELECT A PLAYLIST: <select id='Set' style='font-size:2vw;font-family:Courrier New;' onchange='selectSet(this.value)'><optgroup>\n<option selected>ALL TUNES</option>";
  j=0;
  while (j < SETS.length){
    if (SETS[j]!=="ALL TUNES") {ihtml =ihtml +"\n<option>"+ SETS[j] +"</option>";}
    j = j+1;}
  ihtml =ihtml +"\n</optgroup></Select>";
  document.getElementById("setSelect").innerHTML=ihtml; }//selectSet("ALL TUNES");//xxx0 was unnecessary
  
function selectorFromArray(arr,id){ //alert ('Lyric Common function');//creates an option box for the file SetList.txt in the top directory
  statusMsg("building Selector");
  var j; str='';
  for (j=0;j<arr.length;j++) {
  str=str+"<option>"+ arr[j] +"</option>"}
  document.getElementById(id).innerHTML=str
  return(str)}

function chordList(){//alert('CL');
  var str="";var j;var arr;var strA
  //alert(ARRlines.length +" lines")
  for (j=0;j<ARRlines.length-1;j++){
    if (lineType(ARRlines[j])=='chord') {
      //str=str+ARRlines[j];}}
      strA=ARRlines[j].replace(/\s+/g, '');
      strA=strA.replace(/%/g, '');
      str=str+strA.replace(/~/g,"|");}} 
      arr=str.split('|');
      var uniqueItems = Array.from(new Set(arr))
      //alert(uniqueItems) 
      selectorFromArray(uniqueItems,'songChords');}


//*Make the DIV element draggagle:=====================================================================================================

dragElement(document.getElementById("notePad"));
dragElement(document.getElementById("cannedText"));
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}  