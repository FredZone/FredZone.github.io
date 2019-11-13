var crap ="CFV.txt";
var FILEname ="ALL TUNES";
var MODE ='allTunes';
var Fobj; //File object
var Fstr;  //File String // csv of file names



function directCopy(str){//Copy to Clipboard...based on https://stackoverflow.com/a/12693636
    document.oncopy = function(event) {
        event.clipboardData.setData("Text", str);
        event.preventDefault();};
    document.execCommand("Copy");
        document.oncopy = undefined;}

function viewPage()
        {
                var myWindow = window.open("", "myWindow", "width=200, height=100");
                myWindow.document.write(document.getElementById('screen').value);
        }

window.onload = function()
        {
                fileInput.addEventListener
                ('change', function ()
                        {      
                                formatFileString();
                                //alert('Fstr: '+Fstr);
                                //CREATE THE DOWNLINK AND SHOW IT
                                downloadlink.download = FILEname;//
                                
                                link = document.getElementById('downloadlink');
                               // alert('link:'+link);
                                link.href =setupFile(Fstr);
                                //alert('link.href: '+link.href)
                                link.style.display = 'block';//show the download link to the user
                        },false
                ); 
                MODE='none';
                document.getElementById("ext").checked = true;
                document.getElementById("file").checked = true;
                document.getElementById("pickDir").innerHTML ="?????";
                document.getElementById("saveDir").innerHTML ="?????";
                document.getElementById("opts").style.visibility ='visible';
                document.getElementById("cover").style.visibility ='hidden';
                document.getElementById("mode").selectedIndex = 0;
                document.getElementById("src").style.visibility ='hidden';
                document.getElementById('screen').value="File will appear here....";
       };

function home(){window.open("index.html");} 

function SelectMode(mode)
        {       document.getElementById('screen').value="File will appear here....";
                MODE =mode;
                //alert(MODE);
                document.getElementById('src').style.visibility='hidden';//only used on web
                document.getElementById("downloadlink").style.display='none';
                if (MODE =="user")
                {       
                        document.getElementById('fileFormat').typ[0].checked=true;
                        document.getElementById('filt').selectedIndex=0;
                        document.getElementById("pickDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\top";
                        document.getElementById("saveDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\top";
                        document.getElementById("saveFile").value ="????";
                        document.getElementById("src").value ="";
                        document.getElementById("src").style.visibility ="hidden";
                }
                else if (MODE=="allTunes")
                {       
                        document.getElementById('fileFormat').typ[1].checked=true;
                        document.getElementById('filt').selectedIndex=1;
                        document.getElementById("pickDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\Text";
                        document.getElementById("saveDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\SETS";
                        document.getElementById("saveFile").value ="ALL TUNES.txt";
                        document.getElementById("src").value ="";
                        document.getElementById("src").style.visibility ="hidden";
                }
                else if (MODE=="setList")
                {       
                        document.getElementById('fileFormat').typ[1].checked=true;
                        document.getElementById('filt').selectedIndex=1;
                        document.getElementById("pickDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\SETS";
                        document.getElementById("saveDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\top";
                        document.getElementById("saveFile").value ="SETlist.txt";
                        document.getElementById("src").value ="";
                        document.getElementById("src").style.visibility ="hidden";
                }
                else if (MODE=="backingList")
                {       
                        document.getElementById('fileFormat').typ[1].checked=true;
                        document.getElementById('filt').selectedIndex=1;
                        document.getElementById("pickDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\backing";
                        document.getElementById("saveDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\top\\";
                        document.getElementById("saveFile").value ="ALL TRACKS.txt";
                        document.getElementById("src").value ="";
                        document.getElementById("src").style.visibility ="hidden";
                }
                else if (MODE=="wordPage")
                {       
                        document.getElementById('fileFormat').typ[2].checked=true;
                        document.getElementById('filt').selectedIndex=4;
                        document.getElementById("pickDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\doc";
                        document.getElementById("saveDir").value ="C:\\Users\\fkapa\\Dropbox\\fredzone\\Lyric\\doc";
                        document.getElementById("saveFile").value ="index.html";
                        document.getElementById("src").value ="";
                        document.getElementById("src").style.visibility ="visible";
                }
                directCopy(document.getElementById("pickDir").value)
                document.getElementById("downloadlink").style.display='none';
        document.getElementById("cover").style.visibility ='hidden';
        }

function setupFile(text)
        {
                var textFile = null;//kill any residual textFile        
                if(textFile !== null)
                        {   //alert("revoking url");
                            window.URL.revokeObjectURL(textFile);
                        }
                var data = new Blob([text], {type: 'text/plain'});
                if (textFile !== null)// If we are replacing a previously generated file we need to manually revoke the object URL to avoid memory leaks.
                        {   //alert("revoking url")
                            window.URL.revokeObjectURL(textFile);
                        }
                textFile = window.URL.createObjectURL(data);   //create a data object
                return textFile;
        }

function formatFileString()//procerss the file object into a string (Fstr)to write to the file 
        {
                var ftype = document.getElementById('fileFormat').typ.value;
                var j=0;
                var x;
                var path =document.getElementById('src').value;
                var typ= document.getElementById('filt').value;//Fstr=null;Fobj=null;
                Fobj = document.getElementById('fileInput').files;//created fileInput in first step
                Fstr = makeListFileNames(Fobj);//this must be a property of a file object
                //var ext= document.getElementById('ext').checked;
                arrFiles = Fstr.split(',');//split into
                var filtStr="";
                //alert(typ)
                if (typ!=="all")
                {
                j =0;
                        while (j<arrFiles.length)
                        {
                                x=arrFiles[j].split('.');
                                if (x[1]==typ){filtStr=filtStr+arrFiles[j]+",";}
                                j=j+1;
                        }        
                        //alert(filtStr)
                        arrFiles=filtStr.split(",");
                }
                
                if (ftype=='names')//remove the file extension
                        {
                                j =0;
                                while (j<arrFiles.length)
                                {
                                        x=arrFiles[j].split('.');
                                        arrFiles[j]=x[0];
                                        j=j+1;
                                }
                        Fstr=arrFiles.join('\n');
                        }
                if (ftype=='files')//remove the file extension
                        {
                        Fstr=arrFiles.join('\n');
                        }
                if (ftype=='csv')//remove the file extension
                        {
                        Fstr=arrFiles.join(',');
                        }
                if (ftype=='wpage')//remove the file extension
                         {
                                path =document.getElementById('src').value;
                                if (path===undefined | path==="") {path="";}
                                //alert(path)
                                j =0;
                                while (j<arrFiles.length)
                                {
                                        x=arrFiles[j].split('.');
                                        arrFiles[j]="<a href ='"+path+arrFiles[j]+"'>"+x[0]+"</a>";
                                        j=j+1;
                                }
                        Fstr=arrFiles.join('<br>\n');
                         }
                document.getElementById("screen").value = Fstr;//just so you can see it..
        }

//Universal Functions..........................................................
function makeListFileNames(FO)// extracts a CSV of file names from a FILE OBJECT :FO
        {
            var strFiles="";
            strFiles = strFiles+FO[0].name;
            for (var i = 1; i < FO.length; i++)
                {           
                    strFiles =strFiles+","+FO[i].name ;
                }
            return strFiles;
        }
        
        function help()
        {
                var hlp ="HELP\nNothing Here Yet...";
                alert(hlp);
        }