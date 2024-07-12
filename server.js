const express = require('express'); // import express
const Tesseract = require('tesseract.js'); // import Tesseract for OCR
const bodyParser = require('body-parser'); // import body-parser
const cors = require('cors'); // import cors for handling cross-origin requests

const app = express(); // create express app
const PORT = process.env.PORT || 3000; // set port

app.use(cors()); // enable CORS for all routes

app.use(bodyParser.json({limit:"10mb"})); // parse JSON bodies, set size limit

app.post('/upload', (req, res) => {
    // remove data URL prefix from imagedata data
    const { image, language } = req.body;
    const imagedata = image.replace(/^data:imagedata\/(png|jpeg|jpg);base64,/, '');

    // use Tesseract to recognize text in imagedata
    Tesseract.recognize(Buffer.from(imagedata, 'base64'), language)
        .then(({ data: { text } }) => {
            res.json({ text }); // send recognized text in response
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to process imagedata' }); // send error response
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // start server
});
