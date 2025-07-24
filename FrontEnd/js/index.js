fetch("/files")
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

            li.onclick = () => viewNote(file);

            li.innerHTML = `
                <span class="file-name">${file}</span>
                <div class="actions">
                    <button class="view-btn">View</button>
                    <button class="rename-btn">Rename</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            // Attach event listeners to buttons and stop event propagation
            li.querySelector(".view-btn").onclick = (e) => {
                e.stopPropagation();
                viewNote(file);
            };

            li.querySelector(".rename-btn").onclick = (e) => {
                e.stopPropagation();
                renameNote(file);
            };

            li.querySelector(".delete-btn").onclick = (e) => {
                e.stopPropagation();
                deleteNote(file);
            };

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

    fetch("/rename", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ old: oldName, new: newName })
    })
    .then(res => res.text())
    .then(() => location.reload())
    .catch(err => {
        console.error("Rename error:", err);
        alert("Failed to rename.");
    });
}

function deleteNote(name) {
    if (!confirm(`Delete "${name}"?`)) return;

    fetch("/delete", {
        method: "POST",
        body: name
    })
    .then(res => res.text())
    .then(() => location.reload())
    .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete.");
    });
}
