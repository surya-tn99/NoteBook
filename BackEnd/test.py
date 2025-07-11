import os

def list_files():
    folder_path = "./FrontEnd/markdownFiles"
    try:
        files = [
            f[:-3]  # remove .md extension
            for f in os.listdir(folder_path)
            if f.endswith(".md")
        ]
        return files
    except Exception as e:
        return {"error": str(e)}
    
print(list_files())
