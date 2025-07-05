# 📓 Markdown Viewer

A live, split-screen Markdown editor built with HTML, CSS, and JavaScript. Styled with a Google Docs-like interface and GitHub-style markdown preview.

## ✨ Features

- 📝 **Markdown Editor** (left panel)
- 👁️ **Live Preview** (right panel)
- 🎨 GitHub-like markdown rendering
- 📐 Resizable split view (drag center divider)
- 🧠 Smart tab handling inside the editor
- 💾 Loads content from `test.md` on start
- ☁️ Clean UI with Google-style buttons and layout

## 📂 Layout Overview

| Section         | Description                                                |
|----------------|------------------------------------------------------------|
| **Header**      | Title on the left, Update/Cancel buttons on the right     |
| **Left Panel**  | Markdown editor (textarea)                                 |
| **Right Panel** | Live markdown preview using `marked.js`                    |
| **Resizer**     | Draggable divider to resize left/right widths              |

## 🧱 Technologies Used

- **HTML5** / **CSS3**
- **JavaScript (Vanilla)**
- **[Marked.js](https://github.com/markedjs/marked)** – Markdown to HTML converter
- **[GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css)** – For GitHub-style markdown rendering
- **Google Fonts (Google Sans)** – For clean typography

## 🚀 Usage

1. Write Markdown in the left editor panel.
2. See formatted output instantly in the right panel.
3. Drag the center divider to resize.
4. Click **Update** or **Cancel** as needed (currently just shows alerts).

## 💡 Future Enhancements

- [ ] Add Save to `.md` file
- [ ] Add dark/light theme toggle
- [ ] Support image previews
- [ ] Sync with localStorage or GitHub Gist

> Built with 💻 by **Balasurya**

![image][def]

[def]: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/800px-A._P._J._Abdul_Kalam.jpg