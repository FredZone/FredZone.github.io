//^PROBLEMS;
//^VARIABLES============================================================
var LOG=false;//needed if you use debug routine
var NONE;//required to make dis function work
//var ARRdeck=("As,Ks,Qs,Js,10c,9s,8s,7s,6s,5s,4s,3s,2s,Ah,Kh,Qh,Jh,10c,9h,8h,7h,6h,5h,4h,3h,2h,Ad,Kd,Qd,Jd,10c,9d,8d,7d,6d,5d,4d,3d,2d,Ac,Kc,Qc,Jc,10c,9c,8c,7c,6c,5c,4c,3c,2c").split(',')
//^ARRAYS
var ARRdeck=("414,413,412,411,410,409,408,407,406,405,404,403,402,314,313,312,311,310,309,308,307,306,305,304,303,302,214,213,212,211,210,209,208,207,206,205,204,203,202,114,113,112,111,110,109,108,107,106,105,104,103,102").split(',')
var ARRbidBox=("PASS,1C,1D,1H,1S,1NT,2C,2D,2H,2S,2NT,3C,3D,3H,3S,3NT,4C,4D,4H,4S,4NT,5C,5D,5H,5S,5NT,6C,6D,6H,6S,6NT,7C,7D,7H,7S,7NT").split(',') 
ARRplay="".split(",");
var ARRshuf

var ARRnorth="".split(",");
var ARReast="".split(",");
var ARRsouth="".split(",");
var ARRwest="".split(",");
var ARRnull="".split(",").splice(0,1)
var SHOWsouth=true;
var SHOWnorth=false;
var SHOWeast=false;
var SHOWwest=false;
var DEALER='west'
var BIDDER='west'
var HAND=0
var BIDno=0
//^BOOT ================================================================
window.onload = function(){//downloads and creates ARRcollections makes selector and selects default 
  NONE =document.getElementById('none').style.display;
  statusMsg('Loading Javascript...')
  dis('splash','none');
  document.getElementById('msg').style.top="0%";
  statusMsg('Template Loaded...')
  ARRshuf=shuffle(ARRdeck);
  deal()};

function shuffle(array) {//taken from internet I didnt analize it...
  HAND=0
  BIDno=0 
  let counter = ARRdeck.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = ARRdeck[counter];
    ARRdeck[counter] = ARRdeck[index];
    ARRdeck[index] = temp;}
  return ARRdeck;}

function deal() {
  var i=0;
  statusMsg('Dealing...')
  ARRnorth.length=0;ARReast.length=0;ARRsouth.length=0;ARRwest.length=0;
  for(i=0;i<13;i++){ARRnorth.splice(0,0,ARRshuf[i])}
    ARRnorth.sort();ARRnorth.reverse()
  for(i=13;i<26;i++){ARRsouth.splice(0,0,ARRshuf[i])}
    ARRsouth.sort();ARRsouth.reverse()
  for(i=26;i<39;i++){ARReast.splice(0,0,ARRshuf[i])}
    ARReast.sort();ARReast.reverse()
  for(i=39;i<52;i++){ARRwest.splice(0,0,ARRshuf[i])}
    ARRwest.sort();ARRwest.reverse()
  HAND=HAND +1
  document.getElementById('hand').innerHTML=HAND
  document.getElementById('bidNo').innerHTML=BIDno
  //document.getElementById('hand').innerHTML=HAND
  showCards();}

function showCards(news){
  if (news=="south") {if (SHOWsouth==true){SHOWsouth=false;}else{SHOWsouth=true;};}
  if (news=="west") {if (SHOWwest==true){SHOWwest=false;}else{SHOWwest=true;};}
  if (news=="east") {if (SHOWeast==true){SHOWeast=false;}else{SHOWeast=true;};}
  if (news=="north") {if (SHOWnorth==true){SHOWnorth=false;}else{SHOWnorth=true;};}
  statusMsg('Refreshing view...')
  if (SHOWnorth==true) {
     for (i=0;i<13;i++){document.getElementById("n"+parseInt(i+1)).src="../../icons/cards/"+ARRnorth[i]+".png";
    document.getElementById("n"+parseInt(i+1)).setAttribute("onClick", "javascript: statusMsg('Playing : "+ARRnorth[i]+"');play('north',"+i+")");};}
  else{
    for (i=0;i<13;i++){document.getElementById("n"+parseInt(i+1)).src="../../icons/cards/back.png";}}
  if (SHOWsouth==true) {
    for (i=0;i<13;i++){
      document.getElementById("s"+parseInt(i+1)).src="../../icons/cards/"+ARRsouth[i]+".png";
      document.getElementById("s"+parseInt(i+1)).setAttribute("onClick", "javascript: statusMsg('Playing : "+ARRsouth[i]+"');play('south',"+i+")");};}
  else{
    for (i=0;i<13;i++){document.getElementById("s"+parseInt(i+1)).src="../../icons/cards/back.png";}}
  if (SHOWeast==true) {
    for (i=0;i<13;i++){document.getElementById("e"+parseInt(i+1)).src="../../icons/cards/"+ARReast[i]+".png";
    document.getElementById("e"+parseInt(i+1)).setAttribute("onClick", "javascript: statusMsg('Playing : "+ARReast[i]+"');play('east',"+i+")");};}
  else{
    for (i=0;i<13;i++){document.getElementById("e"+parseInt(i+1)).src="../../icons/cards/back.png";}}  
  if (SHOWwest==true) {
    for (i=0;i<13;i++){document.getElementById("w"+parseInt(i+1)).src="../../icons/cards/"+ARRwest[i]+".png"
    document.getElementById("w"+parseInt(i+1)).setAttribute("onClick", "javascript: statusMsg('Playing : "+ARRwest[i]+"');play('west',"+i+")");};}
  else{
    for (i=0;i<13;i++){document.getElementById("w"+parseInt(i+1)).src="../../icons/cards/back.png";};}  
  dis('analysis','none')
  statusMsg('Ready for '+DEALER+' to Bid')
  if (DEALER=='south') {dis('bidBox','block');}else {dis('bidBox','none');}
  statusMsg (DEALER +" Bids...");}




function bid(id) {
alert(id)
}


function play(player,no){
  var arr
  statusMsg('Playing '+player+' '+no+'...')
  if (player=='south') {arr=ARRsouth}
  if (player=='north') {arr=ARRnorth}
  if (player=='east') {arr=ARReast}
  if (player=='west') {arr=ARRwest}
  document.getElementById(player+"Play").src='../../icons/cards/'+arr[no]+'.png';
  //var arr="ARR"+player
  arr.splice(no,1)
  statusMsg("Refreshing view....")
  showCards();
  }

function analizeHand(news) {statusMsg("Analizing "+ news)
  document.getElementById('aTitle').innerHTML="Computer Analysis of "+ news
  document.getElementById('aField').innerHTML="Calculating..."
  document.getElementById('aRec').innerHTML="Waiting on Calculation...";
  dis('analysis','block')
  var arr;
  var Spades=0;var Hearts=0;var Diamonds=0;var Clubs=0;//count
  var sp=0;var hp=0;var dp=0;var cp=0;var tp;//points
  var hcp=0;var dst=0;
  var stoppers = false;
  var longSuit="Spades";var longCnt;
  var strong="s"; var strongCnt;var strongMaj;var StrongMin
  var rec;
  var open=true
  var x=0;var y;
  var str;
  if (news=='south'){arr=ARRsouth;}
  if (news=='north'){arr=ARRnorth;}
  if (news=='east') {arr=ARReast;}
  if (news=='west') {arr=ARRwest;}
  document.getElementById('aField').innerHTML="Counting Cards and High Card Points..."
  for (i=0;i<13;i++){
    if (arr[i]>400){
      Spades=Spades+1   
      x=arr[i]-410
      if (x>0) {sp=sp+x}
      }
    else if (arr[i]>300) {
      Hearts=Hearts+1   
      x=arr[i]-310
      if (x>0) {hp=hp+x}}
  else if (arr[i]>200) {
      Clubs=Clubs+1   
      x=arr[i]-210
      if (x>0) {cp=cp+x}}  
  else if (arr[i]>100) {
      Diamonds=Diamonds+1   
      x=arr[i]-110
      if (x>0) {dp=dp+x}} }
    hcp= sp+hp+dp+cp;
  document.getElementById('aField').innerHTML="Counting distribution points..."
  if (Spades==1) {dst=dst+2;}
  if (Spades==2) {dst=dst+1;}
  if (Hearts==1) {dst=dst+2;}
  if (Hearts==2) {dst=dst+1;}
  if (Diamonds==1) {dst=dst+2;}
  if (Diamonds==2) {dst=dst+1;}
  if (Clubs==1) {dst=dst+2;}
  if (Clubs==2) {dst=dst+1;}
  tp=hcp+dst;
  document.getElementById('aField').innerHTML="Identifying Long Suits..."
  x=Spades ; longSuit="Spades"
  if (Hearts>x) {longSuit="Hearts";x=Hearts}
  if (Diamonds>x) {longSuit="Diamonds";x=Diamonds}
  if (Clubs>x) {longSuit="Clubs";x=Clubs}
  longCnt=x
  document.getElementById('aField').innerHTML="Identifying Strong Suits..."+sp+"-"+hp+"-"+dp+"-"+cp
  x=sp ;strong="Spades";strongMaj="Spades" ;strongMin="Diamonds"
  if (hp>x) {strong="Hearts";strongMaj="Hearts";x=hp}
  if (dp>x) {strong="Diamonds";x=dp}
  if (cp>x) {strong="Clubs",x=cp;strongMin="Clubs"}
  strongCnt=x
  document.getElementById('aField').innerHTML="Checking Stoppers..."+sp+"-"+hp+"-"+dp+"-"+cp
  if (sp+hp+dp+cp==0 ){stoppers = true}else{stoppers=false}
  statusMsg("Formating Data...")
  str= Spades +" Spades:  "+ sp + " Points<br>"
  str= str+Hearts +" Hearts:  "+ hp + " Points<br>"
  str= str+Diamonds +" Diamonds:  "+ dp + " Points<br>"
  str= str+Clubs +" Clubs: "+ cp + " Points<br>=================<br>"
  str= str+hcp +" High Card Points<br>"
  str= str+dst+  " Distribution Points<br>"
  str= str+tp+" Total Points<br>=================<br>"
  str= str+ longSuit+" Longest Suit @ "+longCnt+" cards<br>"
  str= str+ strong+" Strongest Suit @ "+strongCnt+" points<br>"
  str= str+ strongMaj+" Strongest Major<br>"
  str= str+ strongMin+" Strongest Minor<br>"
  statusMsg("Checking Stoppers...")
  if (stoppers==true){str=str+"stoppers!<br>";}
  else{str=str+"No Stoppers<br>";}
  document.getElementById('aField').innerHTML=str
  
  statusMsg("Preparing Bid Recomendation...")

  if (ROUND==0 && BID==0){
    rec="Couldn't figure the bid out...Take a your best shot!";
    if (tp >> 26 ) {rec="Bid 4NT<br>See if your partner has Aces..."}
    else if(tp<=26 && tp>=23) {rec="Bid 3NT<br>Thats Game...So your partner can ask for aces<br>(A)";statusMsg('A');}
    else if(tp>=20 && tp<=22) {rec="Bid 2NT<br>Your partner can make the next step or pass<br>(B)";statusMsg('B');}
    else if(tp>=18 && tp<=19) {rec="Bid 1"+ longSuit+"<br>Its your longest Suit<br>(D)";statusMsg('D');}
    else if(tp>=15 && tp<=17 && stoppers==true && dst==0) {rec="Bid 1NT<br>You have stopper and even distribution(E)";statusMsg('E');}
    else if(tp>=14 && tp<=19 ) {rec="Bid 1"+ longSuit+"<br>You have points and its your longest suit(F)";statusMsg('F');}
    else if (tp==13 && longCnt>=5 && dst<=1){rec="Bid 1"+ longSuit+"<br>Risky:<ul><li>You are a point shy<li>but you have a 5 card suit<li>fair distribution and,<li> big kahonas...</ul>(G)";statusMsg('G');}
    else if (tp==12 && longCnt>=6){rec="Bid 1"+ longSuit+"<br>Risky:You're short 2 points but there is a 6 card suit<br>'Are feeling lucky Punk...'(H)";statusMsg('H');}
    else if (tp<=8 && tp<=11 && longCnt>=7){rec="Bid 3"+ longSuit+"<br>Pre-emptive Bid...(I)'";statusMsg('I');}
    else{rec="Pass! You only have "+tp+ " points.<br>(J)";statusMsg('J');}
      
  
  document.getElementById('aRec').innerHTML="RECOMMENDATION (ROUND: "+ROUND + " BID: "+BID+")<br>"+ rec;};}   //alert(1);
