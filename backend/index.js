const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const cors = require('cors');
const app = express();
app.use(express.static('uploads')); // Serve the uploaded files statically
app.use(express.json());
app.use(cors());
// Set up Multer storage configuration
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});
const fileFilter = (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed!'), false); // Reject the file
    }
};

// Create an instance of multer with storage and limits configuration
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 } // 100KB limit
});

// POST endpoint to upload an image
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }
    const originalImageUrl = `http://localhost:3000/${req.file.filename}`;
    const rotatedImageName = 'rotated_' + req.file.filename;
    const rotatedImageUrl = `http://localhost:3000/${rotatedImageName}`;
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const rotatedFilePath = path.join(__dirname, 'uploads', rotatedImageName);

    try {
        // Rotate the image by 90 degrees using Sharp
        await sharp(filePath)
            .rotate(90) // Rotate the image by 90 degrees
            .toFile(rotatedFilePath); // Save the rotated image as a new file

        res.send({
            originalImageUrl,
            rotatedImageUrl
        });
    } catch (error) {
        res.status(500).send('An error occurred while rotating the image');
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors (e.g., file size limit exceeded)
        res.status(400).send(err.message + " Upload image with less than 100Kb size");
    } else if (err) {
        // Handle other errors (e.g., invalid file type)
        res.status(400).send(err.message);
    }
});

// Start the server
app.listen(3000, () => {
    console.log("App listening on port 3000");
});
