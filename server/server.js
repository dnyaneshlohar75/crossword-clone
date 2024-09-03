const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json()); // Parse JSON bodies

app.use('/api/test', require('./routes/testRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({ storage: storage });

  // Creating Upload Endpoint for images
  app.use('/images', express.static(path.join(__dirname, 'upload/images')));
  
  app.post("/upload", upload.single('book'), (req, res) => {
      console.log('File:', req.file);
  
      if (!req.file) {
          return res.status(400).json({
              success: 0,
              message: 'No file uploaded'
          });
      }
  
      res.json({
       success: 1,
       image_url: `http://localhost:${process.env.PORT || 8000}/images/${req.file.filename}`
    //   image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
  })
  

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE || 'development'} Mode On Port ${PORT}`);
});
