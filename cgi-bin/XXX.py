import os

# This is the path where you want to search
path = r'C:/Users/fkapa/Dropbox/fredzone/Lyric/Text'  

# this is extension you want to detect
extension = '.txt'   # this can be : .jpg  .png  .xls  .log .....
n=""
l=""
for root, dirs_list, files_list in os.walk(path):
    for file_name in files_list:
        if os.path.splitext(file_name)[-1] == extension:
            file_name_path = os.path.join(root, file_name)
            n=file_name[:-4]
        l=l+n+"\n"

l=l[:-1] #trim last linefeed
f= open("C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets/ALL TUNES.txt","w+")
f.write(l)
f.close()
