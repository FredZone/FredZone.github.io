#!/"C:/Program Files/Python39/python"
import os
import glob
def MakeFileList(path,path_to,extension):
    n=""
    l=""
    for root, dirs_list, files_list in os.walk(path):
        for file_name in files_list:
            if os.path.splitext(file_name)[-1] == extension:
                file_name_path = os.path.join(root, file_name)
                n=file_name[:-4]
            l=l+n+"\n"

    l=l[:-1]
    f= open(path_to,"w+")
    f.write(l)
    f.close()
    print("Updated: "+path_to)

def FilesByDate(path,path_to,extension):
    s=""
    l=len(path)+1
    files = glob.glob(path+"/*"+extension)
    files.sort(key=os.path.getmtime, reverse=True)
    for file in files:
        n=file[l:]
        n=n[:-4]
        s=s+n+('\n')
    f= open(path_to,"w+")
    f.write(s)
    f.close()
    print("Updated: "+path_to)
    
def WriteFile(path,txt):
    f= open(path,"w+")
    f.write(txt)
    f.close()
    print("Wrote File: "+path)
