
var ARRsettings;
var ELEMENT='a0';//use the a0 instead of 'a'+j

window.onload = function()
{   //creating default array
    statusMsg('Loading Bogus List');
    var str='Simple Acoustic,50,AC,OF,OF,b3,d5,t3,g1,OF,OF,r2\n'+
    'Simple Acoustic,50,AC,OF,OF,b3,d5,t3,g1,OF,OF,r2\n'+
    'Test All,50,AC,SH,8,b3,d5,t3,S3,A5,P5-6,r2\n'+
    'Bogus 4,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 5,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 6,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 7,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 8,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+   
    'Bogus 9,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 10,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 11,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 12,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 13,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 14,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 15,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 16,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 17,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 18,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 19,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 20,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 21,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 22,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 23,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 24,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 25,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 26,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 27,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 28,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 29,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 30,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 31,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 32,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 33,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 34,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 35,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 36,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 37,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 38,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 39,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF\n'+
    'Bogus 40,88,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF';
    ARRsettings=str.split('\n');
    loadARR();
    };
    
function loadARR( ){//loads ARRsettings into up to 40 input boxes
statusMsg('Loading Settings...');
    var j=0;
    while (j<ARRsettings.length & j<40){
         document.getElementById("a"+j).value =ARRsettings[j];
         j= j+1;
        }
    statusMsg('Settings Loaded...');
    }

    function tag(id) //colors input box num= id of input
    {  
        ELEMENT=id;
        var j=0;
        while (j<ARRsettings.length)
        {
            document.getElementById('a'+j).style.backgroundColor='pink';
            j=j+1; 
        }
    document.getElementById(id).style.backgroundColor='yellow';
    //loadString(document.getElementById(id).value);
    }



function loadString(str)
    {
        ARRsetting=str.split(",");
        document.getElementById('desc').value=ARRsetting[0];
        document.getElementById('vol').value=ARRsetting[1];

        if (ARRsetting[2] =='AC' | ARRsetting[2]=='OF')
        { 
            document.getElementById('amp').value=ARRsetting[2];
            document.getElementById('ampNo').value='';
        }
        else
        {
            document.getElementById('amp').value=ARRsetting[2].substr(0,1);
            document.getElementById('ampNo').value=ARRsetting[2].substr(1,1);
        }
        document.getElementById('wah').value=ARRsetting[3];
        document.getElementById('comp').value=ARRsetting[4];
        document.getElementById('bass').value=ARRsetting[5];
        document.getElementById('mid').value=ARRsetting[6];
        document.getElementById('treb').value=ARRsetting[7];
        
        if (ARRsetting[8] =='OF')
        { 
            document.getElementById('noise').value=ARRsetting[8];
            document.getElementById('noiseNo').value='';
        }
        else
        {
            document.getElementById('noise').value=ARRsetting[8].substr(0,1);
            document.getElementById('noiseNo').value=ARRsetting[8].substr(1,1);
        }
        
        if (ARRsetting[9] =='OF')
        { 
            document.getElementById('mod').value='OF';
            document.getElementById('modNo').value='';
        }
        else
        {
            document.getElementById('mod').value=ARRsetting[9].substr(0,1);
            document.getElementById('modNo').value=ARRsetting[9].substr(1,1);
        }
        if (ARRsetting[10]=='OF')
        {
            document.getElementById('delay').value='OF';
            document.getElementById('delayNo').value='';
            document.getElementById('delayTime').value='';//code
        }
        else
        {
            document.getElementById('delay').value=ARRsetting[10].substr(0,1);
            document.getElementById('delayNo').value=ARRsetting[10].substr(1,1);
            document.getElementById('delayTime').value=ARRsetting[10].substr(3,2);
        }
        if (ARRsetting[11] =='OF')
        { 
            document.getElementById('reverb').value='OF';
            document.getElementById('reverbNo').value='';
        }
        else
        {
            document.getElementById('reverb').value=ARRsetting[11].substr(0,1);
            document.getElementById('reverbNo').value=ARRsetting[11].substr(1,1);
        }
    }

function saveElement(id)
    {       
        var str =document.getElementById('desc').value+',';
        str = str+ document.getElementById('vol').value+',';
        if (document.getElementById('amp').value=='OF,')
        {
            str = str+ 'OF';    
        }
        else
        {
        str = str+ document.getElementById('amp').value +document.getElementById('ampNo').value+',';
        }
        str = str+ document.getElementById('wah').value+',';
        str = str+ document.getElementById('comp').value+',';
        str = str+ document.getElementById('bass').value+',';
        str = str+ document.getElementById('mid').value+',';
        str = str+ document.getElementById('treb').value+',';
        str = str+ document.getElementById('noise').value+document.getElementById('noiseNo').value+',';
        if (document.getElementById('mod').value=='OF,')
        {
            str = str+ 'OF';    
        }
        else
        {
            str = str+ document.getElementById('mod').value+document.getElementById('modNo').value+',';    
        }
        
        if (document.getElementById('delay').value=='OF')
        {
            str = str+ 'OF,';    
        }
        else
        {
           str = str+ document.getElementById('delay').value+document.getElementById('delayNo').value+"-"+document.getElementById('delayTime').value+',';   
        }
        
        if (document.getElementById('reverb').value=='OF')
        {
            str = str+ 'OF';    
        }
        else
        {
            str = str+ document.getElementById('reverb').value+document.getElementById('reverbNo').value;
        }
    document.getElementById(id).value=str;
    ELEMENT=id;
    }

function updateARR()
{
   alert('updating')
   var j=1;
   var arr=document.getElementById('a0').value;
   while(j<40)
   {
        if (document.getElementById('a'+j).value!== undefined){arr=arr+'\n'+document.getElementById('a'+j).value;}
        else{arr=arr+('\n');}
        j=j+1;
   }
   ARRSettings=arr.split('\n');
   alert(ARRsettings)
}




function loadDefault()//loads a default element into the edit box
{
//str='crap,33,b4,SH,6,b2,d6,t9,g9,t3,d3,P3'
 str='???,99,OF,OF,OF,b5,d5,t5,OF,OF,OF,OF';
 loadString(str);
}