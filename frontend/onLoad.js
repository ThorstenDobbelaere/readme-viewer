document.getElementById('readBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file first!');
        return;
    }
    const filePath = fileInput.files[0].name;
    console.log(filePath)

    const content = await window.api.read(filePath);
    console.log(content);
    document.getElementById('output').innerText = content;
});