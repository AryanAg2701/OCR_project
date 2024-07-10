document.getElementById('uploadBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        chrome.runtime.sendMessage({ action: 'performOCR', data: reader.result }, (response) => {
            if (response && response.text) {
                document.getElementById('result').innerText = response.text;
            } else {
                document.getElementById('result').innerText = 'Failed to perform OCR.';
                console.error('OCR failed:', response);
            }
        });
    };
    reader.readAsDataURL(file);
});
