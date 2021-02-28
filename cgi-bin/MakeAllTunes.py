import os
path=r'C:/Users/fkapa/Dropbox/fredzone/Lyric/Text' 
extension=".txt"
path_to= "C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets/ALL TUNES.txt"
n=""
l=""
for root, dirs_list, files_list in os.walk(path):
    for file_name in files_list:
        if os.path.splitext(file_name)[-1] == extension:
            file_name_path = os.path.join(root, file_name)
            n=file_name[:-4]
        l=l+n+"\n"

l=l[:-1] #trim last linefeed
f= open(path_to,"w+")
f.write(l)
f.close()

