#!C:/Program Files/Python39/python.exe
# Import modules for CGI handling
import cgi, cgitb
import os
import MySupport
# Create instance of FieldStorage
form = cgi.FieldStorage()
# Get data from fields
file_name = form.getvalue('file_name')
file_content = form.getvalue('file_content')

print("Content-type:text/html\r\n\r\n")
print("<html>")
print("<head>")
print("<title>Test2.py: Python CGI Demo Program</title>")
print("</head>")
print("<body>")
print("<div style=\'border:solid\'>")
print("File Maker <br>" )
print("C:/Users/fkapa/Dropbox/fredzone/Lyric/Text/"+file_name+".ASC will be created")
print("<br>Executing Write...<br>" )
MySupport.WriteFile("C:/Users/fkapa/Dropbox/fredzone/Lyric/Text/"+file_name+".ASC",file_content)
print("</div>")
print("</body>")
print("</html>")
