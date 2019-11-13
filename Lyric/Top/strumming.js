//* GLOBAL VARIABLES=====================================================================================================
var DATA;
var ARRstrums="????"; 
var ARRstrum="????";
var TITLE;
var NOTES;
var DETAILS;
var EX="?";//example

window.onload = function()
    {
        DATA ="Basic Strum@1...2...3...4...@d u d u d u d u@@Unsyncopated up and down, primarily for reference@Twinkle Twinkle Little Star";
        DATA=DATA+"\nBasic Rock@1...2...3...4...@d u D u d u D u@@Simple 4/4 Slightly syncopated up and down, Emphasis on 2 & 4@The Lion Sleeps Tonight";
        DATA=DATA+"\nSome Days are Diamond@1...2...3...4...@d   D u d u D  u@B - - - B - - -@Moderate Swing emphasis 2&4@Some Days are Diamond";
        DATA=DATA+"\nWagon Wheel@1...2...3...4...@d   D   d u D u @B - - - - - - -@Simple 4/4 Slightly syncopated up and down, Emphasis on 2 & 4@Wagon Wheel";
        DATA=DATA+"\nThe Twist@1...2...3...4...@d   D U d u D u@B - M - - - - -@Simple 4/4 Slightly syncopated up and down, Emphasis on 2 & 4 with Up-Slap on 2.5@Dont Be Cruel";
        DATA=DATA+"\nStand By Me@1...2...3...4...@d   D U   u D u@- - - M - - - -@4/4 Slightly syncopated up and down, Emphasis on 2 & 4@Dont Be Cruel";
        DATA=DATA+"\nAmarillo By Morning@1...2...3...4...@D   D  u  u d u @- - S - - - - -@Sweep down on 2@";
        DATA=DATA+"\nHand Jive@1...2...3...4...1...2...3...4...@D   D   d u D   d u D   D   d u@- - - - - M M - - M M - - - M M@Pretty Much the Bo-Diddly";
        DATA=DATA+"\nKansas City@1...2...3...4...@d   D u d u D   @@Shuffle Blues 4/4 Slightly syncopated up and down, Emphasis on 2 & 4@?";
        DATA=DATA+"\nKansas City 2@1...2...3...4...@D u D   D u D  @- - M - - - M -@Shuffle Blues palm mute or 'karate' mute  2 & 4@?";
        DATA=DATA+"\nKansas City 2.5@1...2...3...4...@D u d  uD u d  u@@Shuffle Blues palm mute or 'karate' mute  2 & 4<br>Added a small upbeat before the D@?";
        DATA=DATA+"\nDream@1...2...3...4...@d u D u d u D u @- - - M - - - M @Up and down, Emphasis on 2 & 4@?";
        DATA=DATA+"\nDream 2@1...2...3...4...@d   D u d   D u @- - - M - - - M @Up and down, Emphasis on 2 & 4@?";
        DATA=DATA+"\n8 Down@1...2...3...4...@d d d d d d d d @- - - - - - - - @Simple 8 Down";
        //DATA=DATA+"\nTEMPLATE@1...2...3...4...@d u D u d u D u@@INFORMATION@OTHER SONGS";
        ARRstrums = DATA.split("\n");
        StrumSelectBuild();
        strumLoad(0);
    };

function strumLoad(id)
    {   
        ARRstrum=ARRstrums[id].split('@');
        TITLE =ARRstrum[0];
        DETAILS= document.getElementById('details').innerHTML="<pre>"+ ARRstrum[1]+"<br>"+ARRstrum[2]+"<br>"+ARRstrum[3]+"</pre>";
        NOTES = document.getElementById('notes').innerHTML=ARRstrum[4];
        EX = document.getElementById('ex').innerHTML=ARRstrum[5];
        document.getElementById('Audio1').src = "../Strumming/"+TITLE+".mp3";
        
    }
function StrumSelectBuild()
    {
        var i =1;
        var a ="<option value ='0' selected >"+ARRstrums[0].split('@')[0]+"</option>";
        while (i<ARRstrums.length)
        {
            a=a+ "<option value ='"+i+"' selected >"+ARRstrums[i].split('@')[0]+"</option>";
            i = i+1;
        }
        document.getElementById('strumSel').innerHTML=a;
        document.getElementById('strumSel').value ="0";
    }

function trackReset()
    {
        if (document.getElementById("Audio1"))
        {
            document.getElementById("Audio1").autoplay = false;
            document.getElementById("Audio1").load();
        }
    }


    
    
function home(){window.open("index.html");}
    
function    playAudio()
    {
        document.getElementById('Audio1').play();
    }


function info(title)
    {
        var inf = title +'\n===========================\n' + "No Info Available...";
        alert(inf);
    }
    
function conventions()
    {
        str= "STRUMS (line 2)\n=====================";
        str =str+ "\nD:  Down emphasized";
        str =str+ "\nd:  Down soft";
        str =str+ "\nU:  Up emphasized";
        str =str+ "\nu:  Up soft";
        str =str+ "\nS:  Slap hard";
        str =str+ "\ns:  Slap soft";
        str =str+ "\nP:  Palm Mute";
        str =str+ "\n=====================\nEMBELISHMENT (line 3)\n=====================";
        str =str+ "\nB:  Bottom strings";
        str =str+ "\nT:  Top strings";
        str =str+ "\nS:  Sweep";
        str =str+ "\nM:  Mute (with chording hand)";
        str =str+ "\nH:  Hammer";
        str =str+ "\nO:  Open";
        str =str+ "\n=====================\nMISCELLANEOUS\n=====================";
        str =str+ "\n-  Space";
        str =str+ "\n.  Space";
        
        
        alert("CONVENTIONS" +'\n===========================\n' + str);
    }