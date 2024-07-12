# ocr

This is an basic OCR project made in lambda summer mentorship i made it while learning so it is very basic and i have just focused on functioning so stuling is not added in it.

to run the project use "node server.js" in terminal, then go to google chrome enable developer mode and click on unload button and then select this file to add the extension then open the extension choose your laguage you want to convert text upload the image file and click "Upload and Scan".
Rest will be taken care by Tesseract.

I have used cors, body parser and most important Tesseract for image scanning and converting.
On Upload click the frontednd sends a performOCR request to backend where the image url is spiliced to raw form required for tesseract it reads the image and gives out json objects the language is also handled in there server.js. 
The acquired text is sent back to popup.js where it sets the inner text for result div and if there is some error the result to set as error sent by server.js.
background.js runs the application on chrome local host and handles the post request at 3000/upload.It sednds back the response from chrome or error (if any)
manifesr.json is a required file for making chrome extensions