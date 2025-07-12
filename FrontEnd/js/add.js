const textarea = document.getElementById("md");
const preview = document.getElementById("preview");

function addPreview() {
preview.innerHTML = marked.parse(textarea.value || "");
}

addPreview();
textarea.addEventListener("input", addPreview);

textarea.addEventListener("keydown", function (e) {
if (e.key === "Tab") {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 1;
    addPreview();
}
});

// 🔁 HOME button -> redirect to "/"
document.querySelector("[title='Home']").addEventListener("click", () => {
window.location.href = "/";
});

// 🔁 CANCEL button -> redirect to "/"
document.querySelector(".cancel").addEventListener("click", () => {
window.location.href = "/";
});

// ✅ ADD button -> save file
document.querySelector(".add").addEventListener("click", () => {
const fileName = document.getElementById("editable-heading").value.trim();
const content = textarea.value.trim();

if (!fileName) {
    alert("Please enter a filename.");
    return;
}

fetch("http://127.0.0.1:1234/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: fileName, content: content })
})
    .then(res => res.text())
    .then(msg => {
    // alert(msg);
    window.location.href = `/viewNotes.html?name=${encodeURIComponent(fileName)}`;
    })
    .catch(err => {
    console.error("Error saving file:", err);
    alert("Failed to save the note.");
    });
});

// 🖱️ Resizer (unchanged)
const resizer = document.getElementById("resizer");
const left = document.getElementById("left");
const right = document.getElementById("right");
const container = document.querySelector(".container");
let isDragging = false;

resizer.addEventListener("mousedown", function (e) {
e.preventDefault();
isDragging = true;
});

window.addEventListener("mousemove", function (e) {
if (!isDragging) return;

const isVertical = window.innerWidth <= 768;

if (isVertical) {
    const containerHeight = container.offsetHeight;
    const topHeight = containerHeight - (e.clientY - container.getBoundingClientRect().top);

    if (topHeight < 100 || containerHeight - topHeight < 100) return;

    left.style.height = `${topHeight}px`;
    right.style.height = `${containerHeight - topHeight - resizer.offsetHeight}px`;
} else {
    const containerWidth = container.offsetWidth;
    const leftWidth = e.clientX - container.getBoundingClientRect().left;

    if (leftWidth < 100 || containerWidth - leftWidth < 100) return;

    left.style.width = `${leftWidth}px`;
    right.style.width = `${containerWidth - leftWidth - resizer.offsetWidth}px`;
}
});

window.addEventListener("mouseup", function () {
isDragging = false;
});
