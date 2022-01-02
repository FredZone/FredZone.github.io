//<script type="text/javascript">
   var PlannedTime
   var Kon
   var NowTime
   var TimeGap
   var myVar;
   var myVar2;
   var myAudio=document.getElementById("audio1");
   var ScrollStartTime;//set at button push
   var ScrollFinishTime;//set at button push
   var ScrollSteps;//set at button push
   var ScrollCount;// at each scroll
   var LineCt;
   var MP3Dur;
   var WindHt;
   var WindWd;
   var PageHt;
   var ScrollDur;
   var ScrollKon;
   var ScrollDel;
   var Fnt;
   var NewFnt;
   var LongLine
   var LastMode
   var Link
   var OldLink
   var LinesPerSec
   
function DelayScroll(reactionTime,scrollWait){//reaction time is arbitrary time until the track plays, the scroll wait is 1/2 the screen height in seconds
   ScrollStartTime = new Date().getTime() + scrollWait + reactionTime;
   ScrollFinishTime =ScrollStartTime + scrollWait + reactionTime;
   myVar=setTimeout(function(){pageScroll()},scrollWait + reactionTime );
   }


function Linker()// Peform one of these routines If "PlayMode" in the parent form changes
   {//alert(Link)
      if (parent.PlayMode !== Link)
      {
         OldLink = Link;//set the new link for next pass
         Link = parent.PlayMode
          //alert (OldLink + " >> " +Link);
         if (Link == "DelayedPlay")
         { //starts Delayscroll with a 5 second delay and Scrolls normal 1/2 page delay 
            DelayScroll(5000,ScrollDel);
         }    
         else if(Link =="Play")
         {//Resets the scrollstart time  and scroll count then starts the scroll with no delay
            ScrollStartTime = new Date().getTime();
            ScrollCount =0
            DelayScroll(0,0); //start scroll immediately  
         }
         else if(Link =="Ready")
         {//kicks you out of the Scroll by replacing exisiting Mode with "Play" then goes to the top of the scroll
            window.scroll(0,0); //set scroll to top  
         }
         else if(Link =="Pause")
         {//kicks you out of the Scroll by replacing exisiting Mode with Play
          var top  = window.pageYOffset || document.documentElement.scrollTop;
            //alert("TOP: " + top);
            //alert ("Scroll Kon: " + ScrollKon);
            //alert ("NewTop:" + parseInt(top - ((ScrollKon) *3)));
            //window.scroll(0,parseInt(top - ((ScrollKon) *3))); //set scroll back 3 seconds
         }
         else if(Link =="Reset")
         {//kicks you out of the Scroll by replacing exisiting Mode with Play
          //var top  = window.pageYOffset || document.documentElement.scrollTop;
            //alert("TOP: " + top);
            //alert ("Scroll Kon: " + ScrollKon);
            //alert ("NewTop:" + parseInt(top - ((ScrollKon) *3)));
            window.scroll(0,0)//takes you to the top
         }
      }
      myVarX=setTimeout(function(){Linker()},100);   
   }



function pageScroll()
   {
   if(Link == "Play")
      {  
      window.scrollBy(0,1);
      scrolldelay = setTimeout('pageScroll()',getScrollInc());
      }
   else if(Link == "DelayedPlay")
      {
      window.scrollBy(0,1); //}
      scrolldelay = setTimeout('pageScroll()',getScrollInc());
      }
   }

function getDocHeight() {
   return Math.max(document.documentElement["clientHeight"],
   document.body["scrollHeight"], document.documentElement["scrollHeight"],
   document.body["offsetHeight"], document.documentElement["offsetHeight"]);
   }
function getScrollInc() {//adjust the scroll increment to keep the scroll in sync with the planned time 
   ScrollCount = ScrollCount + 1;
   PlannedTime = ScrollStartTime + (ScrollCount * ScrollKon);
   Kon = ScrollKon
   NowTime = new Date().getTime();
   TimeGap = parseInt(NowTime -PlannedTime);
   if (TimeGap > ScrollKon ){
   //Kon = parseInt(ScrollKon/2);  //code
   //Kon = parseInt(ScrollKon/10);
   Kon = 1;
   }
   else if (TimeGap <-50) {
   Kon = parseInt(ScrollKon*2);
   }
   return Kon;
   }

function Analize() {
   //alert("ScrollStartTime: " + ScrollStartTime);
   //alert("ScrollFinishTime: " + ScrollFinishTime);
   //alert("ScrollSteps: " + ScrollSteps);
   //alert("ScrollCount: " + ScrollCount);
   //alert("ScrollDel: " + ScrollDel);
   //alert("Kon: " + Kon);
   //alert("TimeGap: " + TimeGap);
   //alert("ScrollKon: " + ScrollKon);
   //alert("ScrollDel: " + ScrollDel);
    alert("Line Count: " + LineCt);
    alert("MP3Duration: " + MP3Dur);
    alert("Analysis Completed");
    }
 

function LoadPage(){
   var w = window,
   d = document,
   e = d.documentElement,
   g = d.getElementsByTagName('body')[0],
   WW = w.innerWidth || e.clientWidth || g.clientWidth,
   WH = w.innerHeight|| e.clientHeight|| g.clientHeight;
   WindHt = parseInt(WH)
   WindWd = parseInt(WW)
   //LineCt set in calling page
   //MP3Dur set in calling page
   ScrollCount =0;
   PageHt = getDocHeight();
   ScrollSteps = (PageHt - WindHt); //how many lines are actually scrolled
   ScrollDur = parseInt(((PageHt - WindHt)/PageHt)*MP3Dur*1000);
   LinesPerSec = ScrollSteps/ScrollDur;// THESE LINES ARE PIXELS NOT TEXT
   ScrollKon = parseInt(1/LinesPerSec);
   SecPerLine = MP3Dur/LineCt;  //actual lines of text not pixels  
   ScrollDel = parseInt((SecPerLine*1000*(0.45*WindHt))/(1.2*Fnt));//scroll delay =1/2 the lines in the window * seconds per line converted to milleseconds
   NewFnt = parseInt((WindWd/(LongLine+5))*5/3);//need to get the 5 char time accounted for
   //alert("LongLine " + LongLine);
   //alert("mp3 duration " + MP3Dur);
   //alert("linecount " + LineCt);
   //alert("SecPerLine " + SecPerLine);
   //alert("Font " + Fnt);
   //alert("PageHt " + PageHt);
   //alert("WindHt " + WindHt);
   //alert("Screen Lines: " + parseInt(WindHt/(1.2*Fnt));//xxx
   //alert("Scroll Delay ms: " + ScrollDel);
   // alert("WindWd: " + WindWd);
   //ChrPerLine = (WindWd * (5/3)/Fnt) - 5  // WindWd = Px ,5/3*ht/width of a courrier char 5= line number (time)
   //alert("ChrPerLine: " + ChrPerLine);
   //FS = parseInt((WindWd/LongLine)*5/3)
   //alert("FS: " + FS);
   //alert("Fnt: " + Fnt);
   //alert("NewFnt  : " + NewFnt);
   //DelayScroll(5000,ScrollDel);
   Link ="Ready"
   Linker();
   }
 
   