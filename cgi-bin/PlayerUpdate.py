#!C:/Program Files/Python39/python.exe
print ('Content-type: text/html')
print ('')
print ('<html><head>')
print ('')
print ('</head><body style=\"border:solid\">')
print("<div style=\"background-color:yellow;border:solid\">")
print ('Updating files using Python CGI<br>')
print("</div>")


import os
import MySupport
MySupport.MakeFileList('C:/Users/fkapa/Dropbox/fredzone/Lyric/Backing','C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets/ALL BACKING.txt','.mp3')
print ('<br>')
MySupport.FilesByDate('C:/Users/fkapa/Dropbox/fredzone/Lyric/Text','C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets/ALL RECENT.txt','.txt')
print ('<br>')
MySupport.MakeFileList('C:/Users/fkapa/Dropbox/fredzone/Lyric/Text','C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets/ALL TUNES.txt','.txt')
print ('<br>')
MySupport.MakeFileList('C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets','C:/Users/fkapa/Dropbox/fredzone/Lyric/Top/SetList.txt','.txt')
print ('<br>')
MySupport.WriteFile('C:/Users/fkapa/Dropbox/fredzone/Lyric/Top/PythonUpdate.asc',"PythonUpdate.py successfully executed")
print("<div style=\"color:white;background-color:green;border:solid;border-color:red\">")
print ('UPDATE SUCCESSFUL!!  And File "\'PythonUpdate.asc\' Created')
print("</div>")

#print("<div id ='alert' onclick=\"alert('ALERT')\" style=\"color:red;background-color:yellow;border:solid;border-color:red\">")
#print ('ALERT!!')
#print("</div>")

#print("<div id ='crap' style=\"color:red;background-color:yellow;border:solid;border-color:red\">")
#print ('Box of Nothing!!')
#print("</div>")


#print("<div onclick=\"dis('crap')\" style=\"color:red;background-color:yellow;border:solid;border-color:red\">")
#print ('function test!!')
#print("</div>")

print("<SCRIPT type='text/javascript' SRC = '../Lyric/Top/global.js'></script>")
#<SCRIPT type="text/javascript" SRC = "NextPlayer.js"></script>
print('</body></html>')
