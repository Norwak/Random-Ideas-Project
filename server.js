const express = require('express');
const port = 5000;

const app = express();

app.get('/', function(request, response) {
  response.json({message: 'Hello World'});
});

app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});