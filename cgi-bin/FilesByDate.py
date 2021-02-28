import os
import glob
def FilesByDate(path,path_to,extension):
    l=""
    path="C:/Users/fkapa/Dropbox/fredzone/Lyric/Text/"
    path_to="C:/Users/fkapa/Dropbox/fredzone/Lyric/Sets/Most Recent.txt"
    l=len("C:/Users/fkapa/Dropbox/fredzone/Lyric/Text/")
    files = glob.glob("C:/Users/fkapa/Dropbox/fredzone/Lyric/Text/*.txt")
    files.sort(key=os.path.getmtime, reverse=True)
    for file in files:
        n=file[l:]
        n=n[:-4]
        l=l+n(n)
    f= open(path_to,"w+")
    f.write(l)
    f.close()
    print("See file at "+path_to)
