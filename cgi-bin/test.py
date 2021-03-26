#!C:/Program Files/Python39/python.exe
print ('Content-type: text/html')
print ('')
print ('<html><head>')
print ('')
print ('</head><body>')
print ('Python is up and Running!\n')
print ('<div style=\'border:solid\'>')
print ('FILE MAKER...\n')
print ('Enter a file name and file content!\n')
print ('<form action = "/cgi-bin/test2.py" method = "get">')
print ('File Name   : <input type = "text" name = "file_name"> <br />')
print ('File Content: <input type = "text" name = "file_content" />')
print ('<input type = "submit" value = "Submit" />')
print ('</form>')
print ('</div>')

#Alert
print("<div id ='alert' onclick=\"alert('ALERT')\" style=\"color:red;background-color:yellow;border:solid;border-color:red\">")
print ('Click for ALERT!!')
print("</div>")
#Alert
print("<div id ='crapbox' style=\"position:absolute;width:96%;height:50px;color:red;background-color:transparent;border:solid;border-color:red\">")
print("<img id='crap' src=\'..\\icons\\rabbit.png\' style=\"height:100%;\">")
print("<div  onclick=\"dis(\'crap\')\" style=\"position:absolute;top:0px;text-aligh:right; width:200px;height:25px;right:0px;background-color:pink;border:solid;border-color:white\"> Hide / Show Rabbit</div>") 
print("</div>")



print("<SCRIPT type='text/javascript' SRC = '../Lyric/Top/global.js'></script>")
#<SCRIPT type="text/javascript" SRC = "NextPlayer.js"></script>
print('</body></html>')


print ('</body></html>')
