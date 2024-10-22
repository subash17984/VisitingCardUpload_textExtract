const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

// Create the uploads directory if it doesn't exist
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
// Set up Multer storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir); // Specify the folder to save the files
    },
    filename: (req, file, cb) => {
        // Save file with original name
        cb(null, file.originalname);
    }
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

// Middleware for OCR processing
const processImage = (req, res, next) => {
    const filePath = req.file.path;

    Tesseract.recognize(
        filePath,
        'eng',
        {
            logger: (m) => console.log(m), // Optional: log progress
        }
    )
        .then(({ data: { text } }) => {
            req.extractedText = text; // Store extracted text in request
            req.parsedData = parseText(text); // Parse the text and store in request
            next(); // Proceed to the next middleware
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error processing the image.');
        });
};

// Function to parse extracted text
const parseText = (text) => {
    const lines = text.split('\n');
    const data = {};
    lines.forEach((line) => {
        if (line.includes('Name')) {
            data.name = line.split(':')[1]?.trim();
        }
        else if (line.toLowerCase().includes('job title')) {
            data.jobTitle = line.split(':')[1]?.trim();
        }
        else if (line.toLowerCase().includes('company')) {
            data.companyName = line.split(':')[1]?.trim();
        }
        else if (line.toLowerCase().includes('email')) {
            data.name = line.split(':')[1]?.trim();
        }
        else if (line.toLowerCase().includes('phone')) {
            data.phone = line.split(':')[1]?.trim();
        }
        else if (line.includes('address')) {
            data.emailAddress = line.split(':')[1]?.trim();
        }
    });
    return data;
};

module.exports = { upload, processImage };

