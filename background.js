// listener for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // if action is 'performOCR'
    if (message.action === 'performOCR') {
        // send a post request OCR
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            // to include image data and language in the request body
            body: JSON.stringify({ image: message.data,language: message.language })
        })
        .then(response => response.json()) // parse the JSON response
        .then(data => {
            // reseend the OCR result
            sendResponse({ text: data.text });
        })
        .catch(error => {
            // Error
            console.error('Fetch error:', error);
            sendResponse({ text: null });
        });
        return true;
    }
});
