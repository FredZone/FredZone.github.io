#"x" - Create - will create a file, returns an error if the file exist
#"a" - Append - will create a file if the specified file does not exist
#"w" - Write - will create a file if the specified file does not exist

f= open("guru99.txt","w+")
f.write("This is line")
f.close()

c = open("guru99.txt", "r")
c=c.read()

f= open("Read File.txt","w+")
f.write(c)
f.close()

c='BULLSHIT'
# comment must have space...
f= open("guru101.txt","w+")
f.write(c)
f.close()

import os 
n=(os.name)
f= open("Current OS and Directory.txt","w+")
f.write(n+"\n")
n=os.getcwd()
f= open("guru102.txt","a+")
f.write(n)
f.close()


