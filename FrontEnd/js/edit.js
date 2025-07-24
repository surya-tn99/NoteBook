
const textarea = document.getElementById("md");
const preview = document.getElementById("preview");

function updatePreview() {
    preview.innerHTML = marked.parse(textarea.value);
}

const params = new URLSearchParams(window.location.search);
const fileName = params.get("name");

document.getElementById("editable-heading").innerText = fileName;

fetch(`markdownFiles/${fileName}.md?v=${Date.now()}`)
    .then(res => res.text())
    .then(md => {
    textarea.value = md;
    updatePreview();
    })
    .catch(err => console.error("Error loading markdown:", err));

textarea.addEventListener("input", updatePreview);

textarea.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 1;
    updatePreview();
    }
});

document.querySelector(".update").addEventListener("click", () => {
    // alert("Update clicked!");
// const NewfileName = document.getElementById("editable-heading").value;
document.getElementById("editable-heading").textContent = fileName;
    fetch("/update", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        filename : fileName,
        content : textarea.value
    })
    })
    .then(res => res.text())
    .then(msg => {
        if (msg == "updated") {
        console.log("updated successfully");
        window.location.href = `viewNotes.html?name=${fileName}`;

        }
        else {
        alert("can't be updated");
        }
    })
    .catch(err => {
        console.error(err);
    });

});

document.querySelector(".cancel").addEventListener("click", () => {
    // alert("Cancel clicked!");
    window.location.href = `viewNotes.html?name=${fileName}`;
});

const resizer = document.getElementById("resizer");
const left = document.getElementById("left");
const right = document.getElementById("right");
let isDragging = false;

resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
});

window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const containerWidth = document.querySelector(".container").offsetWidth;
    const leftWidth = e.clientX;
    const rightWidth = containerWidth - leftWidth - resizer.offsetWidth;

    if (leftWidth < 100 || rightWidth < 100) return;

    left.style.width = `${leftWidth}px`;
    right.style.width = `${rightWidth}px`;
});

window.addEventListener("mouseup", function () {
    isDragging = false;
});
