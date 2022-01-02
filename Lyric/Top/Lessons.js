var ARRlessons;//Lesson Names
var NOTES; //the notes being played i.e. 'E,A,D'
var NOTEstr;//Randomized string of notes to be played (E,A,A,D,E)
var LOOPint;//Interval between Clicks
var CLICKS;//number of Clicks for timeing NOTEstr
var ARRnotes;//Array of the NOTES to use in randomization
var TOex;//TIMEOUT FOR THIS EXERCISE
var CYCLES=0;
var OLDnote=0;
var LESSON='INTRODUCTION,1'; //lesson number
var SPEEDup =0; //How many times to speed up
var RUN=false;
var AUTOex=true;
var SOUND= true;
var SHADEnote= true;

window.onload = function()
    {
        RUN=false;
        AUTOex=true;
        SOUND= true;
        SHADEnote= true;
        LOOPint=1000;
        document.getElementById('lessonSelect').selectedIndex = 0;
        document.getElementById('loopInt').selectedIndex = 4;
        document.getElementById('noteCount').selectedIndex =0;
        document.getElementById('shade').selectedIndex =0;        
        document.getElementById('auto').selectedIndex =0;
        document.getElementById('sound').selectedIndex =0;
        document.getElementById('lessonSelect').selectedIndex = 0;
        LESSON='INTRODUCTION,1';
        lessonLoad(LESSON);
    } ;   

function lessonLoad(LESSON)
    {
        var txt="Lesson Failed to Load@No Index@No Help";
        var i =1;
        var n=1;
        arr=LESSON.split(',');
        if (LESSON!==undefined)
        {
            LESSON=arr[0],n=arr[1];
            txt=getTextFile("../Lessons/"+LESSON+".txt");                
        }
        arrLes=txt.split('@');
        document.getElementById('lessonBody').innerHTML=arrLes[0];
        document.getElementById('lessonIndex').innerHTML=arrLes[1];
        document.getElementById('lessonBody').scrollTop=0;
        while (i<=2){vis('xFormat'+i,'hidden'),i=i+1;}
        document.getElementById('xFormat'+n).style.visibility='visible';
        printX('');
    }

function printX(x){document.getElementById('xFormat1').innerHTML=x;}



function run(newMode)
    {
        if (newMode===undefined)
        {
            if (RUN===true)
                {
                    RUN=false;
                }
                else
                {
                    RUN=true;
                }
        }
        else
            {
                RUN=newMode;
            }
        if (RUN===false)
        {
            document.getElementById('runIcon').src='../../Icons/transPlayGreen.png';
            clearTimeout(TOex);
        }
        else
        {
            document.getElementById('runIcon').src='../../Icons/transPauseRed.png';
            TOex=setTimeout(function(){playString(1);},1500);
        }
    }
    
function notesSetup(notes,title)
    { 
        clearTimeout(TOex);
        var i=1;
        var oldNote='x';
        var newNote;
        while (i<=10)//reset the background color
        {
            document.getElementById('b'+i).innerHTML='';
            document.getElementById('b'+i).style.backgroundColor='grey';
            i=i+1;
        }
        if (notes!==undefined)//make an array of the notes & set the exercise header
            {
                ARRnotes=notes.split(',');
                document.getElementById('exTit').innerHTML=title;
            }
        CLICKS= num=document.getElementById('noteCount').value;
        i=1;
        while (i<=CLICKS)//generate the new notes and fill the exercise box
            {
                do
                {
                newNote=ARRnotes[Math.floor((Math.random() * (ARRnotes.length)))];
                }
                while (newNote==oldNote);
                oldNote=newNote;
                document.getElementById('b'+i).innerHTML=newNote;
                document.getElementById('b'+i).style.backgroundColor='grey';
                i=i+1;
            }
        if(SOUND===true){document.getElementById('aD').play();}

        if(AUTOex===true & RUN===true)
        {
            document.getElementById('runIcon').src="../../Icons/transPauseRed.png";
            TOex=setTimeout(function(){playString(1);},1500);
        }
        else
        {
            RUN=false;
            document.getElementById('runIcon').src="../../Icons/transPlayGreen.png";
        }
        document.getElementById('runIcon').style.visibility='visible';
    }
    

function playString(num)
    {
    if (num<=CLICKS)
        {
            if(SOUND===true){document.getElementById('aC').play();}
            if(SHADEnote===true){document.getElementById('b'+num).style.backgroundColor='white';}
            TOex=setTimeout(function(){playString(num+1);},LOOPint);
            
        }
    else  
        { //alert('Reloading');
            if(AUTOex===true)
            {
                TOex=setTimeout(function(){notesSetup(NOTES,'');},LOOPint);
            }
            else
            {
                run(false);    
            }
        }
    }