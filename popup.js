//  event listener to the upload button
document.getElementById('uploadBtn').addEventListener('click', () => {
    // Get the file input element
    const fileInput = document.getElementById('fileInput');
    
    //  if a file is selected
    if (fileInput.files.length === 0) {
        alert('Please select an image file.'); // alert if no file is selected
        return;
    }

    // Get the file
    const file = fileInput.files[0];
    
    // Get the language
    const languageSelect = document.getElementById('languageSelect');
    const language = languageSelect.value;

    // Create  FileReader to read the file
    const reader = new FileReader();
    
    // Define what happens when the file is read
    reader.onloadend = () => {
        // Send a message to the background script to perform OCR
        chrome.runtime.sendMessage(
            { action: 'performOCR', data: reader.result,language:language}, // Send the encoded image data and selected language
            (response) => {
                // Handle the response from the background script
                if (response && response.text) {
                    // Display the OCR result in the 'result' element
                    document.getElementById('result').innerText = response.text;
                } else {
                    // Display an error message if OCR failed
                    document.getElementById('result').innerText = 'Failed to perform OCR.';
                    console.error('OCR failed:', response); // Error
                }
            }
        );
    };
    
    // Read file as dataurl
    reader.readAsDataURL(file);
});
