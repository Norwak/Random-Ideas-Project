const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();



// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', function(request, response) {
  response.json({message: 'Welcome to the Random Ideas API'});
});

const ideasRouter = require('./routes/ideas.js');
app.use('/api/ideas', ideasRouter);



app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});