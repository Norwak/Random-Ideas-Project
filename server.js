const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();


// Static Folder
app.use(express.static(path.join(__dirname, 'public')));



// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// CORS middleware
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true,
}));



const ideasRouter = require('./routes/ideas.js');
app.use('/api/ideas', ideasRouter);



app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});