chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'performOCR') {
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: message.data })
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({ text: data.text });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            sendResponse({ text: null });
        });
        return true;  // Keeps the message channel open for async response
    }
});
