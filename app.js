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

const app = express();

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    // Remove default port (80) if present
    const host = req.header('host').replace(/:80$/, '');
    // Redirect to HTTPS
    res.redirect(`https://${host}${req.url}`);
  } else {
    next();
  }
});

connectDB()
app.use(cors({
  origin: 'https://gamtllp.com',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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

// Routes
app.use('/api', userRoutes);

// Start server
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;