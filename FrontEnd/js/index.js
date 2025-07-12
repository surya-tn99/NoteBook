fetch("http://127.0.0.1:1234/files")
    .then(res => res.json())
    .then(data => {
    const fileList = document.getElementById("fileList");
    if (data.error) {
        fileList.innerHTML = `<li>Error: ${data.error}</li>`;
        return;
    }

    if (data.length === 0) {
        fileList.innerHTML = `<li>No markdown files found.</li>`;
        return;
    }

    data.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `
        <a href="viewNotes.html?name=${encodeURIComponent(file)}">${file}</a>
        <div class="actions">
            <button onclick="viewNote('${file}')">View</button>
            <button onclick="renameNote('${file}')">Rename</button>
            <button onclick="deleteNote('${file}')">Delete</button>
        </div>
        `;

        fileList.appendChild(li);
    });
    })
    .catch(err => {
    console.error("Error fetching file list:", err);
    document.getElementById("fileList").innerHTML = `<li>Failed to load file list.</li>`;
    });

function viewNote(name) {
    window.location.href = `viewNotes.html?name=${encodeURIComponent(name)}`;
}

function renameNote(oldName) {
    const newName = prompt("Enter new name (without .md):", oldName);
    if (!newName || newName.trim() === "") return;

    fetch("http://127.0.0.1:1234/rename", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old: oldName, new: newName })
    })
    .then(res => res.text())
    .then(msg => {
        // alert(msg);
        location.reload();
    })
    .catch(err => {
        console.error("Rename error:", err);
        alert("Failed to rename.");
    });
}

function deleteNote(name) {
    if (!confirm(`Delete "${name}"?`)) return;

    fetch("http://127.0.0.1:1234/delete", {
    method: "POST",
    body: name
    })
    .then(res => res.text())
    .then(msg => {
        // alert(msg);
        location.reload();
    })
    .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete.");
    });
}
