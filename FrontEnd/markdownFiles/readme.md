# _NoteBook_ 

**NoteBook** is a lightweight, offline markdown note-taking web application. It provides a simple web interface to create, view, edit, and manage `.md` files stored locally on your system. It is built using **Flask (Python)** as a backend API and plain **HTML/CSS/JS** for the frontend. It’s designed for offline usage and is ideal for personal note management.


##  Requirements
To run server.py, you need the flask library. Install it using:
```
pip install flask
# or
pip3 install flask 
```

##  How to Run NoteBook

1. Clone the repository:

```
git clone https://github.com/surya-tn99/NoteBook.git
cd NoteBook
````

2. Run the Flask server on backend folder:
```
cd backend
python3 server.py  # or use `python` if it points to Python 3 on your system
```

3. Access NoteBook in your browser:

```
http://127.0.0.1:1234
```

## Features

*  Fully offline — no internet  required
*  Minimal UI with live markdown preview
*  Markdown files are stored in a local folder
*  Create, edit, rename, and delete notes with ease

## 🌐 API Endpoints (Flask)

| Method | Endpoint  | Purpose                          |
| ------ | --------- | -------------------------------- |
| GET    | `/files`  | List all markdown filenames      |
| POST   | `/update` | Create or update a markdown file |
| POST   | `/delete` | Delete a markdown file           |
| POST   | `/rename` | Rename a markdown file           |