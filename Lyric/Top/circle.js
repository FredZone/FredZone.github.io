var ARRcyc;
var CYCLING=false;
var CYC;
var TOcyc;//timeout cycle
var CYCplace=0;//cycle position (ie item 6)
var TIME;

function cyc(type,time)
    {
        TIME = time;
        if (type== '4')
            { ARRcyc=('C,F,Bb(A#),Eb(D#),Ab(G#),Db(C#),Gb(F#),B,E,A,D,G').split(',');}
        else if(type== '4b')
            { ARRcyc=('C,F,Bb,Eb,Ab,Db,Gb,B,E,A,D,G').split(',');}
        else if(type== '4#')
            { ARRcyc=('C,F,A#,D#,G#,C#,F#,B,E,A,D,G').split(',');}
        if (CYCLING ===false)
            {
                CYCLING=true;
                CYC=ARRcyc.length-1;
                cycLoop();
                document.getElementById('goIco').src="../../icons/resetSpinner.gif";
            }
        else
            {
                CYCLING=false;
                document.getElementById('goIco').src="../../icons/transPauseRed.png";
                clearTimeout(TOcyc);
                return;
            }
    }

function  cycLoop()
{
    TOcyc = setTimeout(function()
    {
    if (CYCplace==CYC) {CYCplace=0;}else{CYCplace=CYCplace+1;}
    document.getElementById('cycle').innerHTML=ARRcyc[CYCplace];
    cycLoop();
    },TIME);
}   