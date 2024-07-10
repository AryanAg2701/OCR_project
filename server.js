const express = require('express');
const Tesseract = require('tesseract.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    const image = req.body.image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    Tesseract.recognize(Buffer.from(image, 'base64'), 'eng')
        .then(({ data: { text } }) => {
            res.json({ text });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to process image' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
