//^RESERVED VARIABLES FOR GLOBAL ROUTINES KEEP THESE
var TEMPflag;//REQUIRED FOR processLocalFile()
var TEMPlocalFileName="unknown"//REQUIRED FOR processLocalFile()
var TEMP="Initialized";//REQUIRED FOR processLocalFile()

/*FILE FUNCTIONS================================================================
    INFO
        loads the text file as TEMP then processes TEMP using the function 'process'  i.e. process='alert(TEMP)' 
        CLEAR TEMPflag ASAP after use...DANGEROUS
        note 'nested' readSingleFile(e)

*/

function processLocalFile(process) {//use TEMP as file Name when defining the process (i.e 'alert(TEMP)')
    TEMPflag=process
    document.getElementById('fileInput').addEventListener('change', processLocalFileB, false)
}

function processLocalFileB(e) {//second half or process
    var file = e.target.files[0];
    TEMPlocalFileName = e.target.files[0].name;
    if (!file) {
        TEMPflag=undefined;
        alert("Failed to get Local File...");
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        TEMP = e.target.result;
        eval(TEMPflag);
        TEMP=undefined;
    }; //EVAL is EVIL, find something else
    reader.readAsText(file);
}


