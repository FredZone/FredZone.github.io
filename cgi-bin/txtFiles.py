import os, glob
f=open("START.txt","w+")
f.write("Test Started...")
f.close()




os.chdir(r"C:\Users\fkapa\Dropbox\fredzone\Lyric\Text") 

#    n+file+"/n"
#f= open("Files in Dir.txt","w+")
#f.write(n)
#f.close()

f= open("Sys and Dir.txt","w+")
n="Operating System : "+  (os.name)
n=n+"\nCurrent Dirctory : "+  os.getcwd()
f.write(n)
f.close()


f= open("FINISH.txt","w+")
f.write("Test over")
f.close()





