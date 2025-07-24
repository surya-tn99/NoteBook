from flask import Flask , request , jsonify
from flask_cors import CORS
import os

server = Flask(__name__)
CORS(server)

folder_path = os.path.join(os.path.dirname(__file__), "../FrontEnd/markdownFiles")
    
@server.route("/files", methods=["GET"])
def list_files():

    # if markdown files folder does not exist then create it 
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


    try:
        files = [
            (f[:-3],  # remove .md extension
            os.path.getmtime(os.path.join(folder_path , f))
            )
            for f in os.listdir(folder_path)
            if f.endswith(".md")
        ]
        # sort the files list based on modify date and time
        sorted_files_list =[f[0] for f in  sorted(files , key=lambda x : x[1] , reverse= True )]
    
        return jsonify(sorted_files_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@server.route("/rename", methods=["POST"])
def rename_file():
    try:
        data = request.get_json()
        old = data.get("old", "").strip()
        new = data.get("new", "").strip()


        if not old or not new:
            return "Filename missing", 400

        base_path = os.path.dirname(os.path.abspath(__file__))  # folder of server.py
        folder = os.path.join(base_path, "../FrontEnd/markdownFiles")
        old_path = os.path.join(folder, f"{old}.md")
        new_path = os.path.join(folder, f"{new}.md")
        
        if not os.path.exists(old_path):
            return "Original file not found", 404
        if os.path.exists(new_path):
            return "New filename already exists", 409

        os.rename(old_path, new_path)
        return "Renamed"

    except Exception as e:
        print("Rename failed:", e)
        return "Internal server error", 500

@server.route("/update", methods = ["POST"])
def updateFile():
    data = request.get_json()
    filename = data.get("filename")
    content = data.get("content")
    
    if not filename or not content:
        return "not updated"
    
    try:
        path = os.path.join(folder_path, f"{filename}.md")

        with open(path,"w",encoding="utf-8") as file:
            file.write(content)
    
        return "updated"
    
    except Exception as err:
        print("error --> ",err)
        return "not updated"

@server.route("/delete", methods = ["POST"])
def deleteFile():
    fileName = request.data.decode("utf-8").strip()
    path = os.path.join(folder_path, f"{fileName}.md")
    try:
        os.remove(path)
        return "deleted"
    except FileNotFoundError as err:
        print("file is not found -> ",err)
        return "not deleted"

if __name__ == "__main__":
    server.run(port = 1234)