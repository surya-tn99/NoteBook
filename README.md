# _NoteBook_ 

**NoteBook** is a lightweight, offline markdown note-taking web application. It provides a simple web interface to create, view, edit, and manage `.md` files stored locally on your system. It is built using **Flask (Python)** as a backend API and plain **HTML/CSS/JS** for the frontend. It’s designed for offline usage and is ideal for personal note management.


##  How to Run NoteBook(Windows)

1. Clone the repository:

```
git clone https://github.com/surya-tn99/NoteBook.git
cd NoteBook
````

2. Execute the bat file:
```
NoteBook.bat
```

3. NoteBook will be opened on  browser at :

```
http://127.0.0.1:5678
```

---

## 🌐 API Endpoints (Flask)

| Method | Endpoint  | Purpose                          |
| ------ | --------- | -------------------------------- |
| GET    | `/files`  | List all markdown filenames      |
| POST   | `/update` | Create or update a markdown file |
| POST   | `/delete` | Delete a markdown file           |
| POST   | `/rename` | Rename a markdown file           |

---

## Features

*  Fully offline — no internet  required
*  Minimal UI with live markdown preview
*  Markdown files are stored in a local folder
*  Create, edit, rename, and delete notes with ease
