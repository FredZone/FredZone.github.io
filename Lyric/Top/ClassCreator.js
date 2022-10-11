var SCORE=0   
var QCNT=0
var LESSON="https://www.classcreator.com/Butte-Montana-Butte-Central-1964/class_profile.cfm?member_id=9149665"
var PIC="https://s3.amazonaws.com/s3images.classcreator.com/25868/001/6338272/Rich-Jones-Jones-YEARBOOK-1964-Butte-Central-High-School-7DF302CB-90B1-1C17-D1BE942E8BF17A54-LG.jpg"
var SEL="<option"
var QUES="Who Originally Created this Site?"
var STRno=1
var STR

//====================================================
var LESSON="https://www.classcreator.com/Butte-Montana-Butte-Central-1964/class_profile.cfm?member_id=9149665"

var STR1="Which brother is in the picture??,https://www.classcreator.com/000/8/6/8/25868/userfiles/image/Farrell_2.png,<option value=0 selected>Select...</option><option value=0>Concannon</option><option value=1>Farrell</option><option value=0>Greytak</option><option value=0>O'Donnell</option><option value=0>Sullivan</option>"

var STR1A="What City did Brother Farrell die in?,https://s3.amazonaws.com/s3images.classcreator.com/25868/001/9149665/James-Farrell-B-C-Faculty-YEARBOOK-1964-Butte-Central-High-School-2D5CCFDE-A75F-31F6-663AC9208FA76095-LG.png,<option value=0>Select</option><option value=1>Butte</option><option value=0>Helena</option><option value=0>Billings</option><option value=0>Great Falls</option><option value=0>New York</option>"

STR2="Who Originally Created this Site?,https://s3.amazonaws.com/s3images.classcreator.com/25868/001/6443436/LARRY-JOHNSON-YEARBOOK-1964-Butte-Central-High-School-7DE55584-90B1-1C17-D1BEDCBC0A9B8BF1-LG.jpg,<option value=0>J.T.Concannon</option><option value=0>Tom Jones</option><option value=1>R. Jones</option><option value=0>D. Plessas</option><option value=0>A. Greytak</option>"
//==========================================
window.onload = function() {
STR=STR1       
setUpQ(STR)
localStorage.setItem('Qno', 1);
alert(localStorage.getItem('Qno'));
QCNT=QCNT+1  

}

function setUpQ(STR){
        var arr=STR.split(',')
        QUES=arr[0]
        PIC=arr[1]
        SEL=arr[2]
        document.getElementById('pic').src=PIC;
        document.getElementById('slct').innerHTML=SEL;
        document.getElementById('qstn').innerHTML=QUES;
}
        
function check(a) {
        QCNT=QCNT+1  
        if(a==1) {
        SCORE=SCORE+1       
        alert ("CORRECT! Score:  "+SCORE +" for "+QCNT)
     }else{
        alert ("WRONG..."+SCORE +" of "+QCNT+"\nRead the next page and return for the next Question")
        window.location.href = LESSON
       // knfrm("You Failed!\nRead the next Page and we will give you a new Question","https://www.classcreator.com/Butte-Montana-Butte-Central-1964/class_profile.cfm?member_id=9149665")
     }
}
