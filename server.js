const express = require('express');
const port = 5000;

const app = express();



app.get('/', function(request, response) {
  response.json({message: 'Welcome to the Random Ideas API'});
});

const ideasRouter = require('./routes/ideas.js');
app.use('/api/ideas', ideasRouter);



app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});