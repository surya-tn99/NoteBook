const preview = document.getElementById("preview");

function updatePreview(content) {
// console.log(content);
    preview.innerHTML = marked.parse(content);
}

const params = new URLSearchParams(window.location.search);
// console.log(window.location.href);
const fileName = params.get("name");
// console.log(fileName);

document.getElementById("heading").textContent = fileName;

fetch(`markdownFiles/${fileName}.md?v=${Date.now()}`)
    .then(res => res.text())
    .then(md => updatePreview(md))
    .catch(err => console.error("Error loading markdown:", err));

document.getElementById("editBtn").addEventListener("click", () => {
    // alert("Edit clicked!");
    window.location.href = `editNotes.html?name=${fileName}`;
});

document.getElementById("deleteBtn").addEventListener("click", () => {
    // alert("Delete clicked!");
    fetch("http://127.0.0.1:1234/delete" ,{
        method : "POST",
        headers : {
            "Content-Type":"text/plain"
            },
        body: fileName
    })
    .then(res=>{
    if(!res.ok){
        throw new Error("error at response");
    }
    return res.text()})
    .then(msg=>{
    
    if(msg=="deleted"){
            // console.log("deleted successfully");
    window.location.href = '/';
        }
        else if(msg == "not deleted"){
            alert("can't be deleted");
        }
    })
    .catch(err=>{
        console.error(err);
    })
    
});
