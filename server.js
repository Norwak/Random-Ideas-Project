const express = require('express');
const port = 5000;

const app = express();

const ideas = new Array(
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
);

app.get('/', function(request, response) {
  response.json({message: 'Welcome to the Random Ideas API'});
});

// get all ideas
app.get('/api/ideas', function(request, response) {
  response.json({success: true, data: ideas});
});

// get a single idea
app.get('/api/ideas/:id', function(request, response) {
  const idea = ideas.find(function(item) {
    return item.id === Number(request.params.id);
  });

  if (!idea) {
    return response.status(404).json({success: false, error: 'Resourse not found'});
  }

  return response.json({success: true, data: idea});
});

app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});