const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routers/userRoute');
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const router = express.Router();
const connectDB = require('./db/db')
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = express();
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    const host = req.header('host').replace(/:80$/, '');
    // Redirect to HTTPS
    res.redirect(`https://${host}${req.url}`);
  } else {
    next();
  }
});

connectDB()
app.use(cors({
  origin: 'https://gamtllp.com'
})) // This ensures that the OPTIONS request is handled





const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads/admin')));

// Middleware
app.use(express.json());
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Routes
app.use('/api', userRoutes);

https.createServer({ key, cert }, app).listen(8080, () => {
  console.log('HTTPS Server running on port 8080');
});
module.exports = app;